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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border border-[#e6dfd8] dark:border-[#3d3d3a] shadow-sm mb-2">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#141413] dark:text-[#faf9f5] tracking-tight">
            ระบบจำลองการสอบปลายภาค (Final Exam Simulator)
          </h1>
          <p className="text-sm text-[#6c6a64] dark:text-[#a09d96] max-w-xl mx-auto leading-relaxed">
            วัดระดับความพร้อมก่อนลงสนามจริง ข้อสอบ 30 ข้อ ครอบคลุมบทที่ 3, 4, 5 อิงตามเนื้อหาและสไลด์ของ ดร. ปวีณ เขื่อนแก้ว มหาวิทยาลัยแม่โจ้
          </p>
        </div>

        {/* Exam Conditions & Instructions */}
        <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#cc785c]" />
            <span>ข้อกำหนดและกติกาการสอบ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] space-y-1">
              <div className="text-[#6c6a64] dark:text-[#8e8b82]">จำนวนข้อสอบ</div>
              <div className="text-xl font-bold font-mono text-[#cc785c]">30 ข้อ ปรนัย</div>
              <div className="text-xs text-[#8e8b82]">บทที่ 3, 4, 5 บทละ 10 ข้อ</div>
            </div>
            <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] space-y-1">
              <div className="text-[#6c6a64] dark:text-[#8e8b82]">เกณฑ์การผ่าน</div>
              <div className="text-xl font-bold font-mono text-[#5db872]">70% (21 ข้อขึ้นไป)</div>
              <div className="text-xs text-[#8e8b82]">เกรด A แนะนำ 85% ขึ้นไป</div>
            </div>
            <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] space-y-1">
              <div className="text-[#6c6a64] dark:text-[#8e8b82]">อุปกรณ์ที่อนุญาต</div>
              <div className="text-xl font-bold font-mono text-[#5db8a6]">A4 1 แผ่น + เครื่องคิดเลข</div>
              <div className="text-xs text-[#8e8b82]">เปิดแท็บ "สรุปสูตร A4" ประกอบได้</div>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-[#141413] dark:text-[#faf9f5] block">
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
                      ? 'bg-[#efe9de] dark:bg-[#252320] border-[#cc785c] text-[#cc785c]' 
                      : 'bg-[#f5f0e8] dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] text-[#6c6a64] dark:text-[#a09d96] hover:border-[#cc785c]'
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
              className="w-full py-3.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white font-semibold text-sm shadow-md shadow-[#cc785c]/20 active:scale-[0.99] transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>เริ่มทำข้อสอบจำลอง ({selectedDurationMinutes} นาที)</span>
            </button>
          </div>
        </div>

        {/* Previous Attempts History */}
        {examAttempts.length > 0 && (
          <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#cc785c]" />
              ประวัติการทำข้อสอบที่ผ่านมา ({examAttempts.length} ครั้ง)
            </h3>
            <div className="divide-y divide-[#e6dfd8] dark:divide-[#252320]">
              {examAttempts.slice(0, 4).map((att, i) => (
                <div key={att.id || i} className="py-3 flex items-center justify-between text-xs font-mono">
                  <div className="text-[#6c6a64] dark:text-[#8e8b82]">
                    {new Date(att.timestamp).toLocaleDateString('th-TH', { 
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                    })}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#6c6a64] dark:text-[#8e8b82]">ใช้เวลา: {Math.round(att.timeSpentSeconds / 60)} นาที</span>
                    <span className={`font-bold text-sm ${
                      att.percentage >= 70 ? 'text-[#5db872]' : 'text-[#c64545]'
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
        <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-4 flex items-center justify-between sticky top-18 z-30 shadow-sm backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] px-2.5 py-1 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
              ข้อที่ {currentQIndex + 1} / {questions.length}
            </span>
            <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] hidden sm:inline">
              ตอบแล้ว {answeredCount} จาก {questions.length} ข้อ
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Countdown Clock */}
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border ${
              timeRemainingSeconds <= 300 
                ? 'bg-[#c64545]/20 text-[#c64545] border-[#c64545] animate-pulse' 
                : 'bg-[#f5f0e8] dark:bg-[#181715] text-[#cc785c] border-[#e6dfd8] dark:border-[#252320]'
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
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#cc785c] hover:bg-[#a9583e] text-white transition shadow-sm"
            >
              ส่งข้อสอบ
            </button>
          </div>
        </div>

        {/* Question Body Card */}
        <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#f5f0e8] dark:bg-[#181715] text-[#6c6a64] dark:text-[#a09d96] border border-[#e6dfd8] dark:border-[#252320]">
                {currentQ.chapterId.toUpperCase()} • {currentQ.topic}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f5f0e8] dark:bg-[#181715] text-[#cc785c] border border-[#e6dfd8] dark:border-[#252320]">
                {currentQ.difficulty}
              </span>
            </div>

            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`text-xs flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition ${
                isCurrentFlagged 
                  ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border-[#cc785c]' 
                  : 'bg-[#f5f0e8] dark:bg-[#181715] text-[#8e8b82] border-[#e6dfd8] dark:border-[#252320] hover:text-[#141413]'
              }`}
            >
              {isCurrentFlagged ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isCurrentFlagged ? 'ปักหมุดแล้ว' : 'ปักหมุดข้ามไว้'}</span>
            </button>
          </div>

          <div className="text-base sm:text-lg font-serif text-[#141413] dark:text-[#faf9f5] leading-relaxed">
            <span className="font-mono text-sm mr-2 text-[#cc785c]">{currentQIndex + 1}.</span>
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
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-150 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-[#efe9de] dark:bg-[#252320] border-[#cc785c] text-[#cc785c] font-semibold' 
                      : 'bg-[#f5f0e8] dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] text-[#3d3d3a] dark:text-[#faf9f5] hover:border-[#cc785c]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#cc785c] text-white' : 'bg-[#e6dfd8] dark:bg-[#252320] text-[#6c6a64] dark:text-[#a09d96]'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div>
                      <LatexRenderer content={opt} className="inline" />
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#cc785c] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Prev / Next Question Nav */}
          <div className="flex items-center justify-between pt-6 border-t border-[#e6dfd8] dark:border-[#252320]">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#6c6a64] dark:text-[#a09d96] bg-[#f5f0e8] dark:bg-[#181715] hover:bg-[#efe9de] border border-[#e6dfd8] dark:border-[#252320] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ข้อก่อนหน้า</span>
            </button>

            {currentQIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#cc785c] hover:bg-[#a9583e] border border-[#cc785c] flex items-center space-x-1.5 transition"
              >
                <span>ข้อถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#5db872] hover:bg-[#4ea763] transition shadow-sm"
              >
                ส่งข้อสอบเพื่อตรวจ
              </button>
            )}
          </div>
        </div>

        {/* Question Palette Grid */}
        <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#6c6a64] dark:text-[#8e8b82]">
            <span>ตารางลัดเลือกข้อ (Question Palette):</span>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#cc785c]" /> ตอบแล้ว
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#e8a55a]" /> ปักหมุด
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#e6dfd8] dark:bg-[#252320]" /> ยังไม่ตอบ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions.includes(q.id);
              const isCurrent = idx === currentQIndex;

              let btnClass = 'bg-[#f5f0e8] dark:bg-[#181715] text-[#8e8b82] border-[#e6dfd8] dark:border-[#252320]';
              if (isAnswered) btnClass = 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border-[#cc785c] font-bold';
              if (isFlagged) btnClass = 'bg-[#e8a55a]/20 text-[#e8a55a] border-[#e8a55a]';
              if (isCurrent) btnClass += ' ring-2 ring-[#cc785c]';

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
          ? 'bg-[#5db872]/10 border-[#5db872]/30' 
          : 'bg-[#c64545]/10 border-[#c64545]/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full ${
                passed ? 'bg-[#5db872]/20 text-[#5db872]' : 'bg-[#c64545]/20 text-[#c64545]'
              }`}>
                {passed ? '🎉 สอบผ่านตามเกณฑ์ (PASSED)' : '⚠️ ยังไม่ผ่านเกณฑ์ (NEEDS REVIEW)'}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#141413] dark:text-[#faf9f5]">
              ผลการสอบจำลอง Digital Logic Final
            </h1>
            <p className="text-sm text-[#6c6a64] dark:text-[#a09d96]">
              {passed 
                ? 'ยอดเยี่ยมมาก! คุณมีความเข้าใจในบทที่ 3, 4, 5 เป็นอย่างดี พร้อมลุยสนามสอบจริง' 
                : 'อย่าเพิ่งท้อ! ตรวจสอบเฉลยละเอียดด้านล่างเพื่ออุดรูรั่วในจุดที่ยังเข้าใจผิด'}
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0 bg-[#faf9f5] dark:bg-[#1f1e1b] p-5 rounded-2xl border border-[#e6dfd8] dark:border-[#252320]">
            <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">คะแนนของคุณ</div>
            <div className={`text-4xl font-mono font-bold mt-1 ${passed ? 'text-[#5db872]' : 'text-[#c64545]'}`}>
              {attempt.score} <span className="text-lg text-[#8e8b82] font-normal">/ {attempt.total}</span>
            </div>
            <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono mt-1">{attempt.percentage}% (ใช้เวลา {Math.round(attempt.timeSpentSeconds / 60)} นาที)</div>
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
            <div key={ch.id} className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-5 rounded-xl space-y-2 shadow-sm">
              <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono font-semibold uppercase">{ch.title}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-[#141413] dark:text-[#faf9f5]">
                  {ch.score.correct} / {ch.score.total}
                </span>
                <span className={`text-sm font-mono font-bold ${pct >= 70 ? 'text-[#5db872]' : 'text-[#c64545]'}`}>
                  {pct}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#e6dfd8] dark:bg-[#252320] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${pct >= 70 ? 'bg-[#5db872]' : 'bg-[#c64545]'}`}
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
          <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#cc785c]" />
            เฉลยละเอียดและคำอธิบายทีละข้อ (Solutions)
          </h2>

          <div className="flex items-center space-x-2 bg-[#faf9f5] dark:bg-[#1f1e1b] p-1 rounded-xl border border-[#e6dfd8] dark:border-[#252320] self-start sm:self-auto">
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                reviewFilter === 'all' ? 'bg-[#cc785c] text-white' : 'text-[#6c6a64] dark:text-[#a09d96]'
              }`}
            >
              ทั้งหมด ({questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                reviewFilter === 'wrong' ? 'bg-[#c64545] text-white' : 'text-[#6c6a64] dark:text-[#a09d96]'
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
                    ? 'bg-[#faf9f5] dark:bg-[#1f1e1b] border-[#e6dfd8] dark:border-[#252320]' 
                    : 'bg-[#c64545]/5 border-[#c64545]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] px-2.5 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                      ข้อที่ {questions.findIndex(x => x.id === q.id) + 1}
                    </span>
                    <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
                      {q.chapterId.toUpperCase()} • {q.topic}
                    </span>
                  </div>

                  <span className={`text-xs font-semibold flex items-center space-x-1 ${
                    isCorrect ? 'text-[#5db872]' : 'text-[#c64545]'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{isCorrect ? 'ตอบถูก' : 'ตอบผิด'}</span>
                  </span>
                </div>

                <div className="text-sm sm:text-base font-serif text-[#141413] dark:text-[#faf9f5] mb-3">
                  <LatexRenderer content={q.question} />
                </div>

                {/* Options display with KaTeX */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = 'bg-[#f5f0e8] dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] text-[#6c6a64] dark:text-[#a09d96]';
                    if (optIdx === q.correctAnswer) {
                      optStyle = 'bg-[#5db872]/15 border-[#5db872] text-[#5db872] font-semibold';
                    } else if (optIdx === userChosen && !isCorrect) {
                      optStyle = 'bg-[#c64545]/15 border-[#c64545] text-[#c64545] line-through';
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
                          <span className="text-xs font-mono font-bold text-[#5db872]">
                            ✓ คำตอบที่ถูกต้อง
                          </span>
                        )}
                        {optIdx === userChosen && !isCorrect && (
                          <span className="text-xs font-mono font-bold text-[#c64545]">
                            ✗ คุณเลือกข้อนี้
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box with KaTeX */}
                <div className="p-4 rounded-xl bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] text-xs space-y-1">
                  <div className="font-bold text-[#141413] dark:text-[#faf9f5] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
                    <span>คำอธิบายเฉลยและวิธีคิด:</span>
                  </div>
                  <div className="text-[#3d3d3a] dark:text-[#a09d96] leading-relaxed">
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
            className="px-6 py-3 rounded-xl bg-[#efe9de] dark:bg-[#252320] hover:bg-[#e8e0d2] text-[#141413] dark:text-[#faf9f5] font-semibold text-xs border border-[#e6dfd8] dark:border-[#3d3d3a] inline-flex items-center space-x-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำข้อสอบใหม่อีกครั้ง</span>
          </button>
        </div>

      </div>

    </div>
  );
};
