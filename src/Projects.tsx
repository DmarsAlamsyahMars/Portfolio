import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS, type ProjectData } from './data/projectsData';
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [hoveredText, setHoveredText] = useState<string | null>(null);

  const isTouchDevice = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 15);
      mouseY.set(e.clientY + 15);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const renderItem = (project: ProjectData) => {
    const hoverTextMap: Record<string | number, string> = {
      1: "visit Cherrie",
      2: "visit Maison des Rêves",
      3: "internship",
      4: "product design",
      5: "thesis project"
    };

    const hoverLabel = hoverTextMap[project.id] || `View ${project.title}`;

    const hoverProps = isTouchDevice.current
      ? {}
      : {
          onMouseEnter: () => setHoveredText(hoverLabel),
          onMouseLeave: () => setHoveredText(null),
        };
        
        const entranceVariants = {
      hidden: {
        opacity: 0,
        y: -24,
        scale: 0.94,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring' as const,
          stiffness: 260,
          damping: 22,
          mass: 0.8,
        },
      },
    };

    const img = (
      <img
        src={project.folderImage}
        alt={project.title}
        className="w-60 h-60 lg:w-45 lg:h-45 object-contain drop-shadow-xl"
      />
    );

    const content = project.link ? (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:scale-105 hover:-translate-y-2 transition-all duration-200"
        {...hoverProps}
      >
        {img}
      </a>
    ) : (
      <button
        onClick={() => setSelectedProject(project)}
        className="hover:scale-105 hover:-translate-y-2 transition-all duration-200"
        {...hoverProps}
      >
        {img}
      </button>
    );

    return (
      <motion.div
        key={project.id}
        variants={entranceVariants}
        initial="hidden"
        animate="visible"
      >
        {content}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-2 lg:gap-4 min-h-[100dvh] w-full px-4 lg:px-0 pb-6 lg:pb-12 relative">

      <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif shrink-0">
        Selected Projects
      </h1>

      <div className="flex flex-col items-center gap-2 lg:gap-3">
        {/* Mobile layout: 1x5 vertical column */}
        <div className="flex flex-col items-center gap-4 lg:hidden">
          {PROJECTS.map((project) => renderItem(project))}
        </div>

        {/* Desktop layout: 3+2 rows */}
        <div className="hidden lg:flex flex-col items-center gap-3">
          <div className="flex gap-8 items-center">
            {PROJECTS.slice(0, 3).map((project) => renderItem(project))}
          </div>
          <div className="flex gap-8 items-center pl-20">
            {PROJECTS.slice(3).map((project) => renderItem(project))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating Hover Text*/}
      {!isTouchDevice.current && (
        <div className="fixed top-0 left-0 pointer-events-none z-[100]">
          <AnimatePresence>
            {hoveredText && (
              <motion.span
                style={{ x: cursorX, y: cursorY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute font-sans text-sm md:text-base font-medium text-cool-700 whitespace-nowrap"
              >
                {hoveredText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Projects;