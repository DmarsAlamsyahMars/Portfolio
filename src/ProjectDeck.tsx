import React, { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { 
  Environment, 
  useTexture,
  PerspectiveCamera,
  Float,
  shaderMaterial
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * --- CUSTOM SHADER ---
 */
const FadeMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uOpacity: 0.9,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec4 tex = texture2D(uTexture, vUv);
      
      // Safe area: 0.15 (15%)
      float dX = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
      float dY = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
      
      float alphaMask = dX * dY;

      gl_FragColor = vec4(tex.rgb, tex.a * uOpacity * alphaMask);
    }
  `
);

extend({ FadeMaterial });

/**
 * CONFIGURATION
 */
const CARD_SIZE = [3, 4]; 
const CARD_THICKNESS = 0.07; 
const CARD_SPACING = 2.2;
const DIAGONAL_FACTOR = { x: 0.5, y: 0.15 }; 
const SCROLL_SPEED = 0.002; 
const DRAG_SPEED = 0.030; 

const PROJECTS_DATA = [
  { id: 1, image: '/images/maisonproject.webp' },
  { id: 2, image: '/images/aboutproject.webp' },
  { id: 3, image: '/images/camilanproject.webp' },
  { id: 4, image: '/images/cherrieproject.webp' },
  { id: 5, image: '/images/labproject.webp' },
  { id: 6, image: '/images/playgroundproject.webp' },
  { id: 7, image: '/images/camilanproject.webp' },
];

const PROJECTS = [...PROJECTS_DATA, ...PROJECTS_DATA];
const TOTAL_CARDS = PROJECTS.length; 

/**
 * CAMERA RIG
 * Handles the "Zoom Out" animation when dragging
 */
const CameraRig = ({ isDragging }: { isDragging: React.MutableRefObject<boolean> }) => {
  const vec = useMemo(() => new THREE.Vector3(), []);
  
  useFrame((state, delta) => {
    // Zoom out to Z=14 when dragging, back to Z=11 when released
    const targetPos = isDragging.current 
      ? [6.5, 9, 14]   
      : [5.5, 7, 11];  

    vec.set(targetPos[0], targetPos[1], targetPos[2]);
    state.camera.position.lerp(vec, delta * 3);
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
};

interface CardProps {
  index: number;
  image: string;
  scrollRef: React.MutableRefObject<number>;
}

const getBlurUrl = (url: string) => {
  const lastDotIndex = url.lastIndexOf('.');
  if (lastDotIndex === -1) return `${url}_blur`;
  return `${url.substring(0, lastDotIndex)}_blur${url.substring(lastDotIndex)}`;
};

const Card = ({ index, image, scrollRef }: CardProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  const hoverValue = useRef(0);
  
  const blurImage = getBlurUrl(image);
  const [texture, blurTexture] = useTexture([image, blurImage]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // --- LOOP LOGIC ---
    const totalLength = TOTAL_CARDS * CARD_SPACING;
    let zPos = (index * CARD_SPACING) + scrollRef.current;
    const halfLength = totalLength / 2;
    
    zPos = ((zPos + halfLength) % totalLength);
    if (zPos < 0) zPos += totalLength;
    zPos -= halfLength;

    // --- POSITION ---
    const xPos = -zPos * DIAGONAL_FACTOR.x; 
    const yPos = -zPos * DIAGONAL_FACTOR.y;

    // --- ROTATION ---
    const targetRotationY = 0; 
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 2);

    // Hover Animation
    const targetHover = hovered ? 0.6 : 0;
    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 15);
    const hoverScale = hovered ? 1.05 : 1.0;

    groupRef.current.position.set(xPos, yPos + hoverValue.current, zPos);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, hoverScale, delta * 10));
  });

  const [w, h] = CARD_SIZE;

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        
        {/* --- RESTORED: LAYER 1 (GLASS EDGES) --- */}
        {/* This was the missing part. We map textures ONLY to the sides (0-3) */}
        <mesh position={[0, 0, -CARD_THICKNESS / 2]}>
          <boxGeometry args={[w, h, CARD_THICKNESS]} />
          <meshBasicMaterial attach="material-0" map={blurTexture} color="#aaaaaa" />
          <meshBasicMaterial attach="material-1" map={blurTexture} color="#aaaaaa" />
          <meshBasicMaterial attach="material-2" map={blurTexture} color="#aaaaaa" />
          <meshBasicMaterial attach="material-3" map={blurTexture} color="#aaaaaa" />
          {/* Front and Back faces are hidden so inner layers show through */}
          <meshBasicMaterial attach="material-4" visible={false} />
          <meshBasicMaterial attach="material-5" visible={false} />
        </mesh>

        {/* --- LAYER 2: BLUR GLOW (MIDDLE) --- */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial 
            map={blurTexture} 
            transparent 
            opacity={0.5} 
            depthWrite={false} 
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* --- LAYER 3: SHARP IMAGE (FRONT) --- */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[w, h]} />
          {/* @ts-ignore */}
          <fadeMaterial 
            uTexture={texture} 
            uOpacity={1.0}
            transparent={true}
            depthWrite={false} 
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
  const targetScroll = useRef(3.5); 
  const [ready, setReady] = useState(false);
  
  // Drag State
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    targetScroll.current += e.deltaY * SCROLL_SPEED;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.clientY - lastY.current;
    targetScroll.current += deltaY * DRAG_SPEED;
    lastY.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div 
      className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={() => setReady(true)}
      >
        <CameraRig isDragging={isDragging} />

        <PerspectiveCamera makeDefault position={[5.5, 7, 11]} fov={32} />
        
        <Environment preset="warehouse" background={false} blur={0.6} />
        <ambientLight intensity={1.2} /> 
        <spotLight position={[-15, 20, 15]} angle={0.3} penumbra={1} intensity={2} />
        
        <SmoothScroll scrollRef={scrollRef} targetScroll={targetScroll} />

        <group position={[0, 0, 0]}> 
          {PROJECTS.map((proj, i) => (
            <Card key={i} index={i} scrollRef={scrollRef} {...proj} />
          ))}
        </group>
      </Canvas>
      
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7)_0%,transparent_25%)]" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.7)_0%,transparent_25%)]" />

      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-400 select-none pointer-events-none opacity-60 z-20">
        SCROLL OR DRAG
      </div>
    </div>
  );
};

export default ProjectDeck;