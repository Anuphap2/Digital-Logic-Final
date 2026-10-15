import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  Layers, 
  Sliders, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Check, 
  Info,
  Droplets,
  ArrowRight,
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
  // Grid values: stored as array. 2-var: 4 cells, 3-var: 8 cells, 4-var: 16 cells.
  // Values: '0' | '1' | 'X'
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
  // Water level 0..100
  const [waterLevel, setWaterLevel] = useState<number>(15);
  // FSM State: 0 = PUMP ON (y=1), 1 = PUMP OFF (y=0)
  const [fsmState, setFsmState] = useState<0 | 1>(0);

  // Sensors: sensor A = low (height ~ 30%), sensor B = high (height ~ 75%)
  const sensorA = waterLevel >= 30 ? 1 : 0;
  const sensorB = waterLevel >= 75 ? 1 : 0;
  const pumpOutput = fsmState === 0 ? 1 : 0;

  // Next state logic according to Moore FSM table from Dr. Paween's slide
  // State 0 (Pumping): if a=1 and b=1 -> Next State 1 (Turn OFF). Otherwise stay in 0.
  // State 1 (Idle): if a=0 and b=0 -> Next State 0 (Turn ON). Otherwise stay in 1.
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

  // Auto-pump effect
  useEffect(() => {
    if (activeSimulatorTab !== 'fsm') return;
    const interval = setInterval(() => {
      setWaterLevel(prev => {
        if (pumpOutput === 1) {
          // Pump is ON: water rises
          const nextVal = Math.min(prev + 4, 95);
          return nextVal;
        } else {
          // Pump is OFF: water drains
          const nextVal = Math.max(prev - 3, 5);
          return nextVal;
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [pumpOutput, activeSimulatorTab]);

  // Update FSM state on clock or level transition
  useEffect(() => {
    setFsmState(nextFsmState);
  }, [sensorA, sensorB]);

  // Flip-flop clock trigger handler
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
      if (J === 0 && K === 0) nextQ = ffQ; // Hold
      else if (J === 0 && K === 1) nextQ = 0; // Reset
      else if (J === 1 && K === 0) nextQ = 1; // Set
      else if (J === 1 && K === 1) nextQ = ffQ === 1 ? 0 : 1; // Toggle
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

  // K-Map toggle cell
  const toggleKmapCell = (index: number) => {
    setKmapCells(prev => {
      const cur = prev[index] || '0';
      const next = cur === '0' ? '1' : cur === '1' ? 'X' : '0';
      return { ...prev, [index]: next };
    });
  };

  // Compute simple SOP representation from K-Map 1s
  const getKmapFormula = () => {
    if (kmapVars === 2) {
      // cells: 0: A'B', 1: A'B, 2: AB', 3: AB
      const ones = [0, 1, 2, 3].filter(i => kmapCells[i] === '1');
      if (ones.length === 0) return '0';
      if (ones.length === 4) return '1';
      // 2-groups
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
      // 3-variable cells (8 cells)
      const ones = Array.from({ length: 8 }, (_, i) => i).filter(i => kmapCells[i] === '1');
      if (ones.length === 0) return '0';
      if (ones.length === 8) return '1';
      // Simple corner check or common pattern
      if (ones.length === 4) {
        if ([0, 2, 4, 6].every(i => kmapCells[i] === '1')) return "C'";
        if ([1, 3, 5, 7].every(i => kmapCells[i] === '1')) return "C";
        if ([0, 1, 2, 3].every(i => kmapCells[i] === '1')) return "A'";
        if ([4, 5, 6, 7].every(i => kmapCells[i] === '1')) return "A";
      }
      return `Σ m(${ones.join(', ')}) (คลิกขยายเพื่อดูสมการจัดกลุ่ม)`;
    } else {
      const ones = Array.from({ length: 16 }, (_, i) => i).filter(i => kmapCells[i] === '1');
      if (ones.length === 0) return '0';
      if (ones.length === 16) return '1';
      if (kmapCells[0] === '1' && kmapCells[2] === '1' && kmapCells[8] === '1' && kmapCells[10] === '1' && ones.length === 4) {
        return "B'D' (มุมทั้ง 4 รวมกัน!)";
      }
      return `Σ m(${ones.join(', ')}) ${ones.length > 0 ? '+ d(...)' : ''}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header & Simulator Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-cyan-950 text-cyan-400 border border-cyan-800">
              Interactive Lab
            </span>
            <span className="text-xs text-slate-400">จำลองการทำงานของฮาร์ดแวร์แบบ Real-time</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            แล็บจำลองวงจรดิจิทัล & FSM
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-xl space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveSimulatorTab('gates')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'gates' 
                ? 'bg-cyan-500 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Logic Gates & Adders</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('kmap')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'kmap' 
                ? 'bg-cyan-500 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>K-Map Solver</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('flipflop')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'flipflop' 
                ? 'bg-cyan-500 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Flip-Flop & Clock Lab</span>
          </button>
          <button
            onClick={() => setActiveSimulatorTab('fsm')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition ${
              activeSimulatorTab === 'fsm' 
                ? 'bg-cyan-500 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Water Pump FSM (ข้อสอบจริง)</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB 1: LOGIC GATES & ADDERS
          ======================================================== */}
      {activeSimulatorTab === 'gates' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              กำหนดค่าสัญญาณอินพุต (Input Signals)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Input A */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">สัญญาณอินพุต A</div>
                  <div className="text-xl font-bold font-mono text-slate-100">A = {gateA}</div>
                </div>
                <button
                  onClick={() => setGateA(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-sm transition-all ${
                    gateA === 1 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {gateA === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>

              {/* Input B */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">สัญญาณอินพุต B</div>
                  <div className="text-xl font-bold font-mono text-slate-100">B = {gateB}</div>
                </div>
                <button
                  onClick={() => setGateB(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-sm transition-all ${
                    gateB === 1 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {gateB === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>

              {/* Input Cin (สำหรับ Full Adder) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono">ตัวทดเข้า Cin (Full Adder)</div>
                  <div className="text-xl font-bold font-mono text-slate-100">Cin = {gateCin}</div>
                </div>
                <button
                  onClick={() => setGateCin(prev => prev === 1 ? 0 : 1)}
                  className={`px-4 py-2 rounded-lg font-mono font-bold text-sm transition-all ${
                    gateCin === 1 
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {gateCin === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </button>
              </div>
            </div>
          </div>

          {/* Gates Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { name: 'NOT (A)', formula: "A'", val: gateA === 1 ? 0 : 1 },
              { name: 'AND', formula: 'A · B', val: gateA && gateB ? 1 : 0 },
              { name: 'OR', formula: 'A + B', val: gateA || gateB ? 1 : 0 },
              { name: 'NAND', formula: '(A · B)\'', val: !(gateA && gateB) ? 1 : 0 },
              { name: 'NOR', formula: '(A + B)\'', val: !(gateA || gateB) ? 1 : 0 },
              { name: 'XOR', formula: 'A ⊕ B', val: gateA !== gateB ? 1 : 0 },
              { name: 'XNOR', formula: '(A ⊕ B)\'', val: gateA === gateB ? 1 : 0 },
            ].map(g => (
              <div 
                key={g.name}
                className={`p-4 rounded-xl border transition-all ${
                  g.val === 1 
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm shadow-cyan-500/10' 
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="text-xs text-slate-400 font-mono">{g.name}</div>
                <div className="text-[11px] text-slate-500 font-mono">{g.formula}</div>
                <div className={`text-2xl font-black font-mono mt-2 ${
                  g.val === 1 ? 'text-cyan-400' : 'text-slate-600'
                }`}>
                  {g.val}
                </div>
              </div>
            ))}
          </div>

          {/* Adders Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Half Adder Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                  Half Adder (HA)
                </span>
                <span className="text-xs text-slate-400 font-mono">A + B</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">วงจรบวกครึ่งตัว</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                บวกอินพุต A ({gateA}) กับ B ({gateB}) ได้ผลลัพธ์เลขฐานสอง 2 บิต:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">ผลรวม Sum (S = A ⊕ B)</div>
                  <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">
                    {gateA ^ gateB}
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">ตัวทด Carry (C = A · B)</div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                    {gateA & gateB}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                ผลลัพธ์ในฐานสิบ: {gateA} + {gateB} = {(gateA & gateB) * 2 + (gateA ^ gateB)} (ไบนารี: {gateA & gateB}{gateA ^ gateB}₂)
              </div>
            </div>

            {/* Full Adder Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
                  Full Adder (FA)
                </span>
                <span className="text-xs text-slate-400 font-mono">A + B + Cin</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">วงจรบวกเต็มตัว</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                บวก A ({gateA}) + B ({gateB}) + Cin ({gateCin}) รับตัวทดจากหลักก่อนหน้าได้:
              </p>

              {(() => {
                const faSum = gateA ^ gateB ^ gateCin;
                const faCout = (gateA & gateB) | (gateCin & (gateA ^ gateB));
                return (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 font-mono">Sum (S = A ⊕ B ⊕ Cin)</div>
                        <div className="text-3xl font-extrabold font-mono text-blue-400 mt-1">
                          {faSum}
                        </div>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 font-mono">Carry Out (Cout)</div>
                        <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                          {faCout}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                      ผลลัพธ์ในฐานสิบ: {gateA} + {gateB} + {gateCin} = {faCout * 2 + faSum} (ไบนารี: {faCout}{faSum}₂)
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: K-MAP SOLVER
          ======================================================== */}
      {activeSimulatorTab === 'kmap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  K-Map Grid & Live Solver
                </h2>
                <p className="text-xs text-slate-400">คลิกที่แต่ละช่องเพื่อเปลี่ยนค่า (0 → 1 → X) และดูผลการลดรูป</p>
              </div>

              {/* Variable selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">จำนวนตัวแปร:</span>
                {[2, 3, 4].map(v => (
                  <button
                    key={v}
                    onClick={() => setKmapVars(v as 2 | 3 | 4)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                      kmapVars === v 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {v} ตัวแปร
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Variable K-Map Display (Most frequent in exam) */}
            {kmapVars === 3 && (
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[420px] max-w-lg mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="text-center font-mono text-xs text-slate-400 mb-3">
                    แกนตั้ง: A (0, 1) | แกนนอน: BC (00, 01, 11, 10 Gray Code)
                  </div>

                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border border-slate-800 text-xs font-mono text-slate-500 bg-slate-900/50">A \ BC</th>
                        <th className="p-2 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50">00</th>
                        <th className="p-2 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50">01</th>
                        <th className="p-2 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50">11</th>
                        <th className="p-2 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50">10</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row A = 0: cells 0, 1, 3, 2 */}
                      <tr>
                        <td className="p-3 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50 font-bold">0</td>
                        {[0, 1, 3, 2].map(cellIdx => (
                          <td 
                            key={cellIdx}
                            onClick={() => toggleKmapCell(cellIdx)}
                            className={`p-4 border border-slate-800 cursor-pointer transition select-none ${
                              kmapCells[cellIdx] === '1' 
                                ? 'bg-cyan-950/60 text-cyan-300 font-bold text-xl ring-1 ring-inset ring-cyan-500/50' 
                                : kmapCells[cellIdx] === 'X'
                                ? 'bg-amber-950/40 text-amber-300 font-bold text-xl'
                                : 'bg-slate-950 text-slate-600 hover:bg-slate-900'
                            }`}
                          >
                            <div className="text-[10px] text-slate-500 font-mono mb-0.5">m{cellIdx}</div>
                            {kmapCells[cellIdx] || '0'}
                          </td>
                        ))}
                      </tr>
                      {/* Row A = 1: cells 4, 5, 7, 6 */}
                      <tr>
                        <td className="p-3 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50 font-bold">1</td>
                        {[4, 5, 7, 6].map(cellIdx => (
                          <td 
                            key={cellIdx}
                            onClick={() => toggleKmapCell(cellIdx)}
                            className={`p-4 border border-slate-800 cursor-pointer transition select-none ${
                              kmapCells[cellIdx] === '1' 
                                ? 'bg-cyan-950/60 text-cyan-300 font-bold text-xl ring-1 ring-inset ring-cyan-500/50' 
                                : kmapCells[cellIdx] === 'X'
                                ? 'bg-amber-950/40 text-amber-300 font-bold text-xl'
                                : 'bg-slate-950 text-slate-600 hover:bg-slate-900'
                            }`}
                          >
                            <div className="text-[10px] text-slate-500 font-mono mb-0.5">m{cellIdx}</div>
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
                <div className="min-w-[480px] max-w-xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="text-center font-mono text-xs text-slate-400 mb-3">
                    แกนตั้ง: AB (00, 01, 11, 10) | แกนนอน: CD (00, 01, 11, 10)
                  </div>

                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border border-slate-800 text-xs font-mono text-slate-500 bg-slate-900/50">AB \ CD</th>
                        {['00', '01', '11', '10'].map(cd => (
                          <th key={cd} className="p-2 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50">{cd}</th>
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
                          <td className="p-2.5 border border-slate-800 text-xs font-mono text-cyan-400 bg-slate-900/50 font-bold">{row.ab}</td>
                          {row.cells.map(cellIdx => (
                            <td 
                              key={cellIdx}
                              onClick={() => toggleKmapCell(cellIdx)}
                              className={`p-3 border border-slate-800 cursor-pointer transition select-none ${
                                kmapCells[cellIdx] === '1' 
                                  ? 'bg-cyan-950/60 text-cyan-300 font-bold text-lg ring-1 ring-inset ring-cyan-500/50' 
                                  : kmapCells[cellIdx] === 'X'
                                  ? 'bg-amber-950/40 text-amber-300 font-bold text-lg'
                                  : 'bg-slate-950 text-slate-600 hover:bg-slate-900'
                              }`}
                            >
                              <div className="text-[9px] text-slate-500 font-mono">{cellIdx}</div>
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
              <div className="max-w-xs mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-800 text-xs font-mono text-slate-500">A \ B</th>
                      <th className="p-2 border border-slate-800 text-xs font-mono text-cyan-400">0</th>
                      <th className="p-2 border border-slate-800 text-xs font-mono text-cyan-400">1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-slate-800 text-xs font-mono text-cyan-400 font-bold">0</td>
                      {[0, 1].map(i => (
                        <td 
                          key={i}
                          onClick={() => toggleKmapCell(i)}
                          className={`p-4 border border-slate-800 cursor-pointer font-bold text-xl select-none ${
                            kmapCells[i] === '1' ? 'bg-cyan-950/60 text-cyan-300' : 'text-slate-600'
                          }`}
                        >
                          <div className="text-[10px] text-slate-500 font-mono">m{i}</div>
                          {kmapCells[i] || '0'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border border-slate-800 text-xs font-mono text-cyan-400 font-bold">1</td>
                      {[2, 3].map(i => (
                        <td 
                          key={i}
                          onClick={() => toggleKmapCell(i)}
                          className={`p-4 border border-slate-800 cursor-pointer font-bold text-xl select-none ${
                            kmapCells[i] === '1' ? 'bg-cyan-950/60 text-cyan-300' : 'text-slate-600'
                          }`}
                        >
                          <div className="text-[10px] text-slate-500 font-mono">m{i}</div>
                          {kmapCells[i] || '0'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Resulting Minimized Expression */}
            <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-400 font-mono">สมการลดรูปขั้นต่ำ (Minimized Boolean Expression):</div>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
                  F = {getKmapFormula()}
                </div>
              </div>
              <button
                onClick={() => setKmapCells({})}
                className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>รีเซ็ตตารางเป็น 0 ทั้งหมด</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: FLIP-FLOP & CLOCK LAB
          ======================================================== */}
      {activeSimulatorTab === 'flipflop' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            
            {/* Mode selection */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Flip-Flop State Transition & Excitation Lab
                </h2>
                <p className="text-xs text-slate-400">เลือกชนิดฟลิปฟลอป กำหนดอินพุต แล้วกดปุ่มส่งสัญญาณ Clock Edge</p>
              </div>

              <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {(['JK', 'D', 'T', 'SR'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setFfType(t);
                      if (t === 'D' || t === 'T') setFfInput2(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition ${
                      ffType === t ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t} FF
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Lab Bench */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Inputs & Clock Trigger */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  ควบคุมอินพุต (Inputs)
                </h3>

                {/* Input 1 */}
                <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="font-mono text-sm font-bold text-slate-200">
                    {ffType === 'JK' ? 'Input J' : ffType === 'SR' ? 'Input S' : ffType === 'D' ? 'Input D' : 'Input T'}
                  </span>
                  <button
                    onClick={() => setFfInput1(prev => prev === 1 ? 0 : 1)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs ${
                      ffInput1 === 1 ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ffInput1}
                  </button>
                </div>

                {/* Input 2 (for JK & SR) */}
                {(ffType === 'JK' || ffType === 'SR') && (
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="font-mono text-sm font-bold text-slate-200">
                      {ffType === 'JK' ? 'Input K' : 'Input R'}
                    </span>
                    <button
                      onClick={() => setFfInput2(prev => prev === 1 ? 0 : 1)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs ${
                        ffInput2 === 1 ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ffInput2}
                    </button>
                  </div>
                )}

                {/* Clock Pulse Trigger Button */}
                <div className="pt-2">
                  <button
                    onClick={triggerClockPulse}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>ส่งสัญญาณ Clock Edge (CLK ↑)</span>
                  </button>
                  <div className="text-center text-[11px] text-slate-500 font-mono mt-2">
                    จังหวะ Clock Pulse ที่: {clockCount}
                  </div>
                </div>
              </div>

              {/* State Output Display */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    สถานะปัจจุบันของฟลิปฟลอป (Current State)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs font-mono text-slate-400">เอาต์พุต Q</div>
                      <div className={`text-4xl font-black font-mono mt-1 ${ffQ === 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {ffQ}
                      </div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs font-mono text-slate-400">เอาต์พุต Q' (Invert)</div>
                      <div className={`text-4xl font-black font-mono mt-1 ${ffQ === 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {ffQ === 1 ? 0 : 1}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">
                    <span className="font-semibold text-slate-200">โหมดการทำงาน:</span>{' '}
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
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  ประวัติการเปลี่ยนสถานะ (Timing History)
                </h3>
                <div className="space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto pr-1">
                  {ffHistory.slice().reverse().map((h, i) => (
                    <div 
                      key={i} 
                      className="p-2 rounded bg-slate-900/70 border border-slate-800/80 flex items-center justify-between"
                    >
                      <span className="text-slate-400">CLK #{h.step}</span>
                      <span className="text-cyan-400">{h.inputs}</span>
                      <span className="font-bold text-emerald-400">Q = {h.q}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: WATER PUMP FSM (Dr. Paween's exam problem)
          ======================================================== */}
      {activeSimulatorTab === 'fsm' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
                    โจทย์ข้อสอบจริง สไลด์หน้า 151-163
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-100 mt-1">
                  ระบบควบคุมปั๊มน้ำอัตโนมัติด้วย Finite State Machine (Moore)
                </h2>
                <p className="text-xs text-slate-400">
                  เซ็นเซอร์ระดับน้ำล่าง (a) และบน (b) ควบคุมปั๊มน้ำ (y) พร้อมวิเคราะห์รหัสใน ROM
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setWaterLevel(10)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  น้ำแห้ง (Drain)
                </button>
                <button
                  onClick={() => setWaterLevel(90)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  น้ำเต็ม (Fill)
                </button>
              </div>
            </div>

            {/* Visualizer Tank & FSM Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left: Water Tank Graphic (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                    <span>ถังพักน้ำจำลอง (Water Tank)</span>
                    <span className="text-cyan-400 font-mono">{waterLevel}%</span>
                  </h3>

                  {/* Tank Container */}
                  <div className="relative h-64 w-full bg-slate-900 rounded-2xl border-2 border-slate-700 overflow-hidden shadow-inner">
                    
                    {/* Water Level Fill */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600 via-cyan-500 to-blue-400 transition-all duration-300 rounded-b-xl opacity-80"
                      style={{ height: `${waterLevel}%` }}
                    />

                    {/* Sensor B Marker (Top: 75%) */}
                    <div className="absolute top-[25%] left-0 right-0 border-b border-dashed border-red-400/60 flex items-center justify-between px-3">
                      <span className="text-[10px] font-mono text-red-300 bg-slate-950/80 px-1.5 py-0.5 rounded border border-red-500/40">
                        เซ็นเซอร์ b (บน): {sensorB ? 'จุ่มน้ำ (1)' : 'ไม่จุ่มน้ำ (0)'}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${sensorB ? 'bg-red-400 animate-ping' : 'bg-slate-700'}`} />
                    </div>

                    {/* Sensor A Marker (Low: 30%) */}
                    <div className="absolute bottom-[30%] left-0 right-0 border-b border-dashed border-amber-400/60 flex items-center justify-between px-3">
                      <span className="text-[10px] font-mono text-amber-300 bg-slate-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">
                        เซ็นเซอร์ a (ล่าง): {sensorA ? 'จุ่มน้ำ (1)' : 'ไม่จุ่มน้ำ (0)'}
                      </span>
                      <span className={`w-3 h-3 rounded-full ${sensorA ? 'bg-amber-400 animate-ping' : 'bg-slate-700'}`} />
                    </div>
                  </div>

                  {/* Manual Water Slider */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>ปรับระดับน้ำด้วยตนเอง:</span>
                      <span className="font-mono">{waterLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={waterLevel}
                      onChange={(e) => setWaterLevel(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Pump Status Bar */}
                <div className={`mt-4 p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  pumpOutput === 1 
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Droplets className={`w-5 h-5 ${pumpOutput === 1 ? 'animate-pulse text-emerald-400' : 'text-rose-400'}`} />
                    <span className="text-sm font-bold">
                      สถานะปั๊มน้ำ (y): {pumpOutput === 1 ? 'กำลังสูบน้ำเข้าถัง (ON)' : 'ปิดการทำงาน (OFF)'}
                    </span>
                  </div>
                  <span className="text-lg font-mono font-black">y = {pumpOutput}</span>
                </div>
              </div>

              {/* Right: Moore FSM States & ROM Table (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
                
                {/* State Machine Visualizer */}
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    แผนภาพสถานะแบบ MOORE (State Diagram)
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* State 0 Card */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      fsmState === 0 
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/30' 
                        : 'bg-slate-900/60 border-slate-800 opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">State 0</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-200 font-mono">y = 1</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">สถานะเปิดปั๊มน้ำ</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        จะเปลี่ยนไป State 1 เมื่อเซ็นเซอร์ a=1 และ b=1 (น้ำเต็มถังแล้ว)
                      </p>
                    </div>

                    {/* State 1 Card */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      fsmState === 1 
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/30' 
                        : 'bg-slate-900/60 border-slate-800 opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-cyan-400">State 1</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-rose-900/40 text-rose-200 font-mono">y = 0</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">สถานะปิดปั๊มน้ำ</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        จะเปลี่ยนไป State 0 เมื่อเซ็นเซอร์ a=0 และ b=0 (น้ำแห้งต่ำกว่า a)
                      </p>
                    </div>

                  </div>
                </div>

                {/* ROM Lookup Table from Dr. Paween's slide */}
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    ตารางข้อมูลใน ROM (ROM Content Lookup Table)
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                          <th className="p-2">ROM Address (S, a, b)</th>
                          <th className="p-2">Present State</th>
                          <th className="p-2">Sensor a</th>
                          <th className="p-2">Sensor b</th>
                          <th className="p-2">Next State</th>
                          <th className="p-2">Output y</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
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
                                isCurrentRow ? 'bg-cyan-950/70 text-cyan-200 font-bold' : 'text-slate-400'
                              }`}
                            >
                              <td className="p-2">{row.addr} {isCurrentRow && '👉 (Active)'}</td>
                              <td className="p-2">{row.s}</td>
                              <td className="p-2">{row.a}</td>
                              <td className="p-2">{row.b}</td>
                              <td className="p-2 text-cyan-400">{row.next}</td>
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
