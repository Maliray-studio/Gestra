import React from 'react';
import { ActiveTab } from '../types';
import { IconBook, IconSwitch } from '../components/Icons';
import Card from '../components/Card';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}> = ({ icon, title, description, buttonText, onClick }) => (
    <Card className="flex flex-col text-center p-6 md:p-8">
        <div className="flex-grow">
            <div className="mx-auto bg-green-100 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 mb-6">{description}</p>
        </div>
        <button onClick={onClick} className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
            {buttonText}
        </button>
    </Card>
);

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  return (
    <div className="text-center">
      <header className="py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          Welcome to <span className="text-primary">GESTRA</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Your AI-powered companion for learning, teaching, and translating sign language. Break down communication barriers and connect with the world.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        <FeatureCard
            icon={<IconBook className="h-8 w-8" />}
            title="Interactive Learning"
            description="Master ASL with structured lessons, from basic alphabet to complex phrases. Track your progress and earn badges!"
            buttonText="Start Learning"
            onClick={() => setActiveTab('learn')}
        />
        <FeatureCard
            icon={<IconSwitch className="h-8 w-8" />}
            title="AI Translation"
            description="Translate speech to sign language and gestures to speech in real-time. The perfect tool for seamless communication."
            buttonText="Translate Now"
            onClick={() => setActiveTab('translate')}
        />
      </div>
    </div>
  );
};

export default HomePage;