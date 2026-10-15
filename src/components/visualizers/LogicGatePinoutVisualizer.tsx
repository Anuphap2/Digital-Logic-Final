import React, { useState } from 'react';
import { Cpu, Zap, Info } from 'lucide-react';

export const LogicGatePinoutVisualizer: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState<'7408' | '7432' | '7404' | '7486' | '7400' | '7402'>('7408');
  const [pin1, setPin1] = useState<0 | 1>(1);
  const [pin2, setPin2] = useState<0 | 1>(1);

  // Compute Pin 3 output for Gate 1
  const computePin3 = (): 0 | 1 => {
    if (selectedChip === '7408') return (pin1 && pin2) ? 1 : 0; // AND
    if (selectedChip === '7432') return (pin1 || pin2) ? 1 : 0; // OR
    if (selectedChip === '7404') return pin1 === 1 ? 0 : 1; // NOT (Pin 1 in -> Pin 2 out)
    if (selectedChip === '7486') return (pin1 !== pin2) ? 1 : 0; // XOR
    if (selectedChip === '7400') return !(pin1 && pin2) ? 1 : 0; // NAND
    if (selectedChip === '7402') return !(pin1 || pin2) ? 1 : 0; // NOR (Pin 2,3 in -> Pin 1 out)
    return 0;
  };

  const pin3 = computePin3();

  const chipInfo: Record<string, { name: string; desc: string; labRef: string }> = {
    '7408': { name: '74HC08 / 74LS08', desc: 'Quad 2-Input AND Gate (มี AND 4 ตัวในชิปเดียว)', labRef: 'ใบงานที่ 7 ข้อ 2' },
    '7432': { name: '74HC32 / 74LS32', desc: 'Quad 2-Input OR Gate (มี OR 4 ตัวในชิปเดียว)', labRef: 'ใบงานที่ 7 ข้อ 3' },
    '7404': { name: '74HC04 / 74LS04', desc: 'Hex Inverter / NOT Gate (มี NOT 6 ตัวในชิปเดียว)', labRef: 'ใบงานที่ 7 ข้อ 1' },
    '7486': { name: '74HC86 / 74LS86', desc: 'Quad 2-Input XOR Gate (Odd Parity Checker)', labRef: 'ใบงานที่ 7 ข้อ 4' },
    '7400': { name: '74HC00 / 74LS00', desc: 'Quad 2-Input NAND Gate (Universal Gate)', labRef: 'ใบงานที่ 7 ข้อ 5' },
    '7402': { name: '74HC02 / 74LS02', desc: 'Quad 2-Input NOR Gate (Universal Gate)', labRef: 'ใบงานที่ 7 ข้อ 6' },
  };

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
              แบบจำลองขาไอซีจริง DIP-14 (IC Pinout & Wiring - ใบงานที่ 7)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            ดูตำแหน่งขาจริง ขั้วไฟเลี้ยง VCC (ขา 14), GND (ขา 7) และทดลองป้อนลอจิกเข้าเกตตัวที่ 1
          </p>
        </div>

        {/* Chip Picker */}
        <div className="flex flex-wrap items-center gap-1 bg-[#f1f5f9] dark:bg-[#1e293b] p-1 rounded-2xl border border-[#e2e8f0] dark:border-[#334155] self-start sm:self-auto">
          {(['7408', '7432', '7404', '7486', '7400', '7402'] as const).map(chip => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                selectedChip === chip
                  ? 'bg-[#0066cc] text-white shadow-xs'
                  : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chip Visualizer & Interactive Gate 1 Test */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white">
        
        {/* Left 7 cols: DIP-14 IC Graphic */}
        <div className="md:col-span-7 flex flex-col items-center justify-center p-4 bg-[#131b2e] rounded-2xl border border-gray-800">
          
          {/* Chip top notch */}
          <div className="w-8 h-3 rounded-b-full bg-gray-900 border border-gray-700 mb-2" />
          
          <div className="font-mono text-sm font-bold text-[#38bdf8] mb-1">
            {chipInfo[selectedChip].name}
          </div>
          <div className="text-xs text-gray-400 font-mono mb-4 text-center">
            {chipInfo[selectedChip].desc} ({chipInfo[selectedChip].labRef})
          </div>

          {/* IC Body with 14 pins */}
          <div className="w-full max-w-sm grid grid-cols-2 gap-x-8 gap-y-2 text-xs font-mono">
            {/* Left pins (1-7) */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${pin1 === 1 ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                <span className="text-gray-300">ขา 1: Input 1A = {pin1}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${pin2 === 1 ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                <span className="text-gray-300">ขา 2: Input 1B = {pin2}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${pin3 === 1 ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]' : 'bg-gray-700'}`} />
                <span className="text-yellow-400 font-bold">ขา 3: Output 1Y = {pin3}</span>
              </div>
              <div className="text-gray-500 pl-5">ขา 4: Input 2A</div>
              <div className="text-gray-500 pl-5">ขา 5: Input 2B</div>
              <div className="text-gray-500 pl-5">ขา 6: Output 2Y</div>
              <div className="flex items-center space-x-2 text-red-400 font-bold">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span>ขา 7: GND (ต่อลงกราวด์ 0V)</span>
              </div>
            </div>

            {/* Right pins (14 down to 8) */}
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-end space-x-2 text-emerald-400 font-bold">
                <span>ขา 14: VCC (+5V ไฟเลี้ยง)</span>
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="text-gray-500 pr-5">ขา 13: Input 4B</div>
              <div className="text-gray-500 pr-5">ขา 12: Input 4A</div>
              <div className="text-gray-500 pr-5">ขา 11: Output 4Y</div>
              <div className="text-gray-500 pr-5">ขา 10: Input 3B</div>
              <div className="text-gray-500 pr-5">ขา 9: Input 3A</div>
              <div className="text-gray-500 pr-5">ขา 8: Output 3Y</div>
            </div>
          </div>

        </div>

        {/* Right 5 cols: Interactive Test Controls */}
        <div className="md:col-span-5 space-y-4">
          <div className="text-xs font-bold text-gray-300 font-mono border-b border-gray-800 pb-2">
            ทดลองป้อนสัญญาณเข้าเกต 1 (Gate 1 Test):
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">ขา 1 (Input A):</span>
              <button
                onClick={() => setPin1(pin1 === 1 ? 0 : 1)}
                className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                  pin1 === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8]' : 'bg-slate-800 text-gray-400'
                }`}
              >
                {pin1}
              </button>
            </div>

            {selectedChip !== '7404' && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">ขา 2 (Input B):</span>
                <button
                  onClick={() => setPin2(pin2 === 1 ? 0 : 1)}
                  className={`w-12 h-9 rounded-xl font-mono font-bold text-sm transition cursor-pointer ${
                    pin2 === 1 ? 'bg-[#0066cc] text-white ring-2 ring-[#38bdf8]' : 'bg-slate-800 text-gray-400'
                  }`}
                >
                  {pin2}
                </button>
              </div>
            )}
          </div>

          {/* Gate 1 Output Box */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 text-center ${
            pin3 === 1 
              ? 'bg-yellow-950/40 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' 
              : 'bg-slate-900 border-gray-800'
          }`}>
            <div className="text-xs font-mono text-gray-400">เอาต์พุต ขา 3 (Output Y):</div>
            <div className="text-2xl font-mono font-bold text-yellow-400 flex items-center justify-center space-x-2 mt-1">
              <Zap className={`w-5 h-5 ${pin3 === 1 ? 'text-yellow-300 animate-pulse' : 'text-gray-600'}`} />
              <span>{pin3}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {pin3 === 1 ? 'หลอดไฟ LED ที่ขา 3 จะสว่าง (Logic HIGH)' : 'หลอดไฟ LED ที่ขา 3 ดับ (Logic LOW)'}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
