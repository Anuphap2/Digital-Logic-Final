import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { LatexRenderer, MathView } from './LatexRenderer';
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

  const currentLessonIndex = CURRICULUM_DATA.findIndex(l => l.id === selectedLessonId);
  const currentLesson = CURRICULUM_DATA[currentLessonIndex] || CURRICULUM_DATA[0];

  const isCompleted = completedLessons.includes(currentLesson.id);
  const currentNote = notes[currentLesson.id] || '';

  const prevLesson = currentLessonIndex > 0 ? CURRICULUM_DATA[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < CURRICULUM_DATA.length - 1 ? CURRICULUM_DATA[currentLessonIndex + 1] : null;

  const filteredLessons = CURRICULUM_DATA.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all ${theaterMode ? 'max-w-full px-2' : ''}`}>
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-6 bg-[#f5f0e8] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-3.5 rounded-xl">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="text-xs font-medium text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413] dark:hover:text-[#faf9f5] flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>กลับแดชบอร์ด</span>
          </button>
          <span className="text-[#e6dfd8] dark:text-[#252320]">|</span>
          <span className="text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] px-2 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a] hidden sm:inline-block">
            {currentLesson.chapterTitle}
          </span>
          <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#cc785c]" />
            {currentLesson.durationMinutes} นาที
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Theater Mode Button */}
          <button
            onClick={() => setTheaterMode(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition ${
              theaterMode 
                ? 'bg-[#cc785c] text-white border-[#cc785c]' 
                : 'bg-[#efe9de] dark:bg-[#252320] hover:bg-[#e8e0d2] text-[#3d3d3a] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#3d3d3a]'
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
              className="lg:hidden p-1.5 rounded-lg text-[#6c6a64] dark:text-[#a09d96] bg-[#efe9de] dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#252320]"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Column */}
        <div className={`${theaterMode || syllabusCollapsed ? 'lg:col-span-12' : 'lg:col-span-8 xl:col-span-9'} space-y-6`}>
          
          {/* Lesson Header Card */}
          <div className="bg-[#efe9de]/60 dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#cc785c] bg-[#faf9f5] dark:bg-[#181715] px-2.5 py-1 rounded-md border border-[#e6dfd8] dark:border-[#252320]">
                  {currentLesson.chapterId.toUpperCase()}
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
                  {currentLesson.slideRef}
                </span>
              </div>

              {/* Complete Toggle Button */}
              <button
                onClick={() => toggleLessonCompleted(currentLesson.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-[#5db872]/20 text-[#5db872] border border-[#5db872]/40' 
                    : 'bg-[#faf9f5] dark:bg-[#252320] hover:border-[#cc785c] text-[#3d3d3a] dark:text-[#faf9f5] border border-[#e6dfd8] dark:border-[#3d3d3a]'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#5db872]' : 'text-[#6c6a64]'}`} />
                <span>{isCompleted ? 'เรียนจบแล้ว (ติ๊กถูก)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#141413] dark:text-[#faf9f5] tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-[#3d3d3a] dark:text-[#a09d96] leading-relaxed">
              {currentLesson.subtitle}
            </p>

            <div className="p-4 rounded-xl bg-[#faf9f5] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] text-xs text-[#6c6a64] dark:text-[#a09d96] flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#cc785c] shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="text-[#141413] dark:text-[#faf9f5]">สรุปภาพรวม: </strong>
                <LatexRenderer content={currentLesson.summary} />
              </div>
            </div>
          </div>

          {/* Detailed Lesson Sections with KaTeX Equations */}
          <div className="space-y-6">
            {currentLesson.sections.map((section, idx) => (
              <div 
                key={idx} 
                className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 md:p-8 space-y-4 shadow-sm"
              >
                <h2 className="font-serif text-xl sm:text-2xl text-[#141413] dark:text-[#faf9f5] flex items-center space-x-2">
                  <span>{section.title}</span>
                </h2>

                {/* Formatted Content with KaTeX Math Rendering */}
                <div className="text-sm text-[#3d3d3a] dark:text-[#a09d96] leading-relaxed">
                  <LatexRenderer content={section.content} />
                </div>

                {/* Formulas Callout with KaTeX */}
                {section.formulas && section.formulas.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#cc785c]">
                      สูตรสำคัญที่ต้องจำ:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.formulas.map((f, fIdx) => (
                        <div key={fIdx} className="bg-[#f5f0e8] dark:bg-[#181715] p-3.5 rounded-xl border border-[#e6dfd8] dark:border-[#252320] space-y-1">
                          <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">{f.label}</div>
                          <div className="py-1">
                            <MathView math={f.formula} displayMode={true} className="text-[#141413] dark:text-[#faf9f5]" />
                          </div>
                          {f.note && (
                            <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] italic">
                              <LatexRenderer content={f.note} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-[#141413] dark:text-[#faf9f5] mb-2">ประเด็นสำคัญ:</div>
                    <ul className="space-y-1.5 text-xs text-[#3d3d3a] dark:text-[#a09d96]">
                      {section.keyPoints.map((kp, kpIdx) => (
                        <li key={kpIdx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] mt-1.5 shrink-0" />
                          <div className="flex-1"><LatexRenderer content={kp} /></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exam Tip Callout */}
                {section.examTip && (
                  <div className="p-4 rounded-xl bg-[#f5f0e8] dark:bg-[#252320] border-l-4 border-l-[#cc785c] border-y border-r border-[#e6dfd8] dark:border-[#252320] text-xs space-y-1">
                    <div className="font-bold text-[#cc785c] flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>จุดที่ข้อสอบชอบหลอก (Exam Trap):</span>
                    </div>
                    <div className="text-[#3d3d3a] dark:text-[#faf9f5] leading-relaxed">
                      <LatexRenderer content={section.examTip} />
                    </div>
                  </div>
                )}

                {/* Embedded Simulator Launcher */}
                {section.interactiveType && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveSimulatorTab(section.interactiveType!);
                        setCurrentTab('simulators');
                      }}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] hover:bg-[#e8e0d2] border border-[#e6dfd8] dark:border-[#3d3d3a] transition shadow-sm"
                    >
                      <Layers className="w-4 h-4 text-[#cc785c]" />
                      <span>เปิดแล็บจำลอง Interactive เพื่อทดสอบหัวข้อนี้ทันที</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lesson Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#e6dfd8] dark:border-[#252320]">
            {prevLesson ? (
              <button
                onClick={() => setSelectedLessonId(prevLesson.id)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#3d3d3a] dark:text-[#faf9f5] bg-[#efe9de] dark:bg-[#252320] hover:bg-[#e8e0d2] border border-[#e6dfd8] dark:border-[#3d3d3a] flex items-center space-x-2 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="truncate max-w-[140px] sm:max-w-xs">{prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson && (
              <button
                onClick={() => setSelectedLessonId(nextLesson.id)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#cc785c] hover:bg-[#a9583e] border border-[#cc785c] flex items-center space-x-2 transition shadow-sm"
              >
                <span className="truncate max-w-[140px] sm:max-w-xs">{nextLesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom Tabs: Notes, Resources, Quick Quiz */}
          <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl overflow-hidden shadow-sm">
            
            {/* Tab Headers */}
            <div className="flex border-b border-[#e6dfd8] dark:border-[#252320] bg-[#f5f0e8] dark:bg-[#181715]">
              <button
                onClick={() => setActiveBottomTab('notes')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeBottomTab === 'notes' 
                    ? 'border-[#cc785c] text-[#cc785c] bg-[#faf9f5] dark:bg-[#1f1e1b]' 
                    : 'border-transparent text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>จดโน้ตส่วนตัว (Auto-Save)</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('resources')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeBottomTab === 'resources' 
                    ? 'border-[#cc785c] text-[#cc785c] bg-[#faf9f5] dark:bg-[#1f1e1b]' 
                    : 'border-transparent text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>สรุปสูตร & แหล่งอ้างอิง</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('quiz')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition ${
                  activeBottomTab === 'quiz' 
                    ? 'border-[#cc785c] text-[#cc785c] bg-[#faf9f5] dark:bg-[#1f1e1b]' 
                    : 'border-transparent text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>แบบฝึกหัดท้ายบท ({currentLesson.quickQuiz.length})</span>
              </button>
            </div>

            {/* Tab 1: Notes Content */}
            {activeBottomTab === 'notes' && (
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                  <span>พิมพ์บันทึกหรือสูตรที่อยากเน้น (บันทึกอัตโนมัติในเบราว์เซอร์ของคุณ):</span>
                  {lastSavedTime && (
                    <span className="text-xs text-[#5db872] font-mono">
                      ✓ บันทึกเมื่อ {lastSavedTime}
                    </span>
                  )}
                </div>
                <textarea
                  value={currentNote}
                  onChange={(e) => updateNote(currentLesson.id, e.target.value)}
                  placeholder="พิมพ์ข้อความสรุป สูตร หรือข้อสังเกตส่วนตัวสำหรับบทเรียนนี้..."
                  rows={5}
                  className="w-full bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] rounded-xl p-4 text-sm text-[#141413] dark:text-[#faf9f5] placeholder-[#8e8b82] focus:outline-none focus:border-[#cc785c] focus:ring-1 focus:ring-[#cc785c]/30 transition resize-y font-sans"
                />
              </div>
            )}

            {/* Tab 2: Resources Content */}
            {activeBottomTab === 'resources' && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                    <h4 className="text-xs font-mono font-bold text-[#141413] dark:text-[#faf9f5] mb-1">
                      เอกสารสไลด์อ้างอิง
                    </h4>
                    <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-3">
                      {currentLesson.slideRef} โดย ดร. ปวีณ เขื่อนแก้ว CS MJU
                    </p>
                    <span className="text-xs text-[#cc785c] font-mono bg-[#efe9de] dark:bg-[#252320] px-2 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                      มีในโฟลเดอร์ Digital Logic Slide
                    </span>
                  </div>

                  <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                    <h4 className="text-xs font-mono font-bold text-[#141413] dark:text-[#faf9f5] mb-1">
                      เอกสารสรุป 1 แผ่น A4 พกเข้าห้องสอบ
                    </h4>
                    <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-3">
                      ตามกติกาการสอบปลายภาค อนุญาตให้นำกระดาษ A4 เข้าได้ 1 แผ่น
                    </p>
                    <button
                      onClick={() => setCurrentTab('cheatsheet')}
                      className="text-xs font-bold text-[#cc785c] hover:underline flex items-center space-x-1"
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
                <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                  ทดสอบความเข้าใจทันทีเพื่อวัดว่าจับประเด็นสำคัญของบทเรียนนี้ได้ครบหรือไม่:
                </p>

                {currentLesson.quickQuiz.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctAnswer;
                  const showResult = showQuizResults[q.id];

                  return (
                    <div key={q.id} className="bg-[#f5f0e8] dark:bg-[#181715] p-5 rounded-xl border border-[#e6dfd8] dark:border-[#252320] space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-[#141413] dark:text-[#faf9f5]">
                          <span>{qIdx + 1}. </span>
                          <LatexRenderer content={q.question} className="inline" />
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64] dark:text-[#8e8b82] border border-[#e6dfd8] dark:border-[#252320] shrink-0">
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          let optClass = 'bg-[#faf9f5] dark:bg-[#1f1e1b] border-[#e6dfd8] dark:border-[#252320] text-[#3d3d3a] dark:text-[#faf9f5] hover:border-[#cc785c]';
                          if (isAnswered && showResult) {
                            if (optIdx === q.correctAnswer) {
                              optClass = 'bg-[#5db872]/20 border-[#5db872] text-[#5db872] font-semibold';
                            } else if (selectedOpt === optIdx) {
                              optClass = 'bg-[#c64545]/20 border-[#c64545] text-[#c64545]';
                            }
                          } else if (selectedOpt === optIdx) {
                            optClass = 'bg-[#efe9de] dark:bg-[#252320] border-[#cc785c] text-[#cc785c] font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={showResult}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full p-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${optClass}`}
                            >
                              <div>
                                <LatexRenderer content={opt} className="inline" />
                              </div>
                              {showResult && optIdx === q.correctAnswer && (
                                <Check className="w-4 h-4 text-[#5db872]" />
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
                          className="mt-2 px-4 py-2 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] disabled:opacity-40 text-white text-xs font-semibold transition"
                        >
                          ตรวจคำตอบ
                        </button>
                      ) : (
                        <div className={`mt-3 p-3.5 rounded-lg text-xs leading-relaxed ${
                          isCorrect ? 'bg-[#5db872]/15 border border-[#5db872]/40 text-[#5db872]' : 'bg-[#c64545]/15 border border-[#c64545]/40 text-[#c64545]'
                        }`}>
                          <div className="font-bold mb-1">
                            {isCorrect ? '✓ ถูกต้อง!' : '✗ ยังไม่ถูกต้อง'}
                          </div>
                          <div><LatexRenderer content={q.explanation} /></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* Collapsible Syllabus / Playlist Sidebar */}
        {!theaterMode && !syllabusCollapsed && (
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 sticky top-20">
            <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-5 space-y-4 shadow-sm">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#141413] dark:text-[#faf9f5]">สารบัญบทเรียน</h3>
                  <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
                    {completedLessons.length} / {CURRICULUM_DATA.length} เรียนจบแล้ว
                  </p>
                </div>
                <button
                  onClick={() => setSyllabusCollapsed(true)}
                  className="text-xs text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  title="พับเก็บสารบัญ"
                >
                  ซ่อนแถบ
                </button>
              </div>

              {/* Search filter in playlist */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8e8b82]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาบทเรียนหรือหัวข้อ..."
                  className="w-full bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] rounded-xl pl-8 pr-3 py-2 text-xs text-[#141413] dark:text-[#faf9f5] placeholder-[#8e8b82] focus:outline-none focus:border-[#cc785c]"
                />
              </div>

              {/* Lesson Items */}
              <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {(['ch3', 'ch4', 'ch5'] as const).map(chapId => {
                  const chapLessons = filteredLessons.filter(l => l.chapterId === chapId);
                  if (chapLessons.length === 0) return null;

                  const chapTitle = chapId === 'ch3' ? 'Chapter 3: Digital Circuit' : chapId === 'ch4' ? 'Chapter 4: Simplification' : 'Chapter 5: Sequential & FSM';

                  return (
                    <div key={chapId} className="space-y-1.5">
                      <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#cc785c] px-1 pt-1">
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
                              className={`w-full text-left p-2.5 rounded-lg text-xs transition flex items-center justify-between ${
                                active 
                                  ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-semibold border border-[#e6dfd8] dark:border-[#3d3d3a]' 
                                  : 'text-[#6c6a64] dark:text-[#a09d96] hover:bg-[#f5f0e8] dark:hover:bg-[#181715] hover:text-[#141413] dark:hover:text-[#faf9f5] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                {done ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5db872] shrink-0" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-[#8e8b82] shrink-0" />
                                )}
                                <span className="truncate">{l.title}</span>
                              </div>
                              <span className="text-xs font-mono text-[#8e8b82] shrink-0">
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
