import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Sphere } from '@react-three/drei';

export default function EarthSphere() {
  const texture = useLoader(TextureLoader, '/textures/earth_daymap.jpg');

  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
