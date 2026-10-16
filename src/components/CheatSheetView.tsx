import React, { useState } from 'react';
import { 
  Printer, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  AlertTriangle,
  Lightbulb,
  Table,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { FORMULA_ITEMS } from '../data/formulaData';
import { MathView } from './LatexRenderer';

export const CheatSheetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'study' | 'a4-sheet'>('study');
  const [selectedChapter, setSelectedChapter] = useState<'all' | 'ch3' | 'ch4' | 'ch5' | 'high-yield'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'f-analog-digital': true,
    'f-noise-margin': true,
    'f-adc-quantization-step': true,
    'f-adders': true,
    'f-overflow-twos-comp': true,
    'f-r2r-dac': true,
    'f-kmap-4corners': true,
    'f-static-hazard': true,
    'f-mux-expansion': true,
    'f-excitation-table': true,
    'f-ne555-astable': true,
    'f-fsm-rom-capacity': true,
    'f-fsm-water-tank': true,
  });

  const handlePrint = () => {
    window.print();
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    FORMULA_ITEMS.forEach(item => { all[item.id] = true; });
    setExpandedCards(all);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  const scrollToFormula = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: true }));
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter formulas
  const filteredFormulas = FORMULA_ITEMS.filter(item => {
    if (selectedChapter === 'ch3' && item.chapter !== 'ch3') return false;
    if (selectedChapter === 'ch4' && item.chapter !== 'ch4') return false;
    if (selectedChapter === 'ch5' && item.chapter !== 'ch5') return false;
    if (selectedChapter === 'high-yield' && !item.isHighYield) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchExamTip = item.examTip.toLowerCase().includes(q);
      const matchVariables = item.variables.some(v => v.meaning.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q));
      const matchHowToUse = item.howToUse.some(h => h.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchExamTip || matchVariables || matchHowToUse;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* =========================================================================
          TOP BANNER & CONTROLS (Always Hidden in Print)
      ========================================================================= */}
      <div className="no-print print:hidden bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
                EXAM FORMULA & WORKED EXAMPLES
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#10b981]/10 dark:bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> รวม 36 สูตรครบทุกบท (ตัด Navbar ตอนพิมพ์ 100%)
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0f172a] dark:text-[#f8fafc] mt-2 tracking-tight">
              คลังสูตรและวิธีทำละเอียด Digital Logic Final
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
              รวบรวมครบทุกสูตรพร้อมวิธีคำนวณทีละสเต็ปในห้องสอบ ตาราง K-Map 4x4 Grid เทคนิค 4 มุมห้อง ตาราง Excitation Table ครบทุก Flip-Flop และโหมดพิมพ์ A4 คมชัด
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-5 py-3 rounded-2xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold text-xs shadow-md shadow-[#0066cc]/20 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>สั่งพิมพ์ / Save as PDF (A4)</span>
            </button>
          </div>
        </div>

        {/* View Mode Switcher & Filters */}
        <div className="pt-4 border-t border-[#e2e8f0] dark:border-[#1e293b] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* View Toggle */}
          <div className="flex items-center gap-1.5 bg-[#f1f5f9] dark:bg-[#0b0f19] p-1.5 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b]">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'study'
                  ? 'bg-white dark:bg-[#1e293b] text-[#0066cc] dark:text-[#38bdf8] shadow-xs'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>โหมดอ่านเจาะลึกวิธีทำ ({FORMULA_ITEMS.length} สูตร)</span>
            </button>
            <button
              onClick={() => setActiveTab('a4-sheet')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'a4-sheet'
                  ? 'bg-white dark:bg-[#1e293b] text-[#0066cc] dark:text-[#38bdf8] shadow-xs'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>โหมดแผ่นพิมพ์ A4 (3 หน้าพร้อมตาราง K-Map & Excitation)</span>
            </button>
          </div>

          {/* Quick Actions */}
          {activeTab === 'study' && (
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0066cc] dark:hover:text-[#38bdf8] transition cursor-pointer"
              >
                ขยายวิธีทำทั้งหมด
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0066cc] dark:hover:text-[#38bdf8] transition cursor-pointer"
              >
                ย่อเฉพาะสูตรหลัก
              </button>
            </div>
          )}
        </div>

        {/* Search Bar & Chapter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ค้นหาสูตร, ตัวแปร, เช่น '555', 'K-Map', 'Noise', 'Fan-out', 'Excitation', 'Overflow', 'DAC'..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] placeholder-[#94a3b8] focus:outline-none focus:border-[#0066cc]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `ทั้งหมด (${FORMULA_ITEMS.length})` },
              { id: 'ch3', label: `บทที่ 3 ฮาร์ดแวร์ (${FORMULA_ITEMS.filter(f => f.chapter === 'ch3').length})` },
              { id: 'ch4', label: `บทที่ 4 บูลีน/K-Map (${FORMULA_ITEMS.filter(f => f.chapter === 'ch4').length})` },
              { id: 'ch5', label: `บทที่ 5 Sequential/FSM (${FORMULA_ITEMS.filter(f => f.chapter === 'ch5').length})` },
              { id: 'high-yield', label: '★ ออกสอบบ่อย' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedChapter(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedChapter === tab.id
                    ? 'bg-[#0066cc] text-white shadow-xs'
                    : 'bg-[#f1f5f9] dark:bg-[#0b0f19] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] border border-transparent dark:border-[#1e293b]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Jump Index Chips */}
        {activeTab === 'study' && !searchQuery && (
          <div className="pt-2 border-t border-[#e2e8f0] dark:border-[#1e293b] space-y-2">
            <div className="text-xs font-bold text-[#64748b] dark:text-[#94a3b8] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0066cc]" />
              สารบัญสูตรค้นหาด่วน (คลิกเพื่อกระโดดไปยังสูตรนั้นทันที):
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-[#f8fafc] dark:bg-[#0b0f19] rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b]">
              {filteredFormulas.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToFormula(item.id)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] text-[#334155] dark:text-[#cbd5e1] hover:border-[#0066cc] hover:text-[#0066cc] dark:hover:text-[#38bdf8] transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span className="font-mono text-[#0066cc] dark:text-[#38bdf8] font-bold">
                    {item.chapter.toUpperCase()}
                  </span>
                  <span className="truncate max-w-[180px]">{item.title}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-50" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          TAB 1: INTERACTIVE STUDY & APPLICATION GUIDE (Screen view)
      ========================================================================= */}
      {activeTab === 'study' && (
        <div className="no-print print:hidden space-y-6">
          <div className="flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
            <span>แสดงผล <strong>{filteredFormulas.length}</strong> จากทั้งหมด {FORMULA_ITEMS.length} สูตร</span>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#0066cc] dark:text-[#38bdf8] underline cursor-pointer">
                ล้างคำค้นหา
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredFormulas.map(item => {
              const isExpanded = !!expandedCards[item.id];
              const isKmap = item.id === 'f-kmap-4corners';
              const isExcitation = item.id === 'f-excitation-table';

              return (
                <div 
                  key={item.id}
                  id={item.id}
                  className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 transition-all scroll-mt-24"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-0.5 rounded-full border border-[#0066cc]/20">
                          {item.chapter.toUpperCase()}
                        </span>
                        <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">
                          {item.slideRef}
                        </span>
                        {item.isHighYield && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ef4444]/10 dark:bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/20 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> ออกสอบบ่อย
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0f172a] dark:text-[#f8fafc]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleCard(item.id)}
                      className="px-3 py-1.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-semibold text-[#0066cc] dark:text-[#38bdf8] hover:bg-[#0066cc]/10 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <span>{isExpanded ? 'ย่อวิธีทำ' : 'ดูวิธีทำ & ตัวอย่างคำนวณ'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Big Formula Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] text-center overflow-x-auto shadow-2xs">
                    <MathView math={item.formulaLatex} displayMode={true} className="text-base sm:text-lg" />
                  </div>

                  {/* Visual Tables inside Special Cards */}
                  {isKmap && (
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-3">
                      <div className="font-bold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                        <Table className="w-4 h-4 text-amber-600" />
                        ผังตาราง K-Map 4x4 (Gray Code Headers & 4-Corner Grouping):
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-center text-xs border-collapse border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131b2e]">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">AB \ CD</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">00</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">01</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700 text-blue-600">11 (มาก่อน 10)*</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">10</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono text-slate-700 dark:text-slate-300">
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">00</td>
                              <td className="p-1.5 border-2 border-amber-500 bg-amber-100 dark:bg-amber-900/40 font-bold text-amber-900 dark:text-amber-200">m0 (0) ★</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m1 (1)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m3 (3)</td>
                              <td className="p-1.5 border-2 border-amber-500 bg-amber-100 dark:bg-amber-900/40 font-bold text-amber-900 dark:text-amber-200">m2 (2) ★</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">01</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m4 (4)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m5 (5)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m7 (7)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m6 (6)</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900 text-blue-600">11*</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m12 (12)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m13 (13)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m15 (15)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m14 (14)</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">10</td>
                              <td className="p-1.5 border-2 border-amber-500 bg-amber-100 dark:bg-amber-900/40 font-bold text-amber-900 dark:text-amber-200">m8 (8) ★</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m9 (9)</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">m11 (11)</td>
                              <td className="p-1.5 border-2 border-amber-500 bg-amber-100 dark:bg-amber-900/40 font-bold text-amber-900 dark:text-amber-200">m10 (10) ★</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {isExcitation && (
                    <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 space-y-3">
                      <div className="font-bold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                        <Table className="w-4 h-4 text-[#0066cc]" />
                        ตารางกระตุ้นครบทุก Flip-Flop (Excitation Table: D, T, JK, SR):
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-center text-xs border-collapse border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131b2e]">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold">
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">Q → Q_next</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">D</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">T</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700 text-[#0066cc]">J</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700 text-[#0066cc]">K</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">S</th>
                              <th className="p-1.5 border border-slate-300 dark:border-slate-700">R</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono text-slate-700 dark:text-slate-300">
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">0 → 0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-[#0066cc]">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-amber-600">X</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 text-amber-600">X</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">0 → 1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-[#0066cc]">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-amber-600">X</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">1 → 0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-amber-600">X</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-[#0066cc]">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">1</td>
                            </tr>
                            <tr>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900">1 → 1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">1</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-amber-600">X</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 font-bold text-[#0066cc]">0</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700 text-amber-600">X</td>
                              <td className="p-1.5 border border-slate-300 dark:border-slate-700">0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Expandable Section: Variables, Step-by-Step, Worked Example, Exam Tip */}
                  {isExpanded && (
                    <div className="space-y-5 pt-3 border-t border-[#e2e8f0] dark:border-[#1e293b] animate-fadeIn">
                      
                      {/* Variables Glossary */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
                          <Cpu className="w-3.5 h-3.5 text-[#0066cc]" />
                          ตัวแปรและความหมาย (Parameter Glossary):
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {item.variables.map((v, vIdx) => (
                            <div 
                              key={vIdx}
                              className="p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] flex items-start gap-2"
                            >
                              <span className="font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] shrink-0">
                                <MathView math={v.symbol} />
                              </span>
                              <div className="text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                                {v.meaning}
                                {v.unit && (
                                  <span className="ml-1 text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">
                                    [{v.unit}]
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step-by-Step Instructions */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                          วิธีใช้และขั้นตอนคำนวณในห้องสอบ (Step-by-Step Procedure):
                        </h4>
                        <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] space-y-1.5 text-xs text-[#334155] dark:text-[#cbd5e1] leading-relaxed">
                          {item.howToUse.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2">
                              <span className="text-[#0066cc] dark:text-[#38bdf8] font-bold shrink-0">•</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Numerical Worked Example */}
                      <div className="space-y-2 p-4 rounded-2xl bg-[#0066cc]/5 dark:bg-[#0066cc]/10 border border-[#0066cc]/20">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h4 className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                            ตัวอย่างการคำนวณจริง (Worked Numerical Example):
                          </h4>
                          <span className="text-xs font-mono font-bold text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded-md border border-[#10b981]/20 self-start sm:self-auto">
                            คำตอบ: {item.workedExample.answer}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-[#475569] dark:text-[#94a3b8] bg-white dark:bg-[#131b2e] p-3 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                          <strong>โจทย์:</strong> {item.workedExample.problem}
                        </p>
                        <div className="space-y-1.5 text-xs text-[#334155] dark:text-[#cbd5e1] font-mono pl-3 border-l-2 border-[#0066cc]/40">
                          {item.workedExample.steps.map((st, stIdx) => (
                            <div key={stIdx}>{st}</div>
                          ))}
                        </div>
                      </div>

                      {/* Exam Tip */}
                      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>ข้อควรระวัง / กับดักข้อสอบ:</strong> {item.examTip}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: PRINTABLE A4 CHEAT SHEET (High-Density 3-Page Complete Exam Reference Booklet)
      ========================================================================= */}
      <div className={`${activeTab === 'a4-sheet' ? 'block' : 'hidden'} print:block bg-white text-[#0f172a] p-4 sm:p-6 rounded-3xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-sm print:p-0 print:border-none print:shadow-none print:bg-white print:text-black`}>
        
        {/* =========================================================================
            A4 PAGE 1: CHAPTER 3 - SIGNALS, HARDWARE, ADDERS, DAC & ADC
        ========================================================================= */}
        <div className="page-break space-y-2.5 pb-4">
          
          {/* Page 1 Header */}
          <div className="border-b-2 border-black pb-1.5 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-base tracking-tight text-black">
                CS121 Digital Logic and Smart Device | Final Cheat Sheet (หน้า 1/3)
              </h2>
              <p className="text-xs text-slate-700">
                มหาวิทยาลัยแม่โจ้ | ดร. ปวีณ เขื่อนแก้ว | บทที่ 3: สัญญาณ, เกตตรรกะ, แอดเดอร์, ซับแทรกเตอร์, DAC & ADC
              </p>
            </div>
            <div className="text-right text-xs font-mono font-bold">
              <div className="text-black">PAGE 1 / 3</div>
              <div className="text-slate-800">A4 Reference Booklet</div>
            </div>
          </div>

          {/* 3-Column Grid for Page 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-2 text-xs leading-tight">
            
            {/* Box 1: Noise Capacity & Quantization Step */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>1. สัญญาณ & Quantization</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <div className="space-y-1">
                <div className="bg-white p-0.5 rounded border border-slate-300 text-center font-mono font-bold">
                  <MathView math="v = \lfloor \frac{v_i}{v_{ref}} \times (2^{bits} - 1) \rfloor" />
                </div>
                <div>
                  <strong>สูตรแบ่งนับ (อ.ปวีณ หน้า 17):</strong> ปัดเศษทิ้งเสมอ
                  <div className="font-mono pl-1 text-xs">• vi=1.528V, vref=2V, 4-bit (2⁴-1=15)</div>
                  <div className="font-mono pl-1 text-xs">• v = ⌊(1.528/2) × 15⌋ = ⌊11.46⌋ = <strong>11 (1011_2)</strong></div>
                </div>
                <div className="pt-1 border-t border-slate-300">
                  <strong>ระดับสัญญาณรบกวน (Noise):</strong>
                  <div className="font-mono pl-1 text-xs">• N = ⌊ช่วง V / (2|Noise|)⌋</div>
                  <div className="font-mono pl-1 text-xs">• 0-5V, Noise ±0.2V → 5/0.4 = 12.5 → <strong>ตอบ 12</strong></div>
                </div>
              </div>
            </div>

            {/* Box 2: Noise Margin & Fan-Out */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>2. Noise Margin & Fan-Out</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <div className="space-y-1">
                <div><strong>TTL 5V Noise Margin:</strong></div>
                <div>• <MathView math="NM_H = V_{OH} - V_{IH} = 2.4 - 2.0 = 0.4\text{V}" /></div>
                <div>• <MathView math="NM_L = V_{IL} - V_{OL} = 0.8 - 0.4 = 0.4\text{V}" /></div>
                <div className="text-rose-700 font-semibold">• ย่านห้าม: 0.8V ถึง 2.0V (Forbidden)</div>
                <div className="pt-1 border-t border-slate-300">
                  <strong>สูตรคำนวณ Fan-Out:</strong>
                  <div>• <MathView math="Fan\text{-}out = \min(\lfloor \frac{I_{OH}}{I_{IH}} \rfloor , \lfloor \frac{I_{OL}}{I_{IL}} \rfloor)" /></div>
                  <div className="font-mono pl-1 text-xs">• IOH=0.4mA, IIH=20µA → 400/20 = <strong>20 เกต</strong></div>
                </div>
              </div>
            </div>

            {/* Box 3: Propagation Delay & fmax */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>3. เวลาหน่วง tpd & ความถี่ fmax</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <div className="space-y-1">
                <div>• เฉลี่ย: <MathView math="t_{pd} = \frac{t_{PLH} + t_{PHL}}{2}" /></div>
                <div>• ความถี่สูงสุด: <MathView math="f_{max} = \frac{1}{t_{total}}" /></div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <strong>วิธีทำ:</strong> ต่อเกต 4 ตัว tpd=10ns<br/>
                  • t_total = 4 × 10ns = <strong>40 ns</strong><br/>
                  • f_max = 1 / 40ns = <strong>25 MHz</strong>
                </div>
                <div className="text-slate-600">
                  • <strong>CMOS:</strong> กินไฟต่ำ, แต่หน่วงเพิ่มขึ้นเมื่อ C_load สูง
                </div>
              </div>
            </div>

            {/* Box 4: Logic Gates & Universal Count */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>4. ลอจิกเกต 7 ตัว & Universal Gate</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-300">
                  <tr><td className="font-bold py-0.5">NOT (7404)</td><td><MathView math="Y = \bar{A}" /></td><td>กลับ 0↔1</td></tr>
                  <tr><td className="font-bold py-0.5">AND (7408)</td><td><MathView math="Y = AB" /></td><td>1 เมื่อทุกตัวเป็น 1</td></tr>
                  <tr><td className="font-bold py-0.5">OR (7432)</td><td><MathView math="Y = A+B" /></td><td>1 เมื่อมี 1 ตัวขึ้นไป</td></tr>
                  <tr><td className="font-bold py-0.5">NAND (7400)</td><td><MathView math="Y = \overline{AB}" /></td><td>Universal Gate</td></tr>
                  <tr><td className="font-bold py-0.5">NOR (7402)</td><td><MathView math="Y = \overline{A+B}" /></td><td>Universal Gate</td></tr>
                  <tr><td className="font-bold py-0.5">XOR (7486)</td><td><MathView math="A \oplus B" /></td><td>ต่างกันได้ 1 (Odd Parity)</td></tr>
                  <tr><td className="font-bold py-0.5">XNOR</td><td><MathView math="\overline{A \oplus B}" /></td><td>เหมือนกันได้ 1</td></tr>
                </tbody>
              </table>
              <div className="mt-1 pt-1 border-t border-slate-300">
                <strong>จำนวน Universal สร้างเกต:</strong><br/>
                • <strong>NAND:</strong> NOT=1, AND=2, OR=3, <strong>XOR=4</strong>, XNOR=5<br/>
                • <strong>NOR:</strong> NOT=1, OR=2, AND=3, <strong>XNOR=4</strong>, XOR=5
              </div>
            </div>

            {/* Box 5: Adders, Subtractors & Overflow */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>5. Adders, Subtractors & Overflow</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <div className="space-y-1">
                <div><strong>Full Adder:</strong> 1 FA = 2 HA + 1 OR</div>
                <div className="pl-1">• <MathView math="S = A \oplus B \oplus C_{in}" /></div>
                <div className="pl-1">• <MathView math="C_{out} = AB + C_{in}(A \oplus B)" /></div>
                <div><strong>Full Subtractor:</strong></div>
                <div className="pl-1">• <MathView math="Diff = A \oplus B \oplus B_{in}" /></div>
                <div className="pl-1">• <MathView math="B_{out} = \bar{A}B + B_{in}(\overline{A \oplus B})" /></div>
                <div className="pt-1 border-t border-slate-300">
                  <strong>สูตรตรวจจับ Overflow 2's Comp:</strong>
                  <div className="font-mono font-bold text-center my-0.5 bg-white p-0.5 rounded border border-slate-300">
                    <MathView math="V = C_n \oplus C_{n-1}" />
                  </div>
                  <div>• <strong>วิธีทำ:</strong> ตัวทดเข้า MSB (Cn-1) XOR กับตัวทดออก MSB (Cn) ถ้าต่างกัน (V=1) เกิด Overflow!</div>
                </div>
              </div>
            </div>

            {/* Box 6: DAC & ADC Architecture */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>6. DAC (R-2R) & ADC Speeds</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>R-2R Ladder DAC:</strong> <MathView math="V_{out} = \frac{V_{ref}}{2^n} \times D" /></div>
                <div className="pl-1">
                  <strong>วิธีทำ:</strong> 4 บิต 1010_2 Vref=5V → 5V × (10/16) = <strong>3.125V</strong>
                </div>
                <div>• <strong>Weighted DAC:</strong> ใช้ตัวต้านทาน R, 2R, 4R, 8R</div>
                <div>• <strong>Flash ADC:</strong> ตัวเปรียบเทียบ <MathView math="2^n - 1" /> (8 บิตใช้ 255 ตัว, เร็วสุดใน 1 คล็อก)</div>
                <div>• <strong>SAR ADC:</strong> ใช้เวลา <MathView math="n" /> คล็อก (10 บิต = 10 คล็อก)</div>
                <div>• <strong>Dual Slope:</strong> ช้าสุด (~2^(n+1) คล็อก) แต่ทน Noise ดีสุด ใช้ในมัลติมิเตอร์</div>
                <div>• <strong>Open-Collector:</strong> ต้องต่อ Pull-up (Wired-AND)</div>
                <div>• <strong>Tristate:</strong> มี 0, 1, Hi-Z (ลอยสาย ป้องกันบัสช็อต)</div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            A4 PAGE 2: CHAPTER 4 - BOOLEAN ALGEBRA, K-MAP 4x4 GRID & MSI CIRCUITS
        ========================================================================= */}
        <div className="page-break space-y-2.5 pt-2 pb-4">
          
          {/* Page 2 Header */}
          <div className="border-b-2 border-black pb-1.5 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-base tracking-tight text-black">
                CS121 Digital Logic and Smart Device | Final Cheat Sheet (หน้า 2/3)
              </h2>
              <p className="text-xs text-slate-700">
                มหาวิทยาลัยแม่โจ้ | ดร. ปวีณ เขื่อนแก้ว | บทที่ 4: พีชคณิตบูลีน, K-Map 4x4 Grid, MUX, Decoder, Comparator & Hazards
              </p>
            </div>
            <div className="text-right text-xs font-mono font-bold">
              <div className="text-black">PAGE 2 / 3</div>
              <div className="text-slate-800">A4 Reference Booklet</div>
            </div>
          </div>

          {/* 3-Column Grid for Page 2 Top */}
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-2 text-xs leading-tight">
            
            {/* Box 7: Boolean Algebra Laws */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>7. กฎพีชคณิตบูลีน (Boolean Laws)</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td><MathView math="A + 0 = A" /></td><td><MathView math="A \cdot 1 = A" /></td></tr>
                  <tr><td><MathView math="A + 1 = 1" /></td><td><MathView math="A \cdot 0 = 0" /></td></tr>
                  <tr><td><MathView math="A + A = A" /></td><td><MathView math="A \cdot A = A" /></td></tr>
                  <tr><td><MathView math="A + \bar{A} = 1" /></td><td><MathView math="A \cdot \bar{A} = 0" /></td></tr>
                  <tr><td colSpan={2} className="pt-0.5"><strong>Distributive:</strong> <MathView math="A + BC = (A+B)(A+C)" /></td></tr>
                  <tr><td colSpan={2}><strong>Redundancy:</strong> <MathView math="A + \bar{A}B = A + B" /> (ตัดตัวตรงข้ามทิ้ง)</td></tr>
                  <tr><td colSpan={2}><strong>Absorption:</strong> <MathView math="A + AB = A" /> , <MathView math="A(A+B) = A" /></td></tr>
                </tbody>
              </table>
              <div className="mt-1 pt-1 border-t border-slate-300">
                <strong>De Morgan's Laws:</strong> หักบาร์ยาว → เปลี่ยนเครื่องหมาย (+↔·) → เติมบาร์สั้น<br/>
                • <MathView math="\overline{A+B} = \bar{A}\bar{B}" /> | <MathView math="\overline{AB} = \bar{A}+\bar{B}" />
              </div>
            </div>

            {/* Box 8: Canonical SOP & POS */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>8. Canonical SOP & POS</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>SOP (Sum of Minterms):</strong> <MathView math="\sum m(1,3,5)" /></div>
                <div>• <strong>POS (Product of Maxterms):</strong> <MathView math="\prod M(0,2,4,6,7)" /></div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <strong>วิธีแปลง:</strong> เลขที่ <i>ไม่อยู่</i> ใน SOP คือตัวเลขใน POS ทันที!<br/>
                  • Minterm m5 (101): <MathView math="A \bar{B} C" /> (1=ปกติ, 0=บาร์)<br/>
                  • Maxterm M5 (101): <MathView math="\bar{A} + B + \bar{C}" /> (0=ปกติ, 1=บาร์ สลับตรงข้าม)
                </div>
              </div>
            </div>

            {/* Box 9: Static-1 Hazard & CD4511 */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>9. Static-1 Hazard & CD4511</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <div className="space-y-1">
                <div>
                  <strong>วิธีแก้ Static-1 Hazard:</strong><br/>
                  • เกิดจาก Delay ของ Inverter ข้ามรอยต่อกลุ่ม K-Map<br/>
                  • <strong>วิธีทำ:</strong> เติมพจน์ Consensus เช่น <MathView math="A\bar{B} + BC \implies A\bar{B} + BC + \mathbf{AC}" />
                </div>
                <div className="pt-1 border-t border-slate-300">
                  <strong>ขาไอซี CD4511 (Common Cathode):</strong>
                  <div>• <MathView math="\overline{LT}" /> (ขา 3): <strong>0 = หลอดติดทุกขีด</strong> (Lamp Test เป็นเลข 8)</div>
                  <div>• <MathView math="\overline{BI}" /> (ขา 4): <strong>0 = หลอดดับสนิท</strong> (Blanking)</div>
                  <div>• <MathView math="LE" /> (ขา 5): <strong>0 = แสดงผลสด</strong>, <strong>1 = ล็อกค่าเดิม</strong> (Latch)</div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= VISUAL K-MAP TABLE FULL ROW ================= */}
          <div className="avoid-break border-2 border-slate-600 p-2 rounded-xl bg-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-300 pb-1 mb-1.5">
              <div className="font-bold text-xs text-black flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-[#0066cc]" />
                ผังตาราง K-Map 4 ตัวแปร (4x4 Grid): กฎการจับกลุ่ม Gray Code & เทคนิคยุบ 4 มุมตาราง
              </div>
              <div className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                ★ 4 มุม (m0, m2, m8, m10) = B' · D'
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-center">
              {/* Visual 4x4 Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse border border-slate-500 bg-white">
                  <thead>
                    <tr className="bg-slate-200 text-black">
                      <th className="p-1 border border-slate-500 font-bold bg-slate-300">AB \ CD</th>
                      <th className="p-1 border border-slate-500 font-bold">00</th>
                      <th className="p-1 border border-slate-500 font-bold">01</th>
                      <th className="p-1 border border-slate-500 font-bold bg-slate-200 text-blue-800">11 (มาก่อน 10)*</th>
                      <th className="p-1 border border-slate-500 font-bold">10</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">00</td>
                      <td className="p-1 border-2 border-amber-600 bg-amber-100 font-bold text-amber-900">m0 (0) ★</td>
                      <td className="p-1 border border-slate-500">m1 (1)</td>
                      <td className="p-1 border border-slate-500">m3 (3)</td>
                      <td className="p-1 border-2 border-amber-600 bg-amber-100 font-bold text-amber-900">m2 (2) ★</td>
                    </tr>
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">01</td>
                      <td className="p-1 border border-slate-500">m4 (4)</td>
                      <td className="p-1 border border-slate-500">m5 (5)</td>
                      <td className="p-1 border border-slate-500">m7 (7)</td>
                      <td className="p-1 border border-slate-500">m6 (6)</td>
                    </tr>
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100 text-blue-800">11*</td>
                      <td className="p-1 border border-slate-500">m12 (12)</td>
                      <td className="p-1 border border-slate-500">m13 (13)</td>
                      <td className="p-1 border border-slate-500">m15 (15)</td>
                      <td className="p-1 border border-slate-500">m14 (14)</td>
                    </tr>
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">10</td>
                      <td className="p-1 border-2 border-amber-600 bg-amber-100 font-bold text-amber-900">m8 (8) ★</td>
                      <td className="p-1 border border-slate-500">m9 (9)</td>
                      <td className="p-1 border border-slate-500">m11 (11)</td>
                      <td className="p-1 border-2 border-amber-600 bg-amber-100 font-bold text-amber-900">m10 (10) ★</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-1 text-xs text-slate-800">
                <div className="font-bold text-black border-b border-slate-300 pb-0.5">
                  วิธีทำ & กฎเหล็กการจัดกลุ่ม K-Map ในห้องสอบ:
                </div>
                <div>1. <strong>Gray Code หัวตาราง:</strong> 00, 01, 11, 10 (ห้ามสลับ 11 กับ 10 เด็ดขาด)</div>
                <div>2. <strong>ขนาดกลุ่ม:</strong> ต้องเป็น 2^n เสมอ (กลุ่มละ 1, 2, 4, 8, 16 เซลล์ ยิ่งใหญ่ยิ่งดี)</div>
                <div>3. <strong>วิธียุบตัวแปร:</strong> ตัวแปรที่เปลี่ยนค่า 0↔1 ให้ <strong>ตัดทิ้ง</strong>, ตัวที่นิ่งให้ <strong>เก็บไว้</strong></div>
                <div>4. <strong>วิธีคิด 4 มุม (ช่อง 0, 2, 8, 10):</strong> แถว 00(A'B') กับ 10(AB') ตัด A เหลือ B' | คอลัมน์ 00(C'D') กับ 10(CD') ตัด C เหลือ D' → ผลลัพธ์คือ <MathView math="\bar{B}\bar{D}" /></div>
                <div>5. <strong>Don't Care (X):</strong> วงรวมเมื่อช่วยขยายกลุ่มให้ใหญ่ขึ้น (จาก 2 เป็น 4) ไม่ต้องวงถ้าไม่จำเป็น</div>
              </div>
            </div>
          </div>

          {/* 3-Column Grid for Page 2 Bottom: MUX, Decoder, Comparator */}
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-2 text-xs leading-tight">
            
            {/* Box 10: MUX Function Implementation */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>10. สร้างฟังก์ชันด้วย MUX</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <div className="space-y-1">
                <div>• Shannon Expansion: <MathView math="F = \bar{A}I_0 + AI_1" /></div>
                <div>• ใช้ MUX ขนาด <MathView math="2^{n-1}" />-to-1 สร้างฟังก์ชัน n ตัวแปร</div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <strong>วิธีทำ MUX 4-to-1 สังเคราะห์ F(A,B,C):</strong><br/>
                  • ต่อ S1=A, S0=B<br/>
                  • ช่องอินพุต I0, I1, I2, I3 ต่อเข้า 0, 1, C หรือ C' ตามตารางความจริง
                </div>
              </div>
            </div>

            {/* Box 11: Decoder Cascading & Memory Addressing */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>11. การขยายขนาด Decoder</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>สร้าง 4-to-16 จาก 2-to-4:</strong></div>
                <div className="pl-1">• แถวเอาต์พุต: 16 / 4 = <strong>4 ตัว</strong></div>
                <div className="pl-1">• แถวเลือก Enable: ใช้ 2-to-4 อีก <strong>1 ตัว</strong></div>
                <div className="pl-1">• <strong>รวมใช้ชิปทั้งหมด: 5 ตัว</strong></div>
                <div className="pt-0.5 border-t border-slate-300">
                  • บิตต่ำ A1, A0 ต่อขนานเข้าอินพุตทุกตัว<br/>
                  • บิตสูง A3, A2 ต่อเข้าตัวขับ Enable
                </div>
              </div>
            </div>

            {/* Box 12: Magnitude Comparator */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>12. วงจรเปรียบเทียบขนาด 4 บิต</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>เท่ากัน (A = B):</strong> <MathView math="x_3 x_2 x_1 x_0" /> (XNOR ทุกคู่)</div>
                <div>• <strong>มากกว่า (A &gt; B):</strong> ตรวจสอบจาก MSB ลงไป LSB:</div>
                <div className="font-mono pl-1 text-xs">
                  <MathView math="A_3\bar{B}_3 + x_3 A_2\bar{B}_2 + x_3 x_2 A_1\bar{B}_1 + \dots" />
                </div>
                <div className="text-slate-700">
                  • ไอซีมาตรฐาน: <strong>74HC85</strong> (มีขาต่อพ่วง Cascading ขยายเป็น 8 บิตได้)
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            A4 PAGE 3: CHAPTER 5 - FLIP-FLOPS, EXCITATION, COUNTERS, 555, FSM & MEMORY
        ========================================================================= */}
        <div className="space-y-2.5 pt-2 pb-2">
          
          {/* Page 3 Header */}
          <div className="border-b-2 border-black pb-1.5 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-base tracking-tight text-black">
                CS121 Digital Logic and Smart Device | Final Cheat Sheet (หน้า 3/3)
              </h2>
              <p className="text-xs text-slate-700">
                มหาวิทยาลัยแม่โจ้ | ดร. ปวีณ เขื่อนแก้ว | บทที่ 5: ฟลิปฟลอป, ตาราง Excitation, วงจรนับ, ไทเมอร์ 555, FSM & หน่วยความจำ
              </p>
            </div>
            <div className="text-right text-xs font-mono font-bold">
              <div className="text-black">PAGE 3 / 3</div>
              <div className="text-slate-800">A4 Reference Booklet</div>
            </div>
          </div>

          {/* 3-Column Grid for Page 3 Top */}
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-2 text-xs leading-tight">
            
            {/* Box 13: Flip-Flop Next State & Timing */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>13. สมการคุณลักษณะฟลิปฟลอป</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>D-FF:</strong> <MathView math="Q_{next} = D" /> (จำตามอินพุต)</div>
                <div>• <strong>T-FF:</strong> <MathView math="Q_{next} = T \oplus Q" /> (T=1 Toggle)</div>
                <div>• <strong>JK-FF:</strong> <MathView math="Q_{next} = J\bar{Q} + \bar{K}Q" /> (J=K=1 Toggle)</div>
                <div>• <strong>SR Latch:</strong> ห้าม S=1, R=1 (Invalid)</div>
                <div className="pt-1 border-t border-slate-300">
                  <strong>ข้อกำหนดเวลา (Timing):</strong><br/>
                  • คาบต่ำสุด: <MathView math="T_{clk} \ge t_{cq} + t_{comb} + t_{setup}" /><br/>
                  • ฝ่าฝืน Setup/Hold → เกิด <strong>Metastability</strong>
                </div>
              </div>
            </div>

            {/* Box 14: Counters & Modulo-N Truncated */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>14. วงจรนับ & การตัดตอน MOD-N</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>สูตรหารความถี่:</strong> <MathView math="f_{out} = \frac{f_{in}}{2^n}" /></div>
                <div>• <strong>จำนวน FF สำหรับ MOD-N:</strong> <MathView math="k = \lceil \log_2 N \rceil" /></div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <strong>วิธีออกแบบ MOD-10 (นับ 0-9):</strong><br/>
                  • ใช้ 4 FFs (2^4 = 16 &ge; 10)<br/>
                  • เลขที่ต้องตัดรีเซ็ตคือเลข 10 (1010_2: Q3=1, Q1=1)<br/>
                  • ต่อเกต NAND: <MathView math="\overline{CLR} = \overline{Q_3 Q_1}" /> เข้าขา Reset
                </div>
              </div>
            </div>

            {/* Box 15: Ring vs Johnson & Shift Registers */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>15. Ring, Johnson & Shift Reg.</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>Ring Counter:</strong> นับได้ <MathView math="n" /> สถานะ (Self-decoding)</div>
                <div>• <strong>Johnson Counter:</strong> นับได้ <MathView math="2n" /> สถานะ (Glitch-free)</div>
                <div className="pl-1">• 4 FFs: Ring = 4 สถานะ, Johnson = 8 สถานะ</div>
                <div className="pt-1 border-t border-slate-300">
                  <strong>รอบคล็อกของ Shift Register (n-bit):</strong><br/>
                  • <strong>SISO:</strong> ป้อน n + อ่านออก n = 2n คล็อก (ช้าสุด)<br/>
                  • <strong>SIPO:</strong> n คล็อก | <strong>PISO:</strong> n คล็อก | <strong>PIPO:</strong> 1 คล็อก
                </div>
              </div>
            </div>

          </div>

          {/* ================= VISUAL EXCITATION TABLE FULL ROW ================= */}
          <div className="avoid-break border-2 border-slate-600 p-2 rounded-xl bg-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-300 pb-1 mb-1.5">
              <div className="font-bold text-xs text-black flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-[#0066cc]" />
                ตารางกระตุ้นฟลิปฟลอป (EXCITATION TABLE): สำหรับออกแบบวงจรนับ & FSM
              </div>
              <div className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-300">
                ★ ออกสอบชัวร์ 100%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-center">
              {/* Visual Excitation Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs border-collapse border border-slate-500 bg-white">
                  <thead>
                    <tr className="bg-slate-200 text-black">
                      <th className="p-1 border border-slate-500 font-bold bg-slate-300">Q → Q_next</th>
                      <th className="p-1 border border-slate-500 font-bold">D</th>
                      <th className="p-1 border border-slate-500 font-bold">T</th>
                      <th className="p-1 border border-slate-500 font-bold text-blue-800">J</th>
                      <th className="p-1 border border-slate-500 font-bold text-blue-800">K</th>
                      <th className="p-1 border border-slate-500 font-bold">S</th>
                      <th className="p-1 border border-slate-500 font-bold">R</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">0 → 0</td>
                      <td className="p-1 border border-slate-500">0</td>
                      <td className="p-1 border border-slate-500">0</td>
                      <td className="p-1 border border-slate-500 font-bold text-blue-800">0</td>
                      <td className="p-1 border border-slate-500 font-bold text-amber-700">X</td>
                      <td className="p-1 border border-slate-500">0</td>
                      <td className="p-1 border border-slate-500 text-amber-700">X</td>
                    </tr>
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">0 → 1</td>
                      <td className="p-1 border border-slate-500">1</td>
                      <td className="p-1 border border-slate-500">1</td>
                      <td className="p-1 border border-slate-500 font-bold text-blue-800">1</td>
                      <td className="p-1 border border-slate-500 font-bold text-amber-700">X</td>
                      <td className="p-1 border border-slate-500">1</td>
                      <td className="p-1 border border-slate-500">0</td>
                    </tr>
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">1 → 0</td>
                      <td className="p-1 border border-slate-500">0</td>
                      <td className="p-1 border border-slate-500">1</td>
                      <td className="p-1 border border-slate-500 font-bold text-amber-700">X</td>
                      <td className="p-1 border border-slate-500 font-bold text-blue-800">1</td>
                      <td className="p-1 border border-slate-500">0</td>
                      <td className="p-1 border border-slate-500">1</td>
                    </tr>
                    <tr>
                      <td className="p-1 border border-slate-500 font-bold bg-slate-100">1 → 1</td>
                      <td className="p-1 border border-slate-500">1</td>
                      <td className="p-1 border border-slate-500">0</td>
                      <td className="p-1 border border-slate-500 font-bold text-amber-700">X</td>
                      <td className="p-1 border border-slate-500 font-bold text-blue-800">0</td>
                      <td className="p-1 border border-slate-500 text-amber-700">X</td>
                      <td className="p-1 border border-slate-500">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-1 text-xs text-slate-800">
                <div className="font-bold text-black border-b border-slate-300 pb-0.5">
                  ขั้นตอน 5 สเต็ปการใช้ตาราง Excitation สังเคราะห์วงจรในห้องสอบ:
                </div>
                <div>1. <strong>เขียนตาราง State Transition:</strong> ระบุสถานะปัจจุบัน Q และสถานะถัดไป Q_next</div>
                <div>2. <strong>เทียบตาราง Excitation:</strong> ดูการเปลี่ยนค่าในแต่ละบิต เช่น ถ้า 0→1 ให้เติม J=1, K=X</div>
                <div>3. <strong>ท่องจำ JK ง่ายๆ:</strong> <strong>"0X, 1X, X1, X0"</strong> (0 มาก่อน 1 แล้วสลับ X มาหน้า)</div>
                <div>4. <strong>ท่องจำ T:</strong> เปลี่ยนป้อน 1, เหมือนเดิมป้อน 0 | <strong>ท่องจำ D:</strong> ตามค่า Q_next</div>
                <div>5. นำอินพุตไปลง K-Map เพื่อหายุบสมการตรรกะขับขาฟลิปฟลอป</div>
              </div>
            </div>
          </div>

          {/* 3-Column Grid for Page 3 Bottom: NE555, FSM Water Tank & Memory */}
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-2 text-xs leading-tight">
            
            {/* Box 16: NE555 Timer Astable & Monostable */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>16. ไอซีไทเมอร์ NE555</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>Astable (ไฟกระพริบ):</strong> <MathView math="f = \frac{1.44}{(R_A + 2R_B)C}" /></div>
                <div>• Duty Cycle: <MathView math="\frac{R_A + R_B}{R_A + 2R_B} \times 100\%" /> (&gt; 50% เสมอ)</div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <strong>วิธีทำออกแบบไฟ 1 Hz (C=10µF, RA=1kΩ):</strong><br/>
                  • RA + 2RB = 1.44 / (1 × 10×10^-6) = 144 kΩ<br/>
                  • 2RB = 143 kΩ → <strong>RB = 71.5 kΩ</strong>
                </div>
                <div>• <strong>Monostable (พัลส์เดี่ยว):</strong> <MathView math="T_{pulse} = 1.1 R_A C" /></div>
              </div>
            </div>

            {/* Box 17: FSM Water Tank Model */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>17. FSM & แบบจำลองถังน้ำ อ.ปวีณ</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1">
                <div>• <strong>Moore:</strong> Output ขึ้นกับ State เท่านั้น (ในวงกลม)</div>
                <div>• <strong>Mealy:</strong> Output ขึ้นกับ State + Input (บนเส้นทาง)</div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <strong>โจทย์ถังน้ำ (a=30% ล่าง, b=75% บน, y=ปั๊ม):</strong><br/>
                  • <strong>State 0 (y=1 สูบ):</strong> สูบตั้งแต่น้ำแห้ง a=b=0 จนแตะ a=b=1 เต็มจึงไป State 1<br/>
                  • <strong>State 1 (y=0 ตัด):</strong> ตัดปั๊มจนน้ำแห้งหลุด a=b=0 จึงเริ่มสูบใหม่<br/>
                  • ตาราง ROM: 1 State bit + 2 Sensors = 3 Address → <strong>2^3 = 8 แถว</strong>
                </div>
              </div>
            </div>

            {/* Box 18: Memory Capacity & Chip Cascading */}
            <div className="avoid-break border border-slate-400 p-2 rounded-xl bg-slate-50 print:bg-white">
              <div className="font-bold border-b border-slate-300 pb-1 mb-1 text-black flex justify-between">
                <span>18. ความจุและการขยายหน่วยความจำ</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1">
                <div>• ความจุ: <MathView math="\text{Bits} = 2^k \times m" /> (k=Address, m=Data)</div>
                <div>• <strong>สร้าง 64K × 16 บิต จากชิป 16K × 8 บิต:</strong></div>
                <div className="pl-1">• สาย Address ของระบบ: 64K = 2^16 → <strong>16 เส้น</strong></div>
                <div className="pl-1">• ขยายแอดเดรส: 64K / 16K = 4 แถว (Decoder 2-to-4)</div>
                <div className="pl-1">• ขยายความกว้าง: 16 บิต / 8 บิต = 2 คอลัมน์</div>
                <div className="pl-1 font-bold">• รวมใช้ชิปทั้งหมด: 4 × 2 = <strong>8 ตัว</strong></div>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-2 pt-1 border-t border-slate-400 text-xs text-center text-slate-600 print:text-black">
            CS121 Digital Logic and Smart Device | Final Exam Cheat Sheet Booklet | คณะวิทยาศาสตร์ มหาวิทยาลัยแม่โจ้ | จัดทำเพื่อทบทวนบทเรียน
          </div>

        </div>

      </div>

    </div>
  );
};
