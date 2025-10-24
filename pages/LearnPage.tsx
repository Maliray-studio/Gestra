
import React from 'react';
import { Lesson } from '../types';
import { LESSONS } from '../constants';
import Card from '../components/Card';
import LessonDetail from '../components/LessonDetail';

interface LearnPageProps {
  selectedLesson?: Lesson | null;
  onSelectLesson?: (lesson: Lesson) => void;
  onBack?: () => void;
}

const LessonCard: React.FC<{ lesson: Lesson; onSelect: (lesson: Lesson) => void }> = ({ lesson, onSelect }) => (
  <Card className="cursor-pointer" >
    <div onClick={() => onSelect(lesson)}>
        <img className="h-48 w-full object-cover" src={lesson.imageUrl} alt={`Sign for ${lesson.title}`} />
        <div className="p-4">
            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold text-slate-800">{lesson.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    lesson.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    lesson.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {lesson.level}
                </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{lesson.category}</p>
        </div>
    </div>
  </Card>
);

const LearnPage: React.FC<LearnPageProps> = ({ selectedLesson, onSelectLesson, onBack }) => {
  if (selectedLesson && onBack) {
    return <LessonDetail lesson={selectedLesson} onBack={onBack} />;
  }

  const categories = [...new Set(LESSONS.map(l => l.category))];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Learn Sign Language</h2>
      {categories.map(category => (
        <div key={category} className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-700 mb-4 border-b-2 border-primary pb-2">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {LESSONS.filter(l => l.category === category).map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} onSelect={onSelectLesson!} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearnPage;
