import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Sliders, 
  FileText, 
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Editorial Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#efe9de] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#faf9f5] dark:bg-[#181715] text-[#cc785c] border border-[#e6dfd8] dark:border-[#252320]">
                CS121 Final Preparation
              </span>
              <span className="text-xs text-[#6c6a64] dark:text-[#a09d96] flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#cc785c]" />
                สอบปลายภาค: พก A4 เข้าได้ 1 แผ่น + เครื่องคิดเลข
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#141413] dark:text-[#faf9f5] tracking-tight">
              เตรียมสอบปลายภาค Digital Logic & Smart Device
            </h1>
            <p className="text-sm sm:text-base text-[#3d3d3a] dark:text-[#a09d96] max-w-2xl leading-relaxed">
              ครอบคลุมบทที่ 3 (Digital Circuit), บทที่ 4 (Simplification & K-Map) และบทที่ 5 (Sequential Circuit & FSM) ตามแนวการสอนของ ดร. ปวีณ เขื่อนแก้ว มหาวิทยาลัยแม่โจ้
            </p>
          </div>

          {/* Claude Style Coral Resume Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={resumeLearning}
              className="group relative inline-flex items-center justify-center space-x-3 px-6 py-4 rounded-xl text-base font-semibold text-white bg-[#cc785c] hover:bg-[#a9583e] shadow-md shadow-[#cc785c]/20 transition-all duration-200 active:scale-[0.98]"
            >
              <PlayCircle className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-normal text-white/80 uppercase tracking-wider">เรียนต่อจากเดิม</div>
                <div className="text-sm font-semibold truncate max-w-[180px] sm:max-w-[220px]">
                  {currentLesson.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 ml-1 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Bento 1: Progress Card (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5]">ความคืบหน้าการอ่านหนังสือ</h2>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">เรียนจบแล้ว {completedCount} จาก {totalLessons} บทเรียน</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-mono font-bold text-[#cc785c]">{progressPercent}%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-2.5 w-full bg-[#e6dfd8] dark:bg-[#252320] rounded-full overflow-hidden flex">
              <div 
                className="bg-[#cc785c] h-full transition-all duration-500" 
                style={{ width: `${(ch3Stats.done / totalLessons) * 100}%` }}
                title={`บทที่ 3: ${ch3Stats.done}/${ch3Stats.total}`}
              />
              <div 
                className="bg-[#5db8a6] h-full transition-all duration-500" 
                style={{ width: `${(ch4Stats.done / totalLessons) * 100}%` }}
                title={`บทที่ 4: ${ch4Stats.done}/${ch4Stats.total}`}
              />
              <div 
                className="bg-[#e8a55a] h-full transition-all duration-500" 
                style={{ width: `${(ch5Stats.done / totalLessons) * 100}%` }}
                title={`บทที่ 5: ${ch5Stats.done}/${ch5Stats.total}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-2.5 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                <div className="flex items-center space-x-1.5 text-[#cc785c] font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#cc785c]" />
                  <span>บทที่ 3 (Circuit)</span>
                </div>
                <div className="font-mono text-[#3d3d3a] dark:text-[#faf9f5]">{ch3Stats.done}/{ch3Stats.total} ({ch3Stats.pct}%)</div>
              </div>
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-2.5 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                <div className="flex items-center space-x-1.5 text-[#5db8a6] font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#5db8a6]" />
                  <span>บทที่ 4 (K-Map)</span>
                </div>
                <div className="font-mono text-[#3d3d3a] dark:text-[#faf9f5]">{ch4Stats.done}/{ch4Stats.total} ({ch4Stats.pct}%)</div>
              </div>
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-2.5 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                <div className="flex items-center space-x-1.5 text-[#e8a55a] font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#e8a55a]" />
                  <span>บทที่ 5 (FSM)</span>
                </div>
                <div className="font-mono text-[#3d3d3a] dark:text-[#faf9f5]">{ch5Stats.done}/{ch5Stats.total} ({ch5Stats.pct}%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Mock Exam High Score */}
        <div className="rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#e8a55a] flex items-center gap-1.5">
              <Award className="w-4 h-4" /> คะแนนทดสอบ
            </span>
            <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
              {examAttempts.length} ครั้งที่ทำ
            </span>
          </div>

          <div className="my-3">
            {bestExamScore !== null ? (
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-mono font-bold text-[#5db872]">{bestExamScore}%</span>
                  <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">คะแนนสูงสุด</span>
                </div>
                <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">
                  {bestExamScore >= 80 ? '🌟 พร้อมสอบเกรด A!' : bestExamScore >= 60 ? '👍 ผ่านเกณฑ์ ลองฝึกอีกนิด!' : '⚠️ ควรอ่านทวนและทำซ้ำ'}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xl font-serif text-[#141413] dark:text-[#faf9f5]">ยังไม่เริ่มสอบ</div>
                <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">คลังข้อสอบ 30 ข้อตรงตามแนวสอบปลายภาค</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentTab('exam')}
            className="w-full py-2.5 px-3 rounded-lg bg-[#efe9de] dark:bg-[#252320] hover:bg-[#e8e0d2] text-[#cc785c] border border-[#e6dfd8] dark:border-[#3d3d3a] text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
          >
            <span>ทำข้อสอบจำลอง Final</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento 3: A4 Cheat Sheet */}
        <div className="rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#cc785c] flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> เอกสารหน้าเดียว
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border border-[#e6dfd8] dark:border-[#3d3d3a] font-mono">
                1 แผ่น A4
              </span>
            </div>
            <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5]">สรุปสูตร A4 พกเข้าห้องสอบ</h3>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">
              สูตร 555, ตาราง Excitation, กฎเดอมอร์แกน และรหัส K-Map จัดหน้าพร้อมพิมพ์
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('cheatsheet')}
            className="w-full mt-4 py-2.5 px-3 rounded-lg bg-[#efe9de] dark:bg-[#252320] hover:bg-[#e8e0d2] text-[#cc785c] border border-[#e6dfd8] dark:border-[#3d3d3a] text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
          >
            <span>เปิดสรุปสูตร A4 (พร้อมพิมพ์)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Simulators Quick Launch Bar */}
      <div className="rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#cc785c]" />
              แล็บจำลองวงจร Interactive (Hands-on Simulators)
            </h2>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">ทดลองปรับค่าตรรกะและสังเกตผลทันทีเพื่อความเข้าใจที่ลึกซึ้ง</p>
          </div>
          <button
            onClick={() => setCurrentTab('simulators')}
            className="text-xs text-[#cc785c] hover:underline flex items-center gap-1 font-medium transition self-start sm:self-auto"
          >
            <span>เปิดหน้าแล็บเต็มจอ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div 
            onClick={() => { setActiveSimulatorTab('gates'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c] cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] flex items-center justify-center mb-2.5">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c] transition-colors">Logic Gate & Adders</h4>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">ทดสอบเกตทั้ง 7 และวงจรบวกเลข Half/Full Adder</p>
          </div>

          <div 
            onClick={() => { setActiveSimulatorTab('kmap'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c] cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#efe9de] dark:bg-[#252320] text-[#5db8a6] flex items-center justify-center mb-2.5">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c] transition-colors">K-Map Solver (2-4 ตัวแปร)</h4>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">คลิกใส่ 0, 1, X โปรแกรมจับกลุ่มและลดรูปให้อัตโนมัติ</p>
          </div>

          <div 
            onClick={() => { setActiveSimulatorTab('flipflop'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c] cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#efe9de] dark:bg-[#252320] text-[#5db872] flex items-center justify-center mb-2.5">
              <Sliders className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c] transition-colors">Flip-Flop & Excitation Lab</h4>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">กด Clock Pulse และสลับโหมด SR, D, JK, T Flip-Flop</p>
          </div>

          <div 
            onClick={() => { setActiveSimulatorTab('fsm'); setCurrentTab('simulators'); }}
            className="group p-4 rounded-xl bg-[#f5f0e8] dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c] cursor-pointer transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#efe9de] dark:bg-[#252320] text-[#e8a55a] flex items-center justify-center mb-2.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c] transition-colors">Water Pump FSM (ข้อสอบจริง)</h4>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">จำลองระดับน้ำ เซ็นเซอร์ a, b และคำนวณรหัส ROM</p>
          </div>
        </div>
      </div>

      {/* Chapters Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#cc785c]" />
            สารบัญบทเรียนและหัวข้อสำคัญ
          </h2>
          <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">คลิกที่บทเรียนเพื่อเริ่มอ่าน</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Chapter 3 Card */}
          <div className="rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] px-2 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                  Chapter 3
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
                  {ch3Stats.done}/{ch3Stats.total} ผ่านแล้ว
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5] mb-1">Digital Circuit & Adders</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-4">
                สัญญาณแอนะล็อก vs ดิจิทัล, สัญญาณรบกวน, ลอจิกเกตทั้ง 7, Half Adder, Full Adder
              </p>
              
              <div className="space-y-2">
                {ch3Lessons.map(l => {
                  const done = completedLessons.includes(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => { setSelectedLessonId(l.id); setCurrentTab('classroom'); }}
                      className={`p-2.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
                        done ? 'bg-[#5db872]/15 text-[#3d3d3a] dark:text-[#faf9f5] border border-[#5db872]/30' : 'bg-[#f5f0e8] dark:bg-[#181715] text-[#3d3d3a] dark:text-[#a09d96] hover:bg-[#efe9de] dark:hover:bg-[#252320]'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-[#5db872]' : 'text-[#8e8b82]'}`} />
                        <span className="truncate">{l.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8e8b82] shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chapter 4 Card */}
          <div className="rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-[#5db8a6] bg-[#efe9de] dark:bg-[#252320] px-2 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                  Chapter 4
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
                  {ch4Stats.done}/{ch4Stats.total} ผ่านแล้ว
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5] mb-1">Circuit Simplification</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-4">
                พีชคณิตบูลีน, ทฤษฎีเดอมอร์แกน, SOP, POS, K-Map 2-4 ตัวแปร, Don't Care, Universal Gates
              </p>
              
              <div className="space-y-2">
                {ch4Lessons.map(l => {
                  const done = completedLessons.includes(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => { setSelectedLessonId(l.id); setCurrentTab('classroom'); }}
                      className={`p-2.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
                        done ? 'bg-[#5db872]/15 text-[#3d3d3a] dark:text-[#faf9f5] border border-[#5db872]/30' : 'bg-[#f5f0e8] dark:bg-[#181715] text-[#3d3d3a] dark:text-[#a09d96] hover:bg-[#efe9de] dark:hover:bg-[#252320]'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-[#5db872]' : 'text-[#8e8b82]'}`} />
                        <span className="truncate">{l.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8e8b82] shrink-0 ml-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chapter 5 Card */}
          <div className="rounded-2xl bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-[#e8a55a] bg-[#efe9de] dark:bg-[#252320] px-2 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                  Chapter 5
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">
                  {ch5Stats.done}/{ch5Stats.total} ผ่านแล้ว
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5] mb-1">Sequential Circuit & FSM</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-4">
                555 Timer, SR Latch, D/JK/T Flip-Flop, Excitation Table, Counters, Moore/Mealy FSM
              </p>
              
              <div className="space-y-2">
                {ch5Lessons.map(l => {
                  const done = completedLessons.includes(l.id);
                  return (
                    <div
                      key={l.id}
                      onClick={() => { setSelectedLessonId(l.id); setCurrentTab('classroom'); }}
                      className={`p-2.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition ${
                        done ? 'bg-[#5db872]/15 text-[#3d3d3a] dark:text-[#faf9f5] border border-[#5db872]/30' : 'bg-[#f5f0e8] dark:bg-[#181715] text-[#3d3d3a] dark:text-[#a09d96] hover:bg-[#efe9de] dark:hover:bg-[#252320]'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${done ? 'text-[#5db872]' : 'text-[#8e8b82]'}`} />
                        <span className="truncate">{l.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8e8b82] shrink-0 ml-1" />
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
