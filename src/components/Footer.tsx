import React from 'react';
import { Cpu, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentTab, theaterMode, currentTab } = useApp();

  if (theaterMode && currentTab === 'classroom') {
    return null;
  }

  return (
    <footer className="no-print border-t border-slate-900 bg-slate-950 text-slate-400 py-10 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200 text-sm">LogicMaster CS121</span>
              <p className="text-xs text-slate-500">เว็บไซต์เตรียมสอบ Digital Logic Final | แม่โจ้ (MJU)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button onClick={() => setCurrentTab('dashboard')} className="hover:text-cyan-400 transition">
              แดชบอร์ด
            </button>
            <button onClick={() => setCurrentTab('classroom')} className="hover:text-cyan-400 transition">
              ห้องเรียน & สรุปเนื้อหา
            </button>
            <button onClick={() => setCurrentTab('simulators')} className="hover:text-cyan-400 transition">
              แล็บจำลองวงจร
            </button>
            <button onClick={() => setCurrentTab('cheatsheet')} className="hover:text-cyan-400 transition">
              สรุปสูตร 1 แผ่น A4
            </button>
            <button onClick={() => setCurrentTab('exam')} className="hover:text-cyan-400 transition">
              จำลองสอบ Final
            </button>
          </div>
        </div>

        <div className="border-t border-slate-900/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
          <div>
            เนื้อหาอ้างอิงจากสไลด์การสอนของ ดร. ปวีณ เขื่อนแก้ว คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้
          </div>
          <div className="flex items-center space-x-1 font-mono">
            <span>v1.0.0</span>
            <span>•</span>
            <span>Digital Logic Exam Prep</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
