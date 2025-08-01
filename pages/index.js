// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: 'url("/backgrounds/space.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        textShadow: '0 0 15px rgba(255,255,255,0.8)',
        marginBottom: '1rem'
      }}>
        🚀 Social Hommmmmme 3D
      </h1>
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        marginBottom: '2rem',
        textShadow: '0 0 10px rgba(0,0,0,0.7)',
        lineHeight: '1.6'
      }}>
        Conecte-se ao seu lar virtual no universo digital. Descubra casas, bairros e histórias espalhadas pelo globo. Seu novo mundo começa aqui.
      </p>
      <Link href="/globo">
        <button style={{
          backgroundColor: '#00bfff',
          padding: '15px 30px',
          fontSize: '1rem',
          borderRadius: '30px',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 0 20px #00bfff',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🌍 Entrar no Globo 3D
        </button>
      </Link>
    </div>
  );
}
