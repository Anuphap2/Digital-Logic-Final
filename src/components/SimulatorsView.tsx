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
  Activity,
  Box
} from 'lucide-react';
import { WaterTank3D } from './three/WaterTank3D';
import { KMapTorus3D } from './three/KMapTorus3D';
import { LogicGate3D } from './three/LogicGate3D';

export const SimulatorsView: React.FC = () => {
  const { activeSimulatorTab, setActiveSimulatorTab } = useApp();

  // Tab 1: Gates Simulator State
  const [gateA, setGateA] = useState<number>(1);
  const [gateB, setGateB] = useState<number>(0);
  const [gateCin, setGateCin] = useState<number>(0);
  const [selectedGate3D, setSelectedGate3D] = useState<'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'NOT'>('AND');

  // Tab 2: K-Map Solver State
  const [kmapVars, setKmapVars] = useState<2 | 3 | 4>(4);
  const [kmapViewMode, setKmapViewMode] = useState<'2d' | '3d'>('2d');
  const [kmapCells, setKmapCells] = useState<Record<number, '0' | '1' | 'X'>>({
    0: '1', 1: '0', 2: '1', 3: '0', 4: '0', 5: '0', 6: '0', 7: '0',
    8: '1', 9: '0', 10: '1', 11: '0', 12: '0', 13: '0', 14: '0', 15: '0'
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

  const gate3DOutput = (() => {
    if (selectedGate3D === 'AND') return (gateA && gateB) ? 1 : 0;
    if (selectedGate3D === 'OR') return (gateA || gateB) ? 1 : 0;
    if (selectedGate3D === 'NAND') return !(gateA && gateB) ? 1 : 0;
    if (selectedGate3D === 'NOR') return !(gateA || gateB) ? 1 : 0;
    if (selectedGate3D === 'XOR') return (gateA !== gateB) ? 1 : 0;
    if (selectedGate3D === 'NOT') return (gateA === 1 ? 0 : 1);
    return 0;
  })();

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

    if (ffType === 'JK') {
      const J = ffInput1;
      const K = ffInput2;
      if (J === 0 && K === 0) {
        nextQ = ffQ;
        label = 'Hold (0,0)';
      } else if (J === 0 && K === 1) {
        nextQ = 0;
        label = 'Reset (0,1)';
      } else if (J === 1 && K === 0) {
        nextQ = 1;
        label = 'Set (1,0)';
      } else {
        nextQ = ffQ === 0 ? 1 : 0;
        label = 'Toggle (1,1)';
      }
    } else if (ffType === 'D') {
      nextQ = ffInput1;
      label = `D = ${ffInput1}`;
    } else if (ffType === 'T') {
      if (ffInput1 === 1) {
        nextQ = ffQ === 0 ? 1 : 0;
        label = 'Toggle (T=1)';
      } else {
        nextQ = ffQ;
        label = 'Hold (T=0)';
      }
    } else if (ffType === 'SR') {
      const S = ffInput1;
      const R = ffInput2;
      if (S === 0 && R === 0) {
        nextQ = ffQ;
        label = 'Hold (0,0)';
      } else if (S === 0 && R === 1) {
        nextQ = 0;
        label = 'Reset (0,1)';
      } else if (S === 1 && R === 0) {
        nextQ = 1;
        label = 'Set (1,0)';
      } else {
        label = 'Forbidden (1,1)';
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
              Interactive Lab
            </span>
            <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">จำลองการทำงานของฮาร์ดแวร์แบบ Real-time</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0f172a] dark:text-[#f8fafc] mt-1 tracking-tight">
            แล็บจำลองวงจรดิจิทัล & FSM
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#f1f5f9] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] p-1.5 rounded-2xl space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveSimulatorTab('gates')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer ${
              activeSimulatorTab === 'gates' 
                ? 'bg-[#0066cc] text-white shadow-sm' 
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Logic Gates & Adders</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('kmap')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer ${
              activeSimulatorTab === 'kmap' 
                ? 'bg-[#0066cc] text-white shadow-sm' 
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>K-Map Solver</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('flipflop')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer ${
              activeSimulatorTab === 'flipflop' 
                ? 'bg-[#0066cc] text-white shadow-sm' 
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Flip-Flop & Clock Lab</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('fsm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition cursor-pointer ${
              activeSimulatorTab === 'fsm' 
                ? 'bg-[#0066cc] text-white shadow-sm' 
                : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
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
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm">
            <h2 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc] mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8]" />
              กำหนดค่าสัญญาณอินพุต (Input Signals)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Input A */}
              <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">สัญญาณอินพุต A</div>
                  <div className="text-xl font-bold font-mono text-[#0f172a] dark:text-[#f8fafc]">A = {gateA}</div>
                </div>
                <button
                  onClick={() => setGateA(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                    gateA === 1 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {gateA === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>

              {/* Input B */}
              <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">สัญญาณอินพุต B</div>
                  <div className="text-xl font-bold font-mono text-[#0f172a] dark:text-[#f8fafc]">B = {gateB}</div>
                </div>
                <button
                  onClick={() => setGateB(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                    gateB === 1 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {gateB === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>

              {/* Input Cin */}
              <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">ตัวทดเข้า Cin (Full Adder)</div>
                  <div className="text-xl font-bold font-mono text-[#0f172a] dark:text-[#f8fafc]">Cin = {gateCin}</div>
                </div>
                <button
                  onClick={() => setGateCin(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                    gateCin === 1 
                      ? 'bg-amber-600 text-white shadow-sm' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
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
                    ? 'bg-[#0066cc]/5 dark:bg-[#0066cc]/15 border-[#0066cc]/40' 
                    : 'bg-white dark:bg-[#0b0f19] border-[#e2e8f0] dark:border-[#1e293b]'
                }`}
              >
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">{g.name}</div>
                <div className="text-xs text-[#0066cc] dark:text-[#38bdf8] my-0.5 font-mono">
                  <MathView math={g.formula} />
                </div>
                <div className={`text-2xl font-bold font-mono mt-1 ${
                  g.val === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                }`}>
                  {g.val}
                </div>
              </div>
            ))}
          </div>

          {/* Adders Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Half Adder Card */}
            <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8] bg-[#0066cc]/10 dark:bg-[#0066cc]/20 px-2.5 py-0.5 rounded border border-[#0066cc]/20">
                  Half Adder (HA)
                </span>
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">A + B</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc]">วงจรบวกครึ่งตัว</h3>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 mb-4">
                บวกอินพุต A ({gateA}) กับ B ({gateB}) ได้ผลลัพธ์เลขฐานสอง 2 บิต:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                    Sum (<MathView math="S = A \oplus B" />)
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#0066cc] dark:text-[#38bdf8] mt-1">
                    {gateA ^ gateB}
                  </div>
                </div>
                <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                  <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                    Carry (<MathView math="C = A \cdot B" />)
                  </div>
                  <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    {gateA & gateB}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs font-mono text-[#64748b] dark:text-[#94a3b8] bg-[#f8fafc] dark:bg-[#0b0f19] p-2.5 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b]">
                ผลลัพธ์ในฐานสิบ: {gateA} + {gateB} = {(gateA & gateB) * 2 + (gateA ^ gateB)} (ไบนารี: {gateA & gateB}{gateA ^ gateB}₂)
              </div>
            </div>

            {/* Full Adder Card */}
            <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  Full Adder (FA)
                </span>
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">A + B + Cin</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc]">วงจรบวกเต็มตัว</h3>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 mb-4">
                บวก A ({gateA}) + B ({gateB}) + Cin ({gateCin}) รับตัวทดจากหลักก่อนหน้าได้:
              </p>

              {(() => {
                const faSum = gateA ^ gateB ^ gateCin;
                const faCout = (gateA & gateB) | (gateCin & (gateA ^ gateB));
                return (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                        <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                          Sum (<MathView math="S = A \oplus B \oplus C_{in}" />)
                        </div>
                        <div className="text-3xl font-bold font-mono text-[#0066cc] dark:text-[#38bdf8] mt-1">
                          {faSum}
                        </div>
                      </div>
                      <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                        <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                          Carry Out (<MathView math="C_{out}" />)
                        </div>
                        <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                          {faCout}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-mono text-[#64748b] dark:text-[#94a3b8] bg-[#f8fafc] dark:bg-[#0b0f19] p-2.5 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b]">
                      ผลลัพธ์ในฐานสิบ: {gateA} + {gateB} + {gateCin} = {faCout * 2 + faSum} (ไบนารี: {faCout}{faSum}₂)
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

          {/* 3D DIP-14 IC Chip & Breadboard Simulation Card */}
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                  <Box className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
                  จำลองชิปไอซีจริง DIP-14 บนเบรดบอร์ด 3D (Three.js WebGL)
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                  หมุนดูชิปจริงตระกูล 74HC ต่อสายไฟอินพุต A (ขา 1), B (ขา 2) และดูหลอด LED เปล่งแสงที่เอาต์พุต (ขา 3)
                </p>
              </div>

              {/* Gate Selector Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#f1f5f9] dark:bg-[#0b0f19] p-1.5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                {(['AND', 'OR', 'NAND', 'NOR', 'XOR', 'NOT'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGate3D(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      selectedGate3D === g
                        ? 'bg-[#0066cc] text-white shadow-sm'
                        : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <LogicGate3D
              gateType={selectedGate3D}
              inputA={gateA}
              inputB={gateB}
              output={gate3DOutput}
              setInputA={setGateA}
              setInputB={setGateB}
            />
          </div>
        </div>
      )}

      {/* TAB 2: K-MAP SOLVER */}
      {activeSimulatorTab === 'kmap' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading font-bold text-xl text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
                  K-Map Grid & Live Solver
                </h2>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">คลิกที่แต่ละช่องเพื่อเปลี่ยนค่า (0 → 1 → X) และดูผลการลดรูป</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">จำนวนตัวแปร:</span>
                {[2, 3, 4].map(v => (
                  <button
                    key={v}
                    onClick={() => setKmapVars(v as 2 | 3 | 4)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      kmapVars === v 
                        ? 'bg-[#0066cc] text-white shadow-sm' 
                        : 'bg-[#f1f5f9] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
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
                <div className="min-w-[420px] max-w-lg mx-auto bg-[#f8fafc] dark:bg-[#0b0f19] p-6 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b]">
                  <div className="text-center font-mono text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                    แกนตั้ง: A (0, 1) | แกนนอน: BC (00, 01, 11, 10 Gray Code)
                  </div>

                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#64748b] dark:text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e293b]">A \ BC</th>
                        <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b]">00</th>
                        <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b]">01</th>
                        <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b]">11</th>
                        <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b]">10</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b] font-bold">0</td>
                        {[0, 1, 3, 2].map(cellIdx => (
                          <td 
                            key={cellIdx}
                            onClick={() => toggleKmapCell(cellIdx)}
                            className={`p-4 border border-[#e2e8f0] dark:border-[#1e293b] cursor-pointer transition select-none ${
                              kmapCells[cellIdx] === '1' 
                                ? 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8] font-bold text-xl' 
                                : kmapCells[cellIdx] === 'X'
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xl'
                                : 'bg-transparent text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b]/50'
                            }`}
                          >
                            <div className="text-xs text-[#94a3b8] font-mono mb-0.5">m{cellIdx}</div>
                            {kmapCells[cellIdx] || '0'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b] font-bold">1</td>
                        {[4, 5, 7, 6].map(cellIdx => (
                          <td 
                            key={cellIdx}
                            onClick={() => toggleKmapCell(cellIdx)}
                            className={`p-4 border border-[#e2e8f0] dark:border-[#1e293b] cursor-pointer transition select-none ${
                              kmapCells[cellIdx] === '1' 
                                ? 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8] font-bold text-xl' 
                                : kmapCells[cellIdx] === 'X'
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xl'
                                : 'bg-transparent text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b]/50'
                            }`}
                          >
                            <div className="text-xs text-[#94a3b8] font-mono mb-0.5">m{cellIdx}</div>
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
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="flex items-center bg-[#f1f5f9] dark:bg-[#0b0f19] p-1 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                    <button
                      onClick={() => setKmapViewMode('2d')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                        kmapViewMode === '2d'
                          ? 'bg-[#0066cc] text-white shadow-sm'
                          : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>ตาราง 2D (Grid Matrix)</span>
                    </button>
                    <button
                      onClick={() => setKmapViewMode('3d')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                        kmapViewMode === '3d'
                          ? 'bg-[#0066cc] text-white shadow-sm'
                          : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
                      }`}
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>มุมมอง 3D Torus (Donut Topology)</span>
                    </button>
                  </div>
                </div>

                {kmapViewMode === '2d' ? (
                  <div className="overflow-x-auto pb-4">
                    <div className="min-w-[480px] max-w-xl mx-auto bg-[#f8fafc] dark:bg-[#0b0f19] p-6 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b]">
                      <div className="text-center font-mono text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                        แกนตั้ง: AB (00, 01, 11, 10) | แกนนอน: CD (00, 01, 11, 10)
                      </div>

                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#64748b] dark:text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e293b]">AB \ CD</th>
                            {['00', '01', '11', '10'].map(cd => (
                              <th key={cd} className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b]">{cd}</th>
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
                              <td className="p-2.5 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] bg-[#f1f5f9] dark:bg-[#1e293b] font-bold">{row.ab}</td>
                              {row.cells.map(cellIdx => (
                                <td 
                                  key={cellIdx}
                                  onClick={() => toggleKmapCell(cellIdx)}
                                  className={`p-3 border border-[#e2e8f0] dark:border-[#1e293b] cursor-pointer transition select-none ${
                                    kmapCells[cellIdx] === '1' 
                                      ? 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8] font-bold text-lg' 
                                      : kmapCells[cellIdx] === 'X'
                                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-lg'
                                      : 'bg-transparent text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b]/50'
                                  }`}
                                >
                                  <div className="text-xs text-[#94a3b8] font-mono">{cellIdx}</div>
                                  {kmapCells[cellIdx] || '0'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-[#0066cc]/5 dark:bg-[#0066cc]/15 rounded-xl border border-[#0066cc]/25 text-xs text-[#334155] dark:text-[#cbd5e1]">
                      <div className="font-bold text-[#0066cc] dark:text-[#38bdf8] mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>หลักการพื้นผิวโดนัท (Torus Adjacency):</span>
                      </div>
                      <p>
                        ในมิติ 3D ตาราง K-Map 4 ตัวแปรจะม้วนขอบซ้ายชนขอบขวาเป็นทรงกระบอก และม้วนขอบบนชนขอบล่างเป็นวงแหวนโดนัท ทำให้ <strong>4 มุมสุดขอบ (<MathView math="m_0, m_2, m_8, m_{10}" />)</strong> มาสัมผัสชิดกันที่จุดยอดเดียว เกิดเป็นกลุ่ม 4 ช่องลดรูปเหลือ <MathView math="B'D'" />
                      </p>
                    </div>
                    <KMapTorus3D kmapCells={kmapCells} onCellToggle={toggleKmapCell} />
                  </div>
                )}
              </div>
            )}

            {/* 2-Variable K-Map Display */}
            {kmapVars === 2 && (
              <div className="max-w-xs mx-auto bg-[#f8fafc] dark:bg-[#0b0f19] p-6 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b]">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">A \ B</th>
                      <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8]">0</th>
                      <th className="p-2 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8]">1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] font-bold">0</td>
                      {[0, 1].map(i => (
                        <td 
                          key={i}
                          onClick={() => toggleKmapCell(i)}
                          className={`p-4 border border-[#e2e8f0] dark:border-[#1e293b] cursor-pointer font-bold text-xl select-none ${
                            kmapCells[i] === '1' ? 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8]' : 'text-[#94a3b8]'
                          }`}
                        >
                          <div className="text-xs text-[#94a3b8] font-mono">m{i}</div>
                          {kmapCells[i] || '0'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border border-[#e2e8f0] dark:border-[#1e293b] text-xs font-mono text-[#0066cc] dark:text-[#38bdf8] font-bold">1</td>
                      {[2, 3].map(i => (
                        <td 
                          key={i}
                          onClick={() => toggleKmapCell(i)}
                          className={`p-4 border border-[#e2e8f0] dark:border-[#1e293b] cursor-pointer font-bold text-xl select-none ${
                            kmapCells[i] === '1' ? 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8]' : 'text-[#94a3b8]'
                          }`}
                        >
                          <div className="text-xs text-[#94a3b8] font-mono">m{i}</div>
                          {kmapCells[i] || '0'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Minimized Expression with MathView */}
            <div className="mt-6 bg-[#f8fafc] dark:bg-[#0b0f19] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono">สมการลดรูปขั้นต่ำ (Minimized Expression):</div>
                <div className="text-lg font-bold text-[#0066cc] dark:text-[#38bdf8] mt-0.5 font-mono">
                  <MathView math={`F = ${getKmapFormula()}`} />
                </div>
              </div>
              <button
                onClick={() => setKmapCells({})}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] bg-[#f1f5f9] dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] flex items-center gap-1.5 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
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
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-heading font-bold text-xl text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#0066cc] dark:text-[#38bdf8]" />
                  Flip-Flop State Transition & Excitation Lab
                </h2>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">เลือกชนิดฟลิปฟลอป กำหนดอินพุต แล้วกดปุ่มส่งสัญญาณ Clock Edge</p>
              </div>

              <div className="flex items-center space-x-1.5 bg-[#f1f5f9] dark:bg-[#0b0f19] p-1 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                {(['JK', 'D', 'T', 'SR'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setFfType(t);
                      if (t === 'D' || t === 'T') setFfInput2(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                      ffType === t 
                        ? 'bg-[#0066cc] text-white shadow-sm' 
                        : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
                    }`}
                  >
                    {t} FF
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inputs & Clock Trigger */}
              <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] space-y-4">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">
                  ควบคุมอินพุต (Inputs)
                </h3>

                <div className="flex items-center justify-between bg-white dark:bg-[#131b2e] p-3 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b]">
                  <span className="font-mono text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
                    {ffType === 'JK' ? 'Input J' : ffType === 'SR' ? 'Input S' : ffType === 'D' ? 'Input D' : 'Input T'}
                  </span>
                  <button
                    onClick={() => setFfInput1(prev => prev === 1 ? 0 : 1)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs cursor-pointer transition ${
                      ffInput1 === 1 
                        ? 'bg-[#0066cc] text-white shadow-sm' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {ffInput1}
                  </button>
                </div>

                {(ffType === 'JK' || ffType === 'SR') && (
                  <div className="flex items-center justify-between bg-white dark:bg-[#131b2e] p-3 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b]">
                    <span className="font-mono text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
                      {ffType === 'JK' ? 'Input K' : 'Input R'}
                    </span>
                    <button
                      onClick={() => setFfInput2(prev => prev === 1 ? 0 : 1)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs cursor-pointer transition ${
                        ffInput2 === 1 
                          ? 'bg-[#0066cc] text-white shadow-sm' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {ffInput2}
                    </button>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={triggerClockPulse}
                    className="w-full py-3 px-4 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold text-sm shadow-md shadow-[#0066cc]/20 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>ส่งสัญญาณ Clock Edge (CLK ↑)</span>
                  </button>
                  <div className="text-center text-xs text-[#94a3b8] font-mono mt-2">
                    จังหวะ Clock Pulse ที่: {clockCount}
                  </div>
                </div>
              </div>

              {/* State Output Display */}
              <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-4">
                    สถานะปัจจุบันของฟลิปฟลอป (Current State)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-[#131b2e] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] text-center">
                      <div className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">เอาต์พุต Q</div>
                      <div className={`text-4xl font-bold font-mono mt-1 ${ffQ === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                        {ffQ}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#131b2e] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] text-center">
                      <div className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">เอาต์พุต Q' (Invert)</div>
                      <div className={`text-4xl font-bold font-mono mt-1 ${ffQ === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                        {ffQ === 1 ? 0 : 1}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#f1f5f9] dark:bg-[#1e293b] text-xs space-y-1">
                  <div className="text-[#334155] dark:text-[#cbd5e1]">
                    <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">โหมดการทำงาน:</span>{' '}
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
              <div className="bg-[#f8fafc] dark:bg-[#0b0f19] p-5 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-3">
                  ประวัติการเปลี่ยนสถานะ (Timing History)
                </h3>
                <div className="space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto pr-1">
                  {ffHistory.slice().reverse().map((h, i) => (
                    <div 
                      key={i} 
                      className="p-2 rounded bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] flex items-center justify-between"
                    >
                      <span className="text-[#64748b] dark:text-[#94a3b8]">CLK #{h.step}</span>
                      <span className="text-[#0066cc] dark:text-[#38bdf8] font-medium">{h.inputs}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Q = {h.q}</span>
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
          <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
                    โจทย์ข้อสอบจริง สไลด์หน้า 151-163
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-xl text-[#0f172a] dark:text-[#f8fafc] mt-1.5">
                  ระบบควบคุมปั๊มน้ำอัตโนมัติด้วย Finite State Machine (Moore)
                </h2>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                  เซ็นเซอร์ระดับน้ำล่าง (a) และบน (b) ควบคุมปั๊มน้ำ (y) พร้อมวิเคราะห์รหัสใน ROM
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setWaterLevel(10)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155] transition cursor-pointer"
                >
                  น้ำแห้ง (Drain)
                </button>
                <button
                  onClick={() => setWaterLevel(90)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#f1f5f9] dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-700 text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155] transition cursor-pointer"
                >
                  น้ำเต็ม (Fill)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left: 3D Water Tank Simulation */}
              <div className="lg:col-span-6">
                <WaterTank3D
                  waterLevel={waterLevel}
                  setWaterLevel={setWaterLevel}
                  fsmState={fsmState}
                  pumpOutput={pumpOutput}
                  sensorA={sensorA}
                  sensorB={sensorB}
                />
              </div>

              {/* Right: Moore FSM States & ROM Table */}
              <div className="lg:col-span-6 bg-[#f8fafc] dark:bg-[#0b0f19] p-6 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b] space-y-5">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-3">
                    แผนภาพสถานะแบบ MOORE (State Diagram)
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border transition-all ${
                      fsmState === 0 
                        ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] shadow-sm' 
                        : 'bg-white dark:bg-[#131b2e] border-[#e2e8f0] dark:border-[#1e293b] opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8]">State 0</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-emerald-500/20">y = 1</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">สถานะเปิดปั๊มน้ำ</h4>
                      <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
                        จะเปลี่ยนไป State 1 เมื่อเซ็นเซอร์ a=1 และ b=1 (น้ำเต็มถังแล้ว)
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${
                      fsmState === 1 
                        ? 'bg-[#0066cc]/10 dark:bg-[#0066cc]/20 border-[#0066cc] shadow-sm' 
                        : 'bg-white dark:bg-[#131b2e] border-[#e2e8f0] dark:border-[#1e293b] opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#0066cc] dark:text-[#38bdf8]">State 1</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold border border-rose-500/20">y = 0</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">สถานะปิดปั๊มน้ำ</h4>
                      <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
                        จะเปลี่ยนไป State 0 เมื่อเซ็นเซอร์ a=0 และ b=0 (น้ำแห้งต่ำกว่า a)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-2">
                    ตารางข้อมูลใน ROM (ROM Content Lookup Table)
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-[#f1f5f9] dark:bg-[#1e293b] text-[#475569] dark:text-[#94a3b8] border-b border-[#e2e8f0] dark:border-[#1e293b]">
                          <th className="p-2.5">ROM Address (S, a, b)</th>
                          <th className="p-2.5">Present State</th>
                          <th className="p-2.5">Sensor a</th>
                          <th className="p-2.5">Sensor b</th>
                          <th className="p-2.5">Next State</th>
                          <th className="p-2.5">Output y</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#1e293b]">
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
                                isCurrentRow 
                                  ? 'bg-[#0066cc]/15 text-[#0066cc] dark:text-[#38bdf8] font-bold' 
                                  : 'text-[#475569] dark:text-[#94a3b8] hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                              }`}
                            >
                              <td className="p-2.5">{row.addr} {isCurrentRow && '👉 (Active)'}</td>
                              <td className="p-2.5">{row.s}</td>
                              <td className="p-2.5">{row.a}</td>
                              <td className="p-2.5">{row.b}</td>
                              <td className="p-2.5 text-[#0066cc] dark:text-[#38bdf8]">{row.next}</td>
                              <td className="p-2.5 font-bold">{row.y}</td>
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
