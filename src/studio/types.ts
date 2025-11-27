export interface GeneratedAsset {
  id: string;
  name: string;
  type: 'render' | 'diagram' | 'blueprint';
  timestamp: string;
  imageUrl: string;
  status: 'processing' | 'complete' | 'failed';
  settings: {
    view: string;
    prompt: string;
    background: BackgroundConfig;
    style: RenderStyle;
    lighting: LightingConfig;
  };
}

export type ViewPreset = 'isometric' | 'front' | 'top' | 'side';

export type RenderStyle = 'preview' | 'realistic';

export type BackgroundMode = 'transparent' | 'flat' | 'gradient';

export interface BackgroundConfig {
  mode: BackgroundMode;
  color1: string;
  color2?: string;
  direction?: string;
}

export interface LightingConfig {
  rotation: number; // 0-360 degrees
  elevation: number; // 0-90 degrees
  intensity: number;
}

export interface FileData {
  name: string;
  size: string;
  type: string;
  lastModified: number;
  previewUrl?: string; // For reference images or blob urls for models
  data?: File; // Keep the actual file object for API upload if needed
  isExample?: boolean;
}