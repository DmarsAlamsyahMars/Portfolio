import React, { useState } from 'react';
import ProjectDeck from './ProjectDeck';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navItems = ['Home', 'Projects', 'About', 'Contact'];

  return (
    // MAIN CONTAINER
    <main className="relative w-full h-screen bg-cool-50 overflow-hidden flex flex-col lg:flex-row p-4 gap-4 font-serif">
      
      {/* --- LEFT PANEL: Text & Mini Grid (50% width) --- */}
      {/* We leave this exactly as it is. We do not touch the width. */}
      <div className="w-full lg:w-[50%] flex flex-col pt-24 lg:pt-5 gap-8 lg:gap-6 p-4 lg:pl-8 z-10">
        
        {/* Header Text Section */}
        <div className="flex flex-col gap-6 text-[32px] lg:text-[33px] leading-none">          
          <p className="text-cool-900/40">
            Hi there, welcome to my space.
            <br />
            I'm <span className="text-cool-900">Mars</span> an information systems graduate 
            who loves anything about <span className="text-cool-900">interactive digital experience.</span>
          </p>

          <p className="text-cool-900/40">
            This space is a collection of things I've <span className="text-cool-900">built</span> and <span className="text-cool-900">experimented</span> along the way. Feel free to look around!
          </p>

        </div>

        {/* Mini Bento Grid */}
        <div className="w-full aspect-[16/9] lg:aspect-[2.2/1] grid grid-cols-3 grid-rows-2 gap-2">
            
            {/* Projects */}
            <div className="col-span-1 row-span-2 bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer">
               {/* Added 'font-sans' (Satoshi) and changed color to 'text-cool-900/60' (Grey) */}
               <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium">Projects</span>
            </div>

            {/* Archive */}
            <div className="col-span-1 row-span-1 bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer">
               <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium">Archive</span>
            </div>

            {/* About */}
            <div className="col-span-1 row-span-1 bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer">
               <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium">About</span>
            </div>

            {/* Lab */}
            <div className="col-span-1 row-span-1 bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer">
               <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium">Lab</span>
            </div>

            {/* Connect */}
            <div className="col-span-1 row-span-1 bg-cool-100 border border-cool-200 rounded-lg hover:bg-cool-200 transition-colors duration-300 p-4 relative group cursor-pointer">
               <span className="absolute bottom-3 left-4 text-lg font-sans text-cool-900/60 font-medium">Connect</span>
            </div>

        </div>
      </div>

      {/* --- RIGHT PANEL --- */}
      {/* 1. Removed 'flex-1' (Stop stretching) */}
      {/* 2. Added '-translate-x-16' (Moves the box 64px to the LEFT visually) */}
      {/* 3. Added 'w-[40%]' (Keeps it a fixed size) */}
      <div className="hidden lg:block w-[50%] h-[85.5%] mt-5 bg-cool-100 rounded-2xl relative overflow-hidden border border-cool-200 -translate-x-6">
         <ProjectDeck />
      </div>

      {/* Floating Navbar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 p-1 bg-cool-100/80 backdrop-blur-md border border-cool-200 rounded-lg shadow-sm">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`
                relative px-6 py-2 rounded-md text-sm transition-all duration-300 ease-in-out
                ${activeTab === item ? 'text-cool-900 bg-cool-50 shadow-sm font-medium' : 'text-cool-900/60 hover:text-cool-900 hover:bg-cool-200/50'}
              `}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

    </main>
  );
};

export default App;