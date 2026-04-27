import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import { PROJECTS, SCROLL_SPEED, DRAG_SPEED } from './config';
import { CameraRig } from './CameraRig';
import { Card } from './Card';

interface ProjectDeckProps {
  onCardClick?: (tab: string) => void;
}

const SmoothScroll = ({ scrollRef, targetScroll }: { scrollRef: React.MutableRefObject<number>, targetScroll: React.MutableRefObject<number> }) => {
  useFrame((_state, delta) => {
    scrollRef.current = THREE.MathUtils.damp(scrollRef.current, targetScroll.current, 3, delta);
  });
  return null;
};

const ProjectDeck: React.FC<ProjectDeckProps> = ({ onCardClick }) => {
  const scrollRef = useRef(0);
  const targetScroll = useRef(3.5);
  const [ready, setReady] = useState(false);

  // Camera/hover drag state — delayed 150ms like before
  const isDragging = useRef(false);
  const isPointerDown = useRef(false);
  const dragTimer = useRef<number | null>(null);
  const lastY = useRef(0);
  const startY = useRef(0);

  // Separate: cumulative movement tracker for click suppression
  // This is the key addition — it accumulates total px moved, never resets mid-drag
  const totalMovement = useRef(0);

  // CLICK_SUPPRESS_THRESHOLD: how many total pixels of movement = "this was a drag, not a click"
  // 6px is tight enough to allow intentional clicks, loose enough to catch slow drags
  const CLICK_SUPPRESS_THRESHOLD = 6;

  const handleWheel = (e: React.WheelEvent) => {
    targetScroll.current += e.deltaY * SCROLL_SPEED;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    lastY.current = e.clientY;
    startY.current = e.clientY;
    totalMovement.current = 0; // reset accumulator for new gesture

    dragTimer.current = setTimeout(() => {
      if (isPointerDown.current) {
        isDragging.current = true;
      }
    }, 150);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;

    const deltaY = e.clientY - lastY.current;
    totalMovement.current += Math.abs(deltaY); // accumulate — no negatives cancel positives

    // Fast movement: immediately enter drag state (existing behaviour)
    if (!isDragging.current && Math.abs(e.clientY - startY.current) > 10) {
      if (dragTimer.current) clearTimeout(dragTimer.current);
      isDragging.current = true;
    }

    // Slow movement: enter drag state once threshold is crossed
    if (!isDragging.current && totalMovement.current > CLICK_SUPPRESS_THRESHOLD) {
      if (dragTimer.current) clearTimeout(dragTimer.current);
      isDragging.current = true;
    }

    if (isDragging.current) {
      targetScroll.current += deltaY * DRAG_SPEED;
      lastY.current = e.clientY;
    }
  };

  const handlePointerUp = () => {
    if (dragTimer.current) clearTimeout(dragTimer.current);
    isPointerDown.current = false;
    isDragging.current = false;
    // Note: totalMovement is NOT reset here — it's read by cards during the click
    // event which fires synchronously after pointerup. Reset happens on next pointerdown.
  };

  // Wrap onCardClick to gate on totalMovement
  // Cards call this instead of onCardClick directly
  const handleCardClick = (tab: string) => {
    if (totalMovement.current > CLICK_SUPPRESS_THRESHOLD) return;
    onCardClick?.(tab);
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full touch-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ cursor: isPointerDown.current ? 'grabbing' : 'grab' }}
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
            <Card
              key={i}
              index={i}
              scrollRef={scrollRef}
              isDragging={isDragging}
              onCardClick={handleCardClick}
              {...proj}
            />
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