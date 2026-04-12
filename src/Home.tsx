import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import ProjectDeck from './ProjectDeck';

// 1. MARSLINK COMPONENT
const MarsLink = () => {
  return (
    <span className="text-cool-900 inline-flex items-center gap-2">
      <span>Mars</span>
      <a
        href="https://science.nasa.gov/mars/facts/"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer select-none inline-flex"
        title="Visit NASA Mars Facts"
      >
        <img
          src="/images/marsplanet.webp"
          alt="Mars Planet"
          className="
            w-[1.1em] h-[1.1em] object-contain 
            translate-y-[2px] 
            transition-transform duration-300 ease-out 
            hover:scale-125 hover:rotate-12
          "
        />
      </a>
    </span>
  );
};

// 2. INTERACTIVE ICON COMPONENT
const InteractiveIcon = () => {
  const icons = ['/emo1.webp', '/emo2.webp', '/emo3.webp', '/emo4.webp'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsClicking(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);

    setTimeout(() => {
      setIsClicking(false);
    }, 150);

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 360,
      startVelocity: 15,
      origin: { x, y },
      scalar: 0.6,
      ticks: 75,
      zIndex: 100,
      disableForReducedMotion: true
    });
  };

  return (
    <span
      onClick={handleClick}
      className="inline-flex cursor-pointer select-none ml-2 align-baseline"
      title="Click to interact!"
    >
      <img
        src={icons[currentIndex]}
        alt="Interactive Element"
        className={`
          w-[1.1em] h-[1.1em] object-contain 
          translate-y-[6px] 
          transition-transform duration-150 ease-out 
          ${isClicking ? 'scale-75' : 'scale-100 hover:scale-125 hover:-rotate-12'}
        `}
      />
    </span>
  );
};

// 3. EYE TRACKER COMPONENT
const EyeTracker = () => {
  const [isClicking, setIsClicking] = useState(false);
  const pupilRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Updated to handle both Mouse and Touch events
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!pupilRef.current) return;

      let clientX = 0;
      let clientY = 0;

      // Check if it's a touch event or a mouse event
      if ('touches' in e) {
        // Grab the coordinates of the first finger touching the screen
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const moveX = (clientX / window.innerWidth - 0.5) * 6;
      const moveY = (clientY / window.innerHeight - 0.5) * 6;

      pupilRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    // Listen for mouse movement (Desktop)
    window.addEventListener('mousemove', handleMove);
    
    // Listen for finger dragging and initial taps (Mobile)
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchstart', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchstart', handleMove);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => {
      setIsClicking(false);
    }, 150);
  };

  return (
    <span
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center
        w-[1.2em] h-[1.2em] ml-2 align-baseline translate-y-[3px]
        cursor-pointer transition-transform duration-150 ease-out
        ${isClicking ? 'scale-75' : 'scale-100'}
      `}
      title="I see you!"
    >
      <img
        src="/eye1.webp"
        alt="Eye White"
        className="absolute inset-0 w-full h-full object-contain z-10"
      />
      <img
        ref={pupilRef}
        src="/eye2.webp"
        alt="Eye Pupil"
        className="absolute w-full h-full object-contain z-20 ease-out duration-75" 
      />
    </span>
  );
};

interface HomeProps {
  setTab: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ setTab }) => {
  const animClass = "animate-in fade-in slide-in-from-top-4 duration-700 ease-out";
  const animStyle = { animationFillMode: 'backwards' } as React.CSSProperties;

  return (
    <div className="flex flex-col gap-6 lg:gap-6 h-auto lg:h-[calc(100vh-6rem)] w-full pb-32 lg:pb-8">
      
      {/* 1. Header Text Section */}
      <div className="flex flex-col gap-6 text-[32px] lg:text-[41px] leading-[1.3] shrink-0">          
        
        {/* PARAGRAPH 1: Delay 0ms */}
        <p className={`text-cool-900/40 ${animClass}`}>
          Hi there, welcome to my space.
          <br />
          I'm{" "}
          <MarsLink />
          {" "}an information systems graduate 
          who loves anything about <span className="text-cool-900">interactive digital experience</span>
          <InteractiveIcon />.
        </p>

        {/* PARAGRAPH 2: Delay 100ms */}
        <p 
          className={`text-cool-900/40 ${animClass} delay-100`}
          style={animStyle}
        >
          This space is a collection of things I've <span className="text-cool-900">built</span> and <span className="text-cool-900">experimented</span> along the way. Feel free to look around!
          <EyeTracker />
        </p>
      </div>

      {/* 2. Mobile Only Project Deck: Delay 200ms */}
      <div 
        className={`block lg:hidden w-full aspect-[4/5] bg-cool-100 rounded-2xl relative overflow-hidden border border-cool-200 shrink-0 ${animClass} delay-200`}
        style={animStyle}
      >
           <ProjectDeck onCardClick={setTab} />
      </div>
      </div>

  );
};

export default Home;