import React from 'react';

// Mock Data 
const PROJECTS = [
  // ROW 1
  { 
    id: 1, title: "Maison", category: "Architecture",
    size: "col-span-1 md:col-span-3 md:row-span-1", delay: "delay-[100ms]"
  },
  { 
    id: 2, title: "About Me", category: "Identity",
    size: "col-span-1 md:col-span-4 md:row-span-1", delay: "delay-[200ms]"
  },
  { 
    id: 3, title: "Playground", category: "Experiments",
    size: "col-span-1 md:col-span-3 md:row-span-1", delay: "delay-[300ms]"
  },
  // ROW 2
  { 
    id: 4, title: "Camilan", category: "E-Commerce",
    size: "col-span-1 md:col-span-4 md:row-span-1", delay: "delay-[400ms]" 
  },
  { 
    id: 5, title: "Cherrie", category: "Branding",
    size: "col-span-1 md:col-span-6 md:row-span-1", delay: "delay-[500ms]" 
  }
];

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col justify-start pt-0 lg:pt-4 gap-6 lg:gap-8 h-screen w-full px-4 lg:px-0 relative overflow-hidden">
      
      {/* 1. Header: Matches About and Lab entrance (slide-in-from-top-8) */}
      <div className="animate-in fade-in slide-in-from-top-8 duration-700 shrink-0 z-10">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Selected Projects
        </h1>
      </div>

      {/* 2. Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-2 w-full h-[60vh] z-0">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            style={{ animationFillMode: 'backwards' }}
            className={`
              ${project.size}
              ${project.delay}
              animate-in fade-in slide-in-from-top-8 duration-700
              relative group cursor-pointer
              bg-cool-100 border border-cool-200 rounded-lg 
              hover:bg-cool-200 transition-colors duration-300
              p-4
            `}
          >
            {/* Project Title & Category */}
            <div className="absolute bottom-3 left-4 flex flex-col">
              <span className="text-xs font-sans text-cool-900/40 font-medium mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.category}
              </span>
              <span className="text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
                {project.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Projects;