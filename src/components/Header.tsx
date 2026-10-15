import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { QuickSearchModal } from './QuickSearchModal';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sliders, 
  FileText, 
  GraduationCap, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Menu, 
  X,
  Search,
  Cpu,
  Zap
} from 'lucide-react';
import { ActiveTab } from '../types';

export const Header: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    completedLessons, 
    darkMode, 
    setDarkMode, 
    lastSavedTime,
    theaterMode 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Ctrl+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (theaterMode && currentTab === 'classroom') {
    return null;
  }

  const totalLessons = CURRICULUM_DATA.length;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'classroom', label: 'บทเรียน', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'simulators', label: 'แล็บจำลอง', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'cheatsheet', label: 'สรุปสูตร', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'exam', label: 'สอบจำลอง', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f0] dark:border-[#1e293b] bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 gap-4">
            
            {/* Wordmark and Course Indicator */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group select-none shrink-0" 
              onClick={() => setCurrentTab('dashboard')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#7c3aed] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Cpu className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-heading text-lg font-extrabold text-[#0f172a] dark:text-[#f8fafc] tracking-tight flex items-center gap-1.5">
                  Logic<span className="text-[#0066cc] dark:text-[#38bdf8]">Master</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md font-mono font-bold bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
                    CS121
                  </span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation: Compact Segmented Control */}
            <nav className="hidden lg:flex items-center bg-[#f1f5f9] dark:bg-[#131b2e] p-1 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] gap-1 shadow-inner/5">
              {navItems.map(item => {
                const active = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer select-none ${
                      active 
                        ? 'bg-white dark:bg-[#0066cc] text-[#0066cc] dark:text-white shadow-xs font-bold' 
                        : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-white/50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className={active ? 'text-[#0066cc] dark:text-white' : 'text-[#64748b] dark:text-[#94a3b8]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Tools: Sleek & Essential Only */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Quick Search Button (Ctrl+K) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#64748b] dark:text-[#94a3b8] bg-[#f8fafc] dark:bg-[#131b2e] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg transition cursor-pointer"
                title="ค้นหาหัวข้อและแล็บด่วน (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#0066cc] dark:text-[#38bdf8]" />
                <span className="hidden sm:inline">ค้นหา</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-[#0b0f19] rounded border border-[#e2e8f0] dark:border-[#334155] text-[#64748b] dark:text-[#94a3b8]">
                  ⌘K
                </kbd>
              </button>

              {/* Course Progress Pill */}
              <div 
                onClick={() => setCurrentTab('dashboard')} 
                className="hidden sm:flex items-center gap-1.5 bg-[#f8fafc] dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] px-2.5 py-1.5 rounded-lg cursor-pointer hover:border-[#0066cc]/40 transition text-xs"
                title={`อ่านจบแล้ว ${completedLessons.length} จาก ${totalLessons} บทเรียน (${progressPercent}%)`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="font-mono font-bold text-[#0f172a] dark:text-[#f8fafc]">
                  {progressPercent}%
                </span>
              </div>

              {/* Dark / Light Toggle */}
              <button
                onClick={() => setDarkMode(prev => !prev)}
                className="p-1.5 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-[#f1f5f9] dark:hover:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] transition cursor-pointer"
                title={darkMode ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#64748b]" />}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="lg:hidden p-1.5 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0b0f19] px-4 pt-3 pb-5 space-y-1.5">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  currentTab === item.id 
                    ? 'bg-[#0066cc] text-white font-bold shadow-sm' 
                    : 'text-[#475569] dark:text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
