import React, { useState } from 'react';
import { Lesson, UserProgress } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from './Card';
import { textToSpeech } from '../services/geminiService';
import { IconVolume } from './Icons';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
  const [progress, setProgress] = useLocalStorage<UserProgress>('user-progress', {
    completedLessons: [],
    badges: [],
    points: 0,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const isCompleted = progress.completedLessons.includes(lesson.id);

  const quiz = lesson.quiz[0]; // Assuming one question per lesson for simplicity

  const handleAnswerSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === quiz.correctAnswer && !isCompleted) {
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lesson.id],
        points: prev.points + 10,
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 text-primary hover:underline">
        &larr; Back to Lessons
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{lesson.title}</h2>
            <img className="w-full rounded-lg shadow-inner mb-4" src={lesson.imageUrl} alt={`Sign for ${lesson.title}`} />
            <p className="text-slate-600 mb-4">{lesson.content}</p>
            <button
              onClick={() => textToSpeech(lesson.title)}
              className="flex items-center space-x-2 text-sm text-primary hover:underline"
            >
              <IconVolume className="w-4 h-4" />
              <span>Hear Pronunciation</span>
            </button>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Check your understanding</h3>
          <p className="mb-4 text-slate-700">{quiz.question}</p>
          <div className="space-y-3">
            {quiz.options.map(option => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                disabled={showResult}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors duration-200 ${
                  selectedAnswer === option
                    ? 'bg-green-100 border-primary'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                } ${showResult ? 'cursor-not-allowed' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer || showResult}
            className="mt-6 w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-slate-300"
          >
            Submit
          </button>
          {showResult && (
            <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${
              selectedAnswer === quiz.correctAnswer
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {selectedAnswer === quiz.correctAnswer
                ? 'Correct! You earned 10 points.'
                : `Not quite. The correct answer is ${quiz.correctAnswer}.`}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LessonDetail;