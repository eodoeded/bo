import React from 'react';
import { Download, Share2, MoreHorizontal } from 'lucide-react';

export const AssetGallery = ({ assets, onDownload }) => {
  if (assets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#E3E3FD]/40 p-8 font-inter-light">
        <div className="w-16 h-16 border-[1px] border-dashed border-white/10 rounded-lg flex items-center justify-center mb-4">
           <Download className="opacity-20" size={32} />
        </div>
        <p className="text-sm font-medium text-[#E3E3FD]">No assets generated yet.</p>
        <p className="text-xs text-center mt-2 max-w-[200px] text-[#E3E3FD]/40">Configure your CAD file and click Generate to create marketing materials.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#12110d]">
      <h3 className="text-[10px] font-mono font-semibold text-[#E3E3FD]/40 uppercase tracking-[0.2em] mb-6 sticky top-0 bg-[#12110d]/90 backdrop-blur py-2 z-10">
        Output Queue ({assets.length})
      </h3>
      
      <div className="grid grid-cols-1 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="group bg-white/5 border border-white/10 rounded-sm overflow-hidden hover:border-white/30 transition-all">
            {/* Image Preview Area */}
            <div className="aspect-[4/3] bg-black/20 relative overflow-hidden">
                {asset.imageUrl ? (
                    <img 
                        src={asset.imageUrl} 
                        alt={asset.name} 
                        className={`w-full h-full object-cover transition-all duration-700 ${asset.status === 'processing' ? 'scale-105 blur-sm grayscale' : 'scale-100 grayscale-0'}`}
                    />
                ) : (
                    <div className="w-full h-full bg-white/5 animate-pulse" />
                )}
                
                {/* Processing Overlay */}
                {asset.status === 'processing' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             <span className="text-[10px] font-mono font-bold text-white tracking-widest">RENDERING</span>
                        </div>
                    </div>
                )}
                
                {/* Failed Overlay */}
                {asset.status === 'failed' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-900/40 backdrop-blur-sm z-10">
                         <span className="text-xs font-mono font-bold text-red-400">GENERATION FAILED</span>
                    </div>
                )}

                {/* Hover Actions */}
                {asset.status === 'complete' && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                            onClick={() => onDownload(asset)}
                            className="bg-white text-black px-3 py-2 rounded-sm hover:bg-[#E3E3FD] font-medium text-xs flex items-center gap-2 transition-colors"
                        >
                            <Download size={14} /> Download
                        </button>
                    </div>
                )}

                {/* Technical Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/20 px-2 py-1 rounded-sm text-[10px] font-mono font-medium text-[#E3E3FD]">
                    {asset.settings.style.toUpperCase()}
                </div>
            </div>

            {/* Meta Data */}
            <div className="p-4">
               <div className="flex items-start justify-between mb-1">
                   <h4 className="text-sm font-semibold text-[#E3E3FD] font-inter-light">{asset.name}</h4>
                   <button className="text-[#E3E3FD]/40 hover:text-white transition-colors">
                       <MoreHorizontal size={16} />
                   </button>
               </div>
               <div className="flex items-center gap-2 text-[10px] text-[#E3E3FD]/40 font-mono">
                   <span>{asset.type.toUpperCase()}</span>
                   <span>•</span>
                   <span>{asset.timestamp}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
