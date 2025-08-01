'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import houses from './houses'

function Earth() {
  const earthRef = useRef()
  const texture = new THREE.TextureLoader().load('/textures/earth_daymap.jpg')

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function HousePoints() {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015
    }
  })

  return (
    <group ref={groupRef}>
      {houses.map((house) => {
        const lat = (house.latitude * Math.PI) / 180
        const lon = (house.longitude * Math.PI) / 180
        const radius = 2.05

        const x = radius * Math.cos(lat) * Math.sin(lon)
        const y = radius * Math.sin(lat)
        const z = radius * Math.cos(lat) * Math.cos(lon)

        return (
          <mesh
            key={house.id}
            position={[x, y, z]}
            onClick={() => window.location.href = `/casa/${house.id}`}
          >
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="red" emissive="red" emissiveIntensity={1} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Globo3D() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 3] }}
        style={{ width: '100vw', height: '100vh', background: 'black' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <Stars />
        <Earth />
        <HousePoints />
        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* ✅ Botão de voltar funcional */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => window.location.href = '/'}
          className="bg-white text-black px-4 py-2 rounded-xl shadow-lg hover:bg-gray-300 transition font-semibold"
        >
          ← Voltar
        </button>
      </div>
    </div>
  )
}
