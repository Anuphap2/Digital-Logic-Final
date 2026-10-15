import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Zap, HelpCircle } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const DeMorganVisualizer: React.FC = () => {
  const [law, setLaw] = useState<1 | 2>(1); // Law 1: (AB)' = A' + B' | Law 2: (A+B)' = A'B'
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);

  // Compute outputs
  // Law 1: NAND vs Inverted OR
  const nandOut = !(inputA && inputB) ? 1 : 0;
  const invOrOut = (!inputA || !inputB) ? 1 : 0;

  // Law 2: NOR vs Inverted AND
  const norOut = !(inputA || inputB) ? 1 : 0;
  const invAndOut = (!inputA && !inputB) ? 1 : 0;

  const leftResult = law === 1 ? nandOut : norOut;
  const rightResult = law === 1 ? invOrOut : invAndOut;
  const isEquivalent = leftResult === rightResult;

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลองกฎเดอมอร์แกน & การผลักบับเบิล (De Morgan & Bubble Logic)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            "ตัดบาร์ เปลี่ยนเครื่องหมาย" (Break the bar, change the operator) - พิสูจน์ความสมมูลด้วยภาพและวงจรสด
          </p>
        </div>

        {/* Law 1 vs Law 2 toggle */}
        <div className="flex items-center space-x-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          <button
            onClick={() => setLaw(1)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              law === 1
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            กฎข้อ 1: (A·B)' = A' + B'
          </button>
          <button
            onClick={() => setLaw(2)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              law === 2
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            กฎข้อ 2: (A+B)' = A'·B'
          </button>
        </div>
      </div>

      {/* Input Toggles */}
      <div className="flex items-center justify-center space-x-6 bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-gray-500">Input A:</span>
          <button
            onClick={() => setInputA(inputA === 1 ? 0 : 1)}
            className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
              inputA === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8] shadow-md shadow-[#0066cc]/40' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
            }`}
          >
            {inputA}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-gray-500">Input B:</span>
          <button
            onClick={() => setInputB(inputB === 1 ? 0 : 1)}
            className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
              inputB === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8] shadow-md shadow-[#0066cc]/40' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
            }`}
          >
            {inputB}
          </button>
        </div>
      </div>

      {/* Interactive Dual Circuit Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Circuit */}
        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-[#1e293b] text-white space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-[#38bdf8] border-b border-gray-800 pb-2">
            <span>ฝั่งซ้าย: {law === 1 ? 'NAND Gate (เกตเดี่ยว)' : 'NOR Gate (เกตเดี่ยว)'}</span>
            <span className="font-bold">{law === 1 ? '(A · B)\'' : '(A + B)\''}</span>
          </div>

          <div className="py-4 text-center font-mono text-sm space-y-2">
            <div className="text-gray-400">
              {law === 1 ? `(${inputA} · ${inputB})' = (${inputA && inputB ? 1 : 0})'` : `(${inputA} + ${inputB})' = (${inputA || inputB ? 1 : 0})'`}
            </div>
            <div className="text-xl font-bold text-emerald-400 flex items-center justify-center space-x-2">
              <Zap className={`w-5 h-5 ${leftResult === 1 ? 'text-yellow-300' : 'text-gray-600'}`} />
              <span>ผลลัพธ์ = {leftResult}</span>
            </div>
          </div>
        </div>

        {/* Right Circuit */}
        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-[#1e293b] text-white space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-[#38bdf8] border-b border-gray-800 pb-2">
            <span>ฝั่งขวา: {law === 1 ? 'Inverted OR (ผลักบับเบิลมาข้างหน้า)' : 'Inverted AND (ผลักบับเบิลมาข้างหน้า)'}</span>
            <span className="font-bold">{law === 1 ? 'A\' + B\'' : 'A\' · B\''}</span>
          </div>

          <div className="py-4 text-center font-mono text-sm space-y-2">
            <div className="text-gray-400">
              {law === 1 ? `${inputA === 1 ? 0 : 1} + ${inputB === 1 ? 0 : 1} = ${invOrOut}` : `${inputA === 1 ? 0 : 1} · ${inputB === 1 ? 0 : 1} = ${invAndOut}`}
            </div>
            <div className="text-xl font-bold text-emerald-400 flex items-center justify-center space-x-2">
              <Zap className={`w-5 h-5 ${rightResult === 1 ? 'text-yellow-300' : 'text-gray-600'}`} />
              <span>ผลลัพธ์ = {rightResult}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Verification Banner */}
      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-300">
        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          <strong>สมมูลกัน 100%:</strong> เมื่อทดสอบทุกคู่ตรรกะ (00, 01, 10, 11) ผลลัพธ์ของวงจรฝั่งซ้ายและฝั่งขวาจะให้ค่าตรงกันเสมอ สามารถแทนที่กันในวงจรจริงได้ทันที
        </span>
      </div>

    </div>
  );
};
