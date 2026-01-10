import React, { useState } from 'react';
import ProjectDeck from './ProjectDeck';
import Navbar from './navbar';
import Home from './Home'; 
import Projects from './Projects';
import About from './About';
import Lab from './Lab';

// --- PLACEHOLDER PAGES ---
const Archive = () => <div className="text-4xl">Archive Page</div>;
const Connect = () => <div className="text-4xl">Connect Page</div>;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const isHome = activeTab === 'Home';

  return (
    <main 
      className={`
        relative w-full min-h-screen bg-cool-50 p-4 gap-4 font-serif pb-32 lg:pb-4 flex flex-col 
        ${isHome ? 'lg:flex-row lg:h-screen lg:overflow-hidden' : 'h-auto'}
      `}
    >
      
      {/* --- SCENARIO A: HOME PAGE --- */}
      {isHome && (
        <>
           <div className="w-full lg:w-[50%] flex flex-col pt-24 lg:pt-5 gap-8 lg:gap-6 p-4 lg:pl-8 z-10 overflow-y-auto">
              <Home setTab={setActiveTab} />
           </div>

           <div className="hidden lg:block w-[50%] h-[85.5%] mt-5 bg-cool-100 rounded-2xl relative overflow-hidden border border-cool-200 -translate-x-6 animate-in fade-in slide-in-from-right-8 duration-700">
              <ProjectDeck />
           </div>
        </>
      )}

      {/* --- SCENARIO B: OTHER PAGES --- */}
      {!isHome && (
         <div className="w-full min-h-full pt-24 lg:pt-5 p-4 lg:px-12 z-10 animate-in fade-in zoom-in-[0.99] duration-300">
            {activeTab === 'About' && <About />}
            {activeTab === 'Projects' && <Projects />}
            {activeTab === 'Archive' && <Archive />}
            {activeTab === 'Lab' && <Lab />}
            {activeTab === 'Connect' && <Connect />}
         </div>
      )}

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

    </main>
  );
};

export default App;