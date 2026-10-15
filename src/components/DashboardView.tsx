import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { HeroCircuitSandbox } from './HeroCircuitSandbox';
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sliders, 
  FileText, 
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  Printer,
  Sparkles,
  Zap,
  Droplets,
  Box,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ChapterId } from '../types';

export const DashboardView: React.FC = () => {
  const { 
    completedLessons, 
    selectedLessonId, 
    setSelectedLessonId, 
    setCurrentTab, 
    resumeLearning,
    examAttempts,
    setActiveSimulatorTab
  } = useApp();

  const totalLessons = CURRICULUM_DATA.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const currentLesson = CURRICULUM_DATA.find(l => l.id === selectedLessonId) || CURRICULUM_DATA[0];

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

  const bestExamScore = examAttempts.length > 0 
    ? Math.max(...examAttempts.map(a => a.percentage)) 
    : null;

  const chaptersMeta: { 
    id: ChapterId; 
    num: string; 
    title: string; 
    desc: string; 
    stats: { done: number; total: number; pct: number };
    tag: string;
    keyConcepts: string[];
    simTab?: 'gates' | 'kmap' | 'flipflop' | 'fsm';
    simLabel?: string;
  }[] = [
    {
      id: 'ch3',
      num: 'บทที่ 3',
      title: 'Digital Circuit & Data Conversion',
      desc: 'สัญญาณแอนะล็อก vs ดิจิทัล, Logic Gates, Half/Full Adder, Subtractor, Decoder, MUX, DAC (R-2R Ladder) และ ADC',
      stats: ch3Stats,
      tag: 'สัดส่วนสอบ ~30%',
      keyConcepts: ['Noise Margin', 'Full Adder (Cout=AB+Cin(A⊕B))', 'R-2R DAC Ladder', 'ADC Flash vs SAR'],
      simTab: 'gates',
      simLabel: 'แล็บ Logic Gates & Adder',
    },
    {
      id: 'ch4',
      num: 'บทที่ 4',
      title: 'Circuit Simplification & K-Map',
      desc: 'พีชคณิตบูลีน, ทฤษฎีเดอมอร์แกน (De Morgan), K-Map 2-4 ตัวแปร และการจัดกลุ่ม Don\'t Care (X) เพื่อลดต้นทุนอุปกรณ์',
      stats: ch4Stats,
      tag: 'สัดส่วนสอบ ~30%',
      keyConcepts: ['De Morgan: (A+B)\'=A\'B\'', 'Gray Code 00,01,11,10', 'Don\'t Care X optimization', 'Group 1, 2, 4, 8, 16'],
      simTab: 'kmap',
      simLabel: 'แล็บ K-Map Visual Solver',
    },
    {
      id: 'ch5',
      num: 'บทที่ 5',
      title: 'Sequential Circuit & FSM Control',
      desc: 'Latch vs Flip-Flop (SR, D, JK, T), Clock Trigger, Waveform Timing Diagram, ตาราง Excitation และข้อสอบ FSM ถังน้ำ',
      stats: ch5Stats,
      tag: 'สัดส่วนสอบ ~40% (ข้อสอบเด็ด)',
      keyConcepts: ['Edge-Triggered Clock', 'JK Toggle & Race Condition', 'Excitation Tables', 'Water Pump ROM FSM'],
      simTab: 'fsm',
      simLabel: 'แล็บ FSM ถังน้ำ (ข้อสอบจริง)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Stitch-Inspired Hero & Live Interactive Sandbox (12 cols) */}
      <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-6 sm:p-8 lg:p-10 shadow-sm">
        
        {/* Ambient Subtle Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0066cc]/10 dark:bg-[#0066cc]/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-10 w-[350px] h-[250px] bg-[#7c3aed]/10 dark:bg-[#7c3aed]/15 rounded-full blur-2xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Overline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066cc] dark:text-[#38bdf8]">
                Interactive Digital Circuit Lab · CS121
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] dark:text-[#f8fafc] tracking-tight leading-tight font-bold">
              เข้าใจ Digital Logic ได้ง่ายและสนุก <br className="hidden sm:inline" />
              <span className="text-[#0066cc] dark:text-[#38bdf8]">
                ผ่านการลงมือต่อวงจรจริง
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#475569] dark:text-[#94a3b8] leading-relaxed max-w-xl">
              เปลี่ยนเรื่องตรรกศาสตร์ที่ซับซ้อนให้เห็นภาพชัดเจน ทดลองสับสวิตช์ 0 และ 1 เห็นการไหลของสัญญาณ ตารางความจริง และโมเดล 3D เสมือนจริง ตรงตามข้อสอบ ดร. ปวีณ เขื่อนแก้ว ม.แม่โจ้
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={resumeLearning}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold text-sm shadow-md shadow-[#0066cc]/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-white" />
                <span>เรียนต่อทันที ({currentLesson.title.substring(0, 24)}...)</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => {
                  setActiveSimulatorTab('gates');
                  setCurrentTab('simulators');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-[#131b2e] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] font-semibold text-sm border border-[#e2e8f0] dark:border-[#334155] shadow-xs transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#0066cc]" />
                <span>เข้าสู่ห้องแล็บจำลอง (Logic Lab)</span>
              </button>
            </div>

            {/* Trust Metadata / Exam Rules */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#64748b] dark:text-[#94a3b8]">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155]">
                <FileText className="w-3.5 h-3.5 text-[#0066cc]" />
                <span>พก A4 เข้าสอบได้ 1 แผ่น (เขียนได้ 2 หน้า)</span>
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155]">
                <Cpu className="w-3.5 h-3.5 text-[#10b981]" />
                <span>นำเครื่องคิดเลขเข้าห้องสอบได้</span>
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Hero Mini Sandbox (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <HeroCircuitSandbox />
          </div>

        </div>

      </section>

      {/* Real-time Stats & Vitals Row (Stitch-inspired) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1: Completed Lessons & Circular Ring */}
        <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-5 border border-[#e2e8f0] dark:border-[#1e293b] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#f1f5f9] dark:text-[#1e293b]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                <path className="text-[#0066cc]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${progressPercent}, 100`} strokeLinecap="round" strokeWidth="3.5" />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-[#0066cc]">
                {progressPercent}%
              </span>
            </div>
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider text-[#64748b] dark:text-[#94a3b8]">
                ความคืบหน้ารวม
              </div>
              <div className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] mt-0.5">
                {completedCount} <span className="text-xs font-mono font-normal text-[#64748b] dark:text-[#94a3b8]">/ {totalLessons} บทเรียน</span>
              </div>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-[#f1f5f9] dark:bg-[#1e293b] text-[#0066cc] dark:text-[#38bdf8] border border-[#e2e8f0] dark:border-[#334155] font-semibold">
            {completedCount === totalLessons ? 'สำเร็จครบแล้ว' : 'กำลังลุยต่อ'}
          </span>
        </div>

        {/* Metric 2: Circuit Accuracy & Streak */}
        <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-5 border border-[#e2e8f0] dark:border-[#1e293b] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl shrink-0 shadow-xs border border-amber-500/20">
              🔥
            </div>
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider text-[#64748b] dark:text-[#94a3b8]">
                วินัยการฝึกต่อเนื่อง
              </div>
              <div className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] mt-0.5">
                7 วัน <span className="text-xs font-mono font-normal text-[#10b981]">(Daily Streak)</span>
              </div>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-[#10b981]/15 text-[#10b981] font-bold">
            ฟอร์มดีมาก!
          </span>
        </div>

        {/* Metric 3: Exam Readiness & Best Score */}
        <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-5 border border-[#e2e8f0] dark:border-[#1e293b] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center shrink-0 shadow-xs border border-[#7c3aed]/20">
              <Award className="w-6 h-6 text-[#7c3aed]" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-wider text-[#64748b] dark:text-[#94a3b8]">
                คะแนนจำลองสอบ Final
              </div>
              <div className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] mt-0.5">
                {bestExamScore !== null ? `${bestExamScore}%` : 'พร้อมเริ่มสอบ'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setCurrentTab('exam')}
            className="text-xs px-3 py-1.5 rounded-lg font-mono font-semibold bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20 border border-[#7c3aed]/20 dark:border-[#7c3aed]/40 transition cursor-pointer"
          >
            เริ่มทดสอบ
          </button>
        </div>

      </section>

      {/* Main 2-Column Responsive Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chapters & Simulators (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Visual Chapter Roadmap Section (Stitch Pathway) */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ede9fe] dark:bg-[#7c3aed]/20 text-[#7c3aed] dark:text-[#c4b5fd] uppercase tracking-wider">
                    Learning Pathway
                  </span>
                  <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                    3 โมดูลสู่เกรด A Digital Logic
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
                  เส้นทางการเรียนรู้สู่ความเชี่ยวชาญ
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span>สำเร็จแล้ว</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066cc] ml-1.5" />
                <span>กำลังเรียน</span>
              </div>
            </div>

            {/* Roadmap Cards Track */}
            <div className="flex flex-col gap-4 relative">
              {chaptersMeta.map((ch, idx) => {
                const isActive = ch.id === currentLesson.chapterId;
                const isCompleted = ch.stats.done === ch.stats.total;

                return (
                  <div
                    key={ch.id}
                    className={`relative rounded-3xl p-6 sm:p-7 border transition-all duration-200 ${
                      isActive 
                        ? 'bg-white dark:bg-[#131b2e] border-[#0066cc] shadow-md ring-1 ring-[#0066cc]/20' 
                        : 'bg-white dark:bg-[#131b2e] border-[#e2e8f0] dark:border-[#1e293b] shadow-xs hover:border-[#0066cc]/40'
                    }`}
                  >
                    {/* Active Pulsing Indicator Badge */}
                    {isActive && (
                      <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#0066cc] text-white text-xs font-mono font-bold shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>กำลังเรียนรู้ในปัจจุบัน</span>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                      
                      <div className="flex items-start gap-4">
                        {/* Module Icon Container */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                          ch.id === 'ch3' 
                            ? 'bg-[#cce5ff] text-[#006194]' 
                            : ch.id === 'ch4' 
                            ? 'bg-[#e9ddff] text-[#6b38d4]' 
                            : 'bg-[#bbf7d0] text-[#006947]'
                        }`}>
                          {ch.id === 'ch3' && <Zap className="w-7 h-7" />}
                          {ch.id === 'ch4' && <Layers className="w-7 h-7" />}
                          {ch.id === 'ch5' && <Droplets className="w-7 h-7" />}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#f1f5f9] dark:bg-[#1e293b] text-[#475569] dark:text-[#94a3b8] border border-[#e2e8f0] dark:border-[#334155]">
                              Module 0{idx + 1}
                            </span>
                            <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                              isCompleted ? 'text-[#10b981]' : isActive ? 'text-[#0066cc]' : 'text-[#64748b]'
                            }`}>
                              {isCompleted ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                                  <span>สำเร็จครบ 100%</span>
                                </>
                              ) : (
                                <span>ความคืบหน้า {ch.stats.pct}% ({ch.stats.done}/{ch.stats.total} บท)</span>
                              )}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-[#fef3c7] text-amber-800 dark:bg-[#1e293b] dark:text-amber-300">
                              {ch.tag}
                            </span>
                          </div>

                          <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">
                            {ch.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94a3b8] leading-relaxed max-w-xl">
                            {ch.desc}
                          </p>

                          {/* Progress Bar Segment */}
                          <div className="w-full max-w-md bg-[#f1f5f9] dark:bg-[#1e293b] h-2 rounded-full overflow-hidden mt-2">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isCompleted ? 'bg-[#10b981]' : 'bg-[#0066cc]'
                              }`} 
                              style={{ width: `${ch.stats.pct}%` }} 
                            />
                          </div>

                          {/* Key Concepts Pills */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            {ch.keyConcepts.map((kc, kIdx) => (
                              <span 
                                key={kIdx}
                                className="text-xs px-2 py-0.5 rounded bg-[#f8fafc] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] border border-[#e2e8f0] dark:border-[#334155] font-mono"
                              >
                                {kc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0 self-end md:self-center">
                        <button
                          onClick={() => {
                            const firstLesson = CURRICULUM_DATA.find(l => l.chapterId === ch.id);
                            if (firstLesson) setSelectedLessonId(firstLesson.id);
                            setCurrentTab('classroom');
                          }}
                          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#0066cc] hover:bg-[#0052a3] text-white shadow-md active:scale-95'
                              : 'bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-[#e2e8f0] text-[#0f172a] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155]'
                          }`}
                        >
                          <span>{isCompleted ? 'ทบทวนเนื้อหา' : isActive ? 'เรียนต่อทันที' : 'เริ่มโมดูลนี้'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        {ch.simTab && (
                          <button
                            onClick={() => {
                              setActiveSimulatorTab(ch.simTab!);
                              setCurrentTab('simulators');
                            }}
                            className="px-3 py-2 rounded-xl text-xs font-medium text-[#475569] dark:text-[#94a3b8] bg-[#f8fafc] dark:bg-[#1e293b] hover:bg-[#f1f5f9] border border-[#e2e8f0] dark:border-[#334155] flex items-center justify-center gap-1.5 transition cursor-pointer"
                            title="เปิดเครื่องมือจำลอง"
                          >
                            <Sliders className="w-3.5 h-3.5 text-[#0066cc]" />
                            <span className="hidden sm:inline">แล็บจำลอง</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Interactive Simulators Spotlight */}
          <section className="space-y-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
                แล็บจำลองวงจร Interactive 4 รูปแบบ
              </h2>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                ฝึกกดสวิตช์ ดูผลลัพธ์จริง เพื่อสร้างความเข้าใจเชิงลึกก่อนเข้าห้องสอบ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Lab 1 */}
              <div 
                onClick={() => {
                  setActiveSimulatorTab('gates');
                  setCurrentTab('simulators');
                }}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-5 shadow-xs hover:border-[#0066cc] dark:hover:border-[#38bdf8] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0066cc]/10 text-[#0066cc] dark:text-[#38bdf8] flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#1e293b] text-[#0066cc] dark:text-[#38bdf8]">
                    Ch.3
                  </span>
                </div>
                <h3 className="font-heading text-base text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#0066cc] dark:group-hover:text-[#38bdf8] transition-colors font-bold">
                  Logic Gates & Full Adder
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 line-clamp-2">
                  สลับสถานะ A, B, Cin เพื่อดูผลบวก Sum และ Carry Out พร้อมสัญลักษณ์วงจร
                </p>
              </div>

              {/* Lab 2 */}
              <div 
                onClick={() => {
                  setActiveSimulatorTab('kmap');
                  setCurrentTab('simulators');
                }}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-5 shadow-xs hover:border-[#0066cc] dark:hover:border-[#38bdf8] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] dark:text-[#c4b5fd] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#1e293b] text-[#7c3aed] dark:text-[#c4b5fd]">
                    Ch.4
                  </span>
                </div>
                <h3 className="font-heading text-base text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#0066cc] dark:group-hover:text-[#38bdf8] transition-colors font-bold">
                  K-Map 2-4 Vars Solver
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 line-clamp-2">
                  คลิกตาราง Gray Code สลับ 0, 1, X และดูผลลดรูปสมการแบบเรียลไทม์
                </p>
              </div>

              {/* Lab 3 */}
              <div 
                onClick={() => {
                  setActiveSimulatorTab('flipflop');
                  setCurrentTab('simulators');
                }}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-5 shadow-xs hover:border-[#0066cc] dark:hover:border-[#38bdf8] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#1e293b] text-amber-600 dark:text-amber-400">
                    Ch.5
                  </span>
                </div>
                <h3 className="font-heading text-base text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#0066cc] dark:group-hover:text-[#38bdf8] transition-colors font-bold">
                  Flip-Flop & Waveform Lab
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 line-clamp-2">
                  กด Clock Pulse เพื่อสังเกต D, JK, T, SR และกราฟคลื่นเวลา (Timing Diagram)
                </p>
              </div>

              {/* Lab 4 */}
              <div 
                onClick={() => {
                  setActiveSimulatorTab('fsm');
                  setCurrentTab('simulators');
                }}
                className="group cursor-pointer rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-5 shadow-xs hover:border-[#0066cc] dark:hover:border-[#38bdf8] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f1f5f9] dark:bg-[#1e293b] text-[#10b981]">
                    ข้อสอบ อ.ปวีณ
                  </span>
                </div>
                <h3 className="font-heading text-base text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#0066cc] dark:group-hover:text-[#38bdf8] transition-colors font-bold">
                  Water Pump FSM Simulator
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 line-clamp-2">
                  จำลองระดับน้ำในถัง เซนเซอร์ A/B และการทำงานของ ROM ควบคุมปั๊มน้ำ
                </p>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column: Exam Readiness & Fast Actions (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Exam Simulator Card */}
          <div className="rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0066cc]/10 text-[#0066cc] dark:text-[#38bdf8] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-[#0f172a] dark:text-[#f8fafc] font-bold">
                  คลังข้อสอบ Final 100 ข้อ
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                  ครบชุดใบงาน 7-11 และสไลด์ อ.ปวีณ ม.แม่โจ้
                </p>
              </div>
            </div>

            {bestExamScore !== null ? (
              <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">คะแนนสูงสุดที่คุณทำได้:</div>
                  <div className="text-2xl font-mono font-bold text-[#0066cc] dark:text-[#38bdf8]">{bestExamScore}%</div>
                </div>
                <div className="text-right text-xs text-[#10b981] font-semibold">
                  สอบไปแล้ว {examAttempts.length} ครั้ง
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#475569] dark:text-[#94a3b8] leading-relaxed">
                ยังไม่ได้ลองทำข้อสอบจำลอง ทดสอบความพร้อมเพื่อดูจุดที่ยังต้องทบทวนเพิ่ม
              </p>
            )}

            <button
              onClick={() => setCurrentTab('exam')}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#0066cc] hover:bg-[#0052a3] transition shadow-md shadow-[#0066cc]/25 text-center cursor-pointer"
            >
              เริ่มทำข้อสอบจำลองทันที
            </button>
          </div>

          {/* 1-Click A4 Cheat Sheet Card */}
          <div className="rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-6 shadow-xs space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed] dark:text-[#c4b5fd] flex items-center justify-center border border-[#7c3aed]/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg text-[#0f172a] dark:text-[#f8fafc] font-bold">
                  สรุปสูตร A4 1 แผ่น
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                  ฟอร์แมตพิมพ์พอดีหน้ากระดาษ A4
                </p>
              </div>
            </div>

            <p className="text-xs text-[#475569] dark:text-[#94a3b8] leading-relaxed">
              รวมกฎบูลีน, ตาราง Excitation ของ JK/D/T/SR Flip-Flop, สูตร R-2R Ladder, และกฎ De Morgan ไว้อย่างกระชับ
            </p>

            <button
              onClick={() => setCurrentTab('cheatsheet')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0f172a] dark:text-[#f8fafc] bg-[#f8fafc] dark:bg-[#1e293b] hover:bg-[#f1f5f9] hover:border-[#0066cc] border border-[#e2e8f0] dark:border-[#334155] transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#0066cc]" />
              <span>เปิดดูและสั่งพิมพ์ A4</span>
            </button>
          </div>

          {/* Exam Strategy Checklist */}
          <div className="rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] p-6 shadow-xs space-y-3">
            <h3 className="font-heading text-base text-[#0f172a] dark:text-[#f8fafc] font-bold">
              ข้อควรระวังในห้องสอบ
            </h3>
            <ul className="space-y-2 text-xs text-[#475569] dark:text-[#94a3b8]">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                <span><strong>K-Map ลำดับบิต:</strong> ต้องเรียง Gray Code 00, 01, 11, 10 เสมอ (ห้าม 10 ก่อน 11)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                <span><strong>Don't Care (X):</strong> วงเฉพาะเมื่อทำให้กลุ่ม 1 ใหญ่ขึ้น ถ้าวงแล้วไม่ได้ช่วย ไม่ต้องวง</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                <span><strong>SR Flip-Flop:</strong> ห้าม $S=1, R=1$ เพราะค่า $Q$ และ $Q'$ จะไม่เสถียร</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-1.5 shrink-0" />
                <span><strong>วงจร FSM ถังน้ำ:</strong> มี 2 State ($S_0$ เติมน้ำ, $S_1$ ปล่อยน้ำ) ต้องจำตาราง ROM 8 บรรทัดให้แม่น</span>
              </li>
            </ul>
          </div>

        </aside>

      </div>

    </div>
  );
};
