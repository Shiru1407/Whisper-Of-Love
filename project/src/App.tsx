import React, { useState, useEffect } from 'react';
import { Heart, Lock, Sparkles, Music, Calendar, Camera, MessageCircleHeart, BrainCircuit } from 'lucide-react';
import PasswordPage from './components/PasswordPage';
import HomePage from './components/HomePage';
import CountdownPage from './components/CountdownPage';
import GalleryPage from './components/GalleryPage';
import VoiceNotesPage from './components/VoiceNotesPage';
import QuizPage from './components/QuizPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [error, setError] = useState('');
  const correctPassword = 'Shiru1407';

  // 🌟 Restore last visited page on refresh
  useEffect(() => {
    const savedPage = localStorage.getItem('lastPage');
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  // 🌟 Save current page whenever it changes
  useEffect(() => {
    localStorage.setItem('lastPage', currentPage);
  }, [currentPage]);

  const handlePasswordSubmit = (password: string) => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError("Oops! That’s not the magical key. Try again, my love 💔");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'countdown':
        return <CountdownPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'voice':
        return <VoiceNotesPage />;
      case 'quiz':
        return <QuizPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50">
      {!isAuthenticated ? (
        <PasswordPage onPasswordSubmit={handlePasswordSubmit} error={error} />
      ) : (
        renderPage()
      )}
    </div>
  );
}

export default App;
