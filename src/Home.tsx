import React from 'react';
import ProjectDeck from './ProjectDeck';

// 1. MARSLINK COMPONENT (Unchanged)
const MarsLink = () => {
  return (
    <a
      href="https://science.nasa.gov/mars/facts/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-cool-900 inline-flex items-center gap-2 group cursor-pointer select-none"
      title="Visit NASA Mars Facts"
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
  // CONFIGURATION:
  // 1. Class: animate-in fade-in slide-in-from-top-4 (Moves down slightly)
  // 2. Style: animationFillMode: 'backwards' (Crucial: Hides element during the delay)
  const animClass = "animate-in fade-in slide-in-from-top-4 duration-700 ease-out";
  const animStyle = { animationFillMode: 'backwards' } as React.CSSProperties;

  return (
    <div className="flex flex-col gap-6 lg:gap-6 h-auto lg:h-[calc(100vh-6rem)] w-full pb-32 lg:pb-8">
      
      {/* 1. Header Text Section */}
      <div className="flex flex-col gap-6 text-[32px] lg:text-[33px] leading-none shrink-0">          
        
        {/* PARAGRAPH 1: Delay 0ms (Immediate) */}
        <p className={`text-cool-900/40 ${animClass}`}>
          Hi there, welcome to my space.
          <br />
          I'm{" "}
          <MarsLink />
          {" "}an information systems graduate 
          who loves anything about <span className="text-cool-900">interactive digital experience.</span>
        </p>

        {/* PARAGRAPH 2: Delay 100ms */}
        <p 
          className={`text-cool-900/40 ${animClass} delay-100`}
          style={animStyle}
        >
          This space is a collection of things I've <span className="text-cool-900">built</span> and <span className="text-cool-900">experimented</span> along the way. Feel free to look around!
        </p>
      </div>

      {/* 2. Mobile Only Project Deck: Delay 200ms */}
      <div 
        className={`block lg:hidden w-full aspect-[4/5] bg-cool-100 rounded-2xl relative overflow-hidden border border-cool-200 shrink-0 ${animClass} delay-200`}
        style={animStyle}
      >
           <ProjectDeck />
      </div>

      {/* 3. GRID LAYOUT */}
      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-12 gap-2 w-full lg:flex-1 lg:min-h-0">
          
          {/* A. PROJECTS: Delay 300ms */}
          <div 
             onClick={() => setTab('Projects')}
             className={`
               w-full h-64 lg:h-auto 
               lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-12 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer
               ${animClass} delay-300
             `}
             style={animStyle}
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Projects
            </span>
          </div>

          {/* B. ARCHIVE: Delay 400ms */}
          <div 
             onClick={() => setTab('Archive')}
             className={`
               w-full h-48 lg:h-auto 
               lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-5 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer
               ${animClass} delay-[400ms]
             `}
             style={animStyle}
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Archive
            </span>
          </div>

          {/* C. LAB: Delay 500ms */}
          <div 
             onClick={() => setTab('Lab')}
             className={`
               w-full h-56 lg:h-auto 
               lg:col-start-2 lg:row-start-6 lg:col-span-1 lg:row-span-7 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer
               ${animClass} delay-[500ms]
             `}
             style={animStyle}
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              Lab
            </span>
          </div>

          {/* D. ABOUT: Delay 400ms (Matches Archive) */}
          <div 
             onClick={() => setTab('About')}
             className={`
               w-full h-64 lg:h-auto 
               lg:col-start-3 lg:row-start-1 lg:col-span-2 lg:row-span-9 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer
               ${animClass} delay-[400ms]
             `}
             style={animStyle}
          >
            <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium group-hover:text-cool-900 transition-colors">
              About
            </span>
          </div>

          {/* E. CONNECT: Delay 600ms (Last) */}
          <div 
             onClick={() => setTab('Connect')}
             className={`
               w-full h-32 lg:h-auto 
               lg:col-start-3 lg:row-start-10 lg:col-span-2 lg:row-span-3 
               bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer
               ${animClass} delay-[600ms]
             `}
             style={animStyle}
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