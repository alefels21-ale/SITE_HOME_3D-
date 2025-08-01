'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import EarthSphere from '../components/EarthSphere';
import Link from 'next/link';

export default function Globo3D() {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <EarthSphere />
        <OrbitControls enableZoom={true} />
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <Link href="/">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}
          >
            Voltar ao Início
          </button>
        </Link>
      </div>
    </div>
  );
}
