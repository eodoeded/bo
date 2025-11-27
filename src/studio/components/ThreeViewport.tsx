import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Text, Image as DreiImage, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';
import { ViewPreset, RenderStyle, BackgroundConfig, FileData, LightingConfig } from '../types';

// --- Geometry Processing Utils ---
const normalizeGeometry = (geometry: THREE.BufferGeometry) => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    if (box) {
        const center = new THREE.Vector3();
        box.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0 && isFinite(maxDim)) {
            const scale = 4 / maxDim;
            geometry.scale(scale, scale, scale);
        } else {
             geometry.scale(1, 1, 1);
        }
        geometry.computeVertexNormals();
    }
    return geometry;
};

// --- Parsers ---
const parseOBJ = (text: string): THREE.BufferGeometry | null => {
    const positions: number[] = [];
    const outputVertices: number[] = [];
    const lines = text.split(/\r\n|\n|\r/);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.length === 0 || line.startsWith('#')) continue;
        const commentIdx = line.indexOf('#');
        if (commentIdx > -1) line = line.substring(0, commentIdx).trim();
        const parts = line.split(/\s+/);
        const type = parts[0];
        if (type === 'v') {
            const x = parseFloat(parts[1]);
            const y = parseFloat(parts[2]);
            const z = parseFloat(parts[3]);
            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) positions.push(x, y, z);
        } else if (type === 'f') {
            const faceIndices: number[] = [];
            for (let j = 1; j < parts.length; j++) {
                const part = parts[j];
                if (!part) continue;
                const vStr = part.split('/')[0];
                let index = parseInt(vStr, 10);
                if (!isNaN(index)) {
                    if (index < 0) index = (positions.length / 3) + index + 1;
                    faceIndices.push(index - 1);
                }
            }
            if (faceIndices.length >= 3) {
                const v0 = faceIndices[0];
                for (let k = 1; k < faceIndices.length - 1; k++) {
                    const v1 = faceIndices[k];
                    const v2 = faceIndices[k+1];
                    if (v0 * 3 + 2 < positions.length && v1 * 3 + 2 < positions.length && v2 * 3 + 2 < positions.length) {
                        outputVertices.push(
                            positions[v0 * 3], positions[v0 * 3 + 1], positions[v0 * 3 + 2],
                            positions[v1 * 3], positions[v1 * 3 + 1], positions[v1 * 3 + 2],
                            positions[v2 * 3], positions[v2 * 3 + 1], positions[v2 * 3 + 2]
                        );
                    }
                }
            }
        }
    }
    if (outputVertices.length === 0) return null;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(outputVertices, 3));
    return normalizeGeometry(geometry);
};

const parseSTL = (buffer: ArrayBuffer): THREE.BufferGeometry | null => {
    const view = new DataView(buffer);
    const length = buffer.byteLength;
    if (length < 84) return null;
    const triangleCount = view.getUint32(80, true);
    const expectedSize = 80 + 4 + (triangleCount * 50);
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    if (Math.abs(expectedSize - length) < 100) {
        let offset = 84;
        for (let i = 0; i < triangleCount; i++) {
            offset += 12; 
            for(let j=0; j<3; j++){
                vertices.push(view.getFloat32(offset, true));
                vertices.push(view.getFloat32(offset + 4, true));
                vertices.push(view.getFloat32(offset + 8, true));
                offset += 12;
            }
            offset += 2;
        }
    } else {
        const decoder = new TextDecoder();
        const text = decoder.decode(buffer);
        const lines = text.split(/\r\n|\n|\r/);
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('vertex')) {
                const parts = line.split(/\s+/);
                vertices.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
            }
        }
    }
    if (vertices.length === 0) return null;
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return normalizeGeometry(geometry);
};

// --- Scene Components ---

const CustomGeometry = ({ file }: { file: FileData }) => {
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        let active = true;
        const load = async () => {
            if (!file.previewUrl) return;
            try {
                const response = await fetch(file.previewUrl);
                const buffer = await response.arrayBuffer();
                let geom: THREE.BufferGeometry | null = null;
                if (file.name.toLowerCase().endsWith('.obj')) {
                    const text = new TextDecoder().decode(buffer);
                    geom = parseOBJ(text);
                } else if (file.name.toLowerCase().endsWith('.stl')) {
                    geom = parseSTL(buffer);
                }
                if (active && geom) setGeometry(geom);
                else if (active) setError(true);
            } catch (err) {
                if (active) setError(true);
            }
        };
        load();
        return () => { active = false; };
    }, [file]);

    if (error || !geometry) return null;

    return (
        <mesh castShadow receiveShadow geometry={geometry}>
             <meshStandardMaterial color="#e5e5e5" roughness={0.5} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
    );
};

const GltfModel = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const normalizedScene = useMemo(() => {
        const cloned = scene.clone();
        const box = new THREE.Box3().setFromObject(cloned);
        const center = new THREE.Vector3();
        box.getCenter(center);
        cloned.position.sub(center); 
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) cloned.scale.multiplyScalar(4 / maxDim);
        cloned.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = new THREE.MeshStandardMaterial({ 
                    color: '#e5e5e5', roughness: 0.5, metalness: 0.1, side: THREE.DoubleSide
                });
            }
        });
        return cloned;
    }, [scene]);
    return <primitive object={normalizedScene} />;
};

const ModelLoader = ({ file }: { file: FileData | null }) => {
    useEffect(() => { return () => { if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl); }; }, [file]);
    if (!file) return null;
    if (file.isExample) {
        return (
            <group>
                 <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
                    <boxGeometry args={[4, 0.2, 4]} />
                    <meshStandardMaterial color="#333" roughness={0.8} />
                 </mesh>
                 <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.8, 0.5, 2.8]} />
                    <meshStandardMaterial color="#888" roughness={0.4} metalness={0.6} />
                 </mesh>
            </group>
        );
    }
    if (file.type.includes('IMAGE') || (file.data && file.data.type.startsWith('image/'))) {
         return <DreiImage url={file.previewUrl!} transparent scale={[5, 5]} />;
    }
    if (file.name.match(/\.(glb|gltf)$/i)) return <GltfModel url={file.previewUrl!} />;
    if (file.name.match(/\.(obj|stl)$/i)) return <CustomGeometry file={file} />;
    return null;
};

// Replaced continous useFrame with a one-time useEffect animation
const CameraController = ({ view }: { view: ViewPreset }) => {
  const { camera, controls } = useThree();
  
  useEffect(() => {
    const positions: Record<ViewPreset, [number, number, number]> = {
      isometric: [5, 4, 5],
      front: [0, 0, 8],
      top: [0, 10, 0],
      side: [8, 0, 0]
    };

    const targetPos = new THREE.Vector3(...positions[view]);
    
    // Animate smoothly to the new position
    const startPos = camera.position.clone();
    const startTime = performance.now();
    const duration = 800; // ms

    const animate = (time: number) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const ease = 1 - Math.pow(1 - t, 3);
        
        camera.position.lerpVectors(startPos, targetPos, ease);
        camera.lookAt(0, 0, 0);
        
        if (controls) {
            // @ts-ignore
            controls.target.set(0, 0, 0);
            // @ts-ignore
            controls.update();
        }

        if (t < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
    
  }, [view, camera, controls]); 

  return null;
};

const SceneLights = ({ lighting, showShadows }: { lighting: LightingConfig, showShadows: boolean }) => {
    const rad = (lighting.rotation * Math.PI) / 180;
    const x = Math.sin(rad) * 8;
    const z = Math.cos(rad) * 8;
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight 
                position={[x, 8, z]} 
                intensity={lighting.intensity} 
                castShadow={showShadows} 
                shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-x/2, 4, -z/2]} intensity={0.4} />
        </>
    );
};

// --- Capture Manager ---

const CaptureManager = forwardRef(({ onCaptureFrame }: { onCaptureFrame: any }, ref) => {
    const { gl, scene, camera } = useThree();

    // Hook into render loop to capture a frame if requested
    useImperativeHandle(ref, () => ({
        capture: async () => {
             // We rely on the parent component state to hide helpers, then we wait for a frame.
             return new Promise<string>((resolve) => {
                 // Force a render
                 gl.render(scene, camera);
                 requestAnimationFrame(() => {
                      gl.render(scene, camera);
                      const dataUrl = gl.domElement.toDataURL('image/png', 1.0);
                      resolve(dataUrl);
                 });
             });
        },
        captureMask: async () => {
            // Helper for mask capture
            const prevOverride = scene.overrideMaterial;
            scene.overrideMaterial = new THREE.MeshBasicMaterial({ color: '#000000' });
            const prevBg = scene.background;
            scene.background = null;

            return new Promise<string>((resolve) => {
                gl.render(scene, camera);
                 requestAnimationFrame(() => {
                      gl.render(scene, camera);
                      const dataUrl = gl.domElement.toDataURL('image/png');
                      
                      // Restore
                      scene.overrideMaterial = prevOverride;
                      scene.background = prevBg;
                      
                      resolve(dataUrl);
                 });
            });
        }
    }));
    return null;
});

export interface ThreeViewportRef {
    capture: () => Promise<string>;
    captureMask: () => Promise<string>;
    setCapturing: (capturing: boolean) => void;
}

interface ThreeViewportProps {
  view: ViewPreset;
  mode: RenderStyle;
  background: BackgroundConfig;
  lighting: LightingConfig;
  fileLoaded: boolean;
  isExample: boolean;
  showShadows: boolean;
  file?: FileData | null;
}

export const ThreeViewport = forwardRef<ThreeViewportRef, ThreeViewportProps>(({ view, mode, background, lighting, fileLoaded, isExample, showShadows, file }, ref) => {
  const managerRef = useRef<any>(null);
  const [capturing, setCapturing] = useState(false);

  useImperativeHandle(ref, () => ({
    capture: async () => {
        setCapturing(true);
        // Wait for React to render the removal of helpers
        await new Promise(r => setTimeout(r, 100));
        const result = await managerRef.current?.capture();
        setCapturing(false);
        return result || '';
    },
    captureMask: async () => {
        setCapturing(true);
        await new Promise(r => setTimeout(r, 100));
        const result = await managerRef.current?.captureMask();
        setCapturing(false);
        return result || '';
    },
    setCapturing
  }));

  const getContainerStyle = () => {
      if (background.mode === 'transparent') {
           return { 
               backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)', 
               backgroundSize: '20px 20px', 
               backgroundPosition: '0 0, 10px 10px' 
           };
      }
      if (background.mode === 'flat') return { backgroundColor: background.color1 };
      if (background.mode === 'gradient') return { backgroundImage: `linear-gradient(to top, ${background.color1}, ${background.color2})` };
      return {};
  };

  if (!fileLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 font-mono text-sm border-2 border-dashed border-gray-200 m-4 rounded-lg select-none">
        <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-gray-300 text-xl">EMPTY VIEWPORT</span>
            <span className="text-xs text-gray-400">Upload geometry to begin</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative" style={getContainerStyle()}>
      <Canvas 
        shadows={showShadows}
        dpr={[1, 2]} 
        camera={{ fov: 35, position: [5,5,5] }} 
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }} 
      >
        <CaptureManager ref={managerRef} onCaptureFrame={() => {}} />
        <CameraController view={view} />
        <Environment preset="city" />
        
        {/* CONDITIONALLY RENDER HELPERS BASED ON CAPTURING STATE */}
        {!capturing && (
            <group>
                <gridHelper args={[20, 20, 0xe5e5e5, 0xf0f0f0]} position={[0, -2.1, 0]} />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="black" />
                </GizmoHelper>
            </group>
        )}
        
        <Suspense fallback={null}>
           <ModelLoader file={file} />
        </Suspense>
        
        <SceneLights lighting={lighting} showShadows={showShadows} />

        <OrbitControls makeDefault />
      </Canvas>
      
      <div className={`absolute bottom-6 left-6 z-20 font-mono text-xs select-none text-gray-400`}>
         <p className="opacity-50 uppercase">VIEW: {view}</p>
         <p className="opacity-50 uppercase mt-1">BG: {background.mode}</p>
      </div>
    </div>
  );
});

ThreeViewport.displayName = 'ThreeViewport';