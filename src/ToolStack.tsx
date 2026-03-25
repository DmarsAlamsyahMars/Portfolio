import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. The Data (Text-based, no emojis)
const tools = [
  { id: 'react', name: 'React', isFavorite: true },
  { id: 'typescript', name: 'typescript', isFavorite: true },
  { id: 'tailwind', name: 'Tailwind CSS', isFavorite: false },
  { id: 'framer', name: 'Framer Motion', isFavorite: true },
  { id: 'three', name: 'Three.js', isFavorite: false },
  { id: 'figma', name: 'Figma', isFavorite: true },
  { id: 'postgre', name: 'PostgreSQL', isFavorite: false },
  { id: 'bizagi', name: 'bizagi', isFavorite: false },
  { id: 'photoshop', name: 'photoshop', isFavorite: true },
  { id: 'illustrator', name: 'Adobe Illustrator', isFavorite: true },
];

const ToolStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'know' | 'love'>('know');

  // Filter tools based on the active tab
  const displayedTools = activeTab === 'know' ? tools : tools.filter(t => t.isFavorite);

  return (
    // The container uses relative positioning to anchor the SVG border
    <div className="relative w-full p-3 mb-6 font-sans">
      
      {/* 2. The Custom Stripe Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <rect 
          x="1" 
          y="1" 
          width="calc(100% - 2px)" 
          height="calc(100% - 2px)" 
          rx="12" /* Matches Tailwind's rounded-xl */
          fill="none" 
          stroke="#cbd5e1" /* Tailwind's slate-300 color (dusty blue/grey) */
          strokeWidth="1.5" 
          strokeDasharray="4 3" /* The Magic Numbers: 16px lines, 8px gaps */
        />
      </svg>

      {/* Wrapping content in relative z-10 so it sits above the SVG border */}
      <div className="relative z-10">
        
        {/* 3. Header & Toggle Inline */}
        <div className="flex items-center gap-3 mb-3">
          {/* Dusty blue text */}
          <span className="text-slate-500 text-sm font-medium tracking-wide lowercase">
            tools & stacks i
          </span>

          {/* Ultra-compact Toggle */}
          <div className="relative flex bg-slate-100 rounded-md p-0.5">
            {['know', 'love'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'know' | 'love')}
                className={`relative px-3 py-1 text-xs font-medium z-10 transition-colors duration-300 lowercase ${
                  activeTab === tab ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                
                {/* Active state background */}
                {activeTab === tab && (
                  <motion.div
                    layoutId="minimal-active-pill"
                    className="absolute inset-0 bg-white rounded-[4px] shadow-sm border border-slate-200/50"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Dynamic Text-Only Flex Grid */}
        <motion.div 
          layout 
          className="flex flex-wrap content-start gap-2 min-h-[60px] sm:min-h-[60px]"
        >
          <AnimatePresence mode="popLayout">
            {displayedTools.map((tool) => (
              <motion.div
                layout
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25,
                  opacity: { duration: 0.15 }
                }}
                // Minimalist tag styling with a very subtle slate tint
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium rounded-md lowercase tracking-wide"
              >
                {tool.name}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolStack;