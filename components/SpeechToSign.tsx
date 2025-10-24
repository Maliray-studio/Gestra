
import React, { useState, useRef, useEffect } from 'react';
import { connectLiveSession } from '../services/geminiService';
import { ALPHABET_SIGNS, WORD_SIGNS } from '../constants';
import { IconMicrophone } from './Icons';

const SpeechToSign: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Click the microphone to start speaking.');
  
  const sessionPromiseRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startListening = async () => {
    if (isListening) return;
    setIsListening(true);
    setStatus('Listening...');
    setTranscript('');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        const context = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        audioContextRef.current = context;
        
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(4096, 1, 1);
        
        processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
            }
            const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(int16.buffer) as any));
            
            if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then((session: any) => {
                    session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
                });
            }
        };

        source.connect(processor);
        processor.connect(context.destination);

        sessionPromiseRef.current = connectLiveSession({
            onmessage: async (message) => {
                if (message.serverContent?.inputTranscription) {
                    const text = message.serverContent.inputTranscription.text;
                    setTranscript(prev => prev + text);
                }
            },
            onerror: (e) => {
                console.error("Session error:", e);
                setStatus('An error occurred. Please try again.');
                stopListening();
            },
        });
    } catch (error) {
        console.error("Error starting microphone:", error);
        setStatus('Could not access microphone. Please check permissions.');
        setIsListening(false);
    }
  };

  const stopListening = () => {
    if (!isListening) return;
    
    streamRef.current?.getTracks().forEach(track => track.stop());
    audioContextRef.current?.close();
    sessionPromiseRef.current?.then((session: any) => session.close());

    setIsListening(false);
    setStatus('Processing complete. Click to start again.');
    sessionPromiseRef.current = null;
  };

  const renderSignTranslation = () => {
    if (!transcript) return null;
    const words = transcript.toLowerCase().split(/\s+/).filter(Boolean);

    return (
        <div className="flex flex-wrap gap-4 items-center">
            {words.map((word, i) => {
                const cleanWord = word.replace(/[.,?]/g, '');
                if (WORD_SIGNS[cleanWord]) {
                    const lesson = WORD_SIGNS[cleanWord];
                    return (
                        <div key={`${word}-${i}`} className="text-center p-2 border rounded-lg">
                            <img src={lesson.imageUrl} alt={lesson.title} className="h-24 w-24 object-contain mx-auto" />
                            <p className="font-semibold capitalize mt-1">{lesson.title}</p>
                        </div>
                    );
                } else {
                    // Fingerspell
                    return (
                        <div key={`${word}-${i}`} className="flex flex-wrap gap-1 p-2 border border-dashed rounded-lg">
                            {cleanWord.split('').map((char, j) => (
                                ALPHABET_SIGNS[char] && (
                                <div key={`${char}-${j}`} className="text-center">
                                    <img src={ALPHABET_SIGNS[char]} alt={char} className="h-16 w-16 object-contain"/>
                                    <p className="text-xs uppercase font-mono">{char}</p>
                                </div>
                                )
                            ))}
                        </div>
                    )
                }
            })}
        </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-slate-600">{status}</p>
      <button
        onClick={isListening ? stopListening : startListening}
        className={`relative h-24 w-24 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isListening ? 'bg-red-500 text-white' : 'bg-primary text-white'
        }`}
      >
        <IconMicrophone className="h-10 w-10" />
        {isListening && <span className="absolute h-full w-full rounded-full bg-red-500 animate-ping opacity-75"></span>}
      </button>

      <div className="w-full bg-slate-100 p-4 rounded-lg min-h-[80px]">
        <p className="font-medium text-slate-800">Transcript:</p>
        <p className="text-slate-600">{transcript || '...'}</p>
      </div>

      <div className="w-full bg-slate-100 p-4 rounded-lg min-h-[150px]">
        <p className="font-medium text-slate-800 mb-2">Sign Translation:</p>
        {renderSignTranslation()}
      </div>
    </div>
  );
};

export default SpeechToSign;
