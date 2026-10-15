import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FINAL_EXAM_QUESTIONS } from '../data/quizData';
import { QuizQuestion, ExamAttempt, ChapterId } from '../types';
import { LatexRenderer } from './LatexRenderer';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  Check, 
  Sparkles,
  Filter,
  Layers,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveExamAttempt, examAttempts } = useApp();

  const [examState, setExamState] = useState<'intro' | 'running' | 'result'>('intro');
  const [selectedPreset, setSelectedPreset] = useState<'100' | '50' | '30'>('100');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<'all' | 'ch3' | 'ch4' | 'ch5'>('all');
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number>(120);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(120 * 60);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'flagged'>('all');
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);
  const [activeExamQuestions, setActiveExamQuestions] = useState<QuizQuestion[]>([]);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // Duration defaults when preset changes
  useEffect(() => {
    if (selectedPreset === '100') setSelectedDurationMinutes(120);
    else if (selectedPreset === '50') setSelectedDurationMinutes(60);
    else if (selectedPreset === '30') setSelectedDurationMinutes(40);
  }, [selectedPreset]);

  // Compute filtered questions pool for display in Lobby
  const previewQuestions = useMemo(() => {
    let pool = FINAL_EXAM_QUESTIONS;
    if (selectedChapterFilter !== 'all') {
      pool = pool.filter(q => q.chapterId === selectedChapterFilter);
    }
    const count = parseInt(selectedPreset, 10);
    if (pool.length <= count) return pool;

    // Pick evenly across chapters for balanced presets
    if (selectedChapterFilter === 'all') {
      const ch3 = pool.filter(q => q.chapterId === 'ch3');
      const ch4 = pool.filter(q => q.chapterId === 'ch4');
      const ch5 = pool.filter(q => q.chapterId === 'ch5');
      if (count === 50) {
        return [...ch3.slice(0, 16), ...ch4.slice(0, 16), ...ch5.slice(0, 18)];
      }
      if (count === 30) {
        return [...ch3.slice(0, 10), ...ch4.slice(0, 10), ...ch5.slice(0, 10)];
      }
    }
    return pool.slice(0, count);
  }, [selectedPreset, selectedChapterFilter]);

  // Timer countdown
  useEffect(() => {
    if (examState !== 'running') return;
    if (selectedDurationMinutes === 0) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, selectedDurationMinutes]);

  const handleStartExam = () => {
    setActiveExamQuestions(previewQuestions);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentQIndex(0);
    setTimeRemainingSeconds(selectedDurationMinutes * 60);
    setExpandedSolutions({});
    setExamState('running');
  };

  const handleSelectOption = (qId: string, optIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const toggleFlagQuestion = (qId: string) => {
    setFlaggedQuestions(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const toggleSolutionExpand = (qId: string) => {
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleExpandAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    activeExamQuestions.forEach(q => {
      updated[q.id] = expand;
    });
    setExpandedSolutions(updated);
  };

  const handleSubmitExam = () => {
    let score = 0;
    const chScores: Record<ChapterId, { correct: number; total: number }> = {
      ch3: { correct: 0, total: 0 },
      ch4: { correct: 0, total: 0 },
      ch5: { correct: 0, total: 0 }
    };

    activeExamQuestions.forEach(q => {
      chScores[q.chapterId].total += 1;
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
        chScores[q.chapterId].correct += 1;
      }
    });

    const total = activeExamQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const timeSpent = selectedDurationMinutes > 0 
      ? (selectedDurationMinutes * 60) - timeRemainingSeconds 
      : 0;

    const attempt: ExamAttempt = {
      id: 'attempt_' + Date.now(),
      timestamp: new Date().toISOString(),
      score,
      total,
      percentage,
      timeSpentSeconds: timeSpent,
      answers: userAnswers,
      chapterScores: chScores
    };

    saveExamAttempt(attempt);
    setLastAttempt(attempt);
    setExamState('result');

    if (percentage >= 70) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // VIEW 1: INTRO / LOBBY (100 Questions)
  // ==========================================
  if (examState === 'intro') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20 shadow-xs mb-2">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
            ระบบจำลองการสอบปลายภาค (Final Exam Simulator)
          </h1>
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
            คลังข้อสอบจริง <strong>100 ข้อ ครบชุด</strong> ตรงตามแนวข้อสอบ ดร. ปวีณ เขื่อนแก้ว มหาวิทยาลัยแม่โจ้ ครอบคลุมใบงานที่ 7, 8, 9, 10, 11 และสไลด์บทที่ 3, 4, 5
          </p>
        </div>

        {/* Exam Conditions & Options Card */}
        <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="flex items-center justify-between border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
            <h3 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc] flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
              <span>ตั้งค่ารูปแบบการสอบ</span>
            </h3>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#10b981]">
              คลังข้อสอบ {FINAL_EXAM_QUESTIONS.length} ข้อพร้อมใช้งาน
            </span>
          </div>

          {/* Exam Mode / Question Count Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0f172a] dark:text-[#f8fafc] block">
              1. เลือกจำนวนข้อสอบที่ต้องการทำ:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: '100', label: '100 ข้อ (ข้อสอบจริง Final)', desc: 'ครบทุกบท ทุกใบงาน เสมือนจริงที่สุด', badge: 'แนะนำ' },
                { id: '50', label: '50 ข้อ (Standard Mock)', desc: 'ฝึกทบทวนระดับปานกลาง ครอบคลุมหลักๆ' },
                { id: '30', label: '30 ข้อ (Speed Sprint)', desc: 'ฝึกคิดเร็ว เน้นจุดสำคัญเวลาจำกัด' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPreset(p.id as any)}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    selectedPreset === p.id 
                      ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] ring-1 ring-[#0066cc]' 
                      : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] hover:border-[#0066cc]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-bold text-sm text-[#0f172a] dark:text-[#f8fafc]">
                        {p.label}
                      </span>
                      {p.badge && (
                        <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-[#0066cc] text-white">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scope / Chapter Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0f172a] dark:text-[#f8fafc] block">
              2. เลือกขอบเขตเนื้อหา:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-medium">
              {[
                { id: 'all', label: 'ทุกบท (Ch 3, 4, 5)' },
                { id: 'ch3', label: 'บท 3 & ใบงาน 7-8' },
                { id: 'ch4', label: 'บท 4 & ใบงาน 9' },
                { id: 'ch5', label: 'บท 5 & ใบงาน 10-11' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedChapterFilter(f.id as any)}
                  className={`px-3 py-2 rounded-xl border transition cursor-pointer text-center ${
                    selectedChapterFilter === f.id 
                      ? 'bg-white dark:bg-[#131b2e] border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] font-bold shadow-xs' 
                      : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#0f172a] dark:text-[#f8fafc] block">
              3. เลือกระยะเวลาการทำข้อสอบ:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {[
                { min: 40, label: '40 นาที' },
                { min: 60, label: '60 นาที' },
                { min: 120, label: '120 นาที (2 ชม.)' },
                { min: 150, label: '150 นาที (2.5 ชม.)' },
              ].map(d => (
                <button
                  key={d.min}
                  onClick={() => setSelectedDurationMinutes(d.min)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition cursor-pointer text-center ${
                    selectedDurationMinutes === d.min
                      ? 'bg-white dark:bg-[#131b2e] border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] font-bold shadow-xs'
                      : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#475569] dark:text-[#94a3b8]">
              <Sparkles className="w-4 h-4 text-[#0066cc] shrink-0" />
              <span>
                พร้อมเริ่มทดสอบ: <strong>{previewQuestions.length} ข้อ</strong> | เวลา <strong>{selectedDurationMinutes} นาที</strong>
              </span>
            </div>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              เกณฑ์ผ่าน 70%
            </span>
          </div>

          {/* Launch CTA */}
          <button
            onClick={handleStartExam}
            className="w-full py-4 rounded-2xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-sm shadow-md shadow-[#0066cc]/25 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2"
          >
            <GraduationCap className="w-5 h-5" />
            <span>เริ่มทำข้อสอบจำลอง ({previewQuestions.length} ข้อ • {selectedDurationMinutes} นาที)</span>
          </button>
        </div>

        {/* Previous Attempts History */}
        {examAttempts.length > 0 && (
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8]" />
              ประวัติการทำข้อสอบที่ผ่านมา ({examAttempts.length} ครั้ง)
            </h3>
            <div className="divide-y divide-[#e2e8f0] dark:divide-[#1e293b]">
              {examAttempts.slice(0, 4).map((att, i) => (
                <div key={att.id || i} className="py-3 flex items-center justify-between text-xs font-mono">
                  <div className="text-[#64748b] dark:text-[#94a3b8]">
                    {new Date(att.timestamp).toLocaleDateString('th-TH', { 
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                    })}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#64748b] dark:text-[#94a3b8]">ใช้เวลา: {Math.round(att.timeSpentSeconds / 60)} นาที</span>
                    <span className={`font-bold text-sm ${
                      att.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {att.score} / {att.total} ({att.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW 2: RUNNING EXAM (Optimized for 100 questions)
  // ==========================================
  if (examState === 'running') {
    const questions = activeExamQuestions;
    const currentQ = questions[currentQIndex] || questions[0];
    const answeredCount = Object.keys(userAnswers).length;
    const isCurrentFlagged = flaggedQuestions.includes(currentQ.id);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn">
        
        {/* Exam Navigation Bar */}
        <div className="bg-white/95 dark:bg-[#131b2e]/95 border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-4 flex items-center justify-between sticky top-17 z-30 shadow-xs backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-1 rounded-lg border border-[#0066cc]/20">
              ข้อที่ {currentQIndex + 1} / {questions.length}
            </span>
            <span className="text-xs text-[#64748b] dark:text-[#94a3b8] hidden sm:inline">
              ตอบแล้ว <strong>{answeredCount}</strong> จาก {questions.length} ข้อ ({Math.round((answeredCount / questions.length) * 100)}%)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Countdown Clock */}
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border ${
              timeRemainingSeconds <= 300 
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500 animate-pulse' 
                : 'bg-[#f8fafc] dark:bg-[#0b0f19] text-[#0066cc] dark:text-[#38bdf8] border-[#e2e8f0] dark:border-[#1e293b]'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                if (window.confirm(`คุณตอบแล้ว ${answeredCount}/${questions.length} ข้อ ยืนยันการส่งข้อสอบหรือไม่?`)) {
                  handleSubmitExam();
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0066cc] hover:bg-[#0052a3] text-white transition shadow-xs cursor-pointer"
            >
              ส่งข้อสอบ
            </button>
          </div>
        </div>

        {/* Question Body Card */}
        <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] border border-[#e2e8f0] dark:border-[#334155]">
                {currentQ.chapterId.toUpperCase()} • {currentQ.topic}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20 font-bold">
                {currentQ.difficulty}
              </span>
            </div>

            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`text-xs flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                isCurrentFlagged 
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40 font-bold' 
                  : 'bg-[#f8fafc] dark:bg-[#0b0f19] text-[#94a3b8] border-[#e2e8f0] dark:border-[#1e293b] hover:text-[#0f172a]'
              }`}
            >
              {isCurrentFlagged ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isCurrentFlagged ? 'ปักหมุดแล้ว' : 'ปักหมุดข้ามไว้'}</span>
            </button>
          </div>

          <div className="text-base sm:text-lg font-heading font-medium text-[#0f172a] dark:text-[#f8fafc] leading-relaxed">
            <span className="font-mono text-sm mr-2 text-[#0066cc] dark:text-[#38bdf8] font-bold">{currentQIndex + 1}.</span>
            <LatexRenderer content={currentQ.question} className="inline" />
          </div>

          {/* Options with KaTeX */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] font-semibold ring-1 ring-[#0066cc]/30' 
                      : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] text-[#334155] dark:text-[#f8fafc] hover:border-[#0066cc]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-xl text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#0066cc] text-white' : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8]'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div className="leading-relaxed">
                      <LatexRenderer content={opt} className="inline" />
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8] shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Question Nav */}
          <div className="flex items-center justify-between pt-6 border-t border-[#e2e8f0] dark:border-[#1e293b]">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#334155] dark:text-[#f8fafc] bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 border border-[#e2e8f0] dark:border-[#334155] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ข้อก่อนหน้า</span>
            </button>

            {currentQIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0066cc] hover:bg-[#0052a3] border border-[#0066cc] flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              >
                <span>ข้อถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-xs cursor-pointer"
              >
                ส่งข้อสอบเพื่อตรวจ
              </button>
            )}
          </div>
        </div>

        {/* 100-Question Palette Grid (Performance-Optimized) */}
        <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#64748b] dark:text-[#94a3b8]">
            <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">
              ตารางลัดเลือกข้อ (Question Palette 1-{questions.length}):
            </span>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#0066cc]" /> ตอบแล้ว ({answeredCount})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" /> ปักหมุด ({flaggedQuestions.length})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#e2e8f0] dark:bg-[#1e293b]" /> ยังไม่ตอบ ({questions.length - answeredCount})
              </span>
            </div>
          </div>

          {/* Quick Chapter Jump Bar */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[#64748b] dark:text-[#94a3b8]">ข้ามไปยังบท:</span>
            <button
              onClick={() => setCurrentQIndex(0)}
              className="px-2.5 py-1 rounded-lg bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-[#0066cc]/10 text-[#0066cc] dark:text-[#38bdf8] font-mono font-semibold"
            >
              บทที่ 3 (ข้อ 1)
            </button>
            <button
              onClick={() => setCurrentQIndex(Math.min(30, questions.length - 1))}
              className="px-2.5 py-1 rounded-lg bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-[#0066cc]/10 text-[#0066cc] dark:text-[#38bdf8] font-mono font-semibold"
            >
              บทที่ 4 (ข้อ 31)
            </button>
            <button
              onClick={() => setCurrentQIndex(Math.min(55, questions.length - 1))}
              className="px-2.5 py-1 rounded-lg bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-[#0066cc]/10 text-[#0066cc] dark:text-[#38bdf8] font-mono font-semibold"
            >
              บทที่ 5 (ข้อ 56)
            </button>
          </div>

          {/* 10-column compact palette */}
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 gap-1.5 pt-1">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions.includes(q.id);
              const isCurrent = idx === currentQIndex;

              let btnClass = 'bg-[#f8fafc] dark:bg-[#0b0f19] text-[#94a3b8] border-[#e2e8f0] dark:border-[#1e293b]';
              if (isAnswered) btnClass = 'bg-[#0066cc] text-white border-[#0066cc] font-bold shadow-2xs';
              if (isFlagged) btnClass = 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500 font-bold';
              if (isCurrent) btnClass += ' ring-2 ring-[#0066cc] scale-105 z-10';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`h-8 sm:h-9 rounded-xl text-xs font-mono border transition-all cursor-pointer flex items-center justify-center ${btnClass}`}
                  title={`ข้อที่ ${idx + 1}: ${q.topic}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // ==========================================
  // VIEW 3: RESULTS & EXPLANATION REVIEW (100 Questions Performance Mode)
  // ==========================================
  const attempt = lastAttempt || examAttempts[0];
  if (!attempt) return null;

  const passed = attempt.percentage >= 70;
  const questions = activeExamQuestions.length > 0 ? activeExamQuestions : FINAL_EXAM_QUESTIONS;

  const filteredReviewQuestions = questions.filter(q => {
    if (reviewFilter === 'wrong') return attempt.answers[q.id] !== q.correctAnswer;
    if (reviewFilter === 'flagged') return flaggedQuestions.includes(q.id);
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* Result Hero Banner */}
      <div className={`p-8 rounded-3xl border shadow-xs ${
        passed 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-rose-500/10 border-rose-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${
                passed ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
              }`}>
                {passed ? '🎉 สอบผ่านตามเกณฑ์ (PASSED)' : '⚠️ ยังไม่ผ่านเกณฑ์ (NEEDS REVIEW)'}
              </span>
              <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">
                {new Date(attempt.timestamp).toLocaleDateString('th-TH', { 
                  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
              คะแนนของคุณ: <span className={passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>{attempt.score}</span> / {attempt.total}
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94a3b8]">
              {passed 
                ? 'ยินดีด้วยครับ! ความรู้ความเข้าใจพร้อมสำหรับการสอบจริงของ ดร. ปวีณ แล้ว' 
                : 'ไม่ต้องกังวลครับ ดูเฉลยด้านล่างเพื่อทำความเข้าใจจุดที่ผิดพลาด โดยเฉพาะข้อสอบจากใบงาน 7-11'}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-200 dark:border-slate-800">
            <div className="text-3xl sm:text-5xl font-mono font-extrabold tracking-tight">
              {attempt.percentage}%
            </div>
            <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 font-mono">
              ใช้เวลา: {Math.floor(attempt.timeSpentSeconds / 60)} นาที {attempt.timeSpentSeconds % 60} วินาที
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Breakdown Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'ch3', label: 'บทที่ 3 & ใบงาน 7-8', sub: 'Digital Circuit, Gates & Adders' },
          { id: 'ch4', label: 'บทที่ 4 & ใบงาน 9', sub: 'Simplification, K-Map & Fan' },
          { id: 'ch5', label: 'บทที่ 5 & ใบงาน 10-11', sub: 'Flip-Flops, NE555 & FSM' }
        ].map(ch => {
          const stats = attempt.chapterScores[ch.id as ChapterId] || { correct: 0, total: 0 };
          const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
          return (
            <div key={ch.id} className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-sm text-[#0f172a] dark:text-[#f8fafc]">{ch.label}</span>
                <span className={`text-xs font-mono font-bold ${pct >= 70 ? 'text-emerald-600' : 'text-amber-500'}`}>{pct}%</span>
              </div>
              <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">{ch.sub}</div>
              <div className="w-full bg-[#f1f5f9] dark:bg-[#1e293b] h-2 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${pct >= 70 ? 'bg-[#10b981]' : 'bg-amber-500'}`} 
                  style={{ width: `${pct}%` }} 
                />
              </div>
              <div className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8] text-right">
                ทำถูก {stats.correct} / {stats.total} ข้อ
              </div>
            </div>
          );
        })}
      </div>

      {/* Solutions Review Header with Filter & Expand Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-4 rounded-2xl shadow-xs">
          <div>
            <h2 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
              เฉลยละเอียดและคำอธิบายทีละข้อ ({filteredReviewQuestions.length} ข้อ)
            </h2>
            <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
              คลิกที่การ์ดเพื่อขยายดูวิธีคิดและเฉลยละเอียด
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Tabs */}
            <div className="flex items-center bg-[#f1f5f9] dark:bg-[#0b0f19] p-1 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] text-xs">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  reviewFilter === 'all' ? 'bg-[#0066cc] text-white shadow-2xs' : 'text-[#64748b] dark:text-[#94a3b8]'
                }`}
              >
                ทั้งหมด ({questions.length})
              </button>
              <button
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  reviewFilter === 'wrong' ? 'bg-rose-600 text-white shadow-2xs' : 'text-[#64748b] dark:text-[#94a3b8]'
                }`}
              >
                เฉพาะข้อที่ผิด ({attempt.total - attempt.score})
              </button>
              {flaggedQuestions.length > 0 && (
                <button
                  onClick={() => setReviewFilter('flagged')}
                  className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                    reviewFilter === 'flagged' ? 'bg-amber-600 text-white shadow-2xs' : 'text-[#64748b] dark:text-[#94a3b8]'
                  }`}
                >
                  ปักหมุด ({flaggedQuestions.length})
                </button>
              )}
            </div>

            {/* Expand / Collapse All Toggle */}
            <button
              onClick={() => {
                const areAnyCollapsed = filteredReviewQuestions.some(q => !expandedSolutions[q.id]);
                toggleExpandAll(areAnyCollapsed);
              }}
              className="px-3 py-1.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#0b0f19] text-xs font-semibold text-[#0f172a] dark:text-[#f8fafc] hover:border-[#0066cc] transition flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>เปิด/ย่อทั้งหมด</span>
            </button>
          </div>
        </div>

        {/* Question Cards (Accordion / High-Performance Render) */}
        <div className="space-y-3">
          {filteredReviewQuestions.map((q) => {
            const userChosen = attempt.answers[q.id];
            const isCorrect = userChosen === q.correctAnswer;
            const isAnswered = userChosen !== undefined;
            const isExpanded = expandedSolutions[q.id] ?? (!isCorrect); // Default open if wrong!
            const originalIndex = questions.findIndex(x => x.id === q.id);

            return (
              <div 
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect 
                    ? 'bg-white dark:bg-[#131b2e] border-[#e2e8f0] dark:border-[#1e293b] shadow-xs' 
                    : 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30'
                }`}
              >
                {/* Clickable Header for Fast Toggling */}
                <div 
                  onClick={() => toggleSolutionExpand(q.id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-1 rounded-lg border border-[#0066cc]/20">
                      ข้อที่ {originalIndex + 1}
                    </span>
                    <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono hidden sm:inline">
                      {q.chapterId.toUpperCase()} • {q.topic}
                    </span>
                    <span className="text-xs font-heading font-medium text-[#0f172a] dark:text-[#f8fafc] truncate max-w-[300px] sm:max-w-md">
                      {q.question.substring(0, 60)}...
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className={`text-xs font-semibold flex items-center space-x-1 ${
                      isCorrect 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : isAnswered 
                        ? 'text-rose-600 dark:text-rose-400' 
                        : 'text-[#94a3b8]'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isCorrect ? 'ตอบถูก' : isAnswered ? 'ตอบผิด' : 'ไม่ได้ตอบ'}</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 text-[#94a3b8] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[#e2e8f0]/60 dark:border-[#1e293b]/60">
                    <div className="text-sm font-heading font-medium text-[#0f172a] dark:text-[#f8fafc] leading-relaxed pt-2">
                      <LatexRenderer content={q.question} />
                    </div>

                    {/* Options display with KaTeX */}
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8]';
                        if (optIdx === q.correctAnswer) {
                          optStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                        } else if (optIdx === userChosen && !isCorrect) {
                          optStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 line-through';
                        }

                        return (
                          <div 
                            key={optIdx} 
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <span className="font-mono font-bold text-xs">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <div>
                                <LatexRenderer content={opt} className="inline" />
                              </div>
                            </div>
                            {optIdx === q.correctAnswer && (
                              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                ✓ คำตอบที่ถูกต้อง
                              </span>
                            )}
                            {optIdx === userChosen && !isCorrect && (
                              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                                ✗ คุณเลือกข้อนี้
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box with KaTeX */}
                    <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] text-xs space-y-1.5">
                      <div className="font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#0066cc] dark:text-[#38bdf8]" />
                        <span>คำอธิบายเฉลยและวิธีคิดอย่างละเอียด:</span>
                      </div>
                      <div className="text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                        <LatexRenderer content={q.explanation} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Retake Button */}
        <div className="pt-6 text-center">
          <button
            onClick={() => setExamState('intro')}
            className="px-6 py-3 rounded-2xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-xs shadow-md shadow-[#0066cc]/25 inline-flex items-center space-x-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำข้อสอบใหม่อีกครั้ง</span>
          </button>
        </div>

      </div>

    </div>
  );
};
