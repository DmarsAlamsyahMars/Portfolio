import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

  const isLoveTab = activeTab === 'love';

  return (
    <div className="relative w-full p-3 mb-6 font-sans">
      
      {/* 2. The Custom Stripe Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <rect 
          x="1" 
          y="1" 
          width="calc(100% - 2px)" 
          height="calc(100% - 2px)" 
          rx="0"
          fill="none" 
          stroke="#cbd5e1"
          strokeWidth="1" 
          strokeDasharray="3 2"
        />
      </svg>

      {/* Wrapping content in relative z-10 */}
      <div className="relative z-10">
        
        {/* 3. Header & Toggle Inline */}
        <div className="flex items-center gap-3 mb-3">
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
                    className="absolute inset-0 bg-white rounded-[2px] shadow-sm border border-slate-200/50"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Dynamic Interactive Grid*/}
        <div className="flex flex-wrap content-start gap-2">
          {tools.map((tool) => {
            const isFaded = isLoveTab && !tool.isFavorite;
            const isHighlighted = isLoveTab && tool.isFavorite;

            return (
              <motion.div
                key={tool.id}
                layout
                animate={{ 
                  opacity: isFaded ? 0.3 : 1,
                  scale: isHighlighted ? 1.05 : 1,
                  y: isHighlighted ? -2 : 0,
                  boxShadow: isHighlighted 
                    ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                    : "0 0px 0px 0px rgb(0 0 0 / 0)"
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25 
                }}
                className={`px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium rounded-md lowercase tracking-wide transition-colors duration-300 ${
                  isHighlighted ? 'bg-white border-slate-300 z-10 relative' : ''
                }`}
              >
                {tool.name}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolStack;