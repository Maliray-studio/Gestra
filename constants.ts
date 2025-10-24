import { Lesson } from './types';

// Using an image proxy to prevent cross-origin loading issues in browsers.
// This service fetches the images and serves them with permissive CORS headers,
// ensuring the GIFs from lifeprint.com can be displayed.
const IMAGE_PROXY_URL = 'https://images.weserv.nl/?url=';
const BASE_DOMAIN = 'www.lifeprint.com';

// Sourced from a public domain ASL image provider concept.
const ASL_IMAGE_BASE_URL = `${IMAGE_PROXY_URL}${BASE_DOMAIN}/asl101/fingerspelling/abc-gifs/`;

export const ALPHABET_SIGNS: { [key: string]: string } = {
  a: `${ASL_IMAGE_BASE_URL}a.gif`, b: `${ASL_IMAGE_BASE_URL}b.gif`, c: `${ASL_IMAGE_BASE_URL}c.gif`,
  d: `${ASL_IMAGE_BASE_URL}d.gif`, e: `${ASL_IMAGE_BASE_URL}e.gif`, f: `${ASL_IMAGE_BASE_URL}f.gif`,
  g: `${ASL_IMAGE_BASE_URL}g.gif`, h: `${ASL_IMAGE_BASE_URL}h.gif`, i: `${ASL_IMAGE_BASE_URL}i.gif`,
  j: `${ASL_IMAGE_BASE_URL}j.gif`, k: `${ASL_IMAGE_BASE_URL}k.gif`, l: `${ASL_IMAGE_BASE_URL}l.gif`,
  m: `${ASL_IMAGE_BASE_URL}m.gif`, n: `${ASL_IMAGE_BASE_URL}n.gif`, o: `${ASL_IMAGE_BASE_URL}o.gif`,
  p: `${ASL_IMAGE_BASE_URL}p.gif`, q: `${ASL_IMAGE_BASE_URL}q.gif`, r: `${ASL_IMAGE_BASE_URL}r.gif`,
  s: `${ASL_IMAGE_BASE_URL}s.gif`, t: `${ASL_IMAGE_BASE_URL}t.gif`, u: `${ASL_IMAGE_BASE_URL}u.gif`,
  v: `${ASL_IMAGE_BASE_URL}v.gif`, w: `${ASL_IMAGE_BASE_URL}w.gif`, x: `${ASL_IMAGE_BASE_URL}x.gif`,
  y: `${ASL_IMAGE_BASE_URL}y.gif`, z: `${ASL_IMAGE_BASE_URL}z.gif`,
};

export const LESSONS: Lesson[] = [
  // Alphabet
  { id: 'a', title: 'Letter A', category: 'Alphabet', level: 'Beginner', content: 'Make a fist with your thumb on the side.', imageUrl: ALPHABET_SIGNS['a'], quiz: [{ question: 'Which finger is on the side for the letter A?', options: ['Index', 'Thumb', 'Pinky'], correctAnswer: 'Thumb' }] },
  { id: 'b', title: 'Letter B', category: 'Alphabet', level: 'Beginner', content: 'Hold your hand up with your fingers straight and your thumb tucked in front of your palm.', imageUrl: ALPHABET_SIGNS['b'], quiz: [{ question: 'Where is the thumb for the letter B?', options: ['On the side', 'Pointing up', 'Tucked in front'], correctAnswer: 'Tucked in front' }] },
  { id: 'c', title: 'Letter C', category: 'Alphabet', level: 'Beginner', content: 'Form a C-shape with your hand.', imageUrl: ALPHABET_SIGNS['c'], quiz: [{ question: 'The hand shape for "C" resembles the...', options: ['Letter itself', 'A circle', 'A fist'], correctAnswer: 'Letter itself' }] },

  // Numbers
  { id: '1', title: 'Number 1', category: 'Numbers', level: 'Beginner', content: 'Hold up your index finger, palm facing forward.', imageUrl: `${IMAGE_PROXY_URL}${BASE_DOMAIN}/asl101/numbers/gifs/1-one-palm-forward.gif`, quiz: [{ question: 'Which finger represents the number 1?', options: ['Thumb', 'Index', 'Middle'], correctAnswer: 'Index' }] },
  { id: '2', title: 'Number 2', category: 'Numbers', level: 'Beginner', content: 'Hold up your index and middle fingers.', imageUrl: `${IMAGE_PROXY_URL}${BASE_DOMAIN}/asl101/numbers/gifs/2.gif`, quiz: [{ question: 'How many fingers are used for the number 2?', options: ['One', 'Two', 'Three'], correctAnswer: 'Two' }] },

  // Greetings
  { id: 'hello', title: 'Hello', category: 'Greetings', level: 'Beginner', content: 'A simple wave or a salute-like gesture from the forehead.', imageUrl: `${IMAGE_PROXY_URL}${BASE_DOMAIN}/asl101/gifs/h/hello.gif`, quiz: [{ question: 'The sign for "Hello" is similar to a...', options: ['Wave', 'High-five', 'Fist bump'], correctAnswer: 'Wave' }] },
  { id: 'thank-you', title: 'Thank You', category: 'Greetings', level: 'Intermediate', content: 'Move your flat hand from your chin forward towards the person you are thanking.', imageUrl: `${IMAGE_PROXY_URL}${BASE_DOMAIN}/asl101/gifs/t/thank-you.gif`, quiz: [{ question: 'Where does the "Thank You" sign start?', options: ['Forehead', 'Chin', 'Chest'], correctAnswer: 'Chin' }] },
  { id: 'goodbye', title: 'Goodbye', category: 'Greetings', level: 'Beginner', content: 'Wave your hand back and forth, like a traditional goodbye.', imageUrl: `${IMAGE_PROXY_URL}${BASE_DOMAIN}/asl101/gifs/g/good-bye-goodbye.gif`, quiz: [{ question: 'How do you sign "Goodbye"?', options: ['A salute', 'A normal wave', 'A fist pump'], correctAnswer: 'A normal wave' }] },
];

export const WORD_SIGNS: { [key: string]: Lesson } = LESSONS.reduce((acc, lesson) => {
  acc[lesson.title.toLowerCase()] = lesson;
  return acc;
}, {} as { [key: string]: Lesson });