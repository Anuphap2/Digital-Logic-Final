import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentTab, theaterMode, currentTab } = useApp();

  if (theaterMode && currentTab === 'classroom') {
    return null;
  }

  return (
    <footer className="no-print print:hidden border-t border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0b0f19] text-[#64748b] dark:text-[#94a3b8] py-12 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#7c3aed] text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-base text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
                Logic<span className="text-[#0066cc] dark:text-[#38bdf8]">Master</span> CS121
              </span>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">เว็บไซต์เตรียมสอบ Digital Logic Final | แม่โจ้ (MJU)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button onClick={() => setCurrentTab('dashboard')} className="hover:text-[#0066cc] transition cursor-pointer">
              แดชบอร์ด
            </button>
            <button onClick={() => setCurrentTab('classroom')} className="hover:text-[#0066cc] transition cursor-pointer">
              ห้องเรียน & สรุปเนื้อหา
            </button>
            <button onClick={() => setCurrentTab('simulators')} className="hover:text-[#0066cc] transition cursor-pointer">
              แล็บจำลองวงจร
            </button>
            <button onClick={() => setCurrentTab('cheatsheet')} className="hover:text-[#0066cc] transition cursor-pointer">
              สรุปสูตร 1 แผ่น A4
            </button>
            <button onClick={() => setCurrentTab('exam')} className="hover:text-[#0066cc] transition cursor-pointer">
              จำลองสอบ Final
            </button>
          </div>
        </div>

        <div className="border-t border-[#e2e8f0] dark:border-[#1e293b] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8] gap-2">
          <div>
            เนื้อหาอ้างอิงจากสไลด์การสอนของ ดร. ปวีณ เขื่อนแก้ว คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้
          </div>
          <div className="flex items-center space-x-1.5 font-mono">
            <span>v2.0.0</span>
            <span>•</span>
            <span className="text-[#0066cc] dark:text-[#38bdf8] font-semibold">Google Stitch Design System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
