import React, { useState } from 'react';
import { Cpu, Zap, Activity, Sliders, CheckCircle2 } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const AdderDacVisualizer: React.FC = () => {
  const [tab, setTab] = useState<'adder' | 'dac'>('adder');

  // Full Adder State
  const [inputA, setInputA] = useState<0 | 1>(1);
  const [inputB, setInputB] = useState<0 | 1>(1);
  const [inputCin, setInputCin] = useState<0 | 1>(0);

  // Compute Full Adder Outputs
  const sum1 = inputA ^ inputB; // Intermediate XOR
  const carry1 = inputA & inputB; // Intermediate AND
  const sumFinal = sum1 ^ inputCin; // Sum = A ^ B ^ Cin
  const carry2 = sum1 & inputCin; // Intermediate AND
  const coutFinal = carry1 | carry2; // Cout = AB + Cin(A^B)

  // 4-bit R-2R DAC State
  const [b3, setB3] = useState<0 | 1>(1); // MSB
  const [b2, setB2] = useState<0 | 1>(0);
  const [b1, setB1] = useState<0 | 1>(1);
  const [b0, setB0] = useState<0 | 1>(0); // LSB
  const vRef = 5.0; // 5 Volts

  const digitalVal = (b3 * 8) + (b2 * 4) + (b1 * 2) + (b0 * 1);
  const vOut = (vRef * digitalVal) / 16;
  const stepResolution = vRef / 16; // 0.3125V

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <Cpu className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลองวงจรบวกเต็มรูปแบบ (Full Adder) & R-2R Ladder DAC
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            คลิกสลับค่าตรรกะเพื่อดูการไหลของสัญญาณและแรงดันไฟฟ้าแอนะล็อกที่สร้างจากสัญญาณดิจิทัล
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          <button
            onClick={() => setTab('adder')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              tab === 'adder'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            วงจร Full Adder (บวก 1-bit)
          </button>
          <button
            onClick={() => setTab('dac')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
              tab === 'dac'
                ? 'bg-[#0066cc] text-white shadow-xs'
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            วงจรแปลงดิจิทัลเป็นแอนะล็อก (R-2R DAC)
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Full Adder Schematic */}
      {tab === 'adder' && (
        <div className="space-y-5">
          
          {/* Controls: Inputs A, B, Cin */}
          <div className="flex flex-wrap items-center justify-center gap-6 bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
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

            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-gray-500">Carry In (Cin):</span>
              <button
                onClick={() => setInputCin(inputCin === 1 ? 0 : 1)}
                className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                  inputCin === 1 ? 'bg-[#eab308] text-white ring-2 ring-yellow-400 shadow-md shadow-yellow-500/30' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                }`}
              >
                {inputCin}
              </button>
            </div>
          </div>

          {/* Interactive Circuit Schematic SVG */}
          <div className="bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white overflow-x-auto">
            <div className="min-w-[550px] flex items-center justify-between relative py-6 px-4">
              
              {/* Left Column: Inputs */}
              <div className="space-y-8 z-10">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${inputA === 1 ? 'bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]' : 'bg-gray-600'}`} />
                  <span className="font-mono text-xs text-gray-300">A = {inputA}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${inputB === 1 ? 'bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]' : 'bg-gray-600'}`} />
                  <span className="font-mono text-xs text-gray-300">B = {inputB}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${inputCin === 1 ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]' : 'bg-gray-600'}`} />
                  <span className="font-mono text-xs text-gray-300">Cin = {inputCin}</span>
                </div>
              </div>

              {/* Middle: Gate Stages */}
              <div className="flex-1 px-8 space-y-6">
                
                {/* Half Adder 1 */}
                <div className="p-3 rounded-2xl bg-[#131b2e] border border-[#1e293b] space-y-2">
                  <div className="text-xs font-mono text-gray-400">Half Adder 1 (A, B):</div>
                  <div className="flex items-center justify-around text-xs font-mono">
                    <span className={`px-2 py-1 rounded-lg ${sum1 === 1 ? 'bg-[#0066cc]/40 text-[#38bdf8]' : 'bg-gray-800 text-gray-400'}`}>
                      A ⊕ B = {sum1}
                    </span>
                    <span className={`px-2 py-1 rounded-lg ${carry1 === 1 ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-400'}`}>
                      A · B = {carry1}
                    </span>
                  </div>
                </div>

                {/* Half Adder 2 + OR */}
                <div className="p-3 rounded-2xl bg-[#131b2e] border border-[#1e293b] space-y-2">
                  <div className="text-xs font-mono text-gray-400">Half Adder 2 (Sum1, Cin) + Carry OR:</div>
                  <div className="flex items-center justify-around text-xs font-mono">
                    <span className={`px-2 py-1 rounded-lg ${carry2 === 1 ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-400'}`}>
                      (A ⊕ B) · Cin = {carry2}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Final Outputs */}
              <div className="space-y-6 z-10">
                
                {/* Sum Output Lamp */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  sumFinal === 1 
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : 'bg-slate-900 border-gray-800'
                }`}>
                  <div className="text-xs font-mono text-gray-400">SUM (ผลบวก):</div>
                  <div className="text-xl font-mono font-bold text-emerald-400 flex items-center space-x-2">
                    <Zap className={`w-5 h-5 ${sumFinal === 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-600'}`} />
                    <span>S = {sumFinal}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1">A ⊕ B ⊕ Cin</div>
                </div>

                {/* Carry Output Lamp */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  coutFinal === 1 
                    ? 'bg-amber-950/60 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                    : 'bg-slate-900 border-gray-800'
                }`}>
                  <div className="text-xs font-mono text-gray-400">CARRY OUT (ตัวทด):</div>
                  <div className="text-xl font-mono font-bold text-amber-400 flex items-center space-x-2">
                    <Zap className={`w-5 h-5 ${coutFinal === 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-600'}`} />
                    <span>Cout = {coutFinal}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1">AB + Cin(A ⊕ B)</div>
                </div>

              </div>

            </div>
          </div>

          {/* Quick arithmetic check */}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between font-mono">
            <span>ตรวจสอบเลขคณิตฐานสอง:</span>
            <span className="font-bold text-sm">
              {inputA}₂ + {inputB}₂ + {inputCin}₂ = {inputA + inputB + inputCin}₁₀ = ({coutFinal}{sumFinal})₂
            </span>
          </div>

        </div>
      )}

      {/* Mode 2: R-2R Ladder DAC */}
      {tab === 'dac' && (
        <div className="space-y-5">
          
          {/* Digital Inputs B3 B2 B1 B0 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f8fafc] dark:bg-[#1e293b]/70 p-4 rounded-2xl border border-[#e2e8f0] dark:border-[#334155]">
            <div className="text-xs">
              <div className="font-bold text-[#0f172a] dark:text-[#f8fafc]">สวิตช์อินพุตดิจิทัล 4 บิต:</div>
              <div className="text-[#64748b] dark:text-[#94a3b8]">คลิกเพื่อเปลี่ยนตรรกะ 0 (GND) / 1 (5V)</div>
            </div>

            <div className="flex items-center space-x-3">
              {[
                { label: 'B3 (MSB)', val: b3, set: setB3, weight: '8' },
                { label: 'B2', val: b2, set: setB2, weight: '4' },
                { label: 'B1', val: b1, set: setB1, weight: '2' },
                { label: 'B0 (LSB)', val: b0, set: setB0, weight: '1' }
              ].map((bit, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1">
                  <span className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">{bit.label}</span>
                  <button
                    onClick={() => bit.set(bit.val === 1 ? 0 : 1)}
                    className={`w-10 h-10 rounded-xl font-mono font-bold text-base transition cursor-pointer ${
                      bit.val === 1 
                        ? 'bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/30 ring-2 ring-[#38bdf8]' 
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                    }`}
                  >
                    {bit.val}
                  </button>
                  <span className="text-xs font-mono text-[#94a3b8]">น้ำหนัก: {bit.weight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* R-2R Ladder Diagram & Analog Voltmeter Needle */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white">
            
            {/* Left 7 cols: Circuit diagram summary */}
            <div className="md:col-span-7 space-y-3">
              <div className="text-xs font-mono text-[#38bdf8] font-bold">
                วงจรตัวต้านทานแบบ R-2R Ladder Network
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                ใช้อัตราส่วนค่าความต้านทานเพียง 2 ค่าคือ <span className="text-yellow-400 font-mono">R</span> และ <span className="text-yellow-400 font-mono">2R</span> จึงแก้ปัญหาความคลาดเคลื่อนของตัวต้านทานแบบถ่วงน้ำหนัก (Weighted Resistor) ได้อย่างสมบูรณ์
              </p>

              <div className="p-3 bg-[#131b2e] rounded-xl border border-gray-800 text-xs font-mono space-y-1">
                <div className="text-gray-400">สูตรคำนวณแรงดันเอาต์พุต:</div>
                <div className="text-emerald-400 font-bold">
                  Vout = Vref × ( B3/2 + B2/4 + B1/8 + B0/16 )
                </div>
                <div className="text-gray-300">
                  = 5V × ({digitalVal} / 16) = <span className="text-yellow-300 font-bold text-sm">{vOut.toFixed(4)} V</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Analog Voltmeter Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#131b2e] rounded-2xl border border-gray-800">
              <div className="text-xs font-mono text-gray-400 mb-2">ANALOG VOLTMETER</div>
              
              {/* Dial visual */}
              <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
                <div className="absolute inset-0 rounded-t-full border-4 border-gray-700 border-b-0" />
                
                {/* Needle */}
                <div 
                  className="w-1 bg-red-500 h-20 origin-bottom transition-transform duration-500 ease-out shadow-[0_0_8px_#ef4444]"
                  style={{
                    transform: `rotate(${((vOut / vRef) * 160) - 80}deg)`
                  }}
                />
                <div className="w-4 h-4 rounded-full bg-white z-10 mb-[-8px]" />
              </div>

              {/* Digital Meter Readout */}
              <div className="mt-3 text-center">
                <div className="text-2xl font-mono font-bold text-yellow-400 tracking-wider">
                  {vOut.toFixed(3)} V
                </div>
                <div className="text-xs font-mono text-gray-400">
                  ความละเอียดต่อขั้น (Step) = {stepResolution.toFixed(4)} V
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
