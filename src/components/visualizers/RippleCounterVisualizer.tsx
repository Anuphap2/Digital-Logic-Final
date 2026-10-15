import React, { useState } from 'react';
import { Play, RotateCcw, Activity, Clock, Zap, AlertTriangle } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const RippleCounterVisualizer: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [tpd, setTpd] = useState<number>(10); // 10 ns per FF
  const [isRippling, setIsRippling] = useState<boolean>(false);

  // 4 bits: Q0, Q1, Q2, Q3
  const q0 = (count >> 0) & 1;
  const q1 = (count >> 1) & 1;
  const q2 = (count >> 2) & 1;
  const q3 = (count >> 3) & 1;

  // Total accumulated delay for MSB
  const totalDelay = 4 * tpd;

  const incrementCount = () => {
    setIsRippling(true);
    setTimeout(() => {
      setCount(c => (c + 1) % 16);
      setIsRippling(false);
    }, 150);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Clock className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลองวงจรนับแบบริปเปิล 4 บิต (4-bit Asynchronous Ripple Counter - ใบงานที่ 11)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            สังเกตการส่งต่อสัญญาณนาฬิกาแบบระลอกคลื่น (Ripple) ที่ทำให้เกิดการสะสมความล่าช้า (Accumulated Propagation Delay)
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={resetCount}
            className="text-xs text-gray-500 hover:text-white px-3 py-1.5 rounded-xl font-mono transition cursor-pointer"
          >
            รีเซ็ตเป็น 0
          </button>
          <button
            onClick={incrementCount}
            className="px-4 py-2 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-mono font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 shadow-md shadow-[#0066cc]/30"
          >
            <Play className="w-3.5 h-3.5" />
            <span>นับขึ้น (+1 Clock)</span>
          </button>
        </div>
      </div>

      {/* Main Schematic & Cascading Stages */}
      <div className="bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white space-y-6">
        
        {/* Counter Display Banner */}
        <div className="flex items-center justify-between bg-[#131b2e] p-4 rounded-2xl border border-gray-800">
          <div className="text-xs font-mono text-gray-400">
            ค่าที่นับได้ปัจจุบัน (Current Count):
          </div>
          <div className="flex items-center space-x-4">
            <div className="font-mono text-2xl font-bold text-yellow-400">
              ฐานสิบ: {count}
            </div>
            <div className="font-mono text-xl font-bold text-emerald-400 bg-[#0b0f19] px-3 py-1 rounded-xl border border-gray-700">
              Binary: {q3}{q2}{q1}{q0}₂
            </div>
          </div>
        </div>

        {/* 4 Cascading Flip-Flop Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { name: 'FF0 (LSB)', bit: q0, delay: 'tpd', clkSource: 'Main Clock Input', weight: 1 },
            { name: 'FF1', bit: q1, delay: '2 × tpd', clkSource: 'รับ Clock จาก Q0', weight: 2 },
            { name: 'FF2', bit: q2, delay: '3 × tpd', clkSource: 'รับ Clock จาก Q1', weight: 4 },
            { name: 'FF3 (MSB)', bit: q3, delay: '4 × tpd', clkSource: 'รับ Clock จาก Q2', weight: 8 }
          ].map((ff, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all duration-300 relative ${
                ff.bit === 1
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'bg-slate-900 border-gray-800'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span className="font-bold">{ff.name}</span>
                <span className="text-xs text-yellow-400">น้ำหนัก: {ff.weight}</span>
              </div>

              {/* Bit LED */}
              <div className="my-3 flex justify-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xl transition-all ${
                  ff.bit === 1 
                    ? 'bg-emerald-500 text-white shadow-[0_0_15px_#10b981]' 
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {ff.bit}
                </div>
              </div>

              {/* Details */}
              <div className="text-xs font-mono text-gray-400 space-y-1 border-t border-gray-800 pt-2">
                <div>{ff.clkSource}</div>
                <div className="text-amber-400">ความล่าช้าสะสม: {ff.delay} ({(idx + 1) * tpd}ns)</div>
              </div>
            </div>
          ))}
        </div>

        {/* Delay Formula & Hazard Callout */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl text-xs space-y-1 text-amber-300">
          <div className="font-bold flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>จุดสำคัญในข้อสอบ อ.ปวีณ (ข้อจำกัดของ Asynchronous Ripple Counter):</span>
          </div>
          <div className="text-gray-300 leading-relaxed">
            เนื่องจาก Clock ของฟลิปฟลอปตัวถัดไปต้องรอเอาต์พุต Q ของตัวก่อนหน้า ทำให้ความล่าช้าสะสมเป็น N × t_pd = 4 × {tpd} ns = {totalDelay} ns หากความถี่ Clock สูงเกินไป วงจรจะแสดงค่าตัวเลขระหว่างเปลี่ยนผ่านผิดเพี้ยน (Counting Glitches) แก้ไขได้โดยใช้วงจรนับแบบซิงโครนัส (Synchronous Counter) ที่ทุกตัวรับ Clock พร้อมกัน
          </div>
        </div>

      </div>

    </div>
  );
};
