import React from 'react';
import ProjectDeck from './ProjectDeck';

// 1. NEW COMPONENT: Encapsulates the link and the "sticker" logic
const MarsLink = () => {
  return (
    <a
      href="https://science.nasa.gov/mars/facts/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-cool-900 inline-flex items-center gap-2 group cursor-pointer select-none"
      title="Visit NASA Mars Facts" // Accessibility tooltip
    >
      <span className="group-hover:text-cool-900/70 transition-colors">Mars</span>
      <img
        src="/images/marsplanet.webp"
        alt="Mars Planet"
        className="
          w-[1.1em] h-[1.1em] object-contain 
          translate-y-[2px] 
          transition-transform duration-300 ease-out 
          group-hover:scale-125 group-hover:rotate-12
        "
      />
    </a>
  );
};

interface HomeProps {
  setTab: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ setTab }) => {
  return (
    // 1. CONTAINER HEIGHT:
    // Mobile: h-auto (Let it scroll)
    // Desktop: h-[calc(100vh-6rem)] (Fit to screen, no scroll)
    <div className="flex flex-col gap-6 lg:gap-6 animate-in fade-in duration-500 h-auto lg:h-[calc(100vh-6rem)] w-full pb-32 lg:pb-8">
      
      {/* Header Text Section */}
      <div className="flex flex-col gap-6 text-[32px] lg:text-[33px] leading-none shrink-0">          
        <p className="text-cool-900/40">
          Hi there, welcome to my space.
          <br />
          {/* IMPLEMENTATION: Using the component here with the enforced space */}
          I'm{" "}
          <MarsLink />
          {" "}an information systems graduate 
          who loves anything about <span className="text-cool-900">interactive digital experience.</span>
        </p>

        <p className="text-cool-900/40">
          This space is a collection of things I've <span className="text-cool-900">built</span> and <span className="text-cool-900">experimented</span> along the way. Feel free to look around!
        </p>
      </div>

      {/* Mobile Only Project Deck */}
      <div className="block lg:hidden w-full aspect-[4/5] bg-cool-100 rounded-2xl relative overflow-hidden border border-cool-200 shrink-0">
           <ProjectDeck />
      </div>

      {/* 2. GRID vs LIST:
          - Mobile: flex flex-col (Vertical stack)
          - Desktop (lg): grid grid-cols-4 (Complex Bento)
      */}
      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-12 gap-2 w-full lg:flex-1 lg:min-h-0">
          
          {/* A. PROJECTS */}
          <div 
             onClick={() => setTab('Projects')}
             className="
               w-full h-64 lg:h-auto 
               lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-12 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer
             "
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Projects
            </span>
          </div>

          {/* B. ARCHIVE */}
          <div 
             onClick={() => setTab('Archive')}
             className="
               w-full h-48 lg:h-auto 
               lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-5 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer"
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Archive
            </span>
          </div>

          {/* C. LAB */}
          <div 
             onClick={() => setTab('Lab')}
             className="
               w-full h-56 lg:h-auto 
               lg:col-start-2 lg:row-start-6 lg:col-span-1 lg:row-span-7 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer"
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Lab
            </span>
          </div>

          {/* D. ABOUT */}
          <div 
             onClick={() => setTab('About')}
             className="
               w-full h-64 lg:h-auto 
               lg:col-start-3 lg:row-start-1 lg:col-span-2 lg:row-span-9 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer"
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              About
            </span>
          </div>

          {/* E. CONNECT */}
          <div 
             onClick={() => setTab('Connect')}
             className="
               w-full h-32 lg:h-auto 
               lg:col-start-3 lg:row-start-10 lg:col-span-2 lg:row-span-3 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer"
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Connect
            </span>
          </div>

      </div>
    </div>
  );
};

export default Home;