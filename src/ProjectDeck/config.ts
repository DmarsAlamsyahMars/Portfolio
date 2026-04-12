// src/components/ProjectDeck/config.ts
export const CARD_SIZE = [3, 4]; 
export const CARD_THICKNESS = 0.07; 
export const CARD_SPACING = 2.2;
export const DIAGONAL_FACTOR = { x: 0.5, y: 0.15 }; 
export const SCROLL_SPEED = 0.002; 
export const DRAG_SPEED = 0.030; 

export const PROJECTS_DATA = [
  { id: 1, image: '/images/maisonproject.webp', title: 'Maison des Rêves', tab: 'Projects' },
  { id: 2, image: '/images/aboutproject.webp', title: 'About Mars', tab: 'About' },
  { id: 3, image: '/images/camilanproject.webp', title: 'Camilan App', tab: 'Projects' },
  { id: 4, image: '/images/cherrieproject.webp', title: 'Cherrie Design', tab: 'Projects' },
  { id: 5, image: '/images/labproject.webp', title: 'The Lab Experiments', tab: 'Lab' },
  { id: 6, image: '/images/playgroundproject.webp', title: 'Creative Playground', tab: 'Lab' },
  { id: 7, image: '/images/camilanproject.webp', title: 'Camilan App V2', tab: 'Projects' },
];

export const PROJECTS = [...PROJECTS_DATA, ...PROJECTS_DATA];
export const TOTAL_CARDS = PROJECTS.length;