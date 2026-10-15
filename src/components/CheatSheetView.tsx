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
      <div className="no-print bg-[#efe9de] dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#faf9f5] dark:bg-[#181715] text-[#cc785c] border border-[#e6dfd8] dark:border-[#252320]">
              นำเข้าห้องสอบได้ 1 แผ่น A4 (ตามข้อกำหนด อ.ปวีณ)
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#141413] dark:text-[#faf9f5] mt-1">
            สรุปสูตร Digital Logic Final (A4 Cheat Sheet)
          </h1>
          <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] mt-0.5">
            รวบรวมสูตร ตาราง Excitation กฎเดอมอร์แกน และการคำนวณทั้งหมดในหน้าเดียว จัด Layout พอดีกระดาษ A4
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white font-semibold text-xs shadow-md shadow-[#cc785c]/20 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>สั่งพิมพ์ / บันทึกเป็น PDF (Print A4)</span>
        </button>
      </div>

      {/* Printable Sheet (Stylized for both screen view & printer printout) */}
      <div className="bg-[#faf9f5] text-[#141413] dark:bg-[#1f1e1b] dark:text-[#faf9f5] p-6 md:p-8 rounded-2xl border border-[#e6dfd8] dark:border-[#252320] shadow-sm print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Sheet Header */}
        <div className="border-b-2 border-[#141413] dark:border-[#faf9f5] pb-3 mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-normal tracking-tight">
              CS121 Digital Logic & Smart Device | Final Cheat Sheet
            </h2>
            <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] print:text-slate-700">
              คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้ | ดร. ปวีณ เขื่อนแก้ว
            </p>
          </div>
          <div className="text-right text-xs font-mono font-bold">
            <div>EXAM ROOM A4 SHEET</div>
            <div className="text-[#cc785c] print:text-black">Chapter 3 + 4 + 5</div>
          </div>
        </div>

        {/* 3-Column Dense Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-3 text-xs leading-tight">
          
          {/* ================= COLUMN 1 ================= */}
          <div className="space-y-3">
            
            {/* Box 1: Analog vs Digital */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5 flex justify-between">
                <span>1. สัญญาณ & ความละเอียด (Noise)</span>
                <span className="font-mono text-xs">Ch.3</span>
              </div>
              <p className="text-xs text-[#6c6a64] dark:text-[#a09d96] mb-1">
                • แอนะล็อก: ต่อเนื่อง, ไวต่อ Noise<br/>
                • ดิจิทัล: 0/1 เท่านั้น, ทน Noise (Noise Margin)
              </p>
              <div className="bg-[#efe9de] dark:bg-[#252320] p-1.5 rounded text-xs print:bg-slate-100">
                <div className="font-bold mb-0.5">สูตรจำนวนรูปแบบสูงสุด:</div>
                <MathView math="N = \lfloor \frac{V_{max} - V_{min}}{2 \times |V_{noise}|} \rfloor" displayMode={true} />
                <span className="text-xs text-[#6c6a64] dark:text-[#8e8b82] block text-center">เช่น 0-5V, Noise ±0.2V → 5/0.4 = 12 แบบ</span>
              </div>
            </div>

            {/* Box 2: Logic Gates & Equations */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5">
                2. ลอจิกเกตพื้นฐาน & ตัวดำเนินการ
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-[#e6dfd8] dark:divide-[#252320]">
                  <tr><td className="font-bold py-0.5">NOT</td><td><MathView math="Y = \bar{A}" /></td><td className="text-xs">กลับค่า 0↔1</td></tr>
                  <tr><td className="font-bold py-0.5">AND</td><td><MathView math="Y = A \cdot B" /></td><td className="text-xs">1 เมื่อทุกตัวเป็น 1</td></tr>
                  <tr><td className="font-bold py-0.5">OR</td><td><MathView math="Y = A + B" /></td><td className="text-xs">1 เมื่อมี 1 ตัวขึ้นไป</td></tr>
                  <tr><td className="font-bold py-0.5">NAND</td><td><MathView math="Y = \overline{A \cdot B}" /></td><td className="text-xs">Universal Gate</td></tr>
                  <tr><td className="font-bold py-0.5">NOR</td><td><MathView math="Y = \overline{A + B}" /></td><td className="text-xs">Universal Gate</td></tr>
                  <tr><td className="font-bold py-0.5">XOR</td><td><MathView math="A \oplus B = \bar{A}B + A\bar{B}" /></td><td className="text-xs">Odd Parity</td></tr>
                  <tr><td className="font-bold py-0.5">XNOR</td><td><MathView math="\overline{A \oplus B} = AB + \bar{A}\bar{B}" /></td><td className="text-xs">Equivalence</td></tr>
                </tbody>
              </table>
            </div>

            {/* Box 3: Adders */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5">
                3. วงจรบวกเลข (Adders)
              </div>
              <div className="space-y-1 text-xs">
                <div><strong>Half Adder (HA):</strong></div>
                <div className="pl-1">• Sum: <MathView math="S = A \oplus B" /></div>
                <div className="pl-1">• Carry: <MathView math="C = A \cdot B" /></div>
                <div className="pt-1"><strong>Full Adder (FA):</strong></div>
                <div className="pl-1">• Sum: <MathView math="S = A \oplus B \oplus C_{in}" /></div>
                <div className="pl-1">• Carry Out: <MathView math="C_{out} = AB + C_{in}(A \oplus B)" /></div>
                <div className="text-xs text-[#8e8b82] italic mt-0.5">
                  * FA 1 ตัว = HA 2 ตัว + OR Gate 1 ตัว
                </div>
              </div>
            </div>

            {/* Box 4: 555 Timer Formulas */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5 flex justify-between">
                <span>4. ไอซีไทเมอร์ 555 (Astable)</span>
                <span className="font-mono text-xs">Ch.5</span>
              </div>
              <div className="space-y-1 text-xs">
                <div>• <MathView math="T_H = 0.693(R_1 + R_2)C" /></div>
                <div>• <MathView math="T_L = 0.693 R_2 C" /></div>
                <div>• <MathView math="T = T_H + T_L = 0.693(R_1 + 2R_2)C" /></div>
                <div>• <MathView math="f = \frac{1.44}{(R_1 + 2R_2)C}" /></div>
                <div>• <MathView math="\text{Duty Cycle} = \frac{R_1 + R_2}{R_1 + 2R_2} \times 100\%" /></div>
                <div className="text-xs text-[#cc785c] mt-0.5">
                  * Duty cycle ของ 555 ต้อง &gt; 50% เสมอ!
                </div>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 2 ================= */}
          <div className="space-y-3">
            
            {/* Box 5: Boolean Algebra Laws */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5 flex justify-between">
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
              <div className="mt-1.5 pt-1.5 border-t border-[#e6dfd8] dark:border-[#252320] text-xs text-[#cc785c]">
                <strong>De Morgan's Laws:</strong><br/>
                1) <MathView math="\overline{A + B} = \bar{A} \cdot \bar{B}" /><br/>
                2) <MathView math="\overline{A \cdot B} = \bar{A} + \bar{B}" />
              </div>
            </div>

            {/* Box 6: K-Map Rules & Grouping */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5">
                6. Karnaugh Map & Don't Care (X)
              </div>
              <p className="text-xs text-[#6c6a64] dark:text-[#a09d96] mb-1">
                • Gray Code หัวตาราง: <strong>00, 01, 11, 10</strong> (11 ก่อน 10)<br/>
                • ขนาดกลุ่ม: เลขยกกำลังสอง 1, 2, 4, 8, 16 เซลล์<br/>
                • กลุ่ม 2 ตัด 1 ตัวแปร | กลุ่ม 4 ตัด 2 ตัวแปร
              </p>
              
              <div className="bg-[#efe9de] dark:bg-[#252320] p-1.5 rounded font-mono text-xs">
                <strong>พิกัด K-Map 4 ตัวแปร (AB \ CD):</strong><br/>
                00: 0, 1, 3, 2 | 01: 4, 5, 7, 6<br/>
                11: 12, 13, 15, 14 | 10: 8, 9, 11, 10<br/>
                <span className="text-[#cc785c] font-bold">มุมทั้ง 4 (0, 2, 8, 10) = B' · D'</span>
              </div>
              <div className="text-xs text-[#8e8b82] mt-1">
                • Don't Care (X): เลือกเป็น 1 เพื่อขยายกลุ่ม หรือปล่อยเป็น 0 ถ้าไม่ช่วย
              </div>
            </div>

            {/* Box 7: Universal Gates */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5">
                7. การแปลง Universal Gates
              </div>
              <div className="text-xs space-y-1">
                <div>• AND-OR (SOP) ↔ <strong>NAND-NAND 2 ระดับ</strong></div>
                <div>• OR-AND (POS) ↔ <strong>NOR-NOR 2 ระดับ</strong></div>
                <div>• Inverter: รวบขั้วอินพุตของ NAND เข้าด้วยกัน</div>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 3 ================= */}
          <div className="space-y-3">
            
            {/* Box 8: Flip-Flops & Excitation Tables */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5 flex justify-between">
                <span>8. ตารางกระตุ้นฟลิปฟลอป (EXCITATION)</span>
                <span className="font-mono text-rose-500 text-xs">★ออกสอบ</span>
              </div>

              <table className="w-full text-center text-xs border border-[#e6dfd8] dark:border-[#252320]">
                <thead>
                  <tr className="bg-[#efe9de] dark:bg-[#252320] font-bold">
                    <th className="p-1"><MathView math="Q \to Q_{next}" /></th>
                    <th className="p-1">D</th>
                    <th className="p-1">T</th>
                    <th className="p-1">J</th>
                    <th className="p-1">K</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6dfd8] dark:divide-[#252320] font-mono">
                  <tr><td>0 → 0</td><td>0</td><td>0</td><td className="font-bold text-[#cc785c]">0</td><td className="font-bold text-[#e8a55a]">X</td></tr>
                  <tr><td>0 → 1</td><td>1</td><td>1</td><td className="font-bold text-[#cc785c]">1</td><td className="font-bold text-[#e8a55a]">X</td></tr>
                  <tr><td>1 → 0</td><td>0</td><td>1</td><td className="font-bold text-[#e8a55a]">X</td><td className="font-bold text-[#cc785c]">1</td></tr>
                  <tr><td>1 → 1</td><td>1</td><td>0</td><td className="font-bold text-[#e8a55a]">X</td><td className="font-bold text-[#cc785c]">0</td></tr>
                </tbody>
              </table>

              <div className="mt-1.5 text-xs space-y-0.5">
                <div>• D-FF: <MathView math="Q_{next} = D" /></div>
                <div>• JK-FF: <MathView math="Q_{next} = J\bar{Q} + \bar{K}Q" /> (J=K=1 คือ Toggle)</div>
                <div>• T-FF: <MathView math="Q_{next} = T \oplus Q" /> (T=1 คือ Toggle/หารสอง)</div>
                <div>• SR Latch: ห้าม S=1, R=1 ใน NOR Latch!</div>
              </div>
            </div>

            {/* Box 9: Counters & Registers */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5">
                9. วงจรนับ (Counters) & เรจิสเตอร์
              </div>
              <div className="space-y-1 text-xs">
                <div>• <strong>Ripple Counter:</strong> Delay สะสม <MathView math="t_{total} = N \times t_{pd}" /></div>
                <div>• <strong>Synchronous:</strong> Clock พร้อมกัน ไม่มี Delay สะสม</div>
                <div>• <strong>Modulo-N:</strong> จำนวน FF สอดคล้อง <MathView math="2^n \ge N" /></div>
                <div>• <strong>Shift Registers:</strong> SISO, SIPO, PISO, PIPO</div>
              </div>
            </div>

            {/* Box 10: FSM & Water Pump Problem */}
            <div className="border border-[#e6dfd8] dark:border-[#252320] p-2.5 rounded-lg bg-[#f5f0e8] dark:bg-[#181715] print:bg-white print:border-slate-400">
              <div className="font-bold text-[#cc785c] print:text-black border-b border-[#e6dfd8] dark:border-[#252320] pb-1 mb-1.5 flex justify-between">
                <span>10. FSM & ปั๊มน้ำ (สไลด์ อ.ปวีณ)</span>
                <span className="font-mono text-rose-500 text-xs">★เน้นมาก</span>
              </div>
              <div className="text-xs space-y-1">
                <div>• <strong>Moore:</strong> Output ขึ้นกับ State (เขียนในวงกลม)</div>
                <div>• <strong>Mealy:</strong> Output ขึ้นกับ State + Input (เขียนบนเส้นทาง)</div>
                <div className="bg-[#efe9de] dark:bg-[#252320] p-1.5 rounded text-xs">
                  <strong>โจทย์ปั๊มน้ำ (a=ล่าง, b=บน, y=ปั๊ม):</strong><br/>
                  • State 0 (เปิด y=1): เมื่อ a=b=0 ปั๊มจน a=b=1 จึงเปลี่ยนไป 1<br/>
                  • State 1 (ปิด y=0): ปิดจนกว่าน้ำแห้ง a=b=0 จึงกลับมา 0<br/>
                  • ขนาด <MathView math="\text{ROM} = 2^{\text{State} + \text{Input}} \text{ แถว}" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-2 border-t border-[#e6dfd8] dark:border-[#252320] text-xs text-center text-[#8e8b82] print:text-slate-600">
          เอกสารสรุปเตรียมสอบปลายภาค CS121 Digital Logic and Smart Device | มหาวิทยาลัยแม่โจ้ | จัดทำเพื่อทบทวนบทเรียน
        </div>

      </div>

    </div>
  );
};
