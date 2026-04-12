// src/components/ProjectDeck/CameraRig.tsx
import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

export const CameraRig = ({ isDragging }: { isDragging: React.MutableRefObject<boolean> }) => {
  const vec = useMemo(() => new THREE.Vector3(), []);
  
  useFrame((state, delta) => {
    const targetPos = isDragging.current 
      ? [6.5, 9, 14]   
      : [5.5, 7, 11];  

    vec.set(targetPos[0], targetPos[1], targetPos[2]);
    state.camera.position.lerp(vec, delta * 3);
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
};