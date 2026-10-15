import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { Search, BookOpen, Sliders, FileText, GraduationCap, X, ChevronRight, CornerDownLeft } from 'lucide-react';
import { ActiveTab, SimulatorType } from '../types';

interface SearchResult {
  id: string;
  type: 'lesson' | 'simulator' | 'cheatsheet' | 'exam';
  title: string;
  subtitle: string;
  badge: string;
  tab: ActiveTab;
  lessonId?: string;
  simulatorType?: SimulatorType;
}

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentTab, setSelectedLessonId, setActiveSimulatorTab } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const allItems: SearchResult[] = [
    // Lessons
    ...CURRICULUM_DATA.map(l => ({
      id: l.id,
      type: 'lesson' as const,
      title: l.title,
      subtitle: `${l.chapterTitle} • ${l.summary.slice(0, 70)}...`,
      badge: l.chapterId.toUpperCase(),
      tab: 'classroom' as ActiveTab,
      lessonId: l.id,
    })),
    // Simulators
    {
      id: 'sim_gates',
      type: 'simulator',
      title: 'Logic Gates & Full Adder Simulator',
      subtitle: 'จำลองการทำงานของเกตพื้นฐาน AND, OR, NOT, XOR และ Half/Full Adder',
      badge: 'Interactive Lab',
      tab: 'simulators',
      simulatorType: 'gates',
    },
    {
      id: 'sim_kmap',
      type: 'simulator',
      title: 'K-Map 2-4 Variables Visual Solver',
      subtitle: 'แก้สมการ K-Map แบบมี Don\'t Care (X) แสดงกลุ่มวง Gray Code และสูตรลดรูปอัตโนมัติ',
      badge: 'Interactive Lab',
      tab: 'simulators',
      simulatorType: 'kmap',
    },
    {
      id: 'sim_flipflop',
      type: 'simulator',
      title: 'Flip-Flop & Clock Waveform Lab',
      subtitle: 'ทดลอง Clock Edge Trigger กับ D, JK, T, SR Flip-Flop พร้อมกราฟคลื่นสัญญาณ',
      badge: 'Interactive Lab',
      tab: 'simulators',
      simulatorType: 'flipflop',
    },
    {
      id: 'sim_fsm',
      type: 'simulator',
      title: 'Water Pump FSM Controller (ข้อสอบ อ.ปวีณ)',
      subtitle: 'แบบจำลองถังน้ำและปั๊มน้ำด้วย FSM 2 สถานะ ถอดรหัส ROM และเซนเซอร์ A, B',
      badge: 'Exam Highlight',
      tab: 'simulators',
      simulatorType: 'fsm',
    },
    // Cheat Sheet
    {
      id: 'cheatsheet_all',
      type: 'cheatsheet',
      title: 'A4 Printable Cheat Sheet (พกเข้าห้องสอบ 1 แผ่น)',
      subtitle: 'รวมสูตร Digital Logic, Boolean Algebra, Excitation Table, R-2R DAC, ADC Flash',
      badge: 'Cheat Sheet',
      tab: 'cheatsheet',
    },
    // Exam
    {
      id: 'exam_sim',
      type: 'exam',
      title: 'ข้อสอบจำลอง Final 30 ข้อ จับเวลาจริง',
      subtitle: 'แนวข้อสอบ 30 ข้อ ครอบคลุม Ch.3, Ch.4, Ch.5 พร้อมเฉลยละเอียดทุกข้อ',
      badge: 'Exam Mode',
      tab: 'exam',
    },
  ];

  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 8)
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.badge.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item: SearchResult) => {
    if (item.tab === 'classroom' && item.lessonId) {
      setSelectedLessonId(item.lessonId);
      setCurrentTab('classroom');
    } else if (item.tab === 'simulators' && item.simulatorType) {
      setActiveSimulatorTab(item.simulatorType);
      setCurrentTab('simulators');
    } else {
      setCurrentTab(item.tab);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#131b2e] rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e2e8f0] dark:border-[#1e293b]">
          <Search className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="ค้นหาบทเรียน, เกต, K-Map, Flip-Flop, ถังน้ำ FSM, สูตร A4..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#0f172a] dark:text-[#f8fafc] placeholder-[#94a3b8] outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#64748b] hover:text-[#0f172a] dark:hover:text-[#f8fafc] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono font-medium text-[#64748b] dark:text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e293b] rounded border border-[#e2e8f0] dark:border-[#334155]">
            ESC ปิด
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#94a3b8]">
              ไม่พบผลการค้นหาสำหรับ "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3.5 py-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected 
                      ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]' 
                      : 'hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50 text-[#334155] dark:text-[#94a3b8]'
                  }`}
                >
                  <div className="flex items-start space-x-3 min-w-0 flex-1">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-[#f1f5f9] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#0066cc] dark:text-[#38bdf8] shrink-0">
                      {item.type === 'lesson' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'simulator' && <Sliders className="w-4 h-4" />}
                      {item.type === 'cheatsheet' && <FileText className="w-4 h-4" />}
                      {item.type === 'exam' && <GraduationCap className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#0f172a] dark:text-[#f8fafc] truncate">
                          {item.title}
                        </span>
                        <span className="text-xs px-2 py-0.2 rounded-full font-mono bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20 shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748b] dark:text-[#94a3b8] truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="ml-3 shrink-0 text-[#94a3b8]">
                    {isSelected ? (
                      <CornerDownLeft className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#f8fafc] dark:bg-[#101726] border-t border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
          <div className="flex items-center space-x-3">
            <span>กด <kbd className="px-1.5 py-0.5 font-mono bg-[#f1f5f9] dark:bg-[#1e293b] rounded border border-[#e2e8f0] dark:border-[#334155]">↑</kbd> <kbd className="px-1.5 py-0.5 font-mono bg-[#f1f5f9] dark:bg-[#1e293b] rounded border border-[#e2e8f0] dark:border-[#334155]">↓</kbd> เพื่อเลือก</span>
            <span>กด <kbd className="px-1.5 py-0.5 font-mono bg-[#f1f5f9] dark:bg-[#1e293b] rounded border border-[#e2e8f0] dark:border-[#334155]">Enter</kbd> เพื่อเปิด</span>
          </div>
          <span className="font-mono text-xs">{filteredItems.length} รายการ</span>
        </div>
      </div>
    </div>
  );
};
