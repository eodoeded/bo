import React, { useRef, useEffect, useState } from 'react';

export const SmartImage = ({ 
  src, 
  filterType = 'none', 
  className = "",
  width, 
  height 
}) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  // Load image
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
  }, [src]);

  // Apply filters
  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw original
    ctx.clearRect(0, 0, width, height);
    
    // Maintain aspect ratio cover
    const img = imgRef.current;
    const scale = Math.max(width / img.width, height / img.height);
    const x = (width / 2) - (img.width / 2) * scale;
    const y = (height / 2) - (img.height / 2) * scale;
    
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // 2. Apply Filters
    if (filterType !== 'none') {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      if (filterType === 'grayscale' || filterType === 'dither' || filterType === 'threshold') {
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // R
          data[i + 1] = avg; // G
          data[i + 2] = avg; // B
        }
      }

      if (filterType === 'threshold') {
         for (let i = 0; i < data.length; i += 4) {
          const v = data[i] > 128 ? 255 : 0;
          data[i] = v;
          data[i+1] = v;
          data[i+2] = v;
         }
      }

      if (filterType === 'dither') {
        // Atkinson Dithering (Simplified for performance)
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const oldPixel = data[i];
            const newPixel = oldPixel < 128 ? 0 : 255;
            const quantError = Math.floor((oldPixel - newPixel) / 8);

            data[i] = newPixel;
            data[i + 1] = newPixel;
            data[i + 2] = newPixel;

            // Distribute error
            const distribute = (dx, dy, mult) => {
               const nx = x + dx;
               const ny = y + dy;
               if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                 const ni = (ny * width + nx) * 4;
                 data[ni] = Math.min(255, Math.max(0, data[ni] + quantError * mult));
                 data[ni+1] = Math.min(255, Math.max(0, data[ni+1] + quantError * mult));
                 data[ni+2] = Math.min(255, Math.max(0, data[ni+2] + quantError * mult));
               }
            }

            distribute(1, 0, 1);
            distribute(2, 0, 1);
            distribute(-1, 1, 1);
            distribute(0, 1, 1);
            distribute(1, 1, 1);
            distribute(0, 2, 1);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

  }, [imageLoaded, filterType, width, height, src]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className={className}
    />
  );
};

