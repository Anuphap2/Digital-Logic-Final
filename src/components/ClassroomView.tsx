import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FileEdit, 
  BookMarked, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  Search,
  Sparkles,
  ChevronDown,
  Layers,
  Check,
  RotateCcw
} from 'lucide-react';

export const ClassroomView: React.FC = () => {
  const { 
    selectedLessonId, 
    setSelectedLessonId, 
    completedLessons, 
    toggleLessonCompleted,
    notes,
    updateNote,
    theaterMode,
    setTheaterMode,
    lastSavedTime,
    setActiveSimulatorTab,
    setCurrentTab
  } = useApp();

  const [activeBottomTab, setActiveBottomTab] = useState<'notes' | 'resources' | 'quiz'>('notes');
  const [syllabusCollapsed, setSyllabusCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<string, boolean>>({});

  // Find active lesson
  const currentLessonIndex = CURRICULUM_DATA.findIndex(l => l.id === selectedLessonId);
  const currentLesson = CURRICULUM_DATA[currentLessonIndex] || CURRICULUM_DATA[0];

  const isCompleted = completedLessons.includes(currentLesson.id);

  // Note for current lesson
  const currentNote = notes[currentLesson.id] || '';

  // Previous & Next lesson navigation
  const prevLesson = currentLessonIndex > 0 ? CURRICULUM_DATA[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < CURRICULUM_DATA.length - 1 ? CURRICULUM_DATA[currentLessonIndex + 1] : null;

  // Filter lessons for syllabus search
  const filteredLessons = CURRICULUM_DATA.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all ${theaterMode ? 'max-w-full px-2' : ''}`}>
      
      {/* Top Action Bar in Classroom */}
      <div className="flex items-center justify-between mb-6 bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>กลับแดชบอร์ด</span>
          </button>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60 hidden sm:inline-block">
            {currentLesson.chapterTitle}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {currentLesson.durationMinutes} นาที
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Theater Mode Button (User requirement #2) */}
          <button
            onClick={() => setTheaterMode(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition ${
              theaterMode 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title={theaterMode ? 'ออกจากโหมดโฟกัส' : 'เปิดโหมดไม่มีสิ่งรบกวน (Theater Mode)'}
          >
            {theaterMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>ออกจาก Theater Mode</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Theater Mode (โฟกัส)</span>
              </>
            )}
          </button>

          {/* Toggle Syllabus Sidebar */}
          {!theaterMode && (
            <button
              onClick={() => setSyllabusCollapsed(prev => !prev)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Classroom Layout (70-75% Left, 25-30% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Column (75% or 100% in Theater Mode) */}
        <div className={`${theaterMode || syllabusCollapsed ? 'lg:col-span-12' : 'lg:col-span-8 xl:col-span-9'} space-y-8`}>
          
          {/* Lesson Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800">
                  {currentLesson.chapterId.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">
                  {currentLesson.slideRef}
                </span>
              </div>

              {/* Complete Toggle Button with Micro-interaction */}
              <button
                onClick={() => toggleLessonCompleted(currentLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/20 scale-105' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{isCompleted ? 'เรียนจบแล้ว (ติ๊กถูก)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentLesson.subtitle}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">สรุปภาพรวม: </strong>
                {currentLesson.summary}
              </span>
            </div>
          </div>

          {/* Detailed Lesson Sections */}
          <div className="space-y-6">
            {currentLesson.sections.map((section, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4"
              >
                <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center space-x-2">
                  <span>{section.title}</span>
                </h2>

                {/* Formatted Content */}
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                  {section.content}
                </div>

                {/* Formulas Callout */}
                {section.formulas && section.formulas.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                      สูตรสำคัญที่ต้องจำ:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.formulas.map((f, fIdx) => (
                        <div key={fIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <div className="text-xs text-slate-400">{f.label}</div>
                          <div className="font-mono text-cyan-300 font-bold text-sm overflow-x-auto py-1">
                            {f.formula}
                          </div>
                          {f.note && (
                            <div className="text-[11px] text-slate-500 italic">{f.note}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-slate-200 mb-2">ประเด็นสำคัญ:</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {section.keyPoints.map((kp, kpIdx) => (
                        <li key={kpIdx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exam Tip Callout */}
                {section.examTip && (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1">
                    <div className="font-bold text-amber-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>จุดที่ข้อสอบชอบหลอก (Exam Trap):</span>
                    </div>
                    <p className="text-amber-200/90 leading-relaxed">
                      {section.examTip}
                    </p>
                  </div>
                )}

                {/* Embedded Simulator Launcher if relevant */}
                {section.interactiveType && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveSimulatorTab(section.interactiveType!);
                        setCurrentTab('simulators');
                      }}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800 transition shadow-sm"
                    >
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>เปิดแล็บจำลอง Interactive เพื่อทดสอบหัวข้อนี้ทันที</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lesson Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {prevLesson ? (
              <button
                onClick={() => setSelectedLessonId(prevLesson.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center space-x-2 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="truncate max-w-[140px] sm:max-w-xs">{prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson && (
              <button
                onClick={() => setSelectedLessonId(nextLesson.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-500/30 flex items-center space-x-2 transition shadow-md shadow-cyan-500/10"
              >
                <span className="truncate max-w-[140px] sm:max-w-xs">{nextLesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom Tabs (User requirement: Notes, Resources, Q&A / Quick Quiz) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            
            {/* Tab Headers */}
            <div className="flex border-b border-slate-800 bg-slate-950/50">
              <button
                onClick={() => setActiveBottomTab('notes')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeBottomTab === 'notes' 
                    ? 'border-cyan-400 text-cyan-400 bg-slate-900' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>จดโน้ตส่วนตัว (Auto-Save)</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('resources')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeBottomTab === 'resources' 
                    ? 'border-cyan-400 text-cyan-400 bg-slate-900' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>สรุปสูตร & แหล่งอ้างอิง</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('quiz')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeBottomTab === 'quiz' 
                    ? 'border-cyan-400 text-cyan-400 bg-slate-900' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>แบบฝึกหัดท้ายบท ({currentLesson.quickQuiz.length})</span>
              </button>
            </div>

            {/* Tab 1: Notes Content */}
            {activeBottomTab === 'notes' && (
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>พิมพ์บันทึกหรือสูตรที่อยากเน้น (บันทึกอัตโนมัติในเบราว์เซอร์ของคุณ):</span>
                  {lastSavedTime && (
                    <span className="text-[11px] text-emerald-400 font-mono">
                      ✓ บันทึกเมื่อ {lastSavedTime}
                    </span>
                  )}
                </div>
                <textarea
                  value={currentNote}
                  onChange={(e) => updateNote(currentLesson.id, e.target.value)}
                  placeholder="พิมพ์ข้อความสรุป สูตร หรือข้อสังเกตส่วนตัวสำหรับบทเรียนนี้..."
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition resize-y font-sans"
                />
              </div>
            )}

            {/* Tab 2: Resources Content */}
            {activeBottomTab === 'resources' && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-mono font-bold text-slate-200 mb-1">
                      เอกสารสไลด์อ้างอิง
                    </h4>
                    <p className="text-xs text-slate-400 mb-3">
                      {currentLesson.slideRef} โดย ดร. ปวีณ เขื่อนแก้ว CS MJU
                    </p>
                    <span className="text-[11px] text-cyan-400 font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                      มีในโฟลเดอร์ Digital Logic Slide
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-mono font-bold text-slate-200 mb-1">
                      เอกสารสรุป 1 แผ่น A4 พกเข้าห้องสอบ
                    </h4>
                    <p className="text-xs text-slate-400 mb-3">
                      ตามกติกาการสอบปลายภาค อนุญาตให้นำกระดาษ A4 เข้าได้ 1 แผ่น
                    </p>
                    <button
                      onClick={() => setCurrentTab('cheatsheet')}
                      className="text-xs font-bold text-indigo-300 hover:text-indigo-200 flex items-center space-x-1"
                    >
                      <span>เปิดเอกสารสรุป A4 (พร้อมสั่งพิมพ์)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Quick Quiz Content */}
            {activeBottomTab === 'quiz' && (
              <div className="p-6 space-y-6">
                <p className="text-xs text-slate-400">
                  ทดสอบความเข้าใจทันทีเพื่อวัดว่าจับประเด็นสำคัญของบทเรียนนี้ได้ครบหรือไม่:
                </p>

                {currentLesson.quickQuiz.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctAnswer;
                  const showResult = showQuizResults[q.id];

                  return (
                    <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-200">
                          {qIdx + 1}. {q.question}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          let optClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                          if (isAnswered && showResult) {
                            if (optIdx === q.correctAnswer) {
                              optClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (selectedOpt === optIdx) {
                              optClass = 'bg-rose-950/50 border-rose-500 text-rose-200';
                            }
                          } else if (selectedOpt === optIdx) {
                            optClass = 'bg-cyan-950/60 border-cyan-500 text-cyan-200';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={showResult}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full p-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${optClass}`}
                            >
                              <span>{opt}</span>
                              {showResult && optIdx === q.correctAnswer && (
                                <Check className="w-4 h-4 text-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Check Button */}
                      {!showResult ? (
                        <button
                          disabled={!isAnswered}
                          onClick={() => setShowQuizResults(prev => ({ ...prev, [q.id]: true }))}
                          className="mt-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold transition"
                        >
                          ตรวจคำตอบ
                        </button>
                      ) : (
                        <div className={`mt-3 p-3.5 rounded-lg text-xs leading-relaxed ${
                          isCorrect ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200' : 'bg-rose-950/40 border border-rose-800/60 text-rose-200'
                        }`}>
                          <div className="font-bold mb-1">
                            {isCorrect ? '✓ ถูกต้อง!' : '✗ ยังไม่ถูกต้อง'}
                          </div>
                          <div>{q.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* Collapsible Syllabus / Playlist Sidebar (25-30% Right) */}
        {!theaterMode && !syllabusCollapsed && (
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 sticky top-20">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-100">สารบัญบทเรียน</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {completedLessons.length} / {CURRICULUM_DATA.length} เรียนจบแล้ว
                  </p>
                </div>
                <button
                  onClick={() => setSyllabusCollapsed(true)}
                  className="text-xs text-slate-500 hover:text-slate-300"
                  title="พับเก็บสารบัญ"
                >
                  ซ่อนแถบ
                </button>
              </div>

              {/* Search filter in playlist */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาบทเรียนหรือหัวข้อ..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              {/* Lesson Items grouped by Chapter */}
              <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {(['ch3', 'ch4', 'ch5'] as const).map(chapId => {
                  const chapLessons = filteredLessons.filter(l => l.chapterId === chapId);
                  if (chapLessons.length === 0) return null;

                  const chapTitle = chapId === 'ch3' ? 'Chapter 3: Digital Circuit' : chapId === 'ch4' ? 'Chapter 4: Simplification' : 'Chapter 5: Sequential & FSM';

                  return (
                    <div key={chapId} className="space-y-1.5">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-1 pt-1">
                        {chapTitle}
                      </div>

                      <div className="space-y-1">
                        {chapLessons.map(l => {
                          const active = l.id === selectedLessonId;
                          const done = completedLessons.includes(l.id);

                          return (
                            <button
                              key={l.id}
                              onClick={() => setSelectedLessonId(l.id)}
                              className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between ${
                                active 
                                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-medium' 
                                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                {done ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                                )}
                                <span className="truncate">{l.title}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                {l.durationMinutes}m
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
