import React, { useState, useEffect } from 'react';
import { UserCheck, ArrowRight, ArrowLeft, RotateCcw, Play, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MathView } from '../LatexRenderer';

export const PeopleCounterVisualizer: React.FC = () => {
  // Sensor A, Sensor B
  const [sensorA, setSensorA] = useState<0 | 1>(0);
  const [sensorB, setSensorB] = useState<0 | 1>(0);

  // FSM State: 00(S0), 10(S1), 11(S2), 01(S3)
  const [fsmState, setFsmState] = useState<'S0' | 'S1' | 'S2' | 'S3'>('S0');
  const [peopleCount, setPeopleCount] = useState<number>(0);

  // Walking simulation animation state
  const [personPos, setPersonPos] = useState<number>(10); // 0% to 100%
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simNote, setSimNote] = useState<string>('พร้อมจำลอง: เลือกลำดับการเดินด้านล่าง');

  // Walk In Sequence: 00 -> 10 -> 11 -> 01 -> 00
  const simulateWalkIn = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimNote('🚶 เริ่มเดินเข้า: ก้าวตัดผ่านเลเซอร์ A (10)');

    // Step 1: Hit Sensor A
    setPersonPos(30);
    setSensorA(1);
    setSensorB(0);
    setFsmState('S1');

    // Step 2: Hit Both Sensors
    setTimeout(() => {
      setPersonPos(50);
      setSensorA(1);
      setSensorB(1);
      setFsmState('S2');
      setSimNote('🚶 อยู่ตรงกลาง: บังทั้งเลเซอร์ A และ B (11)');
    }, 700);

    // Step 3: Pass Sensor A, only Sensor B
    setTimeout(() => {
      setPersonPos(70);
      setSensorA(0);
      setSensorB(1);
      setFsmState('S3');
      setSimNote('🚶 กำลังพ้นประตู: บังเฉพาะเลเซอร์ B (01)');
    }, 1400);

    // Step 4: Fully In (00) -> Count increments!
    setTimeout(() => {
      setPersonPos(95);
      setSensorA(0);
      setSensorB(0);
      setFsmState('S0');
      setPeopleCount(c => c + 1);
      setSimNote('✅ เดินเข้าสำเร็จ: ครบวงรอบ 00→10→11→01→00 นับคน +1');
      setIsSimulating(false);
    }, 2100);
  };

  // Walk Out Sequence: 00 -> 01 -> 11 -> 10 -> 00
  const simulateWalkOut = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimNote('🚶 เริ่มเดินออก: ก้าวตัดผ่านเลเซอร์ B ก่อน (01)');

    // Step 1: Hit Sensor B
    setPersonPos(70);
    setSensorA(0);
    setSensorB(1);
    setFsmState('S3');

    // Step 2: Hit Both Sensors
    setTimeout(() => {
      setPersonPos(50);
      setSensorA(1);
      setSensorB(1);
      setFsmState('S2');
      setSimNote('🚶 อยู่ตรงกลาง: บังทั้งเลเซอร์ B และ A (11)');
    }, 700);

    // Step 3: Pass Sensor B, only Sensor A
    setTimeout(() => {
      setPersonPos(30);
      setSensorA(1);
      setSensorB(0);
      setFsmState('S1');
      setSimNote('🚶 กำลังออกจากห้อง: บังเฉพาะเลเซอร์ A (10)');
    }, 1400);

    // Step 4: Fully Out (00) -> Count decrements!
    setTimeout(() => {
      setPersonPos(5);
      setSensorA(0);
      setSensorB(0);
      setFsmState('S0');
      setPeopleCount(c => Math.max(c - 1, 0));
      setSimNote('✅ เดินออกสำเร็จ: ครบวงรอบ 00→01→11→10→00 นับคน -1');
      setIsSimulating(false);
    }, 2100);
  };

  // False Entry / Abort: 00 -> 10 -> 00
  const simulateAbort = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimNote('🚶 ยื่นเท้าแตะเซนเซอร์ A ชั่วคราว (10)...');

    setPersonPos(30);
    setSensorA(1);
    setSensorB(0);
    setFsmState('S1');

    setTimeout(() => {
      setPersonPos(10);
      setSensorA(0);
      setSensorB(0);
      setFsmState('S0');
      setSimNote('↩ เปลี่ยนใจถอยหลังกลับ (00): FSM คืนสู่สถานะ S0 โดยไม่นับหลอก!');
      setIsSimulating(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e8f0] dark:border-[#1e293b] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8]">
              <UserCheck className="w-5 h-5" />
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f172a] dark:text-[#f8fafc]">
              แบบจำลอง FSM วงจรนับจำนวนคน 2 ทิศทาง (Optical Laser People Counter - ใบงานที่ 11)
            </h3>
          </div>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
            จำลองคนเดินผ่านเซนเซอร์ลำแสงเลเซอร์ A และ B เพื่อศึกษา FSM State Table และการจัดการ False Entry
          </p>
        </div>

        {/* Live Count Badge */}
        <div className="flex items-center space-x-3 bg-[#0b0f19] px-4 py-2 rounded-2xl border border-gray-800 self-start sm:self-auto">
          <span className="text-xs font-mono text-gray-400">จำนวนคนในห้อง:</span>
          <span className="font-mono text-xl font-bold text-yellow-400">
            {peopleCount} คน
          </span>
          <button
            onClick={() => setPeopleCount(0)}
            className="text-xs text-gray-500 hover:text-white transition cursor-pointer"
          >
            รีเซ็ต
          </button>
        </div>
      </div>

      {/* Doorway & Laser Animation Canvas Area */}
      <div className="bg-[#0b0f19] p-6 rounded-3xl border border-[#1e293b] text-white space-y-6">
        
        {/* Doorway corridor graphic */}
        <div className="relative h-44 rounded-2xl bg-[#131b2e] border border-gray-800 overflow-hidden flex items-center px-4">
          
          {/* Outside label */}
          <div className="absolute left-3 top-3 text-xs font-mono text-gray-400 uppercase tracking-wider">
            นอกห้อง (Outside)
          </div>

          {/* Inside label */}
          <div className="absolute right-3 top-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            ในห้อง (Inside)
          </div>

          {/* Laser Beam A (Red line) */}
          <div className="absolute left-[35%] top-0 bottom-0 w-1 flex flex-col items-center">
            <div className={`w-full h-full transition-all ${
              sensorA === 1 ? 'bg-red-400 shadow-[0_0_15px_#ef4444]' : 'bg-red-900/40'
            }`} />
            <span className="absolute bottom-2 font-mono text-xs text-red-400 font-bold bg-black/60 px-1 rounded">
              Laser A ({sensorA})
            </span>
          </div>

          {/* Laser Beam B (Blue line) */}
          <div className="absolute left-[65%] top-0 bottom-0 w-1 flex flex-col items-center">
            <div className={`w-full h-full transition-all ${
              sensorB === 1 ? 'bg-sky-400 shadow-[0_0_15px_#38bdf8]' : 'bg-sky-900/40'
            }`} />
            <span className="absolute bottom-2 font-mono text-xs text-sky-400 font-bold bg-black/60 px-1 rounded">
              Laser B ({sensorB})
            </span>
          </div>

          {/* Walking Person Silhouette */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out z-20 flex flex-col items-center"
            style={{ left: `${personPos}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-400/30">
              🚶
            </div>
          </div>

        </div>

        {/* Simulation note callout */}
        <div className="p-3 bg-[#131b2e] rounded-xl border border-gray-800 flex items-center justify-between text-xs font-mono">
          <span className="text-gray-300">{simNote}</span>
          <span className="text-yellow-400 font-bold">
            สถานะ FSM: {fsmState} | อินพุต เซนเซอร์: A={sensorA}, B={sensorB}
          </span>
        </div>

        {/* FSM State Bubbles Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'S0', code: '00', label: 'สถานะว่าง (Idle)', desc: 'ยังไม่มีคนบังเซนเซอร์' },
            { id: 'S1', code: '10', label: 'บังเลเซอร์ A', desc: 'เริ่มเดินเข้า หรือ จบการเดินออก' },
            { id: 'S2', code: '11', label: 'บังทั้งคู่ (A & B)', desc: 'ตัวคนอยู่กึ่งกลางประตู' },
            { id: 'S3', code: '01', label: 'บังเลเซอร์ B', desc: 'จบการเดินเข้า หรือ เริ่มเดินออก' }
          ].map(st => (
            <div
              key={st.id}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-300 ${
                fsmState === st.id
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400'
                  : 'bg-slate-900 border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="font-bold text-white">{st.id} ({st.code})</span>
                {fsmState === st.id && <span className="text-emerald-400 text-xs">● ปัจจุบัน</span>}
              </div>
              <div className="font-bold text-xs mt-1 text-gray-200">{st.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{st.desc}</div>
            </div>
          ))}
        </div>

        {/* Interactive Action Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={simulateWalkIn}
            disabled={isSimulating}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer flex items-center space-x-2 disabled:opacity-50"
          >
            <span>🚶 เดินเข้าห้อง (A ➔ B)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={simulateWalkOut}
            disabled={isSimulating}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition cursor-pointer flex items-center space-x-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>🚶 เดินออกจากห้อง (B ➔ A)</span>
          </button>

          <button
            onClick={simulateAbort}
            disabled={isSimulating}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition cursor-pointer flex items-center space-x-2 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>↩ ก้าวเหยียบแล้วถอยกลับ (False Entry)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
