export interface FormulaItem {
  id: string;
  chapter: 'ch3' | 'ch4' | 'ch5';
  chapterName: string;
  title: string;
  subtitle: string;
  isHighYield?: boolean; // ออกสอบบ่อย
  slideRef: string;
  formulaLatex: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  howToUse: string[];
  workedExample: {
    problem: string;
    steps: string[];
    answer: string;
  };
  examTip: string;
}

export const FORMULA_ITEMS: FormulaItem[] = [
  // =========================================================================
  // CHAPTER 3: DIGITAL CIRCUITS & HARDWARE
  // =========================================================================
  {
    id: 'f-analog-digital',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'จำนวนรูปแบบสัญญาณสูงสุดเมื่อมีสัญญาณรบกวน (Noise Capacity)',
    subtitle: 'คำนวณจำนวนสถานะที่สัญญาณแอนะล็อกสามารถแยกแยะได้ก่อนถูกสัญญาณรบกวนกลืน',
    slideRef: '03_digitalCircuit.pdf (หน้า 5-8)',
    formulaLatex: 'N = \\left\\lfloor \\frac{V_{max} - V_{min}}{2 \\times |V_{noise}|} \\right\\rfloor',
    variables: [
      { symbol: 'N', meaning: 'จำนวนสถานะข้อมูลสูงสุดที่ระบบแยกแยะได้ (ต้องปัดเศษทิ้งเป็นจำนวนเต็ม)' },
      { symbol: 'V_{max} - V_{min}', meaning: 'ช่วงแรงดันใช้งานทั้งหมด (Voltage Dynamic Range)', unit: 'Volt' },
      { symbol: 'V_{noise}', meaning: 'ขนาดแอมพลิจูดสูงสุดของสัญญาณรบกวน (Peak Noise Amplitude)', unit: 'Volt' },
    ],
    howToUse: [
      '1. หาช่วงแรงดันใช้งานทั้งหมด: นำ V_max ลบด้วย V_min (เช่น 5V - 0V = 5.0V)',
      '2. คำนวณระยะห่างขั้นต่ำที่ปลอดภัย: ต้องเผื่อระยะห่างอย่างน้อย 2 เท่าของสัญญาณรบกวน (2 * |V_noise|) เพื่อไม่ให้ยอดคลื่นรบกวนซ้อนทับกัน',
      '3. นำช่วงแรงดันหารด้วยระยะห่าง แล้วใช้ฟังก์ชัน Floor (ปัดเศษทิ้งเสมอ ห้ามปัดขึ้นเด็ดขาด)'
    ],
    workedExample: {
      problem: 'ระบบส่งสัญญาณแอนะล็อกมีแรงดันใช้งานช่วง 0V ถึง 5V และมีสัญญาณรบกวนสูงสุด ±0.2V สัญญาณนี้สามารถแทนข้อมูลที่แยกแยะได้อย่างถูกต้องไม่เกินกี่รูปแบบ?',
      steps: [
        'ขั้นตอนที่ 1) คำนวณช่วงแรงดันทั้งหมด: ΔV = V_max - V_min = 5.0V - 0.0V = 5.0 V',
        'ขั้นตอนที่ 2) คำนวณระยะปลอดภัยต่อหนึ่งระดับ: 2 * |V_noise| = 2 * 0.2V = 0.4 V',
        'ขั้นตอนที่ 3) หารและปัดเศษทิ้ง: N = floor(5.0 / 0.4) = floor(12.5) = 12 รูปแบบ'
      ],
      answer: 'แทนข้อมูลได้สูงสุด 12 รูปแบบ (เศษ 0.5 ตัดทิ้งเพราะระยะห่างไม่พอทน Noise)'
    },
    examTip: 'ข้อสอบมักหลอกตัวเลขทศนิยม เช่น 12.5 หรือ 12.9 นักศึกษาชอบปัดขึ้นเป็น 13 ซึ่งผิดทันที! ต้องปัดเศษทิ้งเป็น 12 เท่านั้น'
  },
  {
    id: 'f-noise-margin',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'ระยะเผื่อสัญญาณรบกวน (Noise Margin: NMH & NML)',
    subtitle: 'ระดับแรงดันมาตรฐาน TTL 5V และขอบเขตความทนทานต่อสัญญาณรบกวนทั้งช่วง High และ Low',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 14-22)',
    formulaLatex: 'NM_H = V_{OH} - V_{IH} \\quad , \\quad NM_L = V_{IL} - V_{OL}',
    variables: [
      { symbol: 'NM_H', meaning: 'High-level Noise Margin (ระยะเผื่อสัญญาณรบกวนระดับสูง)', unit: 'Volt' },
      { symbol: 'NM_L', meaning: 'Low-level Noise Margin (ระยะเผื่อสัญญาณรบกวนระดับต่ำ)', unit: 'Volt' },
      { symbol: 'V_{OH}', meaning: 'แรงดันเอาต์พุตต่ำสุดที่เกตส่งออกมารับรองว่าเป็น HIGH (TTL = 2.4V)', unit: 'Volt' },
      { symbol: 'V_{IH}', meaning: 'แรงดันอินพุตต่ำสุดที่เกตรับเข้ามองว่าเป็น HIGH (TTL = 2.0V)', unit: 'Volt' },
      { symbol: 'V_{IL}', meaning: 'แรงดันอินพุตสูงสุดที่เกตรับเข้ามองว่าเป็น LOW (TTL = 0.8V)', unit: 'Volt' },
      { symbol: 'V_{OL}', meaning: 'แรงดันเอาต์พุตสูงสุดที่เกตส่งออกมารับรองว่าเป็น LOW (TTL = 0.4V)', unit: 'Volt' },
    ],
    howToUse: [
      '1. คิดฝั่ง HIGH (1): นำแรงดันส่งออกขั้นต่ำ (V_OH) ลบด้วยแรงดันรับเข้าขั้นต่ำ (V_IH)',
      '2. คิดฝั่ง LOW (0): นำแรงดันรับเข้าสูงสุดที่ยอมรับเป็น LOW (V_IL) ลบด้วยแรงดันส่งออกจริง (V_OL)',
      '3. ขอบเขตต้องห้าม (Forbidden Zone): คือช่วงระหว่าง V_IL ถึง V_IH (0.8V ถึง 2.0V) สัญญาณห้ามตกค้างในย่านนี้'
    ],
    workedExample: {
      problem: 'เกตลอจิกมาตรฐาน TTL 74HC มีสเปกแรงดัน V_OH = 2.4V, V_IH = 2.0V, V_IL = 0.8V, V_OL = 0.4V จงหาค่า NM_H และ NM_L',
      steps: [
        'ขั้นตอนที่ 1) คำนวณ NM_H = V_OH - V_IH = 2.4V - 2.0V = 0.4 V',
        'ขั้นตอนที่ 2) คำนวณ NM_L = V_IL - V_OL = 0.8V - 0.4V = 0.4 V',
        'ขั้นตอนที่ 3) สรุปความทนทาน: เกตนี้ทนสัญญาณรบกวนได้สูงสุด 0.4V ทั้งฝั่ง High และ Low'
      ],
      answer: 'NM_H = 0.4V, NM_L = 0.4V (ย่านห้ามคือ 0.8V ถึง 2.0V)'
    },
    examTip: 'เทคนิคจำคู่ลบ: High เอา OH ลบ IH (O มาก่อน I), Low เอา IL ลบ OL (I มาก่อน O) ผลลัพธ์ต้องเป็นค่าบวกเสมอ (+0.4V)'
  },
  {
    id: 'f-adc-quantization-step',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'สูตรการแบ่งนับสัญญาณแอนะล็อกเป็นดิจิทัล (Quantization Formula - ดร. ปวีณ สไลด์หน้า 17)',
    subtitle: 'การคำนวณค่าตัวเลขสัญญาณไฟฟ้า (v) จากแรงดันรับเข้า (vi) แรงดันอ้างอิงสูงสุด (vref) และจำนวนบิต',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 17-23 / ดร. ปวีณ)',
    formulaLatex: 'v = \\left\\lfloor \\frac{v_i}{v_{ref}} \\times (2^{bits} - 1) \\right\\rfloor',
    variables: [
      { symbol: 'v', meaning: 'ค่าตัวเลขของสัญญาณไฟฟ้าที่ได้จากการแบ่งนับ (Quantized Integer Value)' },
      { symbol: 'v_i', meaning: 'แรงดันที่รับเข้ามา (Input Voltage)', unit: 'Volt' },
      { symbol: 'v_{ref}', meaning: 'แรงดันอ้างอิงสูงสุด (Maximum Reference Voltage)', unit: 'Volt' },
      { symbol: 'bits', meaning: 'ความละเอียดของการแปลง หรือจำนวนบิตในการเข้ารหัส (Bit Depth)' },
    ],
    howToUse: [
      '1. คำนวณตัวคูณเต็มสเกล: (2^bits - 1) เช่น 4 บิต = 2^4 - 1 = 15, 5 บิต = 31, 8 บิต = 255',
      '2. คำนวณสัดส่วนแรงดันรับเข้าต่อแรงดันอ้างอิง: (v_i / v_ref)',
      '3. นำสัดส่วนแรงดันคูณกับ (2^bits - 1) แล้วใช้ฟังก์ชัน Floor (ปัดเศษทิ้งเป็นจำนวนเต็มเสมอ ห้ามปัดขึ้น)',
      '4. นำค่าตัวเลข v ที่ได้ไปแปลงเป็นรหัสเลขฐานสอง bits บิต (Binary Code)'
    ],
    workedExample: {
      problem: 'กำหนดให้แรงดันรับเข้า v_i = 1.5285596V, แรงดันอ้างอิงสูงสุด v_ref = 2.0V และความละเอียด bits = 4 บิต จงหาค่าตัวเลข v และรหัสเลขฐานสอง 4 บิต (ตรงตามสไลด์หน้า 17-18 ดร. ปวีณ)',
      steps: [
        'ขั้นตอนที่ 1) คำนวณสเกลตัวคูณ: (2^bits - 1) = 2^4 - 1 = 16 - 1 = 15',
        'ขั้นตอนที่ 2) คำนวณสัดส่วนแรงดัน: v_i / v_ref = 1.5285596V / 2.0V = 0.7642798',
        'ขั้นตอนที่ 3) คูณสเกลและปัดเศษทิ้ง: v = floor(0.7642798 * 15) = floor(11.464197) = 11',
        'ขั้นตอนที่ 4) แปลงเลข 11 ฐานสิบเป็นรหัสเลขฐานสอง 4 บิต: 11_10 = 1011_2'
      ],
      answer: 'ค่าตัวเลขสัญญาณ v = 11, เข้ารหัสเลขฐานสองได้ 1011_2 (ตรงสไลด์หน้า 18 และ 23)'
    },
    examTip: 'ระวังหลุมพรางสูตร อ.ปวีณ! สูตรในสไลด์หน้า 17 ใช้คูณด้วย (2^bits - 1) ไม่ใช่ 2^bits ตัวคูณของ 4 บิตคือ 15 ไม่ใช่ 16 ทำให้ v = floor(11.46) = 11 (1011_2) อย่าลืมลบ 1 เด็ดขาด!'
  },
  {
    id: 'f-fanout',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'ความสามารถในการจ่ายโหลดของเกตตรรกะ (Fan-Out Calculation)',
    subtitle: 'การคำนวณจำนวนเกตสูงสุดที่สามารถต่อพ่วงที่เอาต์พุตได้โดยแรงดันไม่ตก',
    slideRef: '03_digitalCircuit.pdf (หน้า 25-30)',
    formulaLatex: 'Fan\\text{-}out_H = \\left\\lfloor \\frac{I_{OH}}{I_{IH}} \\right\\rfloor \\quad , \\quad Fan\\text{-}out_L = \\left\\lfloor \\frac{I_{OL}}{I_{IL}} \\right\\rfloor \\quad , \\quad Fan\\text{-}out = \\min(Fan\\text{-}out_H, Fan\\text{-}out_L)',
    variables: [
      { symbol: 'I_{OH}', meaning: 'กระแสเอาต์พุตสูงสุดที่เกตจ่ายออกมาระดับ HIGH (Source Current)', unit: 'mA' },
      { symbol: 'I_{IH}', meaning: 'กระแสอินพุตที่เกตรับเข้าระดับ HIGH ต้องการ', unit: 'μA' },
      { symbol: 'I_{OL}', meaning: 'กระแสเอาต์พุตสูงสุดที่เกตดูดจมลงดินระดับ LOW (Sink Current)', unit: 'mA' },
      { symbol: 'I_{IL}', meaning: 'กระแสอินพุตที่เกตรับเข้าระดับ LOW ไหลออก', unit: 'mA' },
    ],
    howToUse: [
      '1. คำนวณ Fan-out ฝั่ง High: I_OH / I_IH (ระวังแปลงหน่วย mA กับ μA ให้ตรงกัน)',
      '2. คำนวณ Fan-out ฝั่ง Low: I_OL / I_IL',
      '3. ค่า Fan-out สูงสุดที่ปลอดภัย: ให้เลือกค่าที่ "น้อยกว่า" ระหว่าง High กับ Low เสมอ (Bottleneck)'
    ],
    workedExample: {
      problem: 'เกต TTL ตัวหนึ่งมีสเปกกระแส: I_OH = 0.4 mA, I_IH = 20 μA, I_OL = 8 mA, I_IL = 0.4 mA จงหาค่า Fan-out ของเกตนี้',
      steps: [
        'ขั้นตอนที่ 1) คิดฝั่ง High: I_OH = 0.4 mA = 400 μA -> Fan-out_H = 400 / 20 = 20 เกต',
        'ขั้นตอนที่ 2) คิดฝั่ง Low: I_OL = 8 mA, I_IL = 0.4 mA -> Fan-out_L = 8 / 0.4 = 20 เกต',
        'ขั้นตอนที่ 3) หาค่าต่ำสุด: min(20, 20) = 20 เกต'
      ],
      answer: 'Fan-out = 20 (สามารถขับโหลดเกตชนิดเดียวกันได้สูงสุด 20 ตัว)'
    },
    examTip: 'ระวังหลงหน่วย: 1 mA = 1,000 μA เสมอ! และหากค่า High กับ Low ไม่เท่ากัน ต้องตอบตัวที่ "น้อยกว่า" เสมอ'
  },
  {
    id: 'f-propagation-delay-freq',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'เวลาหน่วงการแพร่กระจายและความถี่ทำงานสูงสุด (Propagation Delay & fmax)',
    subtitle: 'เวลาที่สัญญาณเดินทางผ่านเกต (tPLH, tPHL) และการหาความถี่สัญญาณนาฬิกาสูงสุด',
    slideRef: '03_digitalCircuit.pdf (หน้า 30-34)',
    formulaLatex: 't_{pd} = \\frac{t_{PLH} + t_{PHL}}{2} \\quad , \\quad f_{max} = \\frac{1}{t_{pd, critical}}',
    variables: [
      { symbol: 't_{pd}', meaning: 'เวลาหน่วงการแพร่กระจายเฉลี่ยของเกต (Average Propagation Delay)', unit: 'ns' },
      { symbol: 't_{PLH}', meaning: 'เวลาหน่วงเมื่อเอาต์พุตเปลี่ยนจาก Low ไป High', unit: 'ns' },
      { symbol: 't_{PHL}', meaning: 'เวลาหน่วงเมื่อเอาต์พุตเปลี่ยนจาก High ไป Low', unit: 'ns' },
      { symbol: 'f_{max}', meaning: 'ความถี่สูงสุดที่สัญญาณเดินทางผ่านวงจรได้ทัน', unit: 'Hz' }
    ],
    howToUse: [
      '1. คำนวณ t_pd เฉลี่ยของเกตเดี่ยว: นำ (t_PLH + t_PHL) / 2',
      '2. คำนวณเวลาหน่วงของเส้นทางวิกฤต (Critical Path): นำเวลาหน่วงของเกตที่ต่ออนุกรมกันบวกเข้าด้วยกัน',
      '3. หาความถี่สูงสุด: f_max = 1 / t_critical (ระวังแปลง ns = 10^-9 วินาที)'
    ],
    workedExample: {
      problem: 'เกต NOT มี t_PLH = 12 ns และ t_PHL = 8 ns ต่ออนุกรมกัน 4 ตัว จงหาเวลาหน่วงเฉลี่ยของ 1 ตัว และความถี่สูงสุดของสายสัญญาณ 4 ตัวนี้',
      steps: [
        'ขั้นตอนที่ 1) t_pd เฉลี่ยของ 1 ตัว = (12 + 8) / 2 = 10 ns',
        'ขั้นตอนที่ 2) เวลาหน่วงรวม 4 ตัว: t_total = 4 * 10 ns = 40 ns',
        'ขั้นตอนที่ 3) f_max = 1 / (40 * 10^-9 s) = 25,000,000 Hz = 25 MHz'
      ],
      answer: 't_pd เฉลี่ย = 10 ns, t_total = 40 ns, f_max = 25 MHz'
    },
    examTip: 'เกต CMOS มีเวลาหน่วงขึ้นกับค่าความจุโหลด (C_load) หากต่อเกตขนานกันมาก C_load เพิ่ม t_pd จะช้าลง'
  },
  {
    id: 'f-universal-gate-count',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'จำนวน Universal Gates (NAND/NOR) ในการสร้างเกตพื้นฐาน',
    subtitle: 'จำนวนขั้นต่ำของเกต NAND 2-input หรือ NOR 2-input เพื่อสร้าง NOT, AND, OR, XOR, XNOR',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 60-72)',
    formulaLatex: '\\text{NAND Count: } \\text{NOT}=1, \\text{AND}=2, \\text{OR}=3, \\text{XOR}=4, \\text{XNOR}=5',
    variables: [
      { symbol: '\\text{NAND Gate}', meaning: 'Universal Gate ชนิดต่อ Active-Low Output' },
      { symbol: '\\text{NOR Gate}', meaning: 'Universal Gate อีกชนิด: NOT=1, OR=2, AND=3, XNOR=4, XOR=5' }
    ],
    howToUse: [
      '1. การต่อ NOT: ช็อตขารวมอินพุต A เข้าด้วยกัน (A NAND A = NOT A)',
      '2. การต่อ AND: ใช้ NAND 1 ตัว ตามด้วย NOT (NAND) อีก 1 ตัว = 2 ตัว',
      '3. การต่อ OR: ใช้ De Morgan (A+B = NOT(NOT A . NOT B)) ใช้ NOT 2 ตัว + NAND 1 ตัว = 3 ตัว',
      '4. การต่อ XOR: ใช้ NAND 4 ตัวตามโครงสร้างสมการประหยัด (A XOR B = A.(A.B)\' + B.(A.B)\')'
    ],
    workedExample: {
      problem: 'หากต้องการสร้างวงจร XOR Gate 2 อินพุต โดยใช้เพียง NAND Gate 2-input เท่านั้น จะต้องใช้ NAND ทั้งหมดกี่ตัว และวาดการต่ออย่างไร?',
      steps: [
        'ขั้นตอนที่ 1) นำ A และ B เข้า NAND ตัวที่ 1 ได้เอาต์พุต X = (AB)\'',
        'ขั้นตอนที่ 2) นำ A และ X เข้า NAND ตัวที่ 2 ได้เอาต์พุต Y = (A . (AB)\')\'',
        'ขั้นตอนที่ 3) นำ B และ X เข้า NAND ตัวที่ 3 ได้เอาต์พุต Z = (B . (AB)\')\'',
        'ขั้นตอนที่ 4) นำ Y และ Z เข้า NAND ตัวที่ 4 ได้เอาต์พุตสุดท้าย = A XOR B'
      ],
      answer: 'ใช้ NAND Gate ทั้งหมด 4 ตัว (หากเป็น NOR Gate จะต้องใช้ 5 ตัวสำหรับ XOR)'
    },
    examTip: 'สูตรลัดจำในห้องสอบ: NAND สร้าง XOR ใช้ 4 ตัว, NOR สร้าง XOR ใช้ 5 ตัว / แต่ถ้าสร้าง XNOR: NOR ใช้ 4 ตัว, NAND ใช้ 5 ตัว (สลับคู่กัน)'
  },
  {
    id: 'f-adders',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'สมการวงจรบวก Half Adder & Full Adder',
    subtitle: 'การรวมบิตผลบวก Sum และตัวทดรับเข้า/ส่งออก Carry Out',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 35-48)',
    formulaLatex: 'S = A \\oplus B \\oplus C_{in} \\quad , \\quad C_{out} = AB + C_{in}(A \\oplus B) = AB + BC_{in} + AC_{in}',
    variables: [
      { symbol: 'S', meaning: 'Sum (บิตผลบวก) = ฟังก์ชัน XOR (Odd Parity)' },
      { symbol: 'C_{out}', meaning: 'Carry Out (ตัวทดส่งออกไปยังหลักถัดไป)' },
      { symbol: 'C_{in}', meaning: 'Carry In (ตัวทดรับเข้าจากหลักก่อนหน้า)' },
      { symbol: 'A, B', meaning: 'บิตตัวตั้ง และบิตตัวบวก' },
    ],
    howToUse: [
      '1. Half Adder (บวก 2 บิต): S = A XOR B และ Carry = A AND B (ไม่มี Cin)',
      '2. Full Adder (บวก 3 บิต): S = A XOR B XOR Cin (เป็น 1 เมื่อมีเลข 1 เป็นจำนวนคี่ เช่น 1 ตัว หรือ 3 ตัว)',
      '3. Full Adder Carry Out: จะเป็น 1 เมื่อมีอินพุตเป็น 1 ตั้งแต่ 2 ตัวขึ้นไป (Majority Function)',
      '4. ความสัมพันธ์ฮาร์ดแวร์: Full Adder 1 ตัว สร้างจาก Half Adder 2 ตัว + OR Gate 1 ตัว'
    ],
    workedExample: {
      problem: 'ถ้าป้อนอินพุต A = 1, B = 0, C_in = 1 เข้าสู่วงจร Full Adder จงหาค่า Sum และ C_out',
      steps: [
        'Sum = 1 XOR 0 XOR 1 = 1 XOR 1 = 0',
        'C_out = (1)(0) + (1)(1 XOR 0) = 0 + 1(1) = 1',
        'ผลบวกคือ 1 + 0 + 1 = 2 ฐานสิบ หรือ 10 ฐานสอง (Sum=0, Cout=1)'
      ],
      answer: 'Sum = 0, C_out = 1'
    },
    examTip: 'ข้อสอบถามว่า Full Adder 1 ตัวประกอบด้วยอุปกรณ์ใดบ้าง? ตอบทันที: Half Adder 2 ตัว + OR Gate 1 ตัว!'
  },
  {
    id: 'f-full-subtractor',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'สมการวงจรลบ Half Subtractor & Full Subtractor',
    subtitle: 'การลบเลขฐานสอง บิตยืม Borrow-in / Borrow-out และผลต่าง Difference',
    slideRef: '03_digitalCircuit.pdf (หน้า 45-50)',
    formulaLatex: 'Diff = A \\oplus B \\oplus B_{in} \\quad , \\quad B_{out} = \\bar{A}B + \\bar{A}B_{in} + BB_{in} = \\bar{A}B + B_{in}(\\overline{A \\oplus B})',
    variables: [
      { symbol: 'Diff', meaning: 'Difference (บิตผลต่าง) = A XOR B XOR Bin' },
      { symbol: 'B_{out}', meaning: 'Borrow Out (บิตขอยืมจากหลักถัดไป)' },
      { symbol: 'B_{in}', meaning: 'Borrow In (บิตยืมรับเข้าจากหลักก่อนหน้า)' },
      { symbol: 'A, B', meaning: 'A คือตัวตั้ง (Minuend), B คือตัวลบ (Subtrahend)' }
    ],
    howToUse: [
      '1. Half Subtractor (ลบ 2 บิต): Diff = A XOR B, Borrow = A\' B (ขอยืมเมื่อ A=0 และ B=1)',
      '2. Full Subtractor (ลบ 3 บิต): Diff = A XOR B XOR Bin (เหมือนกับ Sum ของ Adder)',
      '3. Full Subtractor Borrow: Bout = A\'B + Bin(A XOR B)\' (จะขอยืมเมื่อตัวตั้งเล็กกว่าตัวลบ)',
      '4. ในซีพียูจริง นิยมใช้วงจรบวก Adder บวกกับ 2\'s complement ของ B แทนการสร้างวงจรลบแยก'
    ],
    workedExample: {
      problem: 'ถ้าป้อนอินพุต A = 0, B = 1, B_in = 1 เข้าสู่วงจร Full Subtractor จงหาค่า Diff และ B_out',
      steps: [
        'Diff = 0 XOR 1 XOR 1 = 1 XOR 1 = 0',
        'B_out = (0\')(1) + (0\')(1) + (1)(1) = (1)(1) + (1)(1) + 1 = 1 + 1 + 1 = 1',
        'ความหมาย: 0 - 1 - 1 = -2 ฐานสิบ ในระบบ 1 บิตยืม คือ Diff=0 และขอยืม Bout=1'
      ],
      answer: 'Diff = 0, B_out = 1'
    },
    examTip: 'เปรียบเทียบ Adder กับ Subtractor: สมการ Diff เหมือนกับ Sum ทุกประการ (A XOR B XOR C) ต่างกันเฉพาะ Carry กับ Borrow ที่ Borrow มี NOT บนบิต A!'
  },
  {
    id: 'f-ripple-adder-delay',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'ความล่าช้าสะสมของวงจรบวก Ripple Carry Adder',
    subtitle: 'คำนวณเวลาหน่วงรวม (Total Propagation Delay) และความถี่ทำงานสูงสุดของ Adder n-bit',
    slideRef: '03_digitalCircuit.pdf (หน้า 50-55)',
    formulaLatex: 't_{total} = n \\times t_{pd} \\quad , \\quad f_{max} = \\frac{1}{t_{total}}',
    variables: [
      { symbol: 't_{total}', meaning: 'ความล่าช้าสะสมทั้งหมดจนกระทั่งบิต MSB คำนวณเสร็จ', unit: 'ns' },
      { symbol: 'n', meaning: 'จำนวนบิตของวงจรบวก (เช่น 4 บิต, 8 บิต, 16 บิต)' },
      { symbol: 't_{pd}', meaning: 'เวลาหน่วงการส่งผ่านตัวทดของ Full Adder 1 สเตจ (Propagation Delay)', unit: 'ns' },
      { symbol: 'f_{max}', meaning: 'ความถี่สัญญาณนาฬิกาสูงสุดที่วงจรบวกยังคำนวณทัน', unit: 'Hz' },
    ],
    howToUse: [
      '1. ในวงจร Ripple Carry Adder บิตผลลัพธ์สูงสุด (MSB) ไม่สามารถคำนวณเสร็จได้ทันที ต้องรอตัวทดกระเพื่อม (Ripple) ส่งต่อจากบิต 0 -> 1 -> 2 -> ... -> n-1',
      '2. คำนวณเวลารวม: นำจำนวนบิต n คูณด้วยเวลาหน่วงของแต่ละสเตจ t_pd',
      '3. หาความถี่สูงสุด: f_max = 1 / t_total'
    ],
    workedExample: {
      problem: 'วงจรบวกขนาด 8 บิต ต่อแบบ Ripple Carry Adder ถ้า Full Adder แต่ละตัวมีเวลาหน่วง t_pd = 5 ns จงหาเวลารวมและความถี่สูงสุด',
      steps: [
        't_total = 8 * 5 ns = 40 ns (40 * 10^-9 วินาที)',
        'f_max = 1 / (40 * 10^-9) = 25,000,000 Hz = 25 MHz'
      ],
      answer: 't_total = 40 ns, f_max = 25 MHz'
    },
    examTip: 'ถ้าโจทย์ถามวิธีแก้ไขความล่าช้าของ Ripple Carry Adder ให้ตอบว่า "ใช้วงจร Carry-Lookahead Adder (CLA)" ซึ่งคำนวณตัวทดล่วงหน้าพร้อมกันทุกบิต'
  },
  {
    id: 'f-overflow-twos-comp',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'การตรวจจับ Overflow ในเลขคิดเครื่องหมาย 2\'s Complement',
    subtitle: 'เงื่อนไขตัวทดเข้า/ออกจากบิตเครื่องหมาย และเกณฑ์การเกิดเลขล้นบิตผิดพลาด',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 55-65)',
    formulaLatex: 'V = C_n \\oplus C_{n-1} \\quad (V = 1 \\implies \\text{เกิด Overflow ล้นบิต})',
    variables: [
      { symbol: 'V', meaning: 'Overflow Flag (ธงสถานะเกิดเลขล้นบิต: 1 = ล้น, 0 = ปกติ)' },
      { symbol: 'C_n', meaning: 'ตัวทดส่งออกหลุดออกจากบิตเครื่องหมาย MSB (Carry-out of sign bit)' },
      { symbol: 'C_{n-1}', meaning: 'ตัวทดรับเข้าสู่บิตเครื่องหมาย MSB (Carry-in to sign bit)' },
    ],
    howToUse: [
      '1. สังเกตการบวกเลขบิตสูงสุด (Sign Bit): หาตัวทดที่วิ่งเข้าบิต MSB (C_{n-1}) และตัวทดที่พุ่งทะลุออกไป (C_n)',
      '2. นำตัวทดทั้งสองมา XOR กัน: ถ้าตรงกัน (0 XOR 0 หรือ 1 XOR 1) จะได้ V = 0 แปลว่าไม่ล้น',
      '3. ถ้าไม่ตรงกัน (0 XOR 1 หรือ 1 XOR 0) จะได้ V = 1 แปลว่าเกิด Overflow ผลลัพธ์ผิดพลาด',
      '4. กฎสามัญสำนึก: บวก+บวก ได้ลบ หรือ ลบ+ลบ ได้บวก เกิด Overflow เสมอ (แต่ถ้าบวกกับลบ จะไม่มีวันเกิด Overflow)'
    ],
    workedExample: {
      problem: 'ในระบบ 4 บิต 2\'s complement (เก็บค่าได้ -8 ถึง +7) นำ +5 (0101) บวกกับ +4 (0100) จงหาผลบวกและตรวจสอบว่าเกิด Overflow หรือไม่',
      steps: [
        '  0 1 0 1  (+5)',
        '+ 0 1 0 0  (+4)',
        '---------',
        '= 1 0 0 1  (-7 ในระบบ 2\'s complement ซึ่งผิด เพราะ 5+4 ต้องได้ +9)',
        'ตรวจสอบตัวทด: มีตัวทดเข้าบิต MSB (C_3 = 1) แต่ไม่มีตัวทดออกนอกระบบ (C_4 = 0)',
        'V = C_4 XOR C_3 = 0 XOR 1 = 1 (เกิด Overflow!)'
      ],
      answer: 'V = 1 (เกิด Overflow ผลลัพธ์กลับเครื่องหมายเป็นลบ ผิดพลาด)'
    },
    examTip: 'จำคู่ XOR: V = Cn XOR Cn-1 และจำกฎทางพีชคณิต: เครื่องหมายเหมือนกันบวกกันแล้วได้เครื่องหมายตรงข้าม = Overflow ชัวร์!'
  },
  {
    id: 'f-r2r-dac',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'วงจรแปลงสัญญาณดิจิทัลเป็นแอนะล็อกแบบ R-2R Ladder DAC',
    subtitle: 'การคำนวณแรงดันเอาต์พุตจากโครงข่ายตัวต้านทาน 2 ค่า (R และ 2R) ร่วมกับ Op-Amp Inverting',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 70-80)',
    formulaLatex: 'V_{out} = -V_{ref} \\sum_{i=1}^{n} \\frac{b_{n-i}}{2^i} = -V_{ref} \\left( \\frac{b_3}{2^1} + \\frac{b_2}{2^2} + \\frac{b_1}{2^3} + \\frac{b_0}{2^4} \\right)',
    variables: [
      { symbol: 'V_{out}', meaning: 'แรงดันไฟฟ้าแอนะล็อกที่ได้จากวงจร (ติดลบเพราะใช้วงจร Inverting Amp)', unit: 'Volt' },
      { symbol: 'V_{ref}', meaning: 'แรงดันอ้างอิงที่ป้อนให้โครงข่าย R-2R', unit: 'Volt' },
      { symbol: 'b_3, b_2, b_1, b_0', meaning: 'บิตข้อมูลดิจิทัล (b3 คือ MSB มีค่าน้ำหนัก 1/2, b0 คือ LSB มีค่าน้ำหนัก 1/16)' },
    ],
    howToUse: [
      '1. ระบุบิต MSB และ LSB: บิตซ้ายสุด (MSB) มีค่าน้ำหนัก 1/2, บิตถัดไป 1/4, 1/8, 1/16 ตามลำดับ',
      '2. คำนวณผลรวมเศษส่วนของบิตที่เป็น 1 เท่านั้น',
      '3. นำผลรวมคูณด้วย (-V_ref) จะได้แรงดันเอาต์พุต V_out'
    ],
    workedExample: {
      problem: 'วงจร R-2R Ladder DAC ขนาด 4 บิต ใช้ V_ref = 5V ป้อนอินพุต B = 1010_2 จงหาแรงดันเอาต์พุต V_out',
      steps: [
        'อินพุต b3=1, b2=0, b1=1, b0=0',
        'ผลรวมค่าน้ำหนัก = 1/2 + 0/4 + 1/8 + 0/16 = 4/8 + 1/8 = 5/8 = 0.625',
        'V_out = -5V * 0.625 = -3.125 V'
      ],
      answer: 'V_out = -3.125 V'
    },
    examTip: 'ข้อดีของ R-2R เหนือ Weighted-Resistor DAC: ใช้ตัวต้านทานเพียงแค่ 2 ค่าคือ R และ 2R ทำให้ผลิตง่าย ค่าความคลาดเคลื่อนต่ำ ไม่เปลืองอุปกรณ์'
  },
  {
    id: 'f-weighted-resistor-dac',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'วงจรแปลงสัญญาณ DAC แบบตัวต้านทานถ่วงน้ำหนัก (Weighted-Resistor Summing DAC)',
    subtitle: 'การคำนวณแรงดันเอาต์พุตโดยใช้ออปแอมป์ต่อแบบ Inverting Summing Amplifier',
    slideRef: '03_digitalCircuit.pdf (หน้า 68-74)',
    formulaLatex: 'V_{out} = -V_{ref} \\left( \\frac{b_3 R_f}{R} + \\frac{b_2 R_f}{2R} + \\frac{b_1 R_f}{4R} + \\frac{b_0 R_f}{8R} \\right) = -V_{ref} \\frac{R_f}{R} \\sum_{i=0}^{n-1} \\frac{b_i}{2^{n-1-i}}',
    variables: [
      { symbol: 'V_{out}', meaning: 'แรงดันเอาต์พุตแอนะล็อก', unit: 'Volt' },
      { symbol: 'R_f', meaning: 'ตัวต้านทาน Feedback ข้าม Op-Amp', unit: 'kΩ' },
      { symbol: 'R', meaning: 'ตัวต้านทานประจำบิต MSB (บิตถัดไปจะเป็น 2R, 4R, 8R)', unit: 'kΩ' },
      { symbol: 'b_i', meaning: 'บิตข้อมูลดิจิทัล (0 หรือ 1)' }
    ],
    howToUse: [
      '1. บิต MSB (b3) จะต่อกับตัวต้านทานค่าน้อยที่สุดคือ R (จ่ายกระแสสูงสุด)',
      '2. บิตต่อๆ มาค่าความต้านทานจะเพิ่มขึ้นทีละเท่าตัว: 2R, 4R, 8R ...',
      '3. หาอัตราขยายแต่ละขา: Rf / (2^k * R)',
      '4. รวมผลคูณของบิตที่เป็น 1 แล้วคูณด้วย -Vref'
    ],
    workedExample: {
      problem: 'วงจร 4-bit Weighted Resistor DAC มี R = 10kΩ, R_f = 5kΩ, V_ref = 5V ป้อนรหัส 1100_2 จงหา V_out',
      steps: [
        'บิต b3=1 (R=10k), b2=1 (2R=20k), b1=0 (4R=40k), b0=0 (8R=80k)',
        'กระแสรวมจากขาอินพุต: I = Vref * [ (b3/10k) + (b2/20k) ] = 5V * [ 1/10k + 1/20k ] = 5V * (3/20k) = 0.75 mA',
        'V_out = -I * Rf = -0.75 mA * 5kΩ = -3.75 V'
      ],
      answer: 'V_out = -3.75 V'
    },
    examTip: 'ข้อเสียสำคัญของ Weighted DAC: เมื่อจำนวนบิตสูงขึ้น ค่าตัวต้านทานจะต่างกันมหาศาล (เช่น 10 บิต ตัวสุดท้ายมีค่า 512R) ทำให้หาค่าความแม่นยำสูงได้ยากมาก ในทางปฏิบัตินิยมใช้ R-2R แทน'
  },
  {
    id: 'f-flash-adc',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'วงจรแปลงสัญญาณแอนะล็อกเป็นดิจิทัลความเร็วสูงแบบ Flash ADC',
    subtitle: 'สูตรคำนวณจำนวนวงจรเปรียบเทียบแรงดัน (Comparators) และจำนวนตัวต้านทานแบ่งแรงดัน',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 85-92)',
    formulaLatex: 'N_{comparators} = 2^n - 1 \\quad , \\quad N_{resistors} = 2^n',
    variables: [
      { symbol: 'n', meaning: 'จำนวนบิตเอาต์พุตดิจิทัลของ ADC (Resolution Bits)' },
      { symbol: 'N_{comparators}', meaning: 'จำนวนออปแอมป์เปรียบเทียบแรงดัน (Op-Amp Comparators) ที่ต้องใช้' },
      { symbol: 'N_{resistors}', meaning: 'จำนวนตัวต้านทานเท่ากันใน Voltage Divider Ladder' },
    ],
    howToUse: [
      '1. ระบุจำนวนบิต n ของ ADC ที่โจทย์ต้องการ',
      '2. คำนวณจำนวน Comparators: 2^n - 1 ตัว',
      '3. คำนวณจำนวนตัวต้านทานแบ่งแรงดัน: 2^n ตัว',
      '4. นำเอาต์พุตจาก Comparators เข้าสู่วงจร Priority Encoder เพื่อแปลงเป็นรหัส Binary'
    ],
    workedExample: {
      problem: 'ต้องการออกแบบวงจร Flash ADC ความละเอียด 8 บิต (แปลงค่าได้ 0-255) จะต้องใช้วงจรเปรียบเทียบแรงดัน (Comparators) กี่ตัว?',
      steps: [
        'n = 8 บิต',
        'N_comparators = 2^8 - 1 = 256 - 1 = 255 ตัว',
        'N_resistors = 2^8 = 256 ตัว'
      ],
      answer: 'ต้องใช้ Comparators ทั้งหมด 255 ตัว (และตัวต้านทาน 256 ตัว)'
    },
    examTip: 'Flash ADC เป็น ADC ที่ "เร็วที่สุดในโลก" (ใช้เวลาเพียง 1 รอบ Clock) แต่ "เปลืองฮาร์ดแวร์ที่สุด" ยิ่งบิตเยอะ Comparators จะเพิ่มขึ้นแบบเอกซ์โพเนนเชียล'
  },
  {
    id: 'f-adc-conversion-time',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'การเปรียบเทียบเวลาในการแปลงสัญญาณของ ADC แต่ละประเภท (ADC Conversion Speed)',
    subtitle: 'สูตรคำนวณจำนวนรอบ Clock และความเร็วของ Flash ADC, SAR, Counter Ramp, และ Dual Slope',
    isHighYield: true,
    slideRef: '03_digitalCircuit.pdf (หน้า 90-98)',
    formulaLatex: 'T_{Flash} = 1 \\cdot T_{clk} \\quad , \\quad T_{SAR} = n \\cdot T_{clk} \\quad , \\quad T_{Counter,max} = (2^n - 1) T_{clk} \\quad , \\quad T_{DualSlope} = 2^{n+1} T_{clk}',
    variables: [
      { symbol: 'T_{conv}', meaning: 'เวลาที่ใช้ในการแปลงสัญญาณจนเสร็จสิ้น (Conversion Time)', unit: 's' },
      { symbol: 'T_{clk}', meaning: 'คาบเวลาของสัญญาณนาฬิกา (1 / f_clk)', unit: 's' },
      { symbol: 'n', meaning: 'จำนวนบิตความละเอียดของ ADC' }
    ],
    howToUse: [
      '1. Flash ADC: เร็วที่สุด = คงที่ 1 รอบ Clock เสมอ',
      '2. SAR (Successive Approximation): เร็วปานกลาง = เท่ากับ n รอบ Clock (ทีละบิตจาก MSB ไป LSB)',
      '3. Counter Ramp ADC: ช้า = สูงสุด 2^n - 1 รอบ Clock (ขึ้นกับขนาดแรงดัน)',
      '4. Dual Slope ADC: ช้าที่สุด = ประมาณ 2^(n+1) รอบ Clock แต่ทน Noise ดีที่สุด นิยมใน Digital Multimeter'
    ],
    workedExample: {
      problem: 'ADC ขนาด 10 บิต ใช้สัญญาณนาฬิกา f_clk = 1 MHz (T_clk = 1 μs) จงหาเวลาแปลงสัญญาณสูงสุดของ Flash, SAR และ Counter Ramp ADC',
      steps: [
        '1) Flash ADC: T = 1 * 1 μs = 1 μs (เร็วที่สุด)',
        '2) SAR ADC: T = n * T_clk = 10 * 1 μs = 10 μs',
        '3) Counter Ramp ADC: T = (2^10 - 1) * 1 μs = 1023 * 1 μs = 1,023 μs (ประมาณ 1.023 ms)'
      ],
      answer: 'Flash = 1 μs, SAR = 10 μs, Counter Ramp = 1,023 μs'
    },
    examTip: 'ข้อสอบชอบถามเรียงลำดับความเร็ว: Flash > SAR > Counter Ramp > Dual Slope / และถามว่า DMM (มิเตอร์วัดไฟ) ใช้อะไร ตอบ: Dual Slope ADC!'
  },
  {
    id: 'f-open-collector-tristate',
    chapter: 'ch3',
    chapterName: 'บทที่ 3: Digital Circuits & Hardware',
    title: 'การเชื่อมต่อบัส: Open-Collector (Wired-AND) และ Tri-State Bus',
    subtitle: 'ข้อกำหนดตัวต้านทาน Pull-up และการตัดการเชื่อมต่อสถานะ High-Impedance (Hi-Z)',
    slideRef: '03_digitalCircuit.pdf (หน้า 26-32)',
    formulaLatex: 'R_{p,min} = \\frac{V_{CC} - V_{OL}}{I_{OL}} \\quad , \\quad R_{p,max} = \\frac{V_{CC} - V_{IH}}{n \\cdot I_{OH} + m \\cdot I_{IH}}',
    variables: [
      { symbol: 'R_p', meaning: 'ตัวต้านทานพูลอัป (Pull-up Resistor) ภายนอกที่จำเป็นต้องต่อ', unit: 'kΩ' },
      { symbol: 'Hi\\text{-}Z', meaning: 'สถานะ High-Impedance (ลอยตัว เสมือนสวิตช์เปิดตัดขาดจากบัส)' },
      { symbol: 'Wired\\text{-}AND', meaning: 'การนำขา Open-Collector มาผูกรวมกัน จะทำหน้าที่เสมือนเกต AND อัตโนมัติ' },
    ],
    howToUse: [
      '1. Open-Collector ขับ 0 ได้ดีเยี่ยม (ดึงกระแสลงกราวด์) แต่ไม่สามารถจ่ายไฟ 1 ได้เอง ต้องพึ่งพา R_p ดึงไฟขึ้น Vcc',
      '2. ห้ามนำเอาต์พุตของเกตปกติ (Totem-Pole) มาต่อรวมกันเด็ดขาด เพราะจะเกิดไฟฟ้าลัดวงจร (Bus Contention)',
      '3. Tri-State Buffer มี 3 สถานะ: 0, 1, และ Hi-Z (ใช้ควบคุมการแชร์สายบัสข้อมูลในระบบไมโครคอมพิวเตอร์)'
    ],
    workedExample: {
      problem: 'เกต Open-Collector 3 ตัวต่อแบบ Wired-AND ร่วมกับ R_p ถ้าเอาต์พุตของเกตตัวที่ 1 ส่ง 0, เกตตัวที่ 2 ส่ง 1, และเกตตัวที่ 3 ส่ง 1 สัญญาณบนบัสรวมจะมีค่าตรรกะเท่าใด?',
      steps: [
        'Wired-AND ทำหน้าที่เสมือน AND Gate: Bus = Y1 AND Y2 AND Y3',
        'Bus = 0 AND 1 AND 1 = 0',
        'เกตตัวที่ส่ง 0 จะดึงสายบัสลงกราวด์ ทำให้แรงดันทั้งเส้นกลายเป็น 0V ทันที'
      ],
      answer: 'สัญญาณบนสายบัสรวมเป็น 0 (LOW)'
    },
    examTip: 'จุดออกสอบ: Totem-Pole ต่อชนกันไม่ได้ (ไหม้), Open-Collector ต่อชนกันได้เรียกว่า Wired-AND, และ Tri-State มีขาสั่งงาน Enable (OE) คุมสถานะ Hi-Z'
  },
  {
    id: 'f-boolean-laws',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'กฎพีชคณิตบูลีนที่ใช้ยุบวงจรบ่อยที่สุด (Boolean Algebra Theorems)',
    subtitle: 'ทฤษฎีบทการดูดกลืน (Absorption), กฎการแจกแจง และสมการลดรูปเอกลักษณ์',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 5-18)',
    formulaLatex: 'A + AB = A \\quad , \\quad A + \\bar{A}B = A + B \\quad , \\quad (A+B)(A+C) = A + BC',
    variables: [
      { symbol: 'A + AB = A', meaning: 'กฎการดูดกลืน (Absorption Law): เทอมย่อยถูกเทอมหลักดูดหายไป' },
      { symbol: 'A + \\bar{A}B = A + B', meaning: 'กฎการขจัดส่วนกลับ (Redundancy Law): ตัดตัวตรงข้ามทิ้งได้ทันที' },
      { symbol: 'A(A + B) = A', meaning: 'กฎการดูดกลืนรูปผลคูณ' },
    ],
    howToUse: [
      '1. สังเกตเทอมเดี่ยวคู่กับผลคูณ: เช่น A บวกกับอะไรที่มี A คูณอยู่ จะยุบเหลือแค่ A ตัวเดียว',
      '2. สังเกตตัวกลับบิต: ถ้ามี A บวกกับ Not(A) คูณ B ตัว Not(A) จะหลุดหายไป เหลือแค่ A + B เสมอ',
      '3. ดึงตัวร่วมแล้วจับคู่: A + Not(A) = 1 และ A . Not(A) = 0'
    ],
    workedExample: {
      problem: 'จงลดรูปสมการ F = X + \\bar{X}Y + (X+Y)\\bar{Y} ให้เหลือรูปอย่างง่ายที่สุด',
      steps: [
        'ขั้นตอนที่ 1) ยุบพจน์ X + \\bar{X}Y ด้วยกฎ Redundancy: X + \\bar{X}Y = X + Y',
        'ขั้นตอนที่ 2) กระจายพจน์หลัง: (X+Y)\\bar{Y} = X\\bar{Y} + Y\\bar{Y} = X\\bar{Y} + 0 = X\\bar{Y}',
        'ขั้นตอนที่ 3) นำมารวมกัน: F = (X + Y) + X\\bar{Y}',
        'ขั้นตอนที่ 4) จัดกลุ่มดึงตัวร่วม: F = Y + (X + X\\bar{Y}) = Y + X(1 + \\bar{Y}) = Y + X(1) = X + Y'
      ],
      answer: 'F = X + Y'
    },
    examTip: 'จำคู่มือปราบมาร: A + A\'B = A + B ออกสอบทุกเทอม! เจอเมื่อไหร่ให้ตัดขีด NOT ของตัวที่ซ้ำทิ้งได้ทันที'
  },
  {
    id: 'f-demorgan',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'ทฤษฎีบทของเดอมอร์แกน (De Morgan\'s Laws)',
    subtitle: 'กฎการกระจายเครื่องหมายบาร์เพื่อสลับระหว่าง AND และ OR',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 12-22)',
    formulaLatex: '\\overline{A + B} = \\bar{A} \\cdot \\bar{B} \\quad , \\quad \\overline{A \\cdot B} = \\bar{A} + \\bar{B}',
    variables: [
      { symbol: '\\overline{A + B}', meaning: 'NOR Gate สมมูลกับ Inverted-Input AND Gate (Bubble AND)' },
      { symbol: '\\overline{A \\cdot B}', meaning: 'NAND Gate สมมูลกับ Inverted-Input OR Gate (Bubble OR)' },
    ],
    howToUse: [
      '1. ท่องคาถา: "หักบาร์ เปลี่ยนเครื่องหมาย" (Break the bar, change the sign)',
      '2. ถ้าเดิมเป็นบวก (OR) หักบาร์แล้วเปลี่ยนเป็นคูณ (AND) และใส่บาร์แยกแต่ละตัว',
      '3. ถ้าเดิมเป็นคูณ (AND) หักบาร์แล้วเปลี่ยนเป็นบวก (OR) และใส่บาร์แยกแต่ละตัว',
      '4. บาร์ซ้อนกัน 2 ชั้นตัดทิ้งได้: Not(Not(A)) = A'
    ],
    workedExample: {
      problem: 'จงหาคอมพลีเมนต์ (ส่วนกลับ) ของฟังก์ชัน F = \\overline{(A + \\bar{B})(C + \\bar{D})}',
      steps: [
        'มองเป็นก้อนใหญ่ 2 ก้อนคูณกัน: (ก้อน 1) . (ก้อน 2)',
        'กระจายบาร์ใหญ่เปลี่ยนคูณเป็นบวก: F = \\overline{A + \\bar{B}} + \\overline{C + \\bar{D}}',
        'กระจายบาร์ย่อยแต่ละก้อนเปลี่ยนบวกเป็นคูณ: = (\\bar{A} \\cdot \\bar{\\bar{B}}) + (\\bar{C} \\cdot \\bar{\\bar{D}})',
        'ตัดดับเบิลบาร์: = \\bar{A}B + \\bar{C}D'
      ],
      answer: 'F = \\bar{A}B + \\bar{C}D'
    },
    examTip: 'NAND Gate สามารถเขียนแทนด้วยวงกลม Bubble ที่อินพุตของ OR Gate ได้ (Bubble OR) และ NOR Gate เขียนแทนด้วย Bubble ที่อินพุตของ AND Gate ได้ (Bubble AND)'
  },
  {
    id: 'f-canonical-sop-pos',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'รูปแบบมาตรฐานสัจนิรันดร์ (Canonical SOP & POS)',
    subtitle: 'ความสัมพันธ์ระหว่าง Minterms (Σm) และ Maxterms (ΠM) รวมทั้งการแปลงตารางค่าความจริง',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 20-30)',
    formulaLatex: 'F = \\sum m(1, 2, 5) \\iff \\bar{F} = \\sum m(0, 3, 4, 6, 7) \\iff F = \\prod M(0, 3, 4, 6, 7)',
    variables: [
      { symbol: 'm_i', meaning: 'Minterm (แถวที่ผลลัพธ์เป็น 1) รูปแบบคูณกัน (AND) เช่น m5 = A B\' C (101)' },
      { symbol: 'M_i', meaning: 'Maxterm (แถวที่ผลลัพธ์เป็น 0) รูปแบบบวกกัน (OR) สลับบิต เช่น M5 = A\' + B + C\'' },
      { symbol: '\\sum m', meaning: 'Sum of Products (SOP) ผลบวกของผลคูณ' },
      { symbol: '\\prod M', meaning: 'Product of Sums (POS) ผลคูณของผลบวก' },
    ],
    howToUse: [
      '1. Minterm (SOP): มองหาแถวในตารางที่ F = 1 บิต 1 ไม่ติดบาร์ บิต 0 ติดบาร์',
      '2. Maxterm (POS): มองหาแถวในตารางที่ F = 0 สลับทิศทาง! บิต 0 ไม่ติดบาร์ บิต 1 ติดบาร์',
      '3. การแปลงระหว่าง Σm และ ΠM: เลขที่เหลือจาก 0 ถึง 2^n - 1 คือ Maxterm ของฟังก์ชันเดียวกัน'
    ],
    workedExample: {
      problem: 'ฟังก์ชันตรรกะ 3 ตัวแปร F(A, B, C) = Σm(1, 3, 6, 7) จงแปลงให้อยู่ในรูป Product of Sums (POS)',
      steps: [
        'ระบบ 3 ตัวแปรมีรหัสแถวทั้งหมด 2^3 = 8 แถว คือ 0 ถึง 7',
        'Minterm (แถวที่เป็น 1) คือ {1, 3, 6, 7}',
        'แถวที่เหลือคือแถวที่เป็น 0 ได้แก่ {0, 2, 4, 5}',
        'แปลงเป็นรูป Maxterm (POS): F = ΠM(0, 2, 4, 5)'
      ],
      answer: 'F = ΠM(0, 2, 4, 5)'
    },
    examTip: 'ระวังหลงขั้ว: ใน Minterm 1 คือตัวแปรธรรมดา 0 คือติดบาร์ แต่ใน Maxterm 0 คือตัวแปรธรรมดา 1 คือติดบาร์ (กลับกัน 100%)'
  },

  // =========================================================================
  // CHAPTER 4: COMBINATIONAL LOGIC CIRCUITS
  // =========================================================================
  {
    id: 'f-kmap-4corners',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'การลดรูปตาราง K-Map 4 ตัวแปรและเทคนิค 4 มุมห้อง',
    subtitle: 'การจัดกลุ่ม 1, 2, 4, 8, 16 ช่องตามรหัสเกรย์ (Gray Code) และการม้วนขอบตาราง',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 15-35)',
    formulaLatex: 'm_0 + m_2 + m_8 + m_{10} = \\bar{B}\\bar{D} \\quad (\\text{กลุ่ม 4 มุมห้องที่ข้อสอบชอบออกที่สุด})',
    variables: [
      { symbol: 'm_0', meaning: 'แถว 00 คอลัมน์ 00 (A\'B\'C\'D\')' },
      { symbol: 'm_2', meaning: 'แถว 00 คอลัมน์ 10 (A\'B\'CD\')' },
      { symbol: 'm_8', meaning: 'แถว 10 คอลัมน์ 00 (AB\'C\'D\')' },
      { symbol: 'm_{10}', meaning: 'แถว 10 คอลัมน์ 10 (AB\'CD\')' },
      { symbol: '\\bar{B}\\bar{D}', meaning: 'ผลลัพธ์จากการยุบ 4 มุม: ตัวแปร B คงที่ที่ 0 (B\') และ D คงที่ที่ 0 (D\')' },
    ],
    howToUse: [
      '1. จำลำดับ Gray Code: หัวตารางและข้างตารางต้องเรียง 00, 01, 11, 10 เสมอ (สลับ 11 กับ 10)',
      '2. เลขมินเทอมในตาราง: แถว 3 คือเลข 12, 13, 15, 14 และแถว 4 คือเลข 8, 9, 11, 10 (ระวังสลับแถว)',
      '3. วงให้ใหญ่ที่สุด: พยายามวงกลุ่มขนาด 16, 8, 4, 2, 1 (ต้องเป็น 2^n ช่องเท่านั้น)',
      '4. สังเกตตัวแปรที่ไม่เปลี่ยนสถานะ: ตัวแปรไหนเปลี่ยนจาก 0 เป็น 1 ให้ตัดทิ้ง ตัวที่นิ่งให้เก็บไว้'
    ],
    workedExample: {
      problem: 'จงหาผลลัพธ์จากการรวมกลุ่มมินเทอม 4 มุมห้อง F = Σm(0, 2, 8, 10)',
      steps: [
        'พิจารณาคู่แถวบน (00: A\'B\') กับแถวล่าง (10: AB\'): A เปลี่ยนจาก 0->1 ตัดทิ้ง เหลือ B\' (B เป็น 0)',
        'พิจารณาคู่คอลัมน์ซ้าย (00: C\'D\') กับขวา (10: CD\'): C เปลี่ยนจาก 0->1 ตัดทิ้ง เหลือ D\' (D เป็น 0)',
        'นำตัวแปรที่รอดชีวิตมารวมกัน: F = B\' D\''
      ],
      answer: 'F = \\bar{B}\\bar{D}'
    },
    examTip: 'ข้อสอบ 90% ต้องมีมินเทอม 4 มุมห้อง (0, 2, 8, 10) ซ่อนอยู่เสมอ ถ้าเด็กไม่สังเกตจะไปวงคู่แยกเป็น 2 วง ทำให้เสียคะแนนทันที!'
  },
  {
    id: 'f-static-hazard',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'การกำจัดสัญญาณพัลส์รบกวนชั่วขณะ (Static-1 Hazard Glitch Elimination)',
    subtitle: 'การตรวจจับรอยต่อระหว่างกลุ่ม K-Map และการเติมเทอมกำบัง (Consensus Term)',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 40-52)',
    formulaLatex: 'F_{hazard} = A\\bar{B} + BC \\implies F_{safe} = A\\bar{B} + BC + AC \\quad (+AC \\text{ คือ Consensus Term})',
    variables: [
      { symbol: 'Static\\text{-}1 \\text{ Hazard}', meaning: 'ปรากฏการณ์ที่เอาต์พุตควรเป็น 1 ตลอดเวลา แต่ตกลงเป็น 0 ชั่วคราว (Glitch Spike)' },
      { symbol: 't_{pd}', meaning: 'เกิดจาก Gate Propagation Delay ของ Inverter ทำให้ขาหนึ่งมาช้ากว่าอีกขาหนึ่ง' },
      { symbol: 'Consensus Term', meaning: 'เทอมผลคูณที่สร้างขึ้นมาเพื่อคลุมรอยต่อระหว่าง 2 กลุ่มที่สัมผัสกันใน K-Map' },
    ],
    howToUse: [
      '1. สังเกตบน K-Map: หากมีวง 1 สองกลุ่มที่อยู่ติดกัน แต่ไม่มีการวงทับซ้อน (Overlap) บริเวณรอยต่อ จะเกิด Static-1 Hazard',
      '2. เกิดขึ้นเมื่ออินพุตตัวที่เชื่อม 2 กลุ่มเปลี่ยนสถานะ (เช่น B เปลี่ยนจาก 1 เป็น 0 หรือ 0 เป็น 1)',
      '3. วิธีแก้ไข: ให้ใส่วงเพิ่มอีก 1 วง คลุมเชื่อมระหว่าง 2 กลุ่มนั้นโดยตรง แม้ตามหลัก K-Map จะมองว่าเป็นเทอมซ้ำซ้อน (Redundant) แต่ในทางฮาร์ดแวร์จำเป็นต้องมีเพื่อกันกระตุก'
    ],
    workedExample: {
      problem: 'วงจรมีสมการ F = A B\' + B C ถ้าตัวแปร A=1, C=1 และตัวแปร B เปลี่ยนจาก 1 เป็น 0 จะเกิด Hazard หรือไม่ และต้องเติมพจน์ใดเพื่อแก้ไข?',
      steps: [
        'ขณะ B=1: ก้อนหลัง BC = (1)(1) = 1 -> F = 1',
        'ขณะ B กำลังเปลี่ยนสถานะ: อินเวอร์เตอร์ของ B มีเวลาหน่วง ทำให้มีช่วงสั้นๆ ที่ B=0 และ B\'=0 พร้อมกัน ส่งผลให้ F ตกลงเป็น 0 ชั่วขณะ (Glitch)',
        'หลัง B=0 สมบูรณ์: ก้อนหน้า AB\' = (1)(1) = 1 -> F กลับมาเป็น 1',
        'แก้ไขโดยหา Consensus Term: เชื่อมระหว่าง A B\' กับ B C จะได้พจน์ A C',
        'สมการที่ปลอดภัยคือ F = A B\' + B C + A C'
      ],
      answer: 'เกิด Static-1 Hazard, แก้ไขโดยเพิ่มเทอม + AC'
    },
    examTip: 'ข้อสอบถามสาเหตุการเกิด Hazard ให้ตอบว่า "เกิดจาก Propagation Delay ของ Inverter" และวิธีแก้คือ "เพิ่มวงคลุมรอยต่อ (Consensus Term)"'
  },
  {
    id: 'f-mux-expansion',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'การสร้างฟังก์ชันลอจิกด้วย Multiplexer (Shannon\'s Expansion Theorem)',
    subtitle: 'การนำ MUX ขนาด 2^(n-1)-to-1 มาสร้างตรรกะ n ตัวแปรโดยใช้ทฤษฎีการกระจายแชนนอน',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 60-75)',
    formulaLatex: 'F(A,B,C) = \\bar{A} \\cdot F(0,B,C) + A \\cdot F(1,B,C) = \\bar{S}_1\\bar{S}_0 I_0 + \\bar{S}_1 S_0 I_1 + S_1\\bar{S}_0 I_2 + S_1 S_0 I_3',
    variables: [
      { symbol: 'S_1, S_0', meaning: 'Select Lines (สายเลือกช่องอินพุต มักป้อนตัวแปรหน้าสุด เช่น A, B)' },
      { symbol: 'I_0, I_1, I_2, I_3', meaning: 'Data Inputs (ช่องอินพุตข้อมูลที่ต้องต่อเข้ากับ 0, 1, C หรือ C\')' },
      { symbol: 'n', meaning: 'จำนวนตัวแปรในฟังก์ชัน (หากมี n ตัวแปร สามารถใช้ MUX ขนาด 2^(n-1)-to-1 ได้)' }
    ],
    howToUse: [
      '1. นำตัวแปรหน้า (เช่น A, B) ต่อเข้าขา Select S1, S0 ของ MUX ขนาด 4-to-1',
      '2. ตัวแปรที่เหลือ (C) จะถูกนำมาจับคู่ในแต่ละแถวของตารางค่าความจริง:',
      '   - ถ้าแถวนั้นเอาต์พุต F ไม่ขึ้นกับ C ให้ต่อไฟ 0 หรือ 1',
      '   - ถ้า F เปลี่ยนตาม C ให้ต่อเข้า C โดยตรง',
      '   - ถ้า F ตรงข้ามกับ C ให้ต่อผ่าน Not Gate เป็น C\''
    ],
    workedExample: {
      problem: 'จงสร้างฟังก์ชัน F(A,B,C) = Σm(1, 3, 4, 6) โดยใช้ Multiplexer 4-to-1 (ต่อ A, B เข้า S1, S0)',
      steps: [
        'พิจารณาคู่ (A,B)=00: m0(C=0)->F=0, m1(C=1)->F=1 => เอาต์พุต F = C ดังนั้น I0 = C',
        'พิจารณาคู่ (A,B)=01: m2(C=0)->F=0, m3(C=1)->F=1 => เอาต์พุต F = C ดังนั้น I1 = C',
        'พิจารณาคู่ (A,B)=10: m4(C=0)->F=1, m5(C=1)->F=0 => เอาต์พุต F = C\' ดังนั้น I2 = C\'',
        'พิจารณาคู่ (A,B)=11: m6(C=0)->F=1, m7(C=1)->F=0 => เอาต์พุต F = C\' ดังนั้น I3 = C\''
      ],
      answer: 'ต่ออินพุต: I0 = C, I1 = C, I2 = C\', I3 = C\' (และต่อ S1=A, S0=B)'
    },
    examTip: 'MUX ขนาด 2^k อินพุต สามารถสร้างฟังก์ชันที่มี k+1 ตัวแปรได้เสมอ โดยใช้ตัวแปรตัวสุดท้ายป้อนเข้าช่อง Data Input'
  },
  {
    id: 'f-decoder-expansion',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'การขยายขนาด Decoder และการถอดรหัสแอดเดรส (Decoder Cascading)',
    subtitle: 'สูตรคำนวณจำนวนไอซี Decoder ตัวเล็กเพื่อต่อเป็น Decoder ตัวใหญ่ด้วยขา Enable',
    slideRef: '04_combinational.pdf (หน้า 75-85)',
    formulaLatex: 'N_{decoders} = \\frac{2^{n_{target}}}{2^{n_{base}}} + \\text{Enable Drivers} = \\frac{16}{4} = 4 \\text{ ตัว} (+1 \\text{ ตัวขับ Enable})',
    variables: [
      { symbol: 'n_{target}', meaning: 'จำนวนอินพุตของ Decoder ตัวใหญ่ที่ต้องการสร้าง (เช่น 4-to-16 มี n=4)' },
      { symbol: 'n_{base}', meaning: 'จำนวนอินพุตของ Decoder ตัวเล็กที่มีอยู่ (เช่น 2-to-4 มี n=2)' },
      { symbol: '\\overline{E} \\text{ (Enable)}', meaning: 'ขาควบคุมการทำงาน (Active-Low หรือ Active-High) ใช้เลือกเปิดชิปตัวที่ต้องการ' }
    ],
    howToUse: [
      '1. นำจำนวนเอาต์พุตปลายทางตั้ง หารด้วยเอาต์พุตของชิปแต่ละตัว (เช่น 16 / 4 = 4 ตัวในแถวเอาต์พุต)',
      '2. บิตต่ำ (LSB) ต่อขนานเข้าขา Address ของ Decoder ทุกตัวพร้อมกัน',
      '3. บิตสูง (MSB) ต่อเข้า Decoder อีก 1 ตัว เพื่อส่งสัญญาณไปเลือกขา Enable ของ Decoder แถวเอาต์พุต'
    ],
    workedExample: {
      problem: 'ต้องการสร้าง Decoder ขนาด 4-to-16 โดยใช้ไอซี Decoder ขนาด 2-to-4 ที่มีขา Enable แบบ Active-Low (E\') จะต้องใช้ไอซี 2-to-4 ทั้งหมดกี่ตัว?',
      steps: [
        'ขั้นตอนที่ 1) เอาต์พุต 16 ช่อง ต้องใช้ 2-to-4 ในแถวเอาต์พุตรวม: 16 / 4 = 4 ตัว',
        'ขั้นตอนที่ 2) อินพุตบิตสูง 2 บิต (A3, A2) ต้องใช้ Decoder 2-to-4 อีก 1 ตัวเพื่อถอดรหัสไปเลือก Enable ของ 4 ตัวแรก',
        'ขั้นตอนที่ 3) จำนวนไอซีรวมทั้งหมด = 4 + 1 = 5 ตัว'
      ],
      answer: 'ใช้ไอซี Decoder 2-to-4 ทั้งหมด 5 ตัว'
    },
    examTip: 'หลักการนี้คือหัวใจของการออกแบบ Memory Address Decoder ในคอมพิวเตอร์ ที่ใช้เลือกชิปแรม (Chip Select - CS\')'
  },
  {
    id: 'f-magnitude-comparator',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'สมการวงจรเปรียบเทียบขนาด 4 บิต (4-Bit Magnitude Comparator)',
    subtitle: 'การตรวจสอบความเท่ากันด้วย XNOR และการเปรียบเทียบมากกว่า/น้อยกว่าจากบิต MSB สู่ LSB',
    slideRef: '04_combinational.pdf (หน้า 85-95)',
    formulaLatex: '(A=B) = x_3 x_2 x_1 x_0 \\quad \\text{โดย } x_i = A_i \\odot B_i \\quad , \\quad (A>B) = A_3\\bar{B}_3 + x_3 A_2\\bar{B}_2 + x_3 x_2 A_1\\bar{B}_1 + x_3 x_2 x_1 A_0\\bar{B}_0',
    variables: [
      { symbol: 'x_i = A_i \\odot B_i', meaning: 'เกต XNOR (Equality Bit): มีค่าเป็น 1 เมื่อ Ai และ Bi มีค่าเหมือนกัน (0=0 หรือ 1=1)' },
      { symbol: 'A = B', meaning: 'เงื่อนไขเท่ากัน: ทุกบิตตั้งแต่ 3 ถึง 0 ต้องเหมือนกันหมด (AND กันทุกตัว)' },
      { symbol: 'A > B', meaning: 'เงื่อนไขมากกว่า: ดูจากบิตสูงก่อน ถ้าเท่ากันจึงค่อยเลื่อนไปดูบิตถัดไป' }
    ],
    howToUse: [
      '1. สรุปความเท่ากัน (A=B): ใช้ XNOR เปรียบเทียบทีละคู่ แล้วนำผลลัพธ์มา AND กันทั้งหมด',
      '2. สรุปความมากกว่า (A>B): ถ้า A3=1 และ B3=0 ตอบ A>B ทันที ถ้าบิต 3 เท่ากัน (x3=1) ให้เช็กบิต 2 ถัดไป',
      '3. สรุปความน้อยกว่า (A<B): ทำในทำนองกลับกัน โดยเปลี่ยนเป็น A\' B'
    ],
    workedExample: {
      problem: 'เปรียบเทียบเลขฐานสอง A = 1010_2 กับ B = 1001_2 จงแสดงว่าสมการ (A>B) ให้ค่าเป็น 1 ได้อย่างไร',
      steps: [
        'บิต 3: A3=1, B3=1 -> x3 = 1 XNOR 1 = 1 (เท่ากัน เลื่อนไปดูบิต 2)',
        'บิต 2: A2=0, B2=0 -> x2 = 0 XNOR 0 = 1 (เท่ากัน เลื่อนไปดูบิต 1)',
        'บิต 1: A1=1, B1=0 -> พจน์ x3 x2 A1 B1\' = (1)(1)(1)(0\') = 1 * 1 * 1 * 1 = 1',
        'ส่งผลให้ผลรวม (A>B) = 1 ทันที โดยไม่ต้องสนใจบิต 0'
      ],
      answer: 'A > B เป็น 1 (A มีค่า 10 มากกว่า B มีค่า 9)'
    },
    examTip: 'ไอซีเปรียบเทียบมาตรฐานคือ 74HC85 มีขาต่อ Cascading Inputs (I_A>B, I_A<B, I_A=B) เพื่อขยายบิตเป็น 8 บิตหรือ 16 บิตได้'
  },
  {
    id: 'f-cd4511-pins',
    chapter: 'ch4',
    chapterName: 'บทที่ 4: Combinational Logic Circuits',
    title: 'ขาควบคุมพิเศษของไอซีถอดรหัส 7-Segment (IC CD4511)',
    subtitle: 'การทำงานของขา Lamp Test, Blanking และ Latch Enable (Active-Low Control Pins)',
    isHighYield: true,
    slideRef: '04_combinational.pdf (หน้า 88-100)',
    formulaLatex: '\\overline{LT} = 0 \\implies 8888 \\text{ (ติดหมด)} \\quad , \\quad \\overline{BI} = 0 \\implies \\text{ดับหมด} \\quad , \\quad LE = 1 \\implies \\text{แช่ค่าเดิม (Latch)}',
    variables: [
      { symbol: '\\overline{LT}', meaning: 'Lamp Test (Active-Low ขา 3): จ่าย 0 ไฟติดครบทุกขีดเป็นเลข 8 เพื่อเทสต์หลอด' },
      { symbol: '\\overline{BI}', meaning: 'Blanking Input (Active-Low ขา 4): จ่าย 0 หน้าจอดับมืดสนิททุกดวง ใช้หรี่แสงหรือประหยัดไฟ' },
      { symbol: 'LE / \\overline{EL}', meaning: 'Latch Enable (ขา 5): จ่าย 0 ข้อมูลไหลผ่าน (Transparent), จ่าย 1 ล็อกจำค่าเดิมไว้' },
    ],
    howToUse: [
      '1. ภาวะทำงานปกติ: ขา LT\' ต้องต่อไฟสูง (1), ขา BI\' ต้องต่อไฟสูง (1), ขา LE ต้องต่อลงกราวด์ (0)',
      '2. ลำดับความสำคัญสูงสุด (Highest Priority): ขา LT\' ชนะทุกขา ถ้า LT\'=0 จอจะติดเป็นเลข 8 ทันทีไม่ว่าอินพุตเป็นอะไร',
      '3. ลำดับรองลงมา: ขา BI\' ถ้า BI\'=0 จอจะดับสนิท',
      '4. ไอซี CD4511 ใช้ขับหลอด 7-Segment แบบ Common Cathode (ต่อขาร่วมลงกราวด์ ส่งไฟ 1 ขีดติด)'
    ],
    workedExample: {
      problem: 'วงจรนับตัวเลขเชื่อมกับ CD4511 ขณะที่อินพุตป้อนเลข BCD = 0101 (เลข 5) แต่ขา LT\' ต่อลงกราวด์ (0V) หน้าจอ 7-Segment จะแสดงผลเป็นตัวเลขใด?',
      steps: [
        'ขา LT\' มีสถานะเป็น 0 (Active)',
        'เนื่องจากขา LT\' (Lamp Test) มีลำดับความสำคัญสูงสุดเหนือบิตข้อมูล BCD',
        'หน้าจอจะสั่งให้ทุกเซกเมนต์ (a, b, c, d, e, f, g) สว่างขึ้นพร้อมกันทั้งหมด'
      ],
      answer: 'หน้าจอแสดงผลเป็นเลข "8" (ทดสอบหลอดติดทุกขีด)'
    },
    examTip: 'ข้อสอบถามชนิดหลอดที่ CD4511 ขับได้: ตอบทันทีว่า "Common Cathode" (ขาร่วมต่อกราวด์) ถ้าเอาไปต่อ Common Anode จอจะไม่ติดหรือทำงานกลับด้าน!'
  },

  // =========================================================================
  // CHAPTER 5: SEQUENTIAL LOGIC CIRCUITS & SMART DEVICES
  // =========================================================================
  {
    id: 'f-ff-char-eqs',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'สมการคุณลักษณะสถานะถัดไปของ Flip-Flop (Characteristic Equations)',
    subtitle: 'สมการพยากรณ์สถานะใหม่ Q(t+1) จากอินพุตและสถานะปัจจุบัน Q(t)',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 25-50)',
    formulaLatex: 'Q_{next} = D \\quad , \\quad Q_{next} = T \\oplus Q \\quad , \\quad Q_{next} = J\\bar{Q} + \\bar{K}Q \\quad , \\quad Q_{next} = S + \\bar{R}Q',
    variables: [
      { symbol: 'Q_{next} \\text{ หรือ } Q(t+1)', meaning: 'สถานะถัดไปหลังจากสัญญาณนาฬิกา Clock เปลี่ยนทริกเกอร์' },
      { symbol: 'Q \\text{ หรือ } Q(t)', meaning: 'สถานะปัจจุบันของฟลิปฟลอป' },
      { symbol: 'D \\text{ Flip-Flop}', meaning: 'Data Flip-Flop: จำตามอินพุต D ทันที (สมการง่ายสุด)' },
      { symbol: 'T \\text{ Flip-Flop}', meaning: 'Toggle Flip-Flop: ถ้า T=1 จะกลับสถานะเดิม (Q XOR T)' },
      { symbol: 'JK \\text{ Flip-Flop}', meaning: 'Universal FF: J=Set, K=Reset, J=K=1 คือ Toggle' },
      { symbol: 'SR \\text{ Flip-Flop}', meaning: 'Set-Reset: S=R=1 เป็นสถานะต้องห้าม (Invalid/Forbidden)' },
    ],
    howToUse: [
      '1. D-FF: ท่องว่า "ป้อนอะไร ได้อย่างนั้น" D=1 -> Qnext=1, D=0 -> Qnext=0',
      '2. T-FF: T=0 ค่าเดิมคงที่ (No Change), T=1 สลับด้านตรงข้าม (Toggle: 0->1, 1->0)',
      '3. JK-FF: J=0,K=0 คงเดิม / J=0,K=1 รีเซ็ตเป็น 0 / J=1,K=0 เซ็ตเป็น 1 / J=1,K=1 สลับสถานะ (Toggle)',
      '4. SR-FF: ห้ามป้อน S=1 และ R=1 พร้อมกันเด็ดขาด เพราะจะเกิดการชิงสถานะ (Race Condition)'
    ],
    workedExample: {
      problem: 'JK Flip-Flop มีสถานะปัจจุบัน Q = 1 ป้อนอินพุต J = 0, K = 1 เมื่อมีสัญญาณ Clock พัลส์เข้ามา จงหาสถานะถัดไป Q(t+1)',
      steps: [
        'ใช้สมการคุณลักษณะ: Q(t+1) = J Q\' + K\' Q',
        'แทนค่า: J = 0, K = 1, Q = 1, Q\' = 0',
        'Q(t+1) = (0)(0) + (1\')(1) = 0 + (0)(1) = 0'
      ],
      answer: 'Q(t+1) = 0 (ถูก Reset เป็น 0 ตามคำสั่ง K=1)'
    },
    examTip: 'ข้อสอบถามว่าแก้ข้อจำกัดสถานะห้ามของ SR-FF อย่างไร? ตอบ: "พัฒนาเป็น JK Flip-Flop โดยเพิ่มวงจรป้อนกลับทำให้เมื่อป้อน 1-1 กลายเป็นการ Toggle แทน"'
  },
  {
    id: 'f-ff-timing-fmax',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'ข้อกำหนดทางเวลาของ Flip-Flop และความถี่สัญญาณนาฬิกาสูงสุด (Setup, Hold, fmax)',
    subtitle: 'สูตรคำนวณคาบเวลาขั้นต่ำ (Tclk,min) และเงื่อนไขไม่ให้เกิดความผิดพลาดทางลอจิก',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 55-65)',
    formulaLatex: 'T_{clk} \\ge t_{cq} + t_{comb, max} + t_{setup} \\implies f_{max} = \\frac{1}{T_{clk, min}} \\quad , \\quad t_{cq} + t_{comb, min} \\ge t_{hold}',
    variables: [
      { symbol: 't_{setup}', meaning: 'เวลาจัดเตรียม: อินพุตต้องนิ่งเสถียรก่อนหน้าขอบ Clock จะมาถึง', unit: 'ns' },
      { symbol: 't_{hold}', meaning: 'เวลาคงค้าง: อินพุตต้องนิ่งค้างต่อหลังจากขอบ Clock ผ่านไปแล้ว', unit: 'ns' },
      { symbol: 't_{cq}', meaning: 'Clock-to-Q Delay: เวลาหน่วงนับจากขอบ Clock จนเอาต์พุต Q เปลี่ยนเสร็จ', unit: 'ns' },
      { symbol: 't_{comb}', meaning: 'เวลาหน่วงของวงจรเชิงจัดหมู่ระหว่าง Flip-Flop สองตัว', unit: 'ns' }
    ],
    howToUse: [
      '1. หาคาบเวลาสั้นที่สุดที่เป็นไปได้: T_clk >= t_cq + t_comb + t_setup',
      '2. คำนวณ f_max: นำ 1 หารด้วย T_clk ขั้นต่ำ',
      '3. หากฝ่าฝืน Setup/Hold time ฟลิปฟลอปจะเกิดสภาวะก้ำกึ่ง (Metastability) เอาต์พุตสั่นและทำงานผิดพลาด'
    ],
    workedExample: {
      problem: 'ระบบดิจิทัลมี Flip-Flop ที่มี t_cq = 3 ns, t_setup = 2 ns และระหว่างฟลิปฟลอปมีวงจรลอจิกล่าช้า t_comb = 5 ns จงหาความถี่สัญญาณนาฬิกาสูงสุด f_max',
      steps: [
        'ขั้นตอนที่ 1) คำนวณคาบเวลาขั้นต่ำ: T_clk,min = t_cq + t_comb + t_setup',
        'T_clk,min = 3 ns + 5 ns + 2 ns = 10 ns (10 * 10^-9 วินาที)',
        'ขั้นตอนที่ 2) คำนวณ f_max = 1 / T_clk,min = 1 / (10 * 10^-9) = 100,000,000 Hz = 100 MHz'
      ],
      answer: 'T_clk,min = 10 ns, f_max = 100 MHz'
    },
    examTip: 'ถ้าถามว่าสัญญาณอินพุตเปลี่ยนพร้อมขอบ Clock พอดิบพอดีจะเกิดอะไรขึ้น? ตอบ: "เกิด Setup/Hold Time Violation ทำให้เกิดสถานะ Metastable"'
  },
  {
    id: 'f-excitation-table',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'ตารางกระตุ้นของ Flip-Flop เพื่อการสังเคราะห์วงจรนับ (Excitation Table)',
    subtitle: 'ตารางค้นหาอินพุตที่ต้องป้อนให้ฟลิปฟลอป เพื่อเปลี่ยนสถานะจาก Q ไปยัง Qnext ตามที่ต้องการ',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 70-95)',
    formulaLatex: '\\begin{array}{|c|c|c|c|c|} \\hline Q \\to Q_{next} & D & T & J, K & S, R \\\\ \\hline 0 \\to 0 & 0 & 0 & 0, X & 0, X \\\\ 0 \\to 1 & 1 & 1 & 1, X & 1, 0 \\\\ 1 \\to 0 & 0 & 1 & X, 1 & 0, 1 \\\\ 1 \\to 1 & 1 & 0 & X, 0 & X, 0 \\\\ \\hline \\end{array}',
    variables: [
      { symbol: 'Q \\to Q_{next}', meaning: 'การเปลี่ยนสถานะที่โจทย์ต้องการ (ปัจจุบัน ไป ถัดไป)' },
      { symbol: 'X', meaning: 'Don\'t Care (เป็น 0 หรือ 1 ก็ได้ ช่วยให้ยุบ K-Map ได้กลุ่มใหญ่ขึ้น)' },
      { symbol: 'J, K', meaning: 'ตาราง JK มี Don\'t Care ถึง 50% ทำให้วงจรลอจิกที่สร้างออกมาเล็กและประหยัดเกตที่สุด' },
    ],
    howToUse: [
      'ขั้นตอน 5 สเต็ปในการสังเคราะห์วงจรนับหรือ FSM ในห้องสอบ:',
      '1. วาด State Diagram และเขียน State Table ระบุสถานะปัจจุบัน (Q) และสถานะถัดไป (Q_next)',
      '2. เปิดตาราง Excitation Table เพื่อเทียบหาค่าอินพุตของ FF แต่ละตัว (D, T หรือ J-K)',
      '3. นำค่าอินพุตของ FF แต่ละตัวไปพลอตลงตาราง K-Map (โดยใช้ค่า X มาช่วยจัดกลุ่ม)',
      '4. อ่านสมการที่ลดรูปได้จาก K-Map',
      '5. วาดวงจรลอจิกต่อเข้าขาอินพุตของฟลิปฟลอป'
    ],
    workedExample: {
      problem: 'ในการออกแบบวงจรนับด้วย JK Flip-Flop ถ้าในแถวหนึ่งของวงจรต้องการเปลี่ยนสถานะจาก Q = 1 ไปเป็น Q_next = 0 จะต้องป้อนอินพุต J และ K อย่างไร?',
      steps: [
        'สถานะปัจจุบัน Q = 1, สถานะที่ต้องการ Q_next = 0',
        'ดูตาราง Excitation แถว 1 -> 0 ของ JK Flip-Flop',
        'อินพุต J ต้องเป็น X (Don\'t Care เป็น 0 หรือ 1 ก็ได้)',
        'อินพุต K ต้องเป็น 1 แน่นอน เพื่อสั่ง Reset หรือ Toggle'
      ],
      answer: 'J = X, K = 1'
    },
    examTip: 'เทคนิคจำตาราง JK Excitation: ลำดับ 0->0, 0->1, 1->0, 1->1 อินพุต J จะท่องว่า "0, 1, X, X" ส่วน K จะท่องกลับด้านว่า "X, X, 1, 0"'
  },
  {
    id: 'f-ripple-counter',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'วงจรนับแบบอะซิงโครนัสและการหารความถี่ (Ripple Counter & Frequency Division)',
    subtitle: 'การต่อเอาต์พุต Q ไปขับขา Clock ของฟลิปฟลอปตัวถัดไป และการคำนวณความถี่เอาต์พุต',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 100-120)',
    formulaLatex: 'f_{out} = \\frac{f_{in}}{2^n} \\quad , \\quad \\text{Modulus (MOD)} = 2^n \\quad , \\quad t_{delay, total} = n \\times t_{pd}',
    variables: [
      { symbol: 'f_{out}', meaning: 'ความถี่ของสัญญาณสี่เหลี่ยมที่ได้จากบิตสูงสุด MSB', unit: 'Hz' },
      { symbol: 'f_{in}', meaning: 'ความถี่สัญญาณนาฬิกาอินพุตเริ่มต้น', unit: 'Hz' },
      { symbol: 'n', meaning: 'จำนวนสเตจของ Flip-Flop ที่นำมาต่ออนุกรมกัน' },
      { symbol: '2^n', meaning: 'จำนวนสถานะทั้งหมดที่วงจรนับได้ (Modulus หรือ MOD-N)' },
    ],
    howToUse: [
      '1. ฟลิปฟลอป 1 ตัวต่อแบบ Toggle (T=1 หรือ J=K=1) จะทำหน้าที่หารความถี่ลงครึ่งหนึ่งเสมอ (f / 2)',
      '2. ถ้าต่อชนกัน n ตัว ความถี่สุดท้ายที่ขา MSB จะถูกหารด้วย 2^n',
      '3. วงจรนับขึ้น (Up-Counter): ใช้ Negative Edge Trigger ต่อจากขา Q หรือ Positive Edge ต่อจากขา Q\'',
      '4. วงจรนับลง (Down-Counter): ใช้ Negative Edge Trigger ต่อจากขา Q\' หรือ Positive Edge ต่อจากขา Q'
    ],
    workedExample: {
      problem: 'ป้อนความถี่ 16 MHz เข้าสู่วงจร Ripple Counter 4 บิต (ใช้ T-FF 4 ตัว) จงหาความถี่เอาต์พุตที่บิต Q0, Q1, Q2, Q3',
      steps: [
        'Q0 (บิตที่ 1): f0 = 16 MHz / 2^1 = 8 MHz',
        'Q1 (บิตที่ 2): f1 = 16 MHz / 2^2 = 4 MHz',
        'Q2 (บิตที่ 3): f2 = 16 MHz / 2^3 = 2 MHz',
        'Q3 (บิตที่ 4 - MSB): f3 = 16 MHz / 2^4 = 1 MHz'
      ],
      answer: 'ความถี่เอาต์พุตสุดท้ายที่ Q3 คือ 1 MHz'
    },
    examTip: 'ข้อเสียสำคัญของ Ripple Counter: เกิดความล่าช้าสะสม (Accumulated Ripple Delay) ทำให้เกิดสถานะแวบสั้นๆ (Glitch) จึงไม่เหมาะกับวงจรความเร็วสูง'
  },
  {
    id: 'f-truncated-counter',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'การออกแบบวงจรนับแบบตัดตอน Modulo-N (Truncated Counter with Asynchronous Reset)',
    subtitle: 'การหาเงื่อนไขของสถานะรีเซ็ต (Reset State) และการต่อเกต NAND เข้าขา Active-Low CLR\'',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 115-130)',
    formulaLatex: 'k = \\lceil \\log_2 N \\rceil \\quad , \\quad \\overline{CLR} = \\overline{\\prod_{Q_i = 1 \\text{ at count } N} Q_i}',
    variables: [
      { symbol: 'N', meaning: 'ขนาด Modulus ที่ต้องการให้นับ (เช่น MOD-6 นับ 0 ถึง 5 แล้ววนกลับ)', },
      { symbol: 'k', meaning: 'จำนวน Flip-Flop ขั้นต่ำที่ต้องใช้ (ปัดเศษขึ้นเสมอ)', },
      { symbol: '\\overline{CLR}', meaning: 'ขา Asynchronous Clear ของฟลิปฟลอป (Active-Low: ได้รับ 0 แล้วรีเซ็ตทันที)' }
    ],
    howToUse: [
      '1. หาจำนวน FF: เช่น นับ MOD-6 ต้องใช้ k = ceil(log2 6) = 3 ตัว (เพราะ 2^3 = 8 > 6)',
      '2. หาสถานะที่ต้องสั่งตัดรีเซ็ต: วงจรนับ 0->1->2->3->4->5 เมื่อถึงเลข "6" (110 ฐานสอง) ต้องรีเซ็ตกลับไป 0 ทันที',
      '3. ดูบิตที่เป็น 1 ในเลข N: เลข 6 คือ Q2=1, Q1=1, Q0=0 บิตที่เป็น 1 คือ Q2 และ Q1',
      '4. นำบิตที่เป็น 1 เข้า NAND Gate: สัญญาณรีเซ็ต = (Q2 . Q1)\' แล้วต่อเข้าขา CLR\' ของทุกตัว'
    ],
    workedExample: {
      problem: 'ต้องการออกแบบวงจรนับ MOD-10 (BCD Counter นับ 0 ถึง 9) จงหาจำนวนฟลิปฟลอป และสมการต่อขา Active-Low Reset (CLR\')',
      steps: [
        'ขั้นตอนที่ 1) MOD-10 ต้องการ 10 สถานะ -> k = ceil(log2 10) = 4 ฟลิปฟลอป (2^4 = 16)',
        'ขั้นตอนที่ 2) วงจรนับ 0 ถึง 9 (0000 ถึง 1001) และจะถูกรีเซ็ตเมื่อเข้าสู่เลข 10',
        'ขั้นตอนที่ 3) เลข 10 ในฐานสองคือ 1010_2 (Q3=1, Q2=0, Q1=1, Q0=0)',
        'ขั้นตอนที่ 4) บิตที่เป็น 1 คือ Q3 และ Q1 ดังนั้นสมการรีเซ็ตคือ CLR\' = (Q3 . Q1)\''
      ],
      answer: 'ใช้ 4 ฟลิปฟลอป และต่อเกต NAND ระหว่าง Q3 กับ Q1 เข้าขา CLR\''
    },
    examTip: 'จุดพลาดบ่อย: นักศึกษาชอบเอาเลขสุดท้ายที่อยากให้แสดง (เลข 9) ไปรีเซ็ต ซึ่งผิด! ต้องเอาเลขถัดไป (เลข 10) ไปรีเซ็ต เพราะเลขนั้นจะแวบขึ้นมาเพียงเสี้ยวนาโนวินาทีแล้วถูกล้างทันที'
  },
  {
    id: 'f-ring-johnson-counter',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'วงจรนับแบบ Ring Counter และ Johnson (Twisted Ring) Counter',
    subtitle: 'การเปรียบเทียบจำนวนสถานะ วงจรถอดรหัส และอัตราการหารความถี่ของวงจรนับแบบเลื่อนบิต',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 135-150)',
    formulaLatex: '\\text{Ring Counter: } \\text{States} = n \\quad , \\quad \\text{Johnson Counter: } \\text{States} = 2n',
    variables: [
      { symbol: 'n', meaning: 'จำนวน Flip-Flop ในวงจรชิฟต์รีจิสเตอร์' },
      { symbol: '\\text{Ring Counter}', meaning: 'ต่อเอาต์พุต Q ตัวสุดท้ายวนกลับมาเข้า D ตัวแรก นับได้ n สถานะ (เช่น 4 FFs = 4 สถานะ)' },
      { symbol: '\\text{Johnson Counter}', meaning: 'ต่อเอาต์พุต Q\' (Inverted) ตัวสุดท้ายกลับมาเข้า D ตัวแรก นับได้ 2n สถานะ (เช่น 4 FFs = 8 สถานะ)' }
    ],
    howToUse: [
      '1. Ring Counter: มีบิต 1 วิ่งวนเพียงบิตเดียวเสมอ เช่น 1000 -> 0100 -> 0010 -> 0001 (ไม่ต้องมีวงจรถอดรหัส)',
      '2. Johnson Counter: บิตจะค่อยๆ เติม 1 จนเต็ม แล้วค่อยๆ เติม 0 เช่น 000 -> 100 -> 110 -> 111 -> 011 -> 001',
      '3. วงจรถอดรหัสของ Johnson: ใช้เพียง AND Gate 2-input ต่อ 1 สถานะเท่านั้น ปลอดจาก Glitch (Glitch-free)'
    ],
    workedExample: {
      problem: 'ถ้ามี Flip-Flop 5 ตัว นำมาต่อเป็น Ring Counter และ Johnson Counter จะนับได้กี่สถานะ และความถี่เอาต์พุตเป็นกี่เท่าของความถี่นาฬิกา f_clk?',
      steps: [
        'Ring Counter: จำนวนสถานะ = n = 5 สถานะ, อัตราหารความถี่ f_out = f_clk / 5',
        'Johnson Counter: จำนวนสถานะ = 2n = 2 * 5 = 10 สถานะ, อัตราหารความถี่ f_out = f_clk / 10'
      ],
      answer: 'Ring นับได้ 5 สถานะ (f/5), Johnson นับได้ 10 สถานะ (f/10)'
    },
    examTip: 'ข้อสอบถามว่าวงจรนับแบบใด "ไม่ต้องใช้วงจรถอดรหัสเพิ่มเติมเลย (Self-Decoding)" ตอบทันที: Ring Counter เพราะขา Q ของแต่ละตัวแทนแต่ละสถานะโดยตรง!'
  },
  {
    id: 'f-shift-register-transfer',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'การคำนวณจำนวนรอบ Clock ในการส่งผ่านข้อมูลของ Shift Register',
    subtitle: 'การเปรียบเทียบ SISO, SIPO, PISO, PIPO และเวลาที่ใช้ในการแปลงรูปแบบข้อมูล',
    slideRef: '05_sequential.pdf (หน้า 140-155)',
    formulaLatex: 'N_{SISO} = n \\text{ (In)} + n \\text{ (Out)} = 2n \\quad , \\quad N_{SIPO} = n \\quad , \\quad N_{PISO} = n-1 \\quad , \\quad N_{PIPO} = 1',
    variables: [
      { symbol: 'n', meaning: 'จำนวนบิตของข้อมูล (Data Word Size เช่น 8 บิต)' },
      { symbol: 'SISO', meaning: 'Serial-In Serial-Out: ป้อนทีละบิต อ่านออกทีละบิต ช้าที่สุดแต่ประหยัดสายไฟ' },
      { symbol: 'SIPO', meaning: 'Serial-In Parallel-Out: แปลงข้อมูลอนุกรมเป็นขนาน (รับข้อมูลจากสายเส้นเดียวมาออกบัสขนาน)' },
      { symbol: 'PISO', meaning: 'Parallel-In Serial-Out: โหลดขนานเข้าทันที แล้วทยอยเลื่อนบิตออก' },
      { symbol: 'PIPO', meaning: 'Parallel-In Parallel-Out: โหลดพร้อมกันและอ่านพร้อมกันใน 1 คาบ Clock (เร็วที่สุด)' }
    ],
    howToUse: [
      '1. SISO 8 บิต: ต้องใช้ 8 คล็อกในการป้อนเข้า และอีก 8 คล็อกในการเลื่อนอ่านออกหมด รวม 16 คล็อก',
      '2. SIPO 8 บิต: ใช้ 8 คล็อกป้อนเข้า แล้วอ่านขาออกพร้อมกันได้ทันที',
      '3. PISO 8 บิต: โหลดข้อมูลขนานเข้า (ใช้ 1 คล็อก) และเลื่อนอ่านบิตที่เหลืออีก 7 คล็อก รวมเป็น n คล็อก',
      '4. PIPO 8 บิต: เร็วที่สุด ใช้เพียง 1 คล็อกในการบันทึกข้อมูล'
    ],
    workedExample: {
      problem: 'ต้องการส่งข้อมูล 8 บิต ผ่านชิฟต์รีจิสเตอร์แบบ SISO ที่สัญญาณนาฬิกา f_clk = 10 MHz จงหาเวลาทั้งหมดตั้งแต่เริ่มป้อนจนอ่านข้อมูลบิตสุดท้ายออกหมด',
      steps: [
        'ขั้นตอนที่ 1) คาบเวลา 1 คล็อก: T_clk = 1 / (10 * 10^6) = 0.1 μs = 100 ns',
        'ขั้นตอนที่ 2) SISO 8 บิต ต้องใช้จำนวนคล็อก: โหลดเข้า 8 คล็อก + อ่านออก 8 คล็อก = 16 คล็อก (หรือนับบิตแรกออกที่คล็อกที่ 8 จะอ่านหมดที่คล็อกที่ 15)',
        'ขั้นตอนที่ 3) เวลารวม = 16 * 100 ns = 1,600 ns = 1.6 μs'
      ],
      answer: 'ใช้เวลาทั้งหมด 1.6 μs (16 รอบ Clock)'
    },
    examTip: 'ไอซี 74HC595 ยอดฮิตที่ใช้ขยายขา Arduino คือชิปแบบ SIPO (รับ 3 สายจากบอร์ด แล้วขยายออก 8 ขนาน)'
  },
  {
    id: 'f-ne555-astable',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'วงจรกำเนิดสัญญาณนาฬิกา NE555 Astable Multivibrator',
    subtitle: 'สูตรคำนวณคาบเวลาประจุ/คายประจุ ความถี่คลื่นสี่เหลี่ยม และอัตราส่วน Duty Cycle',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 150-165)',
    formulaLatex: 'T_{HIGH} = 0.693(R_A + R_B)C \\quad , \\quad T_{LOW} = 0.693(R_B)C \\quad , \\quad f = \\frac{1.44}{(R_A + 2R_B)C}',
    variables: [
      { symbol: 'f', meaning: 'ความถี่เอาต์พุตของสัญญาณนาฬิกา (Frequency)', unit: 'Hz' },
      { symbol: 'T_{HIGH}', meaning: 'เวลาที่เอาต์พุตเป็น HIGH (ประจุไฟผ่าน RA + RB เข้า C)', unit: 's' },
      { symbol: 'T_{LOW}', meaning: 'เวลาที่เอาต์พุตเป็น LOW (คายประจุผ่าน RB เข้าขา 7 Discharge)', unit: 's' },
      { symbol: 'Duty\\ Cycle', meaning: 'อัตราส่วนเวลา HIGH ต่อนคาบเวลาทั้งหมด: (RA + RB) / (RA + 2RB) * 100%', unit: '%' },
      { symbol: 'R_A, R_B', meaning: 'ตัวต้านทานกำหนดเวลาภายนอก', unit: 'Ω' },
      { symbol: 'C', meaning: 'ตัวเก็บประจุกำหนดเวลาภายนอก', unit: 'F' },
    ],
    howToUse: [
      '1. เวลา HIGH จะนานกว่าเวลา LOW เสมอ เพราะตอนประจุกระแสไหลผ่านทั้ง RA และ RB',
      '2. ตอนคายประจุ (LOW) กระแสไหลผ่านเฉพาะ RB ลงขา 7 Discharge สู่กราวด์',
      '3. Duty Cycle ของวงจรมาตรฐานนี้จะมากกว่า 50% เสมอ (ถ้าต้องการ 50% ต้องต่อไดโอดขนานคร่อม RB)',
      '4. สรุปคาบรวม: T = THIGH + TLOW = 0.693(RA + 2RB)C และ f = 1/T = 1.44 / ((RA + 2RB)C)'
    ],
    workedExample: {
      problem: 'จงออกแบบวงจรไฟกระพริบ NE555 ให้มีความถี่ f = 1 Hz พอดี โดยใช้ C = 10 μF และกำหนดให้ RA = 1 kΩ จงหาค่าความต้านทาน RB',
      steps: [
        'จากสูตร f = 1.44 / ((RA + 2*RB) * C)',
        'แทนค่า: 1 = 1.44 / ((1,000 + 2*RB) * 10 * 10^-6)',
        '(1,000 + 2*RB) * 10^-5 = 1.44',
        '1,000 + 2*RB = 1.44 / 10^-5 = 144,000',
        '2*RB = 144,000 - 1,000 = 143,000 -> RB = 71,500 Ω = 71.5 kΩ'
      ],
      answer: 'ต้องใช้ค่า RB = 71.5 kΩ (ทำให้ได้ f = 1.0 Hz)'
    },
    examTip: 'ตัวต้านทาน 3 ตัวภายในไอซี 555 มีขนาดเท่ากันคือ 5 kΩ ทำหน้าที่แบ่งแรงดันอ้างอิงเป็น 1/3 Vcc (ขา 2 Trigger) และ 2/3 Vcc (ขา 6 Threshold)'
  },
  {
    id: 'f-ne555-monostable',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'วงจรตั้งเวลาแบบพัลส์เดี่ยว (NE555 Monostable Multivibrator / One-Shot)',
    subtitle: 'การคำนวณความกว้างของพัลส์หน่วงเวลา (Pulse Width Duration) เมื่อถูกทริกเกอร์จากภายนอก',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 158-168)',
    formulaLatex: 'T_{pulse} = 1.1 \\times R_A \\times C',
    variables: [
      { symbol: 'T_{pulse}', meaning: 'ความกว้างของพัลส์เอาต์พุต HIGH หรือระยะเวลาหน่วงที่วงจรเปิดค้าง', unit: 's' },
      { symbol: 'R_A', meaning: 'ตัวต้านทานกำหนดเวลาชาร์จประจุ', unit: 'Ω' },
      { symbol: 'C', meaning: 'ตัวเก็บประจุกำหนดเวลา', unit: 'F' },
      { symbol: 'Trigger', meaning: 'ขา 2 ต้องได้รับพัลส์ตกต่ำกว่า 1/3 Vcc เพื่อเริ่มจับเวลา' }
    ],
    howToUse: [
      '1. ภาวะปกติเอาต์พุตเป็น LOW (0V)',
      '2. เมื่อมีสัญญาณพัลส์กระตุ้นเข้ามาที่ขา 2 ต่ำกว่า 1/3 Vcc เอาต์พุตจะเด้งเป็น HIGH ทันที',
      '3. C จะเริ่มชาร์จประจุผ่าน RA จนกระทั่งแรงดันถึง 2/3 Vcc แล้วเอาต์พุตจะตกลงเป็น LOW ตามเดิม',
      '4. ความกว้างของพัลส์คำนวณง่ายมาก: T = 1.1 * RA * C'
    ],
    workedExample: {
      problem: 'ต้องการออกแบบวงจรหน่วงเวลาปิดไฟทางเดินให้สว่างค้างนาน T = 5.5 วินาที หลังกดสวิตช์ ถ้าเลือกใช้ C = 100 μF จะต้องใช้ตัวต้านทาน RA ขนาดกี่ kΩ?',
      steps: [
        'จากสูตร T = 1.1 * RA * C',
        'แทนค่า: 5.5 = 1.1 * RA * (100 * 10^-6)',
        '5.5 = RA * (1.1 * 10^-4)',
        'RA = 5.5 / (1.1 * 10^-4) = 50,000 Ω = 50 kΩ'
      ],
      answer: 'ต้องใช้ตัวต้านทาน RA = 50 kΩ'
    },
    examTip: 'เปรียบเทียบ: Astable ไร้เสถียรภาพ (ผลิตพัลส์ต่อเนื่อง ไม่มีสถานะนิ่ง) ส่วน Monostable มีสถานะเสถียร 1 สถานะ (นิ่งที่ 0 รอทริกเกอร์จึงเด้งเป็น 1 ชั่วคราว)'
  },
  {
    id: 'f-fsm-rom-capacity',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'การคำนวณขนาดตาราง ROM ในวงจร FSM',
    subtitle: 'สูตรคำนวณจำนวนขา Address Lines, จำนวนแถวในตาราง และขนาด Bit Width ของ ROM',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 160-180)',
    formulaLatex: '\\text{ROM Rows} = 2^{N_{state\\_bits} + N_{inputs}} \\quad , \\quad \\text{ROM Width} = N_{state\\_bits} + N_{outputs}',
    variables: [
      { symbol: '\\text{ROM Rows}', meaning: 'จำนวนแถวทั้งหมดของหน่วยความจำ ROM (จำนวน Address Words)' },
      { symbol: 'N_{state\\_bits}', meaning: 'จำนวนบิตที่ใช้เก็บสถานะ (State Flip-Flops) เช่น 2 สถานะใช้ 1 บิต, 4 สถานะใช้ 2 บิต' },
      { symbol: 'N_{inputs}', meaning: 'จำนวนบิตสัญญาณอินพุตภายนอก' },
      { symbol: '\\text{ROM Width}', meaning: 'ความกว้างของข้อมูลเอาต์พุต ROM แต่ละแถว (Next State + Outputs)' },
    ],
    howToUse: [
      '1. นับจำนวนบิตของ State ปัจจุบัน (s) และนับจำนวนอินพุต (i)',
      '2. จำนวนสาย Address Lines = s + i',
      '3. จำนวนแถว (ความจุตาราง) = 2^(s + i)',
      '4. ข้อมูลในแต่ละแถวที่ส่งออกมาต้องมีขนาด = บิต Next State (s) + บิต Output (o)'
    ],
    workedExample: {
      problem: 'ระบบควบคุม FSM มี 4 สถานะ (States), รับอินพุตจากเซนเซอร์ภายนอก 2 เส้น และสั่งงานเอาต์พุต 3 ตัว จะต้องใช้ตาราง ROM ขนาดกี่แถวและกว้างกี่บิต?',
      steps: [
        '4 สถานะ ต้องใช้บิตจำสถานะ: s = 2 บิต (เพราะ 2^2 = 4)',
        'จำนวนอินพุต i = 2 บิต',
        'จำนวน Address Lines = s + i = 2 + 2 = 4 เส้น',
        'จำนวนแถวของ ROM = 2^4 = 16 แถว (Words)',
        'ความกว้าง Data Output = s (Next State) + o (Outputs) = 2 + 3 = 5 บิต'
      ],
      answer: 'ขนาด ROM คือ 16 แถว × 5 บิต (16 × 5 bits)'
    },
    examTip: 'โจทย์ถังพักน้ำ อ.ปวีณ: มี 2 สถานะ (State 0 ปั๊มเปิด, State 1 ปั๊มปิด) -> ใช้ 1 บิต, เซนเซอร์ 2 ตัว (a, b) -> 2 บิต รวม Address = 1+2 = 3 บิต -> ROM มี 2^3 = 8 แถว!'
  },
  {
    id: 'f-fsm-water-tank',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'แบบจำลองถังพักน้ำ FSM ปั๊มสูบน้ำอัตโนมัติ (ข้อสอบออกตรงสไลด์)',
    subtitle: 'ตาราง State Transition และเงื่อนไขการทำงานของทุ่นลอยตรวจจับระดับล่างและบน',
    isHighYield: true,
    slideRef: '05_sequential.pdf (สไลด์หน้า 165-175 / สไลด์ อ.ปวีณ)',
    formulaLatex: 'y = \\text{Pump Output} \\quad (\\text{State 0: } y=1 \\text{ ปั๊มสูบ} \\quad , \\quad \\text{State 1: } y=0 \\text{ ปั๊มตัด})',
    variables: [
      { symbol: 'a', meaning: 'ทุ่นลอยระดับล่าง (30%): 0 = ต่ำกว่าทุ่นล่าง, 1 = ท่วมทุ่นล่างแล้ว' },
      { symbol: 'b', meaning: 'ทุ่นลอยระดับบน (75%): 0 = ยังไม่ถึงทุ่นบน, 1 = น้ำเต็มท่วมทุ่นบนแล้ว' },
      { symbol: 'y', meaning: 'เอาต์พุตขับปั๊มสูบน้ำเข้าถัง (1 = ปั๊มทำงานสูบน้ำเข้า, 0 = ตัดการทำงาน)' },
      { symbol: 'S', meaning: 'สถานะระบบ: State 0 = กำลังสูบเติมน้ำ (y=1), State 1 = น้ำเต็มแล้ว พักปั๊ม (y=0)' },
    ],
    howToUse: [
      '1. เริ่มต้นน้ำแห้งหมดถัง (a=0, b=0): อยู่ใน State 0 สั่งปั๊มเปิดทำงาน (y=1)',
      '2. น้ำเริ่มสูงขึ้นท่วมทุ่นล่าง (a=1, b=0): ยังอยู่ใน State 0 สั่งปั๊มสูบต่อเนื่อง (y=1)',
      '3. น้ำสูงจนแตะทุ่นบน (a=1, b=1): เปลี่ยนไป State 1 สั่งตัดปั๊มหยุดทำงานทันที (y=0)',
      '4. น้ำถูกดึงไปใช้ ค่อยๆ ลดลงต่ำกว่าทุ่นบน (a=1, b=0): ยังคงอยู่ใน State 1 สั่งปิดปั๊มต่อ (y=0) เพื่อป้องกันปั๊มติดๆ ดับๆ (Hysteresis)',
      '5. น้ำแห้งลดลงต่ำกว่าทุ่นล่าง (a=0, b=0): เปลี่ยนกลับไป State 0 สั่งเปิดปั๊มสูบน้ำรอบใหม่'
    ],
    workedExample: {
      problem: 'ในระบบถังพักน้ำ ถ้าสถานะปัจจุบันปั๊มกำลังปิดอยู่ (State 1) แล้วน้ำลดลงจนเซนเซอร์อ่านค่าได้ a = 1, b = 0 ปั๊มจะเปิดทำงานหรือไม่?',
      steps: [
        'สถานะปัจจุบันคือ State 1 (ปั๊มปิด y = 0)',
        'เมื่อ a = 1, b = 0 น้ำยังอยู่ระหว่างระดับล่างกับระดับบน (ยังไม่แห้ง)',
        'ระบบจะคงอยู่ใน State 1 ต่อไป และปั๊มยังคง ปิด อยู่',
        'ปั๊มจะเปิดทำงานใหม่อีกครั้งเมื่อน้ำแห้งจน a = 0, b = 0 เท่านั้น'
      ],
      answer: 'ปั๊มยังไม่เปิดทำงาน (คงสถานะปิด State 1 ต่อไป)'
    },
    examTip: 'จำความแตกต่าง Moore vs Mealy: Moore เอาต์พุตขึ้นกับ State ปัจจุบันเท่านั้น (y เขียนอยู่ในวงกลม State) ส่วน Mealy เอาต์พุตขึ้นกับ State + Input ปัจจุบัน (y เขียนบนลูกศรเส้นทาง)'
  },
  {
    id: 'f-memory-capacity-expansion',
    chapter: 'ch5',
    chapterName: 'บทที่ 5: Sequential Circuits & FSM',
    title: 'การคำนวณความจุและการขยายหน่วยความจำ (RAM/ROM Capacity & Chip Cascading)',
    subtitle: 'สูตรคำนวณจำนวนสาย Address Bus, Data Bus และจำนวนชิปที่ต้องใช้ต่อขนานและอนุกรม',
    isHighYield: true,
    slideRef: '05_sequential.pdf (หน้า 170-185)',
    formulaLatex: '\\text{Capacity (bits)} = 2^k \\times m \\quad , \\quad \\text{Total Chips} = \\left( \\frac{2^{k_{req}}}{2^{k_{chip}}} \\right) \\times \\left( \\frac{m_{req}}{m_{chip}} \\right)',
    variables: [
      { symbol: 'k', meaning: 'จำนวนสายสัญญาณแอดเดรส (Address Lines) -> บ่งชี้จำนวนช่องเก็บ = 2^k คำ (Words)' },
      { symbol: 'm', meaning: 'จำนวนสายสัญญาณข้อมูล (Data Bus Lines) -> ขนาดความกว้างของแต่ละคำ (Bits per word)' },
      { symbol: 'k_{req}, m_{req}', meaning: 'ความจุของระบบที่ต้องการออกแบบ (เช่น 64K x 16 bits)' },
      { symbol: 'k_{chip}, m_{chip}', meaning: 'ความจุของชิปหน่วยความจำเดี่ยวที่มีอยู่ (เช่น 16K x 8 bits)' }
    ],
    howToUse: [
      '1. จำตัวคูณฐานสอง: 1K = 2^10 = 1,024 / 64K = 2^16 = 65,536 / 1M = 2^20 = 1,048,576',
      '2. หาจำนวนสาย Address: นำจำนวนคำมาหา log2 เช่น 64K คำ ต้องใช้ 16 เส้นแอดเดรส (A0 ถึง A15)',
      '3. ขยายความกว้างข้อมูล (ขนาน): เอา m_req / m_chip เช่น ต้องการ 16 บิต แต่ชิปมี 8 บิต ต้องต่อขนาน 2 แถว',
      '4. ขยายจำนวนช่องแอดเดรส (อนุกรม): เอา 2^k_req / 2^k_chip และใช้ Decoder เลือกชิป (Chip Select: CS\')'
    ],
    workedExample: {
      problem: 'ต้องการสร้างระบบหน่วยความจำขนาด 64K × 16 บิต โดยใช้ชิปความจำขนาด 16K × 8 บิต จงหาจำนวนสาย Address Bus ของระบบ และจำนวนชิปที่ต้องใช้ทั้งหมด',
      steps: [
        'ขั้นตอนที่ 1) 64K คำ = 64 * 1024 = 65,536 คำ = 2^16 คำ -> ต้องใช้ Address Bus = 16 เส้น (A0 ถึง A15)',
        'ขั้นตอนที่ 2) คำนวณจำนวนชิปขยายแอดเดรส: 64K / 16K = 4 แถว (ใช้ Decoder 2-to-4 ถอดรหัส A15, A14 เข้าขา CS\')',
        'ขั้นตอนที่ 3) คำนวณจำนวนชิปขยายความกว้างบิต: 16 บิต / 8 บิต = 2 คอลัมน์ (ต่อบัสข้อมูลแยก D0-D7 และ D8-D15)',
        'ขั้นตอนที่ 4) จำนวนชิปรวม = 4 * 2 = 8 ตัว'
      ],
      answer: 'Address Bus = 16 เส้น, ใช้ชิป 16K × 8 บิต ทั้งหมด 8 ตัว'
    },
    examTip: 'ข้อสอบชอบหลอกเรื่องหน่วย: Byte vs Bit! ถ้าโจทย์บอก "64 KByte" หมายถึง 64K x 8 bits แต่ถ้าโจทย์บอก "64K x 16" แปลว่าแต่ละช่องเก็บ 16 บิต (2 Bytes)!'
  }
];
