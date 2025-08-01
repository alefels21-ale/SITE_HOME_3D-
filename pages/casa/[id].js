// pages/casa/[id].js
import { useRouter } from 'next/router';
import { useState } from 'react';
import WeatherPanel from '@/components/WeatherPanel';

const CasaDigital = () => {
  const router = useRouter();
  const { id } = router.query;

  const [posts, setPosts] = useState([
    {
      id: 1,
      texto: 'Primeiro post da casa!',
      imagem: '/exemplo.jpg',
      curtidas: 3,
      comentarios: ['Muito legal!', 'Top demais']
    }
  ]);

  const [novoComentario, setNovoComentario] = useState('');

  const adicionarComentario = (postId) => {
    if (!novoComentario.trim()) return;
    const novosPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comentarios: [...post.comentarios, novoComentario]
        };
      }
      return post;
    });
    setPosts(novosPosts);
    setNovoComentario('');
  };

  const adicionarCurtida = (postId) => {
    const novosPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          curtidas: post.curtidas + 1
        };
      }
      return post;
    });
    setPosts(novosPosts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4">
      <button
        onClick={() => router.push('/')}
        className="bg-white text-black px-4 py-2 rounded mb-4"
      >
        Voltar para o início
      </button>

      <h1 className="text-2xl font-bold mb-2">Casa Digital #{id}</h1>

      {/* Painel de Clima (Latitude e Longitude simuladas) */}
      <WeatherPanel latitude={-22.9711} longitude={-43.1822} />

      {/* Stories (simulação simples) */}
      <div className="flex space-x-3 mt-6 mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-pink-500 flex items-center justify-center animate-pulse bg-cover bg-center"
          style={{ backgroundImage: 'url(/perfil.jpg)' }}>
        </div>
      </div>

      {/* Mural de Posts */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white/10 p-4 rounded-xl shadow">
            <img src={post.imagem} alt="Post" className="w-full rounded mb-2" />
            <p className="mb-2">{post.texto}</p>
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={() => adicionarCurtida(post.id)}
                className="text-yellow-400"
              >
                👍 {post.curtidas}
              </button>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Comentários:</h4>
              <ul className="mb-2">
                {post.comentarios.map((comentario, index) => (
                  <li key={index} className="text-sm">– {comentario}</li>
                ))}
              </ul>
              <input
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                placeholder="Escreva um comentário..."
                className="px-2 py-1 rounded text-black w-full mb-2"
              />
              <button
                onClick={() => adicionarComentario(post.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Comentar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasaDigital;
