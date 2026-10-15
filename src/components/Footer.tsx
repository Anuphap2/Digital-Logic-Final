import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentTab, theaterMode, currentTab } = useApp();

  if (theaterMode && currentTab === 'classroom') {
    return null;
  }

  return (
    <footer className="no-print border-t border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#181715] text-[#6c6a64] dark:text-[#a09d96] py-12 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#cc785c] text-white flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-base text-[#141413] dark:text-[#faf9f5] tracking-tight">LogicMaster CS121</span>
              <p className="text-xs text-[#8e8b82]">เว็บไซต์เตรียมสอบ Digital Logic Final | แม่โจ้ (MJU)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button onClick={() => setCurrentTab('dashboard')} className="hover:text-[#cc785c] transition">
              แดชบอร์ด
            </button>
            <button onClick={() => setCurrentTab('classroom')} className="hover:text-[#cc785c] transition">
              ห้องเรียน & สรุปเนื้อหา
            </button>
            <button onClick={() => setCurrentTab('simulators')} className="hover:text-[#cc785c] transition">
              แล็บจำลองวงจร
            </button>
            <button onClick={() => setCurrentTab('cheatsheet')} className="hover:text-[#cc785c] transition">
              สรุปสูตร 1 แผ่น A4
            </button>
            <button onClick={() => setCurrentTab('exam')} className="hover:text-[#cc785c] transition">
              จำลองสอบ Final
            </button>
          </div>
        </div>

        <div className="border-t border-[#e6dfd8] dark:border-[#252320] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e8b82] gap-2">
          <div>
            เนื้อหาอ้างอิงจากสไลด์การสอนของ ดร. ปวีณ เขื่อนแก้ว คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้
          </div>
          <div className="flex items-center space-x-1 font-mono">
            <span>v1.1.0</span>
            <span>•</span>
            <span>Claude Warm Editorial Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
