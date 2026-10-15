import React, { useState, useEffect } from 'react';
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
  Copy, 
  Box 
} from 'lucide-react';
import { WaterTank3D } from './three/WaterTank3D';
import { KMapTorus3D } from './three/KMapTorus3D';
import { LogicGate3D } from './three/LogicGate3D';

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
  const [noteCopied, setNoteCopied] = useState(false);

  // Embedded 3D States for Classroom View
  const [classWaterLevel, setClassWaterLevel] = useState<number>(20);
  const [classFsmState, setClassFsmState] = useState<0 | 1>(0);
  const classSensorA = classWaterLevel >= 30 ? 1 : 0;
  const classSensorB = classWaterLevel >= 75 ? 1 : 0;
  const classPumpOutput = classFsmState === 0 ? 1 : 0;

  useEffect(() => {
    if (selectedLessonId !== 'ch5-6') return;
    const interval = setInterval(() => {
      setClassWaterLevel(prev => {
        if (classPumpOutput === 1) {
          return Math.min(prev + 4, 95);
        } else {
          return Math.max(prev - 3, 5);
        }
      });
    }, 400);
    return () => clearInterval(interval);
  }, [classPumpOutput, selectedLessonId]);

  useEffect(() => {
    if (classFsmState === 0) {
      if (classSensorA === 1 && classSensorB === 1) setClassFsmState(1);
    } else {
      if (classSensorA === 0 && classSensorB === 0) setClassFsmState(0);
    }
  }, [classSensorA, classSensorB, classFsmState]);

  // K-Map Torus state for classroom
  const [classKmapCells, setClassKmapCells] = useState<Record<number, '0' | '1' | 'X'>>({
    0: '1', 1: '0', 2: '1', 3: '0',
    4: '0', 5: '0', 6: '0', 7: '0',
    8: '1', 9: '0', 10: '1', 11: '0',
    12: '0', 13: '0', 14: '0', 15: '0'
  });
  const toggleClassKmapCell = (idx: number) => {
    setClassKmapCells(prev => ({
      ...prev,
      [idx]: prev[idx] === '1' ? '0' : '1'
    }));
  };

  // Logic Gate 3D state for classroom
  const [classGateType, setClassGateType] = useState<'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'NOT'>('AND');
  const [classGateA, setClassGateA] = useState<number>(1);
  const [classGateB, setClassGateB] = useState<number>(0);
  const classGateOutput = (() => {
    if (classGateType === 'AND') return (classGateA && classGateB) ? 1 : 0;
    if (classGateType === 'OR') return (classGateA || classGateB) ? 1 : 0;
    if (classGateType === 'NAND') return !(classGateA && classGateB) ? 1 : 0;
    if (classGateType === 'NOR') return !(classGateA || classGateB) ? 1 : 0;
    if (classGateType === 'XOR') return (classGateA !== classGateB) ? 1 : 0;
    if (classGateType === 'NOT') return classGateA === 1 ? 0 : 1;
    return 0;
  })();

  const currentLesson = CURRICULUM_DATA.find(l => l.id === selectedLessonId) || CURRICULUM_DATA[0];
  const currentIndex = CURRICULUM_DATA.findIndex(l => l.id === selectedLessonId);
  const prevLesson = currentIndex > 0 ? CURRICULUM_DATA[currentIndex - 1] : null;
  const nextLesson = currentIndex < CURRICULUM_DATA.length - 1 ? CURRICULUM_DATA[currentIndex + 1] : null;
  const isCompleted = completedLessons.includes(currentLesson.id);
  const currentNote = notes[currentLesson.id] || '';

  // Arrow navigation shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && nextLesson) {
        setSelectedLessonId(nextLesson.id);
      } else if (e.key === 'ArrowLeft' && prevLesson) {
        setSelectedLessonId(prevLesson.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevLesson, nextLesson, setSelectedLessonId]);

  const filteredLessons = CURRICULUM_DATA.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyNoteToClipboard = () => {
    if (!currentNote) return;
    navigator.clipboard.writeText(currentNote);
    setNoteCopied(true);
    setTimeout(() => setNoteCopied(false), 2000);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all ${theaterMode ? 'max-w-full px-2' : ''}`}>
      
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-3 sm:p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8] hover:text-[#0066cc] dark:hover:text-[#38bdf8] flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>กลับแดชบอร์ด</span>
          </button>
          <span className="text-[#e2e8f0] dark:border-[#334155]">|</span>
          <span className="text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-0.5 rounded-full border border-[#0066cc]/20 hidden sm:inline-block font-semibold">
            {currentLesson.chapterTitle}
          </span>
          <span className="text-xs text-[#64748b] dark:text-[#94a3b8] flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
            {currentLesson.durationMinutes} นาที
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Syllabus Toggle for Mobile and Desktop */}
          {!theaterMode && (
            <button
              onClick={() => setSyllabusCollapsed(prev => !prev)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#f8fafc] dark:bg-[#1e293b] hover:bg-[#f1f5f9] text-[#0f172a] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155] flex items-center space-x-1.5 transition cursor-pointer"
              title={syllabusCollapsed ? 'แสดงแถบสารบัญ' : 'ซ่อนแถบสารบัญเพื่อขยายหน้าจอ'}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0066cc]" />
              <span className="hidden sm:inline">{syllabusCollapsed ? 'เปิดสารบัญ' : 'ซ่อนสารบัญ'}</span>
            </button>
          )}

          {/* Theater Mode Toggle */}
          <button
            onClick={() => setTheaterMode(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center space-x-1.5 transition cursor-pointer ${
              theaterMode 
                ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-xs' 
                : 'bg-[#f8fafc] dark:bg-[#1e293b] hover:bg-[#f1f5f9] text-[#0f172a] dark:text-[#f8fafc] border-[#e2e8f0] dark:border-[#334155]'
            }`}
            title={theaterMode ? 'ออกจากโหมดโฟกัส' : 'เปิดโหมดไม่มีสิ่งรบกวน (Theater Mode)'}
          >
            {theaterMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>ออกจากโหมดโฟกัส</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">โหมดโฟกัส (Theater)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 2-Column Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Collapsible Syllabus Navigation (4 cols) */}
        {!theaterMode && !syllabusCollapsed && (
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4 sticky top-20 order-2 lg:order-1">
            <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-4 sm:p-5 space-y-4 shadow-xs">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-heading font-bold text-[#0f172a] dark:text-[#f8fafc]">
                    สารบัญบทเรียน
                  </h3>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">
                    {completedLessons.length} / {CURRICULUM_DATA.length} เรียนจบแล้ว
                  </p>
                </div>
              </div>

              {/* Search filter in playlist */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาบทเรียน..."
                  className="w-full bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0f172a] dark:text-[#f8fafc] placeholder-[#94a3b8] focus:outline-none focus:border-[#0066cc]"
                />
              </div>

              {/* Lesson Items grouped by chapter */}
              <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {(['ch3', 'ch4', 'ch5'] as const).map(chapId => {
                  const chapLessons = filteredLessons.filter(l => l.chapterId === chapId);
                  if (chapLessons.length === 0) return null;

                  const chapTitle = chapId === 'ch3' ? 'บทที่ 3: Digital Circuit' : chapId === 'ch4' ? 'บทที่ 4: Simplification' : 'บทที่ 5: Sequential & FSM';

                  return (
                    <div key={chapId} className="space-y-1.5">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066cc] dark:text-[#38bdf8] px-1 pt-1">
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
                              className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between cursor-pointer ${
                                active 
                                  ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] font-bold border border-[#0066cc]/25 shadow-xs' 
                                  : 'text-[#64748b] dark:text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-2">
                                {done ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                                )}
                                <span className="truncate">{l.title}</span>
                              </div>
                              <span className="text-xs font-mono text-[#94a3b8] shrink-0">
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
          </aside>
        )}

        {/* Right / Central Column: Lesson Content Area */}
        <main className={`${theaterMode || syllabusCollapsed ? 'lg:col-span-12' : 'lg:col-span-8 xl:col-span-9'} space-y-6 order-1 lg:order-2`}>
          
          {/* Lesson Header Card */}
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-1 rounded-full border border-[#0066cc]/20">
                  {currentLesson.chapterId.toUpperCase()}
                </span>
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">
                  {currentLesson.slideRef}
                </span>
              </div>

              {/* Complete Toggle Button */}
              <button
                onClick={() => toggleLessonCompleted(currentLesson.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all duration-200 cursor-pointer ${
                  isCompleted 
                    ? 'bg-[#10b981] text-white shadow-xs' 
                    : 'bg-[#f8fafc] dark:bg-[#1e293b] hover:border-[#0066cc] text-[#0f172a] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155]'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-[#64748b]'}`} />
                <span>{isCompleted ? 'เรียนจบแล้ว (ติ๊กถูก)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
              </button>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              {currentLesson.subtitle}
            </p>

            {/* Overview Box */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-xs text-[#475569] dark:text-[#94a3b8] flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="text-[#0f172a] dark:text-[#f8fafc]">สรุปภาพรวม: </strong>
                <LatexRenderer content={currentLesson.summary} />
              </div>
            </div>
          </div>

          {/* Detailed Lesson Sections */}
          <div className="space-y-6">
            {currentLesson.sections.map((section, idx) => (
              <article 
                key={idx} 
                className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs"
              >
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc]">
                  {section.title}
                </h2>

                {/* Main Content with KaTeX Math Rendering */}
                <div className="text-sm text-[#475569] dark:text-[#94a3b8] leading-relaxed">
                  <LatexRenderer content={section.content} />
                </div>

                {/* Key Formulas Section */}
                {section.formulas && section.formulas.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] mb-2 font-mono">
                      สูตรและสมการสำคัญที่ต้องจำ:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.formulas.map((f, fIdx) => (
                        <div key={fIdx} className="bg-[#f8fafc] dark:bg-[#1e293b] p-3.5 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] space-y-1">
                          <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">{f.label}</div>
                          <div className="overflow-x-auto py-1">
                            <MathView math={f.formula} displayMode={true} className="text-[#0f172a] dark:text-[#f8fafc]" />
                          </div>
                          {f.note && (
                            <div className="text-xs text-[#64748b] dark:text-[#94a3b8] italic">{f.note}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Highlights Bullet List */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] mb-2">
                      จุดสังเกตสำคัญ:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#475569] dark:text-[#94a3b8]">
                      {section.keyPoints.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                          <span><LatexRenderer content={h} className="inline" /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exam Tip Callout Box */}
                {section.examTip && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/25 space-y-1.5 text-xs">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-700 dark:text-amber-300">
                      <span>💡 ข้อควรระวังในห้องสอบ (ดร. ปวีณ เน้นย้ำ):</span>
                    </div>
                    <div className="text-[#475569] dark:text-[#f8fafc] leading-relaxed">
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
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 hover:bg-[#0066cc]/20 border border-[#0066cc]/25 transition shadow-xs cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8]" />
                      <span>เปิดแล็บจำลอง Interactive เพื่อทดสอบหัวข้อนี้ทันที</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Interactive 3D Labs for Key Visual Concepts */}
          {currentLesson.id === 'ch5-6' && (
            <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <Box className="w-5 h-5 text-[#0066cc]" />
                    แบบจำลองถังพักน้ำ 3D Interactive (Three.js WebGL)
                  </h3>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                    คลิกลากเพื่อหมุน 360° | ทุ่นลอยตรวจจับระดับล่าง a (30%) และบน b (75%) ควบคุมปั๊มสูบน้ำเข้าถังอัตโนมัติ
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveSimulatorTab('fsm');
                    setCurrentTab('simulators');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 hover:bg-[#0066cc]/20 border border-[#0066cc]/20 flex items-center space-x-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>ดูตาราง ROM เต็มในแล็บ</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <WaterTank3D
                waterLevel={classWaterLevel}
                setWaterLevel={setClassWaterLevel}
                fsmState={classFsmState}
                pumpOutput={classPumpOutput}
                sensorA={classSensorA}
                sensorB={classSensorB}
              />
            </div>
          )}

          {currentLesson.id === 'ch4-3' && (
            <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <Box className="w-5 h-5 text-[#7c3aed]" />
                    แบบจำลอง 3D Torus (Donut Topology) ของ K-Map 4 ตัวแปร
                  </h3>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                    คลิกลากเพื่อหมุนดูพื้นผิวโดนัท | ช่องที่อยู่ขอบนอกสุดของตาราง 2D จะม้วนมาแตะชิดกันเป็นผืนเดียวกันในมิติ 3D
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveSimulatorTab('kmap');
                    setCurrentTab('simulators');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#7c3aed] dark:text-[#c4b5fd] bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 hover:bg-[#7c3aed]/20 border border-[#7c3aed]/20 flex items-center space-x-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>เปิด K-Map Solver</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3.5 bg-[#f8fafc] dark:bg-[#1e293b] rounded-2xl border border-[#e2e8f0] dark:border-[#334155] text-xs text-[#475569] dark:text-[#f8fafc]">
                <strong className="text-[#7c3aed]">ทำไม 4 มุมถึงยุบรวมได้?:</strong> เมื่อมองบนผืนผิว 3D Torus มุมทั้งสี่ (<MathView math="m_0, m_2, m_8, m_{10}" />) จะมาบรรจบกันพอดีเป็นสี่เหลี่ยม 4 ช่องที่ต่อเนื่องกัน จึงสามารถยุบรวมตัดตัวแปร A และ C ออก เหลือเพียงสมการ <MathView math="B'D'" />
              </div>

              <KMapTorus3D
                kmapCells={classKmapCells}
                onCellToggle={toggleClassKmapCell}
              />
            </div>
          )}

          {currentLesson.id === 'ch3-2' && (
            <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <Box className="w-5 h-5 text-[#0066cc]" />
                    แบบจำลองชิปไอซีจริง DIP-14 บนเบรดบอร์ด 3D (Three.js WebGL)
                  </h3>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                    จำลองต่อวงจรดิจิทัลจริงบน Breadboard ด้วยชิปตระกูล 74xx พร้อมสังเกตหลอดไฟ LED ที่สว่างเมื่อได้ Logic 1
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1.5 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
                  {(['AND', 'OR', 'NAND', 'NOR', 'XOR', 'NOT'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setClassGateType(g)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                        classGateType === g
                          ? 'bg-[#0066cc] text-white shadow-xs'
                          : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <LogicGate3D
                gateType={classGateType}
                inputA={classGateA}
                inputB={classGateB}
                output={classGateOutput}
                setInputA={setClassGateA}
                setInputB={setClassGateB}
              />
            </div>
          )}

          {/* Bottom Lesson Navigation */}
          <div className="flex items-center justify-between py-4 border-t border-[#e2e8f0] dark:border-[#1e293b]">
            {prevLesson ? (
              <button
                onClick={() => setSelectedLessonId(prevLesson.id)}
                className="flex items-center space-x-2 text-xs font-medium text-[#64748b] dark:text-[#94a3b8] hover:text-[#0066cc] dark:hover:text-[#38bdf8] transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs text-[#94a3b8]">บทเรียนก่อนหน้า (←)</div>
                  <div className="font-semibold truncate max-w-[150px] sm:max-w-[200px]">{prevLesson.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => setSelectedLessonId(nextLesson.id)}
                className="flex items-center space-x-2 text-xs font-medium text-[#0066cc] dark:text-[#38bdf8] hover:text-[#0052a3] transition cursor-pointer"
              >
                <div className="text-right">
                  <div className="text-xs text-[#94a3b8]">บทเรียนถัดไป (→)</div>
                  <div className="font-semibold truncate max-w-[150px] sm:max-w-[200px]">{nextLesson.title}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>

          {/* Study Companion Tabs (Notes / Resources / Quick Quiz) */}
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl overflow-hidden shadow-xs">
            <div className="flex border-b border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#0b0f19]">
              <button
                onClick={() => setActiveBottomTab('notes')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition cursor-pointer ${
                  activeBottomTab === 'notes' 
                    ? 'border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] bg-white dark:bg-[#131b2e]' 
                    : 'border-transparent text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a]'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>สมุดจดโน้ตส่วนตัว (Auto-Save)</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('resources')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition cursor-pointer ${
                  activeBottomTab === 'resources' 
                    ? 'border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] bg-white dark:bg-[#131b2e]' 
                    : 'border-transparent text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a]'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>สรุปสูตร & แหล่งอ้างอิง</span>
              </button>
              <button
                onClick={() => setActiveBottomTab('quiz')}
                className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center space-x-2 border-b-2 transition cursor-pointer ${
                  activeBottomTab === 'quiz' 
                    ? 'border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] bg-white dark:bg-[#131b2e]' 
                    : 'border-transparent text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>แบบฝึกหัดท้ายบท ({currentLesson.quickQuiz.length})</span>
              </button>
            </div>

            {/* Tab 1: Notes Content */}
            {activeBottomTab === 'notes' && (
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
                  <span>พิมพ์บันทึกหรือสูตรที่อยากเน้น (บันทึกอัตโนมัติในเบราว์เซอร์ของคุณ):</span>
                  <div className="flex items-center space-x-2">
                    {lastSavedTime && (
                      <span className="text-xs text-[#10b981] font-mono">
                        ✓ บันทึกเมื่อ {lastSavedTime}
                      </span>
                    )}
                    {currentNote && (
                      <button
                        onClick={copyNoteToClipboard}
                        className="text-xs text-[#0066cc] dark:text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{noteCopied ? 'คัดลอกแล้ว!' : 'คัดลอกโน้ต'}</span>
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={currentNote}
                  onChange={(e) => updateNote(currentLesson.id, e.target.value)}
                  placeholder="พิมพ์ข้อความสรุป สูตร หรือข้อสังเกตส่วนตัวสำหรับบทเรียนนี้..."
                  rows={5}
                  className="w-full bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-2xl p-4 text-sm text-[#0f172a] dark:text-[#f8fafc] placeholder-[#94a3b8] focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]/30 transition resize-y font-sans"
                />
              </div>
            )}

            {/* Tab 2: Resources Content */}
            {activeBottomTab === 'resources' && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] dark:bg-[#1e293b] p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
                    <h4 className="text-xs font-mono font-bold text-[#0f172a] dark:text-[#f8fafc] mb-1">
                      เอกสารสไลด์อ้างอิง
                    </h4>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                      {currentLesson.slideRef} โดย ดร. ปวีณ เขื่อนแก้ว CS MJU
                    </p>
                    <span className="text-xs text-[#0066cc] dark:text-[#38bdf8] font-mono bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-0.5 rounded-full border border-[#0066cc]/20">
                      มีในโฟลเดอร์ Digital Logic Slide
                    </span>
                  </div>

                  <div className="bg-[#f8fafc] dark:bg-[#1e293b] p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
                    <h4 className="text-xs font-mono font-bold text-[#0f172a] dark:text-[#f8fafc] mb-1">
                      เอกสารสรุป 1 แผ่น A4 พกเข้าห้องสอบ
                    </h4>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                      ตามกติกาการสอบปลายภาค อนุญาตให้นำกระดาษ A4 เข้าได้ 1 แผ่น
                    </p>
                    <button
                      onClick={() => setCurrentTab('cheatsheet')}
                      className="text-xs font-bold text-[#0066cc] dark:text-[#38bdf8] hover:underline flex items-center space-x-1 cursor-pointer"
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
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                  ทดสอบความเข้าใจทันทีเพื่อวัดว่าจับประเด็นสำคัญของบทเรียนนี้ได้ครบหรือไม่:
                </p>

                {currentLesson.quickQuiz.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctAnswer;
                  const showResult = showQuizResults[q.id];

                  return (
                    <div key={q.id} className="bg-[#f8fafc] dark:bg-[#1e293b] p-5 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc]">
                          <span>{qIdx + 1}. </span>
                          <LatexRenderer content={q.question} className="inline" />
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#f1f5f9] dark:bg-[#0b0f19] text-[#64748b] dark:text-[#94a3b8] border border-[#e2e8f0] dark:border-[#334155] shrink-0 font-semibold">
                          {q.difficulty}
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          let optClass = 'bg-white dark:bg-[#131b2e] border-[#e2e8f0] dark:border-[#334155] text-[#475569] dark:text-[#f8fafc] hover:border-[#0066cc]';
                          if (isAnswered && showResult) {
                            if (optIdx === q.correctAnswer) {
                              optClass = 'bg-[#10b981]/15 border-[#10b981] text-[#10b981] font-bold';
                            } else if (selectedOpt === optIdx) {
                              optClass = 'bg-red-500/15 border-red-500 text-red-500 font-medium';
                            }
                          } else if (selectedOpt === optIdx) {
                            optClass = 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] text-[#0066cc] dark:text-[#38bdf8] font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={showResult}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${optClass}`}
                            >
                              <div>
                                <LatexRenderer content={opt} className="inline" />
                              </div>
                              {showResult && optIdx === q.correctAnswer && (
                                <Check className="w-4 h-4 text-[#10b981]" />
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
                          className="mt-2 px-4 py-2 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] disabled:opacity-40 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                        >
                          ตรวจคำตอบ
                        </button>
                      ) : (
                        <div className={`mt-3 p-3.5 rounded-xl text-xs leading-relaxed ${
                          isCorrect ? 'bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981]' : 'bg-red-500/15 border border-red-500/40 text-red-500'
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

          {/* Bottom Lesson Navigation Bar (UX Flow Milestone) */}
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => setSelectedLessonId(prevLesson.id)}
                className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#0b0f19] hover:border-[#0066cc]/50 text-[#0f172a] dark:text-[#f8fafc] text-xs font-semibold transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#0066cc]" />
                <div className="text-left">
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">บทก่อนหน้า</div>
                  <div className="font-bold truncate max-w-[180px]">{prevLesson.title}</div>
                </div>
              </button>
            ) : <div className="hidden sm:block" />}

            <button
              onClick={() => toggleLessonCompleted(currentLesson.id)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer ${
                isCompleted 
                  ? 'bg-[#10b981] text-white shadow-[#10b981]/25' 
                  : 'bg-[#0066cc] hover:bg-[#0052a3] text-white shadow-[#0066cc]/25'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? '✓ เรียนจบบทนี้แล้ว' : 'ทำเครื่องหมายว่าเรียนจบ'}</span>
            </button>

            {nextLesson ? (
              <button
                onClick={() => setSelectedLessonId(nextLesson.id)}
                className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-4 py-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#0b0f19] hover:border-[#0066cc]/50 text-[#0f172a] dark:text-[#f8fafc] text-xs font-semibold transition cursor-pointer"
              >
                <div className="text-right">
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">บทถัดไป</div>
                  <div className="font-bold truncate max-w-[180px]">{nextLesson.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0066cc]" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab('exam')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#0066cc] to-[#7c3aed] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <span>เริ่มทำข้อสอบ Final</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </main>

      </div>

    </div>
  );
};
