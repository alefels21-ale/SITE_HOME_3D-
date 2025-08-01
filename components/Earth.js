import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function EarthSphere() {
  const earthRef = useRef();

  useFrame(() => {
    earthRef.current.rotation.y += 0.0015;
  });

  const texture = new THREE.TextureLoader().load('/textures/earth_daymap.jpg');

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Earth() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <EarthSphere />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
