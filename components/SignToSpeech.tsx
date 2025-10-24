import React, { useState, useCallback } from 'react';
import { describeSignImage, textToSpeech } from '../services/geminiService';
import { fileToBase64 } from '../utils/audio';
import { IconUpload, IconVolume, IconLoader } from './Icons';

const SignToSpeech: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [translation, setTranslation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setTranslation('');
      setError('');
    }
  };

  const handleTranslate = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setTranslation('');
    try {
      const base64Image = await fileToBase64(imageFile);
      const description = await describeSignImage(base64Image);
      setTranslation(description);
    } catch (err) {
      console.error(err);
      setError('Failed to translate the sign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const handleSpeak = useCallback(() => {
      if (translation) {
          textToSpeech(translation);
      }
  }, [translation]);

  return (
    <div className="flex flex-col items-center space-y-6">
        <p className="text-slate-600 text-center">Upload an image of a sign (like the ASL alphabet) to get its meaning.</p>
        <div className="w-full max-w-sm">
            <label htmlFor="sign-upload" className="cursor-pointer">
                <div className="w-full h-56 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-primary transition-colors">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Sign preview" className="h-full w-full object-contain p-2" />
                    ) : (
                        <>
                            <IconUpload className="h-10 w-10 mb-2" />
                            <span>Click to upload image</span>
                        </>
                    )}
                </div>
            </label>
            <input id="sign-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>
        
        <button
            onClick={handleTranslate}
            disabled={!imageFile || isLoading}
            className="w-full max-w-sm bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-slate-300 flex items-center justify-center"
        >
            {isLoading ? <IconLoader className="h-6 w-6" /> : 'Translate Sign'}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        
        {translation && (
            <div className="w-full bg-slate-100 p-4 rounded-lg text-center">
                <p className="font-medium text-slate-800 mb-2">Translation:</p>
                <p className="text-2xl font-bold text-primary mb-4">{translation}</p>
                <button
                    onClick={handleSpeak}
                    className="flex items-center justify-center space-x-2 text-sm text-primary hover:underline mx-auto"
                >
                    <IconVolume className="w-5 h-5" />
                    <span>Speak Translation</span>
                </button>
            </div>
        )}
    </div>
  );
};

export default SignToSpeech;