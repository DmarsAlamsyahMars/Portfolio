import React from 'react';

// Mock Data 
const PROJECTS = [
  // ROW 1
  { 
    id: 1, title: "Maison", category: "Architecture",
    size: "col-span-1 md:col-span-3 md:row-span-1" 
  },
  { 
    id: 2, title: "About Me", category: "Identity",
    size: "col-span-1 md:col-span-4 md:row-span-1" 
  },
  { 
    id: 3, title: "Playground", category: "Experiments",
    size: "col-span-1 md:col-span-3 md:row-span-1" 
  },
  // ROW 2
  { 
    id: 4, title: "Camilan", category: "E-Commerce",
    size: "col-span-1 md:col-span-4 md:row-span-1" 
  },
  { 
    id: 5, title: "Cherrie", category: "Branding",
    size: "col-span-1 md:col-span-6 md:row-span-1" 
  }
];

const Projects: React.FC = () => {
  return (
    // Keep justify-start and pt-4 to lock the top in place
    <div className="flex flex-col justify-start pt-4 gap-6 lg:gap-8 h-screen w-full px-4 lg:px-0">
      
      {/* Header (Top position stays fixed) */}
      <div className="animate-in slide-in-from-bottom-4 duration-700 shrink-0">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          Selected Projects
        </h1>
      </div>

      {/* UPDATED HEIGHT:
         - Changed to h-[60vh] (was 70vh).
         - This visually "lifts" the bottom edge up, clearing the navbar.
         - You can tweak this number (e.g. 58vh, 62vh) to drag the line further up or down.
      */}
      <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-2 w-full h-[60vh] animate-in fade-in zoom-in-[0.99] duration-700 delay-100">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className={`
              ${project.size}
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