'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Globo = () => {
  const earthRef = useRef();

  return (
    <div className="w-full h-screen">
      <Canvas style={{ background: 'black' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Stars radius={300} depth={60} count={20000} factor={7} fade />

        <mesh ref={earthRef} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            map={new TextureLoader().load('/textures/earth_daymap.jpg')}
          />
        </mesh>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default Globo;
