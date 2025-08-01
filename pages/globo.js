import dynamic from 'next/dynamic';
const Globo3D = dynamic(() => import('../app/Globo3D'), { ssr: false });

export default function GloboPage() {
  return <Globo3D />;
}
