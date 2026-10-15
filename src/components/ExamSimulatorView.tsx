import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FINAL_EXAM_QUESTIONS } from '../data/quizData';
import { QuizQuestion, ExamAttempt, ChapterId } from '../types';
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
  AlertCircle,
  TrendingUp,
  Filter,
  Check,
  Sparkles
} from 'lucide-react';

export const ExamSimulatorView: React.FC = () => {
  const { saveExamAttempt, examAttempts } = useApp();

  // Exam States: 'intro' | 'running' | 'result'
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
    if (selectedDurationMinutes === 0) return; // untimed

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

    // Trigger victory confetti if passed (>= 70%)
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 mb-2">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            ระบบจำลองการสอบปลายภาค (Final Exam Simulator)
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            วัดระดับความพร้อมก่อนลงสนามจริง ข้อสอบ 30 ข้อ ครอบคลุมบทที่ 3, 4, 5 อิงตามเนื้อหาและสไลด์ของ ดร. ปวีณ เขื่อนแก้ว มหาวิทยาลัยแม่โจ้
          </p>
        </div>

        {/* Exam Conditions & Instructions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>ข้อกำหนดและกติกาการสอบ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400">จำนวนข้อสอบ</div>
              <div className="text-xl font-bold font-mono text-cyan-400">30 ข้อ ปรนัย</div>
              <div className="text-[11px] text-slate-500">บทที่ 3, 4, 5 บทละ 10 ข้อ</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400">เกณฑ์การผ่าน</div>
              <div className="text-xl font-bold font-mono text-emerald-400">70% (21 ข้อขึ้นไป)</div>
              <div className="text-[11px] text-slate-500">เกรด A แนะนำ 85% ขึ้นไป</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400">อุปกรณ์ที่อนุญาต</div>
              <div className="text-xl font-bold font-mono text-indigo-400">A4 1 แผ่น + เครื่องคิดเลข</div>
              <div className="text-[11px] text-slate-500">เปิดแท็บ "สรุปสูตร A4" ประกอบได้</div>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-slate-300 block">
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
                  className={`p-3.5 rounded-xl text-xs font-semibold border transition ${
                    selectedDurationMinutes === d.min 
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/10' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>เริ่มทำข้อสอบจำลอง ({selectedDurationMinutes} นาที)</span>
            </button>
          </div>
        </div>

        {/* Previous Attempts History */}
        {examAttempts.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              ประวัติการทำข้อสอบที่ผ่านมา ({examAttempts.length} ครั้ง)
            </h3>
            <div className="divide-y divide-slate-800">
              {examAttempts.slice(0, 4).map((att, i) => (
                <div key={att.id || i} className="py-3 flex items-center justify-between text-xs font-mono">
                  <div className="text-slate-400">
                    {new Date(att.timestamp).toLocaleDateString('th-TH', { 
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                    })}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-400">ใช้เวลา: {Math.round(att.timeSpentSeconds / 60)} นาที</span>
                    <span className={`font-bold text-sm ${
                      att.percentage >= 70 ? 'text-emerald-400' : 'text-rose-400'
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between sticky top-18 z-30 shadow-lg backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
              ข้อที่ {currentQIndex + 1} / {questions.length}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              ตอบแล้ว {answeredCount} จาก {questions.length} ข้อ
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Countdown Clock */}
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-bold border ${
              timeRemainingSeconds <= 300 
                ? 'bg-rose-950/60 text-rose-300 border-rose-500 animate-pulse' 
                : 'bg-slate-950 text-cyan-400 border-slate-800'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                if (window.confirm(`คุณตอบแล้ว ${answeredCount}/${questions.length} ข้อ ยืนยันการส่งข้อสอบหรือไม่?`)) {
                  handleSubmitExam();
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
            >
              ส่งข้อสอบ
            </button>
          </div>
        </div>

        {/* Question Body Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                {currentQ.chapterId.toUpperCase()} • {currentQ.topic}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
                {currentQ.difficulty}
              </span>
            </div>

            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`text-xs flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition ${
                isCurrentFlagged 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
            >
              {isCurrentFlagged ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isCurrentFlagged ? 'ปักหมุดแล้ว' : 'ปักหมุดข้ามไว้'}</span>
            </button>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
            {currentQIndex + 1}. {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-sm shadow-cyan-500/10 ring-1 ring-cyan-500/50' 
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Question Nav */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ข้อก่อนหน้า</span>
            </button>

            {currentQIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 border border-cyan-500/30 flex items-center space-x-1.5 transition"
              >
                <span>ข้อถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md shadow-emerald-500/20"
              >
                ส่งข้อสอบเพื่อตรวจ
              </button>
            )}
          </div>
        </div>

        {/* Question Palette Grid (Jump directly to any question) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ตารางลัดเลือกข้อ (Question Palette):</span>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-cyan-500" /> ตอบแล้ว
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" /> ปักหมุด
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-slate-800" /> ยังไม่ตอบ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions.includes(q.id);
              const isCurrent = idx === currentQIndex;

              let btnClass = 'bg-slate-950 text-slate-500 border-slate-800';
              if (isAnswered) btnClass = 'bg-cyan-950 text-cyan-300 border-cyan-700 font-bold';
              if (isFlagged) btnClass = 'bg-amber-950 text-amber-300 border-amber-600';
              if (isCurrent) btnClass += ' ring-2 ring-cyan-400';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-mono border transition ${btnClass}`}
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
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40' 
          : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/40'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded ${
                passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {passed ? '🎉 สอบผ่านตามเกณฑ์ (PASSED)' : '⚠️ ยังไม่ผ่านเกณฑ์ (NEEDS REVIEW)'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              ผลการสอบจำลอง Digital Logic Final
            </h1>
            <p className="text-sm text-slate-300">
              {passed 
                ? 'ยอดเยี่ยมมาก! คุณมีความเข้าใจในบทที่ 3, 4, 5 เป็นอย่างดี พร้อมลุยสนามสอบจริง' 
                : 'อย่าเพิ่งท้อ! ตรวจสอบเฉลยละเอียดด้านล่างเพื่ออุดรูรั่วในจุดที่ยังเข้าใจผิด'}
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">คะแนนของคุณ</div>
            <div className={`text-4xl font-black font-mono mt-1 ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {attempt.score} <span className="text-xl text-slate-500 font-normal">/ {attempt.total}</span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">{attempt.percentage}% (ใช้เวลา {Math.round(attempt.timeSpentSeconds / 60)} นาที)</div>
          </div>
        </div>
      </div>

      {/* Chapter Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'ch3', title: 'บทที่ 3: Digital Circuit', score: attempt.chapterScores.ch3 },
          { id: 'ch4', title: 'บทที่ 4: Simplification', score: attempt.chapterScores.ch4 },
          { id: 'ch5', title: 'บทที่ 5: Sequential & FSM', score: attempt.chapterScores.ch5 },
        ].map(ch => {
          const pct = Math.round((ch.score.correct / ch.score.total) * 100);
          return (
            <div key={ch.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="text-xs text-slate-400 font-mono font-semibold uppercase">{ch.title}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-slate-100">
                  {ch.score.correct} / {ch.score.total}
                </span>
                <span className={`text-sm font-mono font-bold ${pct >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pct}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            เฉลยละเอียดและคำอธิบายทีละข้อ (Solutions)
          </h2>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                reviewFilter === 'all' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ทั้งหมด ({questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                reviewFilter === 'wrong' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              เฉพาะข้อที่ผิด ({attempt.total - attempt.score})
            </button>
          </div>
        </div>

        {/* Question Cards with Solutions */}
        <div className="space-y-4">
          {filteredReviewQuestions.map((q, idx) => {
            const userChosen = attempt.answers[q.id];
            const isCorrect = userChosen === q.correctAnswer;

            return (
              <div 
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isCorrect 
                    ? 'bg-slate-900/60 border-slate-800' 
                    : 'bg-rose-950/20 border-rose-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                      ข้อที่ {questions.findIndex(x => x.id === q.id) + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {q.chapterId.toUpperCase()} • {q.topic}
                    </span>
                  </div>

                  <span className={`text-xs font-semibold flex items-center space-x-1 ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{isCorrect ? 'ตอบถูก' : 'ตอบผิด'}</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-3">
                  {q.question}
                </h3>

                {/* Options display with answer indicator */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = 'bg-slate-950 border-slate-800/80 text-slate-400';
                    if (optIdx === q.correctAnswer) {
                      optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (optIdx === userChosen && !isCorrect) {
                      optStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 line-through';
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
                          <span>{opt}</span>
                        </div>
                        {optIdx === q.correctAnswer && (
                          <span className="text-[11px] font-mono font-bold text-emerald-400">
                            ✓ คำตอบที่ถูกต้อง
                          </span>
                        )}
                        {optIdx === userChosen && !isCorrect && (
                          <span className="text-[11px] font-mono font-bold text-rose-400">
                            ✗ คุณเลือกข้อนี้
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>คำอธิบายเฉลยและวิธีคิด:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retake Button */}
        <div className="pt-6 text-center">
          <button
            onClick={() => setExamState('intro')}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 inline-flex items-center space-x-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำข้อสอบใหม่อีกครั้ง</span>
          </button>
        </div>

      </div>

    </div>
  );
};
