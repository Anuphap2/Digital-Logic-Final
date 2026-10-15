import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Play, Pause, RotateCcw, Zap, Sliders } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const FlipFlopTimingVisualizer: React.FC = () => {
  const [ffType, setFfType] = useState<'D' | 'JK' | 'T'>('D');
  const [inputD, setInputD] = useState<0 | 1>(1);
  const [inputJ, setInputJ] = useState<0 | 1>(1);
  const [inputK, setInputK] = useState<0 | 1>(0);
  const [inputT, setInputT] = useState<0 | 1>(1);

  const [q, setQ] = useState<0 | 1>(0);
  const [clockTick, setClockTick] = useState<number>(0);
  const [isAutoClock, setIsAutoClock] = useState<boolean>(false);

  // Waveform history buffer: each item has clk, d/j/k/t, and q
  const [history, setHistory] = useState<Array<{ clk: 0 | 1; q: 0 | 1 }>>([
    { clk: 0, q: 0 }
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger one clock pulse (0 -> 1 -> 0)
  const triggerClockPulse = () => {
    // Determine next Q on rising edge
    let nextQ: 0 | 1 = q;
    if (ffType === 'D') {
      nextQ = inputD;
    } else if (ffType === 'JK') {
      if (inputJ === 0 && inputK === 0) nextQ = q; // Hold
      else if (inputJ === 1 && inputK === 0) nextQ = 1; // Set
      else if (inputJ === 0 && inputK === 1) nextQ = 0; // Reset
      else if (inputJ === 1 && inputK === 1) nextQ = q === 1 ? 0 : 1; // Toggle!
    } else if (ffType === 'T') {
      if (inputT === 1) nextQ = q === 1 ? 0 : 1; // Toggle
      else nextQ = q; // Hold
    }

    setQ(nextQ);
    setClockTick(c => c + 1);

    setHistory(prev => {
      const updated = [
        ...prev,
        { clk: 1 as 0 | 1, q: nextQ },
        { clk: 0 as 0 | 1, q: nextQ }
      ];
      return updated.slice(-30); // keep last 30 samples
    });
  };

  // Auto clock timer
  useEffect(() => {
    if (!isAutoClock) return;
    const interval = setInterval(triggerClockPulse, 800);
    return () => clearInterval(interval);
  }, [isAutoClock, q, inputD, inputJ, inputK, inputT, ffType]);

  // Draw timing diagram on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const clkY = height * 0.35;
    const qY = height * 0.75;

    // Draw CLK label
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.fillText('CLOCK (CLK ⭡ ขอบขาขึ้น)', 10, clkY - 25);

    // Draw Q label
    ctx.fillStyle = '#10b981';
    ctx.fillText('OUTPUT Q (อัปเดตเฉพาะจังหวะขอบขาขึ้น)', 10, qY - 25);

    // Render history points
    const stepX = width / Math.max(history.length, 15);

    // CLK line
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    history.forEach((pt, i) => {
      const x = i * stepX;
      const y = clkY - (pt.clk === 1 ? 25 : 0);
      if (i === 0) ctx.moveTo(x, y);
      else {
        // Square transition
        const prevPt = history[i - 1];
        const prevY = clkY - (prevPt.clk === 1 ? 25 : 0);
        ctx.lineTo(x, prevY);
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Rising edge marker arrows
    history.forEach((pt, i) => {
      if (pt.clk === 1 && (i === 0 || history[i - 1].clk === 0)) {
        const x = i * stepX;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(x - 4, clkY - 10);
        ctx.lineTo(x + 4, clkY - 10);
        ctx.lineTo(x, clkY - 20);
        ctx.fill();
      }
    });

    // Q line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    history.forEach((pt, i) => {
      const x = i * stepX;
      const y = qY - (pt.q === 1 ? 25 : 0);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevPt = history[i - 1];
        const prevY = qY - (prevPt.q === 1 ? 25 : 0);
        ctx.lineTo(x, prevY);
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

  }, [history]);

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
              แบบจำลองฟลิปฟลอป & สัญญาณนาฬิกาขอบขาขึ้น (Edge-Triggered Flip-Flop)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            สังเกตการเปลี่ยนสถานะของเอาต์พุต Q ที่เกิดขึ้นเฉพาะจังหวะขอบขาขึ้น (Rising Edge ⭡) ของ Clock เท่านั้น
          </p>
        </div>

        {/* FF Type Picker */}
        <div className="flex items-center space-x-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          {(['D', 'JK', 'T'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFfType(type)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold font-mono transition cursor-pointer ${
                ffType === type
                  ? 'bg-[#0066cc] text-white shadow-xs'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
              }`}
            >
              {type}-FF
            </button>
          ))}
        </div>
      </div>

      {/* Timing Diagram Oscilloscope */}
      <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#1e293b] bg-[#0b0f19]">
        <canvas
          ref={canvasRef}
          width={700}
          height={240}
          className="w-full h-56 sm:h-64 object-cover block"
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] text-xs">
        
        {/* Left: Input values for selected FF */}
        <div className="space-y-3">
          <div className="font-bold text-[#0f172a] dark:text-[#f8fafc]">ตั้งค่าอินพุต:</div>

          {ffType === 'D' && (
            <div className="flex items-center space-x-3">
              <span className="font-mono text-gray-500 font-bold">Data (D):</span>
              <button
                onClick={() => setInputD(inputD === 1 ? 0 : 1)}
                className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                  inputD === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8]' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                }`}
              >
                {inputD}
              </button>
              <span className="text-[#64748b] dark:text-[#94a3b8]">
                {inputD === 1 ? 'เมื่อมีพัลส์ ข้อมูล 1 จะถูกส่งไปยัง Q' : 'เมื่อมีพัลส์ ข้อมูล 0 จะถูกส่งไปยัง Q'}
              </span>
            </div>
          )}

          {ffType === 'JK' && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-gray-500 font-bold">J:</span>
                <button
                  onClick={() => setInputJ(inputJ === 1 ? 0 : 1)}
                  className={`w-10 h-8 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                    inputJ === 1 ? 'bg-[#0066cc] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {inputJ}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-mono text-gray-500 font-bold">K:</span>
                <button
                  onClick={() => setInputK(inputK === 1 ? 0 : 1)}
                  className={`w-10 h-8 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                    inputK === 1 ? 'bg-[#0066cc] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                  }`}
                >
                  {inputK}
                </button>
              </div>

              <span className="text-[#64748b] dark:text-[#94a3b8] font-mono text-xs">
                {inputJ === 1 && inputK === 1 ? '🔥 โหมด Toggle สลับค่า Q ทุกพัลส์' : inputJ === 1 ? 'Set (Q=1)' : inputK === 1 ? 'Reset (Q=0)' : 'Hold คงค่าเดิม'}
              </span>
            </div>
          )}

          {ffType === 'T' && (
            <div className="flex items-center space-x-3">
              <span className="font-mono text-gray-500 font-bold">Toggle (T):</span>
              <button
                onClick={() => setInputT(inputT === 1 ? 0 : 1)}
                className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                  inputT === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8]' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                }`}
              >
                {inputT}
              </button>
              <span className="text-[#64748b] dark:text-[#94a3b8]">
                {inputT === 1 ? 'T=1: พลิกกลับค่า Q ทุกครั้งที่มี Clock' : 'T=0: คงค่าเดิม (Hold)'}
              </span>
            </div>
          )}
        </div>

        {/* Right: Clock triggers & Live Q */}
        <div className="flex flex-col justify-between space-y-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={triggerClockPulse}
              className="px-4 py-2 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold font-mono transition cursor-pointer flex items-center space-x-1.5 shadow-md shadow-[#0066cc]/30"
            >
              <Play className="w-3.5 h-3.5" />
              <span>ยิง Clock Pulse (⭡)</span>
            </button>

            <button
              onClick={() => setIsAutoClock(!isAutoClock)}
              className={`px-3 py-2 rounded-xl font-semibold transition cursor-pointer ${
                isAutoClock ? 'bg-amber-600 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {isAutoClock ? '⏸ หยุด Auto' : '▶ รัน Clock อัตโนมัติ'}
            </button>
          </div>

          <div className="flex items-center space-x-3 bg-white dark:bg-[#0b0f19] p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 font-mono">
            <span className="text-gray-400">สถานะเอาต์พุตปัจจุบัน:</span>
            <span className="text-emerald-500 font-bold text-base">Q = {q}</span>
            <span className="text-gray-400 text-xs">| Pulse Count: {clockTick}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
