import React from 'react';
import { motion } from 'framer-motion';

// --- CONFIGURATION ---
const WORKS = [
  { 
    id: 1, 
    src: '/images/aboutproject.webp',
    // Desktop: Top Left
    desktop: { left: '2%', top: '20%', rotate: -4 },
    // Mobile: Stacked
    mobile: { rotate: -3, marginLeft: '-2rem' },
    delay: 0.1 
  },
  { 
    id: 2, 
    src: '/images/aboutproject.webp',
    // Desktop: Bottom Left-ish
    desktop: { left: '22%', top: '60%', rotate: 3 },
    mobile: { rotate: 2, marginRight: '-2rem' },
    delay: 0.2
  },
  { 
    id: 3, 
    src: '/images/aboutproject.webp',
    // Desktop: Top Center
    desktop: { left: '42%', top: '15%', rotate: -2 },
    mobile: { rotate: -1, marginLeft: '1rem' },
    delay: 0.3
  },
  { 
    id: 4, 
    src: '/images/aboutproject.webp',
    // Desktop: Bottom Right-ish
    desktop: { left: '62%', top: '55%', rotate: 5 },
    mobile: { rotate: 4, marginRight: '1rem' },
    delay: 0.4
  },
  { 
    id: 5, 
    src: '/images/aboutproject.webp',
    // Desktop: Top Right
    desktop: { left: '82%', top: '25%', rotate: -5 },
    mobile: { rotate: -2, marginLeft: '-1.5rem' },
    delay: 0.5
  },
];

const Lab: React.FC = () => {
  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 h-screen w-full relative overflow-hidden bg-transparent px-4 lg:px-0">
      
      {/* 1. Header */}
      <div className="animate-in fade-in slide-in-from-top-8 duration-700 shrink-0 z-20 pointer-events-none">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Lab
        </h1>
      </div>

      {/* 2. Main Container */}
      <div className="flex-1 w-full h-full relative overflow-y-auto lg:overflow-hidden scrollbar-hide z-10">
        
        {/* CARDS WRAPPER */}
        <div className="flex flex-col items-center gap-24 py-24 lg:block lg:py-0 lg:h-full w-full max-w-full">
          
          {WORKS.map((work) => (
            <motion.div
              key={work.id}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 15, 
                delay: work.delay 
              }}
              
              // CONTAINER SIZE
              // Mobile: 70vw width
              // Desktop: 14vw width (Smaller to prevent mashing)
              className="relative w-[70vw] aspect-[3/4] lg:absolute lg:w-[14vw] lg:h-[19vw] shrink-0"
            >
              
              {/* DESKTOP POSITIONING */}
              <div className="hidden lg:block absolute inset-0 transition-transform duration-500 hover:z-50 hover:scale-105" 
                   style={{ 
                     left: work.desktop.left, 
                     top: work.desktop.top, 
                     transform: `rotate(${work.desktop.rotate}deg)` 
                   }}
              >
                 <FlatCard src={work.src} />
              </div>

              {/* MOBILE POSITIONING */}
              <div className="block lg:hidden w-full h-full"
                   style={{
                     transform: `rotate(${work.mobile.rotate}deg)`,
                     marginLeft: work.mobile.marginLeft || 0,
                     marginRight: work.mobile.marginRight || 0,
                   }}
              >
                  <FlatCard src={work.src} />
              </div>

            </motion.div>
          ))}

          {/* Spacer for Mobile bottom scrolling */}
          <div className="h-32 lg:hidden" />
        </div>
      </div>
    </div>
  );
};

// --- CLEAN FLAT CARD COMPONENT ---
const FlatCard = ({ src }: { src: string }) => {
  return (
    <div className="relative w-full h-full group cursor-pointer">
      
      {/* CLEAN IMAGE CONTAINER */}
      {/* Removed: Shadows, Glow, Blur layers. 
          Added: Simple border for crisp definition against background. */}
      <div className="w-full h-full bg-cool-100 rounded-sm overflow-hidden border border-cool-200">
        <img 
          src={src} 
          alt="design work" 
          className="w-full h-full object-cover" 
        />
        
        {/* Optional: Very subtle white overlay on hover to indicate interactivity */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </div>

    </div>
  );
};

export default Lab;