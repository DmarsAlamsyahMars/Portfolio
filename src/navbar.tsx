import React, { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const navItems = ['Home', 'About', 'Projects', 'Lab'];

  return (
    <>
      {/* --- Connect Modal & Blur Overlay --- */}
<div 
  className={`
    fixed inset-0 z-[60] flex items-center justify-center px-6 font-sans
    transition-all duration-500 ease-in-out
    ${isConnectOpen 
      ? 'bg-cool-100/60 backdrop-blur-lg opacity-100 visible' 
      : 'bg-transparent backdrop-blur-none opacity-0 invisible pointer-events-none'}
  `}
  onClick={() => setIsConnectOpen(false)}
>
  <div 
    className="flex flex-col md:flex-row items-center gap-3 w-full max-w-xs md:max-w-none justify-center"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Email */}
    <a 
      href="mailto:dmarsalamsyah@gmail.com"
      className="h-11 w-full md:w-auto px-6 flex items-center justify-center bg-white border border-cool-200 hover:border-cool-300 text-cool-900 rounded-xl transition-all duration-200 hover:shadow-sm font-medium text-sm"
    >
      dmarsalamsyah@gmail.com
    </a>

    {/* LinkedIn */}
    <a 
      href="https://www.linkedin.com/in/dmarsalamsyah" 
      target="_blank" 
      rel="noopener noreferrer"
      className="h-11 w-full md:w-auto px-8 flex items-center justify-center bg-white border border-cool-200 hover:border-cool-300 text-cool-900 rounded-full transition-all duration-200 hover:shadow-sm font-medium text-sm"
    >
      LinkedIn
    </a>

    {/* Resume */}
    <a 
      href="currentcv.pdf" 
      target="_blank" 
      rel="noopener noreferrer"
      className="h-11 w-full md:w-auto px-8 flex items-center justify-center bg-white border border-cool-200 hover:border-cool-300 text-cool-900 rounded-full transition-all duration-200 hover:shadow-sm font-medium text-sm"
    >
      Resume
    </a>
  </div>
</div>

      {/* --- Navbar --- */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[70]">
        <nav className="font-sans flex items-center gap-1 p-1 bg-cool-100/80 backdrop-blur-md border border-cool-200 rounded-lg shadow-sm transition-all duration-300">
          
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                setIsConnectOpen(false);
              }}
              className={`
                relative px-4 py-2 rounded-md text-sm transition-all duration-300 ease-in-out font-medium
                ${
                  activeTab === item
                    ? 'text-cool-900 bg-cool-200/50' // Active state: Exactly matches the hover appearance (darker text + subtle bg)
                    : 'text-cool-900/60 hover:text-cool-900 hover:bg-cool-200/50' // Inactive state
                }
              `}
            >
              {item}
            </button>
          ))}

          {/* Connect Button */}
          <button
            onClick={() => setIsConnectOpen(true)}
            className={`
              relative px-4 py-2 rounded-md text-sm transition-all duration-300 ease-in-out font-medium
              text-cool-900/60 hover:text-cool-900 hover:bg-cool-200/50
            `}
          >
            Connect
          </button>

        </nav>
      </div>
    </>
  );
};

export default Navbar;