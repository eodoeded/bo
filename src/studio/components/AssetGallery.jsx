import React from 'react';
import { Download, Share2, MoreHorizontal } from 'lucide-react';
export const AssetGallery = ({ assets, onDownload }) => {
  if (assets.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
        <div className="w-16 h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center mb-4">
           <Download className="opacity-20" size={32} />
        </div>
        <p className="text-sm font-medium">No assets generated yet.</p>
        <p className="text-xs text-center mt-2 max-w-[200px]">Configure your CAD file and click Generate to create marketing materials.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <h3 className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider mb-6 sticky top-0 bg-[#FAFAFA] py-2 z-10">
        Output Queue ({assets.length})
      </h3>
      
      <div className="grid grid-cols-1 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Preview Area */}
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {asset.imageUrl ? (
                    <img 
                        src={asset.imageUrl} 
                        alt={asset.name} 
                        className={`w-full h-full object-cover transition-all duration-700 ${asset.status === 'processing' ? 'scale-105 blur-sm grayscale' : 'scale-100 grayscale-0'}`}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 animate-pulse" />
                )}
                
                {/* Processing Overlay */}
                {asset.status === 'processing' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                             <span className="text-xs font-mono font-bold text-gray-900">RENDERING</span>
                        </div>
                    </div>
                )}
                
                {/* Failed Overlay */}
                {asset.status === 'failed' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-50/80 backdrop-blur-sm z-10">
                         <span className="text-xs font-mono font-bold text-red-600">GENERATION FAILED</span>
                    </div>
                )}

                {/* Hover Actions */}
                {asset.status === 'complete' && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                            onClick={() => onDownload(asset)}
                            className="bg-white text-black p-2 rounded-md hover:bg-gray-100 font-medium text-xs flex items-center gap-2"
                        >
                            <Download size={14} /> Download
                        </button>
                    </div>
                )}

                {/* Technical Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur border border-gray-200 px-2 py-1 rounded text-[10px] font-mono font-medium text-gray-600">
                    {asset.settings.style.toUpperCase()}
                </div>
            </div>

            {/* Meta Data */}
            <div className="p-4">
               <div className="flex items-start justify-between mb-1">
                   <h4 className="text-sm font-semibold text-gray-900">{asset.name}</h4>
                   <button className="text-gray-400 hover:text-gray-900">
                       <MoreHorizontal size={16} />
                   </button>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
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