import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
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
  Sparkles
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

  if (theaterMode && currentTab === 'classroom') {
    return null;
  }

  const totalLessons = CURRICULUM_DATA.length;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'classroom', label: 'ห้องเรียน & สรุปเนื้อหา', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'simulators', label: 'แล็บจำลองวงจร', icon: <Sliders className="w-4 h-4" />, badge: 'Interactive' },
    { id: 'cheatsheet', label: 'สรุปสูตร A4', icon: <FileText className="w-4 h-4" />, badge: 'พกเข้าห้องสอบ' },
    { id: 'exam', label: 'จำลองสอบ Final', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5]/95 dark:bg-[#181715]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Claude Inspired Wordmark with Asterism Glyph */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-9 h-9 rounded-lg bg-[#cc785c] text-white flex items-center justify-center shadow-sm">
              {/* Anthropic Radial Spike Glyph */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xl font-normal text-[#141413] dark:text-[#faf9f5] tracking-tight flex items-center gap-1.5">
                  LogicMaster
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono font-medium bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border border-[#e6dfd8] dark:border-[#252320]">
                    CS121
                  </span>
                </span>
              </div>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] hidden sm:block">Digital Logic Final Prep | แม่โจ้ (MJU)</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navItems.map(item => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center space-x-1.5 ${
                    active 
                      ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-semibold border border-[#e6dfd8] dark:border-[#3d3d3a]' 
                      : 'text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#f5f0e8] dark:hover:bg-[#1f1e1b]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-1.5 py-0.2 rounded-full font-mono ${
                      active 
                        ? 'bg-[#cc785c] text-white' 
                        : 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-3">
            {/* Auto-save Status Pill */}
            {lastSavedTime && (
              <div className="hidden lg:flex items-center space-x-1.5 text-xs text-[#6c6a64] dark:text-[#8e8b82] bg-[#f5f0e8] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5db872]" />
                <span className="font-mono text-xs">บันทึก {lastSavedTime}</span>
              </div>
            )}

            {/* Course Progress Pill */}
            <div 
              onClick={() => setCurrentTab('dashboard')} 
              className="flex items-center space-x-2 bg-[#f5f0e8] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] px-3 py-1.5 rounded-lg cursor-pointer hover:border-[#cc785c]/40 transition"
              title={`${completedLessons.length}/${totalLessons} บทเรียนที่เรียนจบ`}
            >
              <div className="w-4 h-4 text-[#5db872] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono font-semibold text-[#141413] dark:text-[#faf9f5]">
                {progressPercent}%
              </div>
              <div className="w-12 h-1.5 bg-[#e6dfd8] dark:bg-[#252320] rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="h-full bg-[#cc785c] rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="p-2 rounded-lg text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#f5f0e8] dark:hover:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] transition"
              title={darkMode ? 'สลับเป็นโหมดสว่าง (Cream Canvas)' : 'สลับเป็นโหมดมืด (Dark Navy)'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#e8a55a]" /> : <Moon className="w-4 h-4 text-[#6c6a64]" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg text-[#6c6a64] dark:text-[#a09d96] hover:bg-[#f5f0e8] dark:hover:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#181715] px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium ${
                currentTab === item.id 
                  ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-semibold' 
                  : 'text-[#6c6a64] dark:text-[#a09d96] hover:bg-[#f5f0e8] dark:hover:bg-[#1f1e1b]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#efe9de] dark:bg-[#252320] text-[#cc785c]">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
