import React, { useState } from 'react';

interface ArchiveProps {
  items: any[];
}

const Archive: React.FC<ArchiveProps> = ({ items }) => {
  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-6 lg:gap-8 h-screen w-full px-4 lg:px-0 relative overflow-y-auto pb-32 lg:pb-12">
      
      {/* 1. Header Section */}
      <div className="flex items-end justify-between animate-in fade-in slide-in-from-top-8 duration-700 shrink-0 z-10 w-full px-2">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Archive
        </h1>
        <span className="text-sm text-cool-900/60 font-medium pb-1 lg:pb-2 font-sans">
          {items.length}/5
        </span>
      </div>

      {/* 2. Grid Container */}
      <div className="w-full max-w-4xl mx-auto min-h-[50vh] animate-in fade-in slide-in-from-top-8 duration-700 delay-200 fill-mode-backwards mb-12 px-2">
        {items.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center text-cool-900/40 gap-2 mt-16 font-sans">
            <span className="text-5xl mb-2">🛸</span>
            <p className="text-base font-medium text-cool-900/70">The archive is empty.</p>
            <p className="text-sm">Catch a wandering UFO to collect a memory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 grid-flow-dense auto-rows-max">
            {items.map((item, index) => {
              
              // --- RENDER TEXT (TESTIMONIALS) ---
              if (item.type === 'text') {
                return (
                  <div 
                    key={item.id} 
                    className="col-span-2 bg-cool-100 border border-dashed border-cool-300 rounded-none p-5 shadow-sm flex flex-col items-start justify-center gap-3 animate-in zoom-in duration-500 hover:scale-[1.02] transition-transform cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <p className="text-sm text-cool-900/80 italic font-sans leading-relaxed">
                      "{item.quote}"
                    </p>
                    <div className="mt-auto pt-2">
                      <p className="text-sm font-bold text-cool-900 font-sans">{item.name}</p>
                      <p className="text-[10px] text-cool-900/60 font-sans uppercase tracking-wider">{item.role}</p>
                    </div>
                  </div>
                );
              }

              // --- RENDER SWITCHING CARD (NEW!) ---
              if (item.type === 'switching-card') {
                return <SwitchingCard key={item.id} item={item} index={index} />;
              }

              // --- RENDER VIDEO ---
              if (item.type === 'video') {
                return (
                  <div 
                    key={item.id} 
                    className="col-span-1 aspect-square bg-cool-200 rounded-xl overflow-hidden shadow-sm animate-in zoom-in duration-500 hover:scale-[1.03] transition-transform cursor-pointer group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <video 
                      src={item.src} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MINI COMPONENT: SWITCHING CARD ---
// Handles the local state for swapping the front and back cards
const SwitchingCard = ({ item, index }: { item: any, index: number }) => {
  const [isSwapped, setIsSwapped] = useState(false);

  return (
    <div 
      onClick={() => setIsSwapped(!isSwapped)}
      className="col-span-1 aspect-square animate-in zoom-in duration-500 hover:scale-[1.03] transition-transform cursor-pointer group relative flex items-center justify-center overflow-visible"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* BACK CARD (archive3a) - Tilted right, positioned slightly higher */}
      <img 
        src={item.srcBack} 
        alt="Card Back" 
        className={`absolute w-[85%] h-[85%] object-cover rounded-md shadow-md transition-all duration-500 ease-in-out ${
          isSwapped 
            ? 'z-10 -rotate-6 translate-y-2 -translate-x-1' // Moves to front
            : 'z-0 rotate-6 -translate-y-1 translate-x-1'   // Stays in back
        }`} 
        onError={(e) => e.currentTarget.style.display = 'none'} 
      />

      {/* FRONT CARD (archive3b) - Tilted left, positioned slightly below */}
      <img 
        src={item.srcFront} 
        alt="Card Front" 
        className={`absolute w-[85%] h-[85%] object-cover rounded-md shadow-lg transition-all duration-500 ease-in-out ${
          isSwapped 
            ? 'z-0 rotate-6 -translate-y-1 translate-x-1'   // Moves to back
            : 'z-10 -rotate-6 translate-y-2 -translate-x-1' // Stays in front
        }`} 
        onError={(e) => e.currentTarget.style.display = 'none'} 
      />
    </div>
  );
};

export default Archive;