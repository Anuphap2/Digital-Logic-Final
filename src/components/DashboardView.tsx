import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { FINAL_EXAM_QUESTIONS } from '../data/quizData';
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Flame, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sliders, 
  FileText, 
  AlertCircle,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    completedLessons, 
    selectedLessonId, 
    setSelectedLessonId, 
    setCurrentTab, 
    resumeLearning,
    examAttempts,
    notes,
    setActiveSimulatorTab
  } = useApp();

  const totalLessons = CURRICULUM_DATA.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Active or last selected lesson
  const currentLesson = CURRICULUM_DATA.find(l => l.id === selectedLessonId) || CURRICULUM_DATA[0];

  // Group lessons by chapter
  const ch3Lessons = CURRICULUM_DATA.filter(l => l.chapterId === 'ch3');
  const ch4Lessons = CURRICULUM_DATA.filter(l => l.chapterId === 'ch4');
  const ch5Lessons = CURRICULUM_DATA.filter(l => l.chapterId === 'ch5');

  const getChapterProgress = (lessons: typeof CURRICULUM_DATA) => {
    const done = lessons.filter(l => completedLessons.includes(l.id)).length;
    return {
      done,
      total: lessons.length,
      pct: Math.round((done / lessons.length) * 100)
    };
  };

  const ch3Stats = getChapterProgress(ch3Lessons);
  const ch4Stats = getChapterProgress(ch4Lessons);
  const ch5Stats = getChapterProgress(ch5Lessons);

  // Best exam score
  const bestExamScore = examAttempts.length > 0 
    ? Math.max(...examAttempts.map(a => a.percentage)) 
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Welcome & Exam Alert Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                CS121 Final Prep
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                สอบปลายภาค: พก A4 เข้าได้ 1 แผ่น + เครื่องคิดเลข
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              เตรียมสอบปลายภาค Digital Logic & Smart Device
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              ครอบคลุมบทที่ 3 (Digital Circuit), บทที่ 4 (Simplification & K-Map) และบทที่ 5 (Sequential Circuit & FSM) ตามแนวการสอนของ ดร. ปวีณ เขื่อนแก้ว มหาวิทยาลัยแม่โจ้
            </p>
          </div>

          {/* Prominent Resume Learning Button (User requirement #1) */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={resumeLearning}
              className="group relative inline-flex items-center justify-center space-x-3 px-6 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-cyan-400/30"
            >
              <PlayCircle className="w-6 h-6 text-cyan-100 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-normal text-cyan-100 uppercase tracking-wider">เรียนต่อจากเดิม</div>
                <div className="text-sm font-semibold truncate max-w-[180px] sm:max-w-[220px]">
                  {currentLesson.title}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 ml-1 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout (User requirement: Bento UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Bento 1: Progress Card (2 cols on large screen) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">ความคืบหน้าการอ่านหนังสือ</h2>
              <p className="text-xs text-slate-400">เรียนจบแล้ว {completedCount} จาก {totalLessons} บทเรียน</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold font-mono text-cyan-400">{progressPercent}%</span>
            </div>
          </div>

          {/* Large Multi-segment Progress Bar */}
          <div className="space-y-3">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                className="bg-cyan-500 h-full transition-all duration-500" 
                style={{ width: `${(ch3Stats.done / totalLessons) * 100}%` }}
                title={`บทที่ 3: ${ch3Stats.done}/${ch3Stats.total}`}
              />
              <div 
                className="bg-blue-500 h-full transition-all duration-500" 
                style={{ width: `${(ch4Stats.done / totalLessons) * 100}%` }}
                title={`บทที่ 4: ${ch4Stats.done}/${ch4Stats.total}`}
              />
              <div 
                className="bg-indigo-500 h-full transition-all duration-500" 
                style={{ width: `${(ch5Stats.done / totalLessons) * 100}%` }}
                title={`บทที่ 5: ${ch5Stats.done}/${ch5Stats.total}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-cyan-400 font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>บทที่ 3 (Circuit)</span>
                </div>
                <div className="font-mono text-slate-300">{ch3Stats.done}/{ch3Stats.total} บท ({ch3Stats.pct}%)</div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-blue-400 font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>บทที่ 4 (K-Map)</span>
                </div>
                <div className="font-mono text-slate-300">{ch4Stats.done}/{ch4Stats.total} บท ({ch4Stats.pct}%)</div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-indigo-400 font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>บทที่ 5 (FSM)</span>
                </div>
                <div className="font-mono text-slate-300">{ch5Stats.done}/{ch5Stats.total} บท ({ch5Stats.pct}%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Mock Exam High Score & Launcher */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> คะแนนทดสอบ
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {examAttempts.length} ครั้งที่ทำ
            </span>
          </div>

          <div className="my-3">
            {bestExamScore !== null ? (
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">{bestExamScore}%</span>
                  <span className="text-xs text-slate-400">คะแนนสูงสุด</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {bestExamScore >= 80 ? '🌟 พร้อมสอบเกรด A!' : bestExamScore >= 60 ? '👍 ผ่านเกณฑ์ ลองฝึกอีกนิด!' : '⚠️ ควรอ่านทวนและทำซ้ำ'}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-slate-200">ยังไม่เริ่มสอบ</div>
                <p className="text-xs text-slate-400 mt-1">คลังข้อสอบ 30 ข้อตรงตามแนวสอบปลายภาค</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentTab('exam')}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
          >
            <span>ทำข้อสอบจำลอง Final</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento 3: A4 Cheat Sheet Shortcut */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> เอกสารหน้าเดียว
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                1 แผ่น A4
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100">สรุปสูตร A4 พกเข้าห้องสอบ</h3>
            <p className="text-xs text-slate-400 mt-1">
              สูตร 555, ตาราง Excitation JK/D/T, กฎเดอมอร์แกน และรหัส K-Map จัดหน้าพร้อมพิมพ์
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('cheatsheet')}
            className="w-full mt-4 py-2.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
          >
            <span>เปิดสรุปสูตร A4 (พร้อมพิมพ์)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Simulators Quick Launch Bar */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              แล็บจำลองวงจร Interactive (Hands-on Simulators)
            </h2>
            <p className="text-xs text-slate-400">ทดลองปรับค่าตรรกะและสังเกตผลทันทีเพื่อความเข้าใจที่ลึกซึ้ง</p>
          </div>
          <button
            onClick={() => setCurrentTab('simulators')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition self-start sm:self-auto"
          >
            <span>เปิดหน้าแล็บเต็มจอ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div 
            onClick={() => { setActiveSimulatorTab('gates'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">Logic Gate & Adders</h4>
            <p className="text-xs text-slate-400 mt-1">ทดสอบเกตทั้ง 7 และวงจรบวกเลข Half/Full Adder</p>
          </div>

          <div 
            onClick={() => { setActiveSimulatorTab('kmap'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900 cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">K-Map Solver (2-4 ตัวแปร)</h4>
            <p className="text-xs text-slate-400 mt-1">คลิกใส่ 0, 1, X โปรแกรมจับกลุ่มและลดรูปให้อัตโนมัติ</p>
          </div>

          <div 
            onClick={() => { setActiveSimulatorTab('flipflop'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Sliders className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">Flip-Flop & Excitation Lab</h4>
            <p className="text-xs text-slate-400 mt-1">กด Clock Pulse และสลับโหมด SR, D, JK, T Flip-Flop</p>
          </div>

          <div 
            onClick={() => { setActiveSimulatorTab('fsm'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">Water Pump FSM (ข้อสอบจริง)</h4>
            <p className="text-xs text-slate-400 mt-1">จำลองระดับน้ำ เซ็นเซอร์ a, b และคำนวณรหัส ROM</p>
          </div>
        </div>
      </div>

      {/* Chapters Breakdown & Course Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            สารบัญบทเรียนและหัวข้อสำคัญ
          </h2>
          <span className="text-xs text-slate-400">คลิกที่บทเรียนเพื่อเริ่มอ่าน</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Chapter 3 Card */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 flex flex-col justify-between hover:border-cyan-500/30 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/50">
                  Chapter 3
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {ch3Stats.done}/{ch3Stats.total} ผ่านแล้ว
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Digital Circuit & Adders</h3>
              <p className="text-xs text-slate-400 mb-4">
                สัญญาณแอนะล็อก vs ดิจิทัล, สัญญาณรบกวน, ลอจิกเกตทั้ง 7, Half Adder, Full Adder
              </p>
              
              <div className="space-y-2">
                {ch3Lessons.map(l => {
                  const done = completedLessons.includes(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => { setSelectedLessonId(l.id); setCurrentTab('classroom'); }}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition ${
                        done ? 'bg-emerald-950/20 text-slate-300 border border-emerald-900/30' : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span className="truncate">{l.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chapter 4 Card */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 flex flex-col justify-between hover:border-blue-500/30 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/50">
                  Chapter 4
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {ch4Stats.done}/{ch4Stats.total} ผ่านแล้ว
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Circuit Simplification</h3>
              <p className="text-xs text-slate-400 mb-4">
                พีชคณิตบูลีน, ทฤษฎีเดอมอร์แกน, SOP, POS, K-Map 2-4 ตัวแปร, Don't Care, Universal Gates
              </p>
              
              <div className="space-y-2">
                {ch4Lessons.map(l => {
                  const done = completedLessons.includes(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => { setSelectedLessonId(l.id); setCurrentTab('classroom'); }}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition ${
                        done ? 'bg-emerald-950/20 text-slate-300 border border-emerald-900/30' : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span className="truncate">{l.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chapter 5 Card */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 flex flex-col justify-between hover:border-indigo-500/30 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50">
                  Chapter 5
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {ch5Stats.done}/{ch5Stats.total} ผ่านแล้ว
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Sequential Circuit & FSM</h3>
              <p className="text-xs text-slate-400 mb-4">
                555 Timer, SR Latch, D/JK/T Flip-Flop, Excitation Table, Counters, Moore/Mealy FSM
              </p>
              
              <div className="space-y-2">
                {ch5Lessons.map(l => {
                  const done = completedLessons.includes(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => { setSelectedLessonId(l.id); setCurrentTab('classroom'); }}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition ${
                        done ? 'bg-emerald-950/20 text-slate-300 border border-emerald-900/30' : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <span className="truncate">{l.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
