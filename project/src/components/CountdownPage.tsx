import React, { useState, useEffect } from 'react';
import { Heart, Cake, Sparkles, Calendar } from 'lucide-react';

interface CountdownDate {
  title: string;
  date: Date;
  description: string;
  icon: React.ElementType;
}

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>({});

  const specialDates: CountdownDate[] = [
    {
      title: "Rupal's Birthday",
      date: new Date(2024, 3, 7), // April 7th
      description: "Celebrating the day my love was born 🎂",
      icon: Cake
    },
    {
      title: "My Birthday",
      date: new Date(2024, 3, 14), // April 14th
      description: "Another year of loving you ✨",
      icon: Cake
    },
    {
      title: "22 Months Together",
      date: new Date(2024, 3, 15), // April 15th
      description: "22 magical months of us 💑",
      icon: Heart
    },
    {
      title: "7 Months Comeback",
      date: new Date(2024, 3, 23), // April 23rd
      description: "Celebrating our beautiful reunion 🌟",
      icon: Calendar
    }
  ];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft: { [key: string]: any } = {};

      specialDates.forEach((specialDate) => {
        const difference = specialDate.date.getTime() - new Date().getTime();
        
        if (difference > 0) {
          newTimeLeft[specialDate.title] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
      });

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Add sparkle animation
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute animate-ping text-2xl';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.innerHTML = '✨';
      document.getElementById('countdown-container')?.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    };

    const interval = setInterval(createSparkle, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 relative overflow-hidden" id="countdown-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-2">
          <Sparkles className="text-purple-500" />
          Our Special Dates
          <Sparkles className="text-purple-500" />
        </h1>
        <p className="text-gray-600 italic">Counting down to our magical moments...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {specialDates.map((date, index) => {
          const countdown = timeLeft[date.title];
          const Icon = date.icon;

          return (
            <div
              key={index}
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -top-3 -right-3">
                <Icon className="text-purple-500 animate-pulse" size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-purple-800 mb-2">{date.title}</h2>
              <p className="text-gray-600 italic mb-4">{date.description}</p>
              
              {countdown ? (
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <div className="text-2xl font-bold text-purple-800">{countdown.days}</div>
                    <div className="text-sm text-purple-600">Days</div>
                  </div>
                  <div className="bg-pink-100 rounded-lg p-2">
                    <div className="text-2xl font-bold text-pink-800">{countdown.hours}</div>
                    <div className="text-sm text-pink-600">Hours</div>
                  </div>
                  <div className="bg-purple-100 rounded-lg p-2">
                    <div className="text-2xl font-bold text-purple-800">{countdown.minutes}</div>
                    <div className="text-sm text-purple-600">Minutes</div>
                  </div>
                  <div className="bg-pink-100 rounded-lg p-2">
                    <div className="text-2xl font-bold text-pink-800">{countdown.seconds}</div>
                    <div className="text-sm text-pink-600">Seconds</div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-purple-600">The day has arrived! 🎉</p>
              )}

              <div className="absolute -bottom-2 -left-2">
                <Heart className="text-pink-400 animate-bounce" size={24} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountdownPage;