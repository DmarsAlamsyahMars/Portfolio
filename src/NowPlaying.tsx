import React, { useState, useEffect } from 'react';

const playlist = [
  { title: "Delulu", artist: "KiiiKiii", bg: "/kiiikiiibg.webp", cd: "/kiiikiiicd.webp" },
  { title: "worst behavior", artist: "Ariana Grande", bg: "/agbg.webp", cd: "/agcd.webp" },
  { title: "The Chase", artist: "Hearts2Hearts", bg: "/chasebg.webp", cd: "/chasecd.webp" },
  { title: "surprise party", artist: "Yel", bg: "/yelbg.webp", cd: "/yelcd.webp" },
  { title: "2AM", artist: "SZA", bg: "/szabg.webp", cd: "/szacd.webp" },
];

const NowPlaying: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  const handleNextTrack = () => {
    // Prevent overlapping clicks while a crossfade is already happening
    if (nextIndex !== null) return; 
    
    const upcomingIndex = (currentIndex + 1) % playlist.length;
    setNextIndex(upcomingIndex);
    
    // Match this timeout to the Tailwind duration-500 class below
    setTimeout(() => {
      setCurrentIndex(upcomingIndex);
      setNextIndex(null);
    }, 500); 
  };

  // Auto-swap every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextTrack();
    }, 10000);

    // Cleanup the interval on unmount or when the track changes
    // This ensures the 10s timer resets if the user manually clicks the widget!
    return () => clearInterval(timer);
  }, [currentIndex, nextIndex]); 

  const currentTrack = playlist[currentIndex];
  const overlayTrack = nextIndex !== null ? playlist[nextIndex] : currentTrack;

  return (
    <div 
      onClick={handleNextTrack}
      className="relative w-full max-w-sm h-28 mt-4 rounded-[20px] overflow-hidden flex items-center shadow-lg font-sans cursor-pointer select-none active:scale-[0.98] transition-transform duration-200 ease-out bg-zinc-900"
    >
      
      {/* Static Top Right Icon */}
      <img 
        src="/smallicon.webp" 
        alt="Status Icon" 
        className="absolute top-3 right-4 w-6 h-6 object-contain z-30 opacity-90"
      />

      {/* BASE LAYER: The Current Track */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src={currentTrack.bg} alt="Background blur" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        <div className="relative z-10 flex items-center w-full h-full px-5 gap-4">
          <div className="flex-shrink-0">
            <img src={currentTrack.cd} alt="Vinyl CD" className="w-24 h-24 rounded-full shadow-md animate-[spin_7s_linear_infinite]" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-300 font-black text-[10px] tracking-widest uppercase mb-1">Now Playing</p>
            <p className="text-white font-semibold text-lg leading-tight">{currentTrack.title}</p>
            <p className="text-white/80 font-medium text-sm">{currentTrack.artist}</p>
          </div>
        </div>
      </div>

      {/* OVERLAY LAYER: The Incoming Track (Fades in over the base layer) */}
      <div 
        className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-500 ease-in-out ${
          nextIndex !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img src={overlayTrack.bg} alt="Background blur" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        <div className="relative z-10 flex items-center w-full h-full px-5 gap-4">
          <div className="flex-shrink-0">
            <img src={overlayTrack.cd} alt="Vinyl CD" className="w-24 h-24 rounded-full shadow-md animate-[spin_7s_linear_infinite]" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-300 font-black text-[10px] tracking-widest uppercase mb-1">Now Playing</p>
            <p className="text-white font-semibold text-lg leading-tight">{overlayTrack.title}</p>
            <p className="text-white/80 font-medium text-sm">{overlayTrack.artist}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NowPlaying;