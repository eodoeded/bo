import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import GIF from 'gif.js.optimized';

const Card = ({ title, icon, animation, id }) => (
    <div id={id} className="card-wrapper bg-black p-4">
        <div className="w-[300px] h-[380px] bg-[#111] border border-[#333] rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
             {/* Icon Container */}
            <div className="mb-6 w-20 h-20 flex items-center justify-center">
                {animation}
            </div>
            <h3 className="text-xl font-light tracking-wide text-gray-200">{title}</h3>
        </div>
    </div>
);

const App = () => {
    const [recording, setRecording] = useState(false);
    const [progress, setProgress] = useState(0);

    const generateGif = async (elementId, filename) => {
        return new Promise((resolve) => {
            const element = document.getElementById(elementId);
            if (!element) return resolve();

            const gif = new GIF({
                workers: 2,
                quality: 10,
                workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js',
                width: element.offsetWidth,
                height: element.offsetHeight
            });

            const fps = 20; // Lower FPS for performance
            const duration = 4000; // 4 seconds capture
            const frames = (duration / 1000) * fps;
            const interval = 1000 / fps;
            
            let frameCount = 0;

            const captureFrame = setInterval(async () => {
                if (frameCount >= frames) {
                    clearInterval(captureFrame);
                    gif.on('finished', (blob) => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = filename;
                        link.click();
                        resolve();
                    });
                    gif.render();
                    return;
                }

                try {
                    const canvas = await html2canvas(element, {
                        backgroundColor: '#000000',
                        scale: 1,
                        logging: false,
                        useCORS: true
                    });
                    gif.addFrame(canvas, { delay: interval });
                    frameCount++;
                    setProgress(prev => prev + (100 / (frames * 3))); // Rough progress calc
                } catch (err) {
                    console.error(err);
                    clearInterval(captureFrame);
                    resolve();
                }
            }, interval);
        });
    };

    const handleExport = async () => {
        if (recording) return;
        setRecording(true);
        setProgress(0);

        // Sequential export to avoid browser crash
        await generateGif('card-1', 'product-visuals.gif');
        await generateGif('card-2', 'engineering-focus.gif');
        await generateGif('card-3', 'scalable-systems.gif');

        setRecording(false);
        setProgress(100);
        alert('Downloads started!');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-light mb-4">Card Animations</h1>
                <button 
                    onClick={handleExport}
                    disabled={recording}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                        recording 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                    {recording ? `Generating GIFs... ${Math.round(progress)}%` : 'Export All as GIFs'}
                </button>
                <p className="text-gray-500 text-sm mt-2">Note: This process captures the screen and may take a few seconds.</p>
            </div>

            <div className="card-container flex gap-10 flex-wrap justify-center">
                {/* Card 1: Product Visuals */}
                <Card 
                    id="card-1"
                    title="Product Visuals" 
                    animation={
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <motion.div 
                                className="absolute border-[1px] border-white/80 rounded-full"
                                style={{ width: '100%', height: '100%' }}
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="absolute border-[1px] border-white/60 rounded-full"
                                style={{ width: '70%', height: '70%' }}
                                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.8, 0.3], rotate: [0, 90, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Corner brackets */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40"></div>
                        </div>
                    }
                />

                {/* Card 2: Engineering Focus */}
                <Card 
                    id="card-2"
                    title="Engineering Focus" 
                    animation={
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                                <motion.path 
                                    d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    style={{ originX: "50px", originY: "50px" }}
                                />
                            </svg>
                            <motion.div 
                                className="absolute w-8 h-8 border border-white rounded-full flex items-center justify-center"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-1 h-1 bg-white rounded-full absolute top-1"></div>
                                <div className="w-1 h-1 bg-white rounded-full absolute bottom-1"></div>
                            </motion.div>
                            <div className="absolute w-2 h-2 bg-white rounded-sm rotate-45"></div>
                        </div>
                    }
                />

                {/* Card 3: Scalable Systems */}
                <Card 
                    id="card-3"
                    title="Scalable Systems" 
                    animation={
                        <div className="relative w-16 h-16 flex flex-wrap justify-between content-between p-1">
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-6 h-6 border border-white/40 rounded-md relative"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ 
                                        opacity: [0.3, 1, 0.3],
                                        scale: [1, 1.05, 1],
                                        borderColor: ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.4)"]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        delay: i * 0.5,
                                        ease: "easeInOut" 
                                    }}
                                >
                                    {i === 0 && <div className="absolute -right-2 top-1/2 w-2 h-[1px] bg-white/30"></div>}
                                    {i === 0 && <div className="absolute left-1/2 -bottom-2 w-[1px] h-2 bg-white/30"></div>}
                                </motion.div>
                            ))}
                        </div>
                    }
                />
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

