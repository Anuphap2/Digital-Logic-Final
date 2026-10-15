import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MathView } from './LatexRenderer';
import { 
  Cpu, 
  Layers, 
  Sliders, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Check, 
  Droplets, 
  Zap, 
  Activity 
} from 'lucide-react';

export const SimulatorsView: React.FC = () => {
  const { activeSimulatorTab, setActiveSimulatorTab } = useApp();

  // Tab 1: Gates Simulator State
  const [gateA, setGateA] = useState<number>(1);
  const [gateB, setGateB] = useState<number>(0);
  const [gateCin, setGateCin] = useState<number>(0);

  // Tab 2: K-Map Solver State
  const [kmapVars, setKmapVars] = useState<2 | 3 | 4>(3);
  const [kmapCells, setKmapCells] = useState<Record<number, '0' | '1' | 'X'>>({
    0: '0', 1: '1', 2: '0', 3: '1', 4: '0', 5: '1', 6: '0', 7: '1',
    8: '0', 9: '0', 10: '0', 11: '0', 12: '0', 13: '0', 14: '0', 15: '0'
  });

  // Tab 3: Flip-Flop Lab State
  const [ffType, setFfType] = useState<'D' | 'JK' | 'T' | 'SR'>('JK');
  const [ffInput1, setFfInput1] = useState<number>(1); // J or S or D or T
  const [ffInput2, setFfInput2] = useState<number>(0); // K or R
  const [ffQ, setFfQ] = useState<number>(0);
  const [ffHistory, setFfHistory] = useState<{ step: number; clock: number; q: number; inputs: string }[]>([
    { step: 0, clock: 0, q: 0, inputs: 'Init' }
  ]);
  const [clockCount, setClockCount] = useState<number>(0);

  // Tab 4: Water Pump FSM State (Dr. Paween's exam problem)
  const [waterLevel, setWaterLevel] = useState<number>(15);
  const [fsmState, setFsmState] = useState<0 | 1>(0);

  const sensorA = waterLevel >= 30 ? 1 : 0;
  const sensorB = waterLevel >= 75 ? 1 : 0;
  const pumpOutput = fsmState === 0 ? 1 : 0;

  const computeNextState = (curr: 0 | 1, a: number, b: number): 0 | 1 => {
    if (curr === 0) {
      if (a === 1 && b === 1) return 1;
      return 0;
    } else {
      if (a === 0 && b === 0) return 0;
      return 1;
    }
  };

  const nextFsmState = computeNextState(fsmState, sensorA, sensorB);

  useEffect(() => {
    if (activeSimulatorTab !== 'fsm') return;
    const interval = setInterval(() => {
      setWaterLevel(prev => {
        if (pumpOutput === 1) {
          return Math.min(prev + 4, 95);
        } else {
          return Math.max(prev - 3, 5);
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [pumpOutput, activeSimulatorTab]);

  useEffect(() => {
    setFsmState(nextFsmState);
  }, [sensorA, sensorB]);

  const triggerClockPulse = () => {
    const nextClock = clockCount + 1;
    setClockCount(nextClock);

    let nextQ = ffQ;
    let label = '';

    if (ffType === 'D') {
      nextQ = ffInput1;
      label = `D=${ffInput1}`;
    } else if (ffType === 'T') {
      if (ffInput1 === 1) nextQ = ffQ === 1 ? 0 : 1;
      label = `T=${ffInput1}`;
    } else if (ffType === 'JK') {
      const J = ffInput1;
      const K = ffInput2;
      label = `J=${J}, K=${K}`;
      if (J === 0 && K === 0) nextQ = ffQ;
      else if (J === 0 && K === 1) nextQ = 0;
      else if (J === 1 && K === 0) nextQ = 1;
      else if (J === 1 && K === 1) nextQ = ffQ === 1 ? 0 : 1;
    } else if (ffType === 'SR') {
      const S = ffInput1;
      const R = ffInput2;
      label = `S=${S}, R=${R}`;
      if (S === 0 && R === 0) nextQ = ffQ;
      else if (S === 0 && R === 1) nextQ = 0;
      else if (S === 1 && R === 0) nextQ = 1;
      else if (S === 1 && R === 1) {
        nextQ = 0;
        label += ' (FORBIDDEN!)';
      }
    }

    setFfQ(nextQ);
    setFfHistory(prev => [
      ...prev.slice(-8),
      { step: nextClock, clock: 1, q: nextQ, inputs: label }
    ]);
  };

  const toggleKmapCell = (index: number) => {
    setKmapCells(prev => {
      const cur = prev[index] || '0';
      const next = cur === '0' ? '1' : cur === '1' ? 'X' : '0';
      return { ...prev, [index]: next };
    });
  };

  const getKmapFormula = () => {
    if (kmapVars === 2) {
      const ones = [0, 1, 2, 3].filter(i => kmapCells[i] === '1');
      if (ones.length === 0) return '0';
      if (ones.length === 4) return '1';
      if (kmapCells[0] === '1' && kmapCells[1] === '1' && kmapCells[2] === '0' && kmapCells[3] === '0') return "A'";
      if (kmapCells[2] === '1' && kmapCells[3] === '1' && kmapCells[0] === '0' && kmapCells[1] === '0') return "A";
      if (kmapCells[0] === '1' && kmapCells[2] === '1' && kmapCells[1] === '0' && kmapCells[3] === '0') return "B'";
      if (kmapCells[1] === '1' && kmapCells[3] === '1' && kmapCells[0] === '0' && kmapCells[2] === '0') return "B";
      return ones.map(i => {
        if (i === 0) return "A'B'";
        if (i === 1) return "A'B";
        if (i === 2) return "AB'";
        return "AB";
      }).join(' + ');
    } else if (kmapVars === 3) {
      const ones = Array.from({ length: 8 }, (_, i) => i).filter(i => kmapCells[i] === '1');
      if (ones.length === 0) return '0';
      if (ones.length === 8) return '1';
      if (ones.length === 4) {
        if ([0, 2, 4, 6].every(i => kmapCells[i] === '1')) return "C'";
        if ([1, 3, 5, 7].every(i => kmapCells[i] === '1')) return "C";
        if ([0, 1, 2, 3].every(i => kmapCells[i] === '1')) return "A'";
        if ([4, 5, 6, 7].every(i => kmapCells[i] === '1')) return "A";
      }
      return `\\sum m(${ones.join(', ')})`;
    } else {
      const ones = Array.from({ length: 16 }, (_, i) => i).filter(i => kmapCells[i] === '1');
      if (ones.length === 0) return '0';
      if (ones.length === 16) return '1';
      if (kmapCells[0] === '1' && kmapCells[2] === '1' && kmapCells[8] === '1' && kmapCells[10] === '1' && ones.length === 4) {
        return "B'D'";
      }
      return `\\sum m(${ones.join(', ')})`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Simulator Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border border-[#e6dfd8] dark:border-[#3d3d3a]">
              Interactive Lab
            </span>
            <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">จำลองการทำงานของฮาร์ดแวร์แบบ Real-time</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#141413] dark:text-[#faf9f5] mt-1">
            แล็บจำลองวงจรดิจิทัล & FSM
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#efe9de] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] p-1.5 rounded-xl space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveSimulatorTab('gates')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'gates' 
                ? 'bg-[#cc785c] text-white shadow-sm' 
                : 'text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Logic Gates & Adders</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('kmap')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'kmap' 
                ? 'bg-[#cc785c] text-white shadow-sm' 
                : 'text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>K-Map Solver</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('flipflop')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'flipflop' 
                ? 'bg-[#cc785c] text-white shadow-sm' 
                : 'text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Flip-Flop & Clock Lab</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('fsm')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'fsm' 
                ? 'bg-[#cc785c] text-white shadow-sm' 
                : 'text-[#6c6a64] dark:text-[#a09d96] hover:text-[#141413]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Water Pump FSM (ข้อสอบจริง)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LOGIC GATES & ADDERS */}
      {activeSimulatorTab === 'gates' && (
        <div className="space-y-6">
          <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 shadow-sm">
            <h2 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5] mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#cc785c]" />
              กำหนดค่าสัญญาณอินพุต (Input Signals)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Input A */}
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">สัญญาณอินพุต A</div>
                  <div className="text-xl font-bold font-mono text-[#141413] dark:text-[#faf9f5]">A = {gateA}</div>
                </div>
                <button
                  onClick={() => setGateA(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all ${
                    gateA === 1 
                      ? 'bg-[#5db872] text-white shadow-sm' 
                      : 'bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64] dark:text-[#8e8b82]'
                  }`}
                >
                  {gateA === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>

              {/* Input B */}
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">สัญญาณอินพุต B</div>
                  <div className="text-xl font-bold font-mono text-[#141413] dark:text-[#faf9f5]">B = {gateB}</div>
                </div>
                <button
                  onClick={() => setGateB(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all ${
                    gateB === 1 
                      ? 'bg-[#5db872] text-white shadow-sm' 
                      : 'bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64] dark:text-[#8e8b82]'
                  }`}
                >
                  {gateB === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>

              {/* Input Cin */}
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">ตัวทดเข้า Cin (Full Adder)</div>
                  <div className="text-xl font-bold font-mono text-[#141413] dark:text-[#faf9f5]">Cin = {gateCin}</div>
                </div>
                <button
                  onClick={() => setGateCin(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all ${
                    gateCin === 1 
                      ? 'bg-[#e8a55a] text-white shadow-sm' 
                      : 'bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64] dark:text-[#8e8b82]'
                  }`}
                >
                  {gateCin === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>
            </div>
          </div>

          {/* Gates Results Grid with MathView */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { name: 'NOT (A)', formula: "\\bar{A}", val: gateA === 1 ? 0 : 1 },
              { name: 'AND', formula: 'A \\cdot B', val: gateA && gateB ? 1 : 0 },
              { name: 'OR', formula: 'A + B', val: gateA || gateB ? 1 : 0 },
              { name: 'NAND', formula: '\\overline{AB}', val: !(gateA && gateB) ? 1 : 0 },
              { name: 'NOR', formula: '\\overline{A+B}', val: !(gateA || gateB) ? 1 : 0 },
              { name: 'XOR', formula: 'A \\oplus B', val: gateA !== gateB ? 1 : 0 },
              { name: 'XNOR', formula: '\\overline{A \\oplus B}', val: gateA === gateB ? 1 : 0 },
            ].map(g => (
              <div 
                key={g.name}
                className={`p-4 rounded-xl border transition-all ${
                  g.val === 1 
                    ? 'bg-[#efe9de] dark:bg-[#252320] border-[#cc785c]' 
                    : 'bg-[#faf9f5] dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320]'
                }`}
              >
                <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">{g.name}</div>
                <div className="text-xs text-[#cc785c] my-0.5">
                  <MathView math={g.formula} />
                </div>
                <div className={`text-2xl font-bold font-mono mt-1 ${
                  g.val === 1 ? 'text-[#5db872]' : 'text-[#8e8b82]'
                }`}>
                  {g.val}
                </div>
              </div>
            ))}
          </div>

          {/* Adders Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Half Adder Card */}
            <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] px-2.5 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                  Half Adder (HA)
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">A + B</span>
              </div>
              <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5]">วงจรบวกครึ่งตัว</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1 mb-4">
                บวกอินพุต A ({gateA}) กับ B ({gateB}) ได้ผลลัพธ์เลขฐานสอง 2 บิต:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                  <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                    Sum (<MathView math="S = A \oplus B" />)
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#cc785c] mt-1">
                    {gateA ^ gateB}
                  </div>
                </div>
                <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                  <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                    Carry (<MathView math="C = A \cdot B" />)
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#5db872] mt-1">
                    {gateA & gateB}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs font-mono text-[#6c6a64] dark:text-[#8e8b82] bg-[#f5f0e8] dark:bg-[#181715] p-2.5 rounded-lg border border-[#e6dfd8] dark:border-[#252320]">
                ผลลัพธ์ในฐานสิบ: {gateA} + {gateB} = {(gateA & gateB) * 2 + (gateA ^ gateB)} (ไบนารี: {gateA & gateB}{gateA ^ gateB}₂)
              </div>
            </div>

            {/* Full Adder Card */}
            <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#5db8a6] bg-[#efe9de] dark:bg-[#252320] px-2.5 py-0.5 rounded border border-[#e6dfd8] dark:border-[#3d3d3a]">
                  Full Adder (FA)
                </span>
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">A + B + Cin</span>
              </div>
              <h3 className="font-serif text-lg text-[#141413] dark:text-[#faf9f5]">วงจรบวกเต็มตัว</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1 mb-4">
                บวก A ({gateA}) + B ({gateB}) + Cin ({gateCin}) รับตัวทดจากหลักก่อนหน้าได้:
              </p>

              {(() => {
                const faSum = gateA ^ gateB ^ gateCin;
                const faCout = (gateA & gateB) | (gateCin & (gateA ^ gateB));
                return (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                        <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                          Sum (<MathView math="S = A \oplus B \oplus C_{in}" />)
                        </div>
                        <div className="text-3xl font-bold font-mono text-[#5db8a6] mt-1">
                          {faSum}
                        </div>
                      </div>
                      <div className="bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                        <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                          Carry Out (<MathView math="C_{out}" />)
                        </div>
                        <div className="text-3xl font-bold font-mono text-[#5db872] mt-1">
                          {faCout}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-mono text-[#6c6a64] dark:text-[#8e8b82] bg-[#f5f0e8] dark:bg-[#181715] p-2.5 rounded-lg border border-[#e6dfd8] dark:border-[#252320]">
                      ผลลัพธ์ในฐานสิบ: {gateA} + {gateB} + {gateCin} = {faCout * 2 + faSum} (ไบนารี: {faCout}{faSum}₂)
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: K-MAP SOLVER */}
      {activeSimulatorTab === 'kmap' && (
        <div className="space-y-6">
          <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#cc785c]" />
                  K-Map Grid & Live Solver
                </h2>
                <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">คลิกที่แต่ละช่องเพื่อเปลี่ยนค่า (0 → 1 → X) และดูผลการลดรูป</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">จำนวนตัวแปร:</span>
                {[2, 3, 4].map(v => (
                  <button
                    key={v}
                    onClick={() => setKmapVars(v as 2 | 3 | 4)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                      kmapVars === v 
                        ? 'bg-[#cc785c] text-white' 
                        : 'bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413]'
                    }`}
                  >
                    {v} ตัวแปร
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Variable K-Map Display */}
            {kmapVars === 3 && (
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[420px] max-w-lg mx-auto bg-[#f5f0e8] dark:bg-[#181715] p-6 rounded-2xl border border-[#e6dfd8] dark:border-[#252320]">
                  <div className="text-center font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-3">
                    แกนตั้ง: A (0, 1) | แกนนอน: BC (00, 01, 11, 10 Gray Code)
                  </div>

                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#8e8b82] bg-[#efe9de] dark:bg-[#252320]">A \ BC</th>
                        <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320]">00</th>
                        <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320]">01</th>
                        <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320]">11</th>
                        <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320]">10</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] font-bold">0</td>
                        {[0, 1, 3, 2].map(cellIdx => (
                          <td 
                            key={cellIdx}
                            onClick={() => toggleKmapCell(cellIdx)}
                            className={`p-4 border border-[#e6dfd8] dark:border-[#252320] cursor-pointer transition select-none ${
                              kmapCells[cellIdx] === '1' 
                                ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-bold text-xl' 
                                : kmapCells[cellIdx] === 'X'
                                ? 'bg-[#e8a55a]/20 text-[#e8a55a] font-bold text-xl'
                                : 'bg-transparent text-[#8e8b82] hover:bg-[#efe9de]/50'
                            }`}
                          >
                            <div className="text-xs text-[#8e8b82] font-mono mb-0.5">m{cellIdx}</div>
                            {kmapCells[cellIdx] || '0'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] font-bold">1</td>
                        {[4, 5, 7, 6].map(cellIdx => (
                          <td 
                            key={cellIdx}
                            onClick={() => toggleKmapCell(cellIdx)}
                            className={`p-4 border border-[#e6dfd8] dark:border-[#252320] cursor-pointer transition select-none ${
                              kmapCells[cellIdx] === '1' 
                                ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-bold text-xl' 
                                : kmapCells[cellIdx] === 'X'
                                ? 'bg-[#e8a55a]/20 text-[#e8a55a] font-bold text-xl'
                                : 'bg-transparent text-[#8e8b82] hover:bg-[#efe9de]/50'
                            }`}
                          >
                            <div className="text-xs text-[#8e8b82] font-mono mb-0.5">m{cellIdx}</div>
                            {kmapCells[cellIdx] || '0'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4-Variable K-Map Display */}
            {kmapVars === 4 && (
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[480px] max-w-xl mx-auto bg-[#f5f0e8] dark:bg-[#181715] p-6 rounded-2xl border border-[#e6dfd8] dark:border-[#252320]">
                  <div className="text-center font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82] mb-3">
                    แกนตั้ง: AB (00, 01, 11, 10) | แกนนอน: CD (00, 01, 11, 10)
                  </div>

                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#8e8b82] bg-[#efe9de] dark:bg-[#252320]">AB \ CD</th>
                        {['00', '01', '11', '10'].map(cd => (
                          <th key={cd} className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320]">{cd}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { ab: '00', cells: [0, 1, 3, 2] },
                        { ab: '01', cells: [4, 5, 7, 6] },
                        { ab: '11', cells: [12, 13, 15, 14] },
                        { ab: '10', cells: [8, 9, 11, 10] },
                      ].map(row => (
                        <tr key={row.ab}>
                          <td className="p-2.5 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] bg-[#efe9de] dark:bg-[#252320] font-bold">{row.ab}</td>
                          {row.cells.map(cellIdx => (
                            <td 
                              key={cellIdx}
                              onClick={() => toggleKmapCell(cellIdx)}
                              className={`p-3 border border-[#e6dfd8] dark:border-[#252320] cursor-pointer transition select-none ${
                                kmapCells[cellIdx] === '1' 
                                  ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-bold text-lg' 
                                  : kmapCells[cellIdx] === 'X'
                                  ? 'bg-[#e8a55a]/20 text-[#e8a55a] font-bold text-lg'
                                  : 'bg-transparent text-[#8e8b82] hover:bg-[#efe9de]/50'
                              }`}
                            >
                              <div className="text-xs text-[#8e8b82] font-mono">{cellIdx}</div>
                              {kmapCells[cellIdx] || '0'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2-Variable K-Map Display */}
            {kmapVars === 2 && (
              <div className="max-w-xs mx-auto bg-[#f5f0e8] dark:bg-[#181715] p-6 rounded-2xl border border-[#e6dfd8] dark:border-[#252320]">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#8e8b82]">A \ B</th>
                      <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c]">0</th>
                      <th className="p-2 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c]">1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] font-bold">0</td>
                      {[0, 1].map(i => (
                        <td 
                          key={i}
                          onClick={() => toggleKmapCell(i)}
                          className={`p-4 border border-[#e6dfd8] dark:border-[#252320] cursor-pointer font-bold text-xl select-none ${
                            kmapCells[i] === '1' ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c]' : 'text-[#8e8b82]'
                          }`}
                        >
                          <div className="text-xs text-[#8e8b82] font-mono">m{i}</div>
                          {kmapCells[i] || '0'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border border-[#e6dfd8] dark:border-[#252320] text-xs font-mono text-[#cc785c] font-bold">1</td>
                      {[2, 3].map(i => (
                        <td 
                          key={i}
                          onClick={() => toggleKmapCell(i)}
                          className={`p-4 border border-[#e6dfd8] dark:border-[#252320] cursor-pointer font-bold text-xl select-none ${
                            kmapCells[i] === '1' ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c]' : 'text-[#8e8b82]'
                          }`}
                        >
                          <div className="text-xs text-[#8e8b82] font-mono">m{i}</div>
                          {kmapCells[i] || '0'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Minimized Expression with MathView */}
            <div className="mt-6 bg-[#f5f0e8] dark:bg-[#181715] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs text-[#6c6a64] dark:text-[#8e8b82] font-mono">สมการลดรูปขั้นต่ำ (Minimized Expression):</div>
                <div className="text-lg font-bold text-[#cc785c] mt-0.5">
                  <MathView math={`F = ${getKmapFormula()}`} />
                </div>
              </div>
              <button
                onClick={() => setKmapCells({})}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6c6a64] dark:text-[#a09d96] bg-[#efe9de] dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#3d3d3a] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ตตารางเป็น 0 ทั้งหมด</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FLIP-FLOP & CLOCK LAB */}
      {activeSimulatorTab === 'flipflop' && (
        <div className="space-y-6">
          <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#cc785c]" />
                  Flip-Flop State Transition & Excitation Lab
                </h2>
                <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">เลือกชนิดฟลิปฟลอป กำหนดอินพุต แล้วกดปุ่มส่งสัญญาณ Clock Edge</p>
              </div>

              <div className="flex items-center space-x-1.5 bg-[#f5f0e8] dark:bg-[#181715] p-1 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                {(['JK', 'D', 'T', 'SR'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setFfType(t);
                      if (t === 'D' || t === 'T') setFfInput2(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition ${
                      ffType === t ? 'bg-[#cc785c] text-white' : 'text-[#6c6a64] dark:text-[#8e8b82]'
                    }`}
                  >
                    {t} FF
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inputs & Clock Trigger */}
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-5 rounded-xl border border-[#e6dfd8] dark:border-[#252320] space-y-4">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6c6a64] dark:text-[#8e8b82]">
                  ควบคุมอินพุต (Inputs)
                </h3>

                <div className="flex items-center justify-between bg-[#faf9f5] dark:bg-[#1f1e1b] p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320]">
                  <span className="font-mono text-sm font-bold text-[#141413] dark:text-[#faf9f5]">
                    {ffType === 'JK' ? 'Input J' : ffType === 'SR' ? 'Input S' : ffType === 'D' ? 'Input D' : 'Input T'}
                  </span>
                  <button
                    onClick={() => setFfInput1(prev => prev === 1 ? 0 : 1)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs ${
                      ffInput1 === 1 ? 'bg-[#cc785c] text-white' : 'bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64]'
                    }`}
                  >
                    {ffInput1}
                  </button>
                </div>

                {(ffType === 'JK' || ffType === 'SR') && (
                  <div className="flex items-center justify-between bg-[#faf9f5] dark:bg-[#1f1e1b] p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320]">
                    <span className="font-mono text-sm font-bold text-[#141413] dark:text-[#faf9f5]">
                      {ffType === 'JK' ? 'Input K' : 'Input R'}
                    </span>
                    <button
                      onClick={() => setFfInput2(prev => prev === 1 ? 0 : 1)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs ${
                        ffInput2 === 1 ? 'bg-[#cc785c] text-white' : 'bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64]'
                      }`}
                    >
                      {ffInput2}
                    </button>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={triggerClockPulse}
                    className="w-full py-3 px-4 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white font-bold text-sm shadow-md shadow-[#cc785c]/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>ส่งสัญญาณ Clock Edge (CLK ↑)</span>
                  </button>
                  <div className="text-center text-xs text-[#8e8b82] font-mono mt-2">
                    จังหวะ Clock Pulse ที่: {clockCount}
                  </div>
                </div>
              </div>

              {/* State Output Display */}
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-5 rounded-xl border border-[#e6dfd8] dark:border-[#252320] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6c6a64] dark:text-[#8e8b82] mb-4">
                    สถานะปัจจุบันของฟลิปฟลอป (Current State)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] text-center">
                      <div className="text-xs font-mono text-[#6c6a64] dark:text-[#8e8b82]">เอาต์พุต Q</div>
                      <div className={`text-4xl font-bold font-mono mt-1 ${ffQ === 1 ? 'text-[#5db872]' : 'text-[#8e8b82]'}`}>
                        {ffQ}
                      </div>
                    </div>
                    <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] text-center">
                      <div className="text-xs font-mono text-[#6c6a64] dark:text-[#8e8b82]">เอาต์พุต Q' (Invert)</div>
                      <div className={`text-4xl font-bold font-mono mt-1 ${ffQ === 0 ? 'text-[#5db872]' : 'text-[#8e8b82]'}`}>
                        {ffQ === 1 ? 0 : 1}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#efe9de] dark:bg-[#252320] text-xs space-y-1">
                  <div className="text-[#3d3d3a] dark:text-[#faf9f5]">
                    <span className="font-semibold">โหมดการทำงาน:</span>{' '}
                    {ffType === 'JK' && (
                      ffInput1 === 0 && ffInput2 === 0 ? 'คงค่าเดิม (Hold: Q ไม่เปลี่ยน)' :
                      ffInput1 === 0 && ffInput2 === 1 ? 'รีเซ็ต (Reset: Q กลายเป็น 0)' :
                      ffInput1 === 1 && ffInput2 === 0 ? 'เซ็ต (Set: Q กลายเป็น 1)' :
                      'ท็อกเกิล (Toggle: Q สลับค่าตรงข้าม)'
                    )}
                    {ffType === 'D' && `รับค่าใหม่ Q_next = D = ${ffInput1}`}
                    {ffType === 'T' && (ffInput1 === 1 ? 'ท็อกเกิล (Toggle: หารความถี่/2)' : 'คงค่าเดิม (Hold)')}
                    {ffType === 'SR' && (
                      ffInput1 === 1 && ffInput2 === 1 ? '❌ FORBIDDEN STATE!' : 'ทำงานปกติ'
                    )}
                  </div>
                </div>
              </div>

              {/* History Waveform Trace */}
              <div className="bg-[#f5f0e8] dark:bg-[#181715] p-5 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6c6a64] dark:text-[#8e8b82] mb-3">
                  ประวัติการเปลี่ยนสถานะ (Timing History)
                </h3>
                <div className="space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto pr-1">
                  {ffHistory.slice().reverse().map((h, i) => (
                    <div 
                      key={i} 
                      className="p-2 rounded bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between"
                    >
                      <span className="text-[#8e8b82]">CLK #{h.step}</span>
                      <span className="text-[#cc785c]">{h.inputs}</span>
                      <span className="font-bold text-[#5db872]">Q = {h.q}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WATER PUMP FSM */}
      {activeSimulatorTab === 'fsm' && (
        <div className="space-y-6">
          <div className="bg-[#faf9f5] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] border border-[#e6dfd8] dark:border-[#3d3d3a]">
                    โจทย์ข้อสอบจริง สไลด์หน้า 151-163
                  </span>
                </div>
                <h2 className="font-serif text-xl text-[#141413] dark:text-[#faf9f5] mt-1">
                  ระบบควบคุมปั๊มน้ำอัตโนมัติด้วย Finite State Machine (Moore)
                </h2>
                <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                  เซ็นเซอร์ระดับน้ำล่าง (a) และบน (b) ควบคุมปั๊มน้ำ (y) พร้อมวิเคราะห์รหัสใน ROM
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setWaterLevel(10)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#efe9de] dark:bg-[#252320] text-[#3d3d3a] dark:text-[#faf9f5] border border-[#e6dfd8] dark:border-[#3d3d3a]"
                >
                  น้ำแห้ง (Drain)
                </button>
                <button
                  onClick={() => setWaterLevel(90)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#efe9de] dark:bg-[#252320] text-[#3d3d3a] dark:text-[#faf9f5] border border-[#e6dfd8] dark:border-[#3d3d3a]"
                >
                  น้ำเต็ม (Fill)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Water Tank Graphic */}
              <div className="lg:col-span-5 bg-[#f5f0e8] dark:bg-[#181715] p-6 rounded-2xl border border-[#e6dfd8] dark:border-[#252320] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6c6a64] dark:text-[#8e8b82] mb-4 flex items-center justify-between">
                    <span>ถังพักน้ำจำลอง (Water Tank)</span>
                    <span className="text-[#cc785c] font-mono">{waterLevel}%</span>
                  </h3>

                  <div className="relative h-64 w-full bg-[#efe9de] dark:bg-[#252320] rounded-2xl border-2 border-[#e6dfd8] dark:border-[#3d3d3a] overflow-hidden shadow-inner">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-[#5db8a6]/70 transition-all duration-300 rounded-b-xl"
                      style={{ height: `${waterLevel}%` }}
                    />

                    <div className="absolute top-[25%] left-0 right-0 border-b border-dashed border-[#c64545]/60 flex items-center justify-between px-3">
                      <span className="text-xs font-mono text-[#c64545] bg-[#faf9f5]/90 dark:bg-[#181715]/90 px-1.5 py-0.5 rounded border border-[#c64545]/40">
                        เซ็นเซอร์ b (บน): {sensorB ? 'จุ่มน้ำ (1)' : 'ไม่จุ่มน้ำ (0)'}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${sensorB ? 'bg-[#c64545]' : 'bg-[#8e8b82]'}`} />
                    </div>

                    <div className="absolute bottom-[30%] left-0 right-0 border-b border-dashed border-[#e8a55a]/60 flex items-center justify-between px-3">
                      <span className="text-xs font-mono text-[#e8a55a] bg-[#faf9f5]/90 dark:bg-[#181715]/90 px-1.5 py-0.5 rounded border border-[#e8a55a]/40">
                        เซ็นเซอร์ a (ล่าง): {sensorA ? 'จุ่มน้ำ (1)' : 'ไม่จุ่มน้ำ (0)'}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${sensorA ? 'bg-[#e8a55a]' : 'bg-[#8e8b82]'}`} />
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                      <span>ปรับระดับน้ำด้วยตนเอง:</span>
                      <span className="font-mono">{waterLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(parseInt(e.target.value))}
                      className="w-full accent-[#cc785c] cursor-pointer"
                    />
                  </div>
                </div>

                <div className={`mt-4 p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  pumpOutput === 1 
                    ? 'bg-[#5db872]/15 border-[#5db872]/40 text-[#5db872]' 
                    : 'bg-[#c64545]/15 border-[#c64545]/40 text-[#c64545]'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Droplets className={`w-5 h-5 ${pumpOutput === 1 ? 'animate-pulse text-[#5db872]' : 'text-[#c64545]'}`} />
                    <span className="text-sm font-bold">
                      สถานะปั๊มน้ำ (y): {pumpOutput === 1 ? 'กำลังสูบน้ำเข้าถัง (ON)' : 'ปิดการทำงาน (OFF)'}
                    </span>
                  </div>
                  <span className="text-lg font-mono font-bold">y = {pumpOutput}</span>
                </div>
              </div>

              {/* Right: Moore FSM States & ROM Table */}
              <div className="lg:col-span-7 bg-[#f5f0e8] dark:bg-[#181715] p-6 rounded-2xl border border-[#e6dfd8] dark:border-[#252320] space-y-5">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6c6a64] dark:text-[#8e8b82] mb-3">
                    แผนภาพสถานะแบบ MOORE (State Diagram)
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border transition-all ${
                      fsmState === 0 
                        ? 'bg-[#efe9de] dark:bg-[#252320] border-[#cc785c] shadow-sm' 
                        : 'bg-[#faf9f5] dark:bg-[#1f1e1b] border-[#e6dfd8] dark:border-[#252320] opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#cc785c]">State 0</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#faf9f5] dark:bg-[#181715] text-[#cc785c] font-mono border border-[#e6dfd8] dark:border-[#252320]">y = 1</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#141413] dark:text-[#faf9f5]">สถานะเปิดปั๊มน้ำ</h4>
                      <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">
                        จะเปลี่ยนไป State 1 เมื่อเซ็นเซอร์ a=1 และ b=1 (น้ำเต็มถังแล้ว)
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${
                      fsmState === 1 
                        ? 'bg-[#efe9de] dark:bg-[#252320] border-[#cc785c] shadow-sm' 
                        : 'bg-[#faf9f5] dark:bg-[#1f1e1b] border-[#e6dfd8] dark:border-[#252320] opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#cc785c]">State 1</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#faf9f5] dark:bg-[#181715] text-[#c64545] font-mono border border-[#e6dfd8] dark:border-[#252320]">y = 0</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#141413] dark:text-[#faf9f5]">สถานะปิดปั๊มน้ำ</h4>
                      <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-1">
                        จะเปลี่ยนไป State 0 เมื่อเซ็นเซอร์ a=0 และ b=0 (น้ำแห้งต่ำกว่า a)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6c6a64] dark:text-[#8e8b82] mb-2">
                    ตารางข้อมูลใน ROM (ROM Content Lookup Table)
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-[#efe9de] dark:bg-[#252320] text-[#6c6a64] dark:text-[#8e8b82] border-b border-[#e6dfd8] dark:border-[#252320]">
                          <th className="p-2">ROM Address (S, a, b)</th>
                          <th className="p-2">Present State</th>
                          <th className="p-2">Sensor a</th>
                          <th className="p-2">Sensor b</th>
                          <th className="p-2">Next State</th>
                          <th className="p-2">Output y</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e6dfd8] dark:divide-[#252320]">
                        {[
                          { addr: '000', s: 0, a: 0, b: 0, next: 0, y: 1 },
                          { addr: '010', s: 0, a: 1, b: 0, next: 0, y: 1 },
                          { addr: '011', s: 0, a: 1, b: 1, next: 1, y: 1 },
                          { addr: '100', s: 1, a: 0, b: 0, next: 0, y: 0 },
                          { addr: '110', s: 1, a: 1, b: 0, next: 1, y: 0 },
                          { addr: '111', s: 1, a: 1, b: 1, next: 1, y: 0 },
                        ].map(row => {
                          const isCurrentRow = fsmState === row.s && sensorA === row.a && sensorB === row.b;
                          return (
                            <tr 
                              key={row.addr}
                              className={`transition-colors ${
                                isCurrentRow ? 'bg-[#efe9de] dark:bg-[#252320] text-[#cc785c] font-bold' : 'text-[#6c6a64] dark:text-[#a09d96]'
                              }`}
                            >
                              <td className="p-2">{row.addr} {isCurrentRow && '👉 (Active)'}</td>
                              <td className="p-2">{row.s}</td>
                              <td className="p-2">{row.a}</td>
                              <td className="p-2">{row.b}</td>
                              <td className="p-2 text-[#5db8a6]">{row.next}</td>
                              <td className="p-2 font-bold">{row.y}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
