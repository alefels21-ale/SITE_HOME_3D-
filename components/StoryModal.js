'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Casa({ params }) {
  const houseId = params.id;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [storyFile, setStoryFile] = useState(null);
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(`casa_${houseId}_messages`);
    if (stored) setMessages(JSON.parse(stored));

    const storedStories = localStorage.getItem(`casa_${houseId}_stories`);
    if (storedStories) setStories(JSON.parse(storedStories));
  }, [houseId]);

  const handlePost = () => {
    if (!message.trim()) return;
    const newPost = {
      text: message,
      image,
      likes: 0,
      comments: [],
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newPost, ...messages];
    setMessages(updated);
    localStorage.setItem(`casa_${houseId}_messages`, JSON.stringify(updated));
    setMessage('');
    setImage(null);
  };

  const handleLike = (index) => {
    const updated = [...messages];
    updated[index].likes++;
    setMessages(updated);
    localStorage.setItem(`casa_${houseId}_messages`, JSON.stringify(updated));
  };

  const handleComment = (index, comment) => {
    const updated = [...messages];
    updated[index].comments.push(comment);
    setMessages(updated);
    localStorage.setItem(`casa_${houseId}_messages`, JSON.stringify(updated));
  };

  const handleStoryUpload = () => {
    if (!storyFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newStory = {
        image: e.target.result,
        timestamp: Date.now(),
      };
      const updated = [newStory, ...stories];
      setStories(updated);
      localStorage.setItem(`casa_${houseId}_stories`, JSON.stringify(updated));
    };
    reader.readAsDataURL(storyFile);
  };

  const handleStoryClick = (story) => {
    setActiveStory(story);
  };

  const handleStoryReaction = (emoji) => {
    alert(`Você reagiu com ${emoji}`);
  };

  const validStories = stories.filter(
    (story) => Date.now() - story.timestamp < 86400000
  );

  return (
    <div className="p-4">
      <Link href="/">
        <span className="text-blue-600 underline">← Voltar ao início</span>
      </Link>
      <h1 className="text-2xl font-bold mt-4">Bem-vindo à sua casa digital #{houseId}</h1>

      {/* Stories */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Stories (24h)</h2>
        <input
          type="file"
          onChange={(e) => setStoryFile(e.target.files[0])}
          className="mt-2 mb-2"
        />
        <button onClick={handleStoryUpload} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
          Enviar Story
        </button>
        <div className="flex mt-4 space-x-3">
          {validStories.map((story, i) => (
            <img
              key={i}
              src={story.image}
              className="w-20 h-20 rounded-full border-2 border-gray-400 cursor-pointer hover:scale-105 transition"
              onClick={() => handleStoryClick(story)}
              alt={`Story ${i}`}
            />
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <img src={activeStory.image} className="max-h-[70%] mb-4 rounded-lg" />
          <div className="flex space-x-4">
            {['❤️', '😂', '😮', '🔥'].map((emoji) => (
              <button
                key={emoji}
                className="text-3xl"
                onClick={() => handleStoryReaction(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <button onClick={() => setActiveStory(null)} className="mt-6 text-white underline">
            Fechar
          </button>
        </div>
      )}

      {/* Mural */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Deixe uma mensagem</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escreva algo..."
          className="w-full p-2 border rounded mt-2"
        />
        <input
          type="file"
          className="mt-2"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
        <button onClick={handlePost} className="ml-2 bg-green-600 text-white px-2 py-1 rounded">
          Postar
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Mural</h2>
        {messages.map((msg, index) => (
          <div key={index} className="border p-3 mb-4 rounded bg-gray-100">
            <p>{msg.text}</p>
            {msg.image && <img src={msg.image} className="mt-2 max-w-xs rounded" />}
            <div className="text-sm text-gray-500 mt-1">{msg.timestamp}</div>
            <button onClick={() => handleLike(index)} className="text-red-600 mt-1">
              ❤️ Curtir ({msg.likes})
            </button>
            <div className="mt-2">
              <strong>Comentários:</strong>
              <ul className="ml-4 list-disc">
                {msg.comments.map((c, j) => (
                  <li key={j}>{c}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Comentar..."
                className="mt-1 border p-1 w-full rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(index, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
