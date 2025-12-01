import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Palette, Zap } from 'lucide-react';

const StepCard = ({ number, title, desc, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: number * 0.1 }}
    className="flex flex-col items-center text-center p-8 border border-[#FFFFFF1A] bg-[#FFFFFF05] backdrop-blur-sm rounded-sm hover:border-[#FFFFFF30] transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-[#3B3B3B] flex items-center justify-center mb-6 border border-[#FFFFFF1A]">
        <Icon className="text-[#E3E3FD]" size={20} />
    </div>
    <span className="text-[10px] font-mono text-[#E3E3FD]/40 mb-2 uppercase tracking-widest">Step 0{number}</span>
    <h3 className="text-lg font-medium text-[#E3E3FD] mb-3">{title}</h3>
    <p className="text-sm text-[#E3E3FD]/60 leading-relaxed max-w-[240px]">{desc}</p>
  </motion.div>
);

export default function StepsSection() {
  return (
    <section className="w-full py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard 
                number={1} 
                title="Upload Geometry" 
                desc="Drag & drop your 3D CAD files (.step, .glb, .obj) directly into the secure studio viewport."
                icon={Upload}
            />
            <StepCard 
                number={2} 
                title="Define Context" 
                desc="Describe your desired material, lighting, and environment, or upload a reference image."
                icon={Palette}
            />
            <StepCard 
                number={3} 
                title="Generate Assets" 
                desc="AI instantly renders photorealistic marketing assets, perfectly aligned and lighting-matched."
                icon={Zap}
            />
        </div>
      </div>
    </section>
  );
}

