import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lightbulb, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const HeroCircuitSandbox: React.FC = () => {
  const { setCurrentTab, setActiveSimulatorTab } = useApp();
  const [switchA, setSwitchA] = useState<number>(1);
  const [switchB, setSwitchB] = useState<number>(0);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR' | 'NAND'>('AND');

  // Compute output based on gate type
  const output = (() => {
    if (gateType === 'AND') return switchA && switchB ? 1 : 0;
    if (gateType === 'OR') return switchA || switchB ? 1 : 0;
    if (gateType === 'XOR') return switchA !== switchB ? 1 : 0;
    if (gateType === 'NAND') return !(switchA && switchB) ? 1 : 0;
    return 0;
  })();

  const formulaText = (() => {
    if (gateType === 'AND') {
      return `${switchA} · ${switchB} = ${output} ${output === 1 ? '⚡ (ไฟติดสว่าง: ต้องเป็น 1 ทั้งคู่)' : '⚪ (ไฟดับ: ต้องเป็น 1 ทั้งสองขา)'}`;
    }
    if (gateType === 'OR') {
      return `${switchA} + ${switchB} = ${output} ${output === 1 ? '⚡ (ไฟติดสว่าง: มีขาใดขาหนึ่งเป็น 1)' : '⚪ (ไฟดับ: ขาทั้งสองเป็น 0)'}`;
    }
    if (gateType === 'XOR') {
      return `${switchA} ⊕ ${switchB} = ${output} ${output === 1 ? '⚡ (ไฟติดสว่าง: สองขาค่าต่างกัน)' : '⚪ (ไฟดับ: สองขาค่าเหมือนกัน)'}`;
    }
    if (gateType === 'NAND') {
      return `¬(${switchA} · ${switchB}) = ${output} ${output === 1 ? '⚡ (ไฟติดสว่าง: สลับค่าตรงข้ามกับ AND)' : '⚪ (ไฟดับ: 1 ทั้งคู่ทำให้ดับ)'}`;
    }
    return '';
  })();

  return (
    <div className="relative bg-white dark:bg-[#131b2e] rounded-2xl p-5 sm:p-6 border border-[#e2e8f0] dark:border-[#1e293b] shadow-xl flex flex-col gap-4">
      
      {/* Sandbox Header Bar */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] dark:border-[#1e293b] pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-[#ef4444]" />
          <span className="flex h-3 w-3 rounded-full bg-[#f59e0b]" />
          <span className="flex h-3 w-3 rounded-full bg-[#10b981]" />
          <span className="font-mono text-xs font-semibold text-[#1e293b] dark:text-[#f8fafc] ml-1">
            CIRCUIT_SANDBOX.sim
          </span>
        </div>
        
        {/* Gate Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#f1f5f9] dark:bg-[#0b0f19] p-1 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
          {(['AND', 'OR', 'XOR', 'NAND'] as const).map(g => (
            <button
              key={g}
              onClick={() => setGateType(g)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                gateType === g 
                  ? 'bg-[#0066cc] text-white shadow-sm' 
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Tactile Workbench Canvas with Dot Grid Pattern */}
      <div className="relative bg-[#f8fafc] dark:bg-[#0b0f19] rounded-xl p-5 border border-[#e2e8f0] dark:border-[#1e293b] overflow-hidden select-none min-h-[220px] flex flex-col justify-between">
        
        {/* SVG Dot Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sandbox-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#94a3b8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sandbox-dots)" />
        </svg>

        {/* Dynamic Schematic Circuit Flow */}
        <div className="relative z-10 flex items-center justify-between my-auto py-2">
          
          {/* Inputs Column: Switches A & B */}
          <div className="flex flex-col gap-5 justify-center">
            
            {/* Switch A */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#1e293b] shadow-sm flex items-center justify-center font-mono text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155]">
                A
              </div>
              <button 
                onClick={() => setSwitchA(prev => prev === 1 ? 0 : 1)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer shadow-inner ${
                  switchA === 1 ? 'bg-[#10b981]' : 'bg-[#cbd5e1] dark:bg-[#334155]'
                }`}
                title="คลิกสับสวิตช์ A"
              >
                <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-md font-mono text-xs font-bold transition-transform ${
                  switchA === 1 ? 'translate-x-6 text-[#10b981]' : 'translate-x-1 text-[#64748b]'
                }`}>
                  {switchA}
                </span>
              </button>
              {/* Dynamic Wire A */}
              <div className={`h-1 w-8 sm:w-12 rounded transition-all duration-300 ${
                switchA === 1 
                  ? 'bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.7)]' 
                  : 'bg-[#cbd5e1] dark:bg-[#475569]'
              }`} />
            </div>

            {/* Switch B */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#1e293b] shadow-sm flex items-center justify-center font-mono text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155]">
                B
              </div>
              <button 
                onClick={() => setSwitchB(prev => prev === 1 ? 0 : 1)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer shadow-inner ${
                  switchB === 1 ? 'bg-[#10b981]' : 'bg-[#cbd5e1] dark:bg-[#334155]'
                }`}
                title="คลิกสับสวิตช์ B"
              >
                <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-md font-mono text-xs font-bold transition-transform ${
                  switchB === 1 ? 'translate-x-6 text-[#10b981]' : 'translate-x-1 text-[#64748b]'
                }`}>
                  {switchB}
                </span>
              </button>
              {/* Dynamic Wire B */}
              <div className={`h-1 w-8 sm:w-12 rounded transition-all duration-300 ${
                switchB === 1 
                  ? 'bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.7)]' 
                  : 'bg-[#cbd5e1] dark:bg-[#475569]'
              }`} />
            </div>

          </div>

          {/* Centerpiece: Logic Gate Symbol Card */}
          <div className="relative flex flex-col items-center justify-center px-3 py-2 bg-white dark:bg-[#0b0f19] rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-md">
            <svg className="w-20 h-14" viewBox="0 0 100 60" fill="none">
              {gateType === 'AND' && (
                <>
                  <path d="M 20 6 L 50 6 C 68 6 78 18 78 30 C 78 42 68 54 50 54 L 20 54 Z" fill="rgba(0,102,204,0.06)" stroke="#0066cc" strokeWidth="3" />
                  <text x="44" y="35" fill="#0066cc" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">&amp;</text>
                </>
              )}
              {gateType === 'OR' && (
                <>
                  <path d="M 16 6 C 26 18 26 42 16 54 C 40 54 62 48 78 30 C 62 12 40 6 16 6 Z" fill="rgba(0,102,204,0.06)" stroke="#0066cc" strokeWidth="3" />
                  <text x="40" y="35" fill="#0066cc" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">≥1</text>
                </>
              )}
              {gateType === 'XOR' && (
                <>
                  <path d="M 8 6 C 18 18 18 42 8 54" stroke="#7c3aed" strokeWidth="3" />
                  <path d="M 18 6 C 28 18 28 42 18 54 C 42 54 64 48 80 30 C 64 12 42 6 18 6 Z" fill="rgba(124,58,237,0.06)" stroke="#7c3aed" strokeWidth="3" />
                  <text x="44" y="35" fill="#7c3aed" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">=1</text>
                </>
              )}
              {gateType === 'NAND' && (
                <>
                  <path d="M 18 6 L 46 6 C 64 6 72 18 72 30 C 72 42 64 54 46 54 L 18 54 Z" fill="rgba(0,102,204,0.06)" stroke="#0066cc" strokeWidth="3" />
                  <circle cx="78" cy="30" r="5" stroke="#0066cc" strokeWidth="2.5" fill="white" />
                  <text x="40" y="35" fill="#0066cc" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">&amp;</text>
                </>
              )}
            </svg>
            <span className="font-mono text-xs font-bold text-[#0066cc] dark:text-[#38bdf8] mt-1">
              {gateType} GATE
            </span>
          </div>

          {/* Dynamic Output Wire */}
          <div className={`h-1 w-8 sm:w-12 rounded transition-all duration-300 ${
            output === 1 
              ? 'bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.8)]' 
              : 'bg-[#cbd5e1] dark:bg-[#475569]'
          }`} />

          {/* Output Indicator: Glowing Bulb / LED */}
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
              output === 1 
                ? 'bg-[#10b981] text-white shadow-[#10b981]/40 scale-105' 
                : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#94a3b8]'
            }`}>
              <Lightbulb className={`w-6 h-6 transition-all ${output === 1 ? 'fill-white animate-pulse' : ''}`} />
            </div>
            <span className={`font-mono text-xs font-bold ${
              output === 1 ? 'text-[#10b981]' : 'text-[#64748b] dark:text-[#94a3b8]'
            }`}>
              Q = {output}
            </span>
          </div>

        </div>

        {/* Dynamic Truth Feedback Bar */}
        <div className="relative z-10 w-full mt-3 bg-white/90 dark:bg-[#0b0f19]/90 rounded-xl p-2.5 border border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-mono text-[#0f172a] dark:text-[#f8fafc]">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
            <span className="font-semibold">{formulaText}</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-[#64748b] bg-[#f1f5f9] dark:bg-[#1e293b] px-2 py-0.5 rounded">
            Live Gate
          </span>
        </div>

      </div>

      {/* Quick Launch CTA to Full 3D Lab */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
          ต้องการทดลองวงจรเต็มรูปแบบ 3D Breadboard IC?
        </span>
        <button
          onClick={() => {
            setActiveSimulatorTab('gates');
            setCurrentTab('simulators');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:text-[#004c99] transition cursor-pointer"
        >
          <span>เปิดห้องแล็บจำลอง 3D</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
