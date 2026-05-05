import React, { useState } from 'react';

const playlist = [
  { title: "Delulu", artist: "KiiiKiii", cd: "/kiiikiiicd.webp", album: "/delulualbum.webp" },
  { title: "worst behavior", artist: "Ariana Grande", cd: "/agcd.webp", album: "/agalbum.webp" },
  { title: "The Chase", artist: "Hearts2Hearts", cd: "/chasecd.webp", album: "/chasealbum.webp" },
  { title: "surprise party", artist: "Yel", cd: "/yelcd.webp", album: "/yelalbum.webp" },
  { title: "2AM", artist: "SZA", cd: "/szacd.webp", album: "/szaalbum.webp" },
];

const NowPlaying: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwapSong = () => {
    if (isSwapping) return;

    setIsSwapping(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
      setIsSwapping(false);
    }, 400); 
  };

  return (
    <div 
      onClick={handleSwapSong}
      className="group relative flex items-center w-[300px] h-48 font-sans cursor-pointer scale-[0.6] origin-top-left overflow-visible ml-6 lg:ml-0"
    >
      {/* SPINNING VINYL */}
      <div 
        className={`absolute left-0 w-48 h-48 rounded-full z-0 overflow-hidden shadow-xl shadow-black/5 transition-transform ${
          isSwapping 
            ? "translate-x-0 duration-400 ease-in"
            : "translate-x-24 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        }`}
      >
        <div className="relative w-full h-full animate-[spin_7s_linear_infinite]">
          {playlist.map((track, index) => (
            <img 
              key={track.cd}
              src={track.cd} 
              alt={`Vinyl CD for ${track.title}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* ALBUM COVER*/}
      <div className="relative z-10 w-48 h-48 bg-zinc-200 shadow-2xl shadow-black/40 overflow-hidden rounded-sm">
        
        {/* Album Images - Crossfading */}
        {playlist.map((track, index) => (
          <img 
            key={track.album}
            src={track.album} 
            alt={`Album cover for ${track.title}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        ))}

        {/* Dark gradient overlay at the bottom half */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none"></div>

        {/* Track Title and Artist */}
        {playlist.map((track, index) => (
          <div 
            key={`text-${track.album}`}
            className={`absolute bottom-3 right-3 text-right z-30 pointer-events-none transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-white/90 font-medium text-sm leading-tight tracking-tight drop-shadow-md">
              {track.title}
            </p>
            <p className="text-white font-bold text-xl leading-none mt-0.5 drop-shadow-lg">
              {track.artist}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default NowPlaying;