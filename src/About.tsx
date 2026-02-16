import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Added title/desc for the expanded view
const WORKS = [
  { id: 1, src: '/images/labproject.webp', rotate: -3, offset: '0px', delay: 0.1, title: 'Project Alpha', desc: 'An exploration of minimal typography and negative space.' },
  { id: 2, src: '/images/labproject.webp', rotate: 2, offset: '40px', delay: 0.2, title: 'Project Beta', desc: 'A study in color theory and interactive motion.' },
  { id: 3, src: '/images/labproject.webp', rotate: -2, offset: '-20px', delay: 0.3, title: 'Project Gamma', desc: 'Experimental 3D rendering in a 2D context.' },
  { id: 4, src: '/images/labproject.webp', rotate: 4, offset: '30px', delay: 0.4, title: 'Project Delta', desc: 'A user interface designed for accessibility first.' },
  { id: 5, src: '/images/labproject.webp', rotate: -1, offset: '10px', delay: 0.5, title: 'Project Epsilon', desc: 'Abstract generative art created with code.' },
];

const Lab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-transparent px-6 lg:px-12 pt-10 pb-32 overflow-y-auto overflow-x-hidden">
      
      <header className="mb-12 lg:mb-6 animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-6xl lg:text-8xl leading-none text-cool-900 font-serif">
          Lab
        </h1>
      </header>

      <main className="w-full max-w-7xl mx-auto flex-grow">
        <div className="flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center gap-12 lg:gap-6">
          
          {WORKS.map((work) => (
            <motion.div
              layoutId={`card-${work.id}`} // Connects this item to the modal
              key={work.id}
              onClick={() => setSelectedId(work.id)}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring", 
                stiffness: 60, 
                damping: 15, 
                delay: work.delay 
              }}
              style={{
                '--tilt': `${work.rotate}deg`,
                '--stagger': work.offset,
              } as React.CSSProperties}
              className="
                relative
                w-[80vw] sm:w-[60vw] aspect-[3/4] 
                rotate-[var(--tilt)]
                lg:w-[14vw] lg:mt-[var(--stagger)] 
                hover:rotate-0 hover:scale-105 hover:z-30 
                cursor-pointer
                transition-all duration-500 ease-out
              "
            >
              {/* Image Component */}
              <div className="w-full h-full bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl border border-cool-200">
                 <motion.img 
                   src={work.src} 
                   alt="design work" 
                   className="w-full h-full object-cover" 
                 />
              </div>
            </motion.div>
          ))}

        </div>
      </main>
      
      {/* EXPANDED VIEW OVERLAY */}
      <AnimatePresence>
        {selectedId && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
            />

            {/* Expanded Card */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              {WORKS.map(work => (
                work.id === selectedId && (
                  <motion.div
                    layoutId={`card-${work.id}`} // Matches the ID above
                    key={work.id}
                    className="w-[90vw] max-w-[500px] bg-white rounded-lg overflow-hidden shadow-2xl pointer-events-auto"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-video">
                       <motion.img 
                         src={work.src} 
                         className="w-full h-full object-cover" 
                       />
                       <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full text-black transition-colors"
                       >
                         ✕
                       </button>
                    </div>

                    {/* Text Content - Animate in after card expands */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6"
                    >
                      <h3 className="text-2xl font-serif mb-2">{work.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {work.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Lab;