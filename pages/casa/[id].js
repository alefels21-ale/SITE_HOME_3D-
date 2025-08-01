import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const emojis = ['❤️', '😂', '😮', '😢'];

export default function Casa() {
  const router = useRouter();
  const { id } = router.query;
  const [stories, setStories] = useState([]);
  const [storyPreview, setStoryPreview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [fullscreenStory, setFullscreenStory] = useState(null);

  const addReaction = (postIndex, emoji) => {
    const newPosts = [...posts];
    newPosts[postIndex].reactions = newPosts[postIndex].reactions || {};
    newPosts[postIndex].reactions[emoji] = (newPosts[postIndex].reactions[emoji] || 0) + 1;
    setPosts(newPosts);
  };

  const addComment = (postIndex, comment) => {
    const newPosts = [...posts];
    newPosts[postIndex].comments = newPosts[postIndex].comments || [];
    newPosts[postIndex].comments.push(comment);
    setPosts(newPosts);
  };

  const handleStoryUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const expiration = Date.now() + 24 * 60 * 60 * 1000;
    setStories([...stories, { url, expiration }]);
  };

  const handlePost = () => {
    if (!message && !image) return;
    const newPost = {
      message,
      image,
      date: new Date().toLocaleString(),
      comments: [],
      reactions: {}
    };
    setPosts([newPost, ...posts]);
    setMessage('');
    setImage(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setStories((prev) => prev.filter((s) => s.expiration > now));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <a href="/" style={{ display: 'inline-block', marginBottom: 20 }}>← Voltar ao início</a>
      <h2>Bem-vindo à sua casa digital #{id}</h2>

      {/* STORIES */}
      <h3>Stories (24h)</h3>
      <input type="file" accept="image/*" onChange={handleStoryUpload} />
      <div style={{ display: 'flex', gap: 15, marginTop: 10 }}>
        {stories.map((story, idx) => (
          <img
            key={idx}
            src={story.url}
            onClick={() => setFullscreenStory(story.url)}
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              border: '2px solid #ccc',
              objectFit: 'cover',
              cursor: 'pointer',
              animation: 'float 3s ease-in-out infinite',
            }}
          />
        ))}
      </div>

      {/* FULLSCREEN STORY */}
      {fullscreenStory && (
        <div style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <button onClick={() => setFullscreenStory(null)} style={{ marginBottom: 20, color: '#fff' }}>Fechar ✖</button>
          <img src={fullscreenStory} style={{ maxWidth: '90%', maxHeight: '80%', borderRadius: 10 }} />
          <div style={{ marginTop: 10 }}>
            {emojis.map((e, i) => (
              <button key={i} onClick={() => alert(`Você reagiu com ${e}`)} style={{ fontSize: 24, margin: 5 }}>{e}</button>
            ))}
          </div>
        </div>
      )}

      {/* POSTAGEM */}
      <h3>Deixe uma mensagem</h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escreva algo..."
        style={{ width: '100%', height: 60 }}
      />
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files[0];
        if (file) setImage(URL.createObjectURL(file));
      }} />
      <button onClick={handlePost}>Postar</button>

      {/* MURAL */}
      <h3>Mural</h3>
      {posts.map((post, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginTop: 10, borderRadius: 8 }}>
          <p>{post.message}</p>
          {post.image && <img src={post.image} alt="img" style={{ maxWidth: '100%', marginTop: 10 }} />}
          <p style={{ fontSize: 12, color: '#555' }}>{post.date}</p>

          <div>
            {emojis.map((e, i) => (
              <button key={i} onClick={() => addReaction(idx, e)} style={{ fontSize: 18, marginRight: 5 }}>
                {e} ({post.reactions?.[e] || 0})
              </button>
            ))}
          </div>

          <div style={{ marginTop: 10 }}>
            <strong>Comentários:</strong>
            <ul>
              {post.comments?.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <input
              placeholder="Escreva um comentário..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addComment(idx, e.target.value);
                  e.target.value = '';
                }
              }}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
