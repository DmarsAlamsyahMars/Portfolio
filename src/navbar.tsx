import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  // 1. Added 'Lab' to the list
  const navItems = ['Home', 'About', 'Projects', 'Lab', 'Connect'];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="font-sans flex items-center gap-1 p-1 bg-cool-100/80 backdrop-blur-md border border-cool-200 rounded-lg shadow-sm transition-all duration-300">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)} // 2. Simplified: Just update state
            className={`
              relative px-4 py-2 rounded-md text-sm transition-all duration-300 ease-in-out font-medium
              ${
                activeTab === item
                  ? 'text-cool-900 bg-cool-50 shadow-sm'
                  : 'text-cool-900/60 hover:text-cool-900 hover:bg-cool-200/50'
              }
            `}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;