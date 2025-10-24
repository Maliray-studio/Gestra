
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import TranslatePage from './pages/TranslatePage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import { ActiveTab, Lesson } from './types';
import { LESSONS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab('learn');
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveLesson(null);
  }, []);

  const renderContent = () => {
    if (activeTab === 'learn' && activeLesson) {
      return <LearnPage selectedLesson={activeLesson} onBack={handleBackToList} />;
    }

    switch (activeTab) {
      case 'learn':
        return <LearnPage onSelectLesson={handleSelectLesson} />;
      case 'translate':
        return <TranslatePage />;
      case 'profile':
        return <ProfilePage />;
      case 'home':
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-light min-h-screen flex flex-col font-sans text-secondary">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto p-4 md:p-6 w-full">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
