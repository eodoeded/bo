import React, { useState, useEffect } from 'react';
import { 
  Wifi, Battery, Radio, Crosshair, Map, Activity, 
  Terminal, Shield, Zap, Globe, Cpu, Disc, Settings,
  ChevronRight, AlertCircle, Lock
} from 'lucide-react';

// ============================================================================
// AIRSPACE — "HELIOS" INDUSTRIAL / RETRO-TECH SYSTEM
// Dark, Monospace, High-Contrast, Rugged
// ============================================================================

const THEME = {
  bg: '#080808',
  panel: '#111111',
  border: '#333333',
  text: '#EAEAEA',
  dim: '#555555',
  accent: '#FF3300', // Industrial Orange
  success: '#00FF44', // Terminal Green
  warning: '#FFCC00', // Amber
  bone: '#EBE4C8', // Retro Beige (from reference)
  cyan: '#00CCFF',
  font: '"JetBrains Mono", "SF Mono", "Monaco", monospace',
};

// --- PRIMITIVES ---

const MonoText = ({ children, className = '', color = THEME.text, size = 'xs' }) => (
  <span className={`${className}`} style={{ fontFamily: THEME.font, color, fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : '14px' }}>
    {children}
  </span>
);

const Box = ({ children, className = '', active = false }) => (
  <div 
    className={`border relative ${className}`}
    style={{ 
      backgroundColor: THEME.panel, 
      borderColor: active ? THEME.bone : THEME.border,
      transition: 'border-color 0.2s'
    }}
  >
    {children}
  </div>
);

const Indicator = ({ active, color = THEME.bone }) => (
  <div 
    className="w-2 h-2 rounded-full transition-opacity duration-300"
    style={{ backgroundColor: color, opacity: active ? 1 : 0.2 }}
  />
);

const ProgressBar = ({ value, color = THEME.bone, label }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <div className="flex justify-between">
      <MonoText color={THEME.dim}>{label}</MonoText>
      <MonoText>{value}%</MonoText>
    </div>}
    <div className="h-2 w-full bg-[#222] border border-[#333] p-[1px]">
      <div 
        className="h-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

// --- RUGGED DEVICE FRAME ---
const RuggedDevice = ({ children, label }) => (
  <div className="flex flex-col items-center shrink-0">
    <div 
      className="relative w-[340px] h-[700px] bg-[#1a1a1a] rounded-sm p-3 shadow-2xl border-4 border-[#2a2a2a]"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}
    >
      {/* Device Bezel Details */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-sm border border-[#000] opacity-50" />
      <div className="absolute -left-1 top-20 h-16 w-1 bg-[#333] rounded-l" /> {/* Button */}
      <div className="absolute -right-1 top-24 h-24 w-1 bg-[#333] rounded-r" /> {/* Button */}
      
      {/* Screen Area */}
      <div className="w-full h-full bg-[#050505] overflow-hidden flex flex-col relative rounded-[2px] border border-[#333]">
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]" 
             style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
        
        {/* Status Bar */}
        <div className="h-8 border-b border-[#333] flex justify-between items-center px-2 bg-[#0A0A0A] shrink-0">
          <MonoText color={THEME.bone}>AIRSPACE_OS v2.4</MonoText>
          <div className="flex gap-2 items-center">
            <Wifi size={12} color={THEME.dim} />
            <Battery size={12} color={THEME.bone} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>

        {/* Footer Bar */}
        <div className="h-8 border-t border-[#333] flex justify-between items-center px-2 bg-[#0A0A0A] shrink-0">
          <MonoText color={THEME.dim}>SYS: ONLINE</MonoText>
          <MonoText color={THEME.accent}>REC ●</MonoText>
        </div>
      </div>
    </div>
    {label && <span className="mt-4 font-mono text-[10px] text-[#444] uppercase tracking-widest">{label}</span>}
  </div>
);

// --- MAP COMPONENT ---
const VectorMap = () => (
  <div className="absolute inset-0 bg-[#080808]">
    {/* Grid */}
    <div 
      className="absolute inset-0 opacity-20" 
      style={{ 
        backgroundImage: `linear-gradient(${THEME.border} 1px, transparent 1px), linear-gradient(90deg, ${THEME.border} 1px, transparent 1px)`, 
        backgroundSize: '40px 40px' 
      }} 
    />
    
    {/* Terrain Lines */}
    <svg className="absolute inset-0 w-full h-full opacity-30">
      <path d="M0 400 Q 100 350 200 400 T 400 400" fill="none" stroke={THEME.dim} strokeWidth="1" />
      <path d="M0 450 Q 100 400 200 450 T 400 450" fill="none" stroke={THEME.dim} strokeWidth="1" />
    </svg>

    {/* No Fly Zone */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]"
         style={{ borderColor: THEME.accent }}>
      <div className="absolute inset-0 rounded-full opacity-10" style={{ backgroundColor: THEME.accent }} />
    </div>

    {/* Drone Icons */}
    <div className="absolute top-[40%] left-[60%]">
      <div className="relative">
        <Crosshair size={16} color={THEME.cyan} className="animate-spin" />
        <span className="absolute left-4 -top-2 font-mono text-[8px] text-[#00CCFF] whitespace-nowrap bg-black/50 px-1 border border-[#00CCFF]/30">DRN-01</span>
      </div>
    </div>
    <div className="absolute top-[60%] left-[30%]">
      <div className="relative">
        <Crosshair size={16} color={THEME.warning} />
        <span className="absolute left-4 -top-2 font-mono text-[8px] text-[#FFCC00] whitespace-nowrap bg-black/50 px-1 border border-[#FFCC00]/30">UNK-99</span>
      </div>
    </div>
  </div>
);

// --- SCREENS ---

// 1. BOOT / INIT SCREEN
const InitScreen = () => (
  <div className="flex flex-col justify-between h-full p-6 bg-[#050505]">
    <div>
      <MonoText size="lg" className="mb-8 block">HELIOS_KERNEL</MonoText>
      <div className="space-y-2 font-mono text-[10px] text-[#666]">
        <p>> MOUNTING_VOLUMES... OK</p>
        <p>> CHECKING_SENSORS... OK</p>
        <p>> GPS_FIX_ACQUIRED [SAT: 12]</p>
        <p>> ESTABLISHING_UPLINK... <span style={{color: THEME.success}}>CONNECTED</span></p>
        <p>> LOADING_GEO_FENCE... OK</p>
      </div>
    </div>
    <div className="space-y-4">
      <MonoText className="animate-pulse">INITIALIZING SYSTEM...</MonoText>
      <div className="h-1 w-full bg-[#222]">
        <div className="h-full bg-[#EBE4C8] w-[70%]" />
      </div>
    </div>
  </div>
);

// 2. LIVE MONITOR
const LiveMonitor = () => (
  <div className="h-full flex flex-col relative">
    {/* Map Layer */}
    <div className="flex-1 relative border-b border-[#333]">
      <VectorMap />
      
      {/* HUD Overlay */}
      <div className="absolute top-2 left-2 p-1 bg-black/80 border border-[#333] backdrop-blur-sm">
        <MonoText size="xs" color={THEME.dim}>LAT: 34.0522 N</MonoText><br/>
        <MonoText size="xs" color={THEME.dim}>LNG: 118.243 W</MonoText>
      </div>

      <div className="absolute bottom-2 right-2 p-1 bg-black/80 border border-[#333]">
        <MonoText size="xs" color={THEME.accent}>ZONE: ACTIVE</MonoText>
      </div>
    </div>

    {/* Control Deck */}
    <div className="h-1/3 bg-[#0A0A0A] p-3 flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-[#222] pb-2">
        <MonoText>NEARBY_TRAFFIC</MonoText>
        <Activity size={14} color={THEME.cyan} />
      </div>
      
      <div className="space-y-2 overflow-y-auto">
        {[
          { id: 'DRN-01', type: 'Delivery', alt: '120m', status: 'AUTH', color: THEME.cyan },
          { id: 'UNK-99', type: 'Unknown', alt: '045m', status: 'WARN', color: THEME.warning },
          { id: 'SUR-X', type: 'Survey', alt: '200m', status: 'AUTH', color: THEME.dim },
        ].map((drone, i) => (
          <div key={i} className="flex justify-between items-center p-2 border border-[#222] hover:border-[#444] bg-[#111]">
            <div className="flex items-center gap-2">
              <Indicator active={true} color={drone.color} />
              <div className="flex flex-col">
                <MonoText color={drone.color === THEME.dim ? '#666' : '#FFF'}>{drone.id}</MonoText>
                <MonoText size="xs" color="#444">{drone.type}</MonoText>
              </div>
            </div>
            <MonoText size="xs" color={THEME.dim}>ALT: {drone.alt}</MonoText>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 3. SYSTEM STATS
const SystemStats = () => (
  <div className="h-full p-4 flex flex-col gap-4 bg-[#080808]">
    {/* Header Block */}
    <Box className="p-3 flex justify-between items-start">
      <div>
        <MonoText color={THEME.dim} className="block mb-1">SYSTEM_STATUS</MonoText>
        <MonoText size="lg" color={THEME.success}>NOMINAL</MonoText>
      </div>
      <div className="flex gap-1">
        <Indicator active={true} color={THEME.success} />
        <Indicator active={true} color={THEME.success} />
        <Indicator active={false} />
      </div>
    </Box>

    {/* Battery/Power */}
    <Box className="p-3 space-y-4">
      <div className="flex justify-between border-b border-[#222] pb-2">
        <MonoText>POWER_GRID</MonoText>
        <Zap size={14} color={THEME.warning} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <MonoText size="xs" color={THEME.dim} className="mb-1">MAIN_BUS_A</MonoText>
          <MonoText size="lg">24.2V</MonoText>
        </div>
        <div>
          <MonoText size="xs" color={THEME.dim} className="mb-1">DRAW</MonoText>
          <MonoText size="lg">1.2A</MonoText>
        </div>
      </div>
      
      <ProgressBar value={82} label="BATTERY_LEVEL" />
    </Box>

    {/* Network */}
    <Box className="p-3 space-y-3 flex-1">
      <div className="flex justify-between border-b border-[#222] pb-2">
        <MonoText>NETWORK_IO</MonoText>
        <Globe size={14} color={THEME.cyan} />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-[#111] border border-[#222]">
          <MonoText size="xs">UPLINK_SAT</MonoText>
          <div className="flex gap-1">
            {[1,1,1,1,0].map((v, i) => (
              <div key={i} className={`w-1 h-3 ${v ? 'bg-[#00CCFF]' : 'bg-[#222]'}`} />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center p-2 bg-[#111] border border-[#222]">
          <MonoText size="xs">LOCAL_RF</MonoText>
          <div className="flex gap-1">
            {[1,1,1,0,0].map((v, i) => (
              <div key={i} className={`w-1 h-3 ${v ? 'bg-[#EBE4C8]' : 'bg-[#222]'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 border border-[#222] h-24 relative bg-[#050505] p-1">
        <div className="absolute top-1 left-1 text-[8px] text-[#444]">SPECTROGRAPH</div>
        <div className="flex items-end h-full gap-[2px]">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="w-full bg-[#222] hover:bg-[#EBE4C8] transition-colors"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>
    </Box>
  </div>
);

// 4. PERMISSIONS / CONFIG
const ConfigScreen = () => (
  <div className="h-full p-4 flex flex-col gap-4 bg-[#080808]">
    <div className="border-b border-[#333] pb-2 mb-2">
      <MonoText>PROTOCOL_CONFIG</MonoText>
    </div>

    {/* Toggles */}
    <Box className="p-0">
      {[
        { label: 'ALLOW_OVERFLIGHT', active: true, warn: false },
        { label: 'AUTO_INTERCEPT', active: false, warn: true },
        { label: 'DATA_LOGGING', active: true, warn: false },
        { label: 'BEACON_BROADCAST', active: true, warn: false },
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center p-3 border-b border-[#222] last:border-0 hover:bg-[#151515] cursor-pointer group">
          <MonoText color={item.active ? THEME.text : THEME.dim}>{item.label}</MonoText>
          <div className={`w-8 h-4 border ${item.active ? (item.warn ? 'border-[#FF3300]' : 'border-[#EBE4C8]') : 'border-[#333]'} p-[2px] flex items-center`}>
            <div className={`w-3 h-full transition-transform ${item.active ? 'translate-x-4' : ''} ${item.active ? (item.warn ? 'bg-[#FF3300]' : 'bg-[#EBE4C8]') : 'bg-[#333]'}`} />
          </div>
        </div>
      ))}
    </Box>

    {/* Radius Slider */}
    <Box className="p-4 space-y-4">
      <MonoText size="xs" color={THEME.dim}>DEFENSE_RADIUS</MonoText>
      <div className="flex items-center justify-between">
        <MonoText size="lg" color={THEME.accent}>150 M</MonoText>
        <Shield size={16} color={THEME.accent} />
      </div>
      <div className="h-6 w-full bg-[#111] border border-[#333] relative flex items-center px-1">
        <div className="absolute left-0 h-full bg-[#222] w-[60%]" />
        <div className="z-10 w-4 h-4 bg-[#000] border border-[#EBE4C8] ml-[60%]" />
        {/* Ticks */}
        <div className="absolute inset-0 flex justify-between px-2">
          {[...Array(10)].map((_, i) => <div key={i} className="w-[1px] h-full bg-[#222]" />)}
        </div>
      </div>
    </Box>

    {/* Terminal Output */}
    <div className="flex-1 bg-[#000] border border-[#333] p-2 font-mono text-[9px] text-[#444] overflow-hidden">
      <p>> config updated: 14:22:01</p>
      <p>> radius set to 150m</p>
      <p>> warning: auto_intercept is disabled</p>
      <p>> scanning local frequencies...</p>
      <p className="animate-pulse">_</p>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function DroneMap() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EAEAEA] p-8 flex flex-col items-center">
      
      <header className="mb-12 text-center">
        <h1 className="text-2xl font-mono tracking-widest text-[#EBE4C8] mb-2">AIRSPACE_HELIOS</h1>
        <p className="text-[10px] font-mono text-[#555] uppercase tracking-[0.5em]">Tactical Drone Defense System</p>
      </header>

      <div className="flex gap-12 overflow-x-auto pb-12 w-full justify-center px-4 snap-x">
        
        <RuggedDevice label="BOOT_SEQ">
          <InitScreen />
        </RuggedDevice>

        <RuggedDevice label="LIVE_OPS">
          <LiveMonitor />
        </RuggedDevice>

        <RuggedDevice label="SYS_DIAG">
          <SystemStats />
        </RuggedDevice>

        <RuggedDevice label="CONFIG">
          <ConfigScreen />
        </RuggedDevice>

      </div>

      <div className="mt-8 border border-[#333] p-4 max-w-2xl w-full bg-[#0A0A0A]">
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={14} color={THEME.bone} />
          <MonoText>SYSTEM_LOG</MonoText>
        </div>
        <div className="font-mono text-[10px] text-[#555] space-y-1">
          <p>14:20:05 [INFO] User logged in from 192.168.1.4</p>
          <p>14:20:08 [WARN] Weak signal on Channel 4</p>
          <p>14:20:12 [INFO] Drone id:DRN-01 identified as 'Friendly'</p>
          <p>14:20:15 [CRIT] UNKNOWN SIGNAL DETECTED IN SECTOR 7</p>
        </div>
      </div>

    </div>
  );
}
