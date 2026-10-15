import React from 'react';
import { Printer, Download, Sparkles, FileText, CheckCircle } from 'lucide-react';

export const CheatSheetView: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Top Banner & Print Action */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
              นำเข้าห้องสอบได้ 1 แผ่น A4 (ตามข้อกำหนด อ.ปวีณ)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 mt-1">
            สรุปสูตร Digital Logic Final (A4 Cheat Sheet)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            รวบรวมสูตร ตาราง Excitation กฎเดอมอร์แกน และการคำนวณทั้งหมดในหน้าเดียว จัด Layout พอดีกระดาษ A4
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>สั่งพิมพ์ / บันทึกเป็น PDF (Print A4)</span>
        </button>
      </div>

      {/* Printable Sheet (Stylized for both screen view & printer printout) */}
      <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Sheet Header */}
        <div className="border-b-2 border-slate-900 dark:border-slate-200 pb-3 mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black tracking-tight uppercase">
              CS121 Digital Logic & Smart Device | Final Cheat Sheet
            </h2>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 print:text-slate-700">
              คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้ | ดร. ปวีณ เขื่อนแก้ว
            </p>
          </div>
          <div className="text-right text-[10px] font-mono font-bold">
            <div>EXAM ROOM A4 SHEET</div>
            <div className="text-cyan-600 dark:text-cyan-400 print:text-black">Chapter 3 + 4 + 5</div>
          </div>
        </div>

        {/* 3-Column Dense Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-3.5 text-[11px] leading-tight">
          
          {/* ================= COLUMN 1 ================= */}
          <div className="space-y-3">
            
            {/* Box 1: Analog vs Digital */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5 flex justify-between">
                <span>1. สัญญาณ & ความละเอียด (Noise)</span>
                <span className="font-mono">Ch.3</span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mb-1">
                • แอนะล็อก: ต่อเนื่อง, ไวต่อ Noise<br/>
                • ดิจิทัล: 0/1 เท่านั้น, ทน Noise (Noise Margin)
              </p>
              <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded font-mono text-[10px] print:bg-slate-100">
                <strong>สูตรจำนวนรูปแบบสูงสุด:</strong><br/>
                N = ⌊ (Vmax - Vmin) / (2 × |Vnoise|) ⌋<br/>
                <span className="text-[9px] text-slate-500">เช่น 0-5V, Noise ±0.2V → 5/0.4 = 12 แบบ</span>
              </div>
            </div>

            {/* Box 2: Logic Gates & Equations */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5">
                2. ลอจิกเกตพื้นฐาน & ตัวดำเนินการ
              </div>
              <table className="w-full text-[10px] font-mono">
                <tbody>
                  <tr><td className="font-bold">NOT</td><td>Y = A'</td><td>กลับค่า 0↔1</td></tr>
                  <tr><td className="font-bold">AND</td><td>Y = A · B</td><td>1 เมื่อทุกตัวเป็น 1</td></tr>
                  <tr><td className="font-bold">OR</td><td>Y = A + B</td><td>1 เมื่อมี 1 อย่างน้อย 1 ตัว</td></tr>
                  <tr><td className="font-bold">NAND</td><td>Y = (AB)'</td><td>Universal Gate (AND+Bubble)</td></tr>
                  <tr><td className="font-bold">NOR</td><td>Y = (A+B)'</td><td>Universal Gate (OR+Bubble)</td></tr>
                  <tr><td className="font-bold">XOR</td><td>A ⊕ B</td><td>A'B + AB' (Odd Parity)</td></tr>
                  <tr><td className="font-bold">XNOR</td><td>(A ⊕ B)'</td><td>AB + A'B' (Equivalence)</td></tr>
                </tbody>
              </table>
            </div>

            {/* Box 3: Adders */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5">
                3. วงจรบวกเลข (Adders)
              </div>
              <div className="space-y-1 font-mono text-[10px]">
                <div><strong>Half Adder (HA):</strong></div>
                <div className="pl-2">• Sum (S) = A ⊕ B</div>
                <div className="pl-2">• Carry (C) = A · B</div>
                <div className="pt-1"><strong>Full Adder (FA):</strong></div>
                <div className="pl-2">• S = A ⊕ B ⊕ Cin</div>
                <div className="pl-2">• Cout = AB + Cin(A ⊕ B) = AB + BCin + ACin</div>
                <div className="text-[9px] text-slate-500 italic mt-0.5">
                  * FA 1 ตัว = HA 2 ตัว + OR Gate 1 ตัว
                </div>
              </div>
            </div>

            {/* Box 4: 555 Timer Formulas */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5 flex justify-between">
                <span>4. ไอซีไทเมอร์ 555 (Astable)</span>
                <span className="font-mono">Ch.5</span>
              </div>
              <div className="space-y-0.5 font-mono text-[10px]">
                <div>• TH (High) = 0.693 × (R1 + R2) × C</div>
                <div>• TL (Low) = 0.693 × R2 × C</div>
                <div>• คาบ T = TH + TL = 0.693(R1 + 2R2)C</div>
                <div>• ความถี่ f = 1/T = 1.44 / [(R1 + 2R2) × C]</div>
                <div>• Duty Cycle = (R1 + R2) / (R1 + 2R2) × 100%</div>
                <div className="text-[9px] text-amber-600 dark:text-amber-400 font-sans mt-0.5">
                  * Duty cycle วงจรมาตรฐาน 555 ต้อง &gt; 50% เสมอ!
                </div>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 2 ================= */}
          <div className="space-y-3">
            
            {/* Box 5: Boolean Algebra Laws */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5 flex justify-between">
                <span>5. กฎพีชคณิตบูลีนที่ต้องจำ</span>
                <span className="font-mono">Ch.4</span>
              </div>
              <table className="w-full text-[10px] font-mono">
                <tbody>
                  <tr><td>A + 0 = A</td><td>A · 1 = A</td></tr>
                  <tr><td>A + 1 = 1</td><td>A · 0 = 0</td></tr>
                  <tr><td>A + A = A</td><td>A · A = A</td></tr>
                  <tr><td>A + A' = 1</td><td>A · A' = 0</td></tr>
                  <tr><td colSpan={2}><strong>Absorption:</strong> A + AB = A, A(A+B) = A</td></tr>
                  <tr><td colSpan={2}><strong>Consensus:</strong> A + A'B = A + B</td></tr>
                  <tr><td colSpan={2}><strong>Distributive:</strong> A + BC = (A+B)(A+C)</td></tr>
                </tbody>
              </table>
              <div className="mt-1.5 pt-1 border-t border-slate-200 dark:border-slate-800 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                <strong>De Morgan's Laws:</strong><br/>
                1) (A + B)' = A' · B'<br/>
                2) (A · B)' = A' + B'
              </div>
            </div>

            {/* Box 6: K-Map Rules & Grouping */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5">
                6. Karnaugh Map & Don't Care (X)
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 mb-1">
                • Gray Code หัวตาราง: <strong>00, 01, 11, 10</strong> (สลับ 11 ก่อน 10)<br/>
                • ขนาดกลุ่ม: ต้องเป็นเลขยกกำลังสอง 1, 2, 4, 8, 16 เซลล์<br/>
                • กลุ่ม 2 เซลล์ ตัด 1 ตัวแปร | กลุ่ม 4 เซลล์ ตัด 2 ตัวแปร
              </p>
              
              <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded font-mono text-[9px]">
                <strong>พิกัด K-Map 4 ตัวแปร (AB \ CD):</strong><br/>
                00: 0, 1, 3, 2 | 01: 4, 5, 7, 6<br/>
                11: 12, 13, 15, 14 | 10: 8, 9, 11, 10<br/>
                <strong>มุมทั้ง 4 (0, 2, 8, 10) = B' · D'</strong>
              </div>
              <div className="text-[9px] text-slate-500 mt-1">
                • Don't Care (d หรือ X): เลือกเป็น 1 เพื่อขยายกลุ่ม หรือเป็น 0 ถ้าไม่ช่วย
              </div>
            </div>

            {/* Box 7: Universal Gates Conversion */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5">
                7. การแปลง Universal Gates
              </div>
              <div className="text-[10px] font-mono space-y-1">
                <div>• AND-OR (SOP) ↔ <strong>NAND-NAND 2 ระดับ</strong></div>
                <div>• OR-AND (POS) ↔ <strong>NOR-NOR 2 ระดับ</strong></div>
                <div>• Inverter จาก NAND: นำอินพุตทั้งสองมารวบเข้าด้วยกัน</div>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 3 ================= */}
          <div className="space-y-3">
            
            {/* Box 8: Flip-Flops & Excitation Tables */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5 flex justify-between">
                <span>8. ตารางกระตุ้นฟลิปฟลอป (EXCITATION)</span>
                <span className="font-mono text-rose-500">★ออกสอบ</span>
              </div>

              <table className="w-full text-center text-[10px] font-mono border border-slate-300 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-200 dark:bg-slate-800 font-bold">
                    <th className="p-1">Q → Qnext</th>
                    <th className="p-1">D</th>
                    <th className="p-1">T</th>
                    <th className="p-1">J</th>
                    <th className="p-1">K</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr><td>0 → 0</td><td>0</td><td>0</td><td className="font-bold text-cyan-600 dark:text-cyan-400">0</td><td className="font-bold text-amber-600 dark:text-amber-400">X</td></tr>
                  <tr><td>0 → 1</td><td>1</td><td>1</td><td className="font-bold text-cyan-600 dark:text-cyan-400">1</td><td className="font-bold text-amber-600 dark:text-amber-400">X</td></tr>
                  <tr><td>1 → 0</td><td>0</td><td>1</td><td className="font-bold text-amber-600 dark:text-amber-400">X</td><td className="font-bold text-cyan-600 dark:text-cyan-400">1</td></tr>
                  <tr><td>1 → 1</td><td>1</td><td>0</td><td className="font-bold text-amber-600 dark:text-amber-400">X</td><td className="font-bold text-cyan-600 dark:text-cyan-400">0</td></tr>
                </tbody>
              </table>

              <div className="mt-1 font-mono text-[9px] space-y-0.5">
                <div>• D-FF: Qnext = D</div>
                <div>• JK-FF: Qnext = J·Q' + K'·Q (J=K=1 คือ Toggle)</div>
                <div>• T-FF: Qnext = T ⊕ Q (T=1 คือ Toggle / หารสอง)</div>
                <div>• SR Latch: ห้าม S=1, R=1 ใน NOR Latch!</div>
              </div>
            </div>

            {/* Box 9: Counters & Registers */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5">
                9. วงจรนับ (Counters) & เรจิสเตอร์
              </div>
              <div className="space-y-1 text-[10px]">
                <div>• <strong>Ripple Counter:</strong> Clock ป้อนแค่ตัวแรก Delay สะสม = N × tpd</div>
                <div>• <strong>Synchronous Counter:</strong> ทุกตัวรับ Clock พร้อมกัน ไม่มี Delay สะสม</div>
                <div>• <strong>Modulo-N:</strong> จำนวน FF ต้องสอดคล้อง 2^n ≥ N</div>
                <div>• <strong>Shift Registers:</strong> SISO, SIPO, PISO, PIPO</div>
              </div>
            </div>

            {/* Box 10: FSM & Water Pump Problem */}
            <div className="border border-slate-300 dark:border-slate-800 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 print:bg-white print:border-slate-400">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 print:text-black border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5 flex justify-between">
                <span>10. FSM & ปั๊มน้ำ (สไลด์ อ.ปวีณ)</span>
                <span className="font-mono text-rose-500">★เน้นมาก</span>
              </div>
              <div className="text-[10px] space-y-1">
                <div>• <strong>Moore:</strong> Output ขึ้นกับ State เท่านั้น (เขียนในวงกลม)</div>
                <div>• <strong>Mealy:</strong> Output ขึ้นกับ State + Input (เขียนบนเส้นทาง)</div>
                <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded font-mono text-[9px]">
                  <strong>โจทย์ปั๊มน้ำ (a=ล่าง, b=บน, y=ปั๊ม):</strong><br/>
                  • State 0 (เปิดปั๊ม y=1): เมื่อ a=b=0 ปั๊มน้ำจนถึง a=b=1 จึงเปลี่ยนไป 1<br/>
                  • State 1 (ปิดปั๊ม y=0): ปิดจนกว่าน้ำจะลดลงแห้ง a=b=0 จึงกลับมา 0<br/>
                  • ขนาด ROM = 2^(จำนวน State bits + Input bits) แถว
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-2 border-t border-slate-300 dark:border-slate-800 text-[10px] text-center text-slate-500 print:text-slate-600">
          เอกสารสรุปเตรียมสอบปลายภาค CS121 Digital Logic and Smart Device | มหาวิทยาลัยแม่โจ้ | จัดทำเพื่อทบทวนบทเรียน
        </div>

      </div>

    </div>
  );
};
