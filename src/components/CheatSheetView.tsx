import React from 'react';
import { Printer, Sparkles, FileText, CheckCircle } from 'lucide-react';
import { MathView } from './LatexRenderer';

export const CheatSheetView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Top Banner & Print Action */}
      <div className="no-print bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
              นำเข้าห้องสอบได้ 1 แผ่น A4 (ตามข้อกำหนด อ.ปวีณ)
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0f172a] dark:text-[#f8fafc] mt-1 tracking-tight">
            สรุปสูตร Digital Logic Final (A4 Cheat Sheet)
          </h1>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
            รวบรวมสูตร ตาราง Excitation กฎเดอมอร์แกน และการคำนวณทั้งหมดในหน้าเดียว จัด Layout พอดีกระดาษ A4
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold text-xs shadow-md shadow-[#0066cc]/20 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>สั่งพิมพ์ / บันทึกเป็น PDF (Print A4)</span>
        </button>
      </div>

      {/* Printable Sheet (Stylized for both screen view & printer printout) */}
      <div className="bg-white text-[#0f172a] dark:bg-[#131b2e] dark:text-[#f8fafc] p-6 md:p-8 rounded-2xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-sm print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Sheet Header */}
        <div className="border-b-2 border-[#0066cc] dark:border-[#38bdf8] pb-3 mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl tracking-tight text-[#0f172a] dark:text-[#f8fafc] print:text-black">
              CS121 Digital Logic & Smart Device | Final Cheat Sheet
            </h2>
            <p className="text-xs text-[#64748b] dark:text-[#94a3b8] print:text-slate-700">
              คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้ | ดร. ปวีณ เขื่อนแก้ว
            </p>
          </div>
          <div className="text-right text-xs font-mono font-bold">
            <div>EXAM ROOM A4 SHEET</div>
            <div className="text-[#0066cc] dark:text-[#38bdf8] print:text-black">Chapter 3 + 4 + 5</div>
          </div>
        </div>

        {/* 3-Column Dense Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-3 text-xs leading-tight">
          
          {/* ================= COLUMN 1 ================= */}
          <div className="space-y-3">
            
            {/* Box 1: Analog vs Digital */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5 flex justify-between">
                <span>1. สัญญาณ & ความละเอียด (Noise)</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-1">
                • แอนะล็อก: ต่อเนื่อง, ไวต่อ Noise<br/>
                • ดิจิทัล: 0/1 เท่านั้น, ทน Noise (Noise Margin)
              </p>
              <div className="bg-[#f1f5f9] dark:bg-[#1e293b] p-2 rounded-lg text-xs print:bg-slate-100">
                <div className="font-bold mb-0.5 text-[#0f172a] dark:text-[#f8fafc]">สูตรจำนวนรูปแบบสูงสุด:</div>
                <MathView math="N = \lfloor \frac{V_{max} - V_{min}}{2 \times |V_{noise}|} \rfloor" displayMode={true} />
                <span className="text-xs text-[#64748b] dark:text-[#94a3b8] block text-center">เช่น 0-5V, Noise ±0.2V → 5/0.4 = 12 แบบ</span>
              </div>
            </div>

            {/* Box 2: Logic Gates & Equations */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5">
                2. ลอจิกเกตพื้นฐาน & ตัวดำเนินการ
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#1e293b]">
                  <tr><td className="font-bold py-1">NOT</td><td><MathView math="Y = \bar{A}" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">กลับค่า 0↔1</td></tr>
                  <tr><td className="font-bold py-1">AND</td><td><MathView math="Y = A \cdot B" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">1 เมื่อทุกตัวเป็น 1</td></tr>
                  <tr><td className="font-bold py-1">OR</td><td><MathView math="Y = A + B" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">1 เมื่อมี 1 ตัวขึ้นไป</td></tr>
                  <tr><td className="font-bold py-1">NAND</td><td><MathView math="Y = \overline{A \cdot B}" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">Universal Gate</td></tr>
                  <tr><td className="font-bold py-1">NOR</td><td><MathView math="Y = \overline{A + B}" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">Universal Gate</td></tr>
                  <tr><td className="font-bold py-1">XOR</td><td><MathView math="A \oplus B = \bar{A}B + A\bar{B}" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">Odd Parity</td></tr>
                  <tr><td className="font-bold py-1">XNOR</td><td><MathView math="\overline{A \oplus B} = AB + \bar{A}\bar{B}" /></td><td className="text-xs text-[#64748b] dark:text-[#94a3b8]">Equivalence</td></tr>
                </tbody>
              </table>
            </div>

            {/* Box 3: Adders */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5">
                3. วงจรบวกเลข (Adders)
              </div>
              <div className="space-y-1 text-xs text-[#334155] dark:text-[#cbd5e1]">
                <div><strong className="text-[#0f172a] dark:text-[#f8fafc]">Half Adder (HA):</strong></div>
                <div className="pl-1">• Sum: <MathView math="S = A \oplus B" /></div>
                <div className="pl-1">• Carry: <MathView math="C = A \cdot B" /></div>
                <div className="pt-1"><strong className="text-[#0f172a] dark:text-[#f8fafc]">Full Adder (FA):</strong></div>
                <div className="pl-1">• Sum: <MathView math="S = A \oplus B \oplus C_{in}" /></div>
                <div className="pl-1">• Carry Out: <MathView math="C_{out} = AB + C_{in}(A \oplus B)" /></div>
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] italic mt-0.5">
                  * FA 1 ตัว = HA 2 ตัว + OR Gate 1 ตัว
                </div>
              </div>
            </div>

            {/* Box 4: 555 Timer Formulas */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5 flex justify-between">
                <span>4. ไอซีไทเมอร์ 555 (Astable)</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1 text-xs text-[#334155] dark:text-[#cbd5e1]">
                <div>• <MathView math="T_H = 0.693(R_1 + R_2)C" /></div>
                <div>• <MathView math="T_L = 0.693 R_2 C" /></div>
                <div>• <MathView math="T = T_H + T_L = 0.693(R_1 + 2R_2)C" /></div>
                <div>• <MathView math="f = \frac{1.44}{(R_1 + 2R_2)C}" /></div>
                <div>• <MathView math="\text{Duty Cycle} = \frac{R_1 + R_2}{R_1 + 2R_2} \times 100\%" /></div>
                <div className="text-xs text-[#0066cc] dark:text-[#38bdf8] font-semibold mt-0.5">
                  * Duty cycle ของ 555 ต้อง &gt; 50% เสมอ!
                </div>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 2 ================= */}
          <div className="space-y-3">
            
            {/* Box 5: Boolean Algebra Laws */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5 flex justify-between">
                <span>5. กฎพีชคณิตบูลีนที่ต้องจำ</span>
                <span className="font-mono text-xs">Ch.4</span>
              </div>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td><MathView math="A + 0 = A" /></td><td><MathView math="A \cdot 1 = A" /></td></tr>
                  <tr><td><MathView math="A + 1 = 1" /></td><td><MathView math="A \cdot 0 = 0" /></td></tr>
                  <tr><td><MathView math="A + A = A" /></td><td><MathView math="A \cdot A = A" /></td></tr>
                  <tr><td><MathView math="A + \bar{A} = 1" /></td><td><MathView math="A \cdot \bar{A} = 0" /></td></tr>
                  <tr><td colSpan={2} className="pt-1"><strong>Absorption:</strong> <MathView math="A + AB = A" />, <MathView math="A(A+B) = A" /></td></tr>
                  <tr><td colSpan={2}><strong>Consensus:</strong> <MathView math="A + \bar{A}B = A + B" /></td></tr>
                  <tr><td colSpan={2}><strong>Distributive:</strong> <MathView math="A + BC = (A+B)(A+C)" /></td></tr>
                </tbody>
              </table>
              <div className="mt-2 pt-1.5 border-t border-[#e2e8f0] dark:border-[#1e293b] text-xs text-[#0066cc] dark:text-[#38bdf8]">
                <strong>De Morgan's Laws:</strong><br/>
                1) <MathView math="\overline{A + B} = \bar{A} \cdot \bar{B}" /><br/>
                2) <MathView math="\overline{A \cdot B} = \bar{A} + \bar{B}" />
              </div>
            </div>

            {/* Box 6: K-Map Rules & Grouping */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5">
                6. Karnaugh Map & Don't Care (X)
              </div>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-1">
                • Gray Code หัวตาราง: <strong>00, 01, 11, 10</strong> (11 ก่อน 10)<br/>
                • ขนาดกลุ่ม: เลขยกกำลังสอง 1, 2, 4, 8, 16 เซลล์<br/>
                • กลุ่ม 2 ตัด 1 ตัวแปร | กลุ่ม 4 ตัด 2 ตัวแปร
              </p>
              
              <div className="bg-[#f1f5f9] dark:bg-[#1e293b] p-2 rounded-lg font-mono text-xs">
                <strong className="text-[#0f172a] dark:text-[#f8fafc]">พิกัด K-Map 4 ตัวแปร (AB \ CD):</strong><br/>
                00: 0, 1, 3, 2 | 01: 4, 5, 7, 6<br/>
                11: 12, 13, 15, 14 | 10: 8, 9, 11, 10<br/>
                <span className="text-[#0066cc] dark:text-[#38bdf8] font-bold">มุมทั้ง 4 (0, 2, 8, 10) = B' · D'</span>
              </div>
              <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
                • Don't Care (X): เลือกเป็น 1 เพื่อขยายกลุ่ม หรือปล่อยเป็น 0 ถ้าไม่ช่วย
              </div>
            </div>

            {/* Box 7: Universal Gates */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5">
                7. การแปลง Universal Gates
              </div>
              <div className="text-xs space-y-1 text-[#334155] dark:text-[#cbd5e1]">
                <div>• AND-OR (SOP) ↔ <strong>NAND-NAND 2 ระดับ</strong></div>
                <div>• OR-AND (POS) ↔ <strong>NOR-NOR 2 ระดับ</strong></div>
                <div>• Inverter: รวบขั้วอินพุตของ NAND เข้าด้วยกัน</div>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 3 ================= */}
          <div className="space-y-3">
            
            {/* Box 8: Flip-Flops & Excitation Tables */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5 flex justify-between">
                <span>8. ตารางกระตุ้นฟลิปฟลอป (EXCITATION)</span>
                <span className="font-mono text-rose-500 text-xs font-bold">★ออกสอบ</span>
              </div>

              <table className="w-full text-center text-xs border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#f1f5f9] dark:bg-[#1e293b] font-bold text-[#0f172a] dark:text-[#f8fafc]">
                    <th className="p-1"><MathView math="Q \to Q_{next}" /></th>
                    <th className="p-1">D</th>
                    <th className="p-1">T</th>
                    <th className="p-1">J</th>
                    <th className="p-1">K</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#1e293b] font-mono">
                  <tr><td>0 → 0</td><td>0</td><td>0</td><td className="font-bold text-[#0066cc] dark:text-[#38bdf8]">0</td><td className="font-bold text-amber-500">X</td></tr>
                  <tr><td>0 → 1</td><td>1</td><td>1</td><td className="font-bold text-[#0066cc] dark:text-[#38bdf8]">1</td><td className="font-bold text-amber-500">X</td></tr>
                  <tr><td>1 → 0</td><td>0</td><td>1</td><td className="font-bold text-amber-500">X</td><td className="font-bold text-[#0066cc] dark:text-[#38bdf8]">1</td></tr>
                  <tr><td>1 → 1</td><td>1</td><td>0</td><td className="font-bold text-amber-500">X</td><td className="font-bold text-[#0066cc] dark:text-[#38bdf8]">0</td></tr>
                </tbody>
              </table>

              <div className="mt-2 text-xs space-y-0.5 text-[#334155] dark:text-[#cbd5e1]">
                <div>• D-FF: <MathView math="Q_{next} = D" /></div>
                <div>• JK-FF: <MathView math="Q_{next} = J\bar{Q} + \bar{K}Q" /> (J=K=1 คือ Toggle)</div>
                <div>• T-FF: <MathView math="Q_{next} = T \oplus Q" /> (T=1 คือ Toggle/หารสอง)</div>
                <div>• SR Latch: ห้าม S=1, R=1 ใน NOR Latch!</div>
              </div>
            </div>

            {/* Box 9: Counters & Registers */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5">
                9. วงจรนับ (Counters) & เรจิสเตอร์
              </div>
              <div className="space-y-1 text-xs text-[#334155] dark:text-[#cbd5e1]">
                <div>• <strong>Ripple Counter:</strong> Delay สะสม <MathView math="t_{total} = N \times t_{pd}" /></div>
                <div>• <strong>Synchronous:</strong> Clock พร้อมกัน ไม่มี Delay สะสม</div>
                <div>• <strong>Modulo-N:</strong> จำนวน FF สอดคล้อง <MathView math="2^n \ge N" /></div>
                <div>• <strong>Shift Registers:</strong> SISO, SIPO, PISO, PIPO</div>
              </div>
            </div>

            {/* Box 10: FSM & Water Pump Problem */}
            <div className="border border-[#e2e8f0] dark:border-[#1e293b] p-3 rounded-xl bg-[#f8fafc] dark:bg-[#0b0f19] print:bg-white print:border-slate-400">
              <div className="font-heading font-bold text-[#0066cc] dark:text-[#38bdf8] print:text-black border-b border-[#e2e8f0] dark:border-[#1e293b] pb-1 mb-1.5 flex justify-between">
                <span>10. FSM & ปั๊มน้ำ (สไลด์ อ.ปวีณ)</span>
                <span className="font-mono text-rose-500 text-xs font-bold">★เน้นมาก</span>
              </div>
              <div className="text-xs space-y-1 text-[#334155] dark:text-[#cbd5e1]">
                <div>• <strong>Moore:</strong> Output ขึ้นกับ State (เขียนในวงกลม)</div>
                <div>• <strong>Mealy:</strong> Output ขึ้นกับ State + Input (เขียนบนเส้นทาง)</div>
                <div className="bg-[#f1f5f9] dark:bg-[#1e293b] p-2 rounded-lg text-xs">
                  <strong className="text-[#0f172a] dark:text-[#f8fafc]">โจทย์ปั๊มน้ำ (a=ล่าง, b=บน, y=ปั๊ม):</strong><br/>
                  • State 0 (เปิด y=1): เมื่อ a=b=0 ปั๊มจน a=b=1 จึงเปลี่ยนไป 1<br/>
                  • State 1 (ปิด y=0): ปิดจนกว่าน้ำแห้ง a=b=0 จึงกลับมา 0<br/>
                  • ขนาด <MathView math="\text{ROM} = 2^{\text{State} + \text{Input}} \text{ แถว}" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-2 border-t border-[#e2e8f0] dark:border-[#1e293b] text-xs text-center text-[#94a3b8] print:text-slate-600">
          เอกสารสรุปเตรียมสอบปลายภาค CS121 Digital Logic and Smart Device | มหาวิทยาลัยแม่โจ้ | จัดทำเพื่อทบทวนบทเรียน
        </div>

      </div>

    </div>
  );
};
