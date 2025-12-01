import React from 'react';
import { X, Monitor, Sun, Code, User, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-inter-light">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#1C1A14] border border-white/10 rounded-sm shadow-2xl overflow-hidden flex h-[500px]"
      >
        {/* Sidebar */}
        <div className="w-48 border-r border-white/5 bg-[#12110d] p-4 flex flex-col gap-1">
           <div className="text-[10px] font-mono text-[#E3E3FD]/30 uppercase tracking-widest mb-4 px-2">Settings</div>
           
           <button className="flex items-center gap-3 px-3 py-2 rounded-sm bg-[#3B3B3B] text-white text-xs font-medium">
              <User size={14} /> Profile
           </button>
           <button className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-white/5 text-[#E3E3FD]/60 hover:text-[#E3E3FD] text-xs font-medium transition-colors">
              <Monitor size={14} /> Appearance
           </button>
           <button className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-white/5 text-[#E3E3FD]/60 hover:text-[#E3E3FD] text-xs font-medium transition-colors">
              <Code size={14} /> API Keys
           </button>
           <button className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-white/5 text-[#E3E3FD]/60 hover:text-[#E3E3FD] text-xs font-medium transition-colors">
              <Shield size={14} /> Security
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#1C1A14]">
           <div className="flex items-center justify-between mb-8">
               <h2 className="text-lg text-[#E3E3FD] font-medium">Profile Settings</h2>
               <button onClick={onClose} className="text-[#E3E3FD]/40 hover:text-white transition-colors">
                   <X size={18} />
               </button>
           </div>

           <div className="space-y-6">
               {/* Avatar Section */}
               <div className="flex items-center gap-4 pb-6 border-b border-white/5">
                   <div className="w-16 h-16 rounded-full bg-[#3B3B3B] border border-white/10 flex items-center justify-center text-[#E3E3FD] text-xl font-mono">
                       JP
                   </div>
                   <div>
                       <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs text-[#E3E3FD] transition-colors mb-1">
                           Change Avatar
                       </button>
                       <p className="text-[10px] text-[#E3E3FD]/40">JPG, GIF or PNG. Max 1MB.</p>
                   </div>
               </div>

               {/* Form Fields */}
               <div className="grid gap-4 max-w-md">
                   <div className="space-y-1.5">
                       <label className="text-[10px] font-medium text-[#E3E3FD]/60 uppercase tracking-wider">Full Name</label>
                       <input type="text" defaultValue="JP" className="w-full bg-[#12110d] border border-white/10 rounded-sm px-3 py-2 text-sm text-[#E3E3FD] focus:border-white/30 focus:outline-none" />
                   </div>
                   
                   <div className="space-y-1.5">
                       <label className="text-[10px] font-medium text-[#E3E3FD]/60 uppercase tracking-wider">Email Address</label>
                       <input type="email" defaultValue="jp@brandedobjects.com" className="w-full bg-[#12110d] border border-white/10 rounded-sm px-3 py-2 text-sm text-[#E3E3FD] focus:border-white/30 focus:outline-none" />
                   </div>

                   <div className="space-y-1.5">
                       <label className="text-[10px] font-medium text-[#E3E3FD]/60 uppercase tracking-wider">Role</label>
                       <input type="text" defaultValue="Administrator" disabled className="w-full bg-[#12110d]/50 border border-white/5 rounded-sm px-3 py-2 text-sm text-[#E3E3FD]/40 cursor-not-allowed" />
                   </div>
               </div>
               
               <div className="pt-6 border-t border-white/5 flex justify-end gap-3">
                   <button onClick={onClose} className="px-4 py-2 text-xs text-[#E3E3FD]/60 hover:text-[#E3E3FD] transition-colors">Cancel</button>
                   <button className="px-4 py-2 bg-[#E3E3FD] text-[#12110d] rounded-sm text-xs font-medium hover:bg-white transition-colors">Save Changes</button>
               </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

