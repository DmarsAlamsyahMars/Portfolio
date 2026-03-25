import React, { useState } from 'react';

const playlist = [
  { title: "Delulu", artist: "KiiiKiii", cd: "/kiiikiiicd.webp" },
  { title: "worst behavior", artist: "Ariana Grande", cd: "/agcd.webp" },
  { title: "The Chase", artist: "Hearts2Hearts", cd: "/chasecd.webp" },
  { title: "surprise party", artist: "Yel", cd: "/yelcd.webp" },
  { title: "2AM", artist: "SZA", cd: "/szacd.webp" },
];

const NowPlaying: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTrack = playlist[currentIndex];

  const handleSwapSong = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  return (
    <div 
      onClick={handleSwapSong}
      className="group flex items-center w-full max-w-sm mt-4 gap-5 font-sans cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
    >
      
      {/* VINYL PLAYER STACK */}
      <div className="relative w-32 h-32 flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-lg">
        
        {/* LAYER 1: Player Base */}
        <img 
          src="/player1.webp" 
          alt="Vinyl Player Base" 
          className="absolute inset-0 w-full h-full object-contain z-0" 
        />
        
        {/* LAYER 2: Spinning CD (Sandwiched & Crossfaded) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Continuous spinning wrapper */}
          <div className="relative w-[80%] h-[80%] animate-[spin_7s_linear_infinite]">
            {playlist.map((track, index) => (
              <img 
                key={track.cd}
                src={track.cd} 
                alt={`Vinyl CD for ${track.title}`} 
                // Stack them absolutely. Toggle opacity based on whether it's the active track.
                className={`absolute inset-0 w-full h-full rounded-full transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* LAYER 3: Player Needle */}
        <img 
          src="/player2.webp" 
          alt="Vinyl Needle" 
          className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none" 
        />

      </div>

      {/* TEXT CONTAINER */}
      <div className="flex flex-col justify-center">
        <p className="text-gray-500 font-black text-[10px] tracking-widest uppercase mb-1">Now Playing</p>
        <p className="text-zinc-600 font-semibold text-lg leading-tight transition-colors duration-300 group-hover:text-zinc-900">
          {currentTrack.title}
        </p>
        <p className="text-gray-400 font-medium text-sm transition-colors duration-300 group-hover:text-gray-500">
          {currentTrack.artist}
        </p>
      </div>

    </div>
  );
};

export default NowPlaying;