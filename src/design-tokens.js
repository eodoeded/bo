// Design Tokens - Source of Truth for Branded Objects
export const tokens = {
  colors: {
    background: {
      primary: '#261E19',      // Main dark brown background
      secondary: '#1A1614',    // Card/panel background
      tertiary: '#0A0A0A',     // Deepest background (canvas)
      hover: '#2E2824',        // Hover state
    },
    accent: {
      primary: '#E3E3FD',      // Lavender signal color
      secondary: '#FFFFFF',    // White ink
    },
    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(227, 227, 253, 0.5)',
      subtle: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.4)',
      accent: '#E3E3FD',
    },
  },
  typography: {
    fontFamily: {
      display: 'PP Neue Montreal',
      mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    weights: {
      regular: 400,
      medium: 500,
    },
    sizes: {
      displayXL: 'text-6xl md:text-8xl',
      headingL: 'text-5xl md:text-6xl',
      headingM: 'text-3xl md:text-4xl',
      bodyL: 'text-xl',
      body: 'text-base',
      caption: 'text-sm',
      badge: 'text-[9px]',
      label: 'text-[10px]',
    },
    tracking: {
      wide: 'tracking-widest',
      tight: 'tracking-tight',
    },
  },
  spacing: {
    cardPadding: {
      sm: 'p-6',
      md: 'p-8',
      lg: 'p-10',
      xl: 'p-12',
    },
    section: {
      vertical: 'py-20 md:py-32',
      horizontal: 'px-6 md:px-12',
    },
  },
  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    full: 'rounded-full',
  },
  shadows: {
    card: 'shadow-2xl',
    glow: 'shadow-[0_0_8px_#E3E3FD]',
  },
  transitions: {
    default: 'transition-colors duration-300',
    hover: 'hover:border-[#E3E3FD]/50 hover:bg-[#2E2824]',
  },
};

// Card Component Styles
export const cardStyles = {
  base: 'bg-[#1A1614] border border-white/10 rounded-3xl relative group',
  hover: 'hover:border-[#E3E3FD]/50 hover:bg-[#2E2824] transition-colors',
  padding: {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
    xl: 'p-12',
  },
};

// Icon Container Styles
export const iconStyles = {
  base: 'border border-white/10 bg-white/5 flex items-center justify-center',
  hover: 'group-hover:border-[#E3E3FD] transition-colors',
  sizes: {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  },
  radius: 'rounded-2xl',
};

// Badge Styles
export const badgeStyles = {
  base: 'font-mono text-[9px] uppercase tracking-widest',
  primary: 'text-[#E3E3FD] border-[#E3E3FD]/20 bg-[#E3E3FD]/5',
  secondary: 'text-white/40 border-white/10 bg-white/5',
};

