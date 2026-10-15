import { QuizQuestion } from '../types';

export const FINAL_EXAM_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // CHAPTER 3: Digital Circuit
  // ==========================================
  {
    id: 'fe-01',
    chapterId: 'ch3',
    topic: 'Analog Signal Noise & Resolution',
    difficulty: 'ปานกลาง',
    question: 'สัญญาณแรงดันไฟฟ้าแอนะล็อกอยู่ในช่วง 0 ถึง 5V มีสัญญาณรบกวนปะปนอยู่ ±0.2V สัญญาณนี้สามารถแทนข้อมูลที่มีความละเอียดแตกต่างกันได้สูงสุดไม่เกินกี่รูปแบบ?',
    options: ['25 รูปแบบ', '12 รูปแบบ', '13 รูปแบบ', '50 รูปแบบ'],
    correctAnswer: 1,
    explanation: 'ช่วงแรงดันใช้งานคือ 5 - 0 = 5V สัญญาณรบกวน ±0.2V มีช่วงกว้างทั้งหมด = 0.2 - (-0.2) = 0.4V ดังนั้นจำนวนรูปแบบสูงสุดที่แยกแยะได้โดยไม่เกิดความสับสน = 5V / 0.4V = 12.5 รูปแบบ ปัดเศษลงเพื่อความถูกต้องเป็น 12 รูปแบบ (ตรงตามสไลด์หน้า 7-8 ของ อ.ปวีณ)'
  },
  {
    id: 'fe-02',
    chapterId: 'ch3',
    topic: 'Logic Gate Functions',
    difficulty: 'ง่าย',
    question: 'เกตชนิดใดที่มีเอาต์พุตเป็น Logic 1 ก็ต่อเมื่อจำนวนบิตของอินพุตที่มีค่าเป็น "1" มีจำนวนเป็นเลขคี่ (Odd Parity)?',
    options: ['AND Gate', 'NAND Gate', 'XOR Gate', 'XNOR Gate'],
    correctAnswer: 2,
    explanation: 'XOR Gate (Exclusive-OR) ทำหน้าที่เป็น Odd Detector คือจะมีเอาต์พุตเป็น 1 เมื่อผลรวมของบิตที่เป็น 1 เป็นเลขคี่ (เช่น 001, 010, 100, 111)'
  },
  {
    id: 'fe-03',
    chapterId: 'ch3',
    topic: 'Logic Circuit Evaluation',
    difficulty: 'ปานกลาง',
    question: 'กำหนดสมการตรรกะ Y = (A + B\') · (A\' + C) หากกำหนดอินพุต A = 1, B = 1, C = 0 เอาต์พุต Y จะมีค่าเท่าใด?',
    options: ['0', '1', 'High-Z', 'ไม่สามารถคำนวณได้'],
    correctAnswer: 0,
    explanation: 'แทนค่า: A = 1, B\' = 0, A\' = 0, C = 0 จะได้ Y = (1 + 0) · (0 + 0) = 1 · 0 = 0'
  },
  {
    id: 'fe-04',
    chapterId: 'ch3',
    topic: 'Half Adder Logic',
    difficulty: 'ง่าย',
    question: 'ในวงจร Half Adder สัญญาณผลรวม (Sum) และสัญญาณตัวทด (Carry) สร้างขึ้นจากเกตชนิดใดตามลำดับ?',
    options: ['AND และ OR', 'XOR และ AND', 'OR และ AND', 'XOR และ OR'],
    correctAnswer: 1,
    explanation: 'Half Adder มีสมการ Sum = A XOR B (ใช้ XOR Gate) และ Carry = A · B (ใช้ AND Gate)'
  },
  {
    id: 'fe-05',
    chapterId: 'ch3',
    topic: 'Full Adder Architecture',
    difficulty: 'ปานกลาง',
    question: 'ข้อใดระบุสมการ Carry Out (Cout) ของวงจร Full Adder ได้ถูกต้องสมบูรณ์?',
    options: [
      'Cout = A · B · Cin',
      'Cout = A ⊕ B ⊕ Cin',
      'Cout = A·B + Cin·(A ⊕ B)',
      'Cout = (A + B) · Cin'
    ],
    correctAnswer: 2,
    explanation: 'สมการ Carry Out ของ Full Adder คือ Cout = A·B + Cin·(A ⊕ B) หรือเขียนอีกรูปหนึ่งได้เป็น A·B + B·Cin + A·Cin'
  },
  {
    id: 'fe-06',
    chapterId: 'ch3',
    topic: 'Universal Logic Gate',
    difficulty: 'ง่าย',
    question: 'หากนำขั้วอินพุตทั้งสองของ NAND Gate มาต่อรวบเข้าด้วยกันเป็นเส้นเดียว เกตดังกล่าวจะทำหน้าที่เทียบเท่ากับเกตชนิดใด?',
    options: ['AND Gate', 'OR Gate', 'NOT Gate (Inverter)', 'BUFFER'],
    correctAnswer: 2,
    explanation: 'เมื่อรวบอินพุต A = B เข้าด้วยกัน จะได้ Y = (A · A)\' = A\' ซึ่งทำหน้าที่กลับค่าตรรกะเสมือน NOT Gate'
  },
  {
    id: 'fe-07',
    chapterId: 'ch3',
    topic: 'Combinational Circuit Properties',
    difficulty: 'ง่าย',
    question: 'ข้อใดไม่ใช่คุณสมบัติของวงจรเชิงจัดหมู่ (Combinational Logic Circuit)?',
    options: [
      'เอาต์พุตขึ้นอยู่กับอินพุตปัจจุบันเท่านั้น',
      'ไม่มีหน่วยความจำและสายสัญญาณป้อนกลับ (Feedback)',
      'ต้องอาศัยสัญญาณพัลส์จาก Clock ในการเปลี่ยนสถานะเอาต์พุตเสมอ',
      'ความเร็วขึ้นอยู่กับความหน่วงในการส่งผ่านสัญญาณ (Propagation Delay) ของเกต'
    ],
    correctAnswer: 2,
    explanation: 'วงจรเชิงจัดหมู่ไม่ต้องใช้สัญญาณนาฬิกา (Clock) ในการเปลี่ยนสถานะ การเปลี่ยนสถานะจะเกิดขึ้นทันทีตาม Propagation Delay ของเกต'
  },
  {
    id: 'fe-08',
    chapterId: 'ch3',
    topic: 'Digital Signal Threshold',
    difficulty: 'ปานกลาง',
    question: 'ในระบบลอจิก TTL 5V ช่วงแรงดันระหว่าง 0.8V ถึง 2.0V เรียกว่าอะไร และมีผลอย่างไรในทางปฏิบัติ?',
    options: [
      'Logic 1 Zone ระบบจะปัดเป็น 1 เสมอ',
      'Ground Margin ระบบจะดึงลง 0 ทันที',
      'Forbidden Zone / Undefined State เป็นช่วงที่ห้ามนำสัญญาณไปใช้งานเพราะไม่สามารถระบุสถานะได้แน่นอน',
      'Linear Amplifier Zone ใช้สำหรับขยายเสียง'
    ],
    correctAnswer: 2,
    explanation: 'ช่วงแรงดันระหว่าง VIL (0.8V) และ VIH (2.0V) คือ Forbidden / Transition Zone ซึ่งห้ามให้ระดับสัญญาณค้างอยู่ในช่วงนี้เพราะอาจทำให้วงจรตีความเป็น 0 หรือ 1 แบบสุ่ม'
  },
  {
    id: 'fe-09',
    chapterId: 'ch3',
    topic: 'XNOR Equivalence',
    difficulty: 'ปานกลาง',
    question: 'สมการ Y = A·B + A\'·B\' เป็นสมการตัวแทนของลอจิกเกตชนิดใด?',
    options: ['XOR Gate', 'XNOR Gate', 'NAND Gate', 'NOR Gate'],
    correctAnswer: 1,
    explanation: 'สมการ Y = A·B + A\'·B\' จะให้เอาต์พุตเป็น 1 เมื่ออินพุตเหมือนกันทั้งคู่ (0,0 หรือ 1,1) ซึ่งตรงกับนิยามของ XNOR Gate (Equivalence Gate)'
  },
  {
    id: 'fe-10',
    chapterId: 'ch3',
    topic: 'Multi-bit Adder',
    difficulty: 'ยาก',
    question: 'หากต้องการสร้างวงจรบวกเลขฐานสองขนาด 4 บิต (4-bit Ripple Carry Adder) จะต้องใช้อุปกรณ์ใดที่ประหยัดที่สุด?',
    options: [
      'Full Adder 4 ตัว',
      'Half Adder 1 ตัว (สำหรับบิต LSB) และ Full Adder 3 ตัว',
      'Half Adder 4 ตัว และ OR Gate 4 ตัว',
      'Half Adder 8 ตัว'
    ],
    correctAnswer: 1,
    explanation: 'บิตแรกสุด (LSB) ไม่จำเป็นต้องรับตัวทดจากภายนอก จึงสามารถใช้ Half Adder 1 ตัวได้ ส่วนบิตที่ 1, 2, 3 ต้องรับตัวทดจากบิตก่อนหน้า จึงต้องใช้ Full Adder 3 ตัว'
  },

  // ==========================================
  // CHAPTER 4: Digital Circuit Simplification
  // ==========================================
  {
    id: 'fe-11',
    chapterId: 'ch4',
    topic: 'De Morgan Theorems',
    difficulty: 'ง่าย',
    question: 'ตามทฤษฎีบทของเดอมอร์แกน นิพจน์ (A · B · C)\' มีค่าเท่ากับข้อใด?',
    options: [
      'A\' · B\' · C\'',
      'A\' + B\' + C\'',
      'A + B + C',
      '(A + B + C)\''
    ],
    correctAnswer: 1,
    explanation: 'เดอมอร์แกน: การกลับค่าของผลคูณ (NAND) เท่ากับผลบวกของตัวแปรที่ถูกกลับค่าแต่ละตัว (Inverted OR) นั่นคือ (A·B·C)\' = A\' + B\' + C\''
  },
  {
    id: 'fe-12',
    chapterId: 'ch4',
    topic: 'Boolean Algebra Laws',
    difficulty: 'ปานกลาง',
    question: 'จงลดรูปสมการบูลีน F = A + A\'·B + A·B\' ให้เป็นรูปที่สั้นที่สุด',
    options: ['A', 'A + B', 'A + B\'', '1'],
    correctAnswer: 1,
    explanation: 'จัดรูป: F = (A + A·B\') + A\'·B = A + A\'·B (ตามกฎ Absorption A + AB\' = A) จากนั้นใช้กฎ Consensus: A + A\'·B = A + B'
  },
  {
    id: 'fe-13',
    chapterId: 'ch4',
    topic: 'Minterm Representation',
    difficulty: 'ง่าย',
    question: 'ในระบบ 3 ตัวแปร (A, B, C) โดย A เป็น MSB พจน์ Minterm m6 แทนด้วยนิพจน์ใด?',
    options: ['A · B · C\'', 'A · B\' · C', 'A\' · B · C', 'A · B · C'],
    correctAnswer: 0,
    explanation: 'เลข 6 ฐานสิบ คือ 110 ในฐานสอง ดังนั้น A=1, B=1, C=0 จึงเขียนเป็น m6 = A · B · C\''
  },
  {
    id: 'fe-14',
    chapterId: 'ch4',
    topic: 'Maxterm Representation',
    difficulty: 'ปานกลาง',
    question: 'ในระบบ 3 ตัวแปร (A, B, C) พจน์ Maxterm M2 แทนด้วยนิพจน์ใด?',
    options: ['A\' + B + C\'', 'A + B\' + C', 'A + B + C\'', 'A\' · B · C\''],
    correctAnswer: 1,
    explanation: 'เลข 2 ฐานสิบ คือ 010 ฐานสอง สำหรับ Maxterm ตัวแปรที่เป็น 0 เขียนรูปปกติ และตัวแปรที่เป็น 1 เขียนรูปบาร์ (กลับกันกับ Minterm) ดังนั้น A=0 (A), B=1 (B\'), C=0 (C) จึงได้ M2 = A + B\' + C'
  },
  {
    id: 'fe-15',
    chapterId: 'ch4',
    topic: 'K-Map Gray Code Sequence',
    difficulty: 'ง่าย',
    question: 'การจัดลำดับหัวตารางของ Karnaugh Map ใช้รหัส Gray Code แบบใด?',
    options: [
      '00, 01, 10, 11',
      '00, 01, 11, 10',
      '00, 10, 01, 11',
      '01, 10, 11, 00'
    ],
    correctAnswer: 1,
    explanation: 'Gray Code สลับระหว่าง 11 และ 10 เพื่อให้แต่ละช่องที่อยู่ติดกันมีค่าต่างกันเพียงบิตเดียวเท่านั้น (00 -> 01 -> 11 -> 10)'
  },
  {
    id: 'fe-16',
    chapterId: 'ch4',
    topic: 'K-Map 4-Corner Grouping',
    difficulty: 'ปานกลาง',
    question: 'ใน K-Map ขนาด 4 ตัวแปร (A,B,C,D) หากมีเลข 1 อยู่ที่เซลล์ 0, 2, 8, 10 ผลลัพธ์จากการรวมกลุ่มทั้ง 4 ช่องนี้คือข้อใด?',
    options: ['A\' · C\'', 'B\' · D\'', 'B · D', 'A\' · D\''],
    correctAnswer: 1,
    explanation: 'เซลล์ 0, 2, 8, 10 คือมุมทั้ง 4 แถว AB = 00 และ 10 มีตัวร่วมคือ B=0 (B\') ส่วนคอลัมน์ CD = 00 และ 10 มีตัวร่วมคือ D=0 (D\') รวมกันได้ B\' · D\''
  },
  {
    id: 'fe-17',
    chapterId: 'ch4',
    topic: 'Don\'t Care Condition',
    difficulty: 'ปานกลาง',
    question: 'สภาวะไม่สนใจ (Don\'t Care Condition: d หรือ X) ใน Karnaugh Map มีประโยชน์อย่างไร?',
    options: [
      'บังคับให้ต้องรวมกลุ่ม X ทุกตัวลงในสมการสุดท้ายเสมอ',
      'สามารถเลือกให้เป็น 1 ได้เพื่อช่วยขยายขนาดกลุ่มให้ใหญ่ขึ้น หรือปล่อยให้เป็น 0 ถ้าไม่จำเป็น',
      'ใช้แทนสัญญาณ Clock ในวงจร',
      'ทำให้สมการเปลี่ยนจาก SOP กลายเป็น POS อัตโนมัติ'
    ],
    correctAnswer: 1,
    explanation: 'Don\'t Care สามารถเลือกให้เป็น 1 เพื่อขยายกลุ่มของ 1 ให้ใหญ่ขึ้น (ลดจำนวนตัวแปรได้มากขึ้น) และสามารถเพิกเฉย (ปล่อยเป็น 0) สำหรับช่องที่ไม่ได้ช่วยขยายกลุ่ม'
  },
  {
    id: 'fe-18',
    chapterId: 'ch4',
    topic: 'Universal NAND Implementation',
    difficulty: 'ปานกลาง',
    question: 'หากมีสมการบูลีนในรูปผลบวกของผลคูณขั้นต่ำ (Minimum SOP): Y = AB + CD สามารถแปลงเป็นวงจรที่ใช้เกตชนิดเดียวกันได้ตามข้อใด?',
    options: [
      'ใช้วงจร NOR-NOR สองระดับ',
      'ใช้วงจร NAND-NAND สองระดับ โดยไม่ต้องเปลี่ยนตัวแปรอินพุต',
      'ใช้วงจร AND-NAND สองระดับ',
      'ใช้วงจร XOR ล้วน'
    ],
    correctAnswer: 1,
    explanation: 'วงจร AND-OR (SOP) เทียบเท่ากับวงจร NAND-NAND 2 ระดับอย่างสมบูรณ์ตามทฤษฎีเดอมอร์แกน'
  },
  {
    id: 'fe-19',
    chapterId: 'ch4',
    topic: 'Essential Prime Implicant',
    difficulty: 'ยาก',
    question: 'คำว่า Essential Prime Implicant (EPI) ในการลดรูป K-Map หมายถึงกลุ่มลักษณะใด?',
    options: [
      'กลุ่มที่มีขนาดใหญ่ที่สุดในตารางเสมอ',
      'กลุ่มที่มีเลข 1 อย่างน้อย 1 ช่องที่ไม่ถูกคลุมโดยกลุ่ม Prime Implicant อื่นใดเลย',
      'กลุ่มที่รวมช่อง Don\'t Care ไว้อย่างน้อย 2 ช่อง',
      'กลุ่มที่ไม่สามารถรวมกับกลุ่มอื่นได้อีกแต่ไม่จำเป็นต้องใส่ในคำตอบ'
    ],
    correctAnswer: 1,
    explanation: 'EPI คือ Prime Implicant ที่ครอบคลุมช่อง minterm อย่างน้อย 1 ช่องที่ไม่ถูกกลุ่มอื่นใดคลุมเลย ดังนั้นกลุ่มนี้จึงเป็น "กลุ่มจำเป็น" ที่ขาดไม่ได้ในคำตอบ'
  },
  {
    id: 'fe-20',
    chapterId: 'ch4',
    topic: 'Boolean Simplification',
    difficulty: 'ยาก',
    question: 'จงหาผลลัพธ์ของการลดรูปฟังก์ชัน F(A, B, C) = Σ m(0, 2, 4, 6)',
    options: ['C\'', 'C', 'A\' · B\'', 'B\''],
    correctAnswer: 0,
    explanation: 'm(0, 2, 4, 6) คือช่องที่มี C = 0 ทั้งหมด ไม่ว่า A และ B จะเป็นค่าใด (00, 01, 10, 11) ดังนั้นเมื่อจัดกลุ่ม 4 เซลล์นี้ ตัวแปร A และ B จะถูกตัดออกทั้งหมด เหลือเพียง C\' เท่านั้น'
  },

  // ==========================================
  // CHAPTER 5: Sequential Circuit
  // ==========================================
  {
    id: 'fe-21',
    chapterId: 'ch5',
    topic: '555 Timer Astable Frequency',
    difficulty: 'ปานกลาง',
    question: 'วงจร Astable 555 ต่อด้วย R1 = 1kΩ, R2 = 3.3kΩ และ C = 0.1μF จงหาคาบเวลาของสัญญาณ HIGH (TH)?',
    options: ['0.298 ms', '0.229 ms', '0.528 ms', '1.44 ms'],
    correctAnswer: 0,
    explanation: 'สูตร: TH = 0.693 · (R1 + R2) · C = 0.693 · (1000 + 3300) · 0.1×10^-6 = 0.693 · 4300 · 10^-7 = 0.00029799 s ≈ 0.298 ms'
  },
  {
    id: 'fe-22',
    chapterId: 'ch5',
    topic: '555 Timer Duty Cycle',
    difficulty: 'ปานกลาง',
    question: 'เหตุใดวงจร Astable 555 แบบมาตรฐานจึงมีค่า Duty Cycle มากกว่า 50% เสมอ?',
    options: [
      'เพราะแรงดันไฟเลี้ยง Vcc สูงกว่าแรงดันกราวด์',
      'เพราะช่วงเวลา TH = 0.693(R1+R2)C ซึ่งกระแสชาร์จผ่าน R1+R2 ส่วนช่วง TL = 0.693(R2)C กระแสดิสชาร์จผ่าน R2 เท่านั้น ทำให้ TH > TL เสมอ',
      'เพราะตัวเก็บประจุ C คายประจุเร็วกว่าการประจุ',
      'เพราะมีไดโอดภายในไอซีบล็อกกระแสไว้'
    ],
    correctAnswer: 1,
    explanation: 'ช่วงชาร์จ (TH) กระแสไหลผ่านทั้ง R1 และ R2 ส่วนช่วงดิสชาร์จ (TL) ไหลผ่านเฉพาะ R2 ทำให้ความต้านทานช่วงชาร์จมากกว่า ส่งผลให้ TH > TL เสมอ ค่า Duty Cycle = TH / (TH + TL) จึงมากกว่า 50%'
  },
  {
    id: 'fe-23',
    chapterId: 'ch5',
    topic: 'SR Latch Invalid State',
    difficulty: 'ง่าย',
    question: 'ใน SR Latch ที่สร้างจาก NOR Gate สภาวะใดที่จัดเป็น Forbidden / Invalid State ที่ห้ามป้อน?',
    options: ['S = 0, R = 0', 'S = 0, R = 1', 'S = 1, R = 0', 'S = 1, R = 1'],
    correctAnswer: 3,
    explanation: 'สำหรับ NOR SR Latch ถ้าป้อน S=1 และ R=1 พร้อมกัน จะบีบให้ทั้ง Q และ Q\' มีค่าเป็น 0 ทั้งคู่ ซึ่งขัดกับหลักการที่ Q และ Q\' ต้องตรงข้ามกัน จึงถือเป็นสภาวะห้ามใช้'
  },
  {
    id: 'fe-24',
    chapterId: 'ch5',
    topic: 'JK Flip-Flop Operation',
    difficulty: 'ง่าย',
    question: 'หากป้อนอินพุต J = 1 และ K = 1 ให้แก่ JK Flip-Flop เมื่อขอบสัญญาณนาฬิกามาถึง จะเกิดอะไรขึ้นกับเอาต์พุต Q?',
    options: [
      'Q กลายเป็น 0 เสมอ (Reset)',
      'Q กลายเป็น 1 เสมอ (Set)',
      'Q จะกลับค่าตรรกะตรงข้ามกับค่าเดิม (Toggle)',
      'เกิดการลัดวงจรภายในชิป'
    ],
    correctAnswer: 2,
    explanation: 'เมื่อ J=1, K=1 ฟลิปฟลอป JK จะทำงานในโหมด Toggle โดยเปลี่ยนจาก 0 เป็น 1 หรือจาก 1 เป็น 0'
  },
  {
    id: 'fe-25',
    chapterId: 'ch5',
    topic: 'JK Excitation Table',
    difficulty: 'เข้มข้น',
    question: 'หากต้องการให้สถานะของ JK Flip-Flop เปลี่ยนจาก Q = 0 ไปเป็น Q_next = 1 จะต้องป้อนอินพุต J และ K ตามข้อใด?',
    options: ['J = 0, K = X', 'J = 1, K = X', 'J = X, K = 0', 'J = X, K = 1'],
    correctAnswer: 1,
    explanation: 'จาก 0 ไป 1 ทำได้สองวิธีคือ Set (J=1, K=0) หรือ Toggle (J=1, K=1) สังเกตว่า J ต้องเป็น 1 แน่นอน ส่วน K เป็น 0 หรือ 1 ก็ได้ ดังนั้น J = 1, K = X'
  },
  {
    id: 'fe-26',
    chapterId: 'ch5',
    topic: 'Ripple Counter Propagation Delay',
    difficulty: 'ปานกลาง',
    question: 'วงจรนับแบบ Ripple Counter ขนาด 4 บิต ใช้ฟลิปฟลอปที่มีความหน่วงเวลา tpd = 25 ns หากต่อเรียงกัน ความหน่วงเวลารวมทั้งหมดของวงจรมีค่าเท่าใด?',
    options: ['25 ns', '50 ns', '100 ns', '200 ns'],
    correctAnswer: 2,
    explanation: 'Ripple Counter มีความหน่วงสะสมแบบลูกโซ่: t_total = N · tpd = 4 · 25 ns = 100 ns'
  },
  {
    id: 'fe-27',
    chapterId: 'ch5',
    topic: 'Modulo-N Counter Sizing',
    difficulty: 'ง่าย',
    question: 'หากต้องการออกแบบวงจรนับแบบ Modulo-12 (นับเลข 0 ถึง 11) จะต้องใช้ Flip-Flop อย่างน้อยที่สุดกี่ตัว?',
    options: ['3 ตัว', '4 ตัว', '5 ตัว', '12 ตัว'],
    correctAnswer: 1,
    explanation: 'สูตร: 2^n >= N โดย N = 12 ถ้าใช้ n = 3 จะได้ 2^3 = 8 (ไม่พอ) ดังนั้นต้องใช้ n = 4 เพราะ 2^4 = 16 >= 12 จึงต้องใช้ Flip-Flop อย่างน้อย 4 ตัว'
  },
  {
    id: 'fe-28',
    chapterId: 'ch5',
    topic: 'Moore vs Mealy FSM',
    difficulty: 'ปานกลาง',
    question: 'ข้อใดคือข้อแตกต่างสำคัญระหว่างเครื่องจักรสถานะแบบ Moore (Moore Machine) กับ Mealy (Mealy Machine)?',
    options: [
      'Moore Machine ใช้ฟลิปฟลอปมากกว่า Mealy เสมอ 2 เท่า',
      'Output ของ Moore ขึ้นอยู่กับสถานะปัจจุบันเท่านั้น ส่วน Mealy ขึ้นอยู่กับสถานะปัจจุบันและอินพุตปัจจุบันพร้อมกัน',
      'Moore Machine ไม่สามารถใช้สัญญาณนาฬิกาควบคุมได้',
      'Mealy Machine ไม่สามารถต่อร่วมกับ ROM ได้'
    ],
    correctAnswer: 1,
    explanation: 'นิยามหลัก: Moore Output = f(State) เท่านั้น ขณะที่ Mealy Output = f(State, Input)'
  },
  {
    id: 'fe-29',
    chapterId: 'ch5',
    topic: 'Water Pump FSM Control (Dr. Paween Slide)',
    difficulty: 'ยาก',
    question: 'ในระบบควบคุมระดับน้ำ (เซ็นเซอร์ a=ล่าง, b=บน, ปั๊ม y) ของ อ.ปวีณ หากปัจจุบันปั๊มกำลังปิดอยู่ (State ปิดปั๊ม) และน้ำถูกใช้จนระดับลดลงมาอยู่ที่ a=1, b=0 ปั๊มน้ำจะทำงานอย่างไร?',
    options: [
      'เปิดปั๊มทันที',
      'ยังคงปิดปั๊มต่อไป จนกว่าระดับน้ำจะลดลงจนแห้งต่ำกว่าเซ็นเซอร์ a (a=0, b=0)',
      'ปั๊มน้ำจะเริ่มทำงานด้วยความเร็วครึ่งหนึ่ง',
      'ระบบจะแจ้งเตือนข้อผิดพลาด'
    ],
    correctAnswer: 1,
    explanation: 'นี่คือระบบป้องกันปั๊มกระตุก (Hysteresis): ขณะที่ปั๊มปิดอยู่ แม้น้ำจะลดลงต่ำกว่า b แต่ยังอยู่เหนือ a ปั๊มจะยังคงปิดต่อไป จนกว่าน้ำจะลดลงจนแห้งต่ำกว่า a (a=0, b=0) จึงจะเริ่มเปิดปั๊มใหม่อีกครั้ง'
  },
  {
    id: 'fe-30',
    chapterId: 'ch5',
    topic: 'FSM ROM Address Sizing',
    difficulty: 'ยาก',
    question: 'หากต้องการนำ FSM ที่มี 8 สถานะ และมีสัญญาณอินพุตภายนอก 3 ตัว ไปสร้างเป็นวงจรควบคุมโดยใช้ ROM เป็นหน่วยความจำหลัก ขา Address ของ ROM จะต้องมีขนาดกี่บิต?',
    options: ['3 บิต', '5 บิต', '6 บิต', '8 บิต'],
    correctAnswer: 2,
    explanation: '8 สถานะ ต้องใช้บิตระบุสถานะ = ⌈log2(8)⌉ = 3 บิต รวมกับสัญญาณอินพุตภายนอก 3 บิต ทำให้ Address ของ ROM ต้องมีขนาด = 3 + 3 = 6 บิต (มีตำแหน่งข้อมูล 2^6 = 64 แถว)'
  }
];
