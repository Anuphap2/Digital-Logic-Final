import { Lesson } from '../types';

export const CURRICULUM_DATA: Lesson[] = [
  // ==========================================
  // CHAPTER 3: Digital Circuit
  // ==========================================
  {
    id: 'ch3-1',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'สัญญาณแอนะล็อก vs ดิจิทัล และการวิเคราะห์สัญญาณรบกวน',
    subtitle: 'เปรียบเทียบคุณสมบัติ ความทนทานต่อสัญญาณรบกวน และสูตรคำนวณความละเอียดของสัญญาณ',
    durationMinutes: 15,
    difficulty: 'พื้นฐาน',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 2-15)',
    summary: 'สัญญาณแอนะล็อกมีความต่อเนื่องแต่ถูกรบกวนง่าย ส่วนสัญญาณดิจิทัลมีเพียง 2 สถานะ (0 และ 1) มีขอบเขตแรงดันชัดเจน จึงทนทานต่อสัญญาณรบกวนและมีความแม่นยำสูง',
    sections: [
      {
        title: '1. สัญญาณแอนะล็อก (Analog Signal)',
        content: `**สัญญาณแอนะล็อก** เป็นการแทนค่าข้อมูลอย่างง่าย โดยแทนค่าเป็นสัดส่วนโดยตรงกับข้อมูล มีความต่อเนื่องตามเวลา เช่น แรงดันไฟฟ้าสูงแทนค่าสูง แรงดันไฟฟ้าต่ำแทนค่าต่ำ

- **ข้อดี**: ใช้งานง่าย วงจรไม่ซับซ้อน ใช้อุปกรณ์น้อย และใช้พื้นที่ในการบันทึกข้อมูลน้อย
- **ข้อเสียสำคัญ**: **ไม่ทนทานต่อสัญญาณรบกวน (Noise)** เมื่อสัญญาณเดินทางผ่านสายไฟหรือถูกคลื่นแม่เหล็กไฟฟ้ารบกวน สัญญาณเดิมจะผิดเพี้ยนไปอย่างถาวรและไม่สามารถกู้คืนค่าเดิมได้อย่างสมบูรณ์`,
        keyPoints: [
          'เป็นสัญญาณที่มีค่าต่อเนื่อง (Continuous values)',
          'ถูกลดทอนและรบกวนได้ง่าย (Susceptible to noise)',
          'ไม่สามารถกู้คืนค่าเดิมได้อย่างแน่นอนเมื่อมี Noise เข้ามาปะปน'
        ]
      },
      {
        title: '2. สูตรการคำนวณความละเอียดสูงสุดของสัญญาณแอนะล็อก (ข้อสอบออกบ่อย!)',
        content: `ในทางปฏิบัติ สัญญาณแอนะล็อกไม่สามารถแทนข้อมูลได้ละเอียดเป็นอนันต์ เพราะถูกจำกัดด้วย **ปริมาณสัญญาณรบกวน (Noise Range)**

**ตัวอย่างจากโจทย์สไลด์ อ.ปวีณ:**
- สัญญาณแรงดันไฟฟ้าอยู่ในช่วง: $0 \\text{ ถึง } 5\\text{V}$ (ช่วงแรงดันรวม $\\Delta V = 5 - 0 = 5\\text{V}$)
- มีสัญญาณรบกวน: $\\pm 0.2\\text{V}$ (ช่วงการแกว่งของสัญญาณรบกวนทั้งหมด $= 0.2 - (-0.2) = 0.4\\text{V}$)
- คำนวณจำนวนรูปแบบข้อมูลสูงสุดที่แทนได้:
$$\\text{จำนวนรูปแบบข้อมูล} = \\frac{\\text{ช่วงแรงดันทั้งหมด}}{\\text{ช่วงสัญญาณรบกวน}} = \\frac{5\\text{V}}{0.4\\text{V}} = 12.5 \\implies 12 \\text{ รูปแบบ}$$`,
        formulas: [
          {
            label: 'จำนวนระดับสัญญาณที่แยกแยะได้',
            formula: 'N = \\lfloor \\frac{V_{max} - V_{min}}{2 \\times |V_{noise}|} \\rfloor',
            note: 'ต้องปัดเศษลงเสมอ เพราะระดับที่ไม่เต็มช่องจะเกิดการทับซ้อนจากสัญญาณรบกวน'
          }
        ],
        examTip: 'ระวังสัญญาณรบกวนแบบ ± (บวกลบ)! ถ้าโจทย์บอกว่าสัญญาณรบกวน ±0.2V ช่วงของสัญญาณรบกวนทั้งหมดคือ 0.4V เสมอ อย่าเอาแค่ 0.2 ไปหารเด็ดขาด!'
      },
      {
        title: '3. สัญญาณดิจิทัล (Digital Signal)',
        content: `**สัญญาณดิจิทัล** เป็นการแทนค่าข้อมูลด้วยตัวเลขเพียง 2 ค่า คือ **"0"** (Logic LOW) และ **"1"** (Logic HIGH) โดยมีเกณฑ์ระดับแรงดันไฟฟ้าแบ่งช่วงชัดเจน ไม่มีความต่อเนื่อง

- **ข้อดีหลัก**:
  1. **ทนทานต่อสัญญาณรบกวนสูงมาก (Noise Immunity)** แม้มีสัญญาณรบกวนแทรกเข้ามา ตราบใดที่แรงดันยังไม่ข้ามเส้นแบ่งตรรกะ ตัวรับก็จะตีความเป็น 0 หรือ 1 ได้อย่างถูกต้อง 100%
  2. **มีความแม่นยำสูง (Precision & Accuracy)**
  3. **จัดเก็บและประมวลผลซ้ำได้โดยไม่สูญเสียคุณภาพ**
- **ระดับแรงดันมาตรฐาน (Logic Levels)**:
  - เช่น ระบบ TTL 5V: ช่วง $0 - 0.8\\text{V}$ แทน Logic 0 และช่วง $2.0 - 5.0\\text{V}$ แทน Logic 1
  - ช่วงแรงดันระหว่าง $0.8\\text{V} - 2.0\\text{V}$ เรียกว่า **Forbidden Zone / Undefined State** ห้ามนำสัญญาณในช่วงนี้ไปใช้งาน`,
        keyPoints: [
          'แบ่งระดับตรรกะชัดเจนด้วย Threshold Voltage',
          'มี Noise Margin ช่วยป้องกันข้อผิดพลาดจากคลื่นรบกวน',
          'เป็นรากฐานของคอมพิวเตอร์และระบบสมาร์ตดีไวซ์ในปัจจุบัน'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q3-1-1',
        chapterId: 'ch3',
        topic: 'Analog Signal Resolution',
        question: 'สัญญาณแอนะล็อกมีแรงดันใช้งานช่วง 0 ถึง 10V และมีสัญญาณรบกวน ±0.25V สัญญาณนี้สามารถแทนระดับข้อมูลที่แยกแยะได้อย่างถูกต้องไม่เกินกี่รูปแบบ?',
        options: ['10 รูปแบบ', '20 รูปแบบ', '40 รูปแบบ', '50 รูปแบบ'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'ช่วงแรงดันใช้งานคือ 10 - 0 = 10V สัญญาณรบกวน ±0.25V มีช่วงการแกว่งทั้งหมดเท่ากับ 0.25 - (-0.25) = 0.5V ดังนั้นจำนวนรูปแบบ = 10 / 0.5 = 20 รูปแบบ'
      },
      {
        id: 'q3-1-2',
        chapterId: 'ch3',
        topic: 'Digital Signal Characteristics',
        question: 'ข้อใดเป็นเหตุผลสำคัญที่สุดที่ระบบคอมพิวเตอร์ในปัจจุบันเลือกใช้สัญญาณดิจิทัลแทนสัญญาณแอนะล็อก?',
        options: [
          'สัญญาณดิจิทัลใช้อุปกรณ์และวงจรที่เรียบง่ายกว่าแอนะล็อก',
          'สัญญาณดิจิทัลมีความทนทานต่อสัญญาณรบกวน (Noise Immunity) สูงมากและเก็บรักษาข้อมูลได้แม่นยำ',
          'สัญญาณดิจิทัลใช้พื้นที่จัดเก็บบันทึกข้อมูลน้อยกว่าสัญญาณแอนะล็อกในทุกกรณี',
          'สัญญาณดิจิทัลสามารถส่งข้อมูลได้ด้วยความเร็วแสงโดยไม่มีการสูญเสียกำลัง'
        ],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'สัญญาณดิจิทัลมีเพียง 2 สถานะ (0 และ 1) พร้อมช่วง Margin กันการรบกวน ทำให้ทนทานต่อคลื่นรบกวนและไม่เกิดความเสื่อมถอยของข้อมูลในการคัดลอกหรือส่งต่อ'
      }
    ]
  },
  {
    id: 'ch3-2',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'ตัวดำเนินการดิจิทัลและลอจิกเกตพื้นฐาน (Logic Gates)',
    subtitle: 'ทำความเข้าใจ NOT, AND, OR, NAND, NOR, XOR, XNOR ตารางค่าความจริง และสัญลักษณ์มาตรฐาน',
    durationMinutes: 20,
    difficulty: 'พื้นฐาน',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 16-45)',
    summary: 'ลอจิกเกตพื้นฐาน 7 ตัวเป็นตัวดำเนินการตรรกะระดับฮาร์ดแวร์ โดยเฉพาะ NAND และ NOR ได้รับการจัดเป็น Universal Gate ที่สามารถประกอบเป็นเกตอื่นๆ ได้ทุกชนิด',
    sections: [
      {
        title: '1. ตารางสรุปลอจิกเกตทั้ง 7 ชนิด (Logic Gates Summary)',
        content: `ลอจิกเกตเป็นวงจรอิเล็กทรอนิกส์ที่รับสัญญาณอินพุต 1 หรือหลายตัว แล้วให้เอาต์พุตดิจิทัล 1 สัญญาณ:

| ชื่อเกต | สัญลักษณ์ตรรกะ | สมการบูลีน | พฤติกรรมของเอาต์พุต (Output Behavior) |
|---|---|---|---|
| **NOT** | $\\neg A$ หรือ $\\bar{A}$ | $Y = \\bar{A}$ | กลับค่าตรรกะ ($0 \\to 1, 1 \\to 0$) |
| **AND** | $A \\cdot B$ | $Y = A B$ | เอาต์พุตเป็น 1 ก็ต่อเมื่อ **อินพุตทุกตัวเป็น 1** |
| **OR** | $A + B$ | $Y = A + B$ | เอาต์พุตเป็น 1 เมื่อ **มีอินพุตตัวใดตัวหนึ่งเป็น 1 ขึ้นไป** |
| **NAND** | $\\overline{A \\cdot B}$ | $Y = \\overline{AB}$ | ตรงข้ามกับ AND (เป็น 0 เมื่อทุกตัวเป็น 1 นอกนั้นเป็น 1) |
| **NOR** | $\\overline{A + B}$ | $Y = \\overline{A+B}$ | ตรงข้ามกับ OR (เป็น 1 เฉพาะเมื่อทุกตัวเป็น 0 เท่านั้น) |
| **XOR** | $A \\oplus B$ | $Y = \\bar{A}B + A\\bar{B}$ | เป็น 1 เมื่อ **อินพุตต่างกัน** (จำนวนเลข 1 เป็นจำนวนคี่) |
| **XNOR** | $\\overline{A \\oplus B}$ | $Y = AB + \\bar{A}\\bar{B}$ | เป็น 1 เมื่อ **อินพุตเหมือนกัน** (Equivalence Detector) |`,
        interactiveType: 'gates',
        keyPoints: [
          'XOR (Exclusive-OR) ทำหน้าที่เป็น Odd Parity Checker และวงจรบวกเลขฐานสอง',
          'XNOR (Exclusive-NOR) ทำหน้าที่เป็นตัวเปรียบเทียบความเท่ากัน (Equality Comparator)',
          'NAND และ NOR มีสถานะเป็น Universal Gates'
        ]
      },
      {
        title: '2. สัญลักษณ์แบบมาตรฐาน IEEE vs ตารางค่าความจริง',
        content: `ข้อสังเกตสำคัญในสัญลักษณ์ลอจิกเกต:
- **วงกลมเล็ก (Inversion Bubble)**: ที่ขั้วเอาต์พุตหมายถึงการกลับค่าตรรกะ (Invert) เช่น AND เติม Bubble กลายเป็น NAND, OR เติม Bubble กลายเป็น NOR
- **อินพุตหลายตัว (Multiple Inputs)**:
  - 3-input AND: $Y = A \\cdot B \\cdot C$ (เป็น 1 เมื่อ $A=B=C=1$)
  - 3-input XOR: $Y = A \\oplus B \\oplus C$ (เป็น 1 เมื่อผลรวมจำนวนของ 1 เป็น **เลขคี่** เช่น 001, 010, 100, 111)`,
        formulas: [
          {
            label: 'สมการ XOR 2 ตัวแปร',
            formula: 'A \\oplus B = \\bar{A}B + A\\bar{B}'
          },
          {
            label: 'สมการ XNOR 2 ตัวแปร',
            formula: '\\overline{A \\oplus B} = A \\odot B = AB + \\bar{A}\\bar{B}'
          }
        ],
        examTip: 'ถ้าเจอ 3-input XOR อย่าลืมว่าผลลัพธ์คือ Odd Function! มี 1 เข้ามา 1 ตัวหรือ 3 ตัว ผลลัพธ์จะเป็น 1 แต่ถ้ามี 1 เข้ามา 0 หรือ 2 ตัว ผลลัพธ์จะเป็น 0 เสมอ'
      }
    ],
    quickQuiz: [
      {
        id: 'q3-2-1',
        chapterId: 'ch3',
        topic: 'Logic Gate Operations',
        question: 'กำหนดให้อินพุต A = 1, B = 0, C = 1 เอาต์พุตของวงจร (A XOR B) XNOR C มีค่าเท่าใด?',
        options: ['0', '1', 'ไม่สามารถระบุได้', 'High Impedance'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'A XOR B = 1 XOR 0 = 1 จากนั้นนำ 1 ไป XNOR กับ C (ซึ่งมีค่า 1) จะได้ 1 XNOR 1 = 1 (เนื่องจากอินพุตเหมือนกัน เอาต์พุต XNOR ย่อมเป็น 1)'
      },
      {
        id: 'q3-2-2',
        chapterId: 'ch3',
        topic: 'Universal Gate Concept',
        question: 'เกตคู่ใดต่อไปนี้ที่ได้รับการจัดให้เป็น Universal Logic Gates?',
        options: ['AND และ OR', 'NOT และ XOR', 'NAND และ NOR', 'XOR และ XNOR'],
        correctAnswer: 2,
        difficulty: 'ง่าย',
        explanation: 'NAND และ NOR เป็น Universal Gate เพราะสามารถนำมาต่อรวมกันเพื่อสร้างเกตพื้นฐานชนิดอื่น (NOT, AND, OR, XOR, XNOR) ได้ครบถ้วนทุกตัว'
      }
    ]
  },
  {
    id: 'ch3-3',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'การวิเคราะห์และสังเคราะห์วงจรเชิงจัดหมู่ (Combinational Circuit)',
    subtitle: 'ขั้นตอนการหาตารางความจริงจากวงจร และการเขียนสมการบูลีนจากตารางความจริง',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 46-75)',
    summary: 'วงจรเชิงจัดหมู่คือวงจรที่เอาต์พุตขึ้นอยู่กับอินพุตปัจจุบันเท่านั้น ไม่มีการจำสถานะในอดีต เรียนรู้วิธีแปลงไปมาระหว่าง วงจร -> สมการ -> ตารางค่าความจริง',
    sections: [
      {
        title: '1. นิยามของวงจรเชิงจัดหมู่ (Combinational Logic Circuit)',
        content: `**วงจรเชิงจัดหมู่ (Combinational Circuit)** คือวงจรดิจิทัลที่เอาต์พุต ณ เวลาใดๆ **ขึ้นอยู่กับค่าของอินพุตในขณะนั้นเท่านั้น**
- ไม่มีหน่วยความจำ (No Memory Elements)
- ไม่มีสายสัญญาณป้อนกลับ (No Feedback Loops)
- ความเร็วของวงจรขึ้นอยู่กับ **Propagation Delay** ของลอจิกเกตแต่ละตัวรวมกัน`,
        keyPoints: [
          'Output = f(Current Inputs)',
          'ไม่มี Clock ควบคุมการทำงาน (Asynchronous by nature)',
          'ตัวอย่าง: Adder, Subtractor, Multiplexer, Decoder, Comparator'
        ]
      },
      {
        title: '2. ขั้นตอนการวิเคราะห์วงจร (Circuit Analysis)',
        content: `เมื่อได้รับแผนผังวงจร (Schematic) และต้องการหาฟังก์ชันการทำงาน:
1. **กำหนดชื่อสัญญาณกึ่งกลาง (Intermediate Variables)** ที่ทางออกของแต่ละเกต
2. **ไล่เขียนสมการบูลีนจากซ้ายไปขวา** (จาก Input มุ่งหน้าสู่ Output)
3. **แทนค่าอินพุตทั้งหมดที่เป็นไปได้ ($2^n$ รูปแบบ)** เพื่อสร้างตารางค่าความจริง (Truth Table)
4. **ลดรูปสมการ** ด้วยพีชคณิตบูลีนหรือ K-Map เพื่อดูว่าวงจรเดิมใช้เกตเกินความจำเป็นหรือไม่`,
        examTip: 'เวลาไล่สายในข้อสอบ ระวังจุดเชื่อมต่อ (Node Dot) ถ้าสายพาดทับกันโดยไม่มีจุดทึบ แสดงว่าสายไฟไม่ได้ต่อถึงกัน อย่าเอาสัญญาณมารวมกันเด็ดขาด'
      }
    ],
    quickQuiz: [
      {
        id: 'q3-3-1',
        chapterId: 'ch3',
        topic: 'Combinational Logic Definition',
        question: 'ข้อใดคือลักษณะเฉพาะที่สำคัญที่สุดของวงจรเชิงจัดหมู่ (Combinational Circuit)?',
        options: [
          'ต้องมีสัญญาณนาฬิกา (Clock) คอยกระตุ้นจึงจะเปลี่ยนค่าได้',
          'เอาต์พุตขึ้นอยู่กับอินพุตในปัจจุบันและสถานะในอดีตร่วมกัน',
          'เอาต์พุตขึ้นอยู่กับค่าของอินพุตในปัจจุบันเท่านั้น และไม่มีสายสัญญาณป้อนกลับ',
          'ใช้อุปกรณ์ประเภทฟลิปฟลอปเป็นแกนหลักในการเก็บข้อมูล'
        ],
        correctAnswer: 2,
        difficulty: 'ง่าย',
        explanation: 'วงจรเชิงจัดหมู่ไม่มีองค์ประกอบของการจำค่า (No memory/feedback) เอาต์พุตจึงเป็นฟังก์ชันของอินพุต ณ ขณะนั้นโดยตรง'
      }
    ]
  },
  {
    id: 'ch3-4',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'วงจรบวกเลขดิจิทัล (Half Adder & Full Adder)',
    subtitle: 'โครงสร้างวงจรบวกครึ่งตัว วงจรบวกเต็มตัว และสมการ Sum & Carry Out',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 76-99)',
    summary: 'Half Adder บวกเลขฐานสอง 2 บิตได้ผลรวม (Sum) และตัวทด (Carry) ส่วน Full Adder เพิ่มอินพุตตัวทดเข้า (Cin) ทำให้สามารถนำมาต่อเรียงกันเพื่อบวกเลขหลายบิตได้',
    sections: [
      {
        title: '1. วงจรบวกครึ่งตัว (Half Adder: HA)',
        content: `ทำหน้าที่บวกเลขฐานสอง 2 บิต คือ $A$ และ $B$ ได้ผลลัพธ์เป็นผลรวม ($S$) และตัวทด ($C$):

| $A$ | $B$ | Sum ($S$) | Carry ($C$) |
|:---:|:---:|:---------:|:-----------:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

- **สมการ Sum**: $S = A \\oplus B$ (ใช้ XOR Gate 1 ตัว)
- **สมการ Carry**: $C = A \\cdot B$ (ใช้ AND Gate 1 ตัว)
- **ข้อจำกัด**: ไม่สามารถรับตัวทดมาจากหลักก่อนหน้าได้ จึงใช้ได้เฉพาะกับบิตขวาสุด (LSB) เท่านั้น`,
        formulas: [
          { label: 'Half Adder Sum', formula: 'S = A \\oplus B' },
          { label: 'Half Adder Carry', formula: 'C = A \\cdot B' }
        ]
      },
      {
        title: '2. วงจรบวกเต็มตัว (Full Adder: FA)',
        content: `สามารถรับอินพุตได้ 3 ตัว คือ บิตตัวตั้ง $A$, บิตตัวบวก $B$ และตัวทดที่ส่งมาจากหลักก่อนหน้า $C_{in}$:
- **สมการ Sum**:
$$S = A \\oplus B \\oplus C_{in}$$
- **สมการ Carry Out ($C_{out}$)**:
$$C_{out} = A B + C_{in}(A \\oplus B) = A B + B C_{in} + A C_{in}$$
- **การประกอบ Full Adder จาก Half Adder**:
  - ใช้ **Half Adder 2 ตัว** + **OR Gate 1 ตัว**
  - $HA_1$ บวก $A$ กับ $B$ ได้ $S_1 = A \\oplus B$ และ $C_1 = A B$
  - $HA_2$ บวก $S_1$ กับ $C_{in}$ ได้ $S = S_1 \\oplus C_{in}$ และ $C_2 = S_1 \\cdot C_{in}$
  - นำ $C_1$ และ $C_2$ เข้า OR Gate เพื่อสร้าง $C_{out} = C_1 + C_2$`,
        formulas: [
          { label: 'Full Adder Sum', formula: 'S = A \\oplus B \\oplus C_{in}' },
          { label: 'Full Adder Carry Out', formula: 'C_{out} = AB + C_{in}(A \\oplus B)' }
        ],
        examTip: 'ข้อสอบชอบถามว่า "ต้องใช้ Half Adder กี่ตัว และเกตอะไรอีก 1 ตัวในการสร้าง Full Adder?" คำตอบคือ: ใช้ Half Adder 2 ตัว และ OR Gate 1 ตัว!'
      }
    ],
    quickQuiz: [
      {
        id: 'q3-4-1',
        chapterId: 'ch3',
        topic: 'Full Adder Construction',
        question: 'หากต้องการสร้าง Full Adder 1 ตัว โดยใช้ Half Adder จะต้องใช้อุปกรณ์ใดบ้าง?',
        options: [
          'Half Adder 2 ตัว และ AND Gate 1 ตัว',
          'Half Adder 2 ตัว และ OR Gate 1 ตัว',
          'Half Adder 3 ตัว โดยไม่ต้องใช้เกตอื่นเพิ่ม',
          'Half Adder 1 ตัว และ XOR Gate 2 ตัว'
        ],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'Full Adder สร้างขึ้นจาก Half Adder 2 ตัว (ตัวแรกบวก A, B ตัวที่สองบวกผลลัพธ์กับ Cin) และนำสัญญาณ Carry จากทั้งสองตัวมารวมกันผ่าน OR Gate 1 ตัว'
      }
    ]
  },

  // ==========================================
  // CHAPTER 4: Digital Circuit Simplification
  // ==========================================
  {
    id: 'ch4-1',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Circuit Simplification (การลดรูปวงจรดิจิทัล)',
    title: 'พีชคณิตบูลีนและทฤษฎีบทของเดอมอร์แกน (De Morgan’s Laws)',
    subtitle: 'กฎพีชคณิตพื้นฐาน กฎการดูดซับ และทฤษฎีเดอมอร์แกนสำหรับลดรูปวงจร',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '04_digitalCircuit_simplication.pdf (สไลด์หน้า 2-25)',
    summary: 'การลดรูปสมการบูลีนช่วยลดจำนวนเกต ประหยัดพื้นที่ชิป ลดการกินพลังงาน และลดความหน่วงของสัญญาณ ทฤษฎีบทของเดอมอร์แกนช่วยกระจายตัวกลับค่าระหว่าง AND กับ OR',
    sections: [
      {
        title: '1. ตารางกฎพีชคณิตบูลีนที่ต้องจำเข้าห้องสอบ (Boolean Postulates)',
        content: `| ชื่อกฎ (Law) | การบวกทางตรรกะ (OR) | การคูณทางตรรกะ (AND) |
|---|---|---|
| **Identity Law** | $A + 0 = A$ | $A \\cdot 1 = A$ |
| **Null / Annihilator** | $A + 1 = 1$ | $A \\cdot 0 = 0$ |
| **Idempotent** | $A + A = A$ | $A \\cdot A = A$ |
| **Inverse / Complement**| $A + \\bar{A} = 1$ | $A \\cdot \\bar{A} = 0$ |
| **Double Negation** | $\\overline{\\bar{A}} = A$ | - |
| **Distributive** | $A + (B \\cdot C) = (A + B)(A + C)$ | $A(B + C) = AB + AC$ |
| **Absorption** | $A + AB = A$ | $A(A + B) = A$ |
| **Consensus / Redundancy**| $A + \\bar{A}B = A + B$ | $\\bar{A} + AB = \\bar{A} + B$ |`,
        keyPoints: [
          'ระวังกฎการแจกแจงแบบที่ 2: A + BC = (A+B)(A+C) ซึ่งไม่มีในพีชคณิตคณิตศาสตร์ทั่วไป แต่เป็นจริงเสมอในบูลีน',
          'กฎการตัดทอน A + A\'B = A + B เป็นเทคนิคที่ช่วยลดรูปข้อสอบได้เร็วมาก'
        ]
      },
      {
        title: '2. ทฤษฎีบทของเดอมอร์แกน (De Morgan’s Theorems)',
        content: `ทฤษฎีเดอมอร์แกนมีหัวใจสำคัญคือ **"Break the line, change the sign"** (ตัดขีดด้านบน และเปลี่ยนเครื่องหมาย):
1. **ทฤษฎีข้อที่ 1 (NOR to Inverted AND)**:
$$\\overline{A + B} = \\bar{A} \\cdot \\bar{B}$$
*การกลับค่าของผลบวก เท่ากับ ผลคูณของตัวแปรที่ถูกกลับค่าแต่ละตัว*

2. **ทฤษฎีข้อที่ 2 (NAND to Inverted OR)**:
$$\\overline{A \\cdot B} = \\bar{A} + \\bar{B}$$
*การกลับค่าของผลคูณ เท่ากับ ผลบวกของตัวแปรที่ถูกกลับค่าแต่ละตัว*`,
        formulas: [
          { label: 'De Morgan 1', formula: '\\overline{A + B} = \\bar{A} \\cdot \\bar{B}' },
          { label: 'De Morgan 2', formula: '\\overline{A \\cdot B} = \\bar{A} + \\bar{B}' }
        ],
        examTip: 'เวลาทำโจทย์ที่มีแถบ Invert ซ้อนกันหลายชั้น ให้ค่อยๆ ทำจากแถบยาวด้านบนลงมา หรือจากแถบสั้นด้านในออกไป อย่าลืมเปลี่ยน + เป็น · และเปลี่ยน · เป็น + ทุกครั้งที่ตัดเส้น'
      }
    ],
    quickQuiz: [
      {
        id: 'q4-1-1',
        chapterId: 'ch4',
        topic: 'De Morgan Application',
        question: 'สมการบูลีน (A + B\')\' เมื่อกระจายด้วยทฤษฎีของเดอมอร์แกนจะได้ผลลัพธ์ตรงกับข้อใด?',
        options: ['A\' + B', 'A\' · B', 'A · B\'', 'A\' + B\''],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: '(A + B\')\' = A\' · (B\')\' = A\' · B'
      },
      {
        id: 'q4-1-2',
        chapterId: 'ch4',
        topic: 'Absorption Law',
        question: 'จงลดรูปสมการ F = A + A\'·B ให้เป็นรูปที่เรียบง่ายที่สุด',
        options: ['A · B', 'A + B', 'A', 'B'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'จากกฎการแจกแจง A + A\'B = (A + A\')(A + B) เนื่องจาก A + A\' = 1 ดังนั้นจึงเหลือ 1 · (A + B) = A + B'
      }
    ]
  },
  {
    id: 'ch4-2',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Circuit Simplification (การลดรูปวงจรดิจิทัล)',
    title: 'รูปแบบบัญญัติ Minterms (SOP) และ Maxterms (POS)',
    subtitle: 'ความเข้าใจ Sum of Products, Product of Sums และการแปลงรหัสตารางค่าความจริง',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '04_digitalCircuit_simplication.pdf (สไลด์หน้า 26-42)',
    summary: 'Minterm พิจารณาช่องที่ Output เป็น 1 เขียนในรูปผลคูณ (AND) แล้วนำมาบวกกัน (SOP) ส่วน Maxterm พิจารณาช่องที่ Output เป็น 0 เขียนในรูปผลบวก (OR) แล้วนำมาคูณกัน (POS)',
    sections: [
      {
        title: '1. Minterm และรูปแบบผลบวกของผลคูณ (Sum of Products: SOP)',
        content: `**Minterm ($m_i$)**: คือพจน์ผลคูณ (AND) ของตัวแปรทุกตัวในระบบ โดยกำหนดให้:
- ตัวแปรที่มีค่าเป็น $1 \\implies$ เขียนตัวแปรนั้นตรงๆ เช่น $A$
- ตัวแปรที่มีค่าเป็น $0 \\implies$ เขียนตัวแปรที่มีแถบกลับค่า เช่น $\\bar{A}$

**ตัวอย่างระบบ 3 ตัวแปร ($A, B, C$)**:
- แถวที่ $0$ ($A=0, B=0, C=0$) $\\implies m_0 = \\bar{A}\\bar{B}\\bar{C}$
- แถวที่ $5$ ($A=1, B=0, C=1$) $\\implies m_5 = A\\bar{B}C$

**SOP (Sum of Minterms)**:
เขียนแทนด้วยสัญลักษณ์ผลรวม:
$$F(A,B,C) = \\sum m(1, 3, 5, 7) = \\bar{A}\\bar{B}C + \\bar{A}BC + A\\bar{B}C + ABC$$`,
        keyPoints: [
          'SOP สร้างจากแถวที่เอาต์พุตเท่ากับ 1',
          'โครงสร้างระดับเกต: เป็นแบบ AND-to-OR (2 ระดับ)'
        ]
      },
      {
        title: '2. Maxterm และรูปแบบผลคูณของผลบวก (Product of Sums: POS)',
        content: `**Maxterm ($M_i$)**: คือพจน์ผลบวก (OR) ของตัวแปรทุกตัว โดยมีกฎตรงกันข้ามกับ Minterm:
- ตัวแปรที่มีค่าเป็น $0 \\implies$ เขียนตัวแปรนั้นตรงๆ เช่น $A$
- ตัวแปรที่มีค่าเป็น $1 \\implies$ เขียนตัวแปรกลับค่า เช่น $\\bar{A}$

**POS (Product of Maxterms)**:
เขียนแทนด้วยสัญลักษณ์ผลคูณ $\\prod$:
$$F(A,B,C) = \\prod M(0, 2, 4, 6) = (A+B+C)(A+\\bar{B}+C)(\\bar{A}+B+C)(\\bar{A}+\\bar{B}+C)$$

**ความสัมพันธ์ระหว่าง SOP และ POS**:
ช่องที่เหลือจาก $\\sum m$ จะเป็นช่องของ $\\prod M$ พอดี!
$$F = \\sum m(1, 3, 5, 7) \\iff F = \\prod M(0, 2, 4, 6)$$`,
        examTip: 'จำง่ายๆ: Minterm มองหาเลข 1 (ตัวแปรปกติ=1, บาร์=0) ส่วน Maxterm มองหาเลข 0 (ตัวแปรปกติ=0, บาร์=1)'
      }
    ],
    quickQuiz: [
      {
        id: 'q4-2-1',
        chapterId: 'ch4',
        topic: 'Minterm Formulation',
        question: 'ในระบบ 3 ตัวแปร (A, B, C) พจน์ Minterm m3 ตรงกับข้อใดต่อไปนี้?',
        options: ['A\' · B\' · C', 'A\' · B · C', 'A · B\' · C', 'A · B · C\''],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'เลข 3 ในเลขฐานสอง 3 บิตคือ 011 ดังนั้น A=0 (A\'), B=1 (B), C=1 (C) จึงได้พจน์ m3 = A\' B C'
      }
    ]
  },
  {
    id: 'ch4-3',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Circuit Simplification (การลดรูปวงจรดิจิทัล)',
    title: 'แผนผังคาร์โนห์ (Karnaugh Map) และเงื่อนไข Don’t Care',
    subtitle: 'กฎการจัดกลุ่ม 2, 4, 8, 16 เซลล์ การวนขอบ และการใช้สภาวะไม่สนใจเพื่อลดรูปสูงสุด',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '04_digitalCircuit_simplication.pdf (สไลด์หน้า 43-78)',
    summary: 'K-Map จัดเรียงเซลล์ตาม Gray Code (ต่างกัน 1 บิตต่อช่องที่ติดกัน) กฎเหล็กคือต้องจัดกลุ่มให้มีขนาดเป็น $2^n$ เซลล์ และให้มีขนาดใหญ่ที่สุดเท่าที่จะทำได้',
    sections: [
      {
        title: '1. โครงสร้างและการเรียงลำดับ Gray Code ใน K-Map',
        content: `เหตุผลที่ K-Map สามารถลดรูปได้อย่างรวดเร็วทางสายตา เพราะแถวและคอลัมน์ถูกจัดเรียงด้วย **Gray Code**:
$$00 \\to 01 \\to 11 \\to 10$$
สังเกตว่าจาก $01$ จะข้ามไป $11$ ก่อน แล้วจึงเป็น $10$ เพื่อให้แต่ละช่องที่อยู่ติดกันมีค่าตัวแปรต่างกันเพียง **1 บิตเท่านั้น**

**พิกัดของตาราง K-Map 4 ตัวแปร ($A B \\times C D$)**:
\`\`\`
       CD: 00   01   11   10
AB=00 |  0 |  1 |  3 |  2 |
AB=01 |  4 |  5 |  7 |  6 |
AB=11 | 12 | 13 | 15 | 14 |
AB=10 |  8 |  9 | 11 | 10 |
\`\`\``,
        interactiveType: 'kmap',
        keyPoints: [
          'ขนาดของกลุ่มต้องเป็นเลขยกกำลังสอง: 1, 2, 4, 8, 16 เซลล์',
          'กลุ่มขนาด 2 เซลล์ กำจัดตัวแปรได้ 1 ตัว',
          'กลุ่มขนาด 4 เซลล์ กำจัดตัวแปรได้ 2 ตัว',
          'กลุ่มขนาด 8 เซลล์ กำจัดตัวแปรได้ 3 ตัว',
          'กลุ่มขนาด 16 เซลล์ ผลลัพธ์เท่ากับ 1 เสมอ'
        ]
      },
      {
        title: '2. กฎการจัดกลุ่ม (Grouping Rules) และเทคนิคขั้นสูง',
        content: `1. **กลุ่มต้องเป็นสี่เหลี่ยมผืนผ้าหรือจัตุรัสเท่านั้น**: ห้ามจัดกลุ่มเป็นรูปตัว L หรือแนวทแยงมุม
2. **ขอบตารางติดกัน (Wrap-around)**: ขอบซ้ายติดกับขอบขวา และขอบบนติดกับขอบล่าง
3. **มุมทั้ง 4 รวมเป็นกลุ่มขนาด 4 ได้**: เซลล์ 0, 2, 8, 10 รวมกันเป็นกลุ่มขนาด 4 ได้พจน์ $\\bar{B}\\bar{D}$
4. **Essential Prime Implicant (EPI)**: คือกลุ่มที่มีเลข 1 อย่างน้อย 1 ตัวที่ไม่ถูกกลุ่มอื่นใดคลุมเลย กลุ่มนี้ **ต้องถูกเลือกใส่ในคำตอบเสมอ**
5. **หลีกเลี่ยงกลุ่มซ้ำซ้อน (Redundant Groups)**: หากเลข 1 ในกลุ่มหนึ่งถูกคลุมด้วยกลุ่มจำเป็นอื่นๆ ครบทุกตัวแล้ว ห้ามใส่กลุ่มนั้นลงในคำตอบ`,
        examTip: 'ข้อสอบชอบออกเรื่องมุมทั้ง 4! เซลล์ 0, 2, 8, 10 รวมกันได้กลุ่มขนาด 4 เซลล์ ตัดตัวแปรออกได้ 2 ตัวเหลือแค่ B\'D\' อย่าเผลอมองข้ามแล้วไปจับคู่แค่ 2 เซลล์'
      },
      {
        title: '3. สภาวะไม่สนใจ (Don’t Care Conditions: d หรือ X)',
        content: `ในระบบจริง มักมีอินพุตบางรูปแบบที่ **ไม่มีวันเกิดขึ้น** หรือเกิดขึ้นแล้วเอาต์พุตจะเป็นอะไรก็ได้ (เช่น เลข BCD 10-15 ที่ไม่มีในรหัส 0-9)
- เราสามารถกำหนดให้ช่อง Don't Care ($X$) เป็น **1** เพื่อช่วยขยายกลุ่มของ 1 ให้มีขนาดใหญ่ขึ้น (เช่น จากกลุ่ม 2 ขยายเป็นกลุ่ม 4)
- แต่ถ้า $X$ ช่องไหนไม่ได้ช่วยให้กลุ่ม 1 ใหญ่ขึ้น เราสามารถปล่อยให้มันเป็น **0** ได้ โดยไม่ต้องพยายามจัดกลุ่มให้ครอบคลุม $X$ ทุกตัว`,
        formulas: [
          {
            label: 'ฟังก์ชันพร้อม Don\'t Care',
            formula: 'F(A,B,C,D) = \\sum m(1,3,7,11,15) + d(0,2,5)',
            note: 'สามารถนำช่อง 0, 2, 5 มารวมกลุ่มด้วยได้ถ้าช่วยลดรูป'
          }
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q4-3-1',
        chapterId: 'ch4',
        topic: 'K-Map Corner Grouping',
        question: 'ใน K-Map 4 ตัวแปร (A, B, C, D) หากมีเลข 1 อยู่ที่เซลล์ 0, 2, 8, 10 กลุ่มนี้สามารถรวมกันได้ผลลัพธ์ที่ลดรูปแล้วตรงกับข้อใด?',
        options: ['A\' · C\'', 'B\' · D\'', 'A\' · D\'', 'B · D'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'เซลล์ 0, 2, 8, 10 คือมุมทั้ง 4 ของตาราง สังเกตว่าในแกนตั้ง AB=00 และ 10 มีตัวร่วมคือ B=0 (B\') ส่วนแกนนอน CD=00 และ 10 มีตัวร่วมคือ D=0 (D\') ผลลัพธ์จึงได้ B\'D\''
      }
    ]
  },
  {
    id: 'ch4-4',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Circuit Simplification (การลดรูปวงจรดิจิทัล)',
    title: 'การสร้างวงจรด้วย Universal Gates (NAND-only & NOR-only)',
    subtitle: 'การแปลงวงจร AND-OR (SOP) เป็น NAND ล้วน และ OR-AND (POS) เป็น NOR ล้วน',
    durationMinutes: 15,
    difficulty: 'ปานกลาง',
    slideRef: '04_digitalCircuit_simplication.pdf (สไลด์หน้า 60-78)',
    summary: 'โรงงานผลิตชิป IC นิยมใช้ NAND หรือ NOR เพียงชนิดเดียวเพื่อประหยัดต้นทุนการผลิต วงจร SOP สามารถแทนที่ด้วย NAND สองระดับได้ทันที',
    sections: [
      {
        title: '1. การแปลงวงจร SOP สู่ NAND-only Logic (2-Level NAND)',
        content: `กฎสำคัญที่ใช้บ่อยที่สุดในการออกแบบฮาร์ดแวร์จริง:
- วงจรในรูปแบบ **Sum of Products (SOP)** ที่ประกอบด้วย AND gate ในระดับที่หนึ่ง และ OR gate ในระดับที่สอง
- สามารถ **แทนที่ AND ทุกตัว และ OR ทุกตัว ด้วย NAND Gate ได้ทันที 1:1** โดยไม่ต้องเปลี่ยนตัวแปรอินพุตเลย (ถ้าสมการอยู่ในรูป Minimum SOP)
- พิสูจน์ด้วยเดอมอร์แกน:
$$Y = AB + CD = \\overline{\\overline{AB + CD}} = \\overline{(\\overline{AB}) \\cdot (\\overline{CD})}$$
ด้านในคือ NAND ของ $AB$ และ NAND ของ $CD$ จากนั้นนำผลลัพธ์มาเข้า NAND อีกครั้ง!`,
        keyPoints: [
          'AND-OR Logic (SOP) = NAND-NAND Logic',
          'OR-AND Logic (POS) = NOR-NOR Logic'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q4-4-1',
        chapterId: 'ch4',
        topic: 'Universal NAND Conversion',
        question: 'วงจรสองระดับที่ประกอบด้วย AND เกตในระดับแรก และต่อเข้า OR เกตในระดับที่สอง (SOP) สามารถแปลงเป็นเกตชนิดเดียวกันทั้งหมดได้อย่างไร?',
        options: [
          'แทนที่เกตทั้งหมดด้วย NOR Gate',
          'แทนที่เกตทั้งหมดด้วย NAND Gate โดยตรง',
          'แทนที่เกตทั้งหมดด้วย XOR Gate',
          'ไม่สามารถทำได้ ต้องมี Inverter แทรกเสมอ'
        ],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'ตามทฤษฎีเดอมอร์แกน วงจร AND-OR (SOP) เทียบเท่ากับวงจร NAND-NAND 2 ระดับอย่างสมบูรณ์'
      }
    ]
  },

  // ==========================================
  // CHAPTER 5: Sequential Circuit
  // ==========================================
  {
    id: 'ch5-1',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuit (วงจรเชิงลำดับ)',
    title: 'บทนำวงจรเชิงลำดับ สัญญาณนาฬิกา และไอซีไทเมอร์ 555',
    subtitle: 'ความแตกต่างจาก Combinational Circuit การสร้าง Clock และสูตรคำนวณความถี่ Duty Cycle',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '05_SequentialCircuit.pdf (สไลด์หน้า 2-25)',
    summary: 'วงจรเชิงลำดับมีหน่วยความจำ (Memory) โดยเอาต์พุตขึ้นอยู่กับอินพุตปัจจุบันและสถานะก่อนหน้า ใช้สัญญาณนาฬิกา (Clock) ในการควบคุมจังหวะ โดยสร้างได้จากไอซี 555',
    sections: [
      {
        title: '1. เปรียบเทียบ Combinational vs Sequential Circuit',
        content: `| คุณสมบัติ | Combinational Circuit | Sequential Circuit |
|---|---|---|
| **การพึ่งพาของเอาต์พุต** | ขึ้นกับอินพุตปัจจุบันเท่านั้น | ขึ้นกับอินพุตปัจจุบัน **และสถานะเดิมในอดีต** |
| **หน่วยความจำ** | ไม่มี (No Memory) | มี Memory Element (Latch, Flip-Flop) |
| **สายสัญญาณป้อนกลับ** | ไม่มี (No Feedback loop) | มี Feedback loop จาก Output ย้อนกลับมา Input |
| **สัญญาณนาฬิกา (Clock)**| ส่วนใหญ่ไม่ต้องใช้ | จำเป็นต้องใช้ควบคุมการเปลี่ยนสถานะ |
| **ตัวอย่าง** | Adder, MUX, Decoder | Flip-Flop, Register, Counter, FSM, CPU |`,
        keyPoints: [
          'Sequential Logic = Combinational Logic + Memory Elements',
          'สถานะปัจจุบัน (Present State) จะถูกบันทึกไว้เพื่อกำหนดสถานะถัดไป (Next State)'
        ]
      },
      {
        title: '2. สูตรคำนวณวงจร Astable 555 Timer (ข้อสอบคำนวณออกแน่นอน!)',
        content: `ไอซี 555 ในโหมด Astable Multivibrator จะสร้างสัญญาณพัลส์สี่เหลี่ยมต่อเนื่อง โดยมีสูตรคำนวณเวลาและค่าความถี่ดังนี้:
- **เวลาช่วงสถานะ HIGH ($T_H$ หรือ $T_{on}$)**:
$$T_H = 0.693 \\times (R_1 + R_2) \\times C$$
- **เวลาช่วงสถานะ LOW ($T_L$ หรือ $T_{off}$)**:
$$T_L = 0.693 \\times R_2 \\times C$$
- **คาบเวลาทั้งหมด ($T$)**:
$$T = T_H + T_L = 0.693 \\times (R_1 + 2 R_2) \\times C$$
- **ความถี่ของสัญญาณ ($f$)**:
$$f = \\frac{1}{T} = \\frac{1.44}{(R_1 + 2 R_2) \\times C}$$
- **ดิวตีไซเคิล (Duty Cycle)**:
$$\\text{Duty Cycle} = \\frac{T_H}{T} \\times 100\\% = \\frac{R_1 + R_2}{R_1 + 2 R_2} \\times 100\\%$$`,
        formulas: [
          { label: 'TH (Time High)', formula: 'T_H = 0.693(R_1 + R_2)C' },
          { label: 'TL (Time Low)', formula: 'T_L = 0.693 R_2 C' },
          { label: 'ความถี่ f', formula: 'f = \\frac{1.44}{(R_1 + 2R_2)C}' },
          { label: 'Duty Cycle %', formula: '\\frac{R_1 + R_2}{R_1 + 2R_2} \\times 100\\%' }
        ],
        examTip: 'สังเกตว่าในสูตรมาตรฐานของ 555 ค่า TH จะต้องมากกว่า TL เสมอ ทำให้ Duty Cycle จะต้องมากกว่า 50% เสมอในวงจรพื้นฐานนี้!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-1-1',
        chapterId: 'ch5',
        topic: '555 Timer Calculations',
        question: 'วงจร 555 Astable ต่อตัวต้านทาน R1 = 10kΩ, R2 = 10kΩ และ C = 0.1μF จงหา Duty Cycle ของสัญญาณเอาต์พุตที่ได้?',
        options: ['33.3%', '50.0%', '66.7%', '75.0%'],
        correctAnswer: 2,
        difficulty: 'ปานกลาง',
        explanation: 'Duty Cycle = (R1 + R2) / (R1 + 2*R2) * 100% = (10k + 10k) / (10k + 20k) * 100% = 20k / 30k * 100% = 66.67%'
      }
    ]
  },
  {
    id: 'ch5-2',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuit (วงจรเชิงลำดับ)',
    title: 'แลตช์และฟลิปฟลอป (Latches, Flip-Flops & Excitation Tables)',
    subtitle: 'SR Latch, D Flip-Flop, JK Flip-Flop, T Flip-Flop ตารางคุณลักษณะ และตารางกระตุ้น',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '05_SequentialCircuit.pdf (สไลด์หน้า 26-65)',
    summary: 'Latch ไวต่อระดับสัญญาณ (Level-sensitive) ส่วน Flip-Flop ไวต่อขอบสัญญาณนาฬิกา (Edge-triggered) ตาราง Excitation Table เป็นกุญแจสำคัญที่สุดในการออกแบบวงจรนับและ FSM',
    sections: [
      {
        title: '1. SR Latch (Set-Reset Latch)',
        content: `สร้างขึ้นจากเกต 2 ตัวต่อไขว้กัน (Cross-coupled):
- **NOR Gate SR Latch (Active High)**:
  - $S=0, R=0 \\implies$ คงสถานะเดิม (Hold / No change: $Q_{next} = Q$)
  - $S=0, R=1 \\implies$ รีเซ็ต (Reset: $Q_{next} = 0$)
  - $S=1, R=0 \\implies$ เซ็ต (Set: $Q_{next} = 1$)
  - $S=1, R=1 \\implies$ **สภาวะห้ามใช้ (Forbidden / Invalid State)** เพราะทำให้ $Q$ และ $\\bar{Q}$ กลายเป็น 0 พร้อมกัน
- **ปัญหา Transparency**: ในช่วงที่สัญญาณ Enable เป็น 1 ข้อมูลสามารถไหลทะลุผ่านไปได้ตลอดเวลา ทำให้ไม่เหมาะกับการใช้งานที่ต้องการการซิงโครไนซ์ที่แม่นยำ`,
        interactiveType: 'flipflop',
        keyPoints: [
          'NOR Latch: สภาวะห้ามคือ S=1, R=1',
          'NAND Latch: สภาวะห้ามคือ S=0, R=0 (Active Low)'
        ]
      },
      {
        title: '2. ฟลิปฟลอปหลัก 3 ชนิด: D, JK, และ T Flip-Flop',
        content: `**1. D Flip-Flop (Data / Delay)**:
- ขจัดปัญหาสภาวะห้ามใช้ของ SR
- สมการคุณลักษณะ: $$Q_{next} = D$$
- มีค่าตามอินพุต D ทันทีที่ขอบสัญญาณนาฬิกามาถึง

**2. JK Flip-Flop (Universal Flip-Flop)**:
- แก้ปัญหาสภาวะห้ามใช้ของ SR โดยเมื่อ $J=1, K=1$ จะเกิดการ **Toggle (กลับค่าตรรกะ)**
- สมการคุณลักษณะ: $$Q_{next} = J\\bar{Q} + \\bar{K}Q$$
  - $J=0, K=0 \\implies$ Hold ($Q$)
  - $J=0, K=1 \\implies$ Reset ($0$)
  - $J=1, K=0 \\implies$ Set ($1$)
  - $J=1, K=1 \\implies$ Toggle ($\\bar{Q}$)

**3. T Flip-Flop (Toggle)**:
- สร้างจาก JK โดยรวบ $J$ และ $K$ เข้าด้วยกัน ($J=K=T$)
- สมการคุณลักษณะ: $$Q_{next} = T \\oplus Q$$
  - $T=0 \\implies$ Hold ($Q$)
  - $T=1 \\implies$ Toggle ($\\bar{Q}$) ช่วยหารความถี่ของสัญญาณนาฬิกาลงครึ่งหนึ่ง ($f/2$)`,
        formulas: [
          { label: 'D-FF Characteristic', formula: 'Q_{next} = D' },
          { label: 'JK-FF Characteristic', formula: 'Q_{next} = J\\bar{Q} + \\bar{K}Q' },
          { label: 'T-FF Characteristic', formula: 'Q_{next} = T \\oplus Q' }
        ]
      },
      {
        title: '3. ตารางกระตุ้น (Excitation Table: สำคัญที่สุดในการสอบ!)',
        content: `เมื่อเราทราบว่าต้องการเปลี่ยนสถานะจาก $Q$ ไปเป็น $Q_{next}$ จะต้องป้อนอินพุตเท่าใดให้แก่ฟลิปฟลอป:

| สถานะเดิม ($Q$) | สถานะถัดไป ($Q_{next}$) | อินพุต $D$ | อินพุต $T$ | อินพุต $J$ | อินพุต $K$ |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **0** | **0** | 0 | 0 | **0** | **X** |
| **0** | **1** | 1 | 1 | **1** | **X** |
| **1** | **0** | 0 | 1 | **X** | **1** |
| **1** | **1** | 1 | 0 | **X** | **0** |`,
        examTip: 'ท่องจำ JK Excitation Table ให้ขึ้นใจ: 0->0 ได้ (0,X), 0->1 ได้ (1,X), 1->0 ได้ (X,1), 1->1 ได้ (X,0) การใส่ Don\'t Care (X) ถูกต้องจะทำให้ลดรูปวงจรนับได้ง่ายดายมาก!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-2-1',
        chapterId: 'ch5',
        topic: 'JK Flip-Flop Excitation',
        question: 'หากต้องการให้ JK Flip-Flop เปลี่ยนสถานะจาก Q = 1 ไปเป็น Q_next = 0 จะต้องป้อนอินพุต J และ K อย่างไร?',
        options: ['J = 0, K = 1', 'J = X, K = 1', 'J = 1, K = X', 'J = X, K = 0'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'จาก 1 ไป 0 สามารถทำได้ด้วยคำสั่ง Reset (J=0, K=1) หรือคำสั่ง Toggle (J=1, K=1) ดังนั้น K ต้องเป็น 1 แน่นอน ส่วน J เป็นอะไรก็ได้ (Don\'t Care: X) สรุปคือ J=X, K=1'
      }
    ]
  },
  {
    id: 'ch5-3',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuit (วงจรเชิงลำดับ)',
    title: 'เรจิสเตอร์และเรจิสเตอร์เลื่อนข้อมูล (Registers & Shift Registers)',
    subtitle: 'SISO, SIPO, PISO, PIPO และการประยุกต์ใช้งานในระบบรับส่งข้อมูลและคำนวณ',
    durationMinutes: 15,
    difficulty: 'ปานกลาง',
    slideRef: '05_SequentialCircuit.pdf (สไลด์หน้า 66-95)',
    summary: 'เรจิสเตอร์ประกอบด้วย Flip-Flop หลายตัวเพื่อเก็บข้อมูลไบนารีขนาดหลายบิต Shift Register มี 4 รูปแบบหลักตามลักษณะการป้อนเข้าและดึงออกของบิตข้อมูล',
    sections: [
      {
        title: '1. รูปแบบของ Shift Register ทั้ง 4 ชนิด',
        content: `1. **SISO (Serial-In Serial-Out)**: ป้อนข้อมูลเข้าทีละบิต และดึงออกทีละบิต ใช้สายสัญญาณน้อย เหมาะกับการหน่วงเวลาสัญญาณ
2. **SIPO (Serial-In Parallel-Out)**: ป้อนเข้าทีละบิต เมื่อครบแล้วดึงข้อมูลออกพร้อมกันทุกบิต ใช้ใน **ตัวรับข้อมูลแบบอนุกรม (UART Receiver)**
3. **PISO (Parallel-In Serial-Out)**: โหลดข้อมูลเข้ามาพร้อมกันทุกบิต แล้วค่อยๆ เลื่อนส่งออกไปทีละบิต ใช้ใน **ตัวส่งข้อมูลแบบอนุกรม (UART Transmitter)**
4. **PIPO (Parallel-In Parallel-Out)**: โหลดเข้าพร้อมกัน และดึงออกพร้อมกันใน 1 จังหวะสัญญาณนาฬิกา เป็นเรจิสเตอร์จัดเก็บข้อมูลชั่วคราวทั่วไปใน CPU`,
        keyPoints: [
          'Shift Right: การเลื่อนบิตไปทางขวา 1 ตำแหน่ง เทียบเท่ากับการหารด้วย 2',
          'Shift Left: การเลื่อนบิตไปทางซ้าย 1 ตำแหน่ง เทียบเท่ากับการคูณด้วย 2'
        ]
      }
    ],
    quickQuiz: [
      {
        id: 'q5-3-1',
        chapterId: 'ch5',
        topic: 'Shift Register Types',
        question: 'วงจรที่ต้องการแปลงข้อมูลที่รับเข้ามาทีละบิตผ่านสายไฟเส้นเดียว เพื่อส่งต่อไปยัง Bus ขนาด 8 บิตของไมโครโปรเซสเซอร์ ควรเลือกใช้ Shift Register แบบใด?',
        options: ['SISO', 'SIPO', 'PISO', 'PIPO'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'รับข้อมูลแบบเรียงลำดับทีละบิต (Serial In) และส่งออกพร้อมกันทั้ง 8 บิต (Parallel Out) คือ SIPO'
      }
    ]
  },
  {
    id: 'ch5-4',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuit (วงจรเชิงลำดับ)',
    title: 'วงจรนับ (Counters: Asynchronous vs Synchronous)',
    subtitle: 'วงจรนับแบบริปเปิล วงจรนับแบบซิงโครนัส การคำนวณ Modulo-N และการรีเซ็ตค่า',
    durationMinutes: 20,
    difficulty: 'เข้มข้น',
    slideRef: '05_SequentialCircuit.pdf (สไลด์หน้า 96-125)',
    summary: 'วงจรนับแบบ Asynchronous มีความหน่วงสะสมตามจำนวนบิต ส่วนแบบ Synchronous ป้อน Clock ให้ฟลิปฟลอปทุกตัวพร้อมกัน ทำให้ทำงานที่ความถี่สูงได้แม่นยำ',
    sections: [
      {
        title: '1. วงจรนับแบบอซิงโครนัส (Asynchronous / Ripple Counter)',
        content: `สัญญาณนาฬิกา (Clock) จะป้อนให้แก่ **ฟลิปฟลอปตัวแรก (LSB) เพียงตัวเดียวเท่านั้น**
- สัญญาณเอาต์พุตของตัวแรก ($Q_0$) จะทำหน้าที่เป็น Clock ให้แก่ตัวถัดไป ($Q_1$)
- และ $Q_1$ ทำหน้าที่เป็น Clock ให้แก่ $Q_2$ ต่อเนื่องกันไปเป็นทอดๆ เหมือนระลอกคลื่น (Ripple)
- **ข้อเสียร้ายแรง**: **ความหน่วงสะสม (Accumulated Propagation Delay)**:
$$t_{delay\\_total} = N \\times t_{pd}$$
เมื่อจำนวนบิต ($N$) มากขึ้น ความหน่วงจะสูงมากจนเกิดค่าชั่วคราวที่ไม่ถูกต้อง (Glitches) และจำกัดความถี่สูงสุดในการทำงาน`,
        keyPoints: [
          'ฮาร์ดแวร์เรียบง่าย ไม่ต้องใช้ Combinational Logic ซับซ้อน',
          'ไม่เหมาะกับงานที่ต้องการความถี่สูงหรืองานระบบวิกฤต'
        ]
      },
      {
        title: '2. วงจรนับแบบซิงโครนัส (Synchronous Counter)',
        content: `สัญญาณนาฬิกาหลัก (Master Clock) จะถูก **ต่อตรงเข้าขา Clock ของฟลิปฟลอปทุกตัวพร้อมกัน**
- การตัดสินใจว่าฟลิปฟลอปตัวใดจะ Toggle หรือคงค่า จะถูกควบคุมด้วยวงจร Combinational Logic ที่ต่อเข้าขา $J, K$ หรือ $T$
- ความหน่วงทั้งหมดจึงเท่ากับความหน่วงของฟลิปฟลอปเพียงตัวเดียว บวกกับความหน่วงของเกตควบคุม ($t_{pd\\_FF} + t_{pd\\_Gate}$) ไม่สะสมตามจำนวนบิต`,
        formulas: [
          { label: 'Mod-N Counter', formula: 'จำนวนสถานะ = N, ใช้จำนวน FF \\ge \\lceil \\log_2 N \\rceil' }
        ],
        examTip: 'หากต้องการสร้างวงจรนับ Mod-10 (BCD Counter: นับ 0 ถึง 9) จะต้องตรวจจับสถานะที่ 10 (1010 ในฐานสอง) ด้วย NAND Gate เพื่อสั่ง Clear ฟลิปฟลอปทั้งหมดกลับเป็น 0 ทันที'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-4-1',
        chapterId: 'ch5',
        topic: 'Counter Comparison',
        question: 'เพราะเหตุใดวงจรนับแบบซิงโครนัส (Synchronous Counter) จึงสามารถทำงานที่ความถี่สูงได้ดีกว่าวงจรนับแบบริปเปิล (Ripple Counter)?',
        options: [
          'เพราะวงจรซิงโครนัสใช้พลังงานไฟฟ้าน้อยกว่า',
          'เพราะฟลิปฟลอปทุกตัวได้รับสัญญาณนาฬิกาพร้อมกัน ทำให้ไม่เกิดความหน่วงเวลาสะสมตามจำนวนบิต',
          'เพราะวงจรซิงโครนัสไม่ต้องใช้เกตลอจิกในการคำนวณสภาวะถัดไป',
          'เพราะวงจรซิงโครนัสใช้ D Flip-Flop เท่านั้น'
        ],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'ใน Synchronous Counter ทุกฟลิปฟลอปถูกกระตุ้นด้วยขอบ Clock เดียวกันพร้อมกัน ทำให้ไม่มีความหน่วงสะสมแบบลูกโซ่เหมือน Ripple Counter'
      }
    ]
  },
  {
    id: 'ch5-5',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuit (วงจรเชิงลำดับ)',
    title: 'เครื่องจักรสถานะจำกัด (Finite State Machines: Moore vs Mealy)',
    subtitle: 'สถาปัตยกรรม FSM แผนภาพสถานะ ตารางสถานะ และ 8 ขั้นตอนการออกแบบวงจร FSM',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '05_SequentialCircuit.pdf (สไลด์หน้า 126-150)',
    summary: 'FSM เป็นหัวใจของการควบคุมอัตโนมัติในคอมพิวเตอร์ Moore Machine มี Output ขึ้นอยู่กับสถานะปัจจุบันเท่านั้น ส่วน Mealy Machine ขึ้นอยู่กับสถานะปัจจุบันและอินพุตพร้อมกัน',
    sections: [
      {
        title: '1. การเปรียบเทียบ Moore vs Mealy Machine',
        content: `| สถาปัตยกรรม | Moore Machine | Mealy Machine |
|---|---|---|
| **การกำหนด Output** | ขึ้นอยู่กับ **สถานะปัจจุบัน (Present State) เท่านั้น** | ขึ้นอยู่กับ **สถานะปัจจุบัน และ อินพุตปัจจุบัน** |
| **ตำแหน่งใน State Diagram**| เขียน Output ไว้ **ในวงกลมของ State** เช่น $S_0 / 0$ | เขียน Output ไว้ **บนเส้นลูกศรการเปลี่ยนสถานะ** เช่น $a,b / 1$ |
| **การเกิด Glitch** | ไม่มี Glitch สัญญาณนิ่งและซิงโครไนซ์กับ Clock | อาจมี Glitch เกิดขึ้นได้เมื่ออินพุตภายนอกแกว่ง |
| **จำนวนสถานะ (States)** | มักต้องการจำนวน State มากกว่า Mealy เล็กน้อย | มักใช้จำนวน State น้อยกว่า แต่การวิเคราะห์ซับซ้อนกว่า |`,
        keyPoints: [
          'Moore: Output = g(State)',
          'Mealy: Output = f(State, Input)'
        ]
      },
      {
        title: '2. ขั้นตอน 8 ลำดับในการสร้างวงจร FSM สู่ฮาร์ดแวร์จริง (Dr. Paween Method)',
        content: `จากสไลด์ อ.ปวีณ ขั้นตอนการนำแผนผังสถานะไปสร้างเป็นวงจรจริง (โดยใช้ ROM/RAM หรือ Flip-Flops):
1. **กำหนดหมายเลขให้สถานะต่างๆ (State Assignment)** เช่น $S_0 = 00_2, S_1 = 01_2, \\dots$
2. **สร้างตารางค่าความจริงสถานะ (State Table)**: ประกอบด้วย Present State, Inputs, Next State, และ Output
3. **กำหนดขนาดหน่วยความจำ (ROM/RAM/FF)**:
   - จำนวน Address Bits = จำนวนบิตของ Present State + จำนวนบิตของ Inputs
   - จำนวน Data Bits = จำนวนบิตของ Next State + จำนวนบิตของ Output
4. **แปลงข้อมูลเป็นค่าใน ROM (ROM Content Table)**
5. **หาฟังก์ชัน Next State Logic** ด้วย K-Map (กรณีใช้เกตและฟลิปฟลอป)
6. **หาฟังก์ชัน Output Logic** ด้วย K-Map
7. **ถอดรหัส Output**
8. **ต่อวงจรประกอบจริง**: นำ Next State Logic, State Register (D/JK FF), และ Output Logic มาเชื่อมต่อกัน`,
        examTip: 'ข้อสอบถามเรื่องขนาด ROM เสมอ: ถ้ามี 4 สถานะ (ใช้ 2 บิต) และมีอินพุต 2 ตัว ขนาด Address ของ ROM จะต้องมีอย่างน้อย 2 + 2 = 4 บิต (มีความจุ 2^4 = 16 แถว)!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-5-1',
        chapterId: 'ch5',
        topic: 'Moore Machine Output Dependency',
        question: 'ในเครื่องจักรสถานะแบบ Moore (Moore Machine) ค่าเอาต์พุต (Output) ถูกกำหนดขึ้นจากสิ่งใด?',
        options: [
          'ขึ้นอยู่กับสัญญาณอินพุตปัจจุบันเท่านั้น',
          'ขึ้นอยู่กับสถานะปัจจุบัน (Present State) เท่านั้น',
          'ขึ้นอยู่กับสถานะปัจจุบันและอินพุตปัจจุบันร่วมกัน',
          'ขึ้นอยู่กับสัญญาณนาฬิกาเพียงอย่างเดียว'
        ],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'Moore Machine มีนิยามตายตัวคือ Output เป็นฟังก์ชันของ Present State เพียงอย่างเดียวเท่านั้น'
      }
    ]
  },
  {
    id: 'ch5-6',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuit (วงจรเชิงลำดับ)',
    title: 'กรณีศึกษาข้อสอบจริง: ระบบควบคุมปั๊มน้ำอัตโนมัติด้วย FSM',
    subtitle: 'เจาะลึกโจทย์สไลด์ อ.ปวีณ: เซ็นเซอร์ระดับน้ำ a, b และการควบคุมปั๊มน้ำ y ด้วยวงจร Moore',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '05_SequentialCircuit.pdf (สไลด์หน้า 151-163)',
    summary: 'โจทย์ระดับคลาสสิกของข้อสอบปลายภาค: เซ็นเซอร์วัดระดับน้ำล่าง (a) และบน (b) เพื่อควบคุมปั๊มน้ำ (y) ไม่ให้เปิด-ปิดบ่อยเกินไป (Hysteresis control) วิเคราะห์ State Diagram, ตารางสถานะ, และการถอดรหัส ROM',
    sections: [
      {
        title: '1. ข้อกำหนดของโจทย์ควบคุมปั๊มน้ำ (Problem Specification)',
        content: `ระบบถังพักน้ำมีเซ็นเซอร์ 2 ตัวและปั๊มน้ำ 1 ตัว:
- **เซ็นเซอร์ a (ระดับน้ำด้านล่าง)**: $a=0$ ไม่จุ่มน้ำ (น้ำต่ำกว่า a), $a=1$ จุ่มน้ำ
- **เซ็นเซอร์ b (ระดับน้ำด้านบน)**: $b=0$ ไม่จุ่มน้ำ (น้ำต่ำกว่า b), $b=1$ จุ่มน้ำ
- **ปั๊มน้ำ y (Output)**: $y=0$ ปิดปั๊ม, $y=1$ เปิดปั๊ม

**เงื่อนไขการทำงาน**:
1. ถ้าน้ำแห้งจนต่ำกว่าเซ็นเซอร์ $a$ ($a=0, b=0$) $\\implies$ **ต้องเปิดปั๊ม ($y=1$) ทันที**
2. เมื่อน้ำเริ่มเต็มจนท่วมเซ็นเซอร์ $a$ แต่ยังไม่ถึง $b$ ($a=1, b=0$) $\\implies$ **ปั๊มต้องยังคงสูบน้ำต่อไป (จำสถานะสูบน้ำเดิมไว้)**
3. เมื่อน้ำสูงจนถึงระดับเซ็นเซอร์ $b$ ($a=1, b=1$) $\\implies$ **สั่งปิดปั๊ม ($y=0$)**
4. เมื่อน้ำถูกใช้จนลดต่ำกว่า $b$ แต่ยังอยู่เหนือ $a$ ($a=1, b=0$) $\\implies$ **ปั๊มต้องยังคงปิดอยู่ ไม่เปิดกลับมาจนกว่าจะแห้งต่ำกว่า a**
*(หมายเหตุ: กรณี $a=0, b=1$ คือน้ำลอยเหนือเซ็นเซอร์ด้านบนแต่ไม่โดนเซ็นเซอร์ด้านล่าง ถือเป็นไปไม่ได้ในทางฟิสิกส์ จัดเป็น Don't Care)*`,
        interactiveType: 'fsm',
        keyPoints: [
          'State 0: สถานะเปิดปั๊ม (Pumping State, Output y = 1)',
          'State 1: สถานะปิดปั๊ม (Idle State, Output y = 0)',
          'ใช้วงจร Moore เพื่อความเสถียรและป้องกันปั๊มน้ำกระตุก'
        ]
      },
      {
        title: '2. ตารางสถานะและการแปลงเป็นข้อมูล ROM (ROM Look-Up Table)',
        content: `| Present State ($S$) | Input $a$ | Input $b$ | Next State ($S_{next}$) | Output ($y$) |
|:---:|:---:|:---:|:---:|:---:|
| 0 (กำลังเปิดปั๊ม) | 0 | 0 | **0** (ปั๊มต่อ) | 1 |
| 0 (กำลังเปิดปั๊ม) | 1 | 0 | **0** (ปั๊มต่อ) | 1 |
| 0 (กำลังเปิดปั๊ม) | 1 | 1 | **1** (เปลี่ยนเป็นปิด) | 1 |
| 0 (กำลังเปิดปั๊ม) | 0 | 1 | X (เกิดไม่ได้) | 1 |
| 1 (กำลังปิดปั๊ม) | 0 | 0 | **0** (เปลี่ยนเป็นเปิด) | 0 |
| 1 (กำลังปิดปั๊ม) | 1 | 0 | **1** (ยังปิดต่อ) | 0 |
| 1 (กำลังปิดปั๊ม) | 1 | 1 | **1** (ยังปิดต่อ) | 0 |
| 1 (กำลังปิดปั๊ม) | 0 | 1 | X (เกิดไม่ได้) | 0 |

**การต่อวงจรด้วย D Flip-Flop**:
- ใช้ D Flip-Flop 1 ตัวสำหรับเก็บสถานะ $S$
- ป้อน $D = S_{next} = S \\cdot a + b$ (ลดรูปจาก K-Map)
- สำหรับ Moore Machine สัญญาณเอาต์พุต $y = \\bar{S}$ ดึงจากขา $\\bar{Q}$ ของฟลิปฟลอปได้โดยตรง!`,
        examTip: 'โจทย์นี้ อ.ปวีณ เน้นมากในสไลด์หน้า 151-163 ขอให้นักศึกษาจำตาราง Present State -> Next State นี้ให้ได้ เพราะมักถูกนำมาออกข้อสอบอัตนัยหรือข้อสอบวิเคราะห์วงจร FSM เสมอ!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-6-1',
        chapterId: 'ch5',
        topic: 'Water Pump FSM Logic',
        question: 'ในระบบควบคุมปั๊มน้ำตามสไลด์ อ.ปวีณ หากปัจจุบันปั๊มน้ำกำลังสูบน้ำอยู่ (State เปิดปั๊ม) และเซ็นเซอร์อ่านค่าได้ a = 1, b = 0 สถานะถัดไปของระบบคืออะไร?',
        options: [
          'เปลี่ยนเป็นสถานะปิดปั๊มทันที',
          'ยังคงอยู่ในสถานะเปิดปั๊มต่อไป (Next State = เปิดปั๊ม)',
          'เกิดสภาวะลัดวงจร (Invalid)',
          'ปั๊มจะหยุดทำงานชั่วคราวเพื่อรอการยืนยันจากเซ็นเซอร์ b'
        ],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'ขณะปั๊มทำงาน น้ำจะค่อยๆ เอ่อท่วมเซ็นเซอร์ล่าง (a=1) แต่ยังไม่ถึงเซ็นเซอร์บน (b=0) ระบบต้องจำสถานะและปั๊มน้ำต่อไปเรื่อยๆ จนกว่าน้ำจะแตะเซ็นเซอร์ b (b=1) จึงจะสั่งปิด'
      }
    ]
  }
];
