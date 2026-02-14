import React from 'react';
import { motion } from 'framer-motion';

const WORKS = [
  { id: 1, src: '/images/aboutproject.webp', rotate: -3, offset: '0px', delay: 0.1 },
  { id: 2, src: '/images/aboutproject.webp', rotate: 2, offset: '40px', delay: 0.2 },
  { id: 3, src: '/images/aboutproject.webp', rotate: -2, offset: '-20px', delay: 0.3 },
  { id: 4, src: '/images/aboutproject.webp', rotate: 4, offset: '30px', delay: 0.4 },
  { id: 5, src: '/images/aboutproject.webp', rotate: -1, offset: '10px', delay: 0.5 },
];

const Lab: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent px-6 lg:px-12 pt-10 pb-32 overflow-y-auto overflow-x-hidden">
      
      {/* 1. Header - Reduced mb-12 to mb-6 on desktop to pull cards up */}
      <header className="mb-12 lg:mb-6 animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-6xl lg:text-8xl leading-none text-cool-900 font-serif">
          Lab
        </h1>
      </header>

      {/* 2. Main Content Container */}
      <main className="w-full max-w-7xl mx-auto flex-grow">
        {/* Changed items-center to items-start on desktop to prevent them from pushing down */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center gap-12 lg:gap-6">
          
          {WORKS.map((work) => (
            <motion.div
              key={work.id}
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
                
                /* Reduced lg:w for tighter fit, and ensured mt uses the stagger from top-start */
                lg:w-[14vw] lg:mt-[var(--stagger)] 
                
                hover:rotate-0 hover:scale-105 hover:z-30 
                transition-all duration-500 ease-out
              "
            >
              <FlatCard src={work.src} />
            </motion.div>
          ))}

        </div>
      </main>
      
      <div className="h-20 lg:hidden" />
    </div>
  );
};

const FlatCard = ({ src }: { src: string }) => {
  return (
    <div className="w-full h-full bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl border border-cool-200 transition-all duration-500 cursor-pointer">
      <img 
        src={src} 
        alt="design work" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default Lab;