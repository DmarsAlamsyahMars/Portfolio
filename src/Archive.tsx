import React, { useState } from 'react';

// MOVED FROM APP: The "Database" of Collectibles 
const ARCHIVE_DATABASE = [
  { id: 1, type: 'video', src: '/archive1.mp4' }, 
  { id: 2, type: 'text', quote: "An absolute joy to work with. Brought our vision to life seamlessly!", name: "Sarah Jenkins", role: "Product Manager" },
  { id: 3, type: 'switching-card', srcFront: '/archive3b.webp', srcBack: '/archive3a.webp' },
  { id: 4, type: 'text', quote: "Having Dmars as the lead creative in charge was a huge relief as I could fully trust his visual direction which he consistently delivered with a sharp creative eye", name: "Amelia", role: "Captain of IOSBC" },
  { id: 5, type: 'text', quote: "The best interactive portfolio we've seen this year. Highly recommended.", name: "Emily Rodriguez", role: "Creative Director" },
];

const Archive: React.FC = () => {
  return (
    // Kept the larger bottom padding to ensure navbar clearance
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-6 lg:gap-8 min-h-screen w-full px-4 lg:px-0 relative pb-12 lg:pb-32">
      
      {/* 1. Header Section */}
      <div className="flex items-end justify-between animate-in fade-in slide-in-from-top-8 duration-700 shrink-0 z-10 w-full px-2">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Archive
        </h1>
        {/* Counter removed */}
      </div>

      {/* 2. Grid Container */}
      {/* Restored max-w-4xl to keep horizontal width intact */}
      <div className="w-full max-w-4xl mx-auto min-h-[50vh] animate-in fade-in slide-in-from-top-8 duration-700 delay-200 fill-mode-backwards mb-0 lg:mb-12 px-2 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 grid-flow-dense auto-rows-max">
          {ARCHIVE_DATABASE.map((item, index) => {
            
            // --- RENDER TEXT (TESTIMONIALS) ---
            if (item.type === 'text') {
              return (
                <div 
                  key={item.id} 
                  className="col-span-2 bg-cool-100 border border-dashed border-cool-300 rounded-none p-5 shadow-sm flex flex-col items-start justify-center gap-3 animate-in zoom-in duration-500"
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

            // --- RENDER SWITCHING CARD ---
            if (item.type === 'switching-card') {
              return <SwitchingCard key={item.id} item={item} index={index} />;
            }

            // --- RENDER VIDEO ---
            if (item.type === 'video') {
              return <VideoCard key={item.id} item={item} index={index} />;
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

// --- MINI COMPONENT: VIDEO CARD ---
const VideoCard = ({ item, index }: { item: any, index: number }) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleInteraction = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsTapped(!isTapped);
    }
  };

  return (
    <div 
      onClick={handleInteraction}
      // Changed from aspect-square to aspect-[4/3] to shrink vertically
      className="col-span-1 aspect-[4/3] bg-cool-200 rounded-xl overflow-hidden shadow-sm animate-in zoom-in duration-500 cursor-pointer lg:cursor-default group relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <video 
        src={item.src} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center z-10 lg:group-hover:opacity-100 ${isTapped ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-white font-sans text-sm font-medium tracking-wide">
          me and friends:))
        </span>
      </div>
    </div>
  );
};

// --- MINI COMPONENT: SWITCHING CARD ---
const SwitchingCard = ({ item, index }: { item: any, index: number }) => {
  const [isSwapped, setIsSwapped] = useState(false);

  return (
    <div 
      onClick={() => setIsSwapped(!isSwapped)}
      // Changed from aspect-square to aspect-[4/3] to shrink vertically
      className="col-span-1 aspect-[4/3] animate-in zoom-in duration-500 hover:scale-[1.03] transition-transform cursor-pointer group relative flex items-center justify-center overflow-visible"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* BACK CARD */}
      <img 
        src={item.srcBack} 
        alt="Card Back" 
        className={`absolute w-[85%] h-[85%] object-cover rounded-md shadow-md transition-all duration-500 ease-in-out ${
          isSwapped 
            ? 'z-10 -rotate-6 translate-y-2 -translate-x-1' 
            : 'z-0 rotate-6 -translate-y-1 translate-x-1'   
        }`} 
        onError={(e) => e.currentTarget.style.display = 'none'} 
      />

      {/* FRONT CARD */}
      <img 
        src={item.srcFront} 
        alt="Card Front" 
        className={`absolute w-[85%] h-[85%] object-cover object-bottom rounded-md shadow-lg transition-all duration-500 ease-in-out ${
          isSwapped 
            ? 'z-0 rotate-6 -translate-y-1 translate-x-1'   
            : 'z-10 -rotate-6 translate-y-2 -translate-x-1' 
        }`} 
        onError={(e) => e.currentTarget.style.display = 'none'} 
      />
    </div>
  );
};

export default Archive;