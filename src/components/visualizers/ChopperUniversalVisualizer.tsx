import React, { useState, useEffect, useRef } from 'react';
import { Activity, Layers, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const ChopperUniversalVisualizer: React.FC = () => {
  const [tab, setTab] = useState<'chopper' | 'universal'>('chopper');

  // Chopper state
  const [chopperFreq, setChopperFreq] = useState<number>(8); // Clock pulses
  const [inputLevel, setInputLevel] = useState<number>(1); // Input DC / slow level
  const [isChopping, setIsChopping] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  // Universal Gate Synthesis state
  const [baseGate, setBaseGate] = useState<'NAND' | 'NOR'>('NAND');
  const [targetGate, setTargetGate] = useState<'NOT' | 'AND' | 'OR' | 'XOR'>('NOT');
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation ticker for Chopper
  useEffect(() => {
    if (!isChopping) return;
    const interval = setInterval(() => {
      setTime(t => (t + 0.05) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isChopping]);

  // Canvas drawing for Chopper
  useEffect(() => {
    if (tab !== 'chopper') return;
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

    const row1Y = height * 0.22;
    const row2Y = height * 0.52;
    const row3Y = height * 0.82;

    // Row 1: Original Input Signal A (Sine or DC)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('INPUT A (สัญญาณเดิม)', 10, row1Y - 18);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const angle = (x / width) * Math.PI * 2 + time * 0.5;
      const val = inputLevel === 1 ? Math.sin(angle) * 0.5 + 0.5 : 1.0;
      const y = row1Y - val * 24;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Row 2: Chopping Clock Carrier Pulses
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('CARRIER CLOCK (สัญญาณนาฬิกาสับ)', 10, row2Y - 18);

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const cycle = ((x / width) * chopperFreq + time) % 1;
      const isHigh = cycle < 0.5;
      const y = row2Y - (isHigh ? 24 : 0);
      if (x === 0) ctx.moveTo(x, y);
      else {
        // Square wave edges
        const prevCycle = (((x - 1) / width) * chopperFreq + time) % 1;
        const prevHigh = prevCycle < 0.5;
        if (prevHigh !== isHigh) {
          ctx.lineTo(x, row2Y - (prevHigh ? 24 : 0));
        }
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Row 3: Output Chopped Waveform
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText('OUTPUT CHOPPED WAVE (สัญญาณถูกสับเป็นชิ้นย่อยๆ ตาม Clock)', 10, row3Y - 18);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const angle = (x / width) * Math.PI * 2 + time * 0.5;
      const val = inputLevel === 1 ? Math.sin(angle) * 0.5 + 0.5 : 1.0;
      const cycle = ((x / width) * chopperFreq + time) % 1;
      const isClockHigh = cycle < 0.5;
      const choppedVal = isClockHigh ? val : 0;
      const y = row3Y - choppedVal * 24;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

  }, [tab, chopperFreq, inputLevel, time]);

  // Compute Universal gate output
  const computeUniversalOutput = () => {
    if (targetGate === 'NOT') return inputA === 1 ? 0 : 1;
    if (targetGate === 'AND') return (inputA && inputB) ? 1 : 0;
    if (targetGate === 'OR') return (inputA || inputB) ? 1 : 0;
    if (targetGate === 'XOR') return (inputA !== inputB) ? 1 : 0;
    return 0;
  };

  const currentOutput = computeUniversalOutput();

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลอง Chopper Waveform & Universal Gates Playground
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            เห็นภาพคลื่นสับ Chopper จากสไลด์ อ.ปวีณ และทดลองสร้างเกตใดๆ จาก NAND / NOR เพียงชนิดเดียว
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          <button
            onClick={() => setTab('chopper')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              tab === 'chopper'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            วงจร Chopper (สับสัญญาณ)
          </button>
          <button
            onClick={() => setTab('universal')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              tab === 'universal'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            สังเคราะห์ Universal Gate
          </button>
        </div>
      </div>

      {/* Mode 1: Chopper Oscilloscope */}
      {tab === 'chopper' && (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] dark:border-[#1e293b] bg-[#0b0f19]">
            <canvas
              ref={canvasRef}
              width={700}
              height={260}
              className="w-full h-56 sm:h-64 object-cover block"
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] text-xs">
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-[#0f172a] dark:text-[#f8fafc]">
                <span>ความถี่คลื่นสับ (Chopping Frequency):</span>
                <span className="font-mono text-[#0066cc] dark:text-[#38bdf8]">{chopperFreq} Pulses</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="2"
                value={chopperFreq}
                onChange={(e) => setChopperFreq(parseInt(e.target.value))}
                className="w-full accent-[#0066cc] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="font-bold text-[#0f172a] dark:text-[#f8fafc]">รูปแบบสัญญาณ Input A:</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setInputLevel(1)}
                  className={`flex-1 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                    inputLevel === 1 ? 'bg-[#0066cc] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  สัญญาณไซน์แปรตามเวลา
                </button>
                <button
                  onClick={() => setInputLevel(0)}
                  className={`flex-1 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                    inputLevel === 0 ? 'bg-[#0066cc] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  ระดับแรงดันคงที่ (DC)
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#f0fdf4] dark:bg-emerald-950/30 border border-emerald-500/20 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
            💡 <strong>หลักการสำคัญในสไลด์ อ.ปวีณ:</strong> วงจร Chopper ทำหน้าที่เสมือนสวิตช์อิเล็กทรอนิกส์ความเร็วสูง เมื่อสัญญาณ Clock เป็น 1 สัญญาณอินพุตจะทะลุผ่านออกมาได้ แต่เมื่อ Clock เป็น 0 สัญญาณเอาต์พุตจะถูกตัดเป็น 0 ทำให้แปลงสัญญาณต่อเนื่องให้กลายเป็นพัลส์ย่อยๆ เพื่อส่งผ่านหม้อแปลงหรือประมวลผลต่อได้โดยไร้ Drift
          </div>
        </div>
      )}

      {/* Mode 2: Universal Gates Synthesis */}
      {tab === 'universal' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] text-xs">
            {/* Base Gate Picker */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#0f172a] dark:text-[#f8fafc]">ใช้เกตพื้นฐาน:</span>
              <div className="flex space-x-1">
                {(['NAND', 'NOR'] as const).map(bg => (
                  <button
                    key={bg}
                    onClick={() => setBaseGate(bg)}
                    className={`px-3 py-1 rounded-xl font-mono font-bold transition cursor-pointer ${
                      baseGate === bg
                        ? 'bg-[#0066cc] text-white shadow-xs'
                        : 'bg-white dark:bg-[#0b0f19] text-[#64748b] border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Gate Picker */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#0f172a] dark:text-[#f8fafc]">สังเคราะห์เป็นเกต:</span>
              <div className="flex space-x-1">
                {(['NOT', 'AND', 'OR', 'XOR'] as const).map(tg => (
                  <button
                    key={tg}
                    onClick={() => setTargetGate(tg)}
                    className={`px-3 py-1 rounded-xl font-mono font-bold transition cursor-pointer ${
                      targetGate === tg
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-[#0b0f19] text-[#64748b] border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {tg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Gate Schematic Diagram */}
          <div className="bg-[#0b0f19] p-6 rounded-2xl border border-[#1e293b] flex flex-col items-center justify-center space-y-5 text-white">
            
            {/* Input Switch Row */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-gray-400">Input A:</span>
                <button
                  onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                  className={`w-10 h-8 rounded-lg font-mono font-bold text-sm transition cursor-pointer ${
                    inputA === 1 ? 'bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/40 ring-2 ring-[#38bdf8]' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  {inputA}
                </button>
              </div>

              {targetGate !== 'NOT' && (
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-gray-400">Input B:</span>
                  <button
                    onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                    className={`w-10 h-8 rounded-lg font-mono font-bold text-sm transition cursor-pointer ${
                      inputB === 1 ? 'bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/40 ring-2 ring-[#38bdf8]' : 'bg-slate-800 text-gray-400'
                    }`}
                  >
                    {inputB}
                  </button>
                </div>
              )}
            </div>

            {/* Wiring Diagram Representation */}
            <div className="w-full max-w-lg p-5 rounded-2xl bg-[#131b2e] border border-[#1e293b] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-gray-800 pb-2">
                <span>แผนภาพการต่อสายจริง (Wiring Schematic):</span>
                <span className="text-[#38bdf8] font-bold">
                  {targetGate === 'NOT' ? 'ใช้ 1 เกต' : targetGate === 'AND' ? 'ใช้ 2 เกต' : targetGate === 'OR' ? 'ใช้ 3 เกต' : 'ใช้ 4 เกต'}
                </span>
              </div>

              <div className="py-2 text-center text-sm font-mono text-emerald-400">
                {baseGate === 'NAND' && targetGate === 'NOT' && (
                  <div>NAND(A, A) → รวมขารับอินพุตทั้ง 2 เข้าด้วยกัน = NOT A</div>
                )}
                {baseGate === 'NAND' && targetGate === 'AND' && (
                  <div>NAND(A, B) แล้วส่งต่อเข้า NOT(NAND) เพื่อกลับค่าให้กลายเป็น AND</div>
                )}
                {baseGate === 'NAND' && targetGate === 'OR' && (
                  <div>NOT(A) และ NOT(B) แล้วส่งเข้า NAND ตัวที่สาม → ได้ (A' · B')' = A + B</div>
                )}
                {baseGate === 'NAND' && targetGate === 'XOR' && (
                  <div>ต่อด้วย 4 NAND Gates: G1=NAND(A,B), G2=NAND(A,G1), G3=NAND(B,G1), Out=NAND(G2,G3)</div>
                )}
                {baseGate === 'NOR' && targetGate === 'NOT' && (
                  <div>NOR(A, A) → รวมขารับอินพุตทั้ง 2 เข้าด้วยกัน = NOT A</div>
                )}
                {baseGate === 'NOR' && targetGate === 'OR' && (
                  <div>NOR(A, B) แล้วส่งต่อเข้า NOT(NOR) เพื่อกลับค่ากลายเป็น OR</div>
                )}
                {baseGate === 'NOR' && targetGate === 'AND' && (
                  <div>NOT(A) และ NOT(B) แล้วส่งเข้า NOR ตัวที่สาม → ได้ (A' + B')' = A · B</div>
                )}
                {baseGate === 'NOR' && targetGate === 'XOR' && (
                  <div>ต่อด้วย 5 NOR Gates (หรือ 4 NOR หากจัดรูปผ่าน De Morgan)</div>
                )}
              </div>

              {/* Live Output Lamp */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <span className="text-xs font-mono text-gray-400">ผลลัพธ์ Output Y:</span>
                <div className={`px-4 py-1.5 rounded-xl font-mono font-bold text-base flex items-center space-x-2 transition ${
                  currentOutput === 1 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-gray-500'
                }`}>
                  <Zap className={`w-4 h-4 ${currentOutput === 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-600'}`} />
                  <span>Y = {currentOutput}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
