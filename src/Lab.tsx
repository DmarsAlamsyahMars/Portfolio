import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORKS = [
  { id: 1, src: '/images/labproject.webp', rotate: -3, offset: '0px', delay: 0.1, title: 'Project Alpha', desc: 'Minimal typography.' },
  { id: 2, src: '/images/labproject.webp', rotate: 2, offset: '40px', delay: 0.2, title: 'Project Beta', desc: 'Color theory study.' },
  { id: 3, src: '/images/labproject.webp', rotate: -2, offset: '-20px', delay: 0.3, title: 'Project Gamma', desc: '3D experiments.' },
  { id: 4, src: '/images/labproject.webp', rotate: 4, offset: '30px', delay: 0.4, title: 'Project Delta', desc: 'UI/UX interface.' },
  { id: 5, src: '/images/labproject.webp', rotate: -1, offset: '10px', delay: 0.5, title: 'Project Epsilon', desc: 'Generative code.' },
];

const Lab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Simple check to handle logic differences
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-transparent px-6 lg:px-12 pt-10 pb-32 overflow-y-auto overflow-x-hidden">
      
      <header className="mb-12 lg:mb-6 animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-6xl lg:text-8xl leading-none text-cool-900 font-serif">
          Lab
        </h1>
      </header>

      <main className="w-full max-w-7xl mx-auto flex-grow">
        {/* Mobile: Flex Column (Straight), Desktop: Row (Messy) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:gap-6">
          
          {WORKS.map((work) => {
            const isSelected = selectedId === work.id;

            return (
              <div 
                key={work.id} 
                className="relative z-10 w-full max-w-md lg:w-[14vw]"
                // Only apply the messy offset on Desktop
                style={{ marginTop: isDesktop ? work.offset : '0px' }} 
              >
                <motion.div
                  layoutId={`card-${work.id}`}
                  onClick={() => setSelectedId(isSelected ? null : work.id)}
                  
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  
                  // Mobile: No rotation, scale 1. Desktop: Messy rotation.
                  animate={{ 
                    rotate: isDesktop ? work.rotate : 0, 
                    scale: 1,
                    zIndex: isSelected && !isDesktop ? 20 : 10 // Bring to front on mobile click
                  }}
                  
                  // Hover only active on Desktop
                  whileHover={isDesktop ? { 
                    rotate: 0, 
                    scale: 1.05, 
                    zIndex: 30 
                  } : {}}
                  
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  
                  className="
                    relative cursor-pointer group
                    w-full aspect-[3/4] 
                    bg-white rounded-sm overflow-hidden shadow-md border border-cool-200
                  "
                >
                  <img src={work.src} alt="" className="w-full h-full object-cover" />

                  {/* === MOBILE "ART NOTE" OVERLAY === */}
                  {/* This only shows if NOT desktop and IS selected */}
                  <AnimatePresence>
                    {!isDesktop && isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-white/80 backdrop-blur-[2px]"
                      >
                         <motion.div
                           initial={{ y: 10, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.1 }}
                         >
                            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1 block">
                                No. 0{work.id}
                            </span>
                            <h3 className="text-2xl font-serif text-gray-900 leading-tight mb-2">
                                {work.title}
                            </h3>
                            <p className="text-sm font-light text-gray-700 leading-relaxed">
                                {work.desc}
                            </p>
                         </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </div>
            );
          })}

        </div>
      </main>
      
      {/* === DESKTOP EXPANDED OVERLAY === */}
      {/* Wrapped in isDesktop check so it never fires on mobile */}
      <AnimatePresence>
        {selectedId && isDesktop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {WORKS.map(work => (
              work.id === selectedId && (
                <div key={work.id} className="relative z-10 flex flex-row items-center gap-8 pointer-events-none">
                  
                  <motion.div
                    layoutId={`card-${work.id}`}
                    animate={{ rotate: 0, scale: 1, zIndex: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="
                      h-64 lg:h-80 aspect-[3/4] 
                      bg-white rounded-sm overflow-hidden shadow-2xl 
                      pointer-events-auto cursor-pointer
                    "
                    onClick={() => setSelectedId(null)}
                  >
                     <img src={work.src} alt="" className="w-full h-full object-cover" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
                    transition={{ delay: 0.1 }}
                    className="w-64 text-left pointer-events-auto"
                  >
                    <h2 className="text-2xl font-serif text-white mb-2">{work.title}</h2>
                    <p className="text-gray-200 text-sm font-light leading-relaxed">
                      {work.desc}
                    </p>
                  </motion.div>

                </div>
              )
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Lab;