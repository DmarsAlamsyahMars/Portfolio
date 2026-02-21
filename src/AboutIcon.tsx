import React, { useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';

const icons = [
  { 
    id: 'music', 
    src: '/music_icon.webp', 
    alt: 'Music', 
    hoverRotate: 5,
    bubbles: [
      { src: '/images/about/music1.webp', align: 'left' },
      { src: '/images/about/music2.webp', align: 'right' },
      { src: '/images/about/music3.webp', align: 'left' },
      { src: '/images/about/music4.webp', align: 'right' },
      { src: '/images/about/music5.webp', align: 'left' },
    ]
  },
  { 
    id: 'settings', 
    src: '/settings_icon.webp', 
    alt: 'Settings', 
    hoverRotate: -5, 
    bubbles: [
      { src: '/images/about/tools1.webp', align: 'left' },
      { src: '/images/about/tools2.webp', align: 'right' },
      { src: '/images/about/tools3.webp', align: 'left' },
      { src: '/images/about/tools4.webp', align: 'right' },
      { src: '/images/about/tools5.webp', align: 'left' },
      { src: '/images/about/tools6.webp', align: 'right' },
    ]
  },
  { 
    id: 'movies', 
    src: '/movies_icon.webp', 
    alt: 'Movies', 
    hoverRotate: 5, 
    bubbles: [
      { src: '/images/about/movie1.webp', align: 'left' },
      { src: '/images/about/movie2.webp', align: 'right' },
      { src: '/images/about/movie3.webp', align: 'left' },
      { src: '/images/about/movie4.webp', align: 'right' },
      { src: '/images/about/movie5.webp', align: 'left' },
      { src: '/images/about/movie6.webp', align: 'right' },
    ]
  },
];

const AboutIcon: React.FC = () => {
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  
  const springConfig: Transition = { type: "spring", stiffness: 400, damping: 10 };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } }
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
  };

  return (
    <div className="flex flex-row gap-4 mt-6 overflow-visible">
      {icons.map((icon) => (
        <div 
          key={icon.id}
          className="relative flex justify-center"
          onMouseEnter={() => setActiveBubble(icon.id)}
          onMouseLeave={() => setActiveBubble(null)}
          onClick={() => setActiveBubble(activeBubble === icon.id ? null : icon.id)}
        >
          <motion.img
            src={icon.src}
            alt={icon.alt}
            className="w-14 h-14 object-contain cursor-pointer relative z-10"
            whileHover={{ scale: 1.15, rotate: icon.hoverRotate, transition: springConfig }}
            whileTap={{ scale: 0.9, transition: springConfig }}
          />

          <AnimatePresence>
            {activeBubble === icon.id && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-0 z-50 pointer-events-none"
              >
                {icon.bubbles.map((bubble, index) => {
                  const isFirst = index === 0; // The bottom-most bubble
                  
                  // Adjust placement based on the align property
                  let positionClass = '';
                  let originX = 0.5;

                  if (isFirst) {
                    positionClass = 'z-20'; // Keep the first one slightly forward
                    originX = 0.5; // Center origin for the first pop
                  } else if (bubble.align === 'right') {
                    positionClass = 'ml-14'; // Push to the right
                    originX = 0; // Animate out from the left edge
                  } else {
                    positionClass = 'mr-14'; // Push to the left
                    originX = 1; // Animate out from the right edge
                  }

                  return (
                    <motion.img
                      key={index}
                      variants={bubbleVariants}
                      src={bubble.src}
                      alt={`${icon.alt} bubble ${index + 1}`}
                      style={{ originX, originY: 1 }}
                      className={`relative w-[280px] sm:w-[320px] md:w-[200px] max-w-none h-auto object-contain drop-shadow-md ${positionClass}`}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default AboutIcon;