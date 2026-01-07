import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  useTexture,
  PerspectiveCamera,
  Float
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * CONFIGURATION
 */
const CARD_SIZE = [3, 4]; 
const CARD_SPACING = 2.6; 
const DIAGONAL_FACTOR = { x: 1, y: 0.5 }; 
const SCROLL_SPEED = 0.002; 

const PROJECTS_DATA = [
  { id: 1, image: '/images/maisonproject.webp' },
  { id: 2, image: '/images/aboutproject.webp' },
  { id: 3, image: '/images/camilanproject.webp' },
  { id: 4, image: '/images/cherrieproject.webp' },
  { id: 5, image: '/images/img5.jpg' },
  { id: 6, image: '/images/playgroundproject.webp' },
  { id: 7, image: '/images/camilanproject.webp' },
];

const PROJECTS = [...PROJECTS_DATA, ...PROJECTS_DATA];
const TOTAL_CARDS = PROJECTS.length; 

interface CardProps {
  index: number;
  image: string;
  scrollRef: React.MutableRefObject<number>;
}

const Card = ({ index, image, scrollRef }: CardProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  
  // Independent value for smooth hover animation
  const hoverValue = useRef(0);
  
  const texture = useTexture(image);
  
  const transmissionTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff'; 
      ctx.fillRect(0, 0, 512, 512);
      const gradient = ctx.createRadialGradient(256, 256, 120, 256, 256, 300);
      gradient.addColorStop(0, '#000000'); 
      gradient.addColorStop(1, '#ffffff'); 
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const totalLength = TOTAL_CARDS * CARD_SPACING;
    let zPos = (index * CARD_SPACING) + scrollRef.current;
    const halfLength = totalLength / 2;
    
    zPos = ((zPos + halfLength) % totalLength);
    if (zPos < 0) zPos += totalLength;
    zPos -= halfLength;

    const targetRotationX = -0.15;
    const targetRotationY = 0.25; 
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 2);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 2);

    const xPos = -zPos * DIAGONAL_FACTOR.x; 
    const yPos = -zPos * DIAGONAL_FACTOR.y;
    
    const targetHover = hovered ? 0.8 : 0;
    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 15);
    const hoverScale = hovered ? 1.1 : 1.0;

    groupRef.current.position.x = xPos + hoverValue.current;
    groupRef.current.position.y = yPos;
    groupRef.current.position.z = zPos;
    
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, hoverScale, delta * 10));
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[CARD_SIZE[0], CARD_SIZE[1], 0.15]} /> 
          <meshPhysicalMaterial 
            map={texture}
            transmissionMap={transmissionTexture} 
            transmission={1.0}      
            thickness={2.0}         
            roughness={0.2}         
            ior={1.5}               
            clearcoat={1.0}         
            clearcoatRoughness={0.1}
            metalness={0.1}         
            color="#ffffff"
            transparent={false}     
          />
        </mesh>
      </Float>
    </group>
  );
};

const SmoothScroll = ({ scrollRef, targetScroll }: { scrollRef: React.MutableRefObject<number>, targetScroll: React.MutableRefObject<number> }) => {
  useFrame((state, delta) => {
    scrollRef.current = THREE.MathUtils.damp(scrollRef.current, targetScroll.current, 3, delta);
  });
  return null;
};

const ProjectDeck: React.FC = () => {
  const scrollRef = useRef(0);
  const targetScroll = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    targetScroll.current += e.deltaY * SCROLL_SPEED;
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
    >
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={35} />
        
        <Environment preset="warehouse" background={false} blur={0.6} />
        
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[15, 15, 15]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          shadow-bias={-0.0001}
        />
        
        <pointLight position={[-5, 5, -5]} intensity={1.5} color="white" />

        <SmoothScroll scrollRef={scrollRef} targetScroll={targetScroll} />

        <group position={[0, 0, 0]}> 
          {PROJECTS.map((proj, i) => (
            <Card 
              key={i} 
              index={i} 
              scrollRef={scrollRef}
              {...proj} 
            />
          ))}
        </group>
      </Canvas>
      
      {/* --- DREAMY CORNER OVERLAYS --- */}
      
      {/* Top Right Corner Cloud 
          circle_at_top_right: Starts exactly at the corner
          white -> transparent_45%: Fades out gently towards the center
      */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7)_0%,transparent_45%)]" />

      {/* Bottom Left Corner Cloud 
          circle_at_bottom_left: Starts exactly at the corner
          white -> transparent_45%: Fades out gently towards the center
      */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.7)_0%,transparent_45%)]" />

      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-400 select-none pointer-events-none opacity-60 z-20">
        SCROLL
      </div>
    </div>
  );
};

export default ProjectDeck;