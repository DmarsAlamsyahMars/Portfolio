// Lab.tsx
import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- CUSTOM SHADER ---
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
        
        // --- TRANSITION CONTROL ---
        // We changed 0.1 to 0.2.
        // 0.2 means the "Safe/Opaque" area starts 20% inwards.
        // This creates a smaller inner square and a bigger, smoother fade zone.
        
        float dX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
        float dY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
        
        float alphaMask = dX * dY;
  
        gl_FragColor = vec4(tex.rgb, tex.a * uOpacity * alphaMask);
      }
    `
  );

extend({ FadeMaterial });

const Card = ({ position }: { position: [number, number, number] }) => {
  const [texture, blurTexture] = useTexture([
    '/images/aboutproject.webp',
    '/images/aboutproject_blur.webp'
  ]);

  const w = 3;
  const h = 4;
  const thickness = 0.05;

  return (
    <group position={position} rotation={[0, -0.3, 0]}>
      
      {/* --- LAYER 1: BLUR (BACK) --- */}
      <mesh position={[0, 0, -thickness/2 - 0.01]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial 
          map={blurTexture} 
          transparent 
          opacity={0.5} 
          depthWrite={false} // Always false for transparent layers
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* --- LAYER 2: GLASS BODY (THICKNESS) --- */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[w, h, thickness]} /> 
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
          depthWrite={false} 
        />
      </mesh>

      {/* --- LAYER 3: SHARP IMAGE (FRONT) --- */}
      <mesh position={[0, 0, thickness/2 + 0.001]}>
        <planeGeometry args={[w, h]} />
        {/* @ts-ignore */}
        <fadeMaterial 
          uTexture={texture} 
          uOpacity={0.9} 
          transparent={true}
          
          // FIX 2: DISABLE DEPTH WRITE
          // This allows the card BEHIND this one to be seen through the front image.
          depthWrite={false} 
        />
      </mesh>

    </group>
  );
};

const Lab: React.FC = () => {
  return (
    <div className="w-full h-screen bg-[#050505] relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 18], fov: 20 }}>
        <ambientLight intensity={1} />
        
        {/* Overlapping positions */}
        <Card position={[-0.6, 0.2, 0]} />
        <Card position={[0.6, -0.2, 0.2]} />
        
      </Canvas>
    </div>
  );
};

export default Lab;