import React from 'react';

const About: React.FC = () => {
  return (
    // Main container matches Projects.tsx exactly for consistency
    <div className="flex flex-col justify-center gap-8 lg:gap-10 h-screen w-full pb-32 lg:pb-12 px-4 lg:px-0">
      
      {/* 1. Header Section */}
      <div className="animate-in slide-in-from-bottom-4 duration-700 shrink-0">
        <h1 className="text-5xl lg:text-7xl leading-none text-cool-900 font-serif">
          About
        </h1>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 w-full max-w-6xl mx-auto h-[55vh] animate-in fade-in zoom-in-[0.99] duration-700 delay-100 items-center">

        {/* --- LEFT TEXT --- */}
        <div className="order-2 md:order-1">
          <p className="text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse.
          </p>
        </div>

        {/* --- MIDDLE: ROUNDED SQUARE / RECTANGLE --- 
            - Changed rounded-full to rounded-lg (Matches Home/Project grids)
            - Added hover effect matching the grids
        */}
        <div className="h-full w-full bg-cool-100 border border-cool-200 rounded-lg relative overflow-hidden order-1 md:order-2 group transition-colors hover:bg-cool-200 duration-300 cursor-pointer">
           {/* Placeholder Label */}
           <div className="absolute inset-0 flex items-center justify-center text-cool-900/20 font-serif text-xl">
             Image Placeholder
           </div>
        </div>

        {/* --- RIGHT TEXT --- */}
        <div className="order-3 md:order-3">
          <p className="text-cool-900/60 font-sans text-sm lg:text-base leading-relaxed text-justify">
            Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste 
            natus error sit voluptatem.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;