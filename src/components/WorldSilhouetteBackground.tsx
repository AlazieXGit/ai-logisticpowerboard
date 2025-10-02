import React from 'react';

const WorldSilhouetteBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30" />
      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 animate-pulse"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor" className="text-blue-600">
          {/* North America */}
          <path d="M150 150 Q200 120 250 140 L280 160 Q300 180 320 200 L350 220 Q380 240 400 260 L420 280 Q440 300 460 320 L480 340 Q500 360 520 380 L540 400 Q560 420 580 440 Z" />
          
          {/* South America */}
          <path d="M200 300 Q220 320 240 340 L260 360 Q280 380 300 400 L320 420 Q340 440 360 460 L380 480 Q400 500 420 520 Z" />
          
          {/* Europe */}
          <path d="M450 120 Q470 100 490 120 L510 140 Q530 160 550 180 L570 200 Q590 220 610 240 Z" />
          
          {/* Africa */}
          <path d="M480 200 Q500 220 520 240 L540 260 Q560 280 580 300 L600 320 Q620 340 640 360 L660 380 Q680 400 700 420 Z" />
          
          {/* Asia */}
          <path d="M600 100 Q620 80 640 100 L660 120 Q680 140 700 160 L720 180 Q740 200 760 220 L780 240 Q800 260 820 280 Z" />
          
          {/* Australia */}
          <path d="M750 350 Q770 330 790 350 L810 370 Q830 390 850 410 L870 430 Q890 450 910 470 Z" />
          
          {/* Connecting lines representing global network */}
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3">
            <line x1="300" y1="200" x2="500" y2="150" />
            <line x1="500" y1="150" x2="700" y2="150" />
            <line x1="300" y1="200" x2="550" y2="250" />
            <line x1="550" y1="250" x2="800" y2="200" />
            <line x1="300" y1="350" x2="550" y2="300" />
            <line x1="700" y1="200" x2="820" y2="400" />
          </g>
        </g>
      </svg>
      
      {/* Animated dots representing global connectivity */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorldSilhouetteBackground;