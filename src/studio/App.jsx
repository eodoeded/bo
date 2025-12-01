import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThreeViewport } from './components/ThreeViewport';
import { AssetGallery } from './components/AssetGallery';
import { SettingsModal } from './components/SettingsModal';
import { PaymentModal } from './components/PaymentModal';

// Helper to convert blob/file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result;
        // Remove data URL prefix
        const base64 = result.split(',')[1];
        resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// --- Auto-Registration Logic ---

const getContextBounds = (data, width, height) => {
    let minX = width, minY = height, maxX = 0, maxY = 0;
    let found = false;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            // Check alpha
            if (data[i + 3] > 20) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
                found = true;
            }
        }
    }

    if (!found) return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0, centerX: width/2, centerY: height/2, valid: false };

    return {
        minX, minY, maxX, maxY,
        width: maxX - minX,
        height: maxY - minY,
        centerX: minX + (maxX - minX) / 2,
        centerY: minY + (maxY - minY) / 2,
        valid: true
    };
};

// Helper: Auto-Aligned & Centered Compositing
const compositeImageWithAlignment = async (
  aiImageBlob,
  maskImageSrc, 
  background, 
) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const aiImg = new Image();
        const maskImg = new Image();
        
        const aiUrl = URL.createObjectURL(aiImageBlob);

        const loadImages = Promise.all([
            new Promise(r => { aiImg.onload = r; aiImg.src = aiUrl; }),
            new Promise(r => { maskImg.onload = r; maskImg.src = maskImageSrc; })
        ]);

        loadImages.then(() => {
            canvas.width = aiImg.width;
            canvas.height = aiImg.height;
            if (!ctx) return resolve(aiUrl);

            // --- STEP 1: Analyze Mask (Ground Truth from CAD) ---
            const maskCanvas = document.createElement('canvas');
            maskCanvas.width = canvas.width;
            maskCanvas.height = canvas.height;
            const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
            if (!maskCtx) return;
            maskCtx.drawImage(maskImg, 0, 0);
            const maskPixels = maskCtx.getImageData(0, 0, canvas.width, canvas.height);
            const maskBounds = getContextBounds(maskPixels.data, canvas.width, canvas.height);

            // --- STEP 2: Process AI Image (Already Transparent from imgly) ---
            const aiCanvas = document.createElement('canvas');
            aiCanvas.width = canvas.width;
            aiCanvas.height = canvas.height;
            const aiCtx = aiCanvas.getContext('2d', { willReadFrequently: true });
            if (!aiCtx) return;
            aiCtx.drawImage(aiImg, 0, 0);
            
            const aiImageData = aiCtx.getImageData(0, 0, canvas.width, canvas.height);

            // --- STEP 3: Analyze AI Image (Content Bounds) ---
            const aiBounds = getContextBounds(aiImageData.data, canvas.width, canvas.height);

            // --- STEP 4: Calculate Alignment Transform ---
            let alignOffsetX = 0;
            let alignOffsetY = 0;
            let scale = 1;

            if (maskBounds.valid && aiBounds.valid) {
                // A. Match AI to CAD Mask Size
                const scaleX = maskBounds.width / aiBounds.width;
                const scaleY = maskBounds.height / aiBounds.height;
                let rawScale = (scaleX + scaleY) / 2;
                
                // Safety clamp to prevent explosion if AI generated garbage
                if (rawScale > 0.7 && rawScale < 1.3) {
                    scale = rawScale;
                }

                // B. Align AI Center to Mask Center
                const scaledAiCenterX = aiBounds.centerX * scale;
                const scaledAiCenterY = aiBounds.centerY * scale;
                
                alignOffsetX = maskBounds.centerX - scaledAiCenterX;
                alignOffsetY = maskBounds.centerY - scaledAiCenterY;
            }

            // --- STEP 5: Calculate Global Centering Offset ---
            let globalOffsetX = 0;
            let globalOffsetY = 0;

            if (maskBounds.valid) {
                const canvasCenterX = canvas.width / 2;
                const canvasCenterY = canvas.height / 2;
                globalOffsetX = canvasCenterX - maskBounds.centerX;
                globalOffsetY = canvasCenterY - maskBounds.centerY;
            }

            // --- STEP 6: Composite Final Scene ---

            // A. Background
            if (background.mode === 'flat') {
                ctx.fillStyle = background.color1;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else if (background.mode === 'gradient') {
                // Vertical Gradient (Bottom -> Top)
                const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
                grad.addColorStop(0, background.color1); 
                grad.addColorStop(1, background.color2 || '#ffffff'); 
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // B. Drop Shadow (From CAD Mask)
            const shadowCanvas = document.createElement('canvas');
            shadowCanvas.width = canvas.width;
            shadowCanvas.height = canvas.height;
            const shadowCtx = shadowCanvas.getContext('2d');
            if (shadowCtx) {
                shadowCtx.drawImage(maskImg, 0, 15); // +15 Y for shadow drop
                
                // Center the shadow too
                const centeredShadowCanvas = document.createElement('canvas');
                centeredShadowCanvas.width = canvas.width;
                centeredShadowCanvas.height = canvas.height;
                const csc = centeredShadowCanvas.getContext('2d');
                if (csc) {
                    csc.translate(globalOffsetX, globalOffsetY);
                    csc.drawImage(shadowCanvas, 0, 0);
                    
                    // Fill shadow color
                    csc.globalCompositeOperation = 'source-in';
                    csc.fillStyle = 'rgba(0,0,0,0.25)'; 
                    // Draw a huge rect to ensure it covers everything
                    csc.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
                }

                if (csc) {
                    ctx.filter = 'blur(20px)';
                    ctx.drawImage(centeredShadowCanvas, 0, 0);
                    ctx.filter = 'none';
                }
            }

            // C. Draw Aligned & Centered AI Object
            ctx.save();
            ctx.translate(globalOffsetX, globalOffsetY);
            ctx.translate(alignOffsetX, alignOffsetY);
            ctx.scale(scale, scale);
            ctx.drawImage(aiCanvas, 0, 0);
            ctx.restore();

            resolve(canvas.toDataURL('image/png'));
        });
    });
};

// Simple wrapper to handle conditional Provider rendering
const AuthProviderWrapper = ({ children, clientId }) => {
    if (!clientId || clientId.includes("placeholder")) {
        return <>{children}</>;
    }
    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [cadFile, setCadFile] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  
  const [currentView, setCurrentView] = useState('isometric');
  
  // Default Background: Vertical Gradient, Matching Landing Page
  const [background, setBackground] = useState({ 
      mode: 'gradient', 
      color1: '#22201A', 
      color2: '#12110D' 
  });

  const [lighting, setLighting] = useState({ rotation: 45, elevation: 45, intensity: 1.2 });
  const [showShadows, setShowShadows] = useState(true);
  const [viewMode, setViewMode] = useState('realistic'); 
  
  const [credits, setCredits] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [assets, setAssets] = useState([]);
  
  const viewportRef = useRef(null);

  // Simulate a database of users in localStorage
  const getUserDB = () => {
      const db = localStorage.getItem('bo_users_db');
      return db ? JSON.parse(db) : {};
  };

  const saveUserDB = (db) => {
      localStorage.setItem('bo_users_db', JSON.stringify(db));
  };

  // Check auth on mount
  useEffect(() => {
      const auth = localStorage.getItem('bo_studio_auth');
      if (auth === 'true') {
          const userStr = localStorage.getItem('bo_studio_user');
          if (userStr) {
              try {
                  const user = JSON.parse(userStr);
                  
                  // Sync with DB
                  const db = getUserDB();
                  if (user.googleId && db[user.googleId]) {
                      setCredits(db[user.googleId].credits);
                      setCurrentUser(user);
                      setIsAuthenticated(true);
                  } else if (user.googleId) {
                      // Recover if DB was wiped but local session exists
                      // Initialize as new user logic
                       const newUserEntry = { ...user, credits: 5 };
                       db[user.googleId] = newUserEntry;
                       saveUserDB(db);
                       setCredits(5);
                       setCurrentUser(user);
                       setIsAuthenticated(true);
                  }
              } catch (e) {
                  console.error("Failed to parse user data", e);
              }
          }
      }
      setIsCheckingAuth(false);
  }, []);

  // Persist credits to DB when they change
  useEffect(() => {
      if (isAuthenticated && currentUser && currentUser.googleId) {
          const db = getUserDB();
          if (db[currentUser.googleId]) {
              db[currentUser.googleId].credits = credits;
              saveUserDB(db);
          }
      }
  }, [credits, isAuthenticated, currentUser]);

  const handleLogin = (userData) => {
      const db = getUserDB();
      let userEntry = db[userData.googleId];

      if (!userEntry) {
          // NEW USER: Grant 5 free credits
          userEntry = { ...userData, credits: 5, joinedAt: Date.now() };
          db[userData.googleId] = userEntry;
          saveUserDB(db);
      }

      // Set state from DB
      setCurrentUser(userData);
      setCredits(userEntry.credits);
      
      // Persist session
      localStorage.setItem('bo_studio_user', JSON.stringify(userData));
      localStorage.setItem('bo_studio_auth', 'true');
      setIsAuthenticated(true);
  };

  const handleUploadCAD = (file) => {
    setCadFile(file);
    setViewMode('realistic');
  };
  
  const handleUploadRef = (file) => {
    setReferenceFile(file);
  };

  const handleLoadExample = () => {
      setCadFile({
          name: 'NVIDIA_H100_HOPPER.STEP',
          size: '124.5 MB',
          type: 'STEP',
          lastModified: Date.now(),
          isExample: true
      });
      setPrompt('Matte black industrial finish, gold connectors, cinematic lighting, macro photography 85mm');
  };

  const handleDownload = (asset) => {
    if (!asset.imageUrl) return;
    const link = document.createElement('a');
    link.href = asset.imageUrl;
    link.download = `${asset.name}-${asset.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async () => {
    const COST = 5;
    if (!cadFile || (!referenceFile && prompt.length < 2)) return;
    if (credits < COST) {
        setIsPaymentOpen(true);
        return;
    }

    setCredits(prev => prev - COST);
    setIsGenerating(true);
    setStatusMessage('Capturing geometry...');

    const baseId = Math.random().toString(36).substr(2, 9);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAsset = {
        id: baseId,
        name: `${cadFile.name.split('.')[0]}_RENDER`,
        type: 'render',
        timestamp,
        imageUrl: '', 
        status: 'processing',
        settings: { view: currentView, prompt: prompt, background, lighting, style: 'realistic' }
    };
    setAssets(prev => [newAsset, ...prev]);

    try {
        let cadBase64 = '';
        let maskBase64 = '';
        let inputMimeType = 'image/png';
        
        if (cadFile.type.includes('IMAGE') || cadFile.data?.type.startsWith('image/')) {
            if (cadFile.data) {
                cadBase64 = await fileToBase64(cadFile.data);
                // Ensure a valid mime type is available, defaulting to png if empty
                inputMimeType = cadFile.data.type || 'image/png';
                maskBase64 = cadBase64; 
            }
        } else {
            // 1. Capture Scene (Lit)
            const cadDataUrl = await viewportRef.current?.capture();
            if (!cadDataUrl) throw new Error("Failed to capture viewport");
            cadBase64 = cadDataUrl.split(',')[1];

            // 2. Capture Mask (Silhouette)
            const maskDataUrl = await viewportRef.current?.captureMask();
            if (!maskDataUrl) throw new Error("Failed to capture mask");
            maskBase64 = maskDataUrl;
        }

        let refBase64 = null;
        let refMimeType = 'image/png';

        if (referenceFile) {
            if (referenceFile.data) {
                refBase64 = await fileToBase64(referenceFile.data);
                refMimeType = referenceFile.data.type || 'image/png';
            } else if (referenceFile.previewUrl) {
                const response = await fetch(referenceFile.previewUrl);
                const blob = await response.blob();
                refBase64 = await fileToBase64(blob);
                refMimeType = blob.type || 'image/png';
            }
        }

        setStatusMessage('AI Generating...');

        // --- STANDARD PROMPT FOR IMGLY COMPATIBILITY ---
        // We revert to a clean WHITE background which imgly handles best.
        const systemPrompt = `You are an expert product photographer.

TASK: Render the provided CAD Geometry (Image 1) with the materials/style from Image 2 (if provided).

CRITICAL INSTRUCTIONS:
1. BACKGROUND: Use a SOLID WHITE BACKGROUND.
   - Clean, high-contrast separation.
   - NO SHADOWS on the background (we will add them later).
   - NO GRID LINES.
2. PRESERVE SCALE: The output object must EXACTLY match the size and angle of the input geometry.`;

        const userPrompt = prompt || "High fidelity product render, industrial design style.";

        const ai = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || '');
        
        const parts = [
            { text: systemPrompt },
            { text: `USER DESCRIPTION: ${userPrompt}` },
            { 
                inlineData: {
                    mimeType: inputMimeType,
                    data: cadBase64
                }
            }
        ];

        if (refBase64) {
            parts.push({
                inlineData: {
                    mimeType: refMimeType,
                    data: refBase64
                }
            });
        }

        const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        const result = await model.generateContent({
            contents: [{
                parts: parts
            }]
        });
        const response = await result.response;

        let generatedImageUrl = '';
        let errorText = '';

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
                if (part.text) {
                    errorText += part.text;
                }
            }
        }

        if (!generatedImageUrl) {
            console.warn("AI Response Text:", errorText);
            throw new Error(errorText || "AI did not return an image.");
        }

        setStatusMessage('Removing Background...');

        // --- CLIENT-SIDE BACKGROUND REMOVAL (imgly) ---
        let transparentBlob;
        
        try {
            const imgly = window.imglyBackgroundRemoval;
            
            if (!imgly) {
                console.warn("imglyBackgroundRemoval library not found. Skipping background removal.");
                const resp = await fetch(generatedImageUrl);
                transparentBlob = await resp.blob();
            } else {
                const imageResponse = await fetch(generatedImageUrl);
                const imageBlob = await imageResponse.blob();

                transparentBlob = await imgly.removeBackground(imageBlob, {
                    publicPath: 'https://cdn.jsdelivr.net/npm/@imgly/background-removal-data@1.0.6/dist/',
                    progress: (key, current, total) => {
                       // Optional: could update a progress bar here
                    }
                });
            }
        } catch (bgError) {
            console.error("Background removal failed:", bgError);
            // Fallback: Use the generated image as is if removal fails
            const resp = await fetch(generatedImageUrl);
            transparentBlob = await resp.blob();
            setStatusMessage('Background removal failed, using original...');
            await new Promise(r => setTimeout(r, 1000));
        }

        setStatusMessage('Compositing...');

        // Composite using the aligned registration
        const finalImage = await compositeImageWithAlignment(transparentBlob, maskBase64, background);

        setAssets(prev => prev.map(a => {
            if (a.id === baseId) {
                return { ...a, status: 'complete', imageUrl: finalImage };
            }
            return a;
        }));

    } catch (error) {
        console.error("Generation failed:", error);
        alert(`Generation Failed: ${error.message || "Unknown error"}`);
        setAssets(prev => prev.map(a => {
            if (a.id === baseId) {
                return { ...a, status: 'failed' };
            }
            return a;
        }));
        setCredits(prev => prev + 5); // Refund
    } finally {
        setIsGenerating(false);
        setStatusMessage('');
    }
  };

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const authEnabled = CLIENT_ID && !CLIENT_ID.includes("placeholder");

  if (isCheckingAuth) return null;

  return (
    <AuthProviderWrapper clientId={CLIENT_ID}>
        <div className="flex flex-col h-screen bg-[#12110d] text-white overflow-hidden font-inter-light">
          <Header 
            credits={credits} 
            isAuthenticated={isAuthenticated}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onTopUp={() => setIsPaymentOpen(true)}
          />
          
          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
          />

          <PaymentModal
            isOpen={isPaymentOpen}
            onClose={() => setIsPaymentOpen(false)}
            onComplete={(amount) => {
                setCredits(prev => prev + amount);
                // Keep modal open for a moment to show success state handled within modal
                setTimeout(() => setIsPaymentOpen(false), 2000);
            }}
          />
          
          <main className="flex flex-1 overflow-hidden">
            <div className="flex-none z-20 shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
                <Sidebar 
                    onUploadCAD={handleUploadCAD} 
                    onUploadReference={handleUploadRef}
                    onRemoveReference={() => setReferenceFile(null)}
                    onLoadExample={handleLoadExample}
                    cadFile={cadFile}
                    referenceFile={referenceFile}
                    currentView={currentView}
                    onViewChange={setCurrentView}
                    background={background}
                    onBackgroundChange={setBackground}
                    showShadows={showShadows}
                    onToggleShadows={setShowShadows}
                    lighting={lighting}
                    onLightingChange={setLighting}
                    prompt={prompt}
                    onPromptChange={setPrompt}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    credits={credits}
                    isAuthenticated={isAuthenticated}
                    onLogin={handleLogin}
                    authEnabled={authEnabled}
                />
            </div>

            <div className="flex-1 relative z-10 bg-[#1C1A14]">
                <ThreeViewport 
                    ref={viewportRef}
                    view={currentView} 
                    mode={viewMode}
                    background={background}
                    showShadows={showShadows}
                    lighting={lighting}
                    fileLoaded={!!cadFile}
                    isExample={!!cadFile?.isExample}
                    file={cadFile}
                />
                {isGenerating && statusMessage && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-[#1C1A14]/90 backdrop-blur border border-white/10 px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full border-2 border-[#E3E3FD] border-t-transparent animate-spin"></div>
                        <span className="text-[10px] font-mono font-medium text-[#E3E3FD] uppercase tracking-wider">{statusMessage}</span>
                    </div>
                )}
            </div>

            <div className="w-96 border-l border-white/10 bg-[#12110d] flex-none z-20 overflow-hidden">
                <AssetGallery assets={assets} onDownload={handleDownload} />
            </div>
          </main>
        </div>
    </AuthProviderWrapper>
  );
}

export default App;
