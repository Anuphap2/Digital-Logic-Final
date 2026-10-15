import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { 
  Cpu, 
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

  // If in theater mode and in classroom, hide the entire header to provide distraction-free focus!
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Course Info */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Cpu className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                  LogicMaster
                  <span className="text-xs px-1.5 py-0.5 rounded font-mono font-medium bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                    CS121
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Digital Logic Final Prep | แม่โจ้ (MJU)</p>
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
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    active 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                      item.id === 'cheatsheet' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
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
              <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>บันทึกอัตโนมัติ {lastSavedTime}</span>
              </div>
            )}

            {/* Course Progress Mini Pill */}
            <div 
              onClick={() => setCurrentTab('dashboard')} 
              className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-700 transition"
              title={`${completedLessons.length}/${totalLessons} บทเรียนที่เรียนจบ`}
            >
              <div className="w-4 h-4 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono font-semibold text-slate-200">
                {progressPercent}%
              </div>
              <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-slate-800 transition"
              title={darkMode ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-slate-800 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === item.id 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
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
