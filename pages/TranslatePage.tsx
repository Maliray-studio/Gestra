
import React, { useState } from 'react';
import SpeechToSign from '../components/SpeechToSign';
import SignToSpeech from '../components/SignToSpeech';

type TranslateMode = 'speech-to-sign' | 'sign-to-speech';

const TranslatePage: React.FC = () => {
  const [mode, setMode] = useState<TranslateMode>('speech-to-sign');

  const TabButton: React.FC<{
    label: string;
    currentMode: TranslateMode;
    targetMode: TranslateMode;
  }> = ({ label, currentMode, targetMode }) => (
    <button
      onClick={() => setMode(targetMode)}
      className={`px-4 py-2 text-lg font-semibold rounded-t-lg transition-colors duration-200 ${
        currentMode === targetMode
          ? 'bg-white text-primary border-b-2 border-primary'
          : 'bg-transparent text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">AI Translator</h2>
      <div className="mb-6 border-b border-slate-200">
        <TabButton label="Speech to Sign" currentMode={mode} targetMode="speech-to-sign" />
        <TabButton label="Sign to Speech" currentMode={mode} targetMode="sign-to-speech" />
      </div>
      <div className="bg-white p-6 rounded-b-lg rounded-r-lg shadow-md min-h-[400px]">
        {mode === 'speech-to-sign' ? <SpeechToSign /> : <SignToSpeech />}
      </div>
    </div>
  );
};

export default TranslatePage;
