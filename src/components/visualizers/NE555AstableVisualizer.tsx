import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Zap, Activity, Clock, Lightbulb } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const NE555AstableVisualizer: React.FC = () => {
  // Lab 10 defaults: R1 = 1k, R2 = 71.5k, C = 10uF -> ~1Hz
  const [r1, setR1] = useState<number>(1); // kOhm
  const [r2, setR2] = useState<number>(71.5); // kOhm
  const [cVal, setCVal] = useState<number>(10); // uF

  const [ledState, setLedState] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculations
  const r1Ohm = r1 * 1000;
  const r2Ohm = r2 * 1000;
  const cFarad = cVal * 1e-6;

  // tHigh = 0.693 * (R1 + R2) * C
  const tHigh = 0.693 * (r1Ohm + r2Ohm) * cFarad;
  // tLow = 0.693 * R2 * C
  const tLow = 0.693 * r2Ohm * cFarad;
  const period = tHigh + tLow;
  // f = 1.44 / ((R1 + 2R2) * C)
  const frequency = period > 0 ? (1.44 / ((r1Ohm + 2 * r2Ohm) * cFarad)) : 0;
  const dutyCycle = period > 0 ? ((tHigh / period) * 100) : 50;

  // LED blinker based on calculated period
  useEffect(() => {
    if (period <= 0) return;
    const intervalMs = Math.max(Math.min(period * 1000, 3000), 50);

    const timer = setInterval(() => {
      setLedState(prev => !prev);
    }, intervalMs / 2);

    return () => clearInterval(timer);
  }, [period]);

  // Animation ticker for oscilloscope
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => (t + 0.08) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Oscilloscope canvas drawing
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

    const vcMid = height * 0.4;
    const voutMid = height * 0.8;

    // Threshold lines (1/3 Vcc and 2/3 Vcc)
    const upperY = vcMid - 35; // 2/3 Vcc
    const lowerY = vcMid + 35; // 1/3 Vcc

    ctx.strokeStyle = '#475569';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, upperY);
    ctx.lineTo(width, upperY);
    ctx.moveTo(0, lowerY);
    ctx.lineTo(width, lowerY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('2/3 Vcc (Threshold 3.33V)', 10, upperY - 4);
    ctx.fillText('1/3 Vcc (Trigger 1.67V)', 10, lowerY + 12);

    // Waveform 1: Capacitor Voltage Vc (Exponential Charge/Discharge)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const wavePeriodPixels = 80;
    const highRatio = dutyCycle / 100;

    for (let x = 0; x < width; x++) {
      const phase = ((x + time * 20) % wavePeriodPixels) / wavePeriodPixels;
      let y = vcMid;
      if (phase < highRatio) {
        // Charging towards 2/3 Vcc
        const tRel = phase / highRatio;
        y = lowerY - (lowerY - upperY) * (1 - Math.exp(-tRel * 1.5));
      } else {
        // Discharging towards 1/3 Vcc
        const tRel = (phase - highRatio) / (1 - highRatio);
        y = upperY + (lowerY - upperY) * (1 - Math.exp(-tRel * 1.5));
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Waveform 2: Output Pin 3 Square Wave
    ctx.fillStyle = '#10b981';
    ctx.fillText('OUTPUT PIN 3: สัญญาณสี่เหลี่ยมควบคุม LED', 10, voutMid - 30);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const phase = ((x + time * 20) % wavePeriodPixels) / wavePeriodPixels;
      const isHigh = phase < highRatio;
      const y = isHigh ? voutMid - 22 : voutMid;

      if (x === 0) ctx.moveTo(x, y);
      else {
        const prevPhase = ((x - 1 + time * 20) % wavePeriodPixels) / wavePeriodPixels;
        const prevHigh = prevPhase < highRatio;
        if (prevHigh !== isHigh) {
          ctx.lineTo(x, prevHigh ? voutMid - 22 : voutMid);
        }
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

  }, [dutyCycle, time]);

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
              แบบจำลองวงจรสร้างสัญญาณพัลส์ NE555 Astable Multivibrator (ใบงานที่ 10)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            ปรับค่า R1, R2, C เพื่อสังเกตการประจุ/คายประจุ และความถี่กระพริบของหลอด LED แบบเรียลไทม์
          </p>
        </div>

        {/* Live Blinking LED */}
        <div className="flex items-center space-x-3 bg-[#0b0f19] px-4 py-2 rounded-2xl border border-gray-800 self-start sm:self-auto">
          <div className={`w-5 h-5 rounded-full transition-all duration-100 ${
            ledState ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' : 'bg-gray-800'
          }`} />
          <span className="font-mono text-xs font-bold text-white">
            LED Pin 3: {ledState ? 'HIGH (สว่าง)' : 'LOW (ดับ)'}
          </span>
        </div>
      </div>

      {/* Oscilloscope Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#1e293b] bg-[#0b0f19]">
        <canvas
          ref={canvasRef}
          width={700}
          height={260}
          className="w-full h-56 sm:h-64 object-cover block"
        />
      </div>

      {/* Interactive Controls & Real-time Math */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Sliders */}
        <div className="bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] space-y-3 text-xs">
          <div className="font-bold text-[#0f172a] dark:text-[#f8fafc]">ปรับค่าอุปกรณ์ (ตามใบงานที่ 10):</div>

          {/* R1 */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span className="text-gray-500">ตัวต้านทาน R1:</span>
              <span className="font-bold text-[#0066cc] dark:text-[#38bdf8]">{r1.toFixed(1)} kΩ</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={r1}
              onChange={(e) => setR1(parseFloat(e.target.value))}
              className="w-full accent-[#0066cc] cursor-pointer"
            />
          </div>

          {/* R2 */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span className="text-gray-500">ตัวต้านทาน R2:</span>
              <span className="font-bold text-[#0066cc] dark:text-[#38bdf8]">{r2.toFixed(1)} kΩ</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="1"
              value={r2}
              onChange={(e) => setR2(parseFloat(e.target.value))}
              className="w-full accent-[#0066cc] cursor-pointer"
            />
          </div>

          {/* C */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono">
              <span className="text-gray-500">ตัวเก็บประจุ C:</span>
              <span className="font-bold text-[#0066cc] dark:text-[#38bdf8]">{cVal} µF</span>
            </div>
            <input
              type="range"
              min="1"
              max="47"
              step="1"
              value={cVal}
              onChange={(e) => setCVal(parseInt(e.target.value))}
              className="w-full accent-[#0066cc] cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculation Results */}
        <div className="bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] space-y-2 text-xs">
          <div className="font-bold text-[#0f172a] dark:text-[#f8fafc]">ผลการคำนวณตามสูตรสไลด์ อ.ปวีณ:</div>

          <div className="p-3 bg-white dark:bg-[#0b0f19] rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-xs space-y-1">
            <div className="text-gray-400">
              ความถี่พัลส์: f = 1.44 / [(R1 + 2R2) · C]
            </div>
            <div className="text-emerald-400 font-bold text-sm">
              = <span className="text-yellow-400 font-bold">{frequency.toFixed(3)} Hz</span> (คาบ T = {period.toFixed(3)} s)
            </div>
            <div className="text-gray-400 pt-1">
              Duty Cycle = (R1 + R2) / (R1 + 2R2) × 100%
            </div>
            <div className="text-[#38bdf8] font-bold">
              = {dutyCycle.toFixed(2)} % <span className="text-amber-400 text-xs">(ต้อง &gt; 50% เสมอ!)</span>
            </div>
          </div>

          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] italic">
            * ในแล็บ 10 อาจารย์กำหนดให้หลอด LED กระพริบ 1 Hz จึงเลือก R1 = 1 kΩ, R2 = 71.5 kΩ, C = 10 µF
          </p>
        </div>

      </div>

    </div>
  );
};
