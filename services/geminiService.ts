
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { decode, decodeAudioData, encode } from '../utils/audio';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A check to ensure the API key is available.
  // In the target environment, this will be set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Describes the sign language gesture in an image using Gemini.
 * @param base64Image The base64 encoded image string.
 * @returns The textual description of the sign.
 */
export const describeSignImage = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: 'You are an American Sign Language (ASL) expert. Describe the sign in this image. What letter or word does it represent? Be concise.'
          }
        ],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error describing sign image:", error);
    return "Sorry, I couldn't analyze that sign. Please try again.";
  }
};

/**
 * Converts text to speech using Gemini TTS and plays it.
 * @param text The text to be spoken.
 */
export const textToSpeech = async (text: string): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputAudioContext.destination);
      source.start();
    } else {
      throw new Error("No audio data received from API.");
    }
  } catch (error) {
    console.error("Error in text-to-speech:", error);
    alert("Sorry, text-to-speech is currently unavailable.");
  }
};

/**
 * Connects to the Gemini Live API for real-time audio processing.
 * @param callbacks Callbacks for handling session events (onopen, onmessage, etc.).
 * @returns A promise that resolves with the live session object.
 */
export const connectLiveSession = async (callbacks: {
    onopen?: () => void;
    onmessage?: (message: LiveServerMessage) => Promise<void>;
    onerror?: (e: Event) => void;
    onclose?: (e: CloseEvent) => void;
}) => {
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: {},
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
        },
    });
};

// Re-export audio utilities for use in components if needed
export { decode, encode, decodeAudioData };
