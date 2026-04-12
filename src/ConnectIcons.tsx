import React from 'react';
import { motion } from 'framer-motion';

const ConnectIcons: React.FC = () => {
  const socials = [
    { name: 'linkedin', url: 'https://www.linkedin.com/in/dmarsalamsyah', imgSrc: '/linkedin.webp' },
    { name: 'github', url: 'https://github.com/DmarsAlamsyahMars', imgSrc: '/git.webp' },
    { name: 'Behance', url: 'https://www.behance.net/dmarsalamsyah', imgSrc: '/behance.webp' },
    { name: 'Letterboxd', url: 'https://boxd.it/897WH', imgSrc: '/letter.webp' },
  ];

  return (
    <div className="w-full">
      <span className="text-slate-600 text-sm font-sans tracking-wide lowercase block mb-3">
        more of me:
      </span>
      <div className="flex items-center gap-4">
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            // Added rotate: 6 for that subtle tilt!
            whileHover={{ scale: 1.15, y: -2, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            // Stripped out all the bg, border, and rounded-full classes
            className="group flex items-center justify-center cursor-pointer"
          >
            <img 
              src={social.imgSrc} 
              alt={social.name}
              // Increased size slightly to w-6 h-6 so they don't look lost without the circle
              className="w-6 h-6 object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100" 
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ConnectIcons;