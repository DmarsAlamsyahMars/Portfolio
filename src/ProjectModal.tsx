import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ProjectData } from './data/projectsData';

interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

const springEntrance = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } as const;
const fastExit = { duration: 0.15, ease: "easeOut" } as const;

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const content = project.modalContent;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      
      {/* BACKGROUND OVERLAY*/}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: fastExit }}
        className="absolute inset-0 bg-cool-900/30 will-change-[opacity,filter]"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: springEntrance }}
        exit={{ opacity: 0, scale: 0.98, y: 8, transition: fastExit }}
        className="bg-cool-50 rounded-2xl overflow-hidden flex flex-col w-full max-w-4xl h-[85vh] shadow-2xl relative z-10 will-change-transform"
      >
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, ...springEntrance } }}
          exit={{ opacity: 0, scale: 0.9, transition: fastExit }}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-cool-900/20 backdrop-blur-md text-white hover:bg-cool-900/40 transition-colors z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>
        
        <div className="overflow-y-auto no-scrollbar w-full h-full flex flex-col">
          
          {project.image && (
            <div className="relative h-[40vh] md:h-[50vh] w-full shrink-0 z-20 overflow-hidden bg-cool-200">
              <motion.img 
                initial={{ scale: 1.05 }}
                animate={{ scale: 1, transition: { duration: 0.6, ease: "easeOut" } }}
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`w-full p-6 md:p-12 flex flex-col z-30 relative bg-cool-50 ${project.image ? 'border-t border-cool-200' : ''}`}>
            
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-cool-900 mb-2 tracking-tight">
              {project.title}
            </h2>

            {content && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="flex flex-col mt-4"
              >
                <div className="flex items-center gap-3 text-sm md:text-base font-sans font-semibold text-cool-500 mb-6 uppercase tracking-widest">
                  <span>{content.role}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cool-300"></span>
                  <span>{content.year}</span>
                </div>

                {content.tags && content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {content.tags.map((tag, idx) => (
                      <span key={idx} className="font-sans px-4 py-1.5 bg-cool-200 text-cool-800 text-xs md:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {content.introText && (
                  <div className="w-full flex justify-center mb-16 mt-4">
                    <p className="text-cool-800 font-sans text-xl md:text-2xl text-center max-w-2xl font-medium leading-relaxed">
                      {content.introText}
                    </p>
                  </div>
                )}

                {/* The Main 2-Column Layout */}
                {(content.sideImage || content.sideImages || content.sideText || content.phases || content.roleFlows) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
                    
                    {/* Left Column (Images) */}
                    <div className="flex flex-col gap-4 w-full">
                      
                      {/* Legacy: Single Side Image */}
                      {content.sideImage && (
                        <div className="w-full rounded-none overflow-hidden bg-cool-200">
                          <img 
                            src={content.sideImage} 
                            alt={`${project.title} detail`} 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}

                      {/* New: Stacked Side Images */}
                      {content.sideImages && content.sideImages.map((imgSrc, idx) => (
                        <div key={idx} className="w-full rounded-none overflow-hidden bg-cool-200">
                          <img 
                            src={imgSrc} 
                            alt={`${project.title} detailed view ${idx + 1}`} 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                      
                    </div>

                    {/* Right Column (Text, Flowcharts, Narrative) */}
                    <div className="flex flex-col gap-6 w-full h-full">
                      
                      {/* Top text block */}
                      {content.sideText && (
                        <div className="w-full shrink-0">
                          <p className="text-cool-700 font-sans text-base md:text-lg text-justify leading-relaxed">
                            {content.sideText}
                          </p>
                        </div>
                      )}
                      
                      {/* Process Visualization */}
                      {content.phases && content.phases.length > 0 && (
                        <div className="w-full flex flex-col mt-2 shrink-0">
                          <p className="text-cool-500 font-sans font-medium text-base md:text-lg mb-4">
                            how i worked:
                          </p>
                          
                          {content.phases.map((phase, idx, arr) => (
                            <React.Fragment key={idx}>
                              <div className="w-full border-[1px] border-dashed border-cool-400 bg-cool-100 py-3 px-4 flex items-center justify-center rounded-none">
                                <p className="text-cool-700 font-sans text-sm md:text-base text-center">
                                  {phase}
                                </p>
                              </div>
                              
                              {idx < arr.length - 1 && (
                                <div className="flex justify-center text-cool-400 py-2">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="4" x2="12" y2="20"></line>
                                    <polyline points="18 14 12 20 6 14"></polyline>
                                  </svg>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                      {/* Parallel Role Flows */}
                      {content.roleFlows && content.roleFlows.length > 0 && (
                        <div className="w-full flex flex-col mt-2 shrink-0">
                          <p className="text-cool-500 font-sans font-medium text-base md:text-lg mb-4">
                            system architecture:
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {content.roleFlows.map((flow, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                
                                {/* Top Box: Role */}
                                <div className="w-full border-[1px] border-dashed border-cool-400 bg-cool-100 py-3 px-4 flex items-center justify-center">
                                  <p className="text-cool-800 font-sans font-semibold text-sm md:text-base text-center">
                                    {flow.role}
                                  </p>
                                </div>
                                
                                {/* Downward Arrow */}
                                <div className="flex justify-center text-cool-400 py-2">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="4" x2="12" y2="20"></line>
                                    <polyline points="18 14 12 20 6 14"></polyline>
                                  </svg>
                                </div>
                                
                                {/* Bottom Box: Features */}
                                <div className="w-full border-[1px] border-dashed border-cool-400 bg-cool-50 py-3 px-4 flex items-center justify-center h-full">
                                  <p className="text-cool-600 font-sans text-sm md:text-base text-center">
                                    {flow.features}
                                  </p>
                                </div>
                                
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Right-Column Narrative */}
                      {content.narrative && !content.fullImage && (
                        <div className="w-full mt-4">
                          <p className="text-cool-700 font-sans text-base md:text-lg text-justify leading-relaxed">
                            {content.narrative}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Full Width Image */}
                {content.fullImage && (
                  <div className="-mx-6 md:-mx-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] mb-10 md:mb-12 rounded-none overflow-hidden bg-cool-200">
                    <img 
                      src={content.fullImage} 
                      alt={`${project.title} full showcase`} 
                      className="w-full h-auto max-h-[85vh] object-cover"
                    />
                  </div>
                )}

                {/* Bottom Narrative */}
                {content.narrative && (content.fullImage || !(content.sideImage || content.sideImages || content.sideText || content.phases || content.roleFlows)) && (
                  <div className="w-full max-w-4xl mx-auto mb-16">
                    <p className="text-cool-700 font-sans text-base md:text-lg text-justify leading-relaxed">
                      {content.narrative}
                    </p>
                  </div>
                )}
                
                {/* Fallback legacy sections */}
                {content.narrativeSections && (
                  <div className="w-full max-w-6xl mx-auto mb-16 flex flex-col gap-16">
                    {content.narrativeSections.map((section, idx) => (
                      <React.Fragment key={idx}>
                        <div className="w-full">
                          <p className="
                            text-cool-700 font-sans text-base md:text-lg text-justify leading-loose
                            columns-1 md:columns-2 gap-8 md:gap-12
                            break-inside-avoid-column
                          ">
                            {section.paragraph}
                          </p>
                        </div>
                        {section.image && (
                          <div className="w-full rounded-none overflow-hidden bg-cool-200">
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

              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;