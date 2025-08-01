'use client'
import React from 'react';
import { Canvas } from '@react-three/fiber';
import EarthSphere from '../components/EarthSphere';

export default function Globo3D() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <EarthSphere />
      </Canvas>
    </div>
  );
}