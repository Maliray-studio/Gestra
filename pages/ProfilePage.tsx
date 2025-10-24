import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserProgress } from '../types';
import { LESSONS } from '../constants';
import Card from '../components/Card';
import { IconUser } from '../components/Icons';

const ProfilePage: React.FC = () => {
  const [progress] = useLocalStorage<UserProgress>('user-progress', {
    completedLessons: [],
    badges: [],
    points: 0,
  });

  const totalLessons = LESSONS.length;
  const completedLessons = progress.completedLessons.length;
  const percentageComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-green-100 text-primary rounded-full h-20 w-20 flex items-center justify-center">
          <IconUser className="h-12 w-12" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">My Profile</h2>
          <p className="text-slate-600">Your learning journey at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center">
          <p className="text-4xl font-bold text-primary">{progress.points}</p>
          <p className="text-slate-500">Total Points</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-4xl font-bold text-primary">{completedLessons}</p>
          <p className="text-slate-500">Lessons Completed</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-4xl font-bold text-primary">{progress.badges.length}</p>
          <p className="text-slate-500">Badges Earned</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Overall Progress</h3>
        <div className="w-full bg-slate-200 rounded-full h-4">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentageComplete}%` }}
          ></div>
        </div>
        <p className="text-right text-slate-600 mt-2 font-semibold">{percentageComplete}% Complete</p>
      </Card>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Completed Lessons</h3>
        {completedLessons > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <ul className="divide-y divide-slate-200">
              {progress.completedLessons.map(lessonId => {
                const lesson = LESSONS.find(l => l.id === lessonId);
                return lesson ? (
                  <li key={lessonId} className="py-3 flex justify-between items-center">
                    <span className="font-medium text-slate-700">{lesson.title}</span>
                    <span className="text-xs text-slate-500">{lesson.category}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8 bg-white rounded-lg shadow-md">You haven't completed any lessons yet. Go to the 'Learn' tab to start!</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;