import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const LogicFamiliesVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'tristate' | 'opencollector'>('tristate');

  // Tristate Bus states (2 drivers sharing a single bus line)
  const [driverAEnable, setDriverAEnable] = useState<boolean>(true);
  const [driverAData, setDriverAData] = useState<0 | 1>(1);

  const [driverBEnable, setDriverBEnable] = useState<boolean>(false);
  const [driverBData, setDriverBData] = useState<0 | 1>(0);

  // Open-Collector Wired-AND states (2 transistors pulling down)
  const [ocTransistorA, setOcTransistorA] = useState<0 | 1>(0); // 1 = conducting (pull low)
  const [ocTransistorB, setOcTransistorB] = useState<0 | 1>(0);

  // Compute Tristate Bus State
  let busState: '0' | '1' | 'Hi-Z' | 'CONTENTION_ERROR';
  if (driverAEnable && driverBEnable) {
    if (driverAData === driverBData) {
      busState = driverAData === 1 ? '1' : '0';
    } else {
      busState = 'CONTENTION_ERROR';
    }
  } else if (driverAEnable) {
    busState = driverAData === 1 ? '1' : '0';
  } else if (driverBEnable) {
    busState = driverBData === 1 ? '1' : '0';
  } else {
    busState = 'Hi-Z';
  }

  // Compute Open Collector Output (Wired-AND: if any transistor is ON (1), bus is pulled to GND 0)
  // With Pull-up, if neither pulls down (0 and 0), line is pulled to 5V (1)
  const wiredAndOut = ocTransistorA === 0 && ocTransistorB === 0 ? 1 : 0;

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
            แล็บจำลองพฤติกรรม Tristate Buffer (Hi-Z) & Open-Collector Wired-AND
          </h3>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
            ทดลองสวิตช์ขับสัญญาณร่วมบนบัสเส้นเดียวกัน สังเกตภาวะ High-Impedance (Hi-Z) และการเกิด Bus Contention
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-[#f1f5f9] dark:bg-[#1e293b] p-1.5 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
          <button
            onClick={() => setMode('tristate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              mode === 'tristate'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            Tristate Shared Bus
          </button>
          <button
            onClick={() => setMode('opencollector')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              mode === 'opencollector'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            Open-Collector Wired-AND
          </button>
        </div>
      </div>

      {mode === 'tristate' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Driver A */}
            <div className={`p-4 rounded-2xl border transition-all ${
              driverAEnable 
                ? 'bg-[#0066cc]/5 border-[#0066cc]/40 dark:bg-[#0066cc]/10 dark:border-[#0066cc]/50' 
                : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] opacity-75'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">Tristate Driver A</span>
                <button
                  onClick={() => setDriverAEnable(!driverAEnable)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    driverAEnable 
                      ? 'bg-[#10b981] text-white' 
                      : 'bg-[#64748b]/20 text-[#64748b] dark:text-[#94a3b8]'
                  }`}
                >
                  Enable OE: {driverAEnable ? 'ACTIVE (1)' : 'DISABLED (0)'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">Data Input A:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDriverAData(0)}
                    disabled={!driverAEnable}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      driverAData === 0 ? 'bg-[#ef4444] text-white' : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b]'
                    }`}
                  >
                    0 (0V)
                  </button>
                  <button
                    onClick={() => setDriverAData(1)}
                    disabled={!driverAEnable}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      driverAData === 1 ? 'bg-[#0066cc] text-white' : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b]'
                    }`}
                  >
                    1 (5V)
                  </button>
                </div>
              </div>

              <div className="mt-3 text-xs font-mono">
                เอาต์พุต A: <span className="font-bold">{driverAEnable ? (driverAData === 1 ? 'HIGH (5V)' : 'LOW (0V)') : 'Hi-Z (ลอย/ตัดการเชื่อมต่อ)'}</span>
              </div>
            </div>

            {/* Driver B */}
            <div className={`p-4 rounded-2xl border transition-all ${
              driverBEnable 
                ? 'bg-[#a855f7]/5 border-[#a855f7]/40 dark:bg-[#a855f7]/10 dark:border-[#a855f7]/50' 
                : 'bg-[#f8fafc] dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b] opacity-75'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">Tristate Driver B</span>
                <button
                  onClick={() => setDriverBEnable(!driverBEnable)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    driverBEnable 
                      ? 'bg-[#a855f7] text-white' 
                      : 'bg-[#64748b]/20 text-[#64748b] dark:text-[#94a3b8]'
                  }`}
                >
                  Enable OE: {driverBEnable ? 'ACTIVE (1)' : 'DISABLED (0)'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">Data Input B:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDriverBData(0)}
                    disabled={!driverBEnable}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      driverBData === 0 ? 'bg-[#ef4444] text-white' : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b]'
                    }`}
                  >
                    0 (0V)
                  </button>
                  <button
                    onClick={() => setDriverBData(1)}
                    disabled={!driverBEnable}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      driverBData === 1 ? 'bg-[#a855f7] text-white' : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b]'
                    }`}
                  >
                    1 (5V)
                  </button>
                </div>
              </div>

              <div className="mt-3 text-xs font-mono">
                เอาต์พุต B: <span className="font-bold">{driverBEnable ? (driverBData === 1 ? 'HIGH (5V)' : 'LOW (0V)') : 'Hi-Z (ลอย/ตัดการเชื่อมต่อ)'}</span>
              </div>
            </div>
          </div>

          {/* Shared Bus Line Display */}
          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b] text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#94a3b8]">Shared Data Bus Line (สายข้อมูลร่วม):</span>
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                busState === 'CONTENTION_ERROR' 
                  ? 'bg-[#ef4444] text-white animate-pulse'
                  : busState === 'Hi-Z'
                  ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                  : busState === '1'
                  ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30'
                  : 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
              }`}>
                {busState === 'CONTENTION_ERROR' && '⚠️ BUS CONTENTION (ไฟช็อต!)'}
                {busState === 'Hi-Z' && 'FLOATING / HIGH-Z (ความต้านทานสูง)'}
                {busState === '1' && 'LOGIC 1 (5V HIGH)'}
                {busState === '0' && 'LOGIC 0 (0V LOW)'}
              </span>
            </div>

            {/* Bus Wire SVG Visualizer */}
            <svg viewBox="0 0 600 80" className="w-full h-auto">
              {/* Bus Line */}
              <line 
                x1="40" 
                y1="40" 
                x2="560" 
                y2="40" 
                stroke={
                  busState === 'CONTENTION_ERROR' ? '#ef4444' :
                  busState === 'Hi-Z' ? '#64748b' :
                  busState === '1' ? '#38bdf8' : '#10b981'
                } 
                strokeWidth={busState === 'CONTENTION_ERROR' ? '4' : '3'}
                strokeDasharray={busState === 'Hi-Z' ? '4 4' : 'none'}
              />

              {/* Driver A Tap */}
              <line x1="120" y1="10" x2="120" y2="40" stroke={driverAEnable ? '#38bdf8' : '#475569'} strokeWidth="2" />
              <circle cx="120" cy="40" r="4" fill={driverAEnable ? '#38bdf8' : '#475569'} />
              <text x="120" y="8" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">Driver A</text>

              {/* Driver B Tap */}
              <line x1="280" y1="10" x2="280" y2="40" stroke={driverBEnable ? '#a855f7' : '#475569'} strokeWidth="2" />
              <circle cx="280" cy="40" r="4" fill={driverBEnable ? '#a855f7' : '#475569'} />
              <text x="280" y="8" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">Driver B</text>

              {/* Bus Receiver / Load */}
              <line x1="480" y1="40" x2="480" y2="65" stroke="#94a3b8" strokeWidth="2" />
              <rect x="440" y="65" width="80" height="15" rx="3" fill="#1e293b" stroke="#334155" />
              <text x="480" y="76" fill="#f8fafc" fontSize="9" fontFamily="monospace" textAnchor="middle">Bus Receiver</text>
            </svg>

            {busState === 'CONTENTION_ERROR' ? (
              <div className="flex items-start gap-2 p-3 bg-[#ef4444]/20 border border-[#ef4444]/40 rounded-xl text-xs text-[#ef4444]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>อันตราย! เกิด Bus Contention:</strong> Driver A พยายามขับแรงดัน 5V (HIGH) ขณะที่ Driver B พยายามดึงลง 0V (LOW) พร้อมกัน ส่งผลให้กระแสลัดวงจรไหลอย่างรุนแรง ไอซีจะร้อนจัดและเสียหายได้! ต้องออกแบบให้สัญญาณ Enable สลับกันทำงานทีละตัวเท่านั้น (Mutual Exclusion)
                </div>
              </div>
            ) : busState === 'Hi-Z' ? (
              <div className="flex items-start gap-2 p-3 bg-[#f59e0b]/15 border border-[#f59e0b]/30 rounded-xl text-xs text-[#f59e0b]">
                <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>สถานะ Hi-Z (High Impedance):</strong> เมื่อปิด Enable ของทั้งคู่ บัสจะลอยเคว้ง (Floating) เหมือนถอดสายไฟออก ไม่มีใครขับแรงดัน จึงไม่เปลืองพลังงานและพร้อมให้อุปกรณ์อื่นบนระบบเข้าใช้งาน
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-3 bg-[#10b981]/15 border border-[#10b981]/30 rounded-xl text-xs text-[#10b981]">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>ระบบทำงานถูกต้อง:</strong> มีเพียง Driver เดียวที่ขับสัญญาณลงบัส สัญญาณดิจิทัลถูกส่งต่อไปยังตัวรับปลายทางได้อย่างสมบูรณ์ ปลอดภัย 100%
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Open Collector Mode */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">ทรานซิสเตอร์ตัวที่ 1 (Q1)</span>
                <button
                  onClick={() => setOcTransistorA(ocTransistorA === 0 ? 1 : 0)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    ocTransistorA === 1 ? 'bg-[#ef4444] text-white' : 'bg-[#10b981] text-white'
                  }`}
                >
                  {ocTransistorA === 1 ? 'นำกระแส (Pull Down 0V)' : 'OFF (เปิดวงจร)'}
                </button>
              </div>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                เมื่อเป็น 1 ทรานซิสเตอร์จะช็อตสายสัญญาณลงกราวด์ (0V)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8fafc] dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">ทรานซิสเตอร์ตัวที่ 2 (Q2)</span>
                <button
                  onClick={() => setOcTransistorB(ocTransistorB === 0 ? 1 : 0)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    ocTransistorB === 1 ? 'bg-[#ef4444] text-white' : 'bg-[#10b981] text-white'
                  }`}
                >
                  {ocTransistorB === 1 ? 'นำกระแส (Pull Down 0V)' : 'OFF (เปิดวงจร)'}
                </button>
              </div>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                เมื่อเป็น 1 ทรานซิสเตอร์จะช็อตสายสัญญาณลงกราวด์ (0V)
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b] text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#94a3b8]">Wired-AND Output Bus (+5V ผ่าน Pull-up 10kΩ):</span>
              <span className={`px-4 py-1.5 rounded-xl text-sm font-mono font-bold ${
                wiredAndOut === 1 
                  ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
                  : 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30'
              }`}>
                แรงดันเอาต์พุต: {wiredAndOut === 1 ? '1 (5.0V ดึงขึ้นโดย Pull-up)' : '0 (0.0V ถูกดึงลงกราวด์)'}
              </span>
            </div>

            <div className="p-3 bg-[#1e293b] rounded-xl text-xs text-[#94a3b8] leading-relaxed">
              💡 <strong>หลักการ Wired-AND:</strong> ทรานซิสเตอร์แบบ Open-Collector ทำได้เพียง "ดึงลงกราวด์ (0)" เท่านั้น ไม่สามารถจ่ายไฟ 5V ได้เอง จึงต้องต่อตัวต้านทาน <strong>Pull-up Resistor (10 kΩ)</strong> ไว้ที่ไฟเลี้ยง +5V หากมีทรานซิสเตอร์แม้แต่ตัวเดียวที่นำกระแส สายจะกลายเป็น 0 ทันที เอาต์พุตจะเป็น 1 ได้เพียงกรณีเดียวคือ <strong>ทุกตัวต้องไม่นำกระแส (OFF พร้อมกัน)</strong> ซึ่งตรงกับฟังก์ชันบูลีน <strong>AND</strong> โดยไม่ต้องใช้ไอซี AND Gate เพิ่มเลยแม้แต่ตัวเดียว!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
