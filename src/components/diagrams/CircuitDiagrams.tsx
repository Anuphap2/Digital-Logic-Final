import React from 'react';

interface DiagramProps {
  id: string;
  caption?: string;
}

export const CircuitDiagram: React.FC<DiagramProps> = ({ id, caption }) => {
  switch (id) {
    case 'logic-levels':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 220" className="w-full h-auto max-h-72 mx-auto">
            <rect x="10" y="10" width="520" height="200" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            {/* Voltage Scale Bar */}
            <line x1="120" y1="30" x2="120" y2="190" stroke="#475569" strokeWidth="2" />
            <line x1="110" y1="35" x2="130" y2="35" stroke="#475569" strokeWidth="2" />
            <text x="100" y="39" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="end">5.0V (Vcc)</text>

            <line x1="110" y1="75" x2="130" y2="75" stroke="#475569" strokeWidth="2" />
            <text x="100" y="79" fill="#38bdf8" fontSize="11" fontFamily="monospace" textAnchor="end">2.4V (Voh)</text>

            <line x1="110" y1="95" x2="130" y2="95" stroke="#475569" strokeWidth="2" />
            <text x="100" y="99" fill="#38bdf8" fontSize="11" fontFamily="monospace" textAnchor="end">2.0V (Vih)</text>

            <line x1="110" y1="135" x2="130" y2="135" stroke="#475569" strokeWidth="2" />
            <text x="100" y="139" fill="#10b981" fontSize="11" fontFamily="monospace" textAnchor="end">0.8V (Vil)</text>

            <line x1="110" y1="155" x2="130" y2="155" stroke="#475569" strokeWidth="2" />
            <text x="100" y="159" fill="#10b981" fontSize="11" fontFamily="monospace" textAnchor="end">0.4V (Vol)</text>

            <line x1="110" y1="185" x2="130" y2="185" stroke="#475569" strokeWidth="2" />
            <text x="100" y="189" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="end">0.0V (GND)</text>

            {/* Logic 1 Band */}
            <rect x="140" y="35" width="200" height="60" rx="6" fill="#0066cc" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="240" y="70" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              LOGIC 1 (HIGH) : 2.0V - 5.0V
            </text>

            {/* Forbidden Zone */}
            <rect x="140" y="95" width="200" height="40" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="240" y="120" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              FORBIDDEN ZONE (0.8V - 2.0V)
            </text>

            {/* Logic 0 Band */}
            <rect x="140" y="135" width="200" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
            <text x="240" y="165" fill="#10b981" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              LOGIC 0 (LOW) : 0.0V - 0.8V
            </text>

            {/* Noise Margin Annotations */}
            <path d="M 350 75 L 370 75 L 370 95 L 350 95" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="380" y="88" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              NM_H = 0.4V (Voh - Vih)
            </text>

            <path d="M 350 135 L 370 135 L 370 155 L 350 155" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="380" y="148" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              NM_L = 0.4V (Vil - Vol)
            </text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'ระดับแรงดันตรรกะ TTL 5V, ช่วงต้องห้าม (Forbidden Zone) และขอบเขต Noise Margin'}
          </div>
        </div>
      );

    case 'all-gates':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 240" className="w-full h-auto max-h-80 mx-auto">
            <rect x="10" y="10" width="520" height="220" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            {/* AND */}
            <g transform="translate(30, 30)">
              <rect x="0" y="0" width="145" height="85" rx="8" fill="#0b0f19" stroke="#334155" />
              <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">AND Gate (7408)</text>
              <path d="M 30 40 L 50 40 M 30 60 L 50 60" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 50 30 L 70 30 A 20 20 0 0 1 70 70 L 50 70 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <line x1="90" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="125" y="54" fill="#10b981" fontSize="11" fontFamily="monospace">Y=AB</text>
            </g>

            {/* OR */}
            <g transform="translate(195, 30)">
              <rect x="0" y="0" width="145" height="85" rx="8" fill="#0b0f19" stroke="#334155" />
              <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">OR Gate (7432)</text>
              <path d="M 25 40 L 48 40 M 25 60 L 48 60" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 45 30 Q 60 50 45 70 Q 75 70 90 50 Q 75 30 45 30 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <line x1="90" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="125" y="54" fill="#10b981" fontSize="11" fontFamily="monospace">Y=A+B</text>
            </g>

            {/* NOT */}
            <g transform="translate(360, 30)">
              <rect x="0" y="0" width="145" height="85" rx="8" fill="#0b0f19" stroke="#334155" />
              <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">NOT Gate (7404)</text>
              <line x1="30" y1="50" x2="50" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <polygon points="50,32 50,68 80,50" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="84" cy="50" r="4" fill="#131b2e" stroke="#38bdf8" strokeWidth="2" />
              <line x1="88" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="123" y="54" fill="#10b981" fontSize="11" fontFamily="monospace">Y=A'</text>
            </g>

            {/* NAND */}
            <g transform="translate(30, 130)">
              <rect x="0" y="0" width="145" height="85" rx="8" fill="#0b0f19" stroke="#334155" />
              <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">NAND (7400)</text>
              <path d="M 30 40 L 45 40 M 30 60 L 45 60" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 45 30 L 65 30 A 20 20 0 0 1 65 70 L 45 70 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="89" cy="50" r="4" fill="#131b2e" stroke="#38bdf8" strokeWidth="2" />
              <line x1="93" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="122" y="54" fill="#10b981" fontSize="10" fontFamily="monospace">(AB)'</text>
            </g>

            {/* NOR */}
            <g transform="translate(195, 130)">
              <rect x="0" y="0" width="145" height="85" rx="8" fill="#0b0f19" stroke="#334155" />
              <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">NOR (7402)</text>
              <path d="M 25 40 L 42 40 M 25 60 L 42 60" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 40 30 Q 55 50 40 70 Q 70 70 85 50 Q 70 30 40 30 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="89" cy="50" r="4" fill="#131b2e" stroke="#38bdf8" strokeWidth="2" />
              <line x1="93" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="120" y="54" fill="#10b981" fontSize="10" fontFamily="monospace">(A+B)'</text>
            </g>

            {/* XOR */}
            <g transform="translate(360, 130)">
              <rect x="0" y="0" width="145" height="85" rx="8" fill="#0b0f19" stroke="#334155" />
              <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">XOR (7486)</text>
              <path d="M 20 40 L 42 40 M 20 60 L 42 60" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 37 30 Q 50 50 37 70" fill="none" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 44 30 Q 57 50 44 70 Q 74 70 89 50 Q 74 30 44 30 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <line x1="89" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="123" y="54" fill="#10b981" fontSize="10" fontFamily="monospace">A⊕B</text>
            </g>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'สัญลักษณ์ลอจิกเกตมาตรฐานสากล (IEEE/ANSI) พร้อมรหัสชิปไอซี 74xx'}
          </div>
        </div>
      );

    case 'full-adder':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 220" className="w-full h-auto max-h-72 mx-auto">
            <rect x="10" y="10" width="520" height="200" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            <text x="25" y="45" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">Input A</text>
            <text x="25" y="85" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">Input B</text>
            <text x="25" y="145" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">Cin</text>

            <line x1="85" y1="40" x2="140" y2="40" stroke="#38bdf8" strokeWidth="2" />
            <line x1="85" y1="80" x2="140" y2="80" stroke="#38bdf8" strokeWidth="2" />
            <line x1="60" y1="140" x2="280" y2="140" stroke="#f59e0b" strokeWidth="2" />

            {/* HA1 */}
            <rect x="130" y="25" width="110" height="120" rx="8" fill="#0b0f19" stroke="#0066cc" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="185" y="135" fill="#0066cc" fontSize="10" fontFamily="monospace" textAnchor="middle">Half Adder 1</text>
            <path d="M 145 35 Q 155 50 145 65 Q 170 65 180 50 Q 170 35 145 35 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M 145 75 L 160 75 A 15 15 0 0 1 160 105 L 145 105 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />

            {/* HA2 */}
            <rect x="270" y="45" width="110" height="120" rx="8" fill="#0b0f19" stroke="#0066cc" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="325" y="155" fill="#0066cc" fontSize="10" fontFamily="monospace" textAnchor="middle">Half Adder 2</text>
            <path d="M 285 55 Q 295 70 285 85 Q 310 85 320 70 Q 310 55 285 55 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M 285 95 L 300 95 A 15 15 0 0 1 300 125 L 285 125 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />

            {/* OR */}
            <path d="M 410 100 Q 425 120 410 140 Q 440 140 455 120 Q 440 100 410 100 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

            {/* Outputs */}
            <line x1="320" y1="70" x2="480" y2="70" stroke="#10b981" strokeWidth="2.5" />
            <text x="488" y="74" fill="#10b981" fontSize="13" fontFamily="monospace" fontWeight="bold">Sum = A ⊕ B ⊕ Cin</text>

            <line x1="455" y1="120" x2="480" y2="120" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="488" y="124" fill="#f59e0b" fontSize="13" fontFamily="monospace" fontWeight="bold">Cout = AB + Cin(A⊕B)</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'แผนผังวงจรบวกเต็มรูปแบบ (Full Adder) สร้างจาก Half Adder 2 ตัว + OR Gate 1 ตัว'}
          </div>
        </div>
      );

    case 'ripple-adder':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 180" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="160" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            {[0, 1, 2, 3].map(i => {
              const x = 30 + i * 125;
              return (
                <g key={i} transform={`translate(${x}, 30)`}>
                  <rect x="0" y="0" width="95" height="100" rx="8" fill="#0b0f19" stroke="#0066cc" strokeWidth="1.5" />
                  <text x="47" y="22" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    FA {i}
                  </text>
                  <text x="47" y="45" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    A{i}, B{i}
                  </text>
                  <text x="47" y="85" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    S{i} ↓
                  </text>
                  {i < 3 ? (
                    <path d="M 95 50 L 125 50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                  ) : null}
                </g>
              );
            })}
            <text x="25" y="85" fill="#f59e0b" fontSize="10" fontFamily="monospace">Cin (0) →</text>
            <text x="510" y="85" fill="#f59e0b" fontSize="10" fontFamily="monospace">→ C4</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'วงจรบวก 4 บิตแบบ Ripple Carry Adder แสดงการส่งตัวทดต่อกันเป็นทอดๆ'}
          </div>
        </div>
      );

    case 'r2r-ladder':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 180" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="160" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            <text x="30" y="35" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
              วงจร R-2R Ladder Network (4-Bit DAC)
            </text>
            
            {/* Horizontal R and Vertical 2R */}
            {[0, 1, 2, 3].map(i => {
              const x = 70 + i * 90;
              return (
                <g key={i}>
                  <line x1={x} y1="70" x2={x + 90} y2="70" stroke="#38bdf8" strokeWidth="2" />
                  <rect x={x + 35} y="62" width="20" height="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                  <text x={x + 45} y="74" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">R</text>

                  <line x1={x} y1="70" x2={x} y2="120" stroke="#f59e0b" strokeWidth="2" />
                  <rect x={x - 8} y="85" width="16" height="20" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
                  <text x={x} y="99" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle">2R</text>

                  <text x={x} y="138" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    B{i} (bit)
                  </text>
                </g>
              );
            })}

            <line x1="430" y1="70" x2="470" y2="70" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="470,55 470,85 495,70" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <line x1="495" y1="70" x2="520" y2="70" stroke="#10b981" strokeWidth="2" />
            <text x="500" y="95" fill="#10b981" fontSize="11" fontFamily="monospace">Vout</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'โครงสร้างตัวต้านทานแบบ R-2R Ladder Network และสวิตช์อินพุตดิจิทัล 4 บิต'}
          </div>
        </div>
      );

    case 'kmap-4var':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 220" className="w-full h-auto max-h-72 mx-auto">
            <rect x="10" y="10" width="520" height="200" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            <text x="65" y="42" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">AB \ CD</text>
            <text x="160" y="42" fill="#94a3b8" fontSize="11" fontFamily="monospace">00</text>
            <text x="240" y="42" fill="#94a3b8" fontSize="11" fontFamily="monospace">01</text>
            <text x="320" y="42" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">11</text>
            <text x="400" y="42" fill="#94a3b8" fontSize="11" fontFamily="monospace">10</text>

            <text x="80" y="78" fill="#94a3b8" fontSize="11" fontFamily="monospace">00</text>
            <text x="80" y="113" fill="#94a3b8" fontSize="11" fontFamily="monospace">01</text>
            <text x="80" y="148" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">11</text>
            <text x="80" y="183" fill="#94a3b8" fontSize="11" fontFamily="monospace">10</text>

            <line x1="120" y1="55" x2="440" y2="55" stroke="#334155" />
            <line x1="120" y1="90" x2="440" y2="90" stroke="#334155" />
            <line x1="120" y1="125" x2="440" y2="125" stroke="#334155" />
            <line x1="120" y1="160" x2="440" y2="160" stroke="#334155" />
            <line x1="120" y1="195" x2="440" y2="195" stroke="#334155" />

            <line x1="120" y1="55" x2="120" y2="195" stroke="#334155" />
            <line x1="200" y1="55" x2="200" y2="195" stroke="#334155" />
            <line x1="280" y1="55" x2="280" y2="195" stroke="#334155" />
            <line x1="360" y1="55" x2="360" y2="195" stroke="#334155" />
            <line x1="440" y1="55" x2="440" y2="195" stroke="#334155" />

            {/* 4 Corners */}
            <rect x="122" y="57" width="76" height="31" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" />
            <text x="160" y="78" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">m0 (1)</text>

            <rect x="362" y="57" width="76" height="31" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" />
            <text x="400" y="78" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">m2 (1)</text>

            <rect x="122" y="162" width="76" height="31" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" />
            <text x="160" y="183" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">m8 (1)</text>

            <rect x="362" y="162" width="76" height="31" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" />
            <text x="400" y="183" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">m10 (1)</text>

            <text x="455" y="125" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
              กลุ่ม 4 มุม = B'D'
            </text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'ผังมินเทอม K-Map 4 ตัวแปร จัดเรียงแบบ Gray Code พร้อมไฮไลต์การยุบ 4 มุม'}
          </div>
        </div>
      );

    case 'seven-segment':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 180" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="160" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            {/* 7-Segment display drawing */}
            <g transform="translate(140, 25)">
              {/* a */}
              <rect x="25" y="10" width="60" height="10" rx="3" fill="#ef4444" />
              <text x="55" y="8" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="middle">a</text>
              {/* b */}
              <rect x="85" y="20" width="10" height="40" rx="3" fill="#ef4444" />
              <text x="102" y="42" fill="#ef4444" fontSize="10" fontFamily="monospace">b</text>
              {/* c */}
              <rect x="85" y="65" width="10" height="40" rx="3" fill="#ef4444" />
              <text x="102" y="88" fill="#ef4444" fontSize="10" fontFamily="monospace">c</text>
              {/* d */}
              <rect x="25" y="105" width="60" height="10" rx="3" fill="#ef4444" />
              <text x="55" y="125" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="middle">d</text>
              {/* e */}
              <rect x="15" y="65" width="10" height="40" rx="3" fill="#ef4444" />
              <text x="5" y="88" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="end">e</text>
              {/* f */}
              <rect x="15" y="20" width="10" height="40" rx="3" fill="#ef4444" />
              <text x="5" y="42" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="end">f</text>
              {/* g */}
              <rect x="25" y="58" width="60" height="9" rx="3" fill="#ef4444" />
              <text x="55" y="54" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="middle">g</text>
              {/* dp */}
              <circle cx="108" cy="110" r="5" fill="#ef4444" />
              <text x="118" y="114" fill="#ef4444" fontSize="9" fontFamily="monospace">dp</text>
            </g>

            {/* CD4511 IC Box */}
            <g transform="translate(320, 30)">
              <rect x="0" y="0" width="140" height="110" rx="8" fill="#0b0f19" stroke="#0066cc" strokeWidth="1.5" />
              <text x="70" y="25" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                CD4511 BCD
              </text>
              <text x="70" y="42" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                to 7-Segment Driver
              </text>
              <text x="15" y="65" fill="#f59e0b" fontSize="10" fontFamily="monospace">LT (ขา 3) Lamp Test</text>
              <text x="15" y="82" fill="#f59e0b" fontSize="10" fontFamily="monospace">BI (ขา 4) Blanking</text>
              <text x="15" y="99" fill="#f59e0b" fontSize="10" fontFamily="monospace">LE (ขา 5) Latch En</text>
            </g>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'ผังชื่อเซกเมนต์ a ถึง g ของ 7-Segment Display และขาควบคุมไอซี CD4511 (ใบงานที่ 9)'}
          </div>
        </div>
      );

    case 'sr-latch':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 200" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="180" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            <g transform="translate(180, 30)">
              <text x="-120" y="24" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">Reset (R)</text>
              <line x1="-50" y1="20" x2="0" y2="20" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 0 10 Q 15 30 0 50 Q 30 50 45 30 Q 30 10 0 10 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="49" cy="30" r="4" fill="#131b2e" stroke="#38bdf8" strokeWidth="2" />
              <line x1="53" y1="30" x2="160" y2="30" stroke="#10b981" strokeWidth="2.5" />
              <text x="175" y="35" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">Q</text>
            </g>

            <g transform="translate(180, 110)">
              <text x="-120" y="44" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">Set (S)</text>
              <line x1="-50" y1="40" x2="0" y2="40" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 0 10 Q 15 30 0 50 Q 30 50 45 30 Q 30 10 0 10 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="49" cy="30" r="4" fill="#131b2e" stroke="#38bdf8" strokeWidth="2" />
              <line x1="53" y1="30" x2="160" y2="30" stroke="#10b981" strokeWidth="2.5" />
              <text x="175" y="35" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">Q' (Inverted)</text>
            </g>

            <path d="M 280 60 L 280 90 L 160 125 L 180 125" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 270 140 L 270 105 L 160 70 L 180 70" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="290" y="105" fill="#f59e0b" fontSize="10" fontFamily="monospace">Feedback Loop</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'วงจรแลตช์พื้นฐาน (NOR SR Latch) แสดงสายสัญญาณป้อนกลับไขว้ (Cross-Coupled Feedback)'}
          </div>
        </div>
      );

    case 'jk-flipflop':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 180" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="160" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            <g transform="translate(200, 25)">
              <rect x="0" y="0" width="140" height="120" rx="8" fill="#0b0f19" stroke="#a855f7" strokeWidth="2" />
              <text x="70" y="30" fill="#a855f7" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                JK Flip-Flop
              </text>
              <text x="15" y="55" fill="#38bdf8" fontSize="11" fontFamily="monospace">J</text>
              <text x="15" y="75" fill="#38bdf8" fontSize="11" fontFamily="monospace">CLK &gt;</text>
              <text x="15" y="95" fill="#38bdf8" fontSize="11" fontFamily="monospace">K</text>
              <text x="115" y="55" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">Q</text>
              <text x="115" y="95" fill="#64748b" fontSize="11" fontFamily="monospace">Q'</text>

              <text x="70" y="12" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">PRE (Async)</text>
              <text x="70" y="132" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">CLR (Async)</text>
            </g>

            <text x="50" y="70" fill="#38bdf8" fontSize="11" fontFamily="monospace">J = 1 (Set)</text>
            <text x="50" y="90" fill="#38bdf8" fontSize="11" fontFamily="monospace">K = 1 (Toggle!)</text>
            <text x="370" y="70" fill="#10b981" fontSize="11" fontFamily="monospace">ขอบขาขึ้น (Rising Edge ⭡)</text>
            <text x="370" y="90" fill="#f59e0b" fontSize="10" fontFamily="monospace">แก้จุดอ่อน SR Latch 100%</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'สัญลักษณ์และขาควบคุมของ JK Flip-Flop พร้อมขา Asynchronous PRESET และ CLEAR'}
          </div>
        </div>
      );

    case 'ripple-counter':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 190" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="170" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            {[0, 1, 2, 3].map(i => {
              const x = 35 + i * 125;
              return (
                <g key={i} transform={`translate(${x}, 35)`}>
                  <rect x="0" y="0" width="95" height="110" rx="8" fill="#0b0f19" stroke="#0066cc" strokeWidth="1.5" />
                  <text x="47" y="20" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    FF {i}
                  </text>
                  <text x="12" y="45" fill="#f59e0b" fontSize="10" fontFamily="monospace">T=1</text>
                  <text x="12" y="80" fill="#94a3b8" fontSize="9" fontFamily="monospace">CLK</text>
                  <text x="75" y="55" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">Q{i}</text>
                  <text x="75" y="90" fill="#64748b" fontSize="10" fontFamily="monospace">Q{i}'</text>
                  {i < 3 && (
                    <path d="M 85 85 L 110 85 L 110 135 L 125 135 L 125 78" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
                  )}
                </g>
              );
            })}
            <path d="M 15 110 L 35 110" stroke="#38bdf8" strokeWidth="2" />
            <text x="15" y="102" fill="#38bdf8" fontSize="9" fontFamily="monospace">Main CLK</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'วงจรนับ 4 บิตแบบ Asynchronous Ripple Counter แสดงการส่งต่อ Clock แบบระลอกคลื่น'}
          </div>
        </div>
      );

    case 'ne555-block':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 230" className="w-full h-auto max-h-80 mx-auto">
            <rect x="10" y="10" width="520" height="210" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            
            <g transform="translate(60, 25)">
              <text x="15" y="10" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle">VCC (Pin 8)</text>
              <line x1="15" y1="15" x2="15" y2="35" stroke="#f59e0b" strokeWidth="2" />
              <rect x="5" y="35" width="20" height="30" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="15" y="54" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle">5k</text>

              <circle cx="15" cy="75" r="3" fill="#38bdf8" />
              <text x="35" y="78" fill="#38bdf8" fontSize="10" fontFamily="monospace">2/3 VCC</text>
              
              <rect x="5" y="85" width="20" height="30" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="15" y="104" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle">5k</text>

              <circle cx="15" cy="125" r="3" fill="#38bdf8" />
              <text x="35" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace">1/3 VCC</text>

              <rect x="5" y="135" width="20" height="30" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="15" y="154" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle">5k</text>
              <line x1="15" y1="165" x2="15" y2="185" stroke="#94a3b8" strokeWidth="2" />
              <text x="15" y="196" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">GND (Pin 1)</text>
            </g>

            {/* Comparators */}
            <polygon points="180,50 180,95 220,72" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="195" y="77" fill="#38bdf8" fontSize="11" fontFamily="monospace">Comp 1</text>
            <text x="110" y="55" fill="#94a3b8" fontSize="10" fontFamily="monospace">Pin 6 (THRES) -</text>
            <text x="110" y="88" fill="#38bdf8" fontSize="10" fontFamily="monospace">2/3 Vcc +</text>

            <polygon points="180,120 180,165 220,142" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="195" y="147" fill="#38bdf8" fontSize="11" fontFamily="monospace">Comp 2</text>
            <text x="110" y="125" fill="#38bdf8" fontSize="10" fontFamily="monospace">1/3 Vcc -</text>
            <text x="110" y="158" fill="#94a3b8" fontSize="10" fontFamily="monospace">Pin 2 (TRIG) +</text>

            {/* SR Latch */}
            <rect x="260" y="60" width="80" height="95" rx="6" fill="#0b0f19" stroke="#a855f7" strokeWidth="2" />
            <text x="300" y="85" fill="#a855f7" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SR</text>
            <text x="300" y="102" fill="#a855f7" fontSize="11" fontFamily="monospace" textAnchor="middle">Latch</text>

            {/* Output */}
            <line x1="340" y1="80" x2="430" y2="80" stroke="#10b981" strokeWidth="2" />
            <rect x="430" y="65" width="75" height="30" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
            <text x="467" y="84" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              Pin 3 (OUT)
            </text>

            {/* Discharge */}
            <g transform="translate(360, 135)">
              <text x="30" y="10" fill="#f59e0b" fontSize="10" fontFamily="monospace">Pin 7 (DISCH)</text>
              <line x1="10" y1="0" x2="10" y2="35" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="0" y1="18" x2="10" y2="18" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="10" y1="35" x2="10" y2="45" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="5" y1="45" x2="15" y2="45" stroke="#94a3b8" strokeWidth="1.5" />
            </g>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'บล็อกไดอะแกรมภายในไอซีไทเมอร์ NE555 (ตัวต้านทาน 5k 3 ตัว, 2 Comparators, SR Latch, Discharge Transistor)'}
          </div>
        </div>
      );

    case 'ne555-astable':
      return (
        <div className="my-5 p-4 bg-white dark:bg-[#0b0f19] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl shadow-xs">
          <svg viewBox="0 0 540 180" className="w-full h-auto max-h-64 mx-auto">
            <rect x="10" y="10" width="520" height="160" rx="12" fill="#131b2e" stroke="#1e293b" strokeWidth="1.5" />
            <text x="30" y="30" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
              วงจรต่อจริง NE555 Astable Multivibrator (ใบงานที่ 10)
            </text>

            <g transform="translate(180, 40)">
              <rect x="0" y="0" width="140" height="100" rx="8" fill="#0b0f19" stroke="#0066cc" strokeWidth="2" />
              <text x="70" y="25" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                NE555 Timer
              </text>
              <text x="15" y="50" fill="#f59e0b" fontSize="10" fontFamily="monospace">ขา 7 (Discharge)</text>
              <text x="15" y="70" fill="#38bdf8" fontSize="10" fontFamily="monospace">ขา 6 & 2 (ต่อร่วม)</text>
              <text x="100" y="60" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">ขา 3 OUT</text>
            </g>

            {/* R1, R2, C labels */}
            <text x="50" y="60" fill="#f59e0b" fontSize="11" fontFamily="monospace">+5V ผ่าน R1 (1kΩ)</text>
            <text x="50" y="85" fill="#f59e0b" fontSize="11" fontFamily="monospace">ผ่าน R2 (71.5kΩ)</text>
            <text x="50" y="110" fill="#10b981" fontSize="11" fontFamily="monospace">ลงตัวเก็บประจุ C (10µF)</text>
            <text x="350" y="80" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">→ คลื่นสี่เหลี่ยม 1 Hz (LED)</text>
          </svg>
          <div className="text-center text-xs font-mono text-[#64748b] dark:text-[#94a3b8] mt-2">
            📷 {caption || 'วงจรต่อใช้งานจริง NE555 Astable สร้างไฟกระพริบ 1 Hz (ใบงานที่ 10)'}
          </div>
        </div>
      );

    default:
      return null;
  }
};
