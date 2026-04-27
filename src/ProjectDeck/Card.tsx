// src/ProjectDeck/Card.tsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { CARD_SIZE, CARD_THICKNESS, CARD_SPACING, DIAGONAL_FACTOR, TOTAL_CARDS } from './config';
import './FadeMaterial';

interface CardProps {
  index: number;
  image: string;
  title: string;
  tab: string;
  scrollRef: React.MutableRefObject<number>;
  isDragging: React.MutableRefObject<boolean>;
  onCardClick?: (tab: string) => void;
}

const getBlurUrl = (url: string) => {
  const lastDotIndex = url.lastIndexOf('.');
  if (lastDotIndex === -1) return `${url}_blur`;
  return `${url.substring(0, lastDotIndex)}_blur${url.substring(lastDotIndex)}`;
};

export const Card = ({ index, image, title, tab, scrollRef, isDragging, onCardClick }: CardProps) => {
  // Parent ref — handles XYZ carousel position, pointer events stay here
  const parentRef = useRef<THREE.Group>(null);
  // Inner ref — only gets the Y hover lift applied, never moves in XZ
  const innerRef = useRef<THREE.Group>(null);

  const [hovered, setHover] = useState(false);
  const hoverValue = useRef(0);

  const blurImage = getBlurUrl(image);
  const [texture, blurTexture] = useTexture([image, blurImage]);

  useFrame((_state, delta) => {
    if (!parentRef.current || !innerRef.current) return;

    // --- Carousel position goes on the PARENT ---
    const totalLength = TOTAL_CARDS * CARD_SPACING;
    let zPos = (index * CARD_SPACING) + scrollRef.current;
    const halfLength = totalLength / 2;

    zPos = ((zPos + halfLength) % totalLength);
    if (zPos < 0) zPos += totalLength;
    zPos -= halfLength;

    const xPos = -zPos * DIAGONAL_FACTOR.x;
    const yPos = -zPos * DIAGONAL_FACTOR.y;

    parentRef.current.position.set(xPos, yPos, zPos);
    parentRef.current.rotation.y = THREE.MathUtils.lerp(parentRef.current.rotation.y, 0, delta * 2);

    // --- Hover lift goes on the INNER child ---
    // Parent never moves due to hover, so the hitbox stays put — no flicker
    const isActuallyHovered = hovered && !isDragging.current;
    const targetHover = isActuallyHovered ? 0.6 : 0;
    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 15);

    const hoverScale = isActuallyHovered ? 1.05 : 1.0;
    innerRef.current.position.y = hoverValue.current;
    innerRef.current.scale.setScalar(
      THREE.MathUtils.lerp(innerRef.current.scale.x, hoverScale, delta * 10)
    );
  });

  const [w, h] = CARD_SIZE;

  return (
    // PARENT: owns the carousel position + pointer events hitbox, never Y-lifted
    <group
      ref={parentRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!isDragging.current) setHover(true);
      }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (isDragging.current) return;
        if (onCardClick) onCardClick(tab);
      }}
    >
      {/* INNER: only this moves up on hover — Emil's pattern */}
      <group ref={innerRef}>
        <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
          <Html position={[w / 2 - 0.5, h / 2 + 0.3, 0]} center style={{ pointerEvents: 'none' }}>
            <div
              className="font-sans bg-white/60 backdrop-blur-md text-slate-800 font-medium text-sm px-4 py-2 rounded-full whitespace-nowrap shadow-xl border border-white/40"
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: (hovered && !isDragging.current) ? 1 : 0,
                transform: `translate3d(0, ${(hovered && !isDragging.current) ? 0 : 10}px, 0)`,
              }}
            >
              {title}
            </div>
          </Html>

          <mesh position={[0, 0, -CARD_THICKNESS / 2]}>
            <boxGeometry args={[w, h, CARD_THICKNESS]} />
            <meshBasicMaterial attach="material-0" map={blurTexture} color="#aaaaaa" />
            <meshBasicMaterial attach="material-1" map={blurTexture} color="#aaaaaa" />
            <meshBasicMaterial attach="material-2" map={blurTexture} color="#aaaaaa" />
            <meshBasicMaterial attach="material-3" map={blurTexture} color="#aaaaaa" />
            <meshBasicMaterial attach="material-4" visible={false} />
            <meshBasicMaterial attach="material-5" visible={false} />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial map={blurTexture} transparent opacity={0.5} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>

          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[w, h]} />
            {/* @ts-ignore */}
            <fadeMaterial uTexture={texture} uOpacity={1.0} transparent={true} depthWrite={false} />
          </mesh>
        </Float>
      </group>
    </group>
  );
};