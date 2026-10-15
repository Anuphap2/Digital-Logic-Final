import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ShieldCheck, Play, RotateCcw, Zap } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const StaticHazardVisualizer: React.FC = () => {
  const [aState, setAState] = useState<1 | 0>(1); // A switches 1 -> 0
  const [hasConsensus, setHasConsensus] = useState<boolean>(false);
  const [inverterDelay, setInverterDelay] = useState<number>(12); // ns
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger A transition with delay simulation
  const triggerTransition = () => {
    const nextA = aState === 1 ? 0 : 1;
    setAState(nextA);

    // If transitioning 1 -> 0 and no consensus term, trigger temporary glitch
    if (nextA === 0 && !hasConsensus) {
      setGlitchActive(true);
      setTimeout(() => {
        setGlitchActive(false);
      }, inverterDelay * 40);
    }
  };

  // Draw oscilloscope waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const tMid = width * 0.45;
    const delayWidth = (inverterDelay / 20) * 60;

    // Trace 1: Input A (Transitions from 1 to 0)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('SIGNAL A (1 → 0)', 10, 25);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 35);
    ctx.lineTo(tMid, 35);
    ctx.lineTo(tMid, 55);
    ctx.lineTo(width - 10, 55);
    ctx.stroke();

    // Trace 2: Term 1 (A · B) -> drops at tMid
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('PATH 1: A · B (ตกทันที)', 10, 75);

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 85);
    ctx.lineTo(tMid, 85);
    ctx.lineTo(tMid, 105);
    ctx.lineTo(width - 10, 105);
    ctx.stroke();

    // Trace 3: Term 2 (A\' · C) -> rises AFTER inverter delay!
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`PATH 2: A' · C (ดีเลย์ ${inverterDelay}ns จาก NOT Gate)`, 10, 125);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 155);
    ctx.lineTo(tMid + delayWidth, 155);
    ctx.lineTo(tMid + delayWidth, 135);
    ctx.lineTo(width - 10, 135);
    ctx.stroke();

    // Trace 4: Output Y
    ctx.fillStyle = hasConsensus ? '#10b981' : '#ef4444';
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText(
      hasConsensus 
        ? 'OUTPUT Y: สะอาดบริสุทธิ์ ไม่มี Glitch (มีเทอม B·C ค้ำไว้)' 
        : 'OUTPUT Y: เกิด Static-1 Hazard Glitch (วูบเป็น 0 ชั่วขณะ!)', 
      10, 175
    );

    ctx.strokeStyle = hasConsensus ? '#10b981' : '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 190);

    if (hasConsensus) {
      // Perfectly flat 1
      ctx.lineTo(width - 10, 190);
    } else {
      // Glitch dip
      ctx.lineTo(tMid, 190);
      ctx.lineTo(tMid, 220); // dips to 0
      ctx.lineTo(tMid + delayWidth, 220);
      ctx.lineTo(tMid + delayWidth, 190); // recovers to 1
      ctx.lineTo(width - 10, 190);
    }
    ctx.stroke();

    // Glitch highlight zone
    if (!hasConsensus) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.fillRect(tMid, 10, delayWidth, height - 20);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.fillText('GLITCH!', tMid + 2, height - 10);
    }

  }, [aState, hasConsensus, inverterDelay]);

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลอง Static-1 Hazard & สัญญาณกวน (Glitch Simulator)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            สาธิตความล่าช้าของเกต (Gate Delay) ที่ทำให้เอาต์พุตวูบเป็น 0 ชั่วคราว และการแก้ด้วย Consensus Term (B·C)
          </p>
        </div>

        {/* Consensus Toggle Button */}
        <button
          onClick={() => setHasConsensus(!hasConsensus)}
          className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer self-start sm:self-auto ${
            hasConsensus
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
              : 'bg-[#f1f5f9] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] border border-[#e2e8f0] dark:border-[#334155]'
          }`}
        >
          {hasConsensus ? <ShieldCheck className="w-4 h-4 text-white" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
          <span>{hasConsensus ? 'ใส่เทอม Consensus (B · C) แล้ว' : 'ยังไม่ใส่ Consensus Term'}</span>
        </button>
      </div>

      {/* Oscilloscope Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#1e293b] bg-[#0b0f19]">
        <canvas
          ref={canvasRef}
          width={700}
          height={240}
          className="w-full h-56 sm:h-64 object-cover block"
        />
      </div>

      {/* Interactive Controls & Real-time Equations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Controls */}
        <div className="bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0f172a] dark:text-[#f8fafc]">สลับค่าอินพุต A:</span>
            <button
              onClick={triggerTransition}
              className="px-4 py-2 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold font-mono transition cursor-pointer flex items-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>ส่งพัลส์ A ({aState} → {aState === 1 ? 0 : 1})</span>
            </button>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between font-bold text-[#0f172a] dark:text-[#f8fafc]">
              <span>ความล่าช้าของ NOT Gate (Propagation Delay):</span>
              <span className="font-mono text-[#0066cc] dark:text-[#38bdf8]">{inverterDelay} ns</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              value={inverterDelay}
              onChange={(e) => setInverterDelay(parseInt(e.target.value))}
              className="w-full accent-[#0066cc] cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Equation */}
        <div className="bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] space-y-2 text-xs">
          <div className="font-bold text-[#0f172a] dark:text-[#f8fafc]">สมการวงจรที่กำลังจำลอง:</div>
          <div className="p-3 bg-white dark:bg-[#0b0f19] rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-xs">
            <div className="text-gray-400">Y = A·B + A'·C {hasConsensus && <span className="text-emerald-400 font-bold">+ B·C</span>}</div>
            <div className="mt-1 text-gray-500">
              เมื่อกำหนดให้ B = 1 และ C = 1 → Y ควรเป็น 1 ตลอดเวลา
            </div>
          </div>

          <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
            hasConsensus
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20'
          }`}>
            <span>
              {hasConsensus 
                ? '✅ ปลอดภัย 100%: เทอม B·C ทำหน้าที่ส่งลอจิก 1 หล่อเลี้ยงเอาต์พุตไว้ตลอดการเปลี่ยนผ่าน'
                : '⚠️ เสี่ยงอันตราย: มีช่วงเวลาสั้นๆ ที่ทั้งสองเส้นทางเป็น 0 ทำให้เกิด Glitch สัญญาณรบกวน'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
