import React, { useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';

const icons = [
  { 
    id: 'music', 
    src: '/music_icon.webp', 
    alt: 'Music', 
    hoverRotate: 5,
    messages: [
      'on loop!',
      '1. Artist A - Title 1',
      '2. Artist B - Title 2',
      '3. Artist C - Title 3',
      '4. Artist D - Title 4',
      '5. Artist E - Title 5'
    ]
  },
  { 
    id: 'settings', 
    src: '/settings_icon.webp', 
    alt: 'Settings', 
    hoverRotate: -5, 
    messages: [
      'tools i love',
      '1. VS Code',
      '2. Figma',
      '3. React',
      '4. Tailwind CSS',
      '5. Framer Motion'
    ]
  },
  { 
    id: 'movies', 
    src: '/movies_icon.webp', 
    alt: 'Movies', 
    hoverRotate: 5, 
    messages: [
      'top 5 movies!',
      '1. Movie Title 1',
      '2. Movie Title 2',
      '3. Movie Title 3',
      '4. Movie Title 4',
      '5. Movie Title 5'
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
      
      {/* SAMUEL KRAFT CSS TRANSLATED FOR GLASSMORPHISM */}
      <style>{`
        .kraft-glass {
          background-color: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
        }

        /* TAIL ON THE LEFT (For right-side bubbles) */
        .kraft-tail-left {
          border-bottom-left-radius: 4px; /* Removes the heavy curve so the tail connects seamlessly */
        }
        .kraft-tail-left::before {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: -1px;
          left: -8px;
          height: 20px;
          width: 20px;
          background-color: rgba(255, 255, 255, 0.4);
          border-bottom-right-radius: 15px;
        }
        .kraft-tail-left::after {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: -1px;
          left: -10px;
          width: 10px;
          height: 20px;
          /* IMPORTANT: Change #ffffff to the EXACT background color of your website */
          background-color: #f8fafc; 
          border-bottom-right-radius: 10px;
        }

        /* TAIL ON THE RIGHT (For left-side bubbles) */
        .kraft-tail-right {
          border-bottom-right-radius: 4px;
        }
        .kraft-tail-right::before {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: -1px;
          right: -8px;
          height: 20px;
          width: 20px;
          background-color: rgba(255, 255, 255, 0.4);
          border-bottom-left-radius: 15px;
        }
        .kraft-tail-right::after {
          content: "";
          position: absolute;
          z-index: -1;
          bottom: -1px;
          right: -10px;
          width: 10px;
          height: 20px;
          /* IMPORTANT: Change #ffffff to the EXACT background color of your website */
          background-color: #ffffff; 
          border-bottom-left-radius: 10px;
        }
      `}</style>

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
                className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-2.5 z-50 pointer-events-none"
              >
                {icon.messages.map((msg, index) => {
                  const isFirst = index === 0;
                  const isRightSide = index % 2 !== 0; 
                  
                  let positionClass = '';
                  let tailClass = '';
                  let originX = 0.5;

                  if (isFirst) {
                    positionClass = 'z-20'; 
                    tailClass = ''; // No tail for the anchor
                    originX = 0.5;
                  } else if (isRightSide) {
                    positionClass = 'ml-14'; 
                    tailClass = 'kraft-tail-left'; // Tail on the left, pointing back
                    originX = 0;
                  } else {
                    positionClass = 'mr-14'; 
                    tailClass = 'kraft-tail-right'; // Tail on the right, pointing back
                    originX = 1;
                  }

                  return (
                    <motion.div
                      key={index}
                      variants={bubbleVariants}
                      style={{ originX, originY: 1 }}
                      // Notice we apply both the kraft-glass base class and the dynamic tail class
                      className={`relative px-4 py-2 shadow-xl w-max kraft-glass ${positionClass} ${tailClass}`}
                    >
                      <span className={`text-cool-900 font-sans block tracking-wide ${isFirst ? 'font-bold text-sm' : 'font-medium text-[13px]'} whitespace-nowrap`}>
                        {msg}
                      </span>
                    </motion.div>
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