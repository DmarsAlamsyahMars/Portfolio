import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProjectData } from './data/projectsData';

interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

const sharedSpring = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } as const;

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    // 1. SCROLLBAR JUMP FIX
    // Calculate scrollbar width and add it as padding so the grid doesn't shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => { 
      document.body.style.overflow = ''; 
      document.body.style.paddingRight = '0px';
    };
  }, []);

  const content = project.modalContent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      
      {/* 2. HIGH PERFORMANCE BACKDROP */}
      {/* Removed blur, using a dark, opaque overlay for 60fps rendering */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-cool-900/50 will-change-[opacity]"
        onClick={onClose}
      />

      {/* The Morphing Card Wrapper */}
      <motion.div
        layoutId={`card-${project.id}`}
        transition={sharedSpring}
        className="bg-cool-50 rounded-lg overflow-hidden flex flex-col w-full max-w-4xl h-[85vh] shadow-2xl relative z-10 will-change-transform"
      >
        {/* Close Button */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, ...sharedSpring }}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-cool-900/20 backdrop-blur-md text-white hover:bg-cool-900/40 transition-colors z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>
        
        {/* 3. The Scrollable Inner Container - prevents layout thrashing */}
        <div className="overflow-y-auto no-scrollbar w-full h-full flex flex-col">
          
          {/* Hero Image (Morphs from Grid) */}
          {project.image && (
            <div className="relative h-[40vh] md:h-[50vh] w-full shrink-0 z-20 overflow-hidden bg-cool-200">
              <motion.img 
                layoutId={`image-${project.id}`}
                transition={sharedSpring}
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Modal Text Content Flow */}
          <div className={`w-full p-6 md:p-12 flex flex-col z-30 relative bg-cool-50 ${project.image ? 'border-t border-cool-200' : ''}`}>
            
            {/* Title (Morphs from Grid) */}
            <motion.h2 
              layoutId={`title-${project.id}`}
              transition={sharedSpring}
              className="text-4xl md:text-5xl font-sans font-bold text-cool-900 mb-2 tracking-tight"
            >
              {project.title}
            </motion.h2>

            {/* Inner Content - Fades in softly after the layout morph */}
            {content && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="flex flex-col mt-4"
              >
                {/* Subtitle (Role & Year) */}
                <div className="flex items-center gap-3 text-sm md:text-base font-sans font-semibold text-cool-500 mb-6 uppercase tracking-widest">
                  <span>{content.role}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cool-300"></span>
                  <span>{content.year}</span>
                </div>

                {/* Tags (Tools Used) */}
                {content.tags && content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {content.tags.map((tag, idx) => (
                      <span key={idx} className=" font-sans px-4 py-1.5 bg-cool-200 text-cool-800 text-xs md:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Short Centered Intro Text */}
                {content.introText && (
                  <div className="w-full flex justify-center mb-16 mt-4">
                    <p className="text-cool-800 font-sans text-xl md:text-2xl text-center max-w-2xl font-medium leading-relaxed">
                      {content.introText}
                    </p>
                  </div>
                )}

                {/* Left Square Image & Right Justified Text */}
                {(content.sideImage || content.sideText) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
                    {content.sideImage && (
                      <div className="w-full aspect-square rounded-none overflow-hidden bg-cool-200">
                        <img 
                          src={content.sideImage} 
                          alt={`${project.title} detail`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {content.sideText && (
                      <div className="w-full">
                        <p className="text-cool-700 font-sans text-base md:text-lg text-justify leading-relaxed">
                          {content.sideText}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Full Width Image - "Bleeding" to the edges */}
                {content.fullImage && (
                  <div className="-mx-6 md:-mx-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] mb-10 md:mb-12 rounded-none overflow-hidden bg-cool-200">
                    <img 
                      src={content.fullImage} 
                      alt={`${project.title} full showcase`} 
                      className="w-full h-auto max-h-[70vh] object-cover"
                    />
                  </div>
                )}

                {content.narrative && (
  <div className="w-full max-w-6xl mx-auto mb-16">
    <div className="
      text-cool-700 font-sans text-base md:text-lg text-justify leading-relaxed
      /* This handles the automatic column splitting based on screen size */
      columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12
    ">
        {content.narrative}
    </div>
  </div>
)}

                {/* Interspersed Narrative Sections */}
{content.narrativeSections && (
  <div className="w-full max-w-6xl mx-auto mb-16 flex flex-col gap-16">
    {content.narrativeSections.map((section, idx) => (
      <React.Fragment key={idx}>
        
        {/* Magazine Column Flow for Text */}
        <div className="w-full">
          <p className="
            text-cool-700 font-sans text-base md:text-lg text-justify leading-loose
            columns-1 md:columns-2 gap-8 md:gap-12
            break-inside-avoid-column
          ">
            {section.paragraph}
          </p>
        </div>

        {/* Full-width Image Break */}
        {section.image && (
          <div className="w-full rounded-2xl overflow-hidden bg-cool-200">
            <img
              src={section.image}
              alt={`Case study detail ${idx + 1}`}
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
)}

                {/* Fallback for legacy project description */}
                {content.description && !content.narrative && !content.sideText && (
                  <p className="text-cool-700 font-sans text-lg leading-relaxed mb-8">
                    {content.description}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;