export type ChapterId = 'ch3' | 'ch4' | 'ch5';

export interface Lesson {
  id: string;
  chapterId: ChapterId;
  chapterNumber: number;
  chapterTitle: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  difficulty: 'พื้นฐาน' | 'ปานกลาง' | 'เข้มข้น';
  slideRef: string;
  summary: string;
  sections: LessonSection[];
  quickQuiz: QuizQuestion[];
}

export interface LessonSection {
  title: string;
  content: string; // Markdown or formatted text
  formulas?: { label: string; formula: string; note?: string }[];
  keyPoints?: string[];
  examTip?: string;
  interactiveType?: 'gates' | 'kmap' | 'flipflop' | 'fsm';
}

export interface QuizQuestion {
  id: string;
  chapterId: ChapterId;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  formulaRef?: string;
  difficulty: 'ง่าย' | 'ปานกลาง' | 'ยาก' | 'เข้มข้น';
  topic: string;
}

export interface UserProgress {
  currentLessonId: string;
  completedLessons: string[];
  notes: Record<string, string>; // lessonId -> note content
  quizResults: {
    examHistory: ExamAttempt[];
    quickQuizAnswered: Record<string, number>; // questionId -> chosen answer
  };
  bookmarkedQuestions: string[];
  lastUpdated: string;
}

export interface ExamAttempt {
  id: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  timeSpentSeconds: number;
  answers: Record<string, number>; // questionId -> selectedOption
  chapterScores: Record<ChapterId, { correct: number; total: number }>;
}

export type ActiveTab = 'dashboard' | 'classroom' | 'simulators' | 'cheatsheet' | 'exam';
export type SimulatorType = 'gates' | 'kmap' | 'flipflop' | 'fsm';
