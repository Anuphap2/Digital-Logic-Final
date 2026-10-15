import React, { useState } from 'react';
import { Layers, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const CanonicalFormsVisualizer: React.FC = () => {
  // Truth table outputs for m0 to m7
  const [tableY, setTableY] = useState<Record<number, 0 | 1>>({
    0: 1, // m0
    1: 0,
    2: 1, // m2
    3: 0,
    4: 1, // m4
    5: 0,
    6: 1, // m6
    7: 0
  });

  const toggleRow = (idx: number) => {
    setTableY(prev => ({
      ...prev,
      [idx]: prev[idx] === 1 ? 0 : 1
    }));
  };

  const setAllOnes = () => {
    const next: Record<number, 0 | 1> = {};
    for (let i = 0; i < 8; i++) next[i] = 1;
    setTableY(next);
  };

  const setEvenOnes = () => {
    const next: Record<number, 0 | 1> = {};
    for (let i = 0; i < 8; i++) next[i] = i % 2 === 0 ? 1 : 0;
    setTableY(next);
  };

  // Extract minterms (Y=1) and maxterms (Y=0)
  const minterms: number[] = [];
  const maxterms: number[] = [];
  for (let i = 0; i < 8; i++) {
    if (tableY[i] === 1) minterms.push(i);
    else maxterms.push(i);
  }

  // Generate algebraic minterms strings
  const mintermVars = (idx: number) => {
    const a = idx & 4 ? 'A' : "A'";
    const b = idx & 2 ? 'B' : "B'";
    const c = idx & 1 ? 'C' : "C'";
    return `${a}${b}${c}`;
  };

  // Generate algebraic maxterms strings
  const maxtermVars = (idx: number) => {
    const a = idx & 4 ? "A'" : 'A';
    const b = idx & 2 ? "B'" : 'B';
    const c = idx & 1 ? "C'" : 'C';
    return `(${a} + ${b} + ${c})`;
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
              ตารางความจริงสู่ Canonical Forms (Minterms ∑m vs Maxterms ∏M)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            คลิกเปลี่ยนค่าช่องเอาต์พุต Y เพื่อดูการสังเคราะห์สมการ SOP และ POS แบบอัตโนมัติทันที
          </p>
        </div>

        {/* Preset buttons */}
        <div className="flex space-x-1.5 self-start sm:self-auto">
          <button
            onClick={setEvenOnes}
            className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
          >
            เลขคู่ (0,2,4,6)
          </button>
          <button
            onClick={setAllOnes}
            className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
          >
            เป็น 1 ทั้งหมด
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Interactive 8-row truth table */}
        <div className="lg:col-span-5 bg-[#0b0f19] p-4 rounded-2xl border border-[#1e293b] text-white">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-1.5 text-left">Row</th>
                <th className="py-1.5">A</th>
                <th className="py-1.5">B</th>
                <th className="py-1.5">C</th>
                <th className="py-1.5 text-center">Output Y</th>
                <th className="py-1.5 text-right">Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(idx => {
                const a = (idx >> 2) & 1;
                const b = (idx >> 1) & 1;
                const c = idx & 1;
                const y = tableY[idx];

                return (
                  <tr 
                    key={idx} 
                    className={`transition-colors ${y === 1 ? 'bg-emerald-950/20' : 'bg-purple-950/20'}`}
                  >
                    <td className="py-1.5 text-gray-500 font-bold">{idx}</td>
                    <td className="py-1.5 text-center text-gray-300">{a}</td>
                    <td className="py-1.5 text-center text-gray-300">{b}</td>
                    <td className="py-1.5 text-center text-gray-300">{c}</td>
                    <td className="py-1.5 text-center">
                      <button
                        onClick={() => toggleRow(idx)}
                        className={`w-7 h-6 rounded-lg font-bold text-xs transition cursor-pointer ${
                          y === 1 ? 'bg-emerald-500 text-white shadow-xs' : 'bg-purple-600 text-white shadow-xs'
                        }`}
                      >
                        {y}
                      </button>
                    </td>
                    <td className="py-1.5 text-right font-bold">
                      {y === 1 ? (
                        <span className="text-emerald-400">m{idx}</span>
                      ) : (
                        <span className="text-purple-400">M{idx}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right: Generated Canonical SOP & POS Equations */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* SOP Card */}
          <div className="bg-[#f0fdf4] dark:bg-emerald-950/30 border border-emerald-500/25 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span>รูปแบบ SOP (Sum of Products) - นำเฉพาะแถวที่ Y = 1:</span>
              <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                ∑m({minterms.join(', ') || 'ไม่มี'})
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-[#0b0f19] rounded-xl border border-emerald-500/20 font-mono text-xs text-[#0f172a] dark:text-[#f8fafc] overflow-x-auto">
              <span className="text-gray-400">Y = </span>
              {minterms.length > 0 ? (
                minterms.map((m, i) => (
                  <span key={m} className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {mintermVars(m)}{i < minterms.length - 1 ? ' + ' : ''}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">0</span>
              )}
            </div>
          </div>

          {/* POS Card */}
          <div className="bg-[#faf5ff] dark:bg-purple-950/30 border border-purple-500/25 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-800 dark:text-purple-300">
              <span>รูปแบบ POS (Product of Sums) - นำเฉพาะแถวที่ Y = 0:</span>
              <span className="font-mono bg-purple-500/20 px-2 py-0.5 rounded-lg">
                ∏M({maxterms.join(', ') || 'ไม่มี'})
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-[#0b0f19] rounded-xl border border-purple-500/20 font-mono text-xs text-[#0f172a] dark:text-[#f8fafc] overflow-x-auto">
              <span className="text-gray-400">Y = </span>
              {maxterms.length > 0 ? (
                maxterms.map((M) => (
                  <span key={M} className="text-purple-600 dark:text-purple-400 font-bold">
                    {maxtermVars(M)}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">1</span>
              )}
            </div>
          </div>

          {/* Duality Insight */}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            💡 <strong>เทคนิคทำข้อสอบ อ.ปวีณ:</strong> เซตของ Minterms และ Maxterms คือส่วนเติมเต็ม (Complement) ของกันและกันเสมอ เช่น ถ้า $\sum m(0, 2, 4, 6)$ จะได้ $\prod M(1, 3, 5, 7)$ ทันทีโดยไม่ต้องตั้งตารางใหม่!
          </div>

        </div>

      </div>

    </div>
  );
};
