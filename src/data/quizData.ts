import { QuizQuestion } from '../types';

export const FINAL_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    "id": "fe-01",
    "chapterId": "ch3",
    "topic": "Analog Signal Noise & Resolution",
    "difficulty": "ปานกลาง",
    "question": "สัญญาณแรงดันไฟฟ้าแอนะล็อกอยู่ในช่วง 0 ถึง 5V มีสัญญาณรบกวนปะปนอยู่ ±0.2V สัญญาณนี้สามารถแทนข้อมูลที่มีความละเอียดแตกต่างกันได้สูงสุดไม่เกินกี่รูปแบบ?",
    "options": [
      "25 รูปแบบ",
      "12 รูปแบบ",
      "13 รูปแบบ",
      "50 รูปแบบ"
    ],
    "correctAnswer": 1,
    "explanation": "ช่วงแรงดันใช้งานคือ 5 - 0 = 5V สัญญาณรบกวน ±0.2V มีช่วงกว้างทั้งหมด = 0.2 - (-0.2) = 0.4V ดังนั้นจำนวนรูปแบบสูงสุดที่แยกแยะได้โดยไม่เกิดความสับสน = 5V / 0.4V = 12.5 รูปแบบ ปัดเศษลงเพื่อความถูกต้องเป็น 12 รูปแบบ (ตรงตามสไลด์หน้า 7-8 ของ อ.ปวีณ)"
  },
  {
    "id": "fe-02",
    "chapterId": "ch3",
    "topic": "Logic Gate Functions",
    "difficulty": "ง่าย",
    "question": "เกตชนิดใดที่มีเอาต์พุตเป็น Logic 1 ก็ต่อเมื่อจำนวนบิตของอินพุตที่มีค่าเป็น \"1\" มีจำนวนเป็นเลขคี่ (Odd Parity)?",
    "options": [
      "AND Gate",
      "NAND Gate",
      "XOR Gate",
      "XNOR Gate"
    ],
    "correctAnswer": 2,
    "explanation": "XOR Gate (Exclusive-OR) ทำหน้าที่เป็น Odd Detector คือจะมีเอาต์พุตเป็น 1 เมื่อผลรวมของบิตที่เป็น 1 เป็นเลขคี่ (เช่น 001, 010, 100, 111)"
  },
  {
    "id": "fe-03",
    "chapterId": "ch3",
    "topic": "Logic Circuit Evaluation",
    "difficulty": "ปานกลาง",
    "question": "กำหนดสมการตรรกะ Y = (A + B') · (A' + C) หากกำหนดอินพุต A = 1, B = 1, C = 0 เอาต์พุต Y จะมีค่าเท่าใด?",
    "options": [
      "0",
      "1",
      "High-Z",
      "ไม่สามารถคำนวณได้"
    ],
    "correctAnswer": 0,
    "explanation": "แทนค่า: A = 1, B' = 0, A' = 0, C = 0 จะได้ Y = (1 + 0) · (0 + 0) = 1 · 0 = 0"
  },
  {
    "id": "fe-04",
    "chapterId": "ch3",
    "topic": "Half Adder Logic",
    "difficulty": "ง่าย",
    "question": "ในวงจร Half Adder สัญญาณผลรวม (Sum) และสัญญาณตัวทด (Carry) สร้างขึ้นจากเกตชนิดใดตามลำดับ?",
    "options": [
      "AND และ OR",
      "XOR และ AND",
      "OR และ AND",
      "XOR และ OR"
    ],
    "correctAnswer": 1,
    "explanation": "Half Adder มีสมการ Sum = A ⊕ B (ใช้ XOR Gate) และ Carry = A · B (ใช้ AND Gate)"
  },
  {
    "id": "fe-05",
    "chapterId": "ch3",
    "topic": "Full Adder Architecture",
    "difficulty": "ปานกลาง",
    "question": "วงจรบวกเต็มตัว (Full Adder) สามารถสร้างขึ้นจากการประกอบกันของวงจรใด?",
    "options": [
      "2 Half Adders และ 1 OR Gate",
      "2 Half Adders และ 1 AND Gate",
      "1 Half Adder และ 2 OR Gates",
      "3 Half Adders"
    ],
    "correctAnswer": 0,
    "explanation": "Full Adder ประกอบด้วย Half Adder ตัวแรกบวก A และ B, Half Adder ตัวที่สองบวกผลรวมกับ Cin, และใช้ OR Gate รวมตัวทดจากทั้งสองตัวเข้าด้วยกัน Cout = Carry1 + Carry2"
  },
  {
    "id": "fe-06",
    "chapterId": "ch3",
    "topic": "Full Subtractor Logic",
    "difficulty": "ยาก",
    "question": "ในวงจรลบเต็มตัว (Full Subtractor) สัญญาณขอยืม (Borrow Out: Bout) มีสมการตรรกะตรงกับข้อใด เมื่ออินพุตคือ A (ตัวตั้ง), B (ตัวลบ), Bin (ขอยืมเข้า)?",
    "options": [
      "Bout = A'B + A'Bin + BBin",
      "Bout = AB + ABin + BBin",
      "Bout = A'B' + A'Bin + B'Bin",
      "Bout = A ⊕ B ⊕ Bin"
    ],
    "correctAnswer": 0,
    "explanation": "สมการของ Full Subtractor: Diff = A ⊕ B ⊕ Bin และ Bout = A'B + A'Bin + BBin (ตัวตั้ง A มีบาร์เนื่องจากถูกขอยืม)"
  },
  {
    "id": "fe-07",
    "chapterId": "ch3",
    "topic": "2's Complement Arithmetic",
    "difficulty": "ปานกลาง",
    "question": "การคำนวณ 5 - 3 ในระบบเลขฐานสองแบบ 4-bit 2's Complement คือข้อใด?",
    "options": [
      "0101 + 1101 = (1)0010 = 2",
      "0101 + 0011 = 1000 = -8",
      "0101 + 1100 = 0001 = 1",
      "0101 - 0011 = 0010"
    ],
    "correctAnswer": 0,
    "explanation": "+5 คือ 0101, +3 คือ 0011 แปลงเป็น 2's comp ได้ 1100 + 1 = 1101 นำมาบวกกัน: 0101 + 1101 = 10010 ตัด Carry นอกสุดทิ้งเหลือ 0010 (+2)"
  },
  {
    "id": "fe-08",
    "chapterId": "ch3",
    "topic": "Multiplexer Operation",
    "difficulty": "ปานกลาง",
    "question": "มัลติเพล็กเซอร์ขนาด 4-to-1 (4:1 MUX) มีสายเลือก (Select lines) S1 S0 = 1 0 เอาต์พุต Y จะส่งผ่านข้อมูลจากอินพุตใด?",
    "options": [
      "D0",
      "D1",
      "D2",
      "D3"
    ],
    "correctAnswer": 2,
    "explanation": "Select line 1 0 ในเลขฐานสองมีค่าเท่ากับ 2 (S1=1, S0=0) ดังนั้นสัญญาณจากช่อง D2 จะถูกส่งออกไปยังเอาต์พุต Y"
  },
  {
    "id": "fe-09",
    "chapterId": "ch3",
    "topic": "R-2R Ladder DAC",
    "difficulty": "ยาก",
    "question": "ข้อใดคือข้อได้เปรียบหลักของวงจรแปลงดิจิทัลเป็นแอนะล็อกแบบ R-2R Ladder เมื่อเทียบกับแบบ Binary-Weighted Resistor DAC?",
    "options": [
      "ใช้ตัวต้านทานเพียง 2 ค่า (R และ 2R) ทำให้ผลิตลงบนชิปไอซีได้ง่ายและแม่นยำสูง",
      "ใช้แรงดันไฟฟ้าน้อยกว่า 10 เท่า",
      "ไม่ต้องใช้ Op-Amp ในการแปลงกระแสเป็นแรงดัน",
      "มีความเร็วในการแปลงสูงกว่า Flash ADC"
    ],
    "correctAnswer": 0,
    "explanation": "Binary-weighted ต้องใช้ตัวต้านทานหลายค่าที่มีอัตราส่วนกว้างมาก (R, 2R, 4R, 8R, 16R...) ซึ่งผลิตบนชิปให้มีความแม่นยำเท่ากันยากมาก แต่ R-2R Ladder ใช้ตัวต้านทานเพียง 2 ขนาดเท่านั้น"
  },
  {
    "id": "fe-10",
    "chapterId": "ch3",
    "topic": "Flash ADC Comparators",
    "difficulty": "ปานกลาง",
    "question": "หากต้องการสร้างวงจรแปลงแอนะล็อกเป็นดิจิทัลความเร็วสูงแบบ Flash ADC ขนาด 8 บิต จะต้องใช้วงจรเปรียบเทียบแรงดัน (Comparator) จำนวนกี่ตัว?",
    "options": [
      "8 ตัว",
      "16 ตัว",
      "255 ตัว",
      "256 ตัว"
    ],
    "correctAnswer": 2,
    "explanation": "สูตรจำนวน Comparator ของ Flash ADC = 2^n - 1 สำหรับ 8 บิต = 2^8 - 1 = 256 - 1 = 255 ตัว"
  },
  {
    "id": "fe-11",
    "chapterId": "ch3",
    "topic": "Noise Margin Limits",
    "difficulty": "ปานกลาง",
    "question": "กำหนดระดับแรงดันไอซีดิจิทัล: V_OH(min) = 4.4V, V_IH(min) = 3.5V, V_IL(max) = 1.5V, V_OL(max) = 0.4V ค่า High-level Noise Margin (V_NMH) มีค่าเท่าใด?",
    "options": [
      "0.9V",
      "1.1V",
      "2.0V",
      "2.9V"
    ],
    "correctAnswer": 0,
    "explanation": "V_NMH = V_OH(min) - V_IH(min) = 4.4V - 3.5V = 0.9V"
  },
  {
    "id": "fe-12",
    "chapterId": "ch3",
    "topic": "Noise Margin Low",
    "difficulty": "ปานกลาง",
    "question": "จากข้อมูลระดับแรงดันเดียวกัน: V_IL(max) = 1.5V, V_OL(max) = 0.4V ค่า Low-level Noise Margin (V_NML) มีค่าเท่าใด?",
    "options": [
      "0.9V",
      "1.1V",
      "1.9V",
      "0.4V"
    ],
    "correctAnswer": 1,
    "explanation": "V_NML = V_IL(max) - V_OL(max) = 1.5V - 0.4V = 1.1V"
  },
  {
    "id": "fe-13",
    "chapterId": "ch3",
    "topic": "Lab 7: Chopper Circuit",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 7 เมื่อป้อนสัญญาณ Input A เป็น Sine 100Hz และ Input B เป็น Square 1000Hz ควบคุมสวิตช์รีเลย์ การเพิ่มความถี่ของ Input B เป็น 3000Hz ส่งผลต่อสัญญาณ Output อย่างไร?",
    "options": [
      "ความถี่ของรูปคลื่นหลัก Sine ลดลงเหลือ 33Hz",
      "จำนวนรอยสับของคลื่น (Chops) ต่อหนึ่งคาบ Sine เพิ่มขึ้นเป็น 3 เท่า ทำให้รูปคลื่น Output มีความถี่ของสัญญาณสวิตชิ่งสูงขึ้นและคาบการสับสั้นลง",
      "แอมพลิจูดของยอดคลื่นเพิ่มขึ้นเป็น 30V",
      "รูปคลื่น Output กลายเป็นสัญญาณไฟตรง (DC) 0V ทันที"
    ],
    "correctAnswer": 1,
    "explanation": "Input B ทำหน้าที่เป็น Carrier สับสัญญาณ Sine 100Hz เมื่อความถี่ Input B เพิ่มจาก 1000Hz เป็น 3000Hz จำนวนรอบการสับใน 1 คาบของ Sine (10ms) จะเพิ่มจาก 10 ครั้งเป็น 30 ครั้ง คาบเวลาการสับสั้นลงตามการทดลองในใบงานที่ 7"
  },
  {
    "id": "fe-14",
    "chapterId": "ch3",
    "topic": "Lab 7: 74HC04 Hex Inverter",
    "difficulty": "ง่าย",
    "question": "ไอซีเบอร์ 74HC04 ประกอบด้วยลอจิกเกตชนิดใด และมีจำนวนกี่เกตภายในตัวถัง 14 ขา?",
    "options": [
      "AND Gate จำนวน 4 เกต",
      "NOT Gate (Inverter) จำนวน 6 เกต",
      "NAND Gate จำนวน 4 เกต",
      "OR Gate จำนวน 4 เกต"
    ],
    "correctAnswer": 1,
    "explanation": "74HC04 คือ Hex Inverter มี NOT Gate ทั้งหมด 6 ตัว โดยขา 14 คือ VCC (+5V) และขา 7 คือ GND"
  },
  {
    "id": "fe-15",
    "chapterId": "ch3",
    "topic": "Lab 7: 74HC08 Quad AND",
    "difficulty": "ง่าย",
    "question": "ไอซีเบอร์ 74HC08 คือเกตชนิดใด และขาไฟเลี้ยง VCC และ GND อยู่ที่ขาใดตามลำดับ?",
    "options": [
      "Quad 2-Input AND Gate, ขา 14 (VCC) และ ขา 7 (GND)",
      "Quad 2-Input OR Gate, ขา 16 (VCC) และ ขา 8 (GND)",
      "Hex Inverter, ขา 14 (VCC) และ ขา 7 (GND)",
      "Quad 2-Input XOR Gate, ขา 1 (VCC) และ ขา 14 (GND)"
    ],
    "correctAnswer": 0,
    "explanation": "74HC08 เป็น Quad 2-Input AND Gate (มี 4 เกต) ใช้ไฟเลี้ยง VCC ที่ขา 14 และกราวด์ GND ที่ขา 7"
  },
  {
    "id": "fe-16",
    "chapterId": "ch3",
    "topic": "Lab 7: 74HC32 Quad OR",
    "difficulty": "ง่าย",
    "question": "หากป้อนอินพุต A=0, B=0 ให้กับลอจิกเกตในไอซี 74HC32 เอาต์พุตที่ได้จะมีค่าเท่าใด?",
    "options": [
      "0",
      "1",
      "High-Z",
      "ไฟกระพริบ"
    ],
    "correctAnswer": 0,
    "explanation": "74HC32 คือ Quad 2-input OR Gate สมการ Y = A + B เมื่อ A=0, B=0 จะได้ 0 + 0 = 0"
  },
  {
    "id": "fe-17",
    "chapterId": "ch3",
    "topic": "Lab 7: 74HC86 Quad XOR",
    "difficulty": "ง่าย",
    "question": "ไอซีเบอร์ 74HC86 คือเกตชนิดใด และให้เอาต์พุตเป็น 1 ในกรณีใด?",
    "options": [
      "Quad 2-Input XOR Gate, ให้เอาต์พุต 1 เมื่ออินพุตทั้งสองมีค่าต่างกัน (0,1 หรือ 1,0)",
      "Quad 2-Input XNOR Gate, ให้เอาต์พุต 1 เมื่ออินพุตเหมือนกัน",
      "Dual D-Flip Flop, ให้เอาต์พุต 1 เมื่อมีสัญญาณนาฬิกา",
      "Quad NAND Gate, ให้เอาต์พุต 1 เมื่อมีขาใดขาหนึ่งเป็น 0"
    ],
    "correctAnswer": 0,
    "explanation": "74HC86 คือ Exclusive-OR (XOR) Gate สมการ Y = A ⊕ B เอาต์พุตเป็น 1 เมื่ออินพุตต่างกัน"
  },
  {
    "id": "fe-18",
    "chapterId": "ch3",
    "topic": "Lab 7: XNOR Implementation",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 7 ข้อ 6 การต่อวงจร XNOR (y = a ⊙ b) จากไอซี 74HC86 และ 74HC04 มีขั้นตอนการต่ออย่างไร?",
    "options": [
      "นำเอาต์พุตของ 74HC86 (XOR) ไปต่อเข้าอินพุตของ 74HC04 (NOT) เพื่อกลับค่าสัญญาณ",
      "นำเอาต์พุตของ 74HC04 ไปต่อเข้าขาไฟเลี้ยงของ 74HC86",
      "ต่ออินพุตทั้งสองเข้า 74HC04 ก่อน แล้วนำเอาต์พุตมาเข้า 74HC86",
      "ต่อแบบขนานระหว่าง 74HC86 กับ 74HC04"
    ],
    "correctAnswer": 0,
    "explanation": "สมการ XNOR คือ นิเสธของ XOR (y = (a ⊕ b)' = a ⊙ b) จึงนำเอาต์พุตของ XOR (74HC86) ไปผ่าน Inverter (74HC04)"
  },
  {
    "id": "fe-19",
    "chapterId": "ch3",
    "topic": "Lab 7: 2-to-4 Decoder LED Mapping",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 7 ข้อ 7 วงจรถอดรหัส 4 หลอด LED (L1, L2, L3, L4) กำหนดสมการ L1 = b'a', L2 = ba', L3 = b'a, L4 = ba เมื่อสับสวิตช์อินพุต b = 1, a = 0 หลอด LED ใดจะติดสว่าง?",
    "options": [
      "L1",
      "L2",
      "L3",
      "L4"
    ],
    "correctAnswer": 1,
    "explanation": "แทนค่า b=1, a=0: L1 = 0·1 = 0, L2 = 1·(0)' = 1·1 = 1, L3 = 0·0 = 0, L4 = 1·0 = 0 ดังนั้นหลอด L2 ติดสว่าง"
  },
  {
    "id": "fe-20",
    "chapterId": "ch3",
    "topic": "Lab 7: Pull-down Resistor",
    "difficulty": "ปานกลาง",
    "question": "เหตุใดในการต่อ DIP Switch ป้อนอินพุตลอจิกเข้าไอซีดิจิทัล จึงจำเป็นต้องต่อตัวต้านทาน Pull-down (10kΩ) ลงกราวด์?",
    "options": [
      "เพื่อป้องกันภาวะลอยตัว (Floating / High-Z) ในขณะที่สวิตช์เปิดวงจร (OFF) เพื่อดึงแรงดันให้เป็น Logic 0 อย่างแน่นอน",
      "เพื่อเพิ่มแรงดันให้สูงกว่า 12V",
      "เพื่อกลับขั้วของสัญญาณดิจิทัล",
      "เพื่อเปลี่ยนสัญญาณดิจิทัลให้เป็นสัญญาณแอนะล็อก"
    ],
    "correctAnswer": 0,
    "explanation": "เมื่อสวิตช์เปิดวงจร ขาอินพุตของไอซีจะลอย (Floating) ไวต่อสัญญาณรบกวนทำให้สถานะไม่แน่นอน ตัวต้านทาน Pull-down ทำหน้าที่ดึงแรงดันลงกราวด์ (0V / Logic 0)"
  },
  {
    "id": "fe-21",
    "chapterId": "ch3",
    "topic": "Lab 7: LED Current Limiting Resistor",
    "difficulty": "ปานกลาง",
    "question": "หากต่อหลอด LED สีแดง (แรงดันตกคร่อม VF = 2.0V, กระแสใช้งาน IF = 15mA) กับไฟเลี้ยง VCC = 5.0V ของไอซี ควรเลือกค่าตัวต้านทานจำกัดกระแส (Current-limiting Resistor) ค่ามาตรฐานใด?",
    "options": [
      "220 Ω",
      "10 kΩ",
      "1 kΩ",
      "10 Ω"
    ],
    "correctAnswer": 0,
    "explanation": "คำนวณจากกฎของโอห์ม: R = (VCC - VF) / IF = (5.0V - 2.0V) / 0.015A = 3.0V / 0.015A = 200 Ω ค่ามาตรฐาน E24 ที่ใกล้เคียงและปลอดภัยคือ 220 Ω"
  },
  {
    "id": "fe-22",
    "chapterId": "ch3",
    "topic": "Lab 8: Full Adder SOP Equations",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 8 ข้อ 1 วงจรบวกเต็มตัว Full Adder มีสมการ Sum (y) ในรูป Sum of Minterms แบบสมบูรณ์ตรงกับข้อใด?",
    "options": [
      "y = a'b'c + a'bc' + ab'c' + abc",
      "y = abc + abc + abc + abc",
      "y = a'b'c' + a'bc + ab'c + abc'",
      "y = ab + bc + ca"
    ],
    "correctAnswer": 0,
    "explanation": "สมการผลรวมของ Full Adder: Sum = m1 + m2 + m4 + m7 = a'b'c + a'bc' + ab'c' + abc ซึ่งลดรูปได้เป็น a ⊕ b ⊕ c"
  },
  {
    "id": "fe-23",
    "chapterId": "ch3",
    "topic": "Lab 8: Traffic Light Controller Logic",
    "difficulty": "ยาก",
    "question": "ในใบงานที่ 8 ข้อ 2 วงจรไฟข้ามถนน มีปุ่มกดขอข้าม 2 ฝั่งคือ i และ j โดยไฟคนข้ามสีเขียว (HUMAN GREEN) และไฟรถสีแดง (CAR RED) จะติดเมื่อมีคนกดปุ่มใดปุ่มหนึ่ง สมการของไฟสัญญาณทั้งสองคือข้อใด?",
    "options": [
      "HUMAN GREEN = CAR RED = i + j",
      "HUMAN GREEN = CAR RED = i · j",
      "HUMAN GREEN = CAR RED = (i + j)'",
      "HUMAN GREEN = CAR RED = i ⊕ j"
    ],
    "correctAnswer": 0,
    "explanation": "เมื่อมีการกดปุ่มฝั่งใดฝั่งหนึ่ง (i=1 หรือ j=1) ไฟคนข้ามต้องเขียวและไฟรถต้องแดง ดังนั้นสมการคือ a = i + j (OR Gate)"
  },
  {
    "id": "fe-24",
    "chapterId": "ch3",
    "topic": "Lab 8: Traffic Light Car Green Logic",
    "difficulty": "ยาก",
    "question": "จากระบบไฟข้ามถนนเดียวกัน ไฟรถสีเขียว (CAR GREEN) และไฟคนสีแดง (HUMAN RED) จะติดเมื่อ \"ไม่มีใครกดปุ่มขอข้ามเลย\" สมการตรรกะคือข้อใด?",
    "options": [
      "CAR GREEN = HUMAN RED = i' · j' = (i + j)'",
      "CAR GREEN = HUMAN RED = i + j",
      "CAR GREEN = HUMAN RED = i · j",
      "CAR GREEN = HUMAN RED = 1 เสมอ"
    ],
    "correctAnswer": 0,
    "explanation": "ไม่มีใครกดปุ่มคือ i=0 และ j=0 นั่นคือ i' · j' ตามกฎเดอมอร์แกนเท่ากับ (i + j)' (NOR Logic)"
  },
  {
    "id": "fe-25",
    "chapterId": "ch3",
    "topic": "Lab 8: 7-Segment Grade A Encoding",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 8 ข้อ 3 การแสดงตัวอักษร \"A\" บนหลอด 7-Segment (เรียงขา a,b,c,d,e,f,g) ขาใดจะต้องดับ (Logic 0) เพื่อให้มองเห็นเป็นตัว A ชัดเจน?",
    "options": [
      "ขา d (ขีดล่างสุด)",
      "ขา g (ขีดกลาง)",
      "ขา a (ขีดบนสุด)",
      "ขา b (ขวาบน)"
    ],
    "correctAnswer": 0,
    "explanation": "ตัวอักษร A ประกอบด้วยเส้น a, b, c, e, f, g ติดสว่าง (1) และเส้นฐานล่าง d ต้องดับ (0) รูปแบบคือ 1110111"
  },
  {
    "id": "fe-26",
    "chapterId": "ch3",
    "topic": "Lab 8: 7-Segment Grade C Encoding",
    "difficulty": "ปานกลาง",
    "question": "การแสดงตัวอักษร \"C\" บนหลอด 7-Segment ต้องส่งลอจิกให้เซกเมนต์ใดติดสว่างบ้าง?",
    "options": [
      "a, d, e, f ติดสว่าง (1001110)",
      "a, b, c, d ติดสว่าง (1111000)",
      "b, c, e, f ติดสว่าง (0110110)",
      "ทุกหลอดติดสว่าง"
    ],
    "correctAnswer": 0,
    "explanation": "ตัวอักษร C ติดเฉพาะขอบนอกซ้าย บน ล่าง: เส้น a (บน), d (ล่าง), e (ซ้ายล่าง), f (ซ้ายบน) ส่วน b, c, g ต้องดับ"
  },
  {
    "id": "fe-27",
    "chapterId": "ch3",
    "topic": "DAC Resolution & LSB",
    "difficulty": "ยาก",
    "question": "วงจร DAC ขนาด 10 บิต มีแรงดันอ้างอิง Vref = 10.24V จงหาค่าแรงดันของบิตที่มีนัยสำคัญต่ำสุด (1 LSB)?",
    "options": [
      "10 mV",
      "1 mV",
      "10.24 mV",
      "20 mV"
    ],
    "correctAnswer": 0,
    "explanation": "1 LSB = Vref / 2^n = 10.24V / 2^10 = 10.24V / 1024 = 0.010V = 10 mV"
  },
  {
    "id": "fe-28",
    "chapterId": "ch3",
    "topic": "SAR ADC Working Principle",
    "difficulty": "ปานกลาง",
    "question": "วงจร ADC แบบ Successive Approximation Register (SAR) มีหลักการทำงานคล้ายกับสิ่งใด?",
    "options": [
      "การค้นหาข้อมูลแบบ Binary Search โดยเริ่มเดาทีละบิตจาก MSB ไปหา LSB",
      "การนับทีละ 1 ตั้งแต่ 0 จนถึงค่าแรงดันอินพุต",
      "การเปรียบเทียบกับแรงดันอ้างอิงพร้อมกันทุกระดับในจังหวะเดียว",
      "การหาอนุพันธ์ของสัญญาณอินพุต"
    ],
    "correctAnswer": 0,
    "explanation": "SAR ADC ใช้หลักการ Binary Search ทดสอบบิตโดยตั้ง MSB=1 แล้วเทียบกับ Vin ถ้าเกินจะเคลียร์เป็น 0 ถ้าไม่เกินจะเก็บ 1 ไว้ แล้วทำต่อกับบิตถัดไป ใช้เวลา n คาบสัญญาณนาฬิกา"
  },
  {
    "id": "fe-29",
    "chapterId": "ch3",
    "topic": "Universal Logic with 2:1 MUX",
    "difficulty": "ยาก",
    "question": "หากต้องการสร้าง NOT Gate โดยใช้ 2-to-1 MUX (Y = S'·I0 + S·I1) โดยให้สัญญาณอินพุตเข้าที่ขา Select (S) ต้องต่ออินพุต I0 และ I1 อย่างไร?",
    "options": [
      "I0 = 1 (VCC), I1 = 0 (GND)",
      "I0 = 0 (GND), I1 = 1 (VCC)",
      "I0 = S, I1 = S'",
      "I0 = 0, I1 = 0"
    ],
    "correctAnswer": 0,
    "explanation": "เมื่อ S=0 ต้องการ Y=1 ดังนั้น I0 ต้องเป็น 1 เมื่อ S=1 ต้องการ Y=0 ดังนั้น I1 ต้องเป็น 0 จะได้ Y = S'(1) + S(0) = S'"
  },
  {
    "id": "fe-30",
    "chapterId": "ch3",
    "topic": "Implementing AND with 2:1 MUX",
    "difficulty": "ยาก",
    "question": "หากต้องการสร้าง AND Gate (Y = A · B) โดยใช้ 2-to-1 MUX โดยให้ A ต่อเข้าขา Select (S) ต้องต่ออินพุต I0 และ I1 อย่างไร?",
    "options": [
      "I0 = 0, I1 = B",
      "I0 = B, I1 = 0",
      "I0 = 1, I1 = B",
      "I0 = B, I1 = 1"
    ],
    "correctAnswer": 0,
    "explanation": "สมการ MUX: Y = A'·I0 + A·I1 เมื่อ A=0 ได้ Y=0 (เลือก I0=0) เมื่อ A=1 ได้ Y=B (เลือก I1=B) รวมกันได้ Y = A'·0 + A·B = A·B"
  },
  {
    "id": "fe-31",
    "chapterId": "ch4",
    "topic": "De Morgan's First Law",
    "difficulty": "ง่าย",
    "question": "ตามกฎของเดอมอร์แกน (De Morgan's Theorem) นิพจน์ (A + B)' มีค่าเท่ากับข้อใด?",
    "options": [
      "A' · B'",
      "A' + B'",
      "A · B",
      "(A · B)'"
    ],
    "correctAnswer": 0,
    "explanation": "กฎเดอมอร์แกนข้อที่ 1: ตัดบาร์ เปลี่ยนเครื่องหมาย (A + B)' = A' · B'"
  },
  {
    "id": "fe-32",
    "chapterId": "ch4",
    "topic": "De Morgan's Second Law",
    "difficulty": "ง่าย",
    "question": "ตามกฎของเดอมอร์แกน นิพจน์ (A · B)' มีค่าเท่ากับข้อใด?",
    "options": [
      "A' + B'",
      "A' · B'",
      "(A + B)'",
      "A + B"
    ],
    "correctAnswer": 0,
    "explanation": "กฎเดอมอร์แกนข้อที่ 2: (A · B)' = A' + B'"
  },
  {
    "id": "fe-33",
    "chapterId": "ch4",
    "topic": "Absorption Law",
    "difficulty": "ปานกลาง",
    "question": "นิพจน์ A + A · B เมื่อทำการลดรูปด้วยกฎการดูดกลืน (Absorption Law) จะได้ผลลัพธ์เป็นข้อใด?",
    "options": [
      "A",
      "B",
      "A + B",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "A + AB = A(1 + B) = A(1) = A"
  },
  {
    "id": "fe-34",
    "chapterId": "ch4",
    "topic": "Absorption Variant",
    "difficulty": "ปานกลาง",
    "question": "นิพจน์ A + A' · B ลดรูปได้ผลลัพธ์ตรงกับข้อใด?",
    "options": [
      "A + B",
      "A · B",
      "A' + B",
      "A"
    ],
    "correctAnswer": 0,
    "explanation": "A + A'B = (A + A')(A + B) = 1 · (A + B) = A + B"
  },
  {
    "id": "fe-35",
    "chapterId": "ch4",
    "topic": "Consensus Theorem",
    "difficulty": "ยาก",
    "question": "นิพจน์ AB + A'C + BC สามารถตัดเทอมใดทิ้งได้ตามทฤษฎีฉันทามติ (Consensus Theorem)?",
    "options": [
      "เทอม BC",
      "เทอม AB",
      "เทอม A'C",
      "ไม่สามารถตัดเทอมใดทิ้งได้"
    ],
    "correctAnswer": 0,
    "explanation": "ทฤษฎี Consensus: AB + A'C + BC = AB + A'C เพราะ BC = BC(A + A') = ABC + A'BC ซึ่งถูกเทอม AB และ A'C กลืนไปแล้ว"
  },
  {
    "id": "fe-36",
    "chapterId": "ch4",
    "topic": "Universal NAND Logic",
    "difficulty": "ปานกลาง",
    "question": "หากต้องการสร้างวงจร OR Gate (Y = A + B) โดยใช้เฉพาะ NAND Gate จะต้องใช้ NAND Gate อย่างน้อยกี่ตัว?",
    "options": [
      "3 ตัว",
      "2 ตัว",
      "4 ตัว",
      "1 ตัว"
    ],
    "correctAnswer": 0,
    "explanation": "จากกฎเดอมอร์แกน A + B = ((A + B)')' = (A' · B')' ต้องใช้ NAND 2 ตัวทำ Inverter ให้ A และ B และตัวที่ 3 ทำหน้าที่รวม (A' · B')' รวมเป็น 3 ตัว"
  },
  {
    "id": "fe-37",
    "chapterId": "ch4",
    "topic": "Universal NOR Logic",
    "difficulty": "ปานกลาง",
    "question": "หากต้องการสร้างวงจร AND Gate (Y = A · B) โดยใช้เฉพาะ NOR Gate จะต้องใช้ NOR Gate อย่างน้อยกี่ตัว?",
    "options": [
      "3 ตัว",
      "2 ตัว",
      "4 ตัว",
      "1 ตัว"
    ],
    "correctAnswer": 0,
    "explanation": "A · B = ((A · B)')' = (A' + B')' ต้องใช้ NOR 2 ตัวกลับค่า A, B และอีก 1 ตัวรวมสัญญาณ รวมเป็น 3 ตัว"
  },
  {
    "id": "fe-38",
    "chapterId": "ch4",
    "topic": "Minterm Representation",
    "difficulty": "ง่าย",
    "question": "มินเทอม m5 ของฟังก์ชัน 3 ตัวแปร F(A, B, C) เขียนเป็นผลคูณของตัวแปรบูลีนได้ตรงกับข้อใด?",
    "options": [
      "A · B' · C",
      "A' · B · C'",
      "A · B · C'",
      "A' · B' · C"
    ],
    "correctAnswer": 0,
    "explanation": "เลข 5 ในฐานสองคือ 101 สำหรับ Minterm บิต 1 คือตัวแปรปกติ บิต 0 คือตัวแปรติดบาร์ ดังนั้น 101 คือ A · B' · C"
  },
  {
    "id": "fe-39",
    "chapterId": "ch4",
    "topic": "Maxterm Representation",
    "difficulty": "ปานกลาง",
    "question": "แมกซ์เทอม M2 ของฟังก์ชัน 3 ตัวแปร F(A, B, C) เขียนเป็นผลบวกของตัวแปรบูลีนได้ตรงกับข้อใด?",
    "options": [
      "A + B' + C",
      "A' + B + C'",
      "A · B' · C",
      "A + B + C'"
    ],
    "correctAnswer": 0,
    "explanation": "เลข 2 ในฐานสองคือ 010 สำหรับ Maxterm บิต 0 คือตัวแปรปกติ บิต 1 คือตัวแปรติดบาร์ ดังนั้น 010 คือ A + B' + C"
  },
  {
    "id": "fe-40",
    "chapterId": "ch4",
    "topic": "K-Map Gray Code Sequence",
    "difficulty": "ง่าย",
    "question": "ลำดับหัวแถวหรือหัวคอลัมน์ของแผนผังคาร์โนห์ (K-Map) 2 บิต ต้องเรียงลำดับอย่างไร และเป็นรหัสแบบใด?",
    "options": [
      "00, 01, 11, 10 (Gray Code)",
      "00, 01, 10, 11 (Binary Code)",
      "11, 10, 01, 00",
      "00, 10, 01, 11"
    ],
    "correctAnswer": 0,
    "explanation": "K-Map ต้องเรียงแบบ Gray Code (00, 01, 11, 10) เพื่อให้ช่องที่อยู่ติดกันมีบิตเปลี่ยนแปลงเพียง 1 บิตเท่านั้น ซึ่งเป็นเงื่อนไขสำคัญในการดึงตัวแปรร่วมออก"
  },
  {
    "id": "fe-41",
    "chapterId": "ch4",
    "topic": "K-Map Group Sizing",
    "difficulty": "ง่าย",
    "question": "การจัดกลุ่ม (Grouping) ใน K-Map สามารถจับกลุ่มช่องที่มีเลข 1 ขนาดกี่ช่องได้บ้าง?",
    "options": [
      "1, 2, 4, 8, 16 ช่อง (เลขยกกำลังของ 2)",
      "1, 2, 3, 4, 5 ช่อง",
      "2, 4, 6, 8, 10 ช่อง (เลขคู่ใดๆ)",
      "3, 6, 9, 12 ช่อง"
    ],
    "correctAnswer": 0,
    "explanation": "การรวมกลุ่มใน K-Map ต้องมีขนาดเป็นเลขยกกำลังของ 2 (2^n) เสมอ เช่น 1, 2, 4, 8, 16 ช่อง เพื่อให้ตัวแปรหักล้างกันได้อย่างสมบูรณ์"
  },
  {
    "id": "fe-42",
    "chapterId": "ch4",
    "topic": "K-Map Four Corners Grouping",
    "difficulty": "ยาก",
    "question": "ใน K-Map ขนาด 4 ตัวแปร (AB \\ CD) การจับกลุ่มมุมทั้งสี่ (ช่อง 0, 2, 8, 10) จะได้สมการลดรูปเป็นข้อใด?",
    "options": [
      "B' · D'",
      "A' · C'",
      "B · D",
      "A' · D'"
    ],
    "correctAnswer": 0,
    "explanation": "ช่อง 0 (0000), 2 (0010), 8 (1000), 10 (1010): แถว AB คือ 00 กับ 10 ตัวแปร B คงที่ที่ 0 (B') คอลัมน์ CD คือ 00 กับ 10 ตัวแปร D คงที่ที่ 0 (D') รวมเป็น B' · D'"
  },
  {
    "id": "fe-43",
    "chapterId": "ch4",
    "topic": "Don't Care Optimization",
    "difficulty": "ปานกลาง",
    "question": "ข้อใดอธิบายบทบาทของเงื่อนไข Don't Care (X) ในการลดรูปด้วย K-Map ได้ถูกต้องที่สุด?",
    "options": [
      "สามารถเลือกให้เป็น 1 ได้เพื่อขยายกลุ่มเลข 1 ให้มีขนาดใหญ่ขึ้น หรือเลือกเป็น 0 หากไม่ช่วยขยายกลุ่ม",
      "ต้องบังคับให้รวม X ทุกตัวลงในกลุ่มเสมอ",
      "X มีค่าเป็นกึ่งตัวแปร ไม่สามารถรวมกับเลข 1 ได้",
      "ห้ามนำ X มาจับกลุ่มเด็ดขาด"
    ],
    "correctAnswer": 0,
    "explanation": "Don't Care (X) คือสภาวะที่อินพุตไม่มีวันเกิดขึ้นจริงในการใช้งาน เราจึงเลือกให้เป็น 1 เพื่อช่วยขยายกลุ่มของ 1 ให้ใหญ่ขึ้นเพื่อลดจำนวนตัวแปร หรือทิ้งให้เป็น 0 ถ้าไม่ช่วยอะไร"
  },
  {
    "id": "fe-44",
    "chapterId": "ch4",
    "topic": "Lab 9: Binary to Gray Code Formulas",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 9 การออกแบบวงจรแปลงรหัสไบนารี 3 บิต (b2 b1 b0) เป็นรหัสเกรย์ (g2 g1 g0) มีสมการที่ถูกต้องตรงกับข้อใด?",
    "options": [
      "g2 = b2,  g1 = b2 ⊕ b1,  g0 = b1 ⊕ b0",
      "g2 = b2,  g1 = b1 ⊕ b0,  g0 = b1 ⊕ b2",
      "g2 = b2', g1 = b1', g0 = b0'",
      "g2 = b0,  g1 = b1,  g0 = b2"
    ],
    "correctAnswer": 0,
    "explanation": "สูตรแปลง Binary เป็น Gray: บิตสูงสุด g2 = b2, บิตถัดมา g1 = b2 ⊕ b1, บิตล่างสุด g0 = b1 ⊕ b0 (ในโจทย์ใบงานมีพิมพ์ผิดเป็น b1 xor b2 ซึ่งถูกต้องคือ b1 xor b0 ตามวงจร)"
  },
  {
    "id": "fe-45",
    "chapterId": "ch4",
    "topic": "Lab 9: Gray Code Conversion Value",
    "difficulty": "ง่าย",
    "question": "เลขฐานสอง (110)₂ เมื่อแปลงเป็นรหัสเกรย์ (Gray Code) จะมีค่าเท่าใด?",
    "options": [
      "101",
      "111",
      "011",
      "100"
    ],
    "correctAnswer": 0,
    "explanation": "b2=1, b1=1, b0=0: g2 = 1, g1 = 1 ⊕ 1 = 0, g0 = 1 ⊕ 0 = 1 รวมเป็น 101"
  },
  {
    "id": "fe-46",
    "chapterId": "ch4",
    "topic": "Lab 9: Greenhouse Fan Controller K-Map",
    "difficulty": "ยาก",
    "question": "ในใบงานที่ 9 วงจรควบคุมพัดลมโรงเรือนเพาะต้นกล้า มีเซ็นเซอร์ ชื้น(a), ร้อน(b), ฝน(c), แสง(d) พัดลมเปิดเมื่อมีแสง (d=1) ตามเงื่อนไข และเวลากลางคืนไม่มีแสง (d=0) พัดลมจะปิดเสมอ เมื่อใส่ K-Map ร่วมกับ Don't Care ลดรูปได้สมการใด?",
    "options": [
      "y = d",
      "y = a + b + c",
      "y = cd",
      "y = a'b + cd"
    ],
    "correctAnswer": 0,
    "explanation": "จากเงื่อนไข เมื่อ d=0 ทุกช่องเป็น 0 เมื่อ d=1 เงื่อนไขที่กำหนดและ Don't care ทำให้ทั้ง 8 ช่องในระนาบ d=1 สามารถรวมเป็นกลุ่มขนาด 8 ได้ ส่งผลให้ยุบเหลือเพียง y = d (มีแสงพัดลมเปิด)"
  },
  {
    "id": "fe-47",
    "chapterId": "ch4",
    "topic": "Lab 9: CD4511 Lamp Test Function",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 9 ไอซี CD4511 ขา Lamp Test (LT') ทำหน้าที่อะไรเมื่อป้อนลอจิก 0 เข้าที่ขานี้?",
    "options": [
      "บังคับให้หลอด 7-Segment ทุกเซกเมนต์ติดสว่างพร้อมกัน (ทดสอบหลอด)",
      "บังคับให้หลอดทุกเซกเมนต์ดับทั้งหมด",
      "ล็อกค่าการแสดงผลไว้ไม่ให้เปลี่ยนแปลง",
      "รีเซ็ตตัวนับภายในไอซี"
    ],
    "correctAnswer": 0,
    "explanation": "ขา LT' (Active-LOW) เมื่อป้อน 0 จะสั่งเปิดทุกหลอด (a ถึง g เป็น 1 ทั้งหมด) เพื่อทดสอบว่าไม่มีหลอดใดขาด"
  },
  {
    "id": "fe-48",
    "chapterId": "ch4",
    "topic": "Lab 9: CD4511 Blanking Input",
    "difficulty": "ปานกลาง",
    "question": "ขา Blanking Input (BI') ของไอซี CD4511 เมื่อป้อนลอจิก 0 (โดยที่ LT' = 1) จะเกิดผลลัพธ์อย่างไร?",
    "options": [
      "หลอด 7-Segment จะดับสนิททุกหลอด (a ถึง g เป็น 0)",
      "หลอดจะติดสว่างเป็นเลข 8",
      "หลอดจะแสดงผลตามค่าอินพุตปกติ",
      "ไอซีจะร้อนจัดและเสียหาย"
    ],
    "correctAnswer": 0,
    "explanation": "ขา BI' (Active-LOW Blanking) เมื่อเป็น 0 จะสั่งตัดไฟเอาต์พุต ทำให้หลอดดับสนิท ใช้สำหรับประหยัดพลังงานหรือทำไฟกระพริบ"
  },
  {
    "id": "fe-49",
    "chapterId": "ch4",
    "topic": "Lab 9: CD4511 Latch Enable",
    "difficulty": "ปานกลาง",
    "question": "ขา Latch Enable (LE) ของไอซี CD4511 มีพฤติกรรมการทำงานอย่างไรเมื่อเปลี่ยนจาก 0 เป็น 1?",
    "options": [
      "เมื่อ LE = 0 จะถอดรหัสแบบทะลุผ่าน (Transparent) และเมื่อ LE = 1 จะล็อกค่าที่แสดงค้างไว้ แม้อินพุต BCD จะเปลี่ยนไป",
      "เมื่อ LE = 1 หลอดจะดับทั้งหมด",
      "เมื่อ LE = 1 จะสลับเป็นระบบเลขฐานสิบหก",
      "ไม่มีผลต่อการทำงาน"
    ],
    "correctAnswer": 0,
    "explanation": "CD4511 มีหน่วยความจำ Latch ภายใน: LE=0 รับค่าใหม่ทันที, LE=1 จำค่าเดิมค้างไว้ที่หน้าจอ"
  },
  {
    "id": "fe-50",
    "chapterId": "ch4",
    "topic": "Lab 9: CD4511 Invalid BCD Inputs",
    "difficulty": "ยาก",
    "question": "เมื่อป้อนอินพุตเลขฐานสองที่มีค่าเกินเลขฐานสิบ (10 ถึง 15 เช่น 1010 หรือ 1111) เข้าไอซี CD4511 ผลการแสดงผลจะเป็นอย่างไร?",
    "options": [
      "หลอด 7-Segment จะดับสนิททุกดวง (Blanked)",
      "แสดงผลเป็นตัวอักษร A, b, C, d, E, F",
      "แสดงผลเป็นเลข 0 เสมอ",
      "หลอดจะติดทุกดวงเป็นเลข 8"
    ],
    "correctAnswer": 0,
    "explanation": "ตามตารางความจริงของ CD4511 ในใบงานที่ 9 หากอินพุตเกิน 9 (ค่า 10 ถึง 15) เอาต์พุต a-g จะเป็น 0 ทั้งหมด (ดับสนิท) แตกต่างจาก 7447 ที่แสดงสัญลักษณ์พิเศษ"
  },
  {
    "id": "fe-51",
    "chapterId": "ch4",
    "topic": "Essential Prime Implicant",
    "difficulty": "ยาก",
    "question": "Prime Implicant (PI) ใดจะถูกจัดว่าเป็น Essential Prime Implicant (EPI)?",
    "options": [
      "กลุ่มที่ครอบคลุมมินเทอม 1 อย่างน้อยหนึ่งตัวที่ไม่ถูกกลุ่มอื่นใดครอบคลุมเลย",
      "กลุ่มที่มีขนาดใหญ่ที่สุดใน K-Map เสมอ",
      "กลุ่มที่ประกอบด้วย Don't care ล้วนๆ",
      "กลุ่มที่มีตัวแปรน้อยกว่า 2 ตัวแปร"
    ],
    "correctAnswer": 0,
    "explanation": "EPI คือ Prime Implicant ที่จำเป็นต้องเลือกเข้าสู่สมการลดรูปสุดท้าย เพราะมันมีมินเทอมเฉพาะที่ไม่มีกลุ่มอื่นใดมาช่วยคลุมได้"
  },
  {
    "id": "fe-52",
    "chapterId": "ch4",
    "topic": "Standard POS to SOP Conversion",
    "difficulty": "ปานกลาง",
    "question": "ฟังก์ชัน F(A, B, C) = ∏ M(0, 2, 4, 6) หากเขียนในรูป Sum of Minterms (SOP) จะตรงกับข้อใด?",
    "options": [
      "∑ m(1, 3, 5, 7)",
      "∑ m(0, 2, 4, 6)",
      "∑ m(1, 2, 3, 4)",
      "∏ M(1, 3, 5, 7)"
    ],
    "correctAnswer": 0,
    "explanation": "มินเทอมคืออินเด็กซ์ที่เหลือจากแมกซ์เทอม: {0,1,2,3,4,5,6,7} - {0,2,4,6} = {1,3,5,7} ดังนั้น F = ∑ m(1, 3, 5, 7)"
  },
  {
    "id": "fe-53",
    "chapterId": "ch4",
    "topic": "Static-1 Hazard",
    "difficulty": "เข้มข้น",
    "question": "ปรากฏการณ์ Glitch (การเกิดพัลส์ 0 ชั่วขณะ ทั้งที่เอาต์พุตควรเป็น 1 ตลอดเวลา) เกิดจากสาเหตุใดในวงจรคอมบิเนชัน?",
    "options": [
      "ความล่าช้าในการแพร่สัญญาณ (Propagation Delay) ที่ไม่เท่ากันระหว่างเส้นทางของตัวแปรปกติกับตัวแปรกลับค่า (A กับ A')",
      "แรงดันไฟเลี้ยง VCC ตกต่ำกว่า 1V",
      "การใช้ตัวต้านทานผิดขนาด",
      "การใช้สัญญาณนาฬิกาที่มีความถี่สูงเกินไป"
    ],
    "correctAnswer": 0,
    "explanation": "Static-1 Hazard เกิดขึ้นเมื่ออินพุตเปลี่ยนผ่านระหว่างกลุ่ม 2 กลุ่มที่สัมผัสกันใน K-Map แต่ไม่ได้ถูกคลุมด้วย Redundant Prime Implicant ทำให้เส้นทาง A กับ A' มี delay ต่างกัน เกิด spike สั้นๆ"
  },
  {
    "id": "fe-54",
    "chapterId": "ch4",
    "topic": "Static-1 Hazard Elimination",
    "difficulty": "เข้มข้น",
    "question": "วิธีการแก้ไขปัญหา Static-1 Hazard ในวงจรตรรกะแบบ SOP คือข้อใด?",
    "options": [
      "เพิ่มกลุ่ม Consensus Term เข้าไปในสมการเพื่อเชื่อมระหว่าง 2 กลุ่มที่อยู่ติดกันใน K-Map",
      "ลดขนาดกลุ่มใน K-Map ให้เล็กลง",
      "ต่อตัวเก็บประจุค่ามากลงกราวด์ที่ทุกเกต",
      "เปลี่ยนไปใช้วงจรซีเควนเชียลทั้งหมด"
    ],
    "correctAnswer": 0,
    "explanation": "การเพิ่มกลุ่มวงรอบเชื่อมระหว่าง 2 adjacent groups (เพิ่ม consensus term) ช่วยป้องกันไม่ให้เกิดสภาวะร่วงหล่นของลอจิก 1 ขณะตัวแปรเปลี่ยนสถานะ"
  },
  {
    "id": "fe-55",
    "chapterId": "ch4",
    "topic": "Boolean Identity Laws",
    "difficulty": "ง่าย",
    "question": "ข้อใดคือเอกลักษณ์บูลีน (Boolean Postulates) ที่ไม่ถูกต้อง?",
    "options": [
      "A · 1 = A",
      "A + 0 = A",
      "A + A' = 0",
      "A · A' = 0"
    ],
    "correctAnswer": 2,
    "explanation": "A + A' ต้องเท่ากับ 1 เสมอ (เช่น 1 + 0 = 1, 0 + 1 = 1) ข้อความ A + A' = 0 จึงผิด"
  },
  {
    "id": "fe-56",
    "chapterId": "ch5",
    "topic": "Combinational vs Sequential",
    "difficulty": "ง่าย",
    "question": "ข้อใดคือคุณลักษณะที่จำแนกความแตกต่างระหว่างวงจรเชิงผสม (Combinational) กับวงจรเชิงลำดับ (Sequential)?",
    "options": [
      "วงจรเชิงลำดับมีหน่วยความจำ (Memory Element) และสายสัญญาณป้อนกลับ (Feedback Loop)",
      "วงจรเชิงผสมใช้เฉพาะเกตที่ไม่มีไฟเลี้ยง",
      "วงจรเชิงลำดับไม่สามารถใช้คำนวณทางคณิตศาสตร์ได้",
      "วงจรเชิงผสมต้องต่อร่วมกับสัญญาณนาฬิกาเสมอ"
    ],
    "correctAnswer": 0,
    "explanation": "วงจรซีเควนเชียลมีองค์ประกอบจำสถานะ (Flip-Flop / Latch) และเส้นทางป้อนกลับ ทำให้เอาต์พุตขึ้นกับทั้งอินพุตปัจจุบันและสถานะในอดีต"
  },
  {
    "id": "fe-57",
    "chapterId": "ch5",
    "topic": "Latch vs Flip-Flop",
    "difficulty": "ง่าย",
    "question": "ข้อใดระบุความแตกต่างในการตอบสนองระหว่าง Latch และ Flip-Flop ได้ถูกต้อง?",
    "options": [
      "Latch ทำงานแบบระดับสัญญาณ (Level-sensitive) ส่วน Flip-Flop ทำงานที่ขอบสัญญาณนาฬิกา (Edge-triggered)",
      "Latch ต้องใช้คริสตัลออสซิลเลเตอร์ ส่วน Flip-Flop ไม่ต้องใช้",
      "Flip-Flop เก็บข้อมูลได้ครั้งละ 8 บิต ส่วน Latch เก็บได้ 1 บิต",
      "ทั้งสองตัวทำงานเหมือนกันทุกประการ"
    ],
    "correctAnswer": 0,
    "explanation": "Latch ทำงานตลอดช่วงเวลาที่ Enable เป็น High หรือ Low (Level-sensitive) ส่วน Flip-Flop จะเปลี่ยนสถานะเฉพาะที่ขอบขาขึ้นหรือขาลงของ Clock เท่านั้น (Edge-triggered)"
  },
  {
    "id": "fe-58",
    "chapterId": "ch5",
    "topic": "Lab 10: NOR SR Latch Forbidden State",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 10 ข้อ 1 วงจร SR Latch ที่สร้างจาก NOR Gate หากป้อนอินพุต S = 1 และ R = 1 พร้อมกัน จะเกิดอะไรขึ้น?",
    "options": [
      "ทำให้เอาต์พุต Q และ Q' มีค่าเป็น 0 ทั้งคู่ ซึ่งขัดกับหลักการคู่ตรงข้าม (Forbidden/Invalid State)",
      "วงจรจะทำงานแบบ Toggle สลับไปมา",
      "ทำให้เอาต์พุต Q = 1 และ Q' = 1",
      "วงจรจะจำค่าเดิมค้างไว้"
    ],
    "correctAnswer": 0,
    "explanation": "NOR Gate หากมีขาใดเป็น 1 เอาต์พุตจะเป็น 0 เมื่อ S=1, R=1 ทำให้ Q=0 และ Q'=0 ซึ่งผิดกฎที่ Q กับ Q' ต้องตรงข้ามกันเสมอ และหากปล่อยเป็น 00 พร้อมกันจะเกิด Race condition"
  },
  {
    "id": "fe-59",
    "chapterId": "ch5",
    "topic": "Lab 10: NAND SR Latch Active State",
    "difficulty": "ปานกลาง",
    "question": "วงจร SR Latch ที่ต่อไขว้จาก NAND Gate (S'R' Latch) สถานะตั้งค่า (Set: Q=1) จะเกิดขึ้นเมื่อป้อนอินพุตอย่างไร?",
    "options": [
      "S' = 0, R' = 1 (Active-LOW)",
      "S' = 1, R' = 0",
      "S' = 1, R' = 1",
      "S' = 0, R' = 0"
    ],
    "correctAnswer": 0,
    "explanation": "NAND Latch เป็นแบบ Active-LOW ดังนั้นการสั่ง Set (ให้ Q=1) ต้องป้อน S'=0 และ R'=1"
  },
  {
    "id": "fe-60",
    "chapterId": "ch5",
    "topic": "Lab 10: D-FF Set and Reset Override",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 10 โมดูล D-Flip Flop ที่มีขา Asynchronous Preset/Set (S) และ Clear/Reset (R) หากมีการป้อนสัญญาณ Reset สัญญาณนี้จะมีพฤติกรรมอย่างไร?",
    "options": [
      "บังคับให้ Q = 0 ทันที โดยไม่ต้องรอสัญญาณนาฬิกา (Override Clock)",
      "ต้องรอให้มีขอบสัญญาณนาฬิกาขาขึ้นก่อนจึงจะรีเซ็ต",
      "มีผลเฉพาะเมื่ออินพุต D = 1",
      "จะสลับค่าของ Q เป็นตรงข้าม"
    ],
    "correctAnswer": 0,
    "explanation": "สัญญาณอะซิงโครนัส (Asynchronous Clear/Reset) มีลำดับความสำคัญสูงสุด สามารถบังคับให้สถานะรีเซ็ตได้ทันทีโดยไม่ขึ้นกับ Clock"
  },
  {
    "id": "fe-61",
    "chapterId": "ch5",
    "topic": "Lab 10: 6-bit Shift Register SIPO",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 10 วงจรเลื่อนข้อมูล 6 บิต (6-bit Shift Register) ที่ต่อ D-FF เรียงกัน 6 ตัวแบบ SIPO เมื่อป้อน Data = 1 ค้างไว้ 1 คาบสัญญาณนาฬิกา จากนั้นป้อน Data = 0 ข้อมูล 1 จะเลื่อนไปถึงเอาต์พุต D5 ในสัญญาณนาฬิกาลูกที่เท่าใด?",
    "options": [
      "ลูกที่ 6",
      "ลูกที่ 1",
      "ลูกที่ 5",
      "ลูกที่ 12"
    ],
    "correctAnswer": 0,
    "explanation": "ข้อมูลเคลื่อนที่ 1 ขั้นต่อ 1 ขอบสัญญาณนาฬิกา: Clock 1 ไป D0, Clock 2 ไป D1, Clock 3 ไป D2, Clock 4 ไป D3, Clock 5 ไป D4, และ Clock 6 ไปถึง D5"
  },
  {
    "id": "fe-62",
    "chapterId": "ch5",
    "topic": "Lab 10: NE555 Astable Charging Path",
    "difficulty": "ปานกลาง",
    "question": "ในวงจรสร้างสัญญาณนาฬิกาด้วยไอซี NE555 (ใบงานที่ 10) ในช่วงเวลาที่สัญญาณเอาต์พุตเป็นลอจิก 1 (THIGH) ตัวเก็บประจุ C จะประจุผ่านตัวต้านทานตัวใด?",
    "options": [
      "ผ่าน R1 และ R2 (R1 + R2)",
      "ผ่าน R2 เพียงตัวเดียว",
      "ผ่าน R1 เพียงตัวเดียว",
      "ชาร์จตรงจากขา 3 Output"
    ],
    "correctAnswer": 0,
    "explanation": "ช่วงชาร์จ (THIGH): กระแสไหลจาก VCC ผ่าน R1 และ R2 เข้าสู่ C ทำให้ THIGH = 0.693 · (R1 + R2) · C"
  },
  {
    "id": "fe-63",
    "chapterId": "ch5",
    "topic": "Lab 10: NE555 Astable Discharging Path",
    "difficulty": "ปานกลาง",
    "question": "ในช่วงเวลาที่เอาต์พุตของ NE555 เป็นลอจิก 0 (TLOW) ตัวเก็บประจุ C จะคายประจุผ่านตัวต้านทานตัวใดลงสู่ขา Discharge (ขา 7)?",
    "options": [
      "ผ่าน R2 เพียงตัวเดียว",
      "ผ่าน R1 และ R2 พร้อมกัน",
      "ผ่าน R1 เพียงตัวเดียว",
      "ผ่านตัวเก็บประจุ 10nF"
    ],
    "correctAnswer": 0,
    "explanation": "ช่วงคายประจุ (TLOW): ทรานซิสเตอร์ภายในต่อขา 7 ลงกราวด์ ทำให้ C คายประจุผ่าน R2 ลงขา 7 เพียงตัวเดียว TLOW = 0.693 · R2 · C"
  },
  {
    "id": "fe-64",
    "chapterId": "ch5",
    "topic": "Lab 10: NE555 Astable Frequency Formula",
    "difficulty": "ปานกลาง",
    "question": "สูตรการคำนวณความถี่สัญญาณของวงจร Astable Multivibrator ด้วยไอซี NE555 คือข้อใด?",
    "options": [
      "f = 1.44 / ((R1 + 2R2) · C)",
      "f = 1 / ((R1 + R2) · C)",
      "f = 0.693 / (R1 · R2 · C)",
      "f = 1.44 / (R1 · C)"
    ],
    "correctAnswer": 0,
    "explanation": "คาบรวม T = THIGH + TLOW = 0.693(R1 + R2)C + 0.693(R2)C = 0.693(R1 + 2R2)C ดังนั้น f = 1/T = 1.44 / ((R1 + 2R2) · C)"
  },
  {
    "id": "fe-65",
    "chapterId": "ch5",
    "topic": "Lab 10: NE555 Standard Duty Cycle Limitation",
    "difficulty": "ยาก",
    "question": "ในวงจร Astable มาตรฐานของ NE555 โดยไม่มีไดโอดต่อคร่อม R2 ค่า Duty Cycle ของสัญญาณเอาต์พุตจะมีคุณสมบัติอย่างไรเสมอ?",
    "options": [
      "มากกว่า 50% เสมอ (THIGH > TLOW)",
      "น้อยกว่า 50% เสมอ",
      "เท่ากับ 50% พอดีเสมอ",
      "ไม่สามารถระบุได้"
    ],
    "correctAnswer": 0,
    "explanation": "Duty Cycle = THIGH / T = (R1 + R2) / (R1 + 2R2) เนื่องจาก R1 > 0 ทำให้เศษมากกว่าครึ่งหนึ่งของส่วนเสมอ ดังนั้น Duty Cycle จึงมากกว่า 50% เสมอ"
  },
  {
    "id": "fe-66",
    "chapterId": "ch5",
    "topic": "Lab 10: NE555 1Hz LED Flasher Component Sizing",
    "difficulty": "ยาก",
    "question": "ในใบงานที่ 10 การออกแบบวงจรไฟกระพริบความถี่ 1Hz ให้มีระยะเวลาติดและดับใกล้เคียงกันที่สุด (Duty Cycle ≈ 50%) หากเลือก C = 10µF และ R1 = 1kΩ จะต้องเลือกค่า R2 ประมาณเท่าใด?",
    "options": [
      "71.5 kΩ",
      "144 kΩ",
      "1 kΩ",
      "10 kΩ"
    ],
    "correctAnswer": 0,
    "explanation": "จากสูตร f = 1.44 / ((R1 + 2R2)C) เมื่อ f=1Hz, C=10µF จะได้ R1 + 2R2 = 1.44 / (1 · 10^-5) = 144 kΩ แทน R1=1kΩ จะได้ 2R2 = 143 kΩ -> R2 = 71.5 kΩ"
  },
  {
    "id": "fe-67",
    "chapterId": "ch5",
    "topic": "Lab 10: NE555 Pin 5 Decoupling Capacitor",
    "difficulty": "ง่าย",
    "question": "เหตุใดในวงจร NE555 จึงต้องต่อตัวเก็บประจุเซรามิกขนาด 10nF จากขา 5 (Control Voltage) ลงกราวด์?",
    "options": [
      "เพื่อกรองสัญญาณรบกวนความถี่สูง ป้องกันแรงดันอ้างอิงภายใน (2/3 VCC) แกว่งตัว",
      "เพื่อเพิ่มความถี่ของวงจรเป็น 2 เท่า",
      "เพื่อใช้ในการคายประจุของวงจร",
      "เพื่อเปลี่ยนรูปคลื่นสี่เหลี่ยมเป็นไซน์"
    ],
    "correctAnswer": 0,
    "explanation": "ขา 5 ต่อกับจุดแบ่งแรงดัน 2/3 VCC การใส่ C 10nF (ไม่มีขั้ว) ช่วยลด Noise จากไฟเลี้ยงที่อาจทำให้จุด Trigger คลาดเคลื่อน"
  },
  {
    "id": "fe-68",
    "chapterId": "ch5",
    "topic": "Lab 11: Ripple Counter Frequency Division",
    "difficulty": "ปานกลาง",
    "question": "ในใบงานที่ 11 วงจรนับแบบอะซิงโครนัส 4 บิตที่ต่อด้วย T-Flip Flop แบบต่ออนุกรมกัน (Ripple Counter) หากสัญญาณนาฬิกา Ck มีความถี่ 16 kHz ความถี่ที่เอาต์พุต d3 (บิตสูงสุด) จะมีค่าเท่าใด?",
    "options": [
      "1 kHz",
      "2 kHz",
      "4 kHz",
      "8 kHz"
    ],
    "correctAnswer": 0,
    "explanation": "T-FF แต่ละตัวทำงานเป็น Frequency Divider (หาร 2): d0 = 16/2 = 8kHz, d1 = 8/2 = 4kHz, d2 = 4/2 = 2kHz, d3 = 2/2 = 1kHz (ความถี่ลดลง 2^4 = 16 เท่า)"
  },
  {
    "id": "fe-69",
    "chapterId": "ch5",
    "topic": "Lab 11: Ripple Counter Accumulative Delay",
    "difficulty": "ยาก",
    "question": "ข้อเสียที่สำคัญที่สุดของวงจรนับแบบอะซิงโครนัส (Asynchronous / Ripple Counter) คือข้อใด?",
    "options": [
      "สัญญาณนาฬิกาสะสมความล่าช้า (Cumulative Propagation Delay) ส่งต่อกันเป็นทอดๆ ทำให้เกิด Glitch ที่เอาต์พุตและจำกัดความถี่สูงสุดในการทำงาน",
      "ใช้อุปกรณ์ฟลิปฟลอปมากกว่าวงจรนับแบบซิงโครนัส",
      "ไม่สามารถนับเลขฐานสองได้",
      "ต้องใช้วงจรลอจิกถอดรหัสขนาดใหญ่กว่าแบบซิงโครนัส"
    ],
    "correctAnswer": 0,
    "explanation": "Ripple Counter เอาต์พุตของ FF ตัวแรกไปเป็น Clock ให้ตัวถัดไป หน่วงเวลาสะสม t_total = N · t_pd ส่งผลให้เกิดความผิดเพี้ยนชั่วขณะ (Glitches)"
  },
  {
    "id": "fe-70",
    "chapterId": "ch5",
    "topic": "Lab 11: People Counter Laser Pattern",
    "difficulty": "ยาก",
    "question": "ในใบงานที่ 11 วงจรนับคนเดินผ่านทิศทางเดียว (นับเฉพาะคนเดินเข้า) ด้วยเซ็นเซอร์เลเซอร์ 2 ลำแสง (a=ตัวนอก, b=ตัวใน) ลำดับแพทเทิร์นของสัญญาณ (a, b) ที่ถูกต้องเพื่อให้นับคน 1 คนคือข้อใด?",
    "options": [
      "00 -> 10 -> 11 -> 01 -> 00",
      "00 -> 01 -> 11 -> 10 -> 00",
      "00 -> 11 -> 10 -> 01 -> 00",
      "11 -> 10 -> 01 -> 00"
    ],
    "correctAnswer": 0,
    "explanation": "ลำดับเดินเข้า: ไม่มีคน (00) -> ตัดลำแสงหน้า a (10) -> ลำตัวบังทั้ง a และ b (11) -> ก้าวพ้น a แต่ยังบัง b (01) -> พ้นทั้งสองลำแสง (00)"
  },
  {
    "id": "fe-71",
    "chapterId": "ch5",
    "topic": "Lab 11: People Counter False Entry Handling",
    "difficulty": "ยาก",
    "question": "ในเครื่องจักรสถานะของวงจรนับคน (ใบงานที่ 11) หากมีคนยื่นขาตัดลำแสง a ชั่วขณะ (สถานะเปลี่ยนจาก 0 เป็น 1) แล้วดึงขากลับโดยไม่เดินต่อ (สัญญาณเปลี่ยนเป็น a=0, b=0) วงจรจะตอบสนองอย่างไร?",
    "options": [
      "กลับไปยังสถานะเริ่มต้น (State 0) และไม่มีการนับคน",
      "นับคนเพิ่ม 1 คนทันที",
      "ค้างอยู่ที่ State 1 ตลอดไป",
      "ระบบแจ้งเตือนข้อผิดพลาด"
    ],
    "correctAnswer": 0,
    "explanation": "FSM ได้รับการออกแบบให้ตรวจสอบความถูกต้อง: หากอยู่ที่ State 1 (a=1, b=0) แล้วสัญญาณกลายเป็น (0, 0) Next State จะย้อนกลับไป 0 ทันทีเพื่อป้องกันการนับหลอก"
  },
  {
    "id": "fe-72",
    "chapterId": "ch5",
    "topic": "Lab 11: People Counter Output Decoder",
    "difficulty": "ยาก",
    "question": "ในวงจรนับคนใบงานที่ 11 ข้อ 3 วงจรถอดรหัสพัลส์เอาต์พุต (Output Decoder) เพื่อส่งให้ตัวนับนับ +1 ได้รับการลดรูปสมการตรรกะเหลือเพียงข้อใด?",
    "options": [
      "y = d2",
      "y = d2 · d1 · d0",
      "y = a · b",
      "y = d0"
    ],
    "correctAnswer": 0,
    "explanation": "สถานะที่ปล่อยพัลส์เอาต์พุต y=1 คือ State 4 (100 ในฐานสอง d2=1, d1=0, d0=0) เนื่องจากสถานะ 5, 6, 7 ไม่ได้ใช้งาน จึงสามารถใช้ d2 เดี่ยวๆ เป็นตัวแทนได้ y = d2"
  },
  {
    "id": "fe-73",
    "chapterId": "ch5",
    "topic": "Lab 11: People Counter Reverse Direction",
    "difficulty": "ยาก",
    "question": "หากต้องการนับเฉพาะคนที่ \"เดินออก\" (ทิศทางตรงกันข้ามกับเดินเข้า) ลำดับการตัดลำแสงของเซ็นเซอร์ (a, b) จะต้องเป็นอย่างไร?",
    "options": [
      "00 -> 01 -> 11 -> 10 -> 00",
      "00 -> 10 -> 11 -> 01 -> 00",
      "00 -> 11 -> 00",
      "01 -> 10 -> 00"
    ],
    "correctAnswer": 0,
    "explanation": "เดินออกจะเจอเซ็นเซอร์ด้านใน b ก่อน: เริ่มที่ 00 -> ตัด b (01) -> ตัดทั้งคู่ (11) -> พ้น b เหลือ a (10) -> พ้นหมด (00)"
  },
  {
    "id": "fe-74",
    "chapterId": "ch5",
    "topic": "Lab 11: ROM-Based FSM Controller Sizing",
    "difficulty": "ยาก",
    "question": "ในวงจรนับคนของ อ.ปวีณ ที่ควบคุมด้วย ROM โดยมีสถานะ 5 สถานะ (ใช้บิตสถานะ 3 บิต d2, d1, d0) และอินพุตเซ็นเซอร์ 2 บิต (a, b) ตารางข้อมูล Firmware ใน ROM จะต้องมีความจุอย่างน้อยกี่ไบต์?",
    "options": [
      "32 ไบต์ (32 แถว)",
      "16 ไบต์",
      "64 ไบต์",
      "8 ไบต์"
    ],
    "correctAnswer": 0,
    "explanation": "Address รวม = 3 บิตสถานะ + 2 บิตอินพุต = 5 บิต ดังนั้นขนาดของ ROM = 2^5 = 32 ตำแหน่ง (00H ถึง 1FH) ตามตาราง Firmware ในใบงาน"
  },
  {
    "id": "fe-75",
    "chapterId": "ch5",
    "topic": "Lab 11: Bi-directional People Counter Architecture",
    "difficulty": "ยาก",
    "question": "หากต้องการสร้างวงจรนับคนที่สามารถนับแยกทั้งคนเดินเข้าและคนเดินออกพร้อมกันในระบบเดียว การออกแบบฮาร์ดแวร์ที่ดีที่สุดคือข้อใด?",
    "options": [
      "ใช้ ROM 2 ตัว (ROM 1 ถอดรหัสขาเข้า ส่งพัลส์ให้ Up-Counter, ROM 2 ถอดรหัสขาออก ส่งพัลส์ให้ Down-Counter/Counter ตัวที่สอง)",
      "ใช้ตัวต้านทานปรับค่าได้สลับทิศทางกระแส",
      "ใช้หลอดไฟฉายแทนเลเซอร์",
      "ไม่สามารถทำได้ด้วยวงจรดิจิทัล"
    ],
    "correctAnswer": 0,
    "explanation": "ตามใบงานที่ 11 ข้อ 4: ใช้ ROM 1 สำหรับตรวจจับลำดับขาเข้า และใช้ ROM 2 สำหรับตรวจจับลำดับขาออก โดยรับสัญญาณอินพุตเซ็นเซอร์คู่เดียวกัน"
  },
  {
    "id": "fe-76",
    "chapterId": "ch5",
    "topic": "JK Flip-Flop Toggle Mode",
    "difficulty": "ง่าย",
    "question": "ฟลิปฟลอปแบบ JK เมื่อป้อนอินพุต J = 1 และ K = 1 เมื่อมีสัญญาณนาฬิกาเข้ามา จะเกิดผลลัพธ์อย่างไร?",
    "options": [
      "สถานะจะกลับค่าเป็นตรงข้ามเสมอ (Toggle: Q_next = Q')",
      "สถานะจะถูกรีเซ็ตเป็น 0 เสมอ",
      "สถานะจะถูกเซ็ตเป็น 1 เสมอ",
      "เกิดสภาวะไม่พึงประสงค์ (Invalid State)"
    ],
    "correctAnswer": 0,
    "explanation": "คุณสมบัติเด่นของ JK Flip-Flop คือเมื่อ J=1, K=1 จะทำงานในโหมด Toggle โดยกลับสถานะเดิม Q_next = Q'"
  },
  {
    "id": "fe-77",
    "chapterId": "ch5",
    "topic": "JK Race-Around Condition",
    "difficulty": "ยาก",
    "question": "ปัญหา Race-Around Condition ใน JK Flip-Flop จะเกิดขึ้นภายใต้เงื่อนไขใด?",
    "options": [
      "ฟลิปฟลอปทำงานแบบกระตุ้นด้วยระดับ (Level-triggered) และความกว้างพัลส์นาฬิกา tp มากกว่าความล่าช้าของเกต tpd ขณะที่ J=1, K=1",
      "เมื่ออินพุต J=0 และ K=0",
      "เมื่อความถี่สัญญาณนาฬิกาต่ำเกินไป",
      "เมื่อต่ออินพุตผิดขั้ว"
    ],
    "correctAnswer": 0,
    "explanation": "Race-around เกิดขึ้นเมื่อ J=K=1 ในช่วงที่ Clock เป็น 1 นานเกินไป สัญญาณจะ toggle ซ้ำไปซ้ำมาไม่สิ้นสุด แก้ไขได้โดยใช้ Edge-triggered หรือ Master-Slave"
  },
  {
    "id": "fe-78",
    "chapterId": "ch5",
    "topic": "T Flip-Flop Characteristic Equation",
    "difficulty": "ง่าย",
    "question": "สมการคุณลักษณะ (Characteristic Equation) ของ T-Flip Flop คือข้อใด?",
    "options": [
      "Q_next = T ⊕ Q",
      "Q_next = T · Q",
      "Q_next = T + Q",
      "Q_next = T'"
    ],
    "correctAnswer": 0,
    "explanation": "เมื่อ T=0 ได้ Q_next = Q; เมื่อ T=1 ได้ Q_next = Q' เขียนรวมได้เป็น Q_next = T ⊕ Q"
  },
  {
    "id": "fe-79",
    "chapterId": "ch5",
    "topic": "D Flip-Flop Characteristic Equation",
    "difficulty": "ง่าย",
    "question": "สมการคุณลักษณะของ D-Flip Flop คือข้อใด?",
    "options": [
      "Q_next = D",
      "Q_next = D ⊕ Q",
      "Q_next = D · Q",
      "Q_next = D'"
    ],
    "correctAnswer": 0,
    "explanation": "D Flip-Flop (Data) จะส่งผ่านค่า D ไปยังเอาต์พุต Q เมื่อมีสัญญาณนาฬิกาเสมอ Q_next = D"
  },
  {
    "id": "fe-80",
    "chapterId": "ch5",
    "topic": "JK Flip-Flop Characteristic Equation",
    "difficulty": "ปานกลาง",
    "question": "สมการคุณลักษณะของ JK Flip-Flop คือข้อใด?",
    "options": [
      "Q_next = J·Q' + K'·Q",
      "Q_next = J·Q + K·Q'",
      "Q_next = J ⊕ K",
      "Q_next = J + K'·Q"
    ],
    "correctAnswer": 0,
    "explanation": "จากตารางความจริง: Q_next = J·Q' + K'·Q (ถ้า Q=0 ต้องการให้ติดต้องป้อน J=1; ถ้า Q=1 ต้องการให้คงอยู่ต้องป้อน K=0 หรือ K'=1)"
  },
  {
    "id": "fe-81",
    "chapterId": "ch5",
    "topic": "D-FF Excitation Table",
    "difficulty": "ง่าย",
    "question": "ในตารางกระตุ้น (Excitation Table) ของ D Flip-Flop หากต้องการให้สถานะเปลี่ยนจาก Q = 1 ไปเป็น Q_next = 0 จะต้องป้อนอินพุต D เป็นเท่าใด?",
    "options": [
      "0",
      "1",
      "X (Don't care)",
      "สลับไปมา"
    ],
    "correctAnswer": 0,
    "explanation": "D Flip-Flop มีค่า D = Q_next เสมอ เมื่อต้องการให้ Q_next = 0 จึงต้องป้อน D = 0"
  },
  {
    "id": "fe-82",
    "chapterId": "ch5",
    "topic": "T-FF Excitation Table",
    "difficulty": "ง่าย",
    "question": "ในตารางกระตุ้นของ T Flip-Flop หากต้องการให้สถานะเปลี่ยนจาก Q = 1 ไปเป็น Q_next = 1 จะต้องป้อนอินพุต T เป็นเท่าใด?",
    "options": [
      "0 (Hold)",
      "1 (Toggle)",
      "X",
      "ไม่สามารถทำได้"
    ],
    "correctAnswer": 0,
    "explanation": "สถานะไม่เปลี่ยนแปลง (1 -> 1) แสดงว่าต้องรักษาสถานะเดิมไว้ (Hold) จึงต้องป้อน T = 0"
  },
  {
    "id": "fe-83",
    "chapterId": "ch5",
    "topic": "JK-FF Excitation 0 to 1",
    "difficulty": "ปานกลาง",
    "question": "ในตารางกระตุ้นของ JK Flip-Flop หากต้องการเปลี่ยนสถานะจาก Q = 0 ไปเป็น Q_next = 1 จะต้องกำหนดอินพุต J และ K อย่างไร?",
    "options": [
      "J = 1, K = X",
      "J = 0, K = X",
      "J = X, K = 0",
      "J = 1, K = 1"
    ],
    "correctAnswer": 0,
    "explanation": "จาก 0 เป็น 1 เกิดได้ 2 กรณี: Set (J=1, K=0) หรือ Toggle (J=1, K=1) ดังนั้น J ต้องเป็น 1 แน่นอน ส่วน K เป็นอะไรก็ได้ (X) สรุปคือ J=1, K=X"
  },
  {
    "id": "fe-84",
    "chapterId": "ch5",
    "topic": "JK-FF Excitation 1 to 0",
    "difficulty": "ปานกลาง",
    "question": "ในตารางกระตุ้นของ JK Flip-Flop หากต้องการเปลี่ยนสถานะจาก Q = 1 ไปเป็น Q_next = 0 จะต้องกำหนดอินพุต J และ K อย่างไร?",
    "options": [
      "J = X, K = 1",
      "J = 1, K = X",
      "J = X, K = 0",
      "J = 0, K = 1"
    ],
    "correctAnswer": 0,
    "explanation": "จาก 1 เป็น 0 เกิดได้ 2 กรณี: Reset (J=0, K=1) หรือ Toggle (J=1, K=1) สรุปคือ J เป็นอะไรก็ได้ (X) แต่ K ต้องเป็น 1 แน่นอน -> J=X, K=1"
  },
  {
    "id": "fe-85",
    "chapterId": "ch5",
    "topic": "Setup Time Definition",
    "difficulty": "ปานกลาง",
    "question": "ช่วงเวลา Setup Time (t_setup) ของฟลิปฟลอปหมายถึงข้อใด?",
    "options": [
      "ช่วงเวลาขั้นต่ำที่สัญญาณอินพุต (เช่น D) ต้องนิ่งและเสถียรก่อนที่ขอบสัญญาณนาฬิกาจะมาถึง",
      "ช่วงเวลาที่อินพุตต้องคงที่หลังจากขอบสัญญาณนาฬิกาผ่านไปแล้ว",
      "เวลาที่เอาต์พุตใช้ในการเปลี่ยนระดับแรงดัน",
      "ความกว้างของพัลส์สัญญาณนาฬิกา"
    ],
    "correctAnswer": 0,
    "explanation": "Setup Time คือเวลาก่อนขอบ Clock ที่ข้อมูลต้องพร้อมและห้ามเปลี่ยนค่า เพื่อให้วงจรภายในเตรียมรับข้อมูลได้ถูกต้อง"
  },
  {
    "id": "fe-86",
    "chapterId": "ch5",
    "topic": "Hold Time Definition",
    "difficulty": "ปานกลาง",
    "question": "ช่วงเวลา Hold Time (t_hold) ของฟลิปฟลอปหมายถึงข้อใด?",
    "options": [
      "ช่วงเวลาขั้นต่ำที่สัญญาณอินพุตต้องคงสภาพนิ่งต่อเนื่องหลังจากขอบสัญญาณนาฬิกาผ่านไปแล้ว",
      "เวลาที่รอจนกว่าจะเปิดเครื่อง",
      "เวลาที่เอาต์พุตคงสถานะ 1",
      "เวลาที่ใช้ในการชาร์จไฟ"
    ],
    "correctAnswer": 0,
    "explanation": "Hold Time คือเวลาหลังขอบ Clock ที่อินพุตต้องคงที่ไว้ ห้ามเปลี่ยนทันที เพื่อป้องกันสถานะสับสน (Metastability)"
  },
  {
    "id": "fe-87",
    "chapterId": "ch5",
    "topic": "Synchronous vs Asynchronous Counter",
    "difficulty": "ปานกลาง",
    "question": "ข้อใดคือข้อได้เปรียบหลักของวงจรนับแบบซิงโครนัส (Synchronous Counter) เมื่อเทียบกับแบบอะซิงโครนัส?",
    "options": [
      "ฟลิปฟลอปทุกตัวได้รับสัญญาณนาฬิกาพร้อมกันจากแหล่งจ่ายเดียวกัน ทำให้เปลี่ยนสถานะพร้อมกันและมีความเร็วสูงกว่ามาก",
      "ใช้อุปกรณ์น้อยกว่าและต่อวงจรง่ายกว่า",
      "ไม่ต้องใช้ลอจิกเกตภายนอกเพิ่มเติม",
      "สามารถทำงานได้โดยไม่ต้องมีไฟเลี้ยง"
    ],
    "correctAnswer": 0,
    "explanation": "วงจรนับแบบซิงโครนัสต่อ Clock ขนานเข้าทุกตัวพร้อมกัน ขจัดปัญหา Ripple Delay สะสม ทำให้ทำงานได้ที่ความถี่สูงมาก"
  },
  {
    "id": "fe-88",
    "chapterId": "ch5",
    "topic": "Modulo-10 Counter Sizing",
    "difficulty": "ง่าย",
    "question": "หากต้องการออกแบบวงจรนับทศวรรษ (Decade Counter / Modulo-10) จะต้องใช้ Flip-Flop อย่างน้อยที่สุดกี่ตัว?",
    "options": [
      "4 ตัว",
      "3 ตัว",
      "10 ตัว",
      "5 ตัว"
    ],
    "correctAnswer": 0,
    "explanation": "สูตร 2^n >= 10: ถ้า n=3 ได้ 8 (ไม่พอ) ดังนั้น n=4 ได้ 16 >= 10 ต้องใช้ Flip-Flop อย่างน้อย 4 ตัว"
  },
  {
    "id": "fe-89",
    "chapterId": "ch5",
    "topic": "Modulo-60 Counter Design",
    "difficulty": "ปานกลาง",
    "question": "หากต้องการนับวินาที 0 ถึง 59 (Modulo-60) ในนาฬิกาดิจิทัล จะต้องใช้ Flip-Flop ทั้งหมดกี่ตัว?",
    "options": [
      "6 ตัว",
      "5 ตัว",
      "7 ตัว",
      "60 ตัว"
    ],
    "correctAnswer": 0,
    "explanation": "2^5 = 32 (ไม่พอ), 2^6 = 64 >= 60 ดังนั้นต้องใช้ Flip-Flop อย่างน้อย 6 ตัว"
  },
  {
    "id": "fe-90",
    "chapterId": "ch5",
    "topic": "Shift Register Configurations",
    "difficulty": "ง่าย",
    "question": "รีจิสเตอร์เลื่อนข้อมูลชนิดใดที่รับข้อมูลเข้ามาทีละบิตผ่านสายเส้นเดียว และส่งข้อมูลออกพร้อมกันทุกบิตในเวลาเดียวกัน?",
    "options": [
      "SIPO (Serial-In, Parallel-Out)",
      "SISO (Serial-In, Serial-Out)",
      "PISO (Parallel-In, Serial-Out)",
      "PIPO (Parallel-In, Parallel-Out)"
    ],
    "correctAnswer": 0,
    "explanation": "SIPO คือ Serial-In (ป้อนข้อมูลทีละบิตตาม Clock) และ Parallel-Out (อ่านเอาต์พุตพร้อมกันทุกขา)"
  },
  {
    "id": "fe-91",
    "chapterId": "ch5",
    "topic": "Johnson Counter States",
    "difficulty": "ยาก",
    "question": "วงจรนับแบบจอห์นสัน (Johnson Counter / Twisted Ring Counter) ที่สร้างจาก Flip-Flop จำนวน 4 ตัว จะมีจำนวนสถานะที่นับได้ทั้งหมดกี่สถานะ?",
    "options": [
      "8 สถานะ",
      "16 สถานะ",
      "4 สถานะ",
      "12 สถานะ"
    ],
    "correctAnswer": 0,
    "explanation": "Johnson Counter มีจำนวนสถานะ = 2 · n สำหรับ n=4 ตัว จะมีสถานะทั้งหมด = 2 · 4 = 8 สถานะ (ถ้าเป็น Ring Counter ทั่วไปจะมีเพียง n=4 สถานะ)"
  },
  {
    "id": "fe-92",
    "chapterId": "ch5",
    "topic": "Moore Machine Output Dependency",
    "difficulty": "ง่าย",
    "question": "ในเครื่องจักรสถานะแบบมัวร์ (Moore FSM) เอาต์พุตของระบบขึ้นอยู่กับสิ่งใด?",
    "options": [
      "ขึ้นอยู่กับสถานะปัจจุบัน (Current State) เพียงอย่างเดียว",
      "ขึ้นอยู่กับทั้งสถานะปัจจุบันและอินพุตปัจจุบันพร้อมกัน",
      "ขึ้นอยู่กับความถี่ของสัญญาณนาฬิกา",
      "ขึ้นอยู่กับสถานะถัดไป"
    ],
    "correctAnswer": 0,
    "explanation": "นิยามของ Moore Machine: Output = λ(State) ขึ้นอยู่กับสถานะปัจจุบันเท่านั้น ทำให้เอาต์พุตเสถียรและไม่มี Glitch จากอินพุต"
  },
  {
    "id": "fe-93",
    "chapterId": "ch5",
    "topic": "Mealy Machine Glitch Susceptibility",
    "difficulty": "ปานกลาง",
    "question": "ข้อเสียเปรียบของเครื่องจักรสถานะแบบมีลี (Mealy FSM) เมื่อเทียบกับแบบมัวร์คือข้อใด?",
    "options": [
      "เอาต์พุตอาจเกิดสัญญาณรบกวน (Glitch / Spikes) ได้ง่ายเมื่ออินพุตมีการกระเพื่อม เพราะเอาต์พุตเชื่อมโยงกับอินพุตโดยตรง",
      "ใช้จำนวนฟลิปฟลอปมากกว่าแบบ Moore เสมอ",
      "ตอบสนองต่อการเปลี่ยนแปลงของอินพุตช้ากว่า 1 สัญญาณนาฬิกา",
      "ไม่สามารถเขียนตารางสถานะได้"
    ],
    "correctAnswer": 0,
    "explanation": "Mealy Machine Output = f(State, Input) หากอินพุตมี noise หรือกระเพื่อม เอาต์พุตจะกระเพื่อมตามทันทีโดยไม่ต้องรอขอบ Clock"
  },
  {
    "id": "fe-94",
    "chapterId": "ch5",
    "topic": "Water Tank FSM Hysteresis Purpose",
    "difficulty": "ปานกลาง",
    "question": "ในโจทย์ข้อสอบระบบควบคุมถังน้ำของ อ.ปวีณ การใช้ FSM ควบคุมปั๊มน้ำด้วยระดับเซ็นเซอร์บน (b) และเซ็นเซอร์ล่าง (a) มีจุดประสงค์หลักทางวิศวกรรมเพื่ออะไร?",
    "options": [
      "สร้างช่วงฮิสเทอรีซิส (Hysteresis) ป้องกันปั๊มน้ำตัดต่อบ่อยเกินไป (Hunting / Short Cycling) เมื่อผิวน้ำกระเพื่อม",
      "เพื่อประหยัดน้ำในถัง",
      "เพื่อลดความเร็วรอบของมอเตอร์ปั๊มน้ำ",
      "เพื่อป้องกันน้ำล้นในกรณีไฟดับ"
    ],
    "correctAnswer": 0,
    "explanation": "การใช้ 2 เซ็นเซอร์สร้างช่วงหน่วง: ปั๊มเปิดเมื่อแห้งต่ำกว่า a และจะสูบจนเต็มถึง b จึงดับ ป้องกันไม่ให้ปั๊มติดๆ ดับๆ รัวๆ เมื่อผิวน้ำกระเพื่อม"
  },
  {
    "id": "fe-95",
    "chapterId": "ch5",
    "topic": "Water Tank FSM Invalid Sensor State",
    "difficulty": "ปานกลาง",
    "question": "ในระบบถังน้ำ (a=เซ็นเซอร์ล่าง, b=เซ็นเซอร์บน โดยมีน้ำ=1, แห้ง=0) สถานะของเซ็นเซอร์ที่เป็นไปไม่ได้ในทางกายภาพ (Sensor Error) คือข้อใด?",
    "options": [
      "a = 0, b = 1",
      "a = 1, b = 0",
      "a = 0, b = 0",
      "a = 1, b = 1"
    ],
    "correctAnswer": 0,
    "explanation": "a อยู่ด้านล่าง b อยู่ด้านบน เป็นไปไม่ได้ที่น้ำจะท่วมเซ็นเซอร์บน (b=1) แต่เซ็นเซอร์ล่างกลับแห้ง (a=0) หากเกิดขึ้นแสดงว่าเซ็นเซอร์ตัวใดตัวหนึ่งชำรุด"
  },
  {
    "id": "fe-96",
    "chapterId": "ch5",
    "topic": "Unused States in Counter Design",
    "difficulty": "ยาก",
    "question": "เมื่อออกแบบวงจรนับ Modulo-5 ด้วยฟลิปฟลอป 3 ตัว (มีสถานะทั้งหมด 8 สถานะ แต่ใช้งานเพียง 0, 1, 2, 3, 4) วิศวกรต้องจัดการกับสถานะที่ไม่ได้ใช้งาน (5, 6, 7) อย่างไร?",
    "options": [
      "ออกแบบวงจรให้สามารถคืนค่ากลับเข้าสู่สถานะใช้งานที่ถูกต้องได้เอง (Self-Correcting) หากวงจรหลุดเข้าไปในสถานะเหล่านั้น",
      "ปล่อยทิ้งไว้เป็น Don't Care โดยไม่ต้องสนใจ",
      "ต่อกราวด์ขาเอาต์พุตของฟลิปฟลอปทั้งหมด",
      "ตัดฟลิปฟลอปตัวที่ 3 ออก"
    ],
    "correctAnswer": 0,
    "explanation": "หากเกิด Noise ทำให้วงจรหลุดเข้าสถานะ 5, 6, 7 วงจรจะต้องสามารถชี้กลับมายัง State 0 ได้เอง (Self-Correction) มิฉะนั้นวงจรจะติดล็อก (Lockout / Hang)"
  },
  {
    "id": "fe-97",
    "chapterId": "ch5",
    "topic": "FSM ROM Data Table Encoding",
    "difficulty": "ยาก",
    "question": "ในการนำ FSM ไปสร้างด้วย ROM ข้อมูลที่บันทึกอยู่ในแต่ละเซลล์ของ ROM (ROM Data) ทำหน้าที่เป็นสัญญาณอะไรของวงจร?",
    "options": [
      "สถานะถัดไป (Next State) และค่าเอาต์พุตของระบบ (Output)",
      "สถานะปัจจุบันเพียงอย่างเดียว",
      "ความถี่ของสัญญาณนาฬิกา",
      "เลขที่ข้อสอบ"
    ],
    "correctAnswer": 0,
    "explanation": "ขา Address รับ {Current State, Inputs} และสิ่งที่ ROM จ่ายออกมาทางขาสายข้อมูล (Data Output) คือ Next State (ส่งกลับเข้า D-FF) และ Output สัญญาณควบคุม"
  },
  {
    "id": "fe-98",
    "chapterId": "ch5",
    "topic": "State Minimization Criteria",
    "difficulty": "ยาก",
    "question": "สถานะ 2 สถานะใน FSM (เช่น State A และ State B) จะถือว่าสมมูลกัน (Equivalent States) และสามารถยุบรวมกันได้เมื่อใด?",
    "options": [
      "เมื่อทั้งสองสถานะให้ Output เดียวกันสำหรับทุกๆ อินพุตที่เป็นไปได้ และเปลี่ยนไปสู่ Next State ที่สมมูลกันด้วย",
      "เมื่อมีชื่อสถานะเหมือนกัน",
      "เมื่อทำงานในสัญญาณนาฬิกาเดียวกัน",
      "เมื่อต่อเข้ากับเกตชนิดเดียวกัน"
    ],
    "correctAnswer": 0,
    "explanation": "ทฤษฎี State Equivalence: สถานะสองสถานะยุบรวมกันได้ถ้าสำหรับทุก Input ให้ผลลัพธ์ Output เหมือนกัน และพาไปยังสถานะถัดไปที่สมมูลกัน"
  },
  {
    "id": "fe-99",
    "chapterId": "ch5",
    "topic": "Metastability Prevention",
    "difficulty": "เข้มข้น",
    "question": "สภาวะกึ่งเสถียร (Metastability) ในฟลิปฟลอปซึ่งเกิดจากการละเมิด Setup/Hold Time สามารถป้องกันหรือบรรเทาผลกระทบในระบบดิจิทัลได้อย่างไร?",
    "options": [
      "ใช้วงจรซิงโครไนเซอร์แบบฟลิปฟลอป 2 ชั้น (Two-Stage Flip-Flop Synchronizer)",
      "เพิ่มแรงดันไฟฟ้า VCC เป็น 2 เท่า",
      "ลดค่าตัวต้านทานพูลอัป",
      "ใช้วงจรรวมแบบแอนะล็อกแทน"
    ],
    "correctAnswer": 0,
    "explanation": "การต่อ D-FF อนุกรมกัน 2 ตัว (Double Flop Synchronizer) ช่วยให้ FF ตัวแรกมีเวลา 1 คาบเต็มในการสลายสถานะกึ่งเสถียร ก่อนส่งสัญญาณที่แน่นอนไปยัง FF ตัวที่สอง"
  },
  {
    "id": "fe-100",
    "chapterId": "ch5",
    "topic": "Clock Skew in Synchronous Systems",
    "difficulty": "เข้มข้น",
    "question": "ปรากฏการณ์ Clock Skew ในวงจรดิจิทัลขนาดใหญ่หมายถึงสิ่งใด?",
    "options": [
      "ความแตกต่างของเวลาที่ขอบสัญญาณนาฬิกาเดินทางไปถึงฟลิปฟลอปแต่ละตัวอันเนื่องมาจากความยาวสายและความจุแฝงที่ต่างกัน",
      "ความถี่ของสัญญาณนาฬิกาเพิ่มขึ้นเรื่อยๆ ตามอุณหภูมิ",
      "การที่สัญญาณนาฬิกาเปลี่ยนจากคลื่นสี่เหลี่ยมเป็นคลื่นไซน์",
      "การสะท้อนกลับของสัญญาณในสายส่ง"
    ],
    "correctAnswer": 0,
    "explanation": "Clock Skew คือความคลาดเคลื่อนของเวลาที่ขอบ Clock ไปถึง Flip-Flop แต่ละตัวไม่พร้อมกัน ซึ่งอาจทำให้เกิด Hold Time Violation หากสายส่งสัญญาณมีความยาวต่างกันมาก"
  }
];
