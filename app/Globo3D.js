'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EarthSphere from '../components/EarthSphere';
import Link from 'next/link';

export default function Globo3D() {
  return (
    <div style={{ height: '100vh', width: '100%', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <EarthSphere />
        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Botão de voltar ao início */}
      <Link href="/">
        <button
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '10px 20px',
            background: '#00bfff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          ← Voltar ao Início
        </button>
      </Link>
    </div>
  );
}
