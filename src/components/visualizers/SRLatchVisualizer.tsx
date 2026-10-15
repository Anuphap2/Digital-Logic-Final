import React, { useState } from 'react';
import { Zap, ShieldAlert, RotateCcw, AlertTriangle, Layers } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const SRLatchVisualizer: React.FC = () => {
  const [latchType, setLatchType] = useState<'NOR' | 'NAND'>('NOR');
  const [sInput, setSInput] = useState<0 | 1>(0);
  const [rInput, setRInput] = useState<0 | 1>(0);

  // Stored state Q and Q_bar
  const [q, setQ] = useState<0 | 1>(0);
  const [qBar, setQBar] = useState<0 | 1>(1);

  // Handle inputs based on latch type
  const isForbidden = latchType === 'NOR' 
    ? (sInput === 1 && rInput === 1)
    : (sInput === 0 && rInput === 0);

  const applyInputs = (newS: 0 | 1, newR: 0 | 1) => {
    setSInput(newS);
    setRInput(newR);

    if (latchType === 'NOR') {
      if (newS === 1 && newR === 0) {
        setQ(1);
        setQBar(0);
      } else if (newS === 0 && newR === 1) {
        setQ(0);
        setQBar(1);
      } else if (newS === 1 && newR === 1) {
        // Forbidden: both become 0
        setQ(0);
        setQBar(0);
      }
      // If 0,0: Hold previous state
    } else {
      // Active-LOW NAND Latch
      if (newS === 0 && newR === 1) {
        // Set
        setQ(1);
        setQBar(0);
      } else if (newS === 1 && newR === 0) {
        // Reset
        setQ(0);
        setQBar(1);
      } else if (newS === 0 && newR === 0) {
        // Forbidden: both become 1
        setQ(1);
        setQBar(1);
      }
      // If 1,1: Hold previous state
    }
  };

  const resetLatch = () => {
    if (latchType === 'NOR') {
      applyInputs(0, 0);
      setQ(0);
      setQBar(1);
    } else {
      applyInputs(1, 1);
      setQ(0);
      setQBar(1);
    }
  };

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลองวงจรแลตช์พื้นฐาน (Cross-Coupled SR Latch)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            จำลองสายสัญญาณป้อนกลับ (Feedback Loop) และภาวะห้ามเกิด (Forbidden State) จากสไลด์ อ.ปวีณ
          </p>
        </div>

        {/* Latch Type Picker */}
        <div className="flex items-center space-x-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          <button
            onClick={() => {
              setLatchType('NOR');
              setSInput(0);
              setRInput(0);
              setQ(0);
              setQBar(1);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              latchType === 'NOR'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            NOR Latch (Active HIGH)
          </button>
          <button
            onClick={() => {
              setLatchType('NAND');
              setSInput(1);
              setRInput(1);
              setQ(0);
              setQBar(1);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              latchType === 'NAND'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            NAND Latch (Active LOW)
          </button>
        </div>
      </div>

      {/* Main Interactive Circuit Display */}
      <div className="bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white space-y-6">
        
        {/* Forbidden State Red Alert Banner */}
        {isForbidden && (
          <div className="p-3.5 bg-red-950/80 border-2 border-red-500 rounded-2xl flex items-center space-x-3 text-red-200 animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-red-300 font-bold">⚠️ ตรวจพบภาวะห้ามเกิด (FORBIDDEN / INVALID STATE!):</strong>
              <div className="text-red-200 mt-0.5">
                {latchType === 'NOR' 
                  ? 'ใน NOR Latch เมื่อ S=1 และ R=1 เอาต์พุตทั้งสองจะกลายเป็น 0 พร้อมกัน (Q = Q̄ = 0) ขัดแย้งกับหลักการเป็นคู่ตรงข้าม และหากปล่อยอินพุตเป็น 0 พร้อมกัน วงจรจะเกิดการแกว่ง (Metastability / Race Condition)!'
                  : 'ใน NAND Latch เมื่อ S̄=0 และ R̄=0 เอาต์พุตทั้งสองจะกลายเป็น 1 พร้อมกัน (Q = Q̄ = 1) ขัดแย้งกับหลักการเป็นคู่ตรงข้าม!'}
              </div>
            </div>
          </div>
        )}

        {/* Inputs & Schematic Wire Simulation */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          
          {/* Inputs Column */}
          <div className="space-y-4">
            
            {/* Set (S) Button */}
            <div className="flex items-center space-x-3">
              <span className="w-20 text-right font-mono text-xs text-gray-400">
                {latchType === 'NOR' ? 'Set (S):' : 'Set (S̄):'}
              </span>
              <button
                onClick={() => applyInputs(sInput === 1 ? 0 : 1, rInput)}
                className={`w-14 h-10 rounded-xl font-mono font-bold text-base transition cursor-pointer ${
                  sInput === 1 
                    ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8] shadow-md shadow-[#0066cc]/40' 
                    : 'bg-slate-800 text-gray-400'
                }`}
              >
                {sInput}
              </button>
              <span className="text-xs text-gray-500 font-mono">
                {latchType === 'NOR' 
                  ? (sInput === 1 ? '← สั่งจำ 1' : '') 
                  : (sInput === 0 ? '← สั่งจำ 1 (Active-LOW)' : '')}
              </span>
            </div>

            {/* Reset (R) Button */}
            <div className="flex items-center space-x-3">
              <span className="w-20 text-right font-mono text-xs text-gray-400">
                {latchType === 'NOR' ? 'Reset (R):' : 'Reset (R̄):'}
              </span>
              <button
                onClick={() => applyInputs(sInput, rInput === 1 ? 0 : 1)}
                className={`w-14 h-10 rounded-xl font-mono font-bold text-base transition cursor-pointer ${
                  rInput === 1 
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400 shadow-md shadow-amber-600/40' 
                    : 'bg-slate-800 text-gray-400'
                }`}
              >
                {rInput}
              </button>
              <span className="text-xs text-gray-500 font-mono">
                {latchType === 'NOR' 
                  ? (rInput === 1 ? '← สั่งล้างเป็น 0' : '') 
                  : (rInput === 0 ? '← สั่งล้างเป็น 0 (Active-LOW)' : '')}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={resetLatch}
                className="text-xs text-gray-400 hover:text-white flex items-center space-x-1 font-mono transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ตสถานะเป็นเริ่มต้น (Q=0)</span>
              </button>
            </div>

          </div>

          {/* Center: Feedback Schematic Simulation Graphic */}
          <div className="p-4 rounded-2xl bg-[#131b2e] border border-gray-800 text-xs font-mono space-y-3 max-w-xs text-center">
            <div className="text-[#38bdf8] font-bold">
              วงจรป้อนกลับไขว้ (Cross-Coupled Feedback)
            </div>
            <div className="text-gray-300 text-xs leading-relaxed">
              เอาต์พุต Q ด้านบนจะถูกต่อสายย้อนกลับมาเป็นอินพุตของเกตตัวล่าง และเอาต์พุต Q̄ ด้านล่างจะถูกต่อสายย้อนกลับไปเลี้ยงเกตตัวบน เกิดเป็นหน่วยความจำ 1 บิต
            </div>
            <div className="p-2 rounded-lg bg-[#0b0f19] border border-gray-800 text-yellow-400 font-bold">
              {sInput === 0 && rInput === 0 && latchType === 'NOR' && 'สถานะ: คงค่าเดิม (Hold Memory Q = ' + q + ')'}
              {sInput === 1 && rInput === 0 && latchType === 'NOR' && 'สถานะ: สั่งจำค่า (SET Q = 1)'}
              {sInput === 0 && rInput === 1 && latchType === 'NOR' && 'สถานะ: ล้างค่า (RESET Q = 0)'}
              {isForbidden && 'สถานะ: ภาวะห้ามเกิด (INVALID!)'}
              {sInput === 1 && rInput === 1 && latchType === 'NAND' && 'สถานะ: คงค่าเดิม (Hold Memory Q = ' + q + ')'}
              {sInput === 0 && rInput === 1 && latchType === 'NAND' && 'สถานะ: สั่งจำค่า (SET Q = 1)'}
              {sInput === 1 && rInput === 0 && latchType === 'NAND' && 'สถานะ: ล้างค่า (RESET Q = 0)'}
            </div>
          </div>

          {/* Outputs Column */}
          <div className="space-y-4">
            
            {/* Q Lamp */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 w-36 text-center ${
              q === 1 
                ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                : 'bg-slate-900 border-gray-800'
            }`}>
              <div className="text-xs font-mono text-gray-400">OUTPUT Q:</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 flex items-center justify-center space-x-1.5 mt-1">
                <Zap className={`w-5 h-5 ${q === 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-600'}`} />
                <span>{q}</span>
              </div>
            </div>

            {/* Q_Bar Lamp */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 w-36 text-center ${
              qBar === 1 
                ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                : 'bg-slate-900 border-gray-800'
            }`}>
              <div className="text-xs font-mono text-gray-400">OUTPUT Q̄ (กลับค่า):</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 flex items-center justify-center space-x-1.5 mt-1">
                <Zap className={`w-5 h-5 ${qBar === 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-600'}`} />
                <span>{qBar}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
