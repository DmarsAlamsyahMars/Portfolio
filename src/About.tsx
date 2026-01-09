import React, { useState } from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [cards, setCards] = useState([
    '/images/about/aboutimg1.webp',
    '/images/about/aboutimg2.webp',
    '/images/about/aboutimg3.webp',
    '/images/about/aboutimg4.webp',
  ]);

  const moveToEnd = (fromIndex: number) => {
    setCards((currentCards) => {
      const newCards = [...currentCards];
      const [movedCard] = newCards.splice(fromIndex, 1);
      newCards.push(movedCard);
      return newCards;
    });
  };

  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-8 lg:gap-10 min-h-screen w-full pb-32 lg:pb-12 px-4 lg:px-0">
      
      {/* Header */}
      <div className="animate-in slide-in-from-bottom-4 duration-700 shrink-0">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          About
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 w-full max-w-6xl mx-auto animate-in fade-in zoom-in-[0.99] duration-700 delay-100 items-start md:items-center">

        {/* Left Text */}
        <div className="order-2 md:order-1">
          <p className="text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
        </div>

        {/* --- MIDDLE: INTERACTIVE STACK --- */}
        <div className="relative order-1 md:order-2 w-full aspect-[3/4] md:aspect-auto md:h-[60vh] flex items-center justify-center">
            {cards.map((img, index) => {
              return (
                <Card 
                  key={img} 
                  img={img} 
                  index={index} 
                  onSwipe={() => moveToEnd(0)}
                />
              );
            })}
        </div>

        {/* Right Text */}
        <div className="order-3 md:order-3">
          <p className="text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
          </p>
        </div>

      </div>
    </div>
  );
};

const Card = ({ img, index, onSwipe }: { img: string, index: number, onSwipe: () => void }) => {
  const isFront = index === 0;

  // Define the "Messy" positions using raw numbers for Framer Motion to interpolate smoothly
  // x/y are pixels, rotate is degrees
  const getPosition = (idx: number) => {
    switch(idx) {
      case 0: return { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 50, opacity: 1 };
      case 1: return { x: 15, y: -15, rotate: 4, scale: 0.95, zIndex: 40, opacity: 1 };
      case 2: return { x: -10, y: 15, rotate: -3, scale: 0.95, zIndex: 30, opacity: 1 };
      case 3: return { x: -18, y: 5, rotate: -6, scale: 0.9, zIndex: 20, opacity: 1 };
      default: return { x: 0, y: 0, rotate: 0, scale: 0.8, zIndex: 0, opacity: 0 };
    }
  };

  const position = getPosition(index);

  return (
    <motion.img
      src={img}
      alt="About me"
      // 1. DRAG PROPS
      drag={isFront} 
      dragElastic={0.6} // Rubber band effect
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Constraints anchor it to center
      dragSnapToOrigin={true} // Ensures it always tries to go back home
      
      // 2. ANIMATION PROPS (The Fix)
      // We explicitly animate x, y, and rotate based on index. 
      // This overrides the "dropped" drag position immediately when index changes.
      animate={{
        x: position.x,
        y: position.y,
        rotate: position.rotate,
        scale: position.scale,
        zIndex: position.zIndex,
        opacity: position.opacity
      }}
      
      // 3. TRANSITION
      transition={{ 
        // Spring for position (snappy)
        type: "spring", stiffness: 200, damping: 20,
        // Linear for opacity to avoid flashing
        opacity: { duration: 0.2 } 
      }}

      // 4. EVENTS
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(e, info) => {
        const threshold = 100;
        // Check distance dragged
        if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
          onSwipe();
        }
      }}

      // 5. STYLING
      // Removed all transform classes (rotate, translate) so they don't conflict with Framer
      className={`absolute w-[85%] h-[85%] object-cover rounded-xl shadow-lg select-none ${isFront ? 'cursor-grab' : ''}`}
    />
  );
};

export default About;