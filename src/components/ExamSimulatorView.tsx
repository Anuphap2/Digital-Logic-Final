import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FINAL_EXAM_QUESTIONS } from '../data/quizData';
import { QuizQuestion, ExamAttempt, ChapterId } from '../types';
import { LatexRenderer, MathView } from './LatexRenderer';
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
  Sparkles
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveExamAttempt, examAttempts } = useApp();

  const [examState, setExamState] = useState<'intro' | 'running' | 'result'>('intro');
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number>(45);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(45 * 60);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'flagged'>('all');
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);

  const questions = FINAL_EXAM_QUESTIONS;
  const currentQ = questions[currentQIndex];

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
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentQIndex(0);
    setTimeRemainingSeconds(selectedDurationMinutes * 60);
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

  const handleSubmitExam = () => {
    let score = 0;
    const chScores: Record<ChapterId, { correct: number; total: number }> = {
      ch3: { correct: 0, total: 0 },
      ch4: { correct: 0, total: 0 },
      ch5: { correct: 0, total: 0 }
    };

    questions.forEach(q => {
      chScores[q.chapterId].total += 1;
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
        chScores[q.chapterId].correct += 1;
      }
    });

    const total = questions.length;
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
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // VIEW 1: INTRO / LOBBY
  // ==========================================
  if (examState === 'intro') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20 shadow-sm mb-2">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
            ระบบจำลองการสอบปลายภาค (Final Exam Simulator)
          </h1>
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8] max-w-xl mx-auto leading-relaxed">
            วัดระดับความพร้อมก่อนลงสนามจริง ข้อสอบ 30 ข้อ ครอบคลุมบทที่ 3, 4, 5 อิงตามเนื้อหาและสไลด์ของ ดร. ปวีณ เขื่อนแก้ว มหาวิทยาลัยแม่โจ้
          </p>
        </div>

        {/* Exam Conditions & Instructions */}
        <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="font-heading font-bold text-xl text-[#0f172a] dark:text-[#f8fafc] flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
            <span>ข้อกำหนดและกติกาการสอบ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] space-y-1">
              <div className="text-[#64748b] dark:text-[#94a3b8]">จำนวนข้อสอบ</div>
              <div className="text-xl font-bold font-mono text-[#0066cc] dark:text-[#38bdf8]">30 ข้อ ปรนัย</div>
              <div className="text-xs text-[#94a3b8]">บทที่ 3, 4, 5 บทละ 10 ข้อ</div>
            </div>
            <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] space-y-1">
              <div className="text-[#64748b] dark:text-[#94a3b8]">เกณฑ์การผ่าน</div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">70% (21 ข้อขึ้นไป)</div>
              <div className="text-xs text-[#94a3b8]">เกรด A แนะนำ 85% ขึ้นไป</div>
            </div>
            <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] space-y-1">
              <div className="text-[#64748b] dark:text-[#94a3b8]">อุปกรณ์ที่อนุญาต</div>
              <div className="text-xl font-bold font-mono text-[#7c3aed] dark:text-[#a78bfa]">A4 1 แผ่น + เครื่องคิดเลข</div>
              <div className="text-xs text-[#94a3b8]">เปิดแท็บ "สรุปสูตร A4" ประกอบได้</div>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-[#0f172a] dark:text-[#f8fafc] block">
              เลือกระยะเวลาการทำข้อสอบ:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { min: 30, label: '30 นาที (Speed Run)' },
                { min: 45, label: '45 นาที (มาตรฐานข้อสอบ)' },
                { min: 60, label: '60 นาที (สบายๆ ฝึกคิด)' },
              ].map(d => (
                <button
                  key={d.min}
                  onClick={() => setSelectedDurationMinutes(d.min)}
                  className={`p-3.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    selectedDurationMinutes === d.min 
                      ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] font-bold shadow-xs' 
                      : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:border-[#0066cc]/40'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={handleStartExam}
              className="w-full py-3.5 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold text-sm shadow-md shadow-[#0066cc]/20 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>เริ่มทำข้อสอบจำลอง ({selectedDurationMinutes} นาที)</span>
            </button>
          </div>
        </div>

        {/* Previous Attempts History */}
        {examAttempts.length > 0 && (
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 space-y-4 shadow-sm">
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
  // VIEW 2: RUNNING EXAM
  // ==========================================
  if (examState === 'running') {
    const answeredCount = Object.keys(userAnswers).length;
    const isCurrentFlagged = flaggedQuestions.includes(currentQ.id);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn">
        
        {/* Exam Navigation Bar */}
        <div className="bg-white/95 dark:bg-[#131b2e]/95 border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-4 flex items-center justify-between sticky top-18 z-30 shadow-sm backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-1 rounded-lg border border-[#0066cc]/20">
              ข้อที่ {currentQIndex + 1} / {questions.length}
            </span>
            <span className="text-xs text-[#64748b] dark:text-[#94a3b8] hidden sm:inline">
              ตอบแล้ว {answeredCount} จาก {questions.length} ข้อ
            </span>
          </div>

          <div className="flex items-center space-x-4">
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
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#0066cc] hover:bg-[#0052a3] text-white transition shadow-sm cursor-pointer"
            >
              ส่งข้อสอบ
            </button>
          </div>
        </div>

        {/* Question Body Card */}
        <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
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
              className={`text-xs flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                isCurrentFlagged 
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40' 
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
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] font-semibold' 
                      : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] text-[#334155] dark:text-[#f8fafc] hover:border-[#0066cc]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#0066cc] text-white' : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8]'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div>
                      <LatexRenderer content={opt} className="inline" />
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Question Nav */}
          <div className="flex items-center justify-between pt-6 border-t border-[#e2e8f0] dark:border-[#1e293b]">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#334155] dark:text-[#f8fafc] bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 border border-[#e2e8f0] dark:border-[#334155] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ข้อก่อนหน้า</span>
            </button>

            {currentQIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0066cc] hover:bg-[#0052a3] border border-[#0066cc] flex items-center space-x-1.5 transition cursor-pointer shadow-sm"
              >
                <span>ข้อถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-sm cursor-pointer"
              >
                ส่งข้อสอบเพื่อตรวจ
              </button>
            )}
          </div>
        </div>

        {/* Question Palette Grid */}
        <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
            <span>ตารางลัดเลือกข้อ (Question Palette):</span>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#0066cc]" /> ตอบแล้ว
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" /> ปักหมุด
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#e2e8f0] dark:bg-[#1e293b]" /> ยังไม่ตอบ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions.includes(q.id);
              const isCurrent = idx === currentQIndex;

              let btnClass = 'bg-[#f8fafc] dark:bg-[#0b0f19] text-[#94a3b8] border-[#e2e8f0] dark:border-[#1e293b]';
              if (isAnswered) btnClass = 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8] border-[#0066cc] font-bold';
              if (isFlagged) btnClass = 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500 font-bold';
              if (isCurrent) btnClass += ' ring-2 ring-[#0066cc]';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-mono border transition cursor-pointer ${btnClass}`}
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
  // VIEW 3: RESULTS & EXPLANATION REVIEW
  // ==========================================
  const attempt = lastAttempt || examAttempts[0];
  if (!attempt) return null;

  const passed = attempt.percentage >= 70;

  const filteredReviewQuestions = questions.filter(q => {
    if (reviewFilter === 'wrong') return attempt.answers[q.id] !== q.correctAnswer;
    if (reviewFilter === 'flagged') return flaggedQuestions.includes(q.id);
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      
      {/* Result Hero Banner */}
      <div className={`p-8 rounded-2xl border ${
        passed 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-rose-500/10 border-rose-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full ${
                passed ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
              }`}>
                {passed ? '🎉 สอบผ่านตามเกณฑ์ (PASSED)' : '⚠️ ยังไม่ผ่านเกณฑ์ (NEEDS REVIEW)'}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
              ผลการสอบจำลอง Digital Logic Final
            </h1>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
              {passed 
                ? 'ยอดเยี่ยมมาก! คุณมีความเข้าใจในบทที่ 3, 4, 5 เป็นอย่างดี พร้อมลุยสนามสอบจริง' 
                : 'อย่าเพิ่งท้อ! ตรวจสอบเฉลยละเอียดด้านล่างเพื่ออุดรูรั่วในจุดที่ยังเข้าใจผิด'}
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0 bg-white dark:bg-[#131b2e] p-5 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-sm">
            <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">คะแนนของคุณ</div>
            <div className={`text-4xl font-mono font-bold mt-1 ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {attempt.score} <span className="text-lg text-[#94a3b8] font-normal">/ {attempt.total}</span>
            </div>
            <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono mt-1">{attempt.percentage}% (ใช้เวลา {Math.round(attempt.timeSpentSeconds / 60)} นาที)</div>
          </div>
        </div>
      </div>

      {/* Chapter Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'ch3', title: 'บทที่ 3: Digital Circuit', score: attempt.chapterScores.ch3 },
          { id: 'ch4', title: 'บทที่ 4: Simplification', score: attempt.chapterScores.ch4 },
          { id: 'ch5', title: 'บทที่ 5: Sequential & FSM', score: attempt.chapterScores.ch5 },
        ].map(ch => {
          const pct = Math.round((ch.score.correct / ch.score.total) * 100);
          return (
            <div key={ch.id} className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-5 rounded-xl space-y-2 shadow-sm">
              <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono font-semibold uppercase">{ch.title}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-[#0f172a] dark:text-[#f8fafc]">
                  {ch.score.correct} / {ch.score.total}
                </span>
                <span className={`text-sm font-mono font-bold ${pct >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {pct}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#e2e8f0] dark:bg-[#1e293b] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Solutions Review Section with KaTeX */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-heading font-bold text-xl text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
            เฉลยละเอียดและคำอธิบายทีละข้อ (Solutions)
          </h2>

          <div className="flex items-center space-x-2 bg-white dark:bg-[#131b2e] p-1 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] self-start sm:self-auto shadow-xs">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                reviewFilter === 'all' ? 'bg-[#0066cc] text-white' : 'text-[#64748b] dark:text-[#94a3b8]'
              }`}
            >
              ทั้งหมด ({questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                reviewFilter === 'wrong' ? 'bg-rose-600 text-white' : 'text-[#64748b] dark:text-[#94a3b8]'
              }`}
            >
              เฉพาะข้อที่ผิด ({attempt.total - attempt.score})
            </button>
          </div>
        </div>

        {/* Question Cards with KaTeX Math Rendering */}
        <div className="space-y-4">
          {filteredReviewQuestions.map((q, idx) => {
            const userChosen = attempt.answers[q.id];
            const isCorrect = userChosen === q.correctAnswer;

            return (
              <div 
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isCorrect 
                    ? 'bg-white dark:bg-[#131b2e] border-[#e2e8f0] dark:border-[#1e293b] shadow-sm' 
                    : 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-0.5 rounded border border-[#0066cc]/20">
                      ข้อที่ {questions.findIndex(x => x.id === q.id) + 1}
                    </span>
                    <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">
                      {q.chapterId.toUpperCase()} • {q.topic}
                    </span>
                  </div>

                  <span className={`text-xs font-semibold flex items-center space-x-1 ${
                    isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{isCorrect ? 'ตอบถูก' : 'ตอบผิด'}</span>
                  </span>
                </div>

                <div className="text-sm sm:text-base font-heading font-medium text-[#0f172a] dark:text-[#f8fafc] mb-3">
                  <LatexRenderer content={q.question} />
                </div>

                {/* Options display with KaTeX */}
                <div className="space-y-2 mb-4">
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
                <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] text-xs space-y-1">
                  <div className="font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0066cc] dark:text-[#38bdf8]" />
                    <span>คำอธิบายเฉลยและวิธีคิด:</span>
                  </div>
                  <div className="text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                    <LatexRenderer content={q.explanation} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retake Button */}
        <div className="pt-6 text-center">
          <button
            onClick={() => setExamState('intro')}
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#131b2e] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] font-semibold text-xs border border-[#e2e8f0] dark:border-[#334155] inline-flex items-center space-x-2 transition cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำข้อสอบใหม่อีกครั้ง</span>
          </button>
        </div>

      </div>

    </div>
  );
};
