import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BrainCircuit, ArrowRight, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's our special date?",
    options: ["15th April", "16th April", "17th April", "18th April"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "When did we have our beautiful comeback?",
    options: ["21st April", "22nd April", "23rd April", "24th April"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What's Rupal's birthday?",
    options: ["5th April", "6th April", "7th April", "8th April"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What's my birthday?",
    options: ["12th April", "13th April", "14th April", "15th April"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "How many months have we been together?",
    options: ["20 months", "21 months", "22 months", "23 months"],
    correctAnswer: 2
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! Our love is truly magical! 💖";
    if (percentage >= 80) return "Amazing! You know our love story so well! 💝";
    if (percentage >= 60) return "Good job! Our love grows stronger each day! 💕";
    return "Every day is a chance to learn more about our love! 💓";
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-8 flex items-center justify-center"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl w-full text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="text-pink-500 mx-auto mb-4" size={48} />
          </motion.div>
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-purple-600 mb-4">
            You scored {score} out of {questions.length}!
          </p>
          <p className="text-lg text-gray-700 italic mb-8">{getResultMessage()}</p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            Take Quiz Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-2">
          <BrainCircuit className="text-purple-500" />
          How Well Do You Know Us?
          <Heart className="text-pink-500" />
        </h1>
        <p className="text-gray-600 italic">Test your knowledge of our love story...</p>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-purple-600 font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-purple-600 font-semibold">
              Score: {score}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-purple-800 mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  selectedAnswer === null
                    ? 'bg-purple-50 hover:bg-purple-100 text-purple-800'
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-purple-50 text-purple-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ArrowRight size={16} className="opacity-50" />
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;