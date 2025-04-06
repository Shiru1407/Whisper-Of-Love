import React, { useEffect } from 'react';
import { Heart, Music, Calendar, Camera, MessageCircleHeart, BrainCircuit } from 'lucide-react';
import SpotifyEmbed from 'react-spotify-embed';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute animate-ping';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.innerHTML = '✨';
      document.getElementById('welcome-container')?.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    };

    const interval = setInterval(createSparkle, 300);
    return () => clearInterval(interval);
  }, []);

  const sections = [
    { title: 'Love Letter', icon: MessageCircleHeart, color: 'bg-pink-100', page: 'letter' },
    { title: 'Photo Gallery', icon: Camera, color: 'bg-purple-100', page: 'gallery' },
    { title: 'Voice Notes', icon: Music, color: 'bg-red-100', page: 'voice' },
    { title: 'Countdowns', icon: Calendar, color: 'bg-blue-100', page: 'countdown' },
    { title: 'Love Quiz', icon: BrainCircuit, color: 'bg-green-100', page: 'quiz' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div id="welcome-container" className="relative text-center mb-16 p-8 bg-white/80 backdrop-blur-sm rounded-2xl">
        <div className="animate-bounce">
          <Heart className="text-pink-500 mx-auto" size={48} />
        </div>
        <h1 className="text-4xl font-bold text-purple-800 mt-4 mb-2">
          I Love You Infinitely, Rupal
        </h1>
        <p className="text-gray-600 italic">Welcome to our digital love story</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`${section.color} p-6 rounded-2xl shadow-lg hover:transform hover:scale-105 transition-transform cursor-pointer`}
            onClick={() => onNavigate(section.page)}
          >
            <section.icon className="text-purple-600 mb-4" size={32} />
            <h2 className="text-xl font-semibold text-purple-800">{section.title}</h2>
            <p className="text-gray-600 mt-2">Click to explore our memories...</p>
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Music className="text-purple-600" size={24} />
          <h2 className="text-xl font-semibold text-purple-800">Our Love Playlist</h2>
        </div>
        <SpotifyEmbed
          src="https://open.spotify.com/playlist/69scJ7LKK9jdMidXpleAeP?si=1m7H8xZSQmSdMfrsnv8LEQ"
          width="100%"
          height="152"
        />
      </div>
    </div>
  );
};

export default HomePage;