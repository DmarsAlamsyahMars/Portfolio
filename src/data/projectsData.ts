export interface ProjectData {
  id: number;
  title: string;
  size: string;
  delay: string;
  image?: string;
  folderImage?: string;
  imageClass?: string;
  titleClass?: string;
  link?: string;
  modalContent?: {
    role: string;
    year: string;
    tags?: string[];
    introText?: string;
    sideImage?: string;
    sideImages?: string[];
    sideText?: string;
    phases?: string[];
    roleFlows?: {
      role: string;
      features: string;
    }[];
    fullImage?: string;
    narrative?: string;
    description?: string; 
    narrativeSections?: {
      paragraph: string;
      image?: string;
    }[];
    // Add this new property for the WJDM layout
    verticalSplit?: {
      image: string;
      text: string;
      boxText: string;
    }[];
  };
}

export const PROJECTS: ProjectData[] = [
  { 
    id: 1, 
    title: "cherrie",
    link: "https://cherriebar.vercel.app",
    size: "col-span-1 md:col-span-3 md:row-span-1", 
    delay: "delay-[100ms]",
    image: "/laptopcherrie.webp",
    folderImage: "/cherriefolder.webp",
    imageClass: "object-top scale-100 translate-y-[20%]",
    titleClass: "-translate-y-3"
  },
  { 
    id: 2, 
    title: "Maison des Rêves",
    link: "https://maisondesreves.vercel.app",
    size: "col-span-1 md:col-span-4 md:row-span-1", 
    delay: "delay-[200ms]",
    image: "/laptopmaison.webp",
    folderImage: "/maisonfolder.webp",
    imageClass: "object-top scale-100 translate-y-[20%]",
    titleClass: "-translate-y-3"
  },
  { 
    id: 3, 
    title: "WJDM",
    size: "col-span-1 md:col-span-3 md:row-span-1", 
    delay: "delay-[300ms]",
    image: "/wjdmhero.webp",
    folderImage: "/wjdmfolder.webp",
    titleClass: "-translate-y-3",
    modalContent: {
      description: "A minimalistic approach to digital design, focusing on clean typography and spacious layouts.",
      role: "UI/UX & Front-End Internship",
      year: "Nov 2025 - Feb 2026",
      tags: ["Figma", "PHP", "JavaScript", "PostgreSQL"],
      introText: "My first professional experience. Placed in the the Bureau of Goods and Services Procurement.",
      sideImage: "/wjdmfull.webp",
      sideText: "West Java's procurement landscape had a fragmentation problem. General users which spans over a wide range of age group, had to navigate up to five separate websites just to complete a process. This led to recurring issues, such as UMKM Owners registering in the wrong regional marketplace or misinformation. WJDM was the proposed answer, a single, integrated platform built specifically for the West Java region.",
      phases: ["Requested to build a full web system", "Agreed to focus on a high-fidelity prototype", "Research & legal context", "Concepting & prototyping", "Incremental builds with feedback loops", "Final prototype presented to head of bureau", "Roadmap feature built & signed off"],
      narrative: "Working inside a government environment as a college student back then was its own kind of learning. Most colleagues were of different generations, much higher position and more experienced than myself, some workflows were still manual, and the pace was different from anything academic. Adapting to that and still delivering something that got approved is something I carry forward."
    }
  },
  { 
    id: 4, 
    title: "Camilan 16",
    size: "col-span-1 md:col-span-4 md:row-span-1", 
    delay: "delay-[400ms]",
    image: "/camilan.webp",
    folderImage: "/camilanfolder.webp",
    titleClass: "-translate-y-3",
    modalContent: {
      role: "Packaging Design",
      year: "2025",
      tags: ["Adobe Photoshop", "Adobe Illustrator"],
      introText: "Box packaging design for a Bandung-based traditional snack brand.",
      sideImage: "/camilan1.webp",
      sideText: "The brief was simple: elegant, but not overcomplicated. With three box sizes to design for, the challenge was creating a system that felt cohesive across variants while still giving each one its own presence. Working with minimal direction, I made most of the visual decisions independently, from how the brand elements were applied, to the pattern language used accros the boxes",
      fullImage: "/camilan2.webp",
      narrative: "The patterns went through two rounds of feedback, as the first didn't quite land, but the second did. A deliberate shift in approach led to something that felt more refined and intentional. I applied gradient that feels quiet but evokes important detail that is soft enough to stay elegant, present enough to give the packaging a quality feel. The client was happy with the result, and the designs went into production.",
    }
  },
  { 
    id: 5, 
    title: "The Room 19",
    size: "col-span-1 md:col-span-6 md:row-span-1", 
    delay: "delay-[500ms]",
    image: "/theroom.webp",
    folderImage: "/theroomfolder.webp",
    titleClass: "-translate-y-3",
    modalContent: {
      description: "Website development for the staff management and staff attendance module at The Room 19 Library Bandung.",
      role: "Full-Stack Developer",
      year: "2025",
      tags: ["React", "Next.js", "JavaScript", "PostgreSQL"],
      introText: "A comprehensive internal tool to streamline staff operations.",
      sideImages: [
        "/tr1.webp", 
        "/tr3.webp", 
        "/tr4.webp", 
        "/tr6.webp"
      ],
      sideText: "The Room 19 needed a dedicated platform to handle internal logistics. The challenge was creating a system that served two very different user groups: the administrators managing the operations, and the staff logging their daily activities.",
      roleFlows: [
        {
          role: "Admin",
          features: "dashboard, manage staff, assign shifts, oversee attendance."
        },
        {
          role: "Staff",
          features: "dashboard, daily clock-in/out, attendance history, quick check-in."
        }
      ],
      narrative: "Structuring the database to handle these distinct permission levels was a great exercise in security and role-based access control."
      
    }
    
  }
];