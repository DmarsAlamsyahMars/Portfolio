import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, type ProjectData } from './data/projectsData'; 
import ProjectModal from './ProjectModal'; 

// THE KOWALSKI SPRING: Fast entrance, real-world friction, zero robotic easing.
// This MUST be identical in both files.
const sharedSpring = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } as const;

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-6 lg:gap-8 min-h-screen w-full px-4 lg:px-0 relative overflow-hidden">
      
      {/* Header */}
      <div className="shrink-0 z-10">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Selected Projects
        </h1>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-2 w-full h-[60vh] z-0">
        {PROJECTS.map((project) => {
          const isExternal = !!project.link;
          const Component = isExternal ? motion.a : motion.button;
          
          const dynamicProps = isExternal 
            ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
            : { onClick: () => setSelectedProject(project) };

          // Snappy asymmetric hover states
          const titleVariants = {
            rest: { 
              opacity: isExternal ? 1 : 0, 
              y: isExternal ? 0 : 8 
            },
            hover: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.15 } // Fast response on hover
            }
          };

          const imageVariants = {
            rest: { y: 0, scale: 1 },
            hover: isExternal ? { scale: 1.05, transition: { duration: 0.2 } } : { y: 32, transition: { duration: 0.2 } }
          };

          return (
            // 1. THE SKELETON WRAPPER
            // This holds the grid structure and CSS animations so they don't interfere with Framer Motion.
            <div 
              key={project.id} 
              className={`
                ${project.size} 
                ${project.delay} 
                animate-in fade-in slide-in-from-top-8 [animation-duration:700ms]
                w-full h-full
              `}
              style={{ animationFillMode: 'backwards' }}
            >
              <Component
                layoutId={`card-${project.id}`} 
                transition={sharedSpring}
                {...dynamicProps as any} 
                initial="rest"
                whileHover="hover"
                animate="rest"
                // 2. THE MORPHING ELEMENT
                // Cleaned of CSS animations, set to full width/height of the wrapper
                className="relative group cursor-pointer bg-cool-100 rounded-lg overflow-hidden w-full h-full block"
              >
                {/* TITLE LAYER */}
                <div className={`absolute top-4 left-4 ${isExternal ? 'z-30' : 'z-10'} ${project.titleClass || ''}`}>
                  <motion.span 
                    layoutId={`title-${project.id}`} 
                    transition={sharedSpring}
                    variants={titleVariants}
                    className="text-lg-40 font-sans text-cool-400 font-medium block"
                  >
                    {project.title}
                  </motion.span>
                </div>

                {/* IMAGE LAYER */}
                {project.image && (
                  <motion.img 
                    layoutId={`image-${project.id}`} 
                    transition={sharedSpring}
                    variants={imageVariants}
                    src={project.image} 
                    alt={`${project.title} preview`} 
                    className={`
                      absolute inset-0 w-full h-full object-cover z-20
                      ${project.imageClass || ''}
                    `}
                  />
                )}
              </Component>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Projects;