import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, ShieldAlert, Sparkles, Sliders, RotateCcw } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const AnalogVsDigitalVisualizer: React.FC = () => {
  const [noiseLevel, setNoiseLevel] = useState<number>(0.25); // Noise amplitude ±V
  const [signalType, setSignalType] = useState<'both' | 'analog' | 'digital'>('both');
  const [voltageRange, setVoltageRange] = useState<number>(5); // 5V or 10V
  const [time, setTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation ticker
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTime(t => (t + 0.08) % (Math.PI * 4));
    }, 40);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Max analog levels formula: N = floor( Vrange / (2 * noise) )
  const totalNoiseBand = noiseLevel * 2;
  const maxAnalogLevels = totalNoiseBand > 0 ? Math.floor(voltageRange / totalNoiseBand) : 999;

  // Digital noise immunity margin
  const ttlLowMax = 0.8;
  const ttlHighMin = 2.0;
  const isDigitalExceeded = noiseLevel > 0.8; // If noise exceeds margin

  // Canvas drawing
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
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Midlines
    const analogMidY = height * 0.3;
    const digitalMidY = height * 0.75;

    // 1. Analog Waveform
    if (signalType === 'both' || signalType === 'analog') {
      // Baseline
      ctx.strokeStyle = '#334155';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, analogMidY);
      ctx.lineTo(width, analogMidY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Clean signal (faded)
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const angle = (x / width) * Math.PI * 4 + time;
        const y = analogMidY - Math.sin(angle) * (height * 0.18);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Noisy signal
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const angle = (x / width) * Math.PI * 4 + time;
        // Pseudo-random deterministic noise based on x and time
        const noise = (Math.sin(x * 0.4 + time * 3) * 0.6 + Math.cos(x * 0.8 - time * 2) * 0.4) * (noiseLevel * 40);
        const y = analogMidY - Math.sin(angle) * (height * 0.18) + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('ANALOG: สัญญาณเดิม (ฟ้า) vs ถูก Noise รบกวนถาวร (แดง)', 10, 20);
    }

    // 2. Digital Waveform & Regenerated Clean Output
    if (signalType === 'both' || signalType === 'digital') {
      // Logic thresholds
      const lowY = digitalMidY + height * 0.12;
      const highY = digitalMidY - height * 0.12;

      // Draw threshold bands
      ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
      ctx.fillRect(0, highY + 8, width, lowY - highY - 16);

      ctx.strokeStyle = '#475569';
      ctx.setLineDash([2, 4]);
      ctx.strokeRect(0, highY, width, 1);
      ctx.strokeRect(0, lowY, width, 1);
      ctx.setLineDash([]);

      // Digital noisy input
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const cycle = ((x / width) * 4 + time / (Math.PI)) % 2;
        const rawHigh = cycle < 1;
        const targetY = rawHigh ? highY : lowY;
        const noise = (Math.sin(x * 0.5 + time * 4) * 0.5 + Math.cos(x * 0.9 - time * 3) * 0.5) * (noiseLevel * 30);
        const y = targetY + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Regenerated Digital Output (Green, 100% Clean!)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const cycle = ((x / width) * 4 + time / (Math.PI)) % 2;
        const rawHigh = cycle < 1;
        // Output regenerates 0 and 1 cleanly as long as noise < margin
        const y = rawHigh ? highY : lowY;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Label
      ctx.fillStyle = '#10b981';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('DIGITAL: มี Noise แทรก (ส้ม) → กู้คืนเป็น 0/1 สมบูรณ์ 100% (เขียว)', 10, digitalMidY - 35);
    }
  }, [noiseLevel, signalType, voltageRange, time]);

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Waves className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลองเปรียบเทียบสัญญาณ & สัญญาณรบกวน (Signal vs Noise Simulator)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            ปรับระดับสัญญาณรบกวน (Noise) เพื่อสังเกตว่าทำไมสัญญาณดิจิทัลจึงทนทานกว่าสัญญาณแอนะล็อก
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center space-x-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          {(['both', 'analog', 'digital'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setSignalType(mode)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                signalType === mode
                  ? 'bg-[#0066cc] text-white shadow-xs'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
              }`}
            >
              {mode === 'both' ? 'เทียบพร้อมกัน' : mode === 'analog' ? 'เฉพาะแอนะล็อก' : 'เฉพาะดิจิทัล'}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Oscilloscope */}
      <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#1e293b] bg-[#0b0f19] shadow-inner">
        <canvas
          ref={canvasRef}
          width={700}
          height={320}
          className="w-full h-64 sm:h-72 object-cover block"
        />

        {/* Floating Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#1e293b]/80 hover:bg-[#1e293b] text-white border border-white/10 backdrop-blur-md transition cursor-pointer"
        >
          {isPaused ? '▶ เล่นสัญญาณต่อ' : '⏸ หยุดภาพชั่วคราว'}
        </button>
      </div>

      {/* Controls & Interactive Math Calculation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left: Interactive Sliders */}
        <div className="bg-[#f8fafc] dark:bg-[#1e293b]/70 border border-[#e2e8f0] dark:border-[#334155] p-4 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#0066cc]" />
              <span>ปรับระดับสัญญาณรบกวน (Noise Range)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 px-2 py-0.5 rounded-lg">
              ±{noiseLevel.toFixed(2)} V (แกว่ง {totalNoiseBand.toFixed(2)} V)
            </span>
          </div>

          <input
            type="range"
            min="0.05"
            max="1.20"
            step="0.05"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
            className="w-full accent-[#0066cc] cursor-pointer"
          />

          <div className="flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
            <span>ช่วงแรงดันใช้งาน (Voltage Range):</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setVoltageRange(5)}
                className={`px-2 py-0.5 rounded-lg font-mono text-xs cursor-pointer ${voltageRange === 5 ? 'bg-[#0066cc] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                0-5V
              </button>
              <button
                onClick={() => setVoltageRange(10)}
                className={`px-2 py-0.5 rounded-lg font-mono text-xs cursor-pointer ${voltageRange === 10 ? 'bg-[#0066cc] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                0-10V
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Exam Calculation Result */}
        <div className="bg-[#f8fafc] dark:bg-[#1e293b]/70 border border-[#e2e8f0] dark:border-[#334155] p-4 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#0f172a] dark:text-[#f8fafc] font-bold">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
              <span>คำนวณสดตามสูตร อ.ปวีณ:</span>
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              ได้ {maxAnalogLevels} รูปแบบ
            </span>
          </div>

          <div className="bg-white dark:bg-[#0b0f19] p-2.5 rounded-xl border border-[#e2e8f0] dark:border-[#334155] font-mono text-xs space-y-1">
            <div className="text-[#64748b]">ช่วงแรงดันรวม: ΔV = {voltageRange}V</div>
            <div className="text-[#64748b]">ช่วง Noise รวม: 2 × {noiseLevel.toFixed(2)}V = {totalNoiseBand.toFixed(2)}V</div>
            <div className="text-[#0066cc] dark:text-[#38bdf8] font-bold">
              N = ⌊ {voltageRange}V / {totalNoiseBand.toFixed(2)}V ⌋ = {maxAnalogLevels} รูปแบบ
            </div>
          </div>

          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] italic">
            * สัญญาณแอนะล็อกถูกจำกัดความละเอียดไว้เพียง {maxAnalogLevels} ระดับ ขณะที่ดิจิทัลมี Noise Margin สูง จึงกู้คืนตรรกะ 0/1 ได้สมบูรณ์
          </p>
        </div>

      </div>

    </div>
  );
};
