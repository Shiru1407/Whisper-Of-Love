import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface PasswordPageProps {
  onPasswordSubmit: (password: string) => void;
}

const PasswordPage: React.FC<PasswordPageProps> = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50">
      <div className="max-w-md w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
            <Heart className="text-pink-500 animate-pulse" size={32} />
            Whispers of Love
            <Heart className="text-pink-500 animate-pulse" size={32} />
          </h1>
          <p className="text-gray-600 italic">
            "In the garden of love, every moment blooms with you..."
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter our special password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
              placeholder="❤️ Our secret key..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Unlock Our Love Story
            <Sparkles size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;