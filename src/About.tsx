import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NowPlaying from './NowPlaying';
import ToolStack from './ToolStack';
import ConnectIcons from './ConnectIcons';

// 1. Define the data structure
interface CardData {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  imgScale?: number;
  imgX?: string;
  imgY?: string;
}

const About: React.FC = () => {
  // Store the IDs of liked cards
  const [likedCardIds, setLikedCardIds] = useState<number[]>([]);

  const [cards, setCards] = useState<CardData[]>([
    { 
      id: 1, 
      src: '/images/about/aboutimg1.webp', 
      title: 'Hi! :-)', 
      subtitle: '',
      imgScale: 1,
      imgX: '0px', 
      imgY: '0px',
    },
    { 
      id: 2, 
      src: '/images/about/aboutimg2.webp', 
      title: 'i survived thesis defense!!!', 
      subtitle: 'Jul 2025' 
    },
    { 
      id: 3, 
      src: '/images/about/aboutimg3.webp', 
      title: 'grateful for a semester exchange at UM', 
      subtitle: 'Malaysia, 2024' 
    },
    { 
      id: 4, 
      src: '/images/about/aboutimg4.webp', 
      title: 'graduated!', 
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
      if (prev.includes(id)) return prev; 
      return [...prev, id];
    });
  };

  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-8 lg:gap-10 h-screen w-full overflow-y-auto lg:overflow-visible pb-32 lg:pb-12 px-4 lg:px-0">
      
      {/* Header */}
      <div className="shrink-0 z-10">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          About
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 w-full max-w-6xl mx-auto items-start md:items-center">

        {/* 1. Left Text */}
        <div className="animate-in fade-in slide-in-from-top-8 duration-700 delay-200 fill-mode-backwards">
          <p className="text-cool-900/80 font-sans text-sm lg:text-base leading-relaxed text-justify">
            I recently graduated in information systems, 
            where i found myself equally drawn to the logic 
            of coding and the craft of UI/UX, which stems 
            from my love for graphic design.
          </p>
          <p className="mt-4 text-cool-900/80 font-sans text-sm lg:text-base leading-relaxed text-justify">
            Honestly, i think the best digital experiences happen when we allow logic and creative intuition to work side by side.
          </p>
          {/* Render the Now Playing placeholder */}
          <div className="mt-8 lg:mt-6"></div>
          <NowPlaying />
        </div>

        {/* 2. Middle: Stack + Caption Container */}
        <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-8 duration-700 delay-400 fill-mode-backwards lg:-mt-20">
            
            {/* The Card Stack */}
            <div className="relative z-20 w-full aspect-[3/4] md:aspect-auto md:h-[50vh] flex items-center justify-center mb-6">
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
        <div className="animate-in fade-in slide-in-from-top-8 duration-700 delay-600 fill-mode-backwards lg:self-start lg:-mt-24">          <ToolStack />
          <p className="text-cool-900/80 font-sans text-sm lg:text-base leading-relaxed text-justify">
            What i've come to love most is the whole journey of sitting with a problem, understanding 
            the people in it, then crafting something that just feels right. 
          </p>
          <p className="mt-4 text-cool-900/80 font-sans text-sm lg:text-base leading-relaxed text-justify">
            From all of that, i came to love the craft just as much as 
            the conversations that shaped it.
          </p>
          <div className="mt-4"> {/* Adjust the number (8, 10, 12) to get the gap you want */}
          <ConnectIcons />
          </div>
        </div>

      </div>
    </div>
  );
};

// ---------------------------------------------------------
// REPAIRED CARD COMPONENT (Mobile & Desktop Compatible)
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
  const lastTapRef = useRef<number>(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Unified Like Handler (Animation + State)
  const triggerLike = () => {
    onLike();
    setShowBigHeart(true);
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => setShowBigHeart(false), 800);
  };

  // Mobile-safe Double Tap Detection
  const handleTap = () => {
    if (!isFront) return;
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      triggerLike();
      lastTapRef.current = 0; // Reset
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <motion.div
      drag={isFront} 
      dragElastic={0.6} 
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
      dragSnapToOrigin={true}
      
      // Use onTap for mobile compatibility instead of onDoubleClick
      onTap={handleTap} 

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

      // touch-action: none prevents the browser from zooming on double tap
      style={{ touchAction: 'none' }}
      className={`absolute w-[85%] h-[90%] rounded-xl shadow-lg select-none overflow-hidden bg-white ${isFront ? 'cursor-grab' : ''}`}
    >
      <img 
        src={card.src} 
        alt={card.title} 
        className="w-full h-full object-cover pointer-events-none"
        style={{
          // default to scale(1) and translate(0,0) if no values are provided
          transform: `scale(${card.imgScale || 1}) translate(${card.imgX || '0px'}, ${card.imgY || '0px'})`,
          // Optional: smooth transition if you plan to change these dynamically later
          transition: 'transform 0.3s ease' 
        }}
      />

      {/* Heart Indicator - Now clickable on single tap */}
      <div 
        onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's tap logic
            triggerLike();
        }}
        className="absolute top-4 right-4 z-10 p-2 cursor-pointer transition-transform active:scale-90"
      >
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