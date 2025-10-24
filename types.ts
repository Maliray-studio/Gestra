
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
  imageUrl: string;
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedLessons: string[];
  badges: string[];
  points: number;
}

export type ActiveTab = 'home' | 'learn' | 'translate' | 'profile';
