import React, { useState } from 'react';
import ProjectDeck from './ProjectDeck';
import Navbar from './navbar';
import Home from './Home'; 
import Projects from './Projects';
import About from './About';
import Lab from './Lab';
import Archive from './Archive';


// UPDATED: The "Database" of Collectibles with new order and types
const ARCHIVE_DATABASE = [
  // 1. Looping Video
  { id: 1, type: 'video', src: '/archive1.mp4' }, 
  // 2. Testimonial 1
  { id: 2, type: 'text', quote: "An absolute joy to work with. Brought our vision to life seamlessly!", name: "Sarah Jenkins", role: "Product Manager" },
  // 3. Switching Card (Special Collectible)
  { id: 3, type: 'switching-card', srcFront: '/archive3b.webp', srcBack: '/archive3a.webp' },
  // 4. Testimonial 2
  { id: 4, type: 'text', quote: "Having Dmars as the lead creative in charge was a huge relief as I could fully trust his visual direction which he consistently delivered with a sharp creative eye", name: "Amelia", role: "Captain of IOSBC" },
  // 5. Testimonial 3
  { id: 5, type: 'text', quote: "The best interactive portfolio we've seen this year. Highly recommended.", name: "Emily Rodriguez", role: "Creative Director" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [collectedArchives, setCollectedArchives] = useState<any[]>([]); 

  const isHome = activeTab === 'Home';

  const handleCatchUFO = () => {
    if (collectedArchives.length < ARCHIVE_DATABASE.length) {
      setCollectedArchives(prev => [...prev, ARCHIVE_DATABASE[prev.length]]);
    }
  };

  return (
    <main 
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
            {activeTab === 'Archive' && <Archive items={collectedArchives} />}
         </div>
      )}

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
};

export default App;