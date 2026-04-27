import React, { useState, useRef, useEffect } from 'react';
import ProjectDeck from './ProjectDeck';
import Navbar from './navbar';
import Home from './Home'; 
import Projects from './Projects';
import About from './About';
import Lab from './Lab';
import Archive from './Archive';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const isHome = activeTab === 'Home';
  const mainRef = useRef<HTMLElement>(null);

  // Fix: Reset scroll on tab change — targets all possible scroll containers
  // because iOS Safari and DevTools emulation often scroll window/documentElement
  // instead of the <main> element, even with overflow-y: auto on it.
  useEffect(() => {
    // 1. The <main> element itself
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    // 2. window — covers DevTools mobile emulation + some Android browsers
    window.scrollTo(0, 0);
    // 3. document.documentElement — covers iOS Safari's true scroll root
    document.documentElement.scrollTop = 0;
    // 4. document.body — older iOS / edge case fallback
    document.body.scrollTop = 0;
  }, [activeTab]);

  return (
    <main 
      ref={mainRef}
      className={`
        relative w-full bg-cool-50 p-4 gap-4 font-serif pb-32 lg:pb-4 flex flex-col 
        ${isHome ? 'lg:flex-row' : ''}
        lg:h-screen lg:overflow-hidden 
        min-h-screen h-auto overflow-y-auto
      `}
    >
      {/* --- SCENARIO A: HOME PAGE --- */}
      {isHome && (
        <>
           <div className="w-full lg:w-[50%] flex flex-col pt-24 lg:pt-5 gap-8 lg:gap-6 p-4 lg:pl-8 z-10 overflow-y-auto">
              <Home setTab={setActiveTab} />
           </div>

           <div className="hidden lg:block w-[50%] h-[85.5%] mt-5 bg-cool-100 rounded-2xl relative overflow-hidden border border-cool-200 -translate-x-6 animate-in fade-in slide-in-from-right-8 duration-700">
              <ProjectDeck onCardClick={setActiveTab} />
           </div>
        </>
      )}

      {/* --- SCENARIO B: OTHER PAGES --- */}
      {!isHome && (
         <div className="w-full min-h-full pt-24 lg:pt-5 p-4 lg:px-12 z-10 animate-in fade-in zoom-in-[0.99] duration-300">
            {activeTab === 'About' && <About />}
            {activeTab === 'Projects' && <Projects />}
            {activeTab === 'Lab' && <Lab />}
            {activeTab === 'Archive' && <Archive />}
         </div>
      )}

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
};

export default App;