import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORKS = [
  { id: 1, src: '/projects/lab1.webp', type: 'image', title: 'Project Alpha', desc: 'Minimal typography.' },
  { id: 2, src: '/projects/lab2.webp', type: 'image', title: 'Project Beta', desc: 'Color theory study.' },
  { id: 3, src: '/projects/lab3.MP4', type: 'video', title: 'Project Gamma', desc: '3D experiments.' },
  { id: 4, src: '/projects/lab4.webp', type: 'image', title: 'Project Delta', desc: 'UI/UX interface.' },
  { id: 5, src: '/projects/lab5.MP4', type: 'video', title: 'Project Epsilon', desc: 'Generative code.' },
  { id: 6, src: '/projects/lab6.MP4', type: 'video', title: 'Project Zeta', desc: 'Motion dynamics.' },
  { id: 7, src: '/projects/lab7.webp', type: 'image', title: 'Project Eta', desc: 'Grid system exploration.' },
  { id: 8, src: '/projects/lab8.MP4', type: 'video', title: 'Project Theta', desc: 'Interactive elements.' },
];

const Lab: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = WORKS.find(w => w.id === selectedId) ?? null;

  return (
    // 1. Allow vertical scrolling on mobile (`overflow-y-auto`), but lock it on desktop (`lg:overflow-hidden`)
    <div className="relative flex flex-col justify-start pt-8 lg:pt-4 gap-6 lg:gap-8 min-h-screen w-full px-4 lg:px-0 lg:overflow-hidden lg:h-screen">

      <div className="shrink-0 z-10 lg:pl-12">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Lab
        </h1>
      </div>

      {/* Adjusted negative margin so mobile header has breathing room, but desktop stays centered */}
      <main className="w-full max-w-7xl mx-auto flex-grow flex items-center justify-center mt-4 lg:-mt-24">
        
        {/* 2. Responsive Grid: 2 columns on mobile, 4 columns on desktop. Adjusted gap sizing for both. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-none lg:grid-rows-2 gap-x-4 gap-y-10 lg:gap-x-12 lg:gap-y-16 items-center justify-items-center w-full pb-16 lg:pb-8">

          {WORKS.map((work) => (
            <div
              key={work.id}
              className="relative z-10 flex justify-center items-center w-full h-full cursor-zoom-in"
              onClick={() => setSelectedId(work.id)}
            >
              <div className="transition-opacity hover:opacity-75 duration-300 w-full flex justify-center">
                {work.type === 'video' ? (
                  <video
                    src={work.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    // 3. Mobile: Let width fill the 2-col cell. Desktop: Lock to max-height to preserve natural ratios.
                    className="w-full lg:w-auto h-auto max-h-[20vh] lg:max-h-[23vh] object-contain"
                  />
                ) : (
                  <img
                    src={work.src}
                    alt={work.title}
                    className="w-full lg:w-auto h-auto max-h-[20vh] lg:max-h-[23vh] object-contain"
                  />
                )}
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* === MODAL OVERLAY (Unchanged) === */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/70 cursor-zoom-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              key={`modal-${selected.id}`}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="pointer-events-auto cursor-zoom-out p-4"
                onClick={() => setSelectedId(null)}
              >
                {selected.type === 'video' ? (
                  <video
                    src={selected.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      display: 'block',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '85vh',
                      maxWidth: '90vw',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <img
                    src={selected.src}
                    alt={selected.title}
                    style={{
                      display: 'block',
                      width: 'auto',
                      height: 'auto',
                      maxHeight: '85vh',
                      maxWidth: '90vw',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lab;