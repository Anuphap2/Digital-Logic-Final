import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveTab, ExamAttempt, UserProgress } from '../types';
import { CURRICULUM_DATA } from '../data/curriculumData';

interface AppContextType {
  currentTab: ActiveTab;
  setCurrentTab: (tab: ActiveTab) => void;
  selectedLessonId: string;
  setSelectedLessonId: (id: string) => void;
  completedLessons: string[];
  toggleLessonCompleted: (id: string) => void;
  notes: Record<string, string>;
  updateNote: (lessonId: string, content: string) => void;
  theaterMode: boolean;
  setTheaterMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  examAttempts: ExamAttempt[];
  saveExamAttempt: (attempt: ExamAttempt) => void;
  bookmarkedQuestions: string[];
  toggleBookmark: (id: string) => void;
  lastSavedTime: string | null;
  resumeLearning: () => void;
  activeSimulatorTab: 'gates' | 'kmap' | 'flipflop' | 'fsm';
  setActiveSimulatorTab: (tab: 'gates' | 'kmap' | 'flipflop' | 'fsm') => void;
}

const STORAGE_KEY = 'LOGICMASTER_USER_DATA_V1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('ch3-1');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      if (localStorage.getItem('LOGICMASTER_THEME') === 'dark') {
        localStorage.removeItem('LOGICMASTER_THEME');
      }
      const savedTheme = localStorage.getItem('LOGICMASTER_THEME_V2');
      if (savedTheme === 'dark') return true;
      if (savedTheme === 'light') return false;
    } catch (e) {
      // ignore
    }
    return false; // Default: Light / White theme
  });
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<'gates' | 'kmap' | 'flipflop' | 'fsm'>('gates');

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: UserProgress = JSON.parse(saved);
        if (parsed.currentLessonId) setSelectedLessonId(parsed.currentLessonId);
        if (parsed.completedLessons) setCompletedLessons(parsed.completedLessons);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.quizResults?.examHistory) setExamAttempts(parsed.quizResults.examHistory);
        if (parsed.bookmarkedQuestions) setBookmarkedQuestions(parsed.bookmarkedQuestions);
      }
    } catch (e) {
      console.warn('Could not read user progress from localStorage', e);
    }
  }, []);

  // Save to LocalStorage
  const persist = (data: Partial<UserProgress>) => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const parsed: UserProgress = existing ? JSON.parse(existing) : {
        currentLessonId: selectedLessonId,
        completedLessons,
        notes,
        quizResults: { examHistory: examAttempts, quickQuizAnswered: {} },
        bookmarkedQuestions,
        lastUpdated: new Date().toISOString()
      };

      const updated: UserProgress = {
        ...parsed,
        ...data,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLastSavedTime(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessons(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      persist({ completedLessons: next });
      return next;
    });
  };

  const updateNote = (lessonId: string, content: string) => {
    setNotes(prev => {
      const next = { ...prev, [lessonId]: content };
      persist({ notes: next });
      return next;
    });
  };

  const saveExamAttempt = (attempt: ExamAttempt) => {
    setExamAttempts(prev => {
      const next = [attempt, ...prev];
      persist({
        quizResults: {
          examHistory: next,
          quickQuizAnswered: {}
        }
      });
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedQuestions(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      persist({ bookmarkedQuestions: next });
      return next;
    });
  };

  const handleSetSelectedLessonId = (id: string) => {
    setSelectedLessonId(id);
    persist({ currentLessonId: id });
  };

  const resumeLearning = () => {
    // If current lesson is already completed, find the first uncompleted lesson
    const firstUnfinished = CURRICULUM_DATA.find(l => !completedLessons.includes(l.id));
    if (firstUnfinished && completedLessons.includes(selectedLessonId)) {
      setSelectedLessonId(firstUnfinished.id);
    }
    setCurrentTab('classroom');
  };

  // Sync dark mode with document and localStorage
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('LOGICMASTER_THEME_V2', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('LOGICMASTER_THEME_V2', 'light');
      }
    } catch (e) {
      // ignore
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedLessonId,
        setSelectedLessonId: handleSetSelectedLessonId,
        completedLessons,
        toggleLessonCompleted,
        notes,
        updateNote,
        theaterMode,
        setTheaterMode,
        darkMode,
        setDarkMode,
        examAttempts,
        saveExamAttempt,
        bookmarkedQuestions,
        toggleBookmark,
        lastSavedTime,
        resumeLearning,
        activeSimulatorTab,
        setActiveSimulatorTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
