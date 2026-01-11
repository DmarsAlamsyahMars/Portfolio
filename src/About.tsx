import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Define the data structure
interface CardData {
  id: number;
  src: string;
  title: string;
  subtitle: string;
}

const About: React.FC = () => {
  // Store the IDs of liked cards
  const [likedCardIds, setLikedCardIds] = useState<number[]>([]);

  const [cards, setCards] = useState<CardData[]>([
    { 
      id: 1, 
      src: '/images/about/aboutimg1.webp', 
      title: 'Hi! :-)', 
      subtitle: 'A random selfie never hurt' 
    },
    { 
      id: 2, 
      src: '/images/about/aboutimg2.webp', 
      title: 'I survived thesis defense!!!', 
      subtitle: 'Jul 2025' 
    },
    { 
      id: 3, 
      src: '/images/about/aboutimg3.webp', 
      title: 'Grateful for a semester exchange at UM', 
      subtitle: 'Malaysia, 2024' 
    },
    { 
      id: 4, 
      src: '/images/about/aboutimg4.webp', 
      title: 'Graduated!', 
      subtitle: 'Telkom University, Nov 2025' 
    },
  ]);

  const moveToEnd = (fromIndex: number) => {
    setCards((currentCards) => {
      const newCards = [...currentCards];
      const [movedCard] = newCards.splice(fromIndex, 1);
      newCards.push(movedCard);
      return newCards;
    });
  };

  const toggleLike = (id: number) => {
    setLikedCardIds(prev => {
      if (prev.includes(id)) return prev; // Already liked, keep it (optional: remove to toggle off)
      return [...prev, id];
    });
  };

  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-8 lg:gap-10 h-screen w-full overflow-y-auto lg:overflow-hidden pb-32 lg:pb-12 px-4 lg:px-0">
      
      {/* Header */}
      <div className="animate-in fade-in slide-in-from-top-8 duration-700 shrink-0">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          About
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 w-full max-w-6xl mx-auto items-start md:items-center">

        {/* 1. Left Text */}
        <div className="animate-in fade-in slide-in-from-top-8 duration-700 delay-200 fill-mode-backwards">
          <p className="text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            I recently graduated in information systems, 
            where I found myself equally drawn to the logic 
            of coding and the craft of UI/UX, which stems 
            from my love for graphic design.
          </p>
          <p className="mt-4 text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            Honestly, I think the best digital experiences happen when we allow logic and creative intuition to work side by side.
          </p>
        </div>

        {/* 2. Middle: Stack + Caption Container */}
        <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-8 duration-700 delay-400 fill-mode-backwards">
            
            {/* The Card Stack */}
            <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[50vh] flex items-center justify-center mb-6">
                {cards.map((card, index) => {
                  return (
                    <Card 
                      key={card.id} 
                      card={card} 
                      index={index} 
                      onSwipe={() => moveToEnd(0)}
                      isLiked={likedCardIds.includes(card.id)}
                      onLike={() => toggleLike(card.id)}
                    />
                  );
                })}
            </div>

            {/* The Caption */}
            <div className="text-center h-16">
                <motion.div
                  key={cards[0].id} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                    <h3 className="text-cool-900 font-sans font-medium text-lg leading-tight">
                        {cards[0].title}
                    </h3>
                    <p className="text-cool-900/60 font-sans text-sm mt-1">
                        {cards[0].subtitle}
                    </p>
                </motion.div>
            </div>
        </div>

        {/* 3. Right Text */}
        <div className="animate-in fade-in slide-in-from-top-8 duration-700 delay-600 fill-mode-backwards">
          <p className="text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            When I was helping the Procurement Division at the West Java government Institution 
            to simplify their procurement systems, I learned that building the software is only 
            half the job. The real work was learning how to truly listen to stakeholder requests 
            and communicate progress professionally so we could reach the goal together.
          </p>
          <p className="mt-4 text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            And back at university, leading a design division in IOSBC taught me a different kind of lesson. 
            it was where I learned how to lead a team and to support the people I worked with.
          </p>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------------
// UPDATED CARD COMPONENT
// ---------------------------------------------------------

interface CardProps {
  card: CardData;
  index: number;
  onSwipe: () => void;
  isLiked: boolean;
  onLike: () => void;
}

const Card = ({ card, index, onSwipe, isLiked, onLike }: CardProps) => {
  const isFront = index === 0;
  const [showBigHeart, setShowBigHeart] = useState(false);
  const clickTimeoutRef = useRef<number | null>(null);

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

  // Handle Double Click logic
  const handleDoubleClick = () => {
    if (!isFront) return;
    
    // Trigger the like state in parent
    onLike();
    
    // Trigger local big heart animation
    setShowBigHeart(true);
    
    // Reset animation after it plays
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setShowBigHeart(false);
    }, 800);
  };

  return (
    <motion.div
      drag={isFront} 
      dragElastic={0.6} 
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
      dragSnapToOrigin={true}
      
      onDoubleClick={handleDoubleClick} // Double click to like!

      animate={{
        x: position.x,
        y: position.y,
        rotate: position.rotate,
        scale: position.scale,
        zIndex: position.zIndex,
        opacity: position.opacity
      }}
      
      transition={{ 
        type: "spring", stiffness: 200, damping: 20,
        opacity: { duration: 0.2 } 
      }}

      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(e, info) => {
        const threshold = 100;
        if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
          onSwipe();
        }
      }}

      // Changed from img to div wrapper to support overlays
      className={`absolute w-[85%] h-[90%] rounded-xl shadow-lg select-none overflow-hidden bg-white ${isFront ? 'cursor-grab' : ''}`}
    >
      {/* 1. The Image */}
      <img 
        src={card.src} 
        alt={card.title} 
        className="w-full h-full object-cover pointer-events-none" 
      />

      {/* 2. The Corner Heart Indicator (Top Right) */}
      <div className="absolute top-4 right-4 z-10 transition-transform active:scale-90">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className={`w-7 h-7 drop-shadow-md transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent text-white/60 stroke-[2px]'}`}
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>

      {/* 3. The "Big Heart" Pop-up Animation */}
      <AnimatePresence>
        {showBigHeart && (
            <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-24 h-24 fill-white text-white drop-shadow-xl opacity-60"
                    stroke="currentColor" 
                    strokeWidth="0"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
            </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default About;