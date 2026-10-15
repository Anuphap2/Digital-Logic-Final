import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Play, Zap, Cpu } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const ShiftRegisterVisualizer: React.FC = () => {
  // 6-bit Shift Register State (Q0, Q1, Q2, Q3, Q4, Q5) - from Lab 10
  const [bits, setBits] = useState<Array<0 | 1>>([0, 0, 0, 0, 0, 0]);
  const [serialIn, setSerialIn] = useState<0 | 1>(1);
  const [clockCount, setClockCount] = useState<number>(0);
  const [lastShiftedBit, setLastShiftedBit] = useState<0 | 1 | null>(null);

  // Shift right on clock pulse
  const shiftClock = () => {
    setLastShiftedBit(bits[5]);
    setBits(prev => [serialIn, prev[0], prev[1], prev[2], prev[3], prev[4]]);
    setClockCount(c => c + 1);
  };

  const resetRegister = () => {
    setBits([0, 0, 0, 0, 0, 0]);
    setClockCount(0);
    setLastShiftedBit(null);
  };

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Cpu className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลองรีจิสเตอร์เลื่อนข้อมูล 6 บิต (6-bit SIPO Shift Register - ใบงานที่ 10)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            จำลองวงจรจริงจากแล็บ 10: ป้อนข้อมูลแบบอนุกรม (Serial-In) และอ่านเอาต์พุตพร้อมกันแบบขนาน (Parallel-Out)
          </p>
        </div>

        <button
          onClick={resetRegister}
          className="text-xs text-gray-500 hover:text-[#0f172a] dark:hover:text-white flex items-center space-x-1 font-mono transition cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>เคลียร์รีจิสเตอร์ (CLR = 0)</span>
        </button>
      </div>

      {/* Conveyor Belt Visualization */}
      <div className="bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white space-y-6">
        
        {/* Top: Serial Input & Shifting Arrow */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-gray-400 font-bold">ข้อมูลเข้าแบบอนุกรม (Serial In):</span>
            <button
              onClick={() => setSerialIn(serialIn === 1 ? 0 : 1)}
              className={`w-12 h-9 rounded-xl font-mono font-bold text-base transition cursor-pointer ${
                serialIn === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8] shadow-md shadow-[#0066cc]/40' : 'bg-slate-800 text-gray-400'
              }`}
            >
              {serialIn}
            </button>
            <span className="text-xs text-gray-400 font-mono">
              (เตรียมเข้าสู่ช่อง Q0 ใน Clock ถัดไป)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={shiftClock}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs transition cursor-pointer flex items-center space-x-2 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400"
            >
              <Play className="w-4 h-4" />
              <span>ส่ง Clock Pulse → เลื่อนบิตไปทางขวา</span>
            </button>
            <span className="text-xs font-mono text-gray-400">
              Pulse Count: {clockCount}
            </span>
          </div>
        </div>

        {/* The 6 Flip-Flop Stage Boxes (Q0 to Q5) */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {bits.map((bitVal, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 relative ${
                bitVal === 1
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900 border-gray-800'
              }`}
            >
              {/* Bit index */}
              <div className="text-xs font-mono text-gray-400 font-bold">
                FF {idx} (ขา Q{idx})
              </div>

              {/* LED Lamp */}
              <div className="my-2 flex justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  bitVal === 1 
                    ? 'bg-emerald-500 text-white shadow-[0_0_15px_#10b981]' 
                    : 'bg-gray-800 text-gray-600'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
              </div>

              {/* Bit value */}
              <div className={`text-2xl font-mono font-bold ${bitVal === 1 ? 'text-emerald-400' : 'text-gray-600'}`}>
                {bitVal}
              </div>

              {/* Flow arrow */}
              {idx < 5 && (
                <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-gray-600 z-10">
                  ➔
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Parallel Output Bus Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[#131b2e] rounded-2xl border border-gray-800 text-xs font-mono">
          <div className="text-gray-300">
            สถานะข้อมูลเอาต์พุตแบบขนาน (Parallel Output Bus Q0-Q5):
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Binary:</span>
            <span className="text-lg font-bold text-yellow-400 tracking-widest bg-[#0b0f19] px-3 py-1 rounded-xl border border-gray-700">
              {bits.join('')}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
