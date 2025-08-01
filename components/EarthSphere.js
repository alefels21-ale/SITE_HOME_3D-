'use client';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function EarthSphere() {
  const earthTexture = useLoader(TextureLoader, '/textures/earth_daymap.jpg');

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
}
