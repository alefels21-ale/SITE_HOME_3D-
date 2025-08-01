import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function EarthSphere() {
  const earthRef = useRef();
  const texture = useLoader(THREE.TextureLoader, '/textures/earth_daymap.jpg');

  useFrame(() => {
    earthRef.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}