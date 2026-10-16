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
    title: 'สัญญาณแอนะล็อก vs ดิจิทัล, สัญญาณรบกวน และการแปลงสัญญาณ A to D',
    subtitle: 'การสุ่ม (Sampling), การแบ่งนับ (Quantization), การเข้ารหัส (Coding), Noise Capacity และ Noise Margin',
    durationMinutes: 20,
    difficulty: 'พื้นฐาน',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 2-25)',
    summary: 'สัญญาณแอนะล็อกมีความต่อเนื่องแต่ถูกรบกวนง่าย ส่วนสัญญาณดิจิทัลมีเพียง 2 สถานะ มี Noise Margin สูง และเรียนรู้กระบวนการแปลงสัญญาณ A to D: สุ่ม (Sampling) -> แบ่งนับ (Quantization) -> เข้ารหัส (Coding) ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. สัญญาณแอนะล็อก (Analog Signal) และข้อจำกัดด้านสัญญาณรบกวน',
        content: `**สัญญาณแอนะล็อก (Analog Signal)** เป็นการแทนค่าข้อมูลอย่างง่าย โดยแทนค่าเป็นสัดส่วนโดยตรงกับข้อมูล มีความต่อเนื่องตามเวลา (Continuous Values) เช่น แรงดันไฟฟ้าสูงแทนค่าอุณหภูมิสูง แรงดันไฟฟ้าต่ำแทนค่าอุณหภูมิต่ำ
- **ข้อดี**: ใช้งานง่าย วงจรไม่ซับซ้อน ใช้อุปกรณ์น้อย และใช้พื้นที่ในการบันทึกข้อมูลน้อย
- **ข้อเสียสำคัญ**: **ไม่ทนทานต่อสัญญาณรบกวน (Noise)** เมื่อสัญญาณเดินทางผ่านสายไฟหรือถูกคลื่นแม่เหล็กไฟฟ้ารบกวน สัญญาณเดิมจะผิดเพี้ยนไปอย่างถาวร และไม่สามารถแยกแยะได้ว่าส่วนไหนคือสัญญาณจริง ส่วนไหนคือสัญญาณรบกวน

![ระดับแรงดันตรรกะและ Noise Margin](diagram:logic-levels)

**การเปรียบเทียบเชิงอุปมา (Analogy):**
- **สัญญาณแอนะล็อก** เปรียบเสมือน *หลอดไฟหรี่ (Dimmer)* ที่ปรับความสว่างได้ต่อเนื่อง หากมีแสงสะท้อนภายนอกมารบกวน เราจะแยกไม่ออกว่าหลอดไฟเปิดสว่างอยู่ที่กี่เปอร์เซ็นต์กันแน่
- **สัญญาณดิจิทัล** เปรียบเสมือน *สวิตช์ไฟเปิด/ปิด (On/Off)* มีเพียง 2 สถานะ แม้ห้องจะมีแสงสะท้อนรบกวนเพียงใด เราก็มองเห็นได้ชัดเจน 100% ว่าหลอดไฟ "เปิด" หรือ "ปิด" อยู่`,
        keyPoints: [
          'สัญญาณแอนะล็อกมีค่าต่อเนื่องตามเวลาและขนาด (Continuous in time and amplitude)',
          'ถูกลดทอนและรบกวนได้ง่าย (Susceptible to noise)',
          'เมื่อถูก Noise ปนเปื้อนแล้ว จะไม่สามารถกู้คืนสัญญาณเดิมให้สมบูรณ์ได้ 100%'
        ]
      },
      {
        title: '2. สูตรการคำนวณความละเอียดสูงสุดของสัญญาณแอนะล็อก (ข้อสอบออกทุกปี!)',
        content: `ในทางปฏิบัติ สัญญาณแอนะล็อกไม่สามารถแทนข้อมูลได้ละเอียดเป็นอนันต์ เพราะถูกจำกัดด้วย **ช่วงสัญญาณรบกวน (Noise Range)**

**ขั้นตอนการคำนวณทีละก้าว (Step-by-Step):**
1. **หาช่วงแรงดันใช้งานทั้งหมด ($\\Delta V$)**: $\\Delta V = V_{\\max} - V_{\\min}$
2. **หาช่วงการแกว่งของสัญญาณรบกวนรวม ($V_{\\text{noise, pp}}$)**: หากโจทย์บอกสัญญาณรบกวน $\\pm V_n$ แสดงว่าสัญญาณรบกวนแกว่งขึ้นและลงรวมเป็น $2 \\times |V_n|$ เสมอ
3. **คำนวณจำนวนระดับข้อมูลสูงสุด ($N$)**: นำช่วงแรงดันหารด้วยช่วงสัญญาณรบกวน และ **ต้องปัดเศษลง (Floor) เสมอ** เพราะระดับที่ไม่เต็มช่องจะเกิดการทับซ้อน (Overlap) ข้อมูลจะผิดพลาด

$$\\text{จำนวนรูปแบบข้อมูล } N = \\lfloor \\frac{V_{\\max} - V_{\\min}}{2 \\times |V_n|} \\rfloor$$

**ตัวอย่างโจทย์สอบจริงจากสไลด์ อ.ปวีณ:**
- สัญญาณแรงดันไฟฟ้าทำงานในช่วง: $0\\text{V} \\text{ ถึง } 5\\text{V}$ ($\\Delta V = 5 - 0 = 5\\text{V}$)
- มีสัญญาณรบกวน: $\\pm 0.2\\text{V}$ (ช่วงสัญญาณรบกวนรวม $= 2 \\times 0.2 = 0.4\\text{V}$)
- คำนวณจำนวนรูปแบบ:
$$N = \\lfloor \\frac{5\\text{V}}{0.4\\text{V}} \\rfloor = \\lfloor 12.5 \\rfloor = 12 \\text{ รูปแบบ}$$
- หากต้องการแทนด้วยบิตดิจิทัล จะได้ $2^3 = 8 \\le 12 < 2^4 = 16$ ดังนั้นจึงแทนข้อมูลที่เชื่อถือได้ไม่เกิน **3 บิต**`,
        formulas: [
          {
            label: 'จำนวนระดับสัญญาณแอนะล็อกที่แยกแยะได้',
            formula: 'N = \\lfloor \\frac{V_{max} - V_{min}}{2 \\times |V_{noise}|} \\rfloor',
            note: 'ต้องคูณ 2 ที่ตัวส่วนเสมอหากสัญญาณรบกวนเป็น ± และปัดเศษทิ้งลงเป็นจำนวนเต็ม'
          }
        ],
        examTip: 'ระวังหลุมพรางข้อสอบ! ถ้าโจทย์ระบุว่า "Noise = ±0.2V" ช่วงรบกวนคือ 0.4V เสมอ อย่าเอาแค่ 0.2V ไปหารเด็ดขาด!'
      },
      {
        title: '3. สัญญาณดิจิทัล (Digital Signal) และขอบเขตภูมิคุ้มกัน (Noise Margin)',
        content: `**สัญญาณดิจิทัล** เป็นการแทนค่าข้อมูลด้วยตัวเลขเพียง 2 ค่า คือ **"0"** (Logic LOW) และ **"1"** (Logic HIGH) โดยมีเกณฑ์ระดับแรงดันไฟฟ้า (Logic Thresholds) แบ่งช่วงชัดเจน

**ระดับแรงดันมาตรฐาน TTL (Transistor-Transistor Logic 5V):**
- **Logic 0 (LOW)**: $0\\text{V} \\le V \\le 0.8\\text{V}$ (Output สูงสุด $V_{OL} = 0.4\\text{V}$, Input สูงสุด $V_{IL} = 0.8\\text{V}$)
- **Logic 1 (HIGH)**: $2.0\\text{V} \\le V \\le 5.0\\text{V}$ (Input ต่ำสุด $V_{IH} = 2.0\\text{V}$, Output ต่ำสุด $V_{OH} = 2.4\\text{V}$)
- **ช่วงต้องห้าม (Forbidden Zone / Undefined)**: $0.8\\text{V} < V < 2.0\\text{V}$ สัญญาณที่ตกอยู่ในช่วงนี้ อุปกรณ์จะไม่สามารถระบุสถานะได้ ห้ามนำไปใช้งานเด็ดขาด

**Noise Margin (ขอบเขตกันสัญญาณกวน):**
- $NM_H = V_{OH} - V_{IH} = 2.4 - 2.0 = 0.4\\text{V}$ (ขอบเขตกัน Noise ทางฝั่ง HIGH)
- $NM_L = V_{IL} - V_{OL} = 0.8 - 0.4 = 0.4\\text{V}$ (ขอบเขตกัน Noise ทางฝั่ง LOW)
ตราบใดที่สัญญาณรบกวนไม่เกิน $0.4\\text{V}$ วงจรดิจิทัลจะฟื้นฟูสัญญาณ (Regenerate) กลับมาเป็น 0 หรือ 1 ที่สมบูรณ์ 100% เสมอ`,
        keyPoints: [
          'แบ่งระดับตรรกะชัดเจนด้วย Threshold Voltage',
          'มี Noise Margin ช่วยป้องกันข้อผิดพลาดจากคลื่นรบกวน',
          'ส่งต่อ คัดลอก และประมวลผลกี่ครั้ง ข้อมูลก็ไม่เสื่อมถอย'
        ],
        formulas: [
          {
            label: 'TTL 5V Noise Margin',
            formula: 'NM_H = V_{OH} - V_{IH} = 0.4\\text{V} \\quad , \\quad NM_L = V_{IL} - V_{OL} = 0.4\\text{V}',
            note: 'ย่านแรงดันต้องห้ามคือ 0.8V ถึง 2.0V (Forbidden Zone)'
          }
        ]
      },
      {
        title: '4. การแปลงสัญญาณแอนะล็อกเป็นดิจิทัล (A to D Conversion Process) และสูตรการแบ่งนับ (Quantization)',
        content: `ในสไลด์ของ **ดร. ปวีณ เขื่อนแก้ว (หน้า 12-25)** การแปลงสัญญาณจากแอนะล็อกเป็นดิจิทัลประกอบด้วย **3 ขั้นตอนสำคัญตามลำดับ**:

1. **การสุ่มสัญญาณ (Sampling)** (สไลด์หน้า 13-16):
   - คือการเลือกหยิบสัญญาณขึ้นมา ณ เวลาที่กำหนด มักนิยมระบุเป็น **ความถี่ในการสุ่ม ($F_s$)** เช่น $F_s = 100\\text{ Hz}$ หมายถึงใน 1 วินาที สุ่มหยิบสัญญาณจำนวน 100 ตัวอย่าง
   - **Pulse Code Modulation (PCM)**: สุ่มสัญญาณโดยสร้างสัญญาณ Pulse ความถี่คงที่แล้วนำไป **คูณ (X)** กับสัญญาณที่ต้องการสุ่ม
   - สัญญาณที่ได้จะเป็น **สัญญาณไม่ต่อเนื่องตามเวลา (Discrete-time Signal)** แต่ขนาดยังคงเป็น *แอนะล็อก* อยู่

2. **การแบ่งนับ (Quantization) — สูตรข้อสอบจริงจากสไลด์ ดร. ปวีณ เขื่อนแก้ว (หน้า 17-21)!**:
   - การแบ่งนับคือการแทนขนาดของสัญญาณด้วยตัวเลข รหัส หรือสัญลักษณ์ โดยความละเอียดของการแบ่งนับจะขึ้นอยู่กับ **จำนวนของบิต (bits)**
   - **สูตรการคำนวณค่าตัวเลขของสัญญาณไฟฟ้า ($v$) จากสไลด์หน้า 17:**
   $$v = \\left\\lfloor \\frac{v_i}{v_{ref}} \\times (2^{bits} - 1) \\right\\rfloor$$
   โดยที่:
   - $v$ คือ ค่าตัวเลขของสัญญาณไฟฟ้าที่ได้จากการแบ่งนับ (ปัดเศษทิ้งเป็นจำนวนเต็มเสมอด้วยฟังก์ชัน $\\lfloor \\dots \\rfloor$)
   - $v_i$ คือ แรงดันที่รับเข้ามา (Input Voltage)
   - $v_{ref}$ คือ แรงดันอ้างอิงสูงสุด (Maximum Reference Voltage)
   - $bits$ คือ ความละเอียดของการแปลง หรือจำนวนบิตในการเข้ารหัส (Number of bits)
   - $(2^{bits} - 1)$ คือ ตัวคูณเต็มสเกล (เช่น 4 บิต = $2^4 - 1 = 15$)

**ตัวอย่างโจทย์คำนวณจริงจากสไลด์ ดร. ปวีณ (หน้า 18 & 23):**
- กำหนดให้:
  - แรงดันรับเข้า $v_i = 1.5285596\\text{ V}$
  - แรงดันอ้างอิงสูงสุด $v_{ref} = 2.0\\text{ V}$
  - ความละเอียด $bits = 4$ บิต
- **ขั้นตอนที่ 1) คำนวณตัวคูณสเกล:**
  $$2^{bits} - 1 = 2^4 - 1 = 16 - 1 = 15$$
- **ขั้นตอนที่ 2) คำนวณสัดส่วนแรงดันรับเข้าต่อแรงดันอ้างอิง:**
  $$\\frac{v_i}{v_{ref}} = \\frac{1.5285596\\text{ V}}{2.0\\text{ V}} = 0.7642798$$
- **ขั้นตอนที่ 3) คูณและปัดเศษลง (Floor Function):**
  $$v = \\lfloor 0.7642798 \\times 15 \\rfloor = \\lfloor 11.464197 \\rfloor = 11$$
- **ขั้นตอนที่ 4) การเข้ารหัสฐานสอง (Coding ในสไลด์หน้า 23):**
  แปลงค่า $v = 11$ ฐานสิบเป็นเลขฐานสอง 4 บิต:
  $$11_{10} = 1011_2$$

*(หมายเหตุเสริมเชิงวิศวกรรม: หากคำนวณขนาดขั้นบันไดแบบอุดมคติ Step Size $\\Delta V = \\frac{v_{ref}}{2^{bits}} = \\frac{2.0}{16} = 0.125\\text{V}$ แต่ในข้อสอบและการเรียนของ ดร.ปวีณ จะยึดสูตร $v = \\lfloor \\frac{v_i}{v_{ref}} \\times (2^{bits} - 1) \\rfloor$ เป็นหลัก ซึ่งได้คำตอบ $v = 11$ ($1011_2$))*

**ตารางเปรียบเทียบระดับการแบ่งนับตามจำนวนบิต (สไลด์หน้า 20):**
- $1\\text{ บิต} = 2^1 = 2\\text{ ระดับ}$
- $2\\text{ บิต} = 2^2 = 4\\text{ ระดับ}$
- $3\\text{ บิต} = 2^3 = 8\\text{ ระดับ}$
- $4\\text{ บิต} = 2^4 = 16\\text{ ระดับ}$
- $5\\text{ บิต} = 2^5 = 32\\text{ ระดับ}$
- $6\\text{ บิต} = 2^6 = 64\\text{ ระดับ}$
- $7\\text{ บิต} = 2^7 = 128\\text{ ระดับ}$
*(ยิ่งจำนวนบิตมาก ขั้นบันได $\\Delta V$ ยิ่งแคบ สัญญาณยิ่งละเอียดสมจริง)*

3. **การเข้ารหัส (Coding)** (สไลด์หน้า 22-24):
   - เปลี่ยนข้อมูลตัวเลขที่ได้จากการแบ่งนับให้อยู่ในรูปชุดเลขฐานสอง เช่น **Natural Binary Code**, **BCD**, หรือ **Gray Code**
   - ตัวอย่างในสไลด์หน้า 23: แปลงค่าตัวเลข $v = 11$ ที่แบ่งนับได้เป็นรหัสเลขฐานสอง 4 บิต $\\implies$ ได้ผลลัพธ์คือ **$1011_2$**`,
        formulas: [
          {
            label: 'สูตรการแบ่งนับ (Quantization Formula - ดร. ปวีณ สไลด์หน้า 17)',
            formula: 'v = \\left\\lfloor \\frac{v_i}{v_{ref}} \\times (2^{bits} - 1) \\right\\rfloor',
            note: 'v = ค่าตัวเลข, vi = แรงดันเข้า, vref = แรงดันอ้างอิง, bits = จำนวนบิต (ตัวคูณคือ 2^bits - 1)'
          },
          {
            label: 'การเข้ารหัสเลขฐานสอง (Coding)',
            formula: 'v_{10} \\xrightarrow{\\text{Binary}} B_{bits} \\quad (11_{10} \\to 1011_2)',
            note: 'แปลงค่าจำนวนเต็ม v ที่ได้จากการปัดเศษทิ้งเป็นรหัสเลขฐานสอง'
          },
          {
            label: 'ขนาดขั้นบันไดการแบ่งนับเชิงทฤษฎี (Ideal Step Size)',
            formula: '\\Delta V = \\frac{v_{ref}}{2^{bits}} = \\frac{2.0\\text{ V}}{2^4} = 0.125\\text{ V}',
            note: 'ความละเอียดของแต่ละขั้นบันไดแรงดันเมื่อแบ่งเป็น 2^bits ช่วง'
          }
        ],
        keyPoints: [
          'ลำดับ 3 ขั้นตอน: สุ่ม (Sampling) -> แบ่งนับ (Quantization) -> เข้ารหัส (Coding)',
          'สัญญาณหลัง Sampling ยังเป็นแอนะล็อก แต่เป็น Discrete-time',
          'สูตรแบ่งนับ อ.ปวีณ: v = floor((v_i / v_ref) * (2^bits - 1)) ตัวคูณคือ 2^bits - 1 (เช่น 4 บิตคูณด้วย 15)',
          'สัญญาณหลัง Quantization เป็นตัวเลขดิจิทัลแล้ว แต่นำไปเข้ารหัส (Coding) เป็นเลขฐานสองก่อนใช้งาน'
        ],
        examTip: 'สูตรออกสอบแบ่งนับ อ.ปวีณ หน้า 17: v = floor((vi / vref) * (2^bits - 1)) เช่น vi=1.528V, vref=2V, 4-bit จะได้ floor(0.764 * 15) = 11 (1011_2) ห้ามลืมลบ 1!'
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
        explanation: 'ช่วงแรงดันใช้งานคือ 10 - 0 = 10V สัญญาณรบกวน ±0.25V มีช่วงการแกว่งทั้งหมดเท่ากับ 2 × 0.25 = 0.5V ดังนั้นจำนวนรูปแบบ = floor(10 / 0.5) = 20 รูปแบบ'
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
        explanation: 'สัญญาณดิจิทัลมีเพียง 2 สถานะ (0 และ 1) พร้อมช่วง Noise Margin ทำให้ทนทานต่อคลื่นรบกวนและไม่เกิดความเสื่อมถอยของข้อมูลในการคัดลอกหรือส่งต่อ'
      },
      {
        id: 'q3-1-3',
        chapterId: 'ch3',
        topic: 'A to D Quantization Calculation',
        question: 'ตามสไลด์ ดร. ปวีณ (หน้า 17-18) การแปลงสัญญาณ ADC ความละเอียด 4 บิต แรงดันอ้างอิงสูงสุด v_ref = 2.0V หากแรงดันรับเข้า v_i = 1.5285596V ค่าตัวเลข v และรหัสเลขฐานสอง 4 บิตที่ได้จากการแบ่งนับมีค่าเท่าใด?',
        options: [
          'v = 11 และรหัสคือ 1011_2',
          'v = 12 และรหัสคือ 1100_2',
          'v = 10 และรหัสคือ 1010_2',
          'v = 15 และรหัสคือ 1111_2'
        ],
        correctAnswer: 0,
        difficulty: 'เข้มข้น',
        explanation: 'ใช้สูตรจากสไลด์หน้า 17: v = floor((v_i / v_ref) × (2^bits - 1)) = floor((1.5285596 / 2.0) × (16 - 1)) = floor(0.7642798 × 15) = floor(11.464) = 11. แปลง 11 ฐานสิบเป็นเลขฐานสอง 4 บิตได้ 1011_2 (ตรงสไลด์หน้า 18 และ 23)'
      }
    ]
  },
  {
    id: 'ch3-2',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'ตัวดำเนินการดิจิทัลและลอจิกเกตพื้นฐาน (Logic Gates) & ขาไอซี DIP-14',
    subtitle: 'ทำความเข้าใจ NOT, AND, OR, NAND, NOR, XOR, XNOR การต่อไอซี 74xx, ตัวต้านทานตามใบงานที่ 7 และคุณลักษณะทางไฟฟ้า (Fan-Out & Delay)',
    durationMinutes: 20,
    difficulty: 'พื้นฐาน',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 16-45)',
    summary: 'ลอจิกเกตพื้นฐาน 7 ตัวเป็นตัวดำเนินการตรรกะระดับฮาร์ดแวร์ โดยเฉพาะ NAND และ NOR ได้รับการจัดเป็น Universal Gate พร้อมสูตรคำนวณทางไฟฟ้า Fan-Out, Propagation Delay และ Power Dissipation ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. ตารางสรุปลอจิกเกตทั้ง 7 ชนิด (Logic Gates Summary)',
        content: `ลอจิกเกตเป็นวงจรอิเล็กทรอนิกส์พื้นฐานที่รับอินพุต 1 หรือหลายตัว แล้วสร้างเอาต์พุตดิจิทัล 1 สัญญาณตามฟังก์ชันตรรกะ

![สัญลักษณ์ลอจิกเกตมาตรฐานสากล](diagram:all-gates)

| ชื่อเกต | ไอซีมาตรฐาน | สมการบูลีน | พฤติกรรมของเอาต์พุต (Output Behavior) |
|---|---|---|---|
| **NOT** | **74HC04** | $Y = \\bar{A}$ | กลับค่าตรรกะ ($0 \\to 1, 1 \\to 0$) |
| **AND** | **74HC08** | $Y = A \\cdot B$ | เอาต์พุตเป็น 1 ก็ต่อเมื่อ **อินพุตทุกตัวเป็น 1** |
| **OR** | **74HC32** | $Y = A + B$ | เอาต์พุตเป็น 1 เมื่อ **มีอินพุตตัวใดตัวหนึ่งเป็น 1 ขึ้นไป** |
| **NAND** | **74HC00** | $Y = \\overline{A \\cdot B}$ | ตรงข้ามกับ AND (เป็น 0 เฉพาะเมื่อทุกตัวเป็น 1) |
| **NOR** | **74HC02** | $Y = \\overline{A + B}$ | ตรงข้ามกับ OR (เป็น 1 เฉพาะเมื่อทุกตัวเป็น 0 เท่านั้น) |
| **XOR** | **74HC86** | $Y = A \\oplus B = \\bar{A}B + A\\bar{B}$ | เป็น 1 เมื่อ **อินพุตต่างกัน** (Odd Parity / วงจรบวกเลข) |
| **XNOR** | **74HC266** | $Y = \\overline{A \\oplus B} = AB + \\bar{A}\\bar{B}$ | เป็น 1 เมื่อ **อินพุตเหมือนกัน** (Equivalence Detector) |`,
        interactiveType: 'gates',
        keyPoints: [
          'XOR (Exclusive-OR) เป็น 1 เมื่อจำนวนของลอจิก 1 เป็นจำนวนคี่ (Odd Function)',
          'XNOR (Exclusive-NOR) เป็น 1 เมื่ออินพุตเหมือนกัน ใช้ทำวงจรตรวจสอบความเท่ากัน',
          'NAND และ NOR มีคุณสมบัติเป็น Universal Gate'
        ]
      },
      {
        title: '2. โครงสร้างขาไอซี DIP-14 และการต่อตัวต้านทาน (ข้อสอบแล็บ 7 ออกชัวร์!)',
        content: `ในการต่อวงจรจริงด้วยไอซีดิจิทัลตระกูล 74xx (แพ็กเกจ DIP-14):
1. **รอยบาก (Notch)**: ต้องหันรอยบากไปทางซ้ายหรือด้านบน ขาซ้ายล่างสุดคือ **ขา 1** วนทวนเข็มนาฬิกา
2. **ขั้วไฟเลี้ยงสำคัญที่ห้ามลืมเด็ดขาด**:
   - **ขา 14**: ต่อเข้าไฟบวก $V_{CC} = +5\\text{V}$
   - **ขา 7**: ต่อลงกราวด์ $\\text{GND} = 0\\text{V}$
3. **ตัวต้านทาน Pull-Down ($10\\text{k}\\Omega$)**:
   - ต่อจากสวิตช์อินพุตลงกราวด์ เพื่อดึงแรงดันให้เป็น 0V แน่นอนเมื่อปล่อยสวิตช์ ป้องกันสภาวะ Floating Input
4. **ตัวต้านทานจำกัดกระแส LED ($220\\Omega - 330\\Omega$) (สูตรคำนวณในแล็บ 7)**:
   - หลอดไฟ LED มีแรงดันตกคร่อมปกติ $V_{LED} \\approx 2.0\\text{V}$ และต้องการกระแสปลอดภัย $I_{LED} \\approx 15\\text{mA} (0.015\\text{A})$
   - คำนวณค่าตัวต้านทาน $R$:
   $$R = \\frac{V_{CC} - V_{LED}}{I_{LED}} = \\frac{5\\text{V} - 2.0\\text{V}}{0.015\\text{A}} = \\frac{3\\text{V}}{0.015\\text{A}} = 200\\Omega \\implies \\text{เลือกใช้ } 220\\Omega$$`,
        formulas: [
          {
            label: 'สูตรคำนวณตัวต้านทานจำกัดกระแส LED',
            formula: 'R = \\frac{V_{CC} - V_D}{I_D}',
            note: 'Vcc=5V, Vd=2V, Id=15mA -> R=200 Ohm (เลือกค่ามาตรฐาน 220 Ohm)'
          }
        ],
        examTip: 'ถ้าไม่ใส่ตัวต้านทาน Pull-down สวิตช์จะอยู่ในสภาวะลอย (Floating) ซึ่งคลื่นแม่เหล็กไฟฟ้ารอบตัวจะเหนี่ยวนำให้เกตเข้าใจผิดว่าเป็น 1 บ้าง 0 บ้าง วงจรจะรวน!'
      },
      {
        title: '3. คุณลักษณะทางไฟฟ้าและสูตรคำนวณของลอจิกเกต (Fan-Out, Propagation Delay & Power Dissipation)',
        content: `ในทางวิศวกรรมฮาร์ดแวร์ ลอจิกเกตมีข้อจำกัดทางไฟฟ้า 3 ประการหลักที่ต้องคำนวณเสมอ:

1. **สูตรการคำนวณ Fan-Out (ความสามารถในการขับโหลด):**
   - คือจำนวนอินพุตสูงสุดของเกตตระกูลเดียวกันที่เอาต์พุตตัวหนึ่งสามารถต่อขับได้ โดยระดับแรงดันยังคงอยู่ในเกณฑ์มาตรฐาน
   $$\\text{Fan-Out}_{\\text{HIGH}} = \\left\\lfloor \\frac{I_{OH}}{I_{IH}} \\right\\rfloor \\quad , \\quad \\text{Fan-Out}_{\\text{LOW}} = \\left\\lfloor \\frac{I_{OL}}{I_{IL}} \\right\\rfloor$$
   $$\\text{Fan-Out} = \\min(\\text{Fan-Out}_{\\text{HIGH}}, \\text{Fan-Out}_{\\text{LOW}})$$
   - **ตัวอย่างโจทย์สอบมาตรฐาน TTL:** $I_{OH} = 400\\mu\\text{A}, I_{IH} = 40\\mu\\text{A} \\implies \\text{Fan-Out}_H = 400 / 40 = 10$ และ $I_{OL} = 16\\text{mA}, I_{IL} = 1.6\\text{mA} \\implies \\text{Fan-Out}_L = 16 / 1.6 = 10 \\implies$ ตอบ **Fan-Out = 10 ตัว**

2. **สูตร Propagation Delay ($t_{pd}$) และความถี่ทำงานสูงสุด ($f_{\\max}$):**
   - สัญญาณต้องใช้เวลาเปลี่ยนระดับจาก Low-to-High ($t_{pLH}$) และ High-to-Low ($t_{pHL}$)
   $$t_{pd} = \\frac{t_{pLH} + t_{pHL}}{2} \\quad , \\quad f_{\\max} = \\frac{1}{2 \\times t_{pd}} \\quad (\\text{หรือ } \\frac{1}{t_{pd, \\text{critical}}})$$
   - **ตัวอย่าง:** เกตมี $t_{pLH} = 12\\text{ ns}, t_{pHL} = 8\\text{ ns} \\implies t_{pd} = 10\\text{ ns}$ ความถี่สูงสุด $f_{\\max} = \\frac{1}{2 \\times 10\\text{ ns}} = 50\\text{ MHz}$

3. **สูตรกำลังไฟฟ้าสูญเสียเฉลี่ย (Power Dissipation $P_D$):**
   $$P_D = V_{CC} \\times I_{CC, \\text{avg}} = V_{CC} \\times \\left( \\frac{I_{CCH} + I_{CCL}}{2} \\right)$$
   - **ตัวอย่าง:** ไอซีใช้ไฟเลี้ยง $V_{CC} = 5\\text{V}$ มีกระแส $I_{CCH} = 10\\text{mA}, I_{CCL} = 14\\text{mA} \\implies I_{CC, \\text{avg}} = 12\\text{mA} \\implies P_D = 5\\text{V} \\times 12\\text{mA} = 60\\text{mW}$`,
        formulas: [
          {
            label: 'Fan-Out (ความสามารถในการขับโหลดสูงสุด)',
            formula: '\\text{Fan-Out} = \\min\\left( \\left\\lfloor \\frac{I_{OH}}{I_{IH}} \\right\\rfloor , \\left\\lfloor \\frac{I_{OL}}{I_{IL}} \\right\\rfloor \\right)',
            note: 'คำนวณทั้งสภาวะ High และ Low แล้วเลือกค่าน้อยที่สุด ปัดเศษลงเป็นจำนวนเต็มเสมอ'
          },
          {
            label: 'Propagation Delay เฉลี่ยและความถี่สูงสุด',
            formula: 't_{pd} = \\frac{t_{pLH} + t_{pHL}}{2} \\quad , \\quad f_{\\max} = \\frac{1}{2 \\times t_{pd}}',
            note: 'tpLH คือเวลาเปลี่ยน 0->1, tpHL คือเวลาเปลี่ยน 1->0'
          },
          {
            label: 'กำลังไฟฟ้าสูญเสียเฉลี่ย (Power Dissipation)',
            formula: 'P_D = V_{CC} \\times \\frac{I_{CCH} + I_{CCL}}{2}',
            note: 'Vcc=แรงดันไฟเลี้ยง, ICCH=กระแสเมื่อ Output HIGH, ICCL=กระแสเมื่อ Output LOW'
          }
        ],
        keyPoints: [
          'Fan-Out ต้องคำนวณทั้งสภาวะ HIGH และ LOW แล้วเลือกค่าต่ำสุด',
          'Propagation Delay เป็นตัวจำกัดความเร็วสูงสุด (Clock Frequency) ของระบบดิจิทัล',
          'หากโหลดเกิน Fan-Out ระดับแรงดันจะตกเข้าสู่ช่วง Undefined / Forbidden Zone'
        ],
        examTip: 'ข้อสอบถาม Fan-Out: จำไว้ว่าต้องเอา IOH หาร IIH และ IOL หาร IIL เสมอ ถ้าได้สองค่าไม่เท่ากัน ให้เลือกค่าน้อยกว่าเสมอ!'
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
        topic: 'Fan-Out Calculation',
        question: 'เกตลอจิกตัวหนึ่งมีพารามิเตอร์กระแส IOH = 1.0mA, IIH = 0.05mA, IOL = 20mA, IIL = 1.6mA เกตนี้มีค่า Fan-Out เท่ากับเท่าใด?',
        options: ['12 ตัว', '16 ตัว', '20 ตัว', '25 ตัว'],
        correctAnswer: 0,
        difficulty: 'ปานกลาง',
        explanation: 'Fan-Out(HIGH) = 1.0mA / 0.05mA = 20 ตัว ส่วน Fan-Out(LOW) = floor(20mA / 1.6mA) = floor(12.5) = 12 ตัว ดังนั้นต้องเลือกค่าน้อยที่สุดคือ 12 ตัว'
      }
    ]
  },
  {
    id: 'ch3-3',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'ลอจิกเกตสากล (Universal Gates), วงจรสับสัญญาณ (Chopper) & Open-Collector / Tri-State',
    subtitle: 'การสังเคราะห์เกตทุกชนิดด้วย NAND / NOR, วงจร Chopper, สูตรคำนวณตัวต้านทาน Pull-up ของ Open-Collector และสถานะ Hi-Z',
    durationMinutes: 25,
    difficulty: 'ปานกลาง',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 46-75)',
    summary: 'NAND และ NOR เป็น Universal Gate ที่สร้างเกตอื่นๆ ได้ทุกชนิด พร้อมเรียนรู้วงจร Chopper สับสัญญาณ และการคำนวณตัวต้านทาน Pull-up สำหรับ Open-Collector และ Tri-State Logic ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. การสังเคราะห์เกตด้วย NAND และ NOR (Universal Gates) & ตารางจำนวนเกตขั้นต่ำ',
        content: `เหตุผลที่โรงงานผลิตไอซีระดับอุตสาหกรรมนิยมใช้ **NAND** หรือ **NOR** เกตเพียงชนิดเดียวทั้งชิป:
- ต้นทุนการผลิตถูกกว่าการผลิตเกตหลายชนิดปนกัน
- มีพื้นที่และคุณสมบัติทางไฟฟ้าสม่ำเสมอ

**ตารางสรุปจำนวนเกตขั้นต่ำในการสังเคราะห์ (Universal Gate Count Table ออกสอบบ่อย!):**

| ฟังก์ชันเป้าหมาย | ใช้เฉพาะ NAND Gates | ใช้เฉพาะ NOR Gates | เคล็ดลับการจำ |
|---|:---:|:---:|---|
| **NOT** | **1 ตัว** | **1 ตัว** | รวบขาอินพุตเข้าด้วยกัน |
| **AND** | **2 ตัว** | **3 ตัว** | NAND ทำ AND แค่กลับเอาต์พุต (ใช้ 2) |
| **OR** | **3 ตัว** | **2 ตัว** | NOR ทำ OR แค่กลับเอาต์พุต (ใช้ 2) |
| **NAND** | **1 ตัว** (ตรงตัว) | **4 ตัว** | ใช้ De Morgan แปลง |
| **NOR** | **4 ตัว** | **1 ตัว** (ตรงตัว) | ใช้ De Morgan แปลง |
| **XOR** | **4 ตัว** | **5 ตัว** | สังเคราะห์ด้วย 4 NAND เป็นโครงสร้างมาตรฐาน |
| **XNOR** | **5 ตัว** | **4 ตัว** | สังเคราะห์ด้วย 4 NOR เป็นโครงสร้างมาตรฐาน |

**วิธีแปลง NAND Gate ให้กลายเป็นเกตอื่น:**
1. **สร้าง NOT Gate**: รวมขารับอินพุตของ NAND เข้าด้วยกัน $\\implies \\overline{A \\cdot A} = \\bar{A}$ (ใช้ 1 NAND)
2. **สร้าง AND Gate**: ต่อ NAND 1 ตัวแล้วตามด้วย NOT(NAND) เพื่อกลับค่า $\\implies \\overline{\\overline{AB}} = AB$ (ใช้ 2 NAND)
3. **สร้าง OR Gate**: นำอินพุต $A$ และ $B$ มาผ่าน NOT(NAND) ก่อน แล้วป้อนเข้า NAND ตัวที่สาม ตามกฎเดอมอร์แกน $\\implies \\overline{\\bar{A} \\cdot \\bar{B}} = A + B$ (ใช้ 3 NAND)
4. **สร้าง XOR Gate**: ต่อด้วย 4 NAND Gates:
   - $G_1 = \\overline{AB}$
   - $G_2 = \\overline{A \\cdot G_1}$
   - $G_3 = \\overline{B \\cdot G_1}$
   - $\\text{Out} = \\overline{G_2 \\cdot G_3} = A \\oplus B$ (ใช้น้อยที่สุดคือ 4 เกต)`,
        formulas: [
          {
            label: 'จำนวน NAND ขั้นต่ำ: NOT=1, AND=2, OR=3, XOR=4, XNOR=5',
            formula: 'N_{\\text{NAND}}(NOT)=1, N_{\\text{NAND}}(AND)=2, N_{\\text{NAND}}(OR)=3, N_{\\text{NAND}}(XOR)=4',
            note: 'NOR จะสลับคู่กัน: NOT=1, OR=2, AND=3, XNOR=4, XOR=5'
          }
        ],
        keyPoints: [
          'NAND ทำ NOT ใช้ 1 ตัว, ทำ AND ใช้ 2 ตัว, ทำ OR ใช้ 3 ตัว, ทำ XOR ใช้ 4 ตัว',
          'NOR ทำ NOT ใช้ 1 ตัว, ทำ OR ใช้ 2 ตัว, ทำ AND ใช้ 3 ตัว, ทำ XNOR ใช้ 4 ตัว',
          'XOR ใช้ 4 NAND หรือ 5 NOR, ส่วน XNOR ใช้ 5 NAND หรือ 4 NOR'
        ]
      },
      {
        title: '2. วงจรสับสัญญาณ (Chopper Circuit) ในระบบสมาร์ตดีไวซ์',
        content: `ในสไลด์ ดร. ปวีณ มีการสอนเรื่อง **Chopper Circuit (วงจรสับสัญญาณ)**:
- **นิยาม**: เป็นวงจรที่นำสัญญาณแอนะล็อกความถี่ต่ำหรือกระแสตรง (DC) มาผ่านการ "สับ (Chopping)" ด้วยสัญญาณนาฬิกาพัลส์ความถี่สูง ($f_{\\text{carrier}}$)
- **สมการทำงาน**: เอาต์พุตคือการคูณสัญญาณเข้ากับสัญญาณสับ $y(t) = x(t) \\cdot c(t)$
- **ประโยชน์ในสมาร์ตดีไวซ์และอุปกรณ์วัด**:
  1. แปลงสัญญาณ DC ให้กลายเป็นสัญญาณ AC พัลส์ ทำให้สามารถส่งผ่านหม้อแปลง (Transformer) หรือตัวเก็บประจุได้โดยไม่สูญเสีย
  2. ช่วยขจัด **DC Drift** และสัญญาณรบกวนความถี่ต่ำ ($1/f$ Flicker Noise)
  3. สัญญาณพัลส์ที่ได้สามารถประมวลผลต่อด้วยวงจรดิจิทัลได้อย่างแม่นยำ`,
        formulas: [
          {
            label: 'Chopper Output Multiplication',
            formula: 'y(t) = x(t) \\cdot c(t)',
            note: 'x(t)=สัญญาณแอนะล็อกอินพุต, c(t)=สัญญาณสับพัลส์ความถี่สูง carrier'
          }
        ],
        examTip: 'ข้อสอบถามเรื่อง Chopper: จำไว้ว่าเอาต์พุตของ Chopper จะเป็นสัญญาณคลื่นเดิมแต่ถูกหั่นเป็นช่วงๆ ตามจังหวะของ Clock เสมอ'
      },
      {
        title: '3. วงจร Open-Collector, ตัวต้านทาน Pull-Up และ Tri-State Buffer (Hi-Z)',
        content: `ในระบบบัสข้อมูลที่ต้องเชื่อมต่อเอาต์พุตหลายตัวเข้ากับสายเส้นเดียวกัน เกตแบบธรรมดาไม่สามารถนำขาเอาต์พุตมามัดรวมกันได้ (จะเกิดการช็อตวงจร!) จึงต้องใช้วงจรพิเศษ 2 แบบ:

1. **วงจร Open-Collector / Open-Drain (Wired-AND Logic):**
   - ทรานซิสเตอร์เอาต์พุตไม่มีตัวดึงขึ้นไฟเลี้ยง มีแต่ดึงลงกราวด์ จึงต้องต่อตัวต้านทาน **Pull-Up ($R_p$)** ภายนอกเข้ากับ $V_{CC}$
   - เมื่อเอาต์พุตหลายตัวต่อเข้าสายเดียวกัน จะทำหน้าที่เสมือน **Wired-AND**: สายบัสจะเป็น 1 ได้ก็ต่อเมื่อเกตทุกตัวปล่อยลอย (High) ทั้งหมด
   - **สูตรคำนวณค่าตัวต้านทาน Pull-up ขั้นต่ำและสูงสุด (ข้อสอบออกคำนวณ!):**
   $$R_{p, \\min} = \\frac{V_{CC} - V_{OL(\\max)}}{I_{OL(\\max)} - N \\times I_{IL}}$$
   $$R_{p, \\max} = \\frac{V_{CC} - V_{OH(\\min)}}{m \\times I_{OH} + N \\times I_{IH}}$$
   *(เมื่อ $N$ คือจำนวนโหลดอินพุตที่ต่อพ่วง, $m$ คือจำนวนเอาต์พุต Open-Collector ที่ต่อร่วม)*
   - **ตัวอย่าง:** $V_{CC}=5\\text{V}, V_{OL}=0.4\\text{V}, I_{OL}=16\\text{mA}, N=4, I_{IL}=1.6\\text{mA}$
   $$R_{p, \\min} = \\frac{5\\text{V} - 0.4\\text{V}}{16\\text{mA} - (4 \\times 1.6\\text{mA})} = \\frac{4.6\\text{V}}{16\\text{mA} - 6.4\\text{mA}} = \\frac{4.6\\text{V}}{9.6\\text{mA}} = 479.17\\Omega$$

2. **เกต 3 สถานะ (Tri-State Buffer / Hi-Z):**
   - มีขาควบคุม **Output Enable (OE)** เพิ่มขึ้นมา
   - **เมื่อ $OE = 1$**: เอาต์พุตทำงานปกติ ($Y = A$)
   - **เมื่อ $OE = 0$**: เอาต์พุตจะถูกตัดขาดจากวงจร มีค่าความต้านทานสูงมาก เรียกว่า **High Impedance (Hi-Z)** ไม่ดึงกระแสและไม่จ่ายแรงดัน เสมือนถอดสายไฟออก
   - ใช้สร้าง **บัสข้อมูลแบบสองทิศทาง (Bidirectional Data Bus)** ภายในคอมพิวเตอร์ โดยระบบควบคุมจะเปิด $OE$ ให้ส่งข้อมูลได้ทีละอุปกรณ์เท่านั้น ป้องกัน Bus Contention`,
        formulas: [
          {
            label: 'Pull-up Resistor ขั้นต่ำ (ป้องกันกระแสเกินพิกัด IOL)',
            formula: 'R_{p, \\min} = \\frac{V_{CC} - V_{OL(\\max)}}{I_{OL(\\max)} - N \\times I_{IL}}',
            note: 'Vcc=ไฟเลี้ยง, VOL=แรงดัน Low สูงสุด, IOL=กระแสดึงจมสูงสุด, N=จำนวนเกตโหลด'
          },
          {
            label: 'Pull-up Resistor สูงสุด (รักษาระดับแรงดัน VOH)',
            formula: 'R_{p, \\max} = \\frac{V_{CC} - V_{OH(\\min)}}{m \\times I_{OH} + N \\times I_{IH}}',
            note: 'VOH=แรงดัน High ต่ำสุด, m=จำนวนเกตตัวขับ, N=จำนวนเกตโหลด'
          },
          {
            label: 'Tri-State Logic Operation',
            formula: 'Y = \\begin{cases} A & \\text{if } OE = 1 \\\\ \\text{Hi-Z (High Impedance)} & \\text{if } OE = 0 \\end{cases}',
            note: 'Hi-Z เสมือนสวิตช์เปิดวงจร ไม่รบกวนสัญญาณบนสายบัส'
          }
        ],
        keyPoints: [
          'Open-Collector ต้องมีตัวต้านทาน Pull-up เสมอ มิฉะนั้นเอาต์พุตจะไม่มีสถานะ HIGH',
          'การต่อเอาต์พุต Open-Collector ชนกันจะเกิดฟังก์ชัน Wired-AND',
          'Tri-State Buffer ให้สถานะ 0, 1 และ Hi-Z ใช้เชื่อมต่อกับ Microprocessor Data Bus'
        ],
        examTip: 'ข้อสอบถามเรื่อง Tri-State: เมื่อ OE เป็น 0 เอาต์พุตจะอยู่ในสภาวะ Hi-Z ไม่ใช่ 0 หรือ 1!'
      }
    ],
    quickQuiz: [
      {
        id: 'q3-3-1',
        chapterId: 'ch3',
        topic: 'Universal Gate Count',
        question: 'ต้องใช้ NAND Gate ขั้นต่ำกี่ตัวในการสังเคราะห์เป็นฟังก์ชัน 2-Input OR Gate?',
        options: ['2 ตัว', '3 ตัว', '4 ตัว', '5 ตัว'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'OR Gate สามารถสังเคราะห์ได้จาก (A\' · B\')\' ซึ่งต้องใช้ NAND 2 ตัวทำ Inverter สำหรับ A และ B จากนั้นใช้ NAND อีก 1 ตัวรวมสัญญาณ จึงใช้ทั้งหมด 3 ตัว'
      },
      {
        id: 'q3-3-2',
        chapterId: 'ch3',
        topic: 'Open-Collector Pull-up Calculation',
        question: 'วงจร Open-Collector ใช้ไฟเลี้ยง VCC = 5V มี VOL(max) = 0.4V และ IOL(max) = 16mA ต่อขับเกตโหลด 4 ตัว โดยแต่ละตัวกินกระแส IIL = 1.6mA ค่าตัวต้านทาน Pull-up ขั้นต่ำ (Rp,min) มีค่าประมาณเท่าใด?',
        options: ['220 Ω', '330 Ω', '479 Ω', '1.0 kΩ'],
        correctAnswer: 2,
        difficulty: 'เข้มข้น',
        explanation: 'Rp,min = (VCC - VOL) / (IOL - N * IIL) = (5 - 0.4) / (16mA - 4 * 1.6mA) = 4.6V / (16mA - 6.4mA) = 4.6V / 9.6mA = 479.17 Ω'
      }
    ]
  },
  {
    id: 'ch3-4',
    chapterId: 'ch3',
    chapterNumber: 3,
    chapterTitle: 'บทที่ 3: Digital Circuit (วงจรดิจิทัล)',
    title: 'วงจรบวก-ลบเลขดิจิทัล และวงจรแปลงข้อมูล (Adders, Subtractors, DAC & ADC)',
    subtitle: 'Full Adder, Full Subtractor, 2\'s Complement Overflow, Weighted & R-2R DAC และเปรียบเทียบความเร็ว ADC ทั้ง 4 ชนิด',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '03_digitalCircuit.pdf (สไลด์หน้า 76-120)',
    summary: 'วงจรบวกและวงจรลบเลขดิจิทัลสร้างจากเกตพื้นฐาน ส่วนการแปลงข้อมูล DAC/ADC มีสูตรคำนวณแรงดันเอาต์พุตและเวลาในการแปลง (Conversion Speed) ที่แตกต่างกันอย่างมีนัยสำคัญตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. วงจรบวกเต็มรูปแบบ (Full Adder: FA) และ Ripple Carry Adder',
        content: `ทำหน้าที่บวกเลขฐานสอง 3 บิตพร้อมกัน คือ บิตตัวตั้ง $A$, บิตตัวบวก $B$ และตัวทดรับเข้า $C_{\\text{in}}$:

![แผนภาพวงจร Full Adder](diagram:full-adder)

**สมการเอาต์พุตสำคัญ:**
- $\\text{Sum} = A \\oplus B \\oplus C_{\\text{in}}$
- $C_{\\text{out}} = AB + C_{\\text{in}}(A \\oplus B) = AB + BC_{\\text{in}} + AC_{\\text{in}}$

![4-bit Ripple Carry Adder ต่อเรียงกัน](diagram:ripple-adder)

**การต่อเป็นวงจรบวกหลายบิต (Ripple Carry Adder):**
- นำ Full Adder มาต่ออนุกรมกัน $n$ ตัว โดยส่ง $C_{\\text{out}}$ ของหลักต่ำไปเป็น $C_{\\text{in}}$ ของหลักถัดไป
- ข้อจำกัด: บิตสูงสุดต้องรอตัวทดกระเพื่อม (Ripple) ส่งต่อมาเรื่อยๆ ทำให้เกิดความล่าช้าสะสม $t_{\\text{total}} = n \\times t_{pd}$
- ความถี่ทำงานสูงสุด: $f_{\\max} = \\frac{1}{n \\times t_{pd}}$`,
        formulas: [
          { label: 'Full Adder Sum', formula: 'S = A \\oplus B \\oplus C_{in}', note: 'เป็น Odd Parity Function มีค่า 1 เมื่อมีบิต 1 เป็นจำนวนคี่' },
          { label: 'Full Adder Carry Out', formula: 'C_{out} = AB + BC_{in} + AC_{in} = AB + C_{in}(A \\oplus B)', note: 'เป็น 1 เมื่อมีอินพุตเป็น 1 ตั้งแต่ 2 บิตขึ้นไป' },
          { label: 'Ripple Carry Delay & f_max', formula: 't_{total} = n \\times t_{pd} \\quad , \\quad f_{\\max} = \\frac{1}{n \\times t_{pd}}', note: 'n คือจำนวนบิต, tpd คือ delay ของ Full Adder แต่ละตัว' }
        ],
        keyPoints: [
          'Full Adder สร้างจาก Half Adder 2 ตัว + OR Gate 1 ตัว',
          'Sum เป็นฟังก์ชันคี่ (Odd Parity) มี 1 เมื่ออินพุตเป็น 1 จำนวน 1 หรือ 3 ตัว'
        ]
      },
      {
        title: '2. วงจรลบเต็มรูปแบบ (Full Subtractor) และการตรวจจับ Overflow',
        content: `**วงจรลบเต็มรูปแบบ (Full Subtractor: FS):**
รับอินพุตตัวตั้ง $A$, ตัวลบ $B$, และตัวยืมเข้า $B_{\\text{in}}$ เพื่อหาผลต่าง (Difference: $Diff$) และตัวยืมออก ($B_{\\text{out}}$):
- **สมการผลต่าง (Difference):**
$$Diff = A \\oplus B \\oplus B_{\\text{in}}$$
- **สมการตัวยืมออก (Borrow Out):**
$$B_{\\text{out}} = \\bar{A}B + \\bar{A}B_{\\text{in}} + BB_{\\text{in}} = \\bar{A}B + B_{\\text{in}}(\\overline{A \\oplus B})$$

**วงจรลบเลขด้วย 2\'s Complement ในระบบคอมพิวเตอร์:**
คอมพิวเตอร์ใช้ **วงจรบวกบวกกับ 2\'s Complement** ของตัวลบ ($A - B = A + \\bar{B} + 1$):
- **โหมดบวก ($M = 0$)**: ส่ง $B$ ผ่าน XOR ตรงๆ และ $C_{\\text{in}} = 0$
- **โหมดลบ ($M = 1$)**: $B \\oplus 1 = \\bar{B}$ (กลับบิต) และจ่าย $C_{\\text{in}} = 1$ บวกเพิ่ม 1 ที่ LSB อัตโนมัติ!

**กฎการตรวจจับ Overflow (เลขล้นบิต):**
$$\\text{Overflow } V = C_n \\oplus C_{n-1}$$
เมื่อ $C_n$ คือตัวทดออกจากบิตเครื่องหมาย และ $C_{n-1}$ คือตัวทดเข้าบิตเครื่องหมาย
- หากบวกเลขเครื่องหมายเดียวกัน แต่ได้ผลลัพธ์เป็นเครื่องหมายตรงข้าม (เช่น บวก + บวก ได้ ลบ) จะเกิด Overflow!`,
        formulas: [
          { label: 'Full Subtractor Difference', formula: 'Diff = A \\oplus B \\oplus B_{in}', note: 'สมการรูปเดียวกับ Sum ของ Full Adder' },
          { label: 'Full Subtractor Borrow Out', formula: 'B_{out} = \\bar{A}B + B_{in}(\\overline{A \\oplus B}) = \\bar{A}B + \\bar{A}B_{in} + BB_{in}', note: 'ต่างจาก Carry Out ตรงที่บิต A ต้องถูกกลับค่า (NOT A)' },
          { label: 'กฎตรวจจับ Overflow', formula: 'V = C_n \\oplus C_{n-1}', note: 'ถ้า Cin เข้าบิต MSB ไม่เท่ากับ Cout จะเกิด Overflow ล้นบิต' }
        ],
        examTip: 'ข้อสอบถามเรื่อง Overflow: ตรวจสอบง่ายๆ ถ้า Cin เข้าบิต MSB ไม่เท่ากับ Cout ออกจาก MSB (Cin XOR Cout = 1) แสดงว่าผลลัพธ์ล้นบิตและผิดพลาดแน่นอน!'
      },
      {
        title: '3. วงจรแปลงสัญญาณดิจิทัลเป็นแอนะล็อก (DAC: Binary Weighted vs R-2R Ladder)',
        content: `วงจรแปลงดิจิทัลเป็นแอนะล็อกทำหน้าที่เปลี่ยนคำดิจิทัลหลายบิตให้เป็นแรงดันไฟฟ้าต่อเนื่อง มี 2 โครงสร้างหลัก:

1. **Binary-Weighted Resistor DAC:**
   - ใช้ตัวต้านทานถ่วงน้ำหนักตามเลขฐานสอง: $R, 2R, 4R, 8R, \\dots, 2^{n-1}R$
   $$V_{\\text{out}} = -V_{\\text{ref}} \\times \\frac{R_f}{R} \\times \\left( \\frac{B_{n-1}}{1} + \\frac{B_{n-2}}{2} + \\dots + \\frac{B_0}{2^{n-1}} \\right)$$
   - ข้อเสีย: ถ้าบิตสูงขึ้น ค่าความต้านทานจะต่างกันหลายร้อยเท่า ยากต่อการผลิตให้แม่นยำ

2. **R-2R Ladder DAC (โครงสร้างยอดนิยม):**
   - ใช้ตัวต้านทานเพียง 2 ค่าเท่านั้นคือ $R$ และ $2R$ ต่อเป็นขั้นบันได

![วงจรตัวต้านทานแบบ R-2R Ladder Network](diagram:r2r-ladder)

- **สมการแรงดันเอาต์พุต (4 บิต):**
$$V_{\\text{out}} = V_{\\text{ref}} \\times \\left( \\frac{B_3}{2} + \\frac{B_2}{4} + \\frac{B_1}{8} + \\frac{B_0}{16} \\right) = \\frac{V_{\\text{ref}}}{2^n} \\times \\sum_{i=0}^{n-1} B_i 2^i$$
- **ความละเอียดต่อขั้น (Resolution / 1 LSB):**
$$\\Delta V = \\frac{V_{\\text{ref}}}{2^n}$$
- **ตัวอย่าง:** ถ้า $V_{\\text{ref}} = 5\\text{V}, n = 4$ บิต $\\implies \\Delta V = \\frac{5}{16} = 0.3125\\text{V}$ ป้อนรหัส $1100_2 (12) \\implies V_{\\text{out}} = 12 \\times 0.3125\\text{V} = 3.75\\text{V}$`,
        formulas: [
          { label: 'R-2R DAC Output Voltage', formula: 'V_{out} = \\frac{V_{ref}}{2^n} \\times \\sum_{i=0}^{n-1} B_i 2^i = V_{ref} \\sum_{i=0}^{n-1} \\frac{B_i}{2^{n-i}}', note: 'Bn-1 คือ MSB, B0 คือ LSB' },
          { label: 'DAC Resolution (Step Size)', formula: '\\Delta V = \\frac{V_{ref}}{2^n}', note: 'แรงดันเพิ่มขึ้นต่อ 1 LSB' }
        ],
        keyPoints: [
          'R-2R Ladder ใช้ตัวต้านทานเพียง 2 ค่า (R และ 2R) ทำให้ผลิตลงชิปไอซีได้แม่นยำกว่า Weighted Resistor',
          'แรงดันเอาต์พุตสูงสุดที่บิต 1 ทุกตัวคือ Vref * (2^n - 1) / 2^n เสมอ'
        ]
      },
      {
        title: '4. วงจรแปลงสัญญาณแอนะล็อกเป็นดิจิทัล (ADC) และสูตรเปรียบเทียบความเร็วทั้ง 4 ชนิด',
        content: `ในข้อสอบและสไลด์ อ.ปวีณ มีการเปรียบเทียบสถาปัตยกรรม ADC สำคัญ 4 ประเภทตามความเร็วและจำนวนอุปกรณ์:

| ชนิดของ ADC | เวลาในการแปลง (Conversion Time / Clocks) | จำนวนอุปกรณ์และคุณสมบัติเด่น | ความเร็ว |
|---|---|---|:---:|
| **Flash ADC (Parallel)** | **$1$ รอบสัญญาณนาฬิกา (เร็วที่สุด!)** | ใช้ Comparators $= 2^n - 1$ ตัว (เปลืองอุปกรณ์) | เร็วสูงสุด |
| **Successive Approximation (SAR)** | **$n$ รอบสัญญาณนาฬิกา (คงที่เสมอ)** | ใช้ Binary Search, DAC 1 ตัว, Comparator 1 ตัว | ปานกลาง-สูง |
| **Counter Ramp ADC** | **$1 \\text{ ถึง } 2^n$ รอบ (เฉลี่ย $2^{n-1}$ รอบ)** | ใช้วงจรนับวิ่งไล่ระดับแรงดัน ช้าเมื่อแรงดันสูง | ช้า |
| **Dual-Slope Integrating ADC** | **$2^{n+1}$ รอบสัญญาณนาฬิกา** | ใช้ Op-Amp Integrator ชาร์จและคายประจุ แม่นยำ ขจัด Noise ยอดเยี่ยม | ช้าที่สุด |

**ตัวอย่างการคำนวณเปรียบเทียบความเร็วในการแปลง (ข้อสอบออกจริง):**
สำหรับระบบ ADC ขนาด $n = 8$ บิต ที่สัญญาณนาฬิกา $f_{\\text{clk}} = 1\\text{ MHz}$ ($T_{\\text{clk}} = 1\\mu\\text{s}$):
- **Flash ADC**: ใช้เวลา $1 \\times 1\\mu\\text{s} = 1\\mu\\text{s}$ (ใช้ Comparator $2^8 - 1 = 255$ ตัว)
- **SAR ADC**: ใช้เวลา $8 \\times 1\\mu\\text{s} = 8\\mu\\text{s}$ (เสร็จใน 8 รอบเสมอไม่ว่าแรงดันจะเท่าใด)
- **Counter Ramp ADC**: แย่ที่สุดใช้ $2^8 \\times 1\\mu\\text{s} = 256\\mu\\text{s}$ (เฉลี่ย $128\\mu\\text{s}$)
- **Dual-Slope ADC**: ใช้เวลา $2^{8+1} \\times 1\\mu\\text{s} = 512\\mu\\text{s}$`,
        formulas: [
          { label: 'Flash ADC: เวลาแปลงและจำนวนตัวเปรียบเทียบ', formula: 'T_{\\text{Flash}} = 1 \\text{ clock} \\quad , \\quad N_{\\text{comp}} = 2^n - 1', note: 'แปลงเสร็จใน 1 จังหวะเสมอ แต่ใช้อุปกรณ์มหาศาล' },
          { label: 'SAR ADC: เวลาในการแปลงคงที่', formula: 'T_{\\text{SAR}} = n \\text{ clocks} = \\frac{n}{f_{\\text{clk}}}', note: 'ใช้เวลาคงที่เท่ากับจำนวนบิต n เสมอ' },
          { label: 'Counter Ramp ADC: เวลาในการแปลงสูงสุดและเฉลี่ย', formula: 'T_{\\max} = 2^n \\text{ clocks} \\quad , \\quad T_{\\text{avg}} = 2^{n-1} \\text{ clocks}', note: 'เวลาในการแปลงขึ้นอยู่กับขนาดของแรงดันอินพุต' },
          { label: 'Dual Slope ADC: เวลาในการแปลง', formula: 'T_{\\text{Dual}} = 2^{n+1} \\text{ clocks}', note: 'ช้าที่สุดแต่นิ่งและขจัด 50/60Hz Noise ได้ดีที่สุด ใช้ในมัลติมิเตอร์' }
        ],
        examTip: 'ข้อสอบถาม ADC ที่เร็วที่สุด: ตอบ Flash ADC (1 clock), ถ้าถาม ADC ที่เวลาแปลงคงที่และสมดุลที่สุด: ตอบ SAR (n clocks)!'
      }
    ],
    quickQuiz: [
      {
        id: 'q3-4-1',
        chapterId: 'ch3',
        topic: 'Flash ADC Sizing',
        question: 'วงจรแปลงสัญญาณ Flash ADC ขนาด 6 บิต ต้องใช้วงจรเปรียบเทียบแรงดัน (Comparator) ภายในทั้งหมดกี่ตัว?',
        options: ['6 ตัว', '32 ตัว', '63 ตัว', '64 ตัว'],
        correctAnswer: 2,
        difficulty: 'ปานกลาง',
        explanation: 'Flash ADC ขนาด n บิต ต้องใช้ Comparator เท่ากับ 2^n - 1 ตัว ดังนั้น 2^6 - 1 = 64 - 1 = 63 ตัว'
      },
      {
        id: 'q3-4-2',
        chapterId: 'ch3',
        topic: 'ADC Conversion Speed Comparison',
        question: 'ในการแปลงสัญญาณแอนะล็อกเป็นดิจิทัลขนาด 10 บิต ADC แบบใดใช้เวลาในการแปลงสัญญาณคงที่เท่ากับ 10 รอบสัญญาณนาฬิกาเสมอ ไม่ว่าแรงดันอินพุตจะมีค่าเท่าใด?',
        options: [
          'Flash ADC',
          'Successive Approximation Register (SAR) ADC',
          'Counter Ramp ADC',
          'Dual-Slope Integrating ADC'
        ],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'SAR ADC ใช้วิธีค้นหาแบบ Binary Search จึงใช้จำนวนรอบสัญญาณนาฬิกาคงที่เท่ากับจำนวนบิต n เสมอ (สำหรับ 10 บิตคือ 10 รอบ)'
      }
    ]
  },

  // ==========================================
  // CHAPTER 4: Boolean Algebra & K-Map
  // ==========================================
  {
    id: 'ch4-1',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Boolean Algebra & Simplification (การลดรูปวงจร)',
    title: 'พีชคณิตบูลีน กฎ และทฤษฎีบทการลดทอน (Boolean Algebra)',
    subtitle: 'กฎพื้นฐาน ทฤษฎีบทการดูดกลืน (Absorption) ฉันทามติ (Consensus) และกฎเดอมอร์แกน',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '04_simplification.pdf (สไลด์หน้า 2-30)',
    summary: 'พีชคณิตบูลีนเป็นระบบคณิตศาสตร์ของตัวแปร 2 สถานะ ใช้ทฤษฎีบทต่างๆ เช่น เดอมอร์แกน และการยุบตัวแปร เพื่อลดทอนจำนวนเกตในวงจรให้เหลือน้อยที่สุด',
    sections: [
      {
        title: '1. ทฤษฎีบทพื้นฐานและการดูดกลืน (Absorption Law)',
        content: `กฎสำคัญที่ช่วยลดรูปสมการได้อย่างรวดเร็ว:
- **Identity Law**: $A + 0 = A$, $A \\cdot 1 = A$
- **Null Law**: $A + 1 = 1$, $A \\cdot 0 = 0$
- **Idempotent Law**: $A + A = A$, $A \\cdot A = A$
- **Complement Law**: $A + \\bar{A} = 1$, $A \\cdot \\bar{A} = 0$
- **Involution Law**: $\\overline{\\bar{A}} = A$
- **Absorption Law (การดูดกลืน - ใช้บ่อยมาก)**:
  1. $A + AB = A(1 + B) = A(1) = A$
  2. $A(A + B) = AA + AB = A + AB = A$
  3. $A + \\bar{A}B = (A + \\bar{A})(A + B) = 1 \\cdot (A + B) = A + B$ (ตัดตัวกลับค่าทิ้งได้ทันที!)`,
        keyPoints: [
          'A + A\'B = A + B (จำสูตรลัดนี้ไปใช้ในห้องสอบ ช่วยประหยัดเวลามาก)',
          'A + 1 = 1 เสมอ ไม่ว่า A จะมีค่าเท่าใดก็ตาม'
        ]
      },
      {
        title: '2. ทฤษฎีบทฉันทามติ (Consensus Theorem - ข้อสอบ อ.ปวีณ เน้นมาก!)',
        content: `**Consensus Theorem** กล่าวว่า:
$$AB + \\bar{A}C + BC = AB + \\bar{A}C$$
- สังเกตว่าเทอม $BC$ (เรียกว่า Consensus Term) ประกอบด้วยตัวแปรที่เหลือจากเทอมที่มี $A$ และ $\\bar{A}$
- เทอม $BC$ นี้ **เป็นเทอมส่วนเกิน (Redundant Term)** สามารถตัดทิ้งได้ในการลดรูปสมการ
- แต่ในการสร้างวงจรจริง เทอม $BC$ นี้มีความจำเป็นอย่างยิ่งในการ **ขจัด Static-1 Hazard (Glitch)** ไม่ให้สัญญาณตกวูบ!`,
        formulas: [
          { label: 'Consensus Theorem (SOP)', formula: 'AB + \\bar{A}C + BC = AB + \\bar{A}C' },
          { label: 'Consensus Theorem (POS)', formula: '(A+B)(\\bar{A}+C)(B+C) = (A+B)(\\bar{A}+C)' }
        ],
        examTip: 'วิธีสังเกต Consensus: มองหาตัวแปรคู่ตรงข้าม (A กับ A\') ถ้ามีอีกเทอมหนึ่งนำตัวแปรที่คู่กับมันมารวมกัน (BC) เทอมนั้นคือ Consensus ตัดทิ้งได้เลย!'
      }
    ],
    quickQuiz: [
      {
        id: 'q4-1-1',
        chapterId: 'ch4',
        topic: 'Boolean Simplification',
        question: 'สมการ Y = X + X\'Y สามารถลดรูปให้เหลือรูปอย่างง่ายที่สุดได้ตามข้อใด?',
        options: ['X', 'Y', 'X + Y', 'XY'],
        correctAnswer: 2,
        difficulty: 'ง่าย',
        explanation: 'จากกฎการดูดกลืน X + X\'Y = (X + X\')(X + Y) = 1 · (X + Y) = X + Y'
      }
    ]
  },
  {
    id: 'ch4-2',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Boolean Algebra & Simplification (การลดรูปวงจร)',
    title: 'รูปแบบบัญญัติ (Canonical Forms: SOP, POS, Minterm, Maxterm)',
    subtitle: 'การสังเคราะห์สมการ Sum of Products (∑m) และ Product of Sums (∏M) จากตารางความจริง',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '04_simplification.pdf (สไลด์หน้า 31-60)',
    summary: 'สมการบูลีนสามารถเขียนได้ 2 รูปแบบมาตรฐานคือ SOP (ผลบวกของผลคูณจากมินเทอม) และ POS (ผลคูณของผลบวกจากแมกซ์เทอม) ซึ่งสามารถแปลงสลับกันได้ด้วยหลักส่วนเติมเต็ม',
    sections: [
      {
        title: '1. มินเทอม (Minterms: SOP) vs แมกซ์เทอม (Maxterms: POS)',
        content: `ทุกแถวในตารางค่าความจริง $n$ ตัวแปร จะมีรูปแบบมินเทอมและแมกซ์เทอมประจำตัวเสมอ ($2^n$ รูปแบบ):

| เลขแถว ($i$) | $A$ | $B$ | $C$ | มินเทอม ($m_i$) สำหรับ SOP | แมกซ์เทอม ($M_i$) สำหรับ POS |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 0 | $\\bar{A}\\bar{B}\\bar{C}$ ($m_0$) | $A + B + C$ ($M_0$) |
| 1 | 0 | 0 | 1 | $\\bar{A}\\bar{B}C$ ($m_1$) | $A + B + \\bar{C}$ ($M_1$) |
| 2 | 0 | 1 | 0 | $\\bar{A}B\\bar{C}$ ($m_2$) | $A + \\bar{B} + C$ ($M_2$) |
| 3 | 0 | 1 | 1 | $\\bar{A}BC$ ($m_3$) | $A + \\bar{B} + \\bar{C}$ ($M_3$) |
| 4 | 1 | 0 | 0 | $A\\bar{B}\\bar{C}$ ($m_4$) | $\\bar{A} + B + C$ ($M_4$) |
| 5 | 1 | 0 | 1 | $A\\bar{B}C$ ($m_5$) | $\\bar{A} + B + \\bar{C}$ ($M_5$) |
| 6 | 1 | 1 | 0 | $AB\\bar{C}$ ($m_6$) | $\\bar{A} + \\bar{B} + C$ ($M_6$) |
| 7 | 1 | 1 | 1 | $ABC$ ($m_7$) | $\\bar{A} + \\bar{B} + \\bar{C}$ ($M_7$) |

**หลักการจำแม่นยำ:**
- **Minterm ($m_i$)**: ถ้าตัวแปรเป็น 1 ไม่ต้องใส่บาร์, ถ้าตัวแปรเป็น 0 ให้ใส่บาร์
- **Maxterm ($M_i$)**: ถ้าตัวแปรเป็น 0 ไม่ต้องใส่บาร์, ถ้าตัวแปรเป็น 1 ให้ใส่บาร์ (สลับกัน!)`,
        keyPoints: [
          'SOP (Sum of Products) นำแถวที่เอาต์พุต Y = 1 มารวมกันด้วยเครื่องหมาย + (OR)',
          'POS (Product of Sums) นำแถวที่เอาต์พุต Y = 0 มารวมกันด้วยการคูณ (AND)'
        ]
      },
      {
        title: '2. กฎการแปลงสลับระหว่าง ∑m และ ∏M',
        content: `เนื่องจากเอาต์พุตมีเพียง 0 กับ 1 ดังนั้นเซตของแถวที่เป็น 1 และแถวที่เป็น 0 จึงเป็น **ส่วนเติมเต็ม (Complement)** ของกันและกันเสมอ:

**ตัวอย่าง:**
ฟังก์ชัน 3 ตัวแปร $F(A, B, C)$:
- ถ้า $F = \\sum m(1, 3, 5, 7)$ (แถวที่เป็น 1)
- แถวที่เหลือคือ $0, 2, 4, 6$ (แถวที่เป็น 0)
- ดังนั้นสามารถเขียนในรูป POS ได้ทันทีว่า:
$$F = \\prod M(0, 2, 4, 6)$$
- และฟังก์ชันกลับค่า $\\bar{F}$ คือ:
$$\\bar{F} = \\sum m(0, 2, 4, 6) = \\prod M(1, 3, 5, 7)$$`,
        examTip: 'ในห้องสอบ ถ้าโจทย์ให้แปลงจาก ∑m เป็น ∏M ไม่ต้องตั้งตารางความจริงใหม่! เพียงแค่นำเลขลำดับที่ไม่มีอยู่ใน ∑m มาใส่ใน ∏M ได้คำตอบทันทีใน 3 วินาที!'
      }
    ],
    quickQuiz: [
      {
        id: 'q4-2-1',
        chapterId: 'ch4',
        topic: 'Minterm to Maxterm Conversion',
        question: 'กำหนดให้ฟังก์ชัน 3 ตัวแปร F(A,B,C) = ∑m(0, 2, 3, 7) ฟังก์ชัน F ในรูป POS คือข้อใด?',
        options: ['∏M(0, 2, 3, 7)', '∏M(1, 4, 5, 6)', '∏M(1, 2, 4, 5)', '∑M(1, 4, 5, 6)'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'สำหรับ 3 ตัวแปรมีมินเทอม 0 ถึง 7 เมื่อ F = ∑m(0, 2, 3, 7) ตัวเลขที่เหลือคือ 1, 4, 5, 6 ดังนั้น F = ∏M(1, 4, 5, 6)'
      }
    ]
  },
  {
    id: 'ch4-3',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Boolean Algebra & Simplification (การลดรูปวงจร)',
    title: 'แผนผังคาร์โนห์ (Karnaugh Map: K-Map 2, 3, 4 ตัวแปร) & 3D Torus',
    subtitle: 'กฎการจัดกลุ่ม K-Map, Essential Prime Implicants, การยุบ 4 มุม และใบงานที่ 9 พัดลมโรงเรือน',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '04_simplification.pdf (สไลด์หน้า 61-110)',
    summary: 'K-Map อาศัยการจัดเรียงเซลล์แบบ Gray Code ให้ช่องติดกันต่างกันเพียง 1 บิต ช่วยให้จัดกลุ่ม 1 ยุบรวมตัวแปรได้อย่างรวดเร็วและเห็นภาพ โดยเฉพาะเมื่อมองขอบตารางม้วนแตะกันเป็น 3D Torus',
    sections: [
      {
        title: '1. โครงสร้างตาราง K-Map และ Gray Code Adjacency',
        content: `K-Map จัดเรียงลำดับหัวแถวและหัวคอลัมน์ด้วย **Gray Code ($00, 01, 11, 10$)**:
- สังเกตว่า **$11$ ต้องมาก่อน $10$** เพราะ Gray Code บังคับให้ช่องที่อยู่ติดกัน **มีบิตต่างกันเพียง 1 บิตเท่านั้น** ($01 \\to 11$ ต่างกัน 1 บิต, $11 \\to 10$ ต่างกัน 1 บิต)
- เมื่อช่องติดกันต่างกัน 1 บิต ตัวแปรที่สลับค่า ($A$ กับ $\\bar{A}$) จะหักล้างกันตามกฎ $A + \\bar{A} = 1$ ทำให้ยุบตัวแปรนั้นทิ้งได้ทันที!

![ผังมินเทอม K-Map 4 ตัวแปร A B C D](diagram:kmap-4var)

**กฎเหล็ก 5 ข้อในการวงกลุ่ม K-Map:**
1. จำนวนเซลล์ในแต่ละกลุ่มต้องเป็น **เลขยกกำลังของ 2 เสมอ** (กลุ่มละ 1, 2, 4, 8, 16 ช่อง)
2. กลุ่มต้องเป็นรูป **สี่เหลี่ยมผืนผ้าหรือสี่เหลี่ยมจัตุรัส** เท่านั้น (ห้ามวงทแยงมุมหรือรูปตัว L)
3. ต้องพยายามจัดกลุ่มให้มี **ขนาดใหญ่ที่สุดเท่าที่จะทำได้** (กลุ่มยิ่งใหญ่ สมการยิ่งสั้น)
4. เซลล์ 1 ตัวสามารถนำมาซ้ำในกลุ่มอื่นได้ (Overlap)
5. ขอบซ้ายสุดกับขอบขวาสุด และขอบบนสุดกับขอบล่างสุด **ถือว่าติดกันเสมอ (Torus Topology)**`,
        interactiveType: 'kmap',
        keyPoints: [
          'กลุ่ม 1 เซลล์ = ไม่ลดตัวแปร',
          'กลุ่ม 2 เซลล์ = ลดได้ 1 ตัวแปร',
          'กลุ่ม 4 เซลล์ = ลดได้ 2 ตัวแปร',
          'กลุ่ม 8 เซลล์ = ลดได้ 3 ตัวแปร',
          'กลุ่ม 16 เซลล์ = เอาต์พุตเป็น 1 ตลอดเวลา'
        ]
      },
      {
        title: '2. การยุบ 4 มุม และตัวอย่างโจทย์แล็บ 9 พัดลมโรงเรือน',
        content: `**การยุบ 4 มุม (Four Corners Grouping):**
มุมทั้ง 4 ของ K-Map 4 ตัวแปร คือ:
- มุมบนซ้าย ($m_0 = 0000$), มุมบนขวา ($m_2 = 0010$)
- มุมล่างซ้าย ($m_8 = 1000$), มุมล่างขวา ($m_{10} = 1010$)
เมื่อม้วนตาราง 2D ให้กลายเป็นโดนัท 3D (Torus) มุมทั้งสี่จะมาประกบชิดกันเป็นผืนสี่เหลี่ยม 4 ช่องที่ต่อเนื่องกัน จึงสามารถยุบรวมกันได้:
- ตัวแปร $A$ เปลี่ยน $0 \\to 1$ (ตัดทิ้ง)
- ตัวแปร $B$ เป็น $0$ ตลอด (คงเหลือ $\\bar{B}$)
- ตัวแปร $C$ เปลี่ยน $0 \\to 1$ (ตัดทิ้ง)
- ตัวแปร $D$ เป็น $0$ ตลอด (คงเหลือ $\\bar{D}$)
$$\\implies \\text{ผลลัพธ์คือ } \\bar{B}\\bar{D}$$

**ตัวอย่างแล็บ 9 (พัดลมโรงเรือน Greenhouse Fan):**
กำหนดเงื่อนไขเซนเซอร์ 4 ตัว $a, b, c, d$ ให้พัดลมทำงาน ($y = 1$) เมื่อ $d = 1$ ในทุกกรณี:
- เมื่อนำไปลง K-Map จะได้กลุ่มขนาด 8 เซลล์ครอบคลุมครึ่งล่างทั้งหมด ($d=1$)
- ตัวแปร $a, b, c$ สลับค่าครบทุกรูปแบบจึงตัดทิ้งทั้งหมด
- **สมการลดรูปเหลือเพียง**: $y = d$ ใช้สายสัญญาณจากเซนเซอร์ $d$ เข้าพัดลมโดยตรงโดยไม่ต้องใช้ลอจิกเกตแม้แต่ตัวเดียว!`,
        formulas: [
          { label: 'กลุ่ม 4 มุม K-Map 4 ตัวแปร', formula: 'm_0 + m_2 + m_8 + m_{10} = \\bar{B}\\bar{D}' }
        ],
        examTip: 'อย่าลืมมองหา 4 มุมเสมอใน K-Map 4 ตัวแปร! นักศึกษาส่วนใหญ่มักพลาดมองไม่เห็นว่า 4 มุมสามารถวงรวมกันเป็นกลุ่ม 4 เซลล์ได้'
      }
    ],
    quickQuiz: [
      {
        id: 'q4-3-1',
        chapterId: 'ch4',
        topic: 'K-Map 4 Corners',
        question: 'ใน K-Map 4 ตัวแปร F(A,B,C,D) มินเทอม m0, m2, m8, m10 สามารถยุบรวมกันได้ผลลัพธ์ตามข้อใด?',
        options: ['B\'D\'', 'A\'C\'', 'BD', 'AC'],
        correctAnswer: 0,
        difficulty: 'ปานกลาง',
        explanation: 'm0(0000), m2(0010), m8(1000), m10(1010) มีค่า B=0 และ D=0 ร่วมกัน ส่วน A และ C เปลี่ยนค่าทั้ง 0 และ 1 จึงหักล้างกันไป ได้ B\'D\''
      }
    ]
  },
  {
    id: 'ch4-4',
    chapterId: 'ch4',
    chapterNumber: 4,
    chapterTitle: 'บทที่ 4: Boolean Algebra & Simplification (การลดรูปวงจร)',
    title: 'Don\'t Care, Static Hazards, ไอซี CD4511 & วงจร MUX, Decoder, Comparator',
    subtitle: 'การใช้ Don\'t Care (X), การขจัด Static-1 Hazard, ฟังก์ชัน CD4511, Shannon Expansion MUX และวงจรเปรียบเทียบขนาด',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '04_simplification.pdf (สไลด์หน้า 111-135)',
    summary: 'สภาวะไม่สนใจช่วยขยายกลุ่ม K-Map, Static Hazard แก้ด้วย Consensus Term พร้อมทฤษฎีบทการกระจายของแชนนอน (Shannon Expansion) ในการสังเคราะห์ MUX, การต่อพ่วง Decoder และวงจรเปรียบเทียบขนาด 4 บิต ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. สภาวะไม่สนใจ (Don\'t Care: X / d)',
        content: `**สภาวะไม่สนใจ (Don\'t Care Condition)** คือสภาวะของอินพุตที่ไม่สามารถเกิดขึ้นได้ในความเป็นจริง หรือเกิดขึ้นแล้วเอาต์พุตจะเป็นอะไรก็ได้ไม่มีผลต่อระบบ
- **หลักการใช้ใน K-Map**:
  - หากการรวม $X$ เข้ากลุ่มช่วยให้ **กลุ่มมีขนาดใหญ่ขึ้นเป็น 2 เท่า** (เช่น จาก 2 ช่องกลายเป็น 4 ช่อง) ให้ถือว่า $X$ นั้นเป็น **1**
  - แต่หาก $X$ นั้นไม่ช่วยให้กลุ่มใดขยายใหญ่ขึ้น ให้ปล่อยทิ้งไว้โดยถือว่าเป็น **0** ไม่จำเป็นต้องวงให้ครบทุก $X$`,
        keyPoints: [
          'Don\'t care ใช้สัญลักษณ์ X หรือ d(...) ในสมการ',
          'ช่วยลดรูปสมการให้สั้นลงได้อย่างมาก แต่ต้องเลือกใช้อย่างระมัดระวัง'
        ]
      },
      {
        title: '2. ไอซีถอดรหัส 7-Segment CD4511 (หัวใจสำคัญของใบงานที่ 9)',
        content: `ไอซี **CD4511** เป็น BCD to 7-Segment Latch/Decoder/Driver แบบต่อกับจอ **Common Cathode (ต่อขาลบร่วมลงกราวด์)**:

![โครงสร้างหลอด 7-Segment แต่ละส่วน a ถึง g](diagram:seven-segment)

**ขาควบคุมสำคัญ 3 ขา (ออกสอบทุกปี!):**
1. **$\\overline{LT}$ (Lamp Test - ขา 3, Active LOW)**:
   - เมื่อจ่ายลอจิก **0** หลอดไฟทุกส่วน ($a-g$) จะติดสว่างพร้อมกันทั้งหมด เพื่อทดสอบว่ามีหลอดไฟขาดหรือไม่
   - ในการทำงานปกติ ต้องต่อขานี้ไว้ที่ **+5V (Logic 1)**
2. **$\\overline{BI}$ (Blanking Input - ขา 4, Active LOW)**:
   - เมื่อจ่ายลอจิก **0** หลอดไฟทุกส่วนจะดับสนิท ใช้สำหรับประหยัดพลังงานหรือทำให้จอแสดงผลกระพริบ
   - ในการทำงานปกติ ต้องต่อขานี้ไว้ที่ **+5V (Logic 1)**
3. **$LE$ หรือ $\\overline{EL}$ (Latch Enable - ขา 5)**:
   - เมื่อเป็น **0** จอจะแสดงผลตามอินพุต $A, B, C, D$ ในขณะนั้นทันที (Transparent)
   - เมื่อเป็น **1** ไอซีจะล็อก (Latch) ค่าตัวเลขเดิมค้างไว้ แม้อินพุต $A, B, C, D$ จะเปลี่ยนไป จอก็จะไม่เปลี่ยน
4. **พฤติกรรมเมื่ออินพุตเกินเลขฐานสิบ ($10-15$ หรือ $1010-1111$)**:
   - ไอซี CD4511 จะ **ดับจอภาพทั้งหมด (Blanking)** โดยอัตโนมัติ เพราะ BCD มีรหัสที่ถูกต้องเพียง $0-9$ เท่านั้น ค่าตั้งแต่ 10-15 จึงถือเป็น Don't Care`,
        examTip: 'จำฟังก์ชัน 3 ขาควบคุมให้แม่น: LT = เช็คหลอดติดครบไหม, BI = ดับจอ, LE = ล็อกตัวเลขค้างไว้!'
      },
      {
        title: '3. ปรากฏการณ์ Static-1 Hazard และการขจัดสัญญาณกวน (Glitch)',
        content: `**Static-1 Hazard** คือปรากฏการณ์ที่ตามทฤษฎีเอาต์พุตควรคงที่อยู่ที่ลอจิก 1 ตลอดเวลา แต่ในวงจรฮาร์ดแวร์จริงกลับเกิด **พัลส์ลอจิก 0 ตกวูบชั่วขณะ (Glitch Pulse)**
- **สาเหตุ**: เกิดจาก **ความล่าช้าในการแพร่กระจายสัญญาณ (Propagation Delay $t_{pd}$)** ของ NOT Gate
- **ตัวอย่างวงจร**: $Y = AB + \\bar{A}C$ เมื่อ $B=C=1$ และ $A$ เปลี่ยนจาก $1 \\to 0$:
  - เทอม $AB$ ดับเป็น 0 ทันที
  - เทอม $\\bar{A}C$ ต้องรอ Inverter ทำงาน $t_{pd}$ (เช่น 10ns) จึงจะติดขึ้นมาเป็น 1
  - ในช่วงเวลา 10ns นั้น ทั้งสองเทอมดับพร้อมกัน ส่งผลให้เอาต์พุต $Y$ ตกเป็น 0 ชั่วคราว!
- **วิธีแก้ไข**: เพิ่มเทอม **Consensus Term ($BC$)** เข้าไปในวงจร $Y = AB + \\bar{A}C + BC$ เมื่อ $B=C=1$ เทอม $BC$ จะจ่ายลอจิก 1 หล่อเลี้ยงเอาต์พุตไว้ตลอดเวลา ทำให้ Glitch หายไป 100%!`,
        formulas: [
          { label: 'วงจรแก้ Static-1 Hazard ด้วย Consensus Term', formula: 'Y = AB + \\bar{A}C + BC', note: 'เทอม BC วงคร่อมระหว่าง 2 กลุ่มใน K-Map เพื่อป้องกัน Glitch' }
        ]
      },
      {
        title: '4. วงจรจัดหมู่ขนาดใหญ่ (Shannon Expansion MUX, Decoder Cascading & Magnitude Comparator)',
        content: `ในสไลด์ ดร. ปวีณ มีหัวข้อการสังเคราะห์และขยายขนาดวงจรเชิงจัดหมู่ที่สำคัญ 3 วงจร:

1. **Shannon\'s Expansion Theorem สำหรับการออกแบบด้วย Multiplexer (MUX):**
   - ทุกฟังก์ชันบูลีนสามารถกระจายรอบตัวแปรใดๆ ได้เสมอ:
   $$F(A, B, C) = \\bar{A} \\cdot F(0, B, C) + A \\cdot F(1, B, C)$$
   - **ตัวอย่างการสังเคราะห์ฟังก์ชัน 3 ตัวแปรด้วย 4:1 MUX (สไลด์หน้า 125):**
     กำหนด $F(A,B,C) = \\sum m(1, 3, 4, 6, 7)$ โดยให้ $A, B$ ต่อเข้าขา Select ($S_1=A, S_0=B$):
     - กรณี $AB = 00$ ($m_0, m_1$): $m_0=0, m_1=1 \\implies I_0 = C$
     - กรณี $AB = 01$ ($m_2, m_3$): $m_2=0, m_3=1 \\implies I_1 = C$
     - กรณี $AB = 10$ ($m_4, m_5$): $m_4=1, m_5=0 \\implies I_2 = \\bar{C}$
     - กรณี $AB = 11$ ($m_6, m_7$): $m_6=1, m_7=1 \\implies I_3 = 1$
     - สรุป: นำ $C, C, \\bar{C}, 1$ ป้อนเข้าอินพุต $I_0, I_1, I_2, I_3$ ของ 4:1 MUX ได้วงจรสมบูรณ์โดยไม่ต้องใช้เกตภายนอกเพิ่ม!

2. **สูตรการต่อพ่วงตัวถอดรหัส (Decoder Cascading):**
   - หากต้องการสร้าง $M$-to-$2^M$ Decoder จาก $N$-to-$2^N$ Decoder ($M > N$):
   $$N_{\\text{dec}} = 2^{M - N}$$
   - **ตัวอย่าง:** สร้าง 5-to-32 Decoder จาก 3-to-8 Decoders ($M=5, N=3$):
     ต้องใช้ 3-to-8 Decoders จำนวน $2^{5-3} = 4$ ตัวสำหรับเอาต์พุต และใช้เพิ่มอีก 1 ตัวสำหรับควบคุมขา Enable รวมเป็น **5 ตัว**

3. **วงจรเปรียบเทียบขนาด 4 บิต (4-bit Magnitude Comparator):**
   - ให้ $x_i = A_i B_i + \\bar{A}_i \\bar{B}_i = \\overline{A_i \\oplus B_i}$ (บิตเท่ากัน)
   - **เงื่อนไขเท่ากัน ($A = B$):** $(A=B) = x_3 x_2 x_1 x_0$ (เท่ากันทุกบิต)
   - **เงื่อนไขมากกว่า ($A > B$):** $(A>B) = A_3 \\bar{B}_3 + x_3 A_2 \\bar{B}_2 + x_3 x_2 A_1 \\bar{B}_1 + x_3 x_2 x_1 A_0 \\bar{B}_0$
   - **เงื่อนไขน้อยกว่า ($A < B$):** $(A<B) = \\bar{A}_3 B_3 + x_3 \\bar{A}_2 B_2 + x_3 x_2 \\bar{A}_1 B_1 + x_3 x_2 x_1 \\bar{A}_0 B_0$`,
        formulas: [
          {
            label: 'ทฤษฎีบทการกระจายของแชนนอน (Shannon Expansion)',
            formula: 'F(A, B, C, \\dots) = \\bar{A} \\cdot F(0, B, C, \\dots) + A \\cdot F(1, B, C, \\dots)',
            note: 'หัวใจของการต่อฟังก์ชันบูลีนเข้า Multiplexer'
          },
          {
            label: 'สูตรจำนวนตัวถอดรหัสในการต่อพ่วง (Decoder Cascading)',
            formula: 'N_{\\text{dec}} = 2^{M - N}',
            note: 'M=จำนวนบิตอินพุตเป้าหมาย, N=จำนวนบิตอินพุตของไอซีที่มี'
          },
          {
            label: 'วงจรเปรียบเทียบขนาด 4 บิต (Magnitude Comparator)',
            formula: '(A=B) = \\prod_{i=0}^{3} (A_i \\odot B_i) \\quad , \\quad (A>B) = \\sum_{i=0}^{3} \\left( A_i \\bar{B}_i \\prod_{j=i+1}^{3} x_j \\right)',
            note: 'เปรียบเทียบจากบิตสูงสุด (MSB) ลงมายังบิตต่ำสุด (LSB)'
          }
        ],
        keyPoints: [
          'Shannon Expansion ทำให้สร้างฟังก์ชัน n ตัวแปรด้วย MUX ขนาด 2^(n-1) ต่อ 1 ได้เสมอ',
          'Comparator ตรวจสอบทีละบิตจาก MSB ถ้าบิตสูงตัดสินได้แล้ว บิตต่ำไม่มีผล'
        ],
        examTip: 'ข้อสอบถาม MUX 4:1 ออกแบบฟังก์ชัน 3 ตัวแปร: กำหนดตัวแปร 2 ตัวแรกเป็น Select Lines แล้วเขียนตารางความจริงคู่เพื่อหาค่า I0-I3 เป็น 0, 1, C หรือ C\'!'
      }
    ],
    quickQuiz: [
      {
        id: 'q4-4-1',
        chapterId: 'ch4',
        topic: 'CD4511 Control Pins',
        question: 'ในการทดลองแล็บที่ 9 หากต้องการทดสอบว่าหลอด LED ของ 7-Segment ทุกเซกเมนต์ (a-g) ยังทำงานปกติไม่ขาด ต้องควบคุมขาใดของไอซี CD4511?',
        options: [
          'จ่ายลอจิก 0 เข้าที่ขา LT (Lamp Test)',
          'จ่ายลอจิก 1 เข้าที่ขา BI (Blanking Input)',
          'จ่ายลอจิก 1 เข้าที่ขา LE (Latch Enable)',
          'จ่ายอินพุต ABCD เป็น 1111'
        ],
        correctAnswer: 0,
        difficulty: 'ปานกลาง',
        explanation: 'ขา LT (Lamp Test) เป็น Active LOW เมื่อจ่าย 0 หลอดไฟทุกเซกเมนต์จะสว่างพร้อมกันทั้งหมดเพื่อทดสอบหลอด'
      },
      {
        id: 'q4-4-2',
        chapterId: 'ch4',
        topic: 'Decoder Cascading',
        question: 'หากต้องการสร้างตัวถอดรหัสขนาด 4-to-16 Decoder โดยใช้ตัวถอดรหัสขนาด 2-to-4 Decoder (ที่มีขา Enable) ต้องใช้ไอซี 2-to-4 Decoder ทั้งหมดกี่ตัว?',
        options: ['4 ตัว', '5 ตัว', '6 ตัว', '8 ตัว'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'สำหรับเอาต์พุต 16 ช่อง ต้องใช้ 2-to-4 จำนวน 2^(4-2) = 4 ตัว และต้องใช้ 2-to-4 อีก 1 ตัวทำหน้าที่ถอดรหัส 2 บิตบนเพื่อไป Enable ไอซี 4 ตัวล่าง รวมเป็น 4 + 1 = 5 ตัว'
      }
    ]
  },

  // ==========================================
  // CHAPTER 5: Sequential Circuits & FSM
  // ==========================================
  {
    id: 'ch5-1',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuits & FSM (วงจรเชิงลำดับ)',
    title: 'ความแตกต่าง Combinational vs Sequential, SR Latch & พารามิเตอร์เวลา (Setup/Hold Time & f_max)',
    subtitle: 'โครงสร้างวงจรป้อนกลับไขว้ (Cross-Coupled Latch), ภาวะห้ามเกิด, Metastability และสูตรคำนวณความถี่สัญญาณนาฬิกาสูงสุด',
    durationMinutes: 20,
    difficulty: 'พื้นฐาน',
    slideRef: '05_sequential.pdf (สไลด์หน้า 2-25)',
    summary: 'วงจรเชิงลำดับมีหน่วยความจำและสายป้อนกลับ ทำให้เอาต์พุตขึ้นอยู่กับทั้งอินพุตปัจจุบันและสถานะในอดีต โดย SR Latch เป็นหน่วยความจำบิตพื้นฐาน พร้อมสูตรคำนวณ Setup Time, Hold Time และ f_max ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. เปรียบเทียบ Combinational vs Sequential Circuits',
        content: `| คุณสมบัติ | วงจรเชิงจัดหมู่ (Combinational) | วงจรเชิงลำดับ (Sequential) |
|---|---|---|
| **พึ่งพาเวลา/อดีต** | ขึ้นกับอินพุต **ณ ปัจจุบันเท่านั้น** | ขึ้นกับ **อินพุตปัจจุบัน + สถานะในอดีต** |
| **หน่วยความจำ** | **ไม่มี** (No Memory) | **มี** (Latches / Flip-Flops) |
| **สายสัญญาณป้อนกลับ** | **ไม่มี** (No Feedback) | **มี** (Feedback Loop จากเอาต์พุตกลับมาอินพุต) |
| **สัญญาณนาฬิกา (Clock)**| ส่วนใหญ่ไม่มี | มักใช้ Clock ซิงโครไนซ์การทำงาน |
| **ตัวอย่างวงจร** | Adder, MUX, Decoder, K-Map | Counter, Shift Register, RAM, CPU FSM |`,
        keyPoints: [
          'วงจรเชิงลำดับสามารถ "จำ" ค่าได้ เพราะมีสาย Feedback ป้อนเอาต์พุตกลับเข้ามาเป็นอินพุต',
          'แบ่งเป็น Asynchronous (ทำงานตามเหตุการณ์) และ Synchronous (ทำงานตามจังหวะ Clock)'
        ]
      },
      {
        title: '2. วงจรแลตช์พื้นฐาน (SR Latch) และภาวะห้ามเกิด (Forbidden State)',
        content: `**NOR SR Latch (Active HIGH):**
ต่อจาก NOR Gate 2 ตัวไขว้กัน:

![โครงสร้างวงจร SR Latch แบบ NOR ป้อนกลับไขว้](diagram:sr-latch)

| $S$ (Set) | $R$ (Reset) | $Q_{next}$ | $\\bar{Q}_{next}$ | สถานะการทำงาน |
|:---:|:---:|:---:|:---:|---|
| 0 | 0 | $Q$ | $\\bar{Q}$ | **คงค่าเดิม (Hold Memory)** |
| 0 | 1 | 0 | 1 | **รีเซ็ต (Reset)** ล้างค่าเป็น 0 |
| 1 | 0 | 1 | 0 | **เซ็ต (Set)** จำค่าเป็น 1 |
| 1 | 1 | 0 | 0 | ⚠️ **ภาวะห้ามเกิด (FORBIDDEN / INVALID!)** |

**ทำไมสถานะ 1-1 จึงเป็นภาวะห้ามเกิด?**
1. ทำให้เอาต์พุต $Q = \\bar{Q} = 0$ ซึ่ง **ขัดแย้งกับหลักการคู่สมมูล** ที่เอาต์พุตทั้งสองต้องมีค่าตรงกันข้ามเสมอ
2. เมื่อสลับอินพุตจาก $1-1$ กลับมาเป็น $0-0$ พร้อมกัน เกตทั้งสองจะแข่งความเร็วกัน (Race Condition) ทำให้เอาต์พุตแกว่งสับสน (Metastability) คาดเดาสถานะสุดท้ายไม่ได้!`,
        formulas: [
          { label: 'NOR SR Latch Characteristic', formula: 'Q_{\\text{next}} = S + \\bar{R}Q \\quad (\\text{โดยมีเงื่อนไข } S \\cdot R = 0)', note: 'ห้ามป้อน S=1 และ R=1 พร้อมกัน' }
        ],
        examTip: 'สำหรับ NOR Latch สภาวะห้ามเกิดคือ S=1, R=1 แต่สำหรับ NAND Latch สภาวะห้ามเกิดคือ S=0, R=0 (Active LOW) จำให้แม่นอย่าสับสน!'
      },
      {
        title: '3. พารามิเตอร์เวลาแบบไดนามิก (Setup Time, Hold Time & ความถี่สูงสุด f_max)',
        content: `ในระบบดิจิทัลซิงโครนัส ข้อมูลไม่สามารถเปลี่ยนได้ทันทีทันใด แต่ต้องเป็นไปตามเกณฑ์เวลา (Timing Constraints) 3 ประการ:

1. **Setup Time ($t_{\\text{setup}}$)**:
   - คือช่วงเวลาขั้นต่ำที่สัญญาณอินพุต (Data) **ต้องนิ่งคงที่ก่อนที่ขอบสัญญาณนาฬิกา (Clock Edge) จะมาถึง**
2. **Hold Time ($t_{\\text{hold}}$)**:
   - คือช่วงเวลาขั้นต่ำที่สัญญาณอินพุต (Data) **ต้องรักษาสถานะนิ่งคงที่ไว้ต่อเนื่องหลังจากขอบสัญญาณนาฬิกาผ่านไปแล้ว**
   - *หากฝ่าฝืนเกณฑ์ Setup หรือ Hold Time ฟลิปฟลอปจะเข้าสู่สภาวะ Metastable (สถานะกึ่งกลางระหว่าง 0 กับ 1) ทำให้ระบบล่มทันที!*

3. **สูตรคำนวณคาบเวลาขั้นต่ำ ($T_{\\text{clk}, \\min}$) และความถี่สูงสุด ($f_{\\max}$):**
   $$T_{\\text{clk}} \\ge t_{pd, \\text{FF}} + t_{pd, \\text{comb}} + t_{\\text{setup}}$$
   $$f_{\\max} = \\frac{1}{T_{\\text{clk}, \\min}} = \\frac{1}{t_{pd, \\text{FF}} + t_{pd, \\text{comb}} + t_{\\text{setup}}}$$
   *(เมื่อ $t_{pd, \\text{FF}}$ คือ propagation delay ของ Flip-Flop, $t_{pd, \\text{comb}}$ คือความล่าช้าของวงจรจัดหมู่ระหว่างฟลิปฟลอป)*

**ตัวอย่างโจทย์คำนวณข้อสอบจริง:**
- กำหนดให้ Flip-Flop มี $t_{pd, \\text{FF}} = 5\\text{ ns}$, Setup time $t_{\\text{setup}} = 3\\text{ ns}$
- วงจร Logic ระหว่างฟลิปฟลอปมีความล่าช้ารวม $t_{pd, \\text{comb}} = 12\\text{ ns}$
- **คำนวณคาบเวลาขั้นต่ำ:**
  $$T_{\\text{clk}, \\min} = 5\\text{ ns} + 12\\text{ ns} + 3\\text{ ns} = 20\\text{ ns}$$
- **คำนวณความถี่สัญญาณนาฬิกาสูงสุด:**
  $$f_{\\max} = \\frac{1}{20\\text{ ns}} = \\frac{1}{20 \\times 10^{-9}\\text{ s}} = 50\\text{ MHz}$$`,
        formulas: [
          {
            label: 'คาบเวลาสัญญาณนาฬิกาขั้นต่ำ (Minimum Clock Period)',
            formula: 'T_{\\text{clk}, \\min} = t_{pd, \\text{FF}} + t_{pd, \\text{comb}} + t_{\\text{setup}}',
            note: 'ผลรวมของ Delay ฟลิปฟลอป + Delay วงจรจัดหมู่ + เวลา Setup'
          },
          {
            label: 'ความถี่สัญญาณนาฬิกาสูงสุด (Maximum Clock Frequency)',
            formula: 'f_{\\max} = \\frac{1}{T_{\\text{clk}, \\min}} = \\frac{1}{t_{pd, \\text{FF}} + t_{pd, \\text{comb}} + t_{\\text{setup}}}',
            note: 'ความถี่ที่วงจรทำงานได้อย่างถูกต้องโดยไม่ละเมิดเกณฑ์เวลา'
          }
        ],
        keyPoints: [
          'Setup Time เกิดขึ้นก่อนขอบ Clock, Hold Time เกิดขึ้นหลังขอบ Clock',
          'ความถี่สูงสุดขึ้นอยู่กับเส้นทางวิกฤต (Critical Path Delay) รวมกับ Setup Time'
        ],
        examTip: 'ข้อสอบถาม f_max: จำสูตร คาบเวลา T = t_pd(FF) + t_comb + t_setup เสมอ! Hold time ไม่ได้นำมาบวกในสูตร f_max (Hold time ใช้เช็ค Clock Skew เท่านั้น)!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-1-1',
        chapterId: 'ch5',
        topic: 'SR Latch Forbidden State',
        question: 'ในวงจร SR Latch ที่สร้างจาก NOR Gate หากป้อนอินพุต S = 1 และ R = 1 จะส่งผลอย่างไรต่อวงจร?',
        options: [
          'เอาต์พุตคงค่าเดิมที่จำไว้ในอดีต (Hold)',
          'เอาต์พุต Q และ Q̄ จะกลายเป็น 0 พร้อมกัน ซึ่งผิดหลักการและเป็นภาวะห้ามเกิด',
          'เอาต์พุต Q จะกลายเป็น 1 และ Q̄ จะกลายเป็น 0',
          'วงจรจะสลับค่า Q ระหว่าง 0 และ 1 อย่างต่อเนื่องด้วยความถี่สูง'
        ],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'สำหรับ NOR Latch อินพุต 1-1 จะบังคับให้เอาต์พุตของ NOR ทั้งสองตัวเป็น 0 พร้อมกัน (Q=0, Q\'=0) ซึ่งขัดกับหลักการคู่ตรงข้าม'
      },
      {
        id: 'q5-1-2',
        chapterId: 'ch5',
        topic: 'Maximum Clock Frequency Calculation',
        question: 'วงจรเชิงลำดับมี t_pd(FF) = 4 ns, วงจร Combinational มี delay รวม 11 ns และ Flip-Flop มี t_setup = 5 ns ความถี่สัญญาณนาฬิกาสูงสุด (f_max) ที่วงจรนี้ทำงานได้อย่างปลอดภัยคือเท่าใด?',
        options: ['25 MHz', '50 MHz', '100 MHz', '200 MHz'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'คาบเวลาขั้นต่ำ T_min = t_pd(FF) + t_comb + t_setup = 4 + 11 + 5 = 20 ns. ความถี่สูงสุด f_max = 1 / 20 ns = 50 MHz'
      }
    ]
  },
  {
    id: 'ch5-2',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuits & FSM (วงจรเชิงลำดับ)',
    title: 'ฟลิปฟลอป (Flip-Flops: SR, D, JK, T), ตารางกระตุ้น (Excitation Table) & ขั้นตอนการออกแบบ FSM',
    subtitle: 'การทำงานของ Edge-Triggered FF, ตาราง Excitation ครบทั้ง 4 ชนิด, การแปลงไอซี และกระบวนการออกแบบ 5 ขั้นตอน',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '05_sequential.pdf (สไลด์หน้า 26-65)',
    summary: 'ฟลิปฟลอปเป็นหน่วยความจำที่เปลี่ยนค่าตามจังหวะขอบของ Clock พร้อมตาราง Excitation Table ครบทั้ง SR, JK, D, T ที่ใช้สังเคราะห์วงจรนับและ FSM ตามกระบวนการออกแบบ 5 ขั้นตอนในสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. ตารางเปรียบเทียบฟลิปฟลอปทั้ง 4 ชนิด (D, T, JK, SR) และสมการคุณลักษณะ',
        content: `ฟลิปฟลอปต่างจากแลตช์ตรงที่ **ทำงานตามขอบของสัญญาณนาฬิกา (Edge-Triggered)** เช่น ขอบขาขึ้น (Rising Edge $\\uparrow$) หรือขอบขาลง (Falling Edge $\\downarrow$):

![วงจรภายในและการทำงานของ JK Flip-Flop](diagram:jk-flipflop)

| ชนิด | อินพุต | สมการสถานะถัดไป (Characteristic Eq.) | การทำงานสำคัญ |
|---|---|---|---|
| **D-FF** | $D$ | $Q_{\\text{next}} = D$ | ถ่ายโอนข้อมูลอินพุต $D$ ไปยัง $Q$ เมื่อมี Clock (ใช้ทำ Register) |
| **T-FF** | $T$ | $Q_{\\text{next}} = T \\oplus Q = T\\bar{Q} + \\bar{T}Q$ | เมื่อ $T=1$ จะ **Toggle (พลิกกลับค่า $Q$)** (ใช้ทำ Counter) |
| **JK-FF**| $J, K$| $Q_{\\text{next}} = J\\bar{Q} + \\bar{K}Q$ | $J=K=0 \\implies$ Hold, $J=1, K=0 \\implies$ Set, $J=0, K=1 \\implies$ Reset, **$J=K=1 \\implies$ Toggle!** |
| **SR-FF**| $S, R$| $Q_{\\text{next}} = S + \\bar{R}Q$ ($SR = 0$) | ห้าม $S=1, R=1$ |`,
        formulas: [
          { label: 'D Flip-Flop Characteristic', formula: 'Q_{next} = D', note: 'ค่าเอาต์พุตถัดไปเท่ากับอินพุต D เสมอ' },
          { label: 'T Flip-Flop Characteristic', formula: 'Q_{next} = T \\oplus Q = T\\bar{Q} + \\bar{T}Q', note: 'ถ้า T=0 คงค่าเดิม, ถ้า T=1 สลับค่า (Toggle)' },
          { label: 'JK Flip-Flop Characteristic', formula: 'Q_{next} = J\\bar{Q} + \\bar{K}Q', note: 'สมการครอบจักรวาล แก้ปัญหาภาวะห้ามเกิดของ SR' },
          { label: 'SR Flip-Flop Characteristic', formula: 'Q_{next} = S + \\bar{R}Q \\quad (S \\cdot R = 0)', note: 'ห้ามป้อน 1 พร้อมกัน' }
        ],
        keyPoints: [
          'JK-FF พัฒนาขึ้นมาเพื่อแก้จุดบกพร่องของ SR-FF โดยเมื่อ J=1, K=1 จะกลายเป็นการ Toggle ไม่เกิดภาวะห้ามเกิด',
          'T-FF สามารถสร้างได้ง่ายๆ โดยนำขา J และ K ของ JK-FF มาต่อรวบเข้าด้วยกัน'
        ]
      },
      {
        title: '2. ปัญหา Race-Around ใน JK-FF และขาควบคุม Asynchronous Preset / Clear',
        content: `**ปัญหา Race-Around Condition ใน JK Flip-Flop:**
- เกิดขึ้นเมื่อใช้ JK-FF แบบ **Level-Triggered (ทำงานตามระดับแรงดัน HIGH)** เมื่อ $J=1, K=1$
- หากความกว้างของพัลส์นาฬิกา ($t_w$) **ยาวนานกว่าความล่าช้าของเกต ($t_{pd}$)** เอาต์พุตจะพลิกกลับไปกลับมาซ้ำๆ หลายรอบระหว่างที่ Clock ยังเป็น 1 ทำให้เมื่อ Clock ตกเป็น 0 ไม่สามารถคาดเดาค่าสุดท้ายได้
- **วิธีแก้ไข**: ใช้โครงสร้าง **Master-Slave JK Flip-Flop** หรือใช้วงจร **Edge-Triggered** ที่จับสัญญาณเฉพาะช่วงเสี้ยววินาทีของการเปลี่ยนระดับแรงดันเท่านั้น

**ขาควบคุม Asynchronous Inputs (PRESET / CLEAR) (ใบงานที่ 10):**
- **$\\overline{PRE}$ (Preset)**: สั่งให้ $Q = 1$ ทันที
- **$\\overline{CLR}$ (Clear)**: สั่งให้ $Q = 0$ ทันที
- เป็นสัญญาณแบบ **Asynchronous (ไม่สนใจ Clock)** มีอำนาจสูงสุด (Highest Priority) เหนือสัญญาณ Clock ใดๆ ทั้งสิ้น มักเป็นแบบ Active-LOW (ทำงานเมื่อป้อน 0)`,
        examTip: 'ถ้าในโจทย์มีขา PRESET หรือ CLEAR เป็น 0 ให้ตอบค่า Q ตามขานั้นทันที ไม่ต้องไปดู Clock หรือขา D/JK ให้เสียเวลา!'
      },
      {
        title: '3. ตารางกระตุ้น (Excitation Table) และกระบวนการออกแบบ 5 ขั้นตอน (FSM Design)',
        content: `ในการออกแบบวงจรนับหรือ FSM เราทราบสถานะปัจจุบัน ($Q$) และสถานะถัดไปที่ต้องการ ($Q_{next}$) แล้วต้องการย้อนหาว่าต้องป้อนอินพุตอะไรให้กับฟลิปฟลอป ซึ่งทำได้โดยใช้ **Excitation Table (ตารางกระตุ้น)**:

**ตารางกระตุ้นครบทั้ง 4 ชนิด (Excitation Table - ข้อสอบออกทุกปี!):**

| การเปลี่ยนสถานะ ($Q \\to Q_{next}$) | SR Flip-Flop ($S, R$) | JK Flip-Flop ($J, K$) | D Flip-Flop ($D$) | T Flip-Flop ($T$) |
|:---:|:---:|:---:|:---:|:---:|
| **$0 \\to 0$** (คงค่า 0) | $S = 0, R = X$ | **$J = 0, K = X$** | **$D = 0$** | **$T = 0$** |
| **$0 \\to 1$** (เซ็ตเป็น 1) | $S = 1, R = 0$ | **$J = 1, K = X$** | **$D = 1$** | **$T = 1$** |
| **$1 \\to 0$** (รีเซ็ตเป็น 0) | $S = 0, R = 1$ | **$J = X, K = 1$** | **$D = 0$** | **$T = 1$** |
| **$1 \\to 1$** (คงค่า 1) | $S = X, R = 0$ | **$J = X, K = 0$** | **$D = 1$** | **$T = 0$** |

**สูตรสมการ Excitation:**
- **D-FF**: $D = Q_{next}$ (ง่ายที่สุด!)
- **T-FF**: $T = Q \\oplus Q_{next}$ (เป็น 1 เฉพาะเมื่อมีการสลับค่า)
- **JK-FF**: ท่องจำ: 0->0 ได้ 0X, 0->1 ได้ 1X, 1->0 ได้ X1, 1->1 ได้ X0

**กระบวนการออกแบบวงจรเชิงลำดับ 5 ขั้นตอน (5-Step Sequential Design Procedure):**
1. **สร้างผังสถานะ (State Diagram)**: กำหนดสถานะและลูกศรเงื่อนไขการเปลี่ยนสถานะ
2. **สร้างตารางสถานะและกำหนดรหัสบิต (State Table & State Assignment)**: ใช้ฟลิปฟลอป $k$ ตัว โดย $2^k \\ge N$ (จำนวนสถานะ)
3. **เปิดตาราง Excitation Table**: เขียนคอลัมน์อินพุตของฟลิปฟลอปแต่ละตัวตามการเปลี่ยนผ่าน $Q \\to Q_{next}$
4. **ลดรูปสมการด้วย K-Map**: นำคอลัมน์อินพุตของแต่ละฟลิปฟลอปไปลง K-Map เพื่อหาสมการลอจิกอย่างง่ายที่สุด
5. **เขียนผังวงจรลอจิก (Logic Circuit Schematic)**: ต่ออินพุตเข้ากับขาเกตและฟลิปฟลอปจริง`,
        formulas: [
          {
            label: 'สมการตารางกระตุ้น T Flip-Flop',
            formula: 'T = Q \\oplus Q_{next}',
            note: 'เมื่อสถานะเดิมกับสถานะใหม่ต่างกัน T ต้องเป็น 1'
          },
          {
            label: 'สมการตารางกระตุ้น D Flip-Flop',
            formula: 'D = Q_{next}',
            note: 'อินพุต D ต้องป้อนตามสถานะถัดไปที่ต้องการโดยตรง'
          },
          {
            label: 'ตารางกระตุ้น JK Flip-Flop',
            formula: '0 \\to 0: (0, X) \\quad , \\quad 0 \\to 1: (1, X) \\quad , \\quad 1 \\to 0: (X, 1) \\quad , \\quad 1 \\to 1: (X, 0)',
            note: 'มี Don\'t Care (X) ช่วยให้ลดรูปสมการใน K-Map ได้ง่ายที่สุด'
          }
        ],
        keyPoints: [
          'D-FF ใช้ออกแบบง่ายที่สุดเพราะ D = Q_next',
          'JK-FF ลดรูปวงจรได้กระชับที่สุดเพราะมี Don\'t Care (X) ในตารางกระตุ้นถึง 50%'
        ],
        examTip: 'สูตรจำ Excitation JK: คอลัมน์ J จะเป็น [0, 1, X, X] คอลัมน์ K จะเป็น [X, X, 1, 0] ท่องลำดับนี้ไปเขียนตารางในห้องสอบได้ทันที!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-2-1',
        chapterId: 'ch5',
        topic: 'JK Flip-Flop Toggle',
        question: 'กำหนดให้ JK Flip-Flop มีสถานะเริ่มต้น Q = 0 หากป้อนอินพุต J = 1, K = 1 และจ่ายสัญญาณ Clock เข้ามา 3 พัลส์ สถานะสุดท้ายของ Q จะเป็นเท่าใด?',
        options: ['Q = 0', 'Q = 1', 'เกิดภาวะห้ามเกิด', 'ไม่แน่นอน'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'เมื่อ J=K=1 ฟลิปฟลอปจะ Toggle ทุกพัลส์: เริ่มต้น 0 -> พัลส์ 1 ได้ 1 -> พัลส์ 2 ได้ 0 -> พัลส์ 3 ได้ 1'
      },
      {
        id: 'q5-2-2',
        chapterId: 'ch5',
        topic: 'Flip-Flop Excitation Table',
        question: 'ในการออกแบบวงจรนับ หากต้องการให้ JK Flip-Flop เปลี่ยนสถานะจาก Q = 1 ไปเป็น Q_next = 0 ต้องป้อนอินพุต J และ K ตามข้อใด?',
        options: ['J = 0, K = 1', 'J = 1, K = 0', 'J = X, K = 1', 'J = 1, K = X'],
        correctAnswer: 2,
        difficulty: 'ปานกลาง',
        explanation: 'การเปลี่ยนจาก 1 -> 0 สามารถทำได้ทั้งการ Reset (J=0, K=1) หรือการ Toggle (J=1, K=1) ดังนั้น K ต้องเป็น 1 แน่นอน ส่วน J จะเป็น 0 หรือ 1 ก็ได้ จึงสรุปได้ว่า J = X, K = 1'
      }
    ]
  },
  {
    id: 'ch5-3',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuits & FSM (วงจรเชิงลำดับ)',
    title: 'รีจิสเตอร์และการเลื่อนข้อมูล (Registers & Shift Registers - ใบงานที่ 10)',
    subtitle: 'การทำงานของ 6-bit SIPO Shift Register, SISO, PIPO, PISO และ Ring / Johnson Counters',
    durationMinutes: 20,
    difficulty: 'ปานกลาง',
    slideRef: '05_sequential.pdf (สไลด์หน้า 66-95)',
    summary: 'Shift Register ใช้สำหรับจัดเก็บและแปลงรูปแบบข้อมูลระหว่างอนุกรมและขนาน พร้อมสูตรคำนวณจำนวนรอบสัญญาณนาฬิกาในการถ่ายโอนข้อมูล และการทำงานของ Ring Counter vs Johnson Counter ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. รูปแบบการทำงานของ Shift Registers ทั้ง 4 โหมด & จำนวนรอบ Clock',
        content: `การเคลื่อนย้ายข้อมูลในรีจิสเตอร์ขนาด $n$ บิต มี 4 โครงสร้างหลัก:

| รูปแบบการทำงาน | ความหมาย | จำนวนรอบ Clock ในการเขียนเข้า (Write) | จำนวนรอบ Clock ในการอ่านออก (Read) |
|---|---|:---:|:---:|
| **SISO** (Serial-In Serial-Out) | เข้าอนุกรม - ออกอนุกรม | $n$ รอบ | $n-1$ รอบ (ใช้ทำหน่วงเวลา) |
| **SIPO** (Serial-In Parallel-Out) | เข้าอนุกรม - ออกขนาน (แล็บ 10) | $n$ รอบ | **0 รอบ** (อ่านได้ทันทีพร้อมกัน) |
| **PISO** (Parallel-In Serial-Out) | เข้าขนาน - ออกอนุกรม | **1 รอบ** (โหลดพร้อมกัน) | $n-1$ รอบ (ทยอยเลื่อนออก) |
| **PIPO** (Parallel-In Parallel-Out) | เข้าขนาน - ออกขนาน | **1 รอบ** | **0 รอบ** (เร็วที่สุด! 1 รอบเสร็จ) |

- **SIPO (หัวใจของแล็บ 10)**: ใช้ขยายขาพอร์ตไมโครคอนโทรลเลอร์ ป้อนข้อมูลเข้าสายเดียว $n$ บิต เมื่อครบ $n$ จังหวะ สามารถอ่านค่าออกพร้อมกันได้ทุกขา
- **PIPO**: ใช้เป็น Buffer Register ภายในหน่วยประมวลผลกลาง (CPU Registers)`,
        formulas: [
          { label: 'SISO คาบเวลารวมในการส่งผ่านข้อมูล', formula: 'T_{\\text{SISO}} = (2n - 1) \\times T_{\\text{clk}}', note: 'ป้อนเข้า n รอบ และอ่านออก n-1 รอบ' },
          { label: 'SIPO เวลาในการรับข้อมูลสมบูรณ์', formula: 'T_{\\text{SIPO}} = n \\times T_{\\text{clk}}', note: 'เมื่อครบ n พัลส์ ข้อมูลพร้อมอ่านออกขนานทันที' },
          { label: 'PIPO เวลาในการส่งผ่านข้อมูล', formula: 'T_{\\text{PIPO}} = 1 \\times T_{\\text{clk}}', note: 'โหลดเข้าและอ่านออกพร้อมกันใน 1 จังหวะนาฬิกา' }
        ],
        keyPoints: [
          'SIPO นิยมใช้ขยายขาเอาต์พุตของไมโครคอนโทรลเลอร์ (ใช้สายส่งเพียง 2-3 เส้น แต่ควบคุมไฟ LED ได้หลายสิบดวง)',
          'PISO นิยมใช้แปลงข้อมูลบัสภายในเมนบอร์ดเพื่อส่งออกสายสัญญาณระยะไกล',
          'PIPO เป็นโครงสร้างที่เร็วที่สุด ใช้เวลาเพียง 1 Clock'
        ]
      },
      {
        title: '2. การวิเคราะห์วงจร 6-bit SIPO Shift Register (ใบงานที่ 10)',
        content: `ในใบงานที่ 10 นักศึกษาต่อวงจร 6-bit SIPO ด้วย D-Flip-Flop จำนวน 6 ตัว ($FF_0 - FF_5$):
- ขา Data In ต่อเข้าช่อง $D$ ของ $FF_0$
- ขาเอาต์พุต $Q_0$ ต่อเข้าช่อง $D$ ของ $FF_1$, $Q_1$ ต่อเข้า $FF_2$ ต่อเนื่องกันไปจนถึง $FF_5$
- ทุกตัวต่อสัญญาณ **Clock และ Reset (CLR) ร่วมกันแบบขนาน (Common Synchronous Clock)**

**ตัวอย่างการเลื่อนบิตเมื่อป้อนข้อมูลลำดับ 1, 0, 1:**
- เริ่มต้น (Clear): $Q = [0, 0, 0, 0, 0, 0]$
- จังหวะที่ 1 (ป้อน 1): $Q = [1, 0, 0, 0, 0, 0]$
- จังหวะที่ 2 (ป้อน 0): บิต 1 เดิมเลื่อนไป $Q_1$, บิต 0 ใหม่อยู่ที่ $Q_0 \\implies Q = [0, 1, 0, 0, 0, 0]$
- จังหวะที่ 3 (ป้อน 1): $Q = [1, 0, 1, 0, 0, 0]$`,
        examTip: 'ข้อสอบถามลำดับบิตใน Shift Register: บิตที่ป้อนเข้ามาก่อนเพื่อนจะถูกดันไปอยู่ที่หลักสูงสุด (MSB ทางขวา) เสมอ!'
      },
      {
        title: '3. วงจรนับแบบเลื่อนบิต: Ring Counter vs Johnson Counter (Twisted Ring)',
        content: `Shift Register สามารถนำเอาต์พุตตัวสุดท้ายป้อนกลับมาที่อินพุตตัวแรกเพื่อสร้างเป็นวงจรนับแบบวงแหวนได้ 2 แบบ:

1. **Ring Counter (วงแหวนตรง):**
   - นำเอาต์พุต $Q_n$ ป้อนกลับเข้าอินพุต $D_0$ โดยตรง
   - วงจรขนาด $n$ บิตจะมี **จำนวนสถานะเท่ากับ $n$ สถานะ (MOD-$n$)**
   - ตัวอย่าง 4 บิต: $1000 \\to 0100 \\to 0010 \\to 0001 \\to 1000 \\dots$
   - ความถี่เอาต์พุต: $f_{\\text{out}} = \\frac{f_{\\text{in}}}{n}$
   - ข้อดี: แต่ละสถานะมีบิต 1 เพียงบิตเดียว สามารถนำเอาต์พุตไปขับโหลดได้ทันทีโดยไม่ต้องผ่านวงจร Decoder

2. **Johnson Counter / Twisted Ring Counter (วงแหวนกลับเฟส):**
   - นำเอาต์พุตกลับค่า $\\bar{Q}_n$ ป้อนกลับเข้าอินพุต $D_0$
   - วงจรขนาด $n$ บิตจะมี **จำนวนสถานะเท่ากับ $2n$ สถานะ (MOD-$2n$)** (ได้สถานะมากกว่า Ring Counter ถึง 2 เท่า!)
   - ตัวอย่าง 4 บิต (8 สถานะ):
     $0000 \\to 1000 \\to 1100 \\to 1110 \\to 1111 \\to 0111 \\to 0011 \\to 0001 \\to 0000$
   - ความถี่เอาต์พุต: $f_{\\text{out}} = \\frac{f_{\\text{in}}}{2n}$
   - ถอดรหัสแต่ละสถานะได้ง่ายมากโดยใช้ 2-Input AND Gate เพียงตัวเดียว`,
        formulas: [
          { label: 'จำนวนสถานะและความถี่ของ Ring Counter', formula: 'N_{\\text{states}} = n \\quad , \\quad f_{\\text{out}} = \\frac{f_{\\text{in}}}{n}', note: 'ใช้ FF n ตัว ได้ n สถานะ' },
          { label: 'จำนวนสถานะและความถี่ของ Johnson Counter', formula: 'N_{\\text{states}} = 2n \\quad , \\quad f_{\\text{out}} = \\frac{f_{\\text{in}}}{2n}', note: 'ใช้ FF n ตัว ได้ 2n สถานะ (ป้อนกลับด้วย Q-bar)' }
        ],
        keyPoints: [
          'Ring Counter ใช้วนลูป 1 ตัววิ่งวน มี n สถานะ',
          'Johnson Counter ป้อนกลับด้วย Q-bar ทำให้ได้ 2n สถานะ ประหยัดฟลิปฟลอปกว่า'
        ],
        examTip: 'ข้อสอบถามเปรียบเทียบ: ใช้ Flip-Flop 4 ตัว Ring Counter นับได้ 4 สถานะ แต่ Johnson Counter นับได้ถึง 8 สถานะ!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-3-1',
        chapterId: 'ch5',
        topic: 'SIPO Shift Operation',
        question: 'Shift Register ขนาด 4 บิต (เริ่มต้น 0000) หากป้อนข้อมูลอนุกรมตามลำดับ 1, 1, 0 ผ่านมา 3 สัญญาณ Clock ค่าในรีจิสเตอร์ (Q3 Q2 Q1 Q0) จะเป็นเท่าใด?',
        options: ['1100', '0110', '0011', '1010'],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'บิตแรกคือ 1 เข้ามา -> [0001], บิตสองคือ 1 -> [0011], บิตสามคือ 0 -> [0110] (บิตแรกที่เข้ามาก่อนจะเคลื่อนไปอยู่ที่ Q2 และ Q1)'
      },
      {
        id: 'q5-3-2',
        chapterId: 'ch5',
        topic: 'Johnson Counter Modulus',
        question: 'วงจร Johnson Counter สร้างจาก Flip-Flop จำนวน 5 ตัว จะมีจำนวนสถานะการนับ (Modulus) ทั้งหมดกี่สถานะ และหารความถี่ลงกี่เท่า?',
        options: ['5 สถานะ (หาร 5)', '10 สถานะ (หาร 10)', '16 สถานะ (หาร 16)', '32 สถานะ (หาร 32)'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'Johnson Counter มีจำนวนสถานะเท่ากับ 2n เสมอ ดังนั้นใช้ Flip-Flop 5 ตัว จะมีสถานะ = 2 × 5 = 10 สถานะ และหารความถี่ลง 10 เท่า'
      }
    ]
  },
  {
    id: 'ch5-4',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuits & FSM (วงจรเชิงลำดับ)',
    title: 'วงจรนับ (Counters: Asynchronous vs Synchronous) & วงจรนับตัดทอน Mod-N',
    subtitle: 'Ripple Counter 4 บิต, การสะสมความล่าช้า, การหารความถี่, Synchronous Counter และการออกแบบเกตล้างค่า Mod-N',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '05_sequential.pdf (สไลด์หน้า 96-130)',
    summary: 'Ripple Counter หารความถี่ด้วย 2^n ส่วน Synchronous Counter ทำงานพร้อมกันไร้ Glitch พร้อมสูตรคำนวณจำนวนฟลิปฟลอปและสมการลอจิก NAND Reset สำหรับวงจรนับตัดทอน Mod-N ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. วงจรนับแบบอะซิงโครนัส (Asynchronous / Ripple Counter - ใบงานที่ 11)',
        content: `ในใบงานที่ 11 วงจรนับ 4 บิตสร้างจาก T-Flip-Flop (หรือ JK-FF ที่เซ็ต $J=K=1$) จำนวน 4 ตัว:

![วงจรนับ 4 บิตแบบ Asynchronous Ripple Counter](diagram:ripple-counter)

- **การต่อสัญญาณ Clock**:
  - $FF_0$ (LSB) รับสัญญาณ Clock หลัก
  - $FF_1$ รับสัญญาณ Clock จากเอาต์พุต $\\bar{Q}_0$ (หรือ $Q_0$)
  - $FF_2$ รับจาก $FF_1$ และ $FF_3$ รับจาก $FF_2$
- **คุณสมบัติการหารความถี่ (Frequency Divider)**:
  - แต่ละสเตจจะหารความถี่ของสัญญาณนาฬิกาลงครึ่งหนึ่ง ($f / 2$)
  - เอาต์พุตที่ $Q_0$: ความถี่ $= f_{\\text{clk}} / 2$
  - เอาต์พุตที่ $Q_1$: ความถี่ $= f_{\\text{clk}} / 4$
  - เอาต์พุตที่ $Q_3$ (บิตที่ 4): ความถี่ $= f_{\\text{clk}} / 16$
  - วงจรนับ $n$ บิตจะนับได้ $2^n$ สถานะ (MOD-$2^n$) เช่น 4 บิตนับ $0-15$ (MOD-16)`,
        formulas: [
          { label: 'ความถี่เอาต์พุตของ Counter บิตที่ n', formula: 'f_{out} = \\frac{f_{in}}{2^n}', note: 'หารความถี่ลงทีละ 2 เท่าในแต่ละสเตจ' },
          { label: 'ความล่าช้าสะสมทั้งหมดใน Ripple Counter', formula: 't_{total} = N \\times t_{pd} \\quad , \\quad f_{\\max} = \\frac{1}{N \\times t_{pd}}', note: 'N=จำนวนบิต, tpd=delay ของ Flip-Flop แต่ละตัว' }
        ],
        keyPoints: [
          'เรียกว่า "Ripple" เพราะสัญญาณกระเพื่อมต่อกันไปทีละขั้นเหมือนระลอกคลื่นน้ำ',
          'ความถี่สูงสุดที่ทำงานได้: f_max = 1 / (N * t_pd)'
        ]
      },
      {
        title: '2. จุดอ่อนเรื่อง Counting Glitches และวงจรนับแบบซิงโครนัส (Synchronous)',
        content: `**ข้อจำกัดร้ายแรงของ Ripple Counter:**
เมื่อวงจรเปลี่ยนค่าจาก $0111_2 (7)$ ไปเป็น $1000_2 (8)$:
- $FF_0$ พลิกจาก $1 \\to 0$ ก่อน (ใช้เวลา $t_{pd}$)
- $FF_0$ ส่งสัญญาณไปกระตุ้น $FF_1$ ให้พลิกจาก $1 \\to 0$ (ใช้เวลาอีก $t_{pd}$)
- ช่วงเสี้ยววินาทีนี้ วงจรจะแสดงค่าตัวเลขผิดเพี้ยนชั่วขณะ เช่น $0111 \\to 0110 \\to 0100 \\to 0000 \\to 1000$ เกิดเป็น **Transient Glitch** หากนำค่านี้ไปต่อกับวงจรควบคุม อาจสั่งงานอุปกรณ์ผิดพลาดได้

**ทางแก้ไข: วงจรนับแบบซิงโครนัส (Synchronous Counter):**
- ฟลิปฟลอปทุกตัว **ต่อขา Clock เข้ากับ Clock หลักร่วมกันโดยตรง**
- ทุกตัวเปลี่ยนสถานะพร้อมกันในเสี้ยววินาทีเดียวกัน ทำให้ไม่มีความล่าช้าสะสมและไม่มี Glitch!`,
        examTip: 'ข้อสอบถามข้อแตกต่าง: Ripple Counter ง่ายแต่อืดและมี Glitch ส่วน Synchronous เร็วกว่ามากและไม่มี Glitch เพราะ Clock ถึงทุกตัวพร้อมกัน!'
      },
      {
        title: '3. วงจรนับแบบตัดทอน (Truncated Mod-N Counter) และสูตรออกแบบเกตล้างค่า (NAND Reset)',
        content: `หากต้องการสร้างวงจรนับที่ไม่ใช่เลขยกกำลังของ 2 (เช่น Mod-6 หรือ Mod-10 BCD Counter) ต้องใช้วิธี **ตัดทอนวงรอบ (Truncation)** โดยดักจับตัวเลขสุดท้ายแล้วส่งสัญญาณไปล้างค่าผ่านขา Active-LOW $\\overline{CLR}$:

1. **สูตรคำนวณจำนวน Flip-Flop ขั้นต่ำ ($k$):**
   $$k = \\lceil \\log_2 N \\rceil \\iff 2^{k-1} < N \\le 2^k$$
   *(เช่น Mod-6 ต้องใช้ $k = \\lceil \\log_2 6 \\rceil = 3$ ฟลิปฟลอป เพราะ $2^2 < 6 \\le 2^3$)*

2. **สูตรสมการเกตล้างค่า (Active-LOW $\\overline{CLR}$ NAND Gate):**
   - แปลงเลข $N$ เป็นเลขฐานสอง
   - นำเฉพาะบิตที่เป็น **1** ของเลข $N$ มาต่อเข้า NAND Gate:
   $$\\overline{CLR} = \\overline{\\prod_{Q_i \\in \\text{binary}(N)=1} Q_i}$$

**ตัวอย่างโจทย์สอบจริง 2 ข้อที่ออกทุกปี (สไลด์หน้า 115-122):**
- **ตัวอย่างที่ 1: ออกแบบ Mod-6 Counter (นับ $0 \\to 5$ แล้วกลับไป 0):**
  - ใช้ Flip-Flop 3 ตัว ($Q_2, Q_1, Q_0$)
  - วงจรต้องนับ $0, 1, 2, 3, 4, 5$ พอแตะ **$6_{10} = 110_2$** ($Q_2=1, Q_1=1, Q_0=0$) ต้องสั่งเคลียร์ทันที!
  - บิตที่เป็น 1 คือ $Q_2$ และ $Q_1 \\implies$ ใช้ 2-Input NAND Gate:
  $$\\overline{CLR} = \\overline{Q_2 \\cdot Q_1}$$
  - ต่อเอาต์พุตของ NAND เข้าขา $\\overline{CLR}$ ของฟลิปฟลอปทั้ง 3 ตัว

- **ตัวอย่างที่ 2: ออกแบบ Mod-10 Decade Counter (นับ $0 \\to 9$ แล้วกลับไป 0):**
  - ใช้ Flip-Flop 4 ตัว ($Q_3, Q_2, Q_1, Q_0$)
  - พอแตะ **$10_{10} = 1010_2$** ($Q_3=1, Q_1=1$) ต้องสั่งเคลียร์ทันที!
  - บิตที่เป็น 1 คือ $Q_3$ และ $Q_1 \\implies$
  $$\\overline{CLR} = \\overline{Q_3 \\cdot Q_1}$$`,
        formulas: [
          {
            label: 'จำนวน Flip-Flop ขั้นต่ำสำหรับ Mod-N',
            formula: 'k = \\lceil \\log_2 N \\rceil',
            note: 'ปัดเศษขึ้นเป็นจำนวนเต็มเสมอ'
          },
          {
            label: 'สมการเกต NAND รีเซ็ต Mod-N',
            formula: '\\overline{CLR} = \\overline{\\prod_{Q_i \\in \\text{binary}(N)=1} Q_i}',
            note: 'นำเฉพาะบิตที่เป็น 1 ของค่า N เข้า NAND Gate ต่อเข้าขา CLR'
          }
        ],
        keyPoints: [
          'วงจรนับ Mod-N จะนับเลข 0 ถึง N-1',
          'สถานะ N จะปรากฏขึ้นสั้นๆ เพียงชั่วพริบตา (Transient Glitch ระดับนาโนวินาที) ก่อนถูกล้างเป็น 0',
          'ขา CLR ของไอซีมาตรฐาน 74xx มักเป็น Active LOW จึงต้องใช้ NAND Gate'
        ],
        examTip: 'ข้อสอบถาม Mod-6 ใช้เกตอะไรเคลียร์: ตอบ NAND รับขา Q2 และ Q1 (เพราะ 6 = 110_2)! ห้ามเอา Q0 มาต่อเพราะ Q0 เป็น 0 ในเลข 6!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-4-1',
        chapterId: 'ch5',
        topic: 'Ripple Counter Frequency',
        question: 'หากป้อนสัญญาณนาฬิกาความถี่ 16 kHz เข้าสู่วงจร 4-bit Asynchronous Ripple Counter สัญญาณที่ได้จากเอาต์พุตของฟลิปฟลอปตัวสุดท้าย (Q3) จะมีความถี่เท่าใด?',
        options: ['4 kHz', '2 kHz', '1 kHz', '500 Hz'],
        correctAnswer: 2,
        difficulty: 'ง่าย',
        explanation: 'วงจรนับ 4 บิตจะหารความถี่ด้วย 2^4 = 16 ดังนั้น f_out = 16 kHz / 16 = 1 kHz'
      },
      {
        id: 'q5-4-2',
        chapterId: 'ch5',
        topic: 'Truncated Mod-N Counter Design',
        question: 'ในการออกแบบวงจรนับ Mod-12 (นับ 0 ถึง 11 แล้ววนกลับไป 0) ต้องใช้ Flip-Flop ขั้นต่ำกี่ตัว และต้องใช้ลอจิกเกตใดในการต่อเข้าขา Clear (Active LOW) เพื่อล้างค่า?',
        options: [
          '3 ตัว, เกต AND รับ Q2 และ Q1',
          '4 ตัว, เกต NAND รับ Q3 และ Q2',
          '4 ตัว, เกต NAND รับ Q3, Q2, Q1, Q0',
          '4 ตัว, เกต NOR รับ Q3 และ Q2'
        ],
        correctAnswer: 1,
        difficulty: 'เข้มข้น',
        explanation: 'สำหรับ Mod-12 ต้องใช้ Flip-Flop k = ceil(log2 12) = 4 ตัว (เพราะ 2^3=8 < 12 <= 16). สถานะที่ต้องล้างค่าคือ 12_10 = 1100_2 ซึ่งบิตที่เป็น 1 คือ Q3 และ Q2 ดังนั้นต้องใช้เกต NAND รับอินพุต Q3 และ Q2 ต่อเข้าขา CLR'
      }
    ]
  },
  {
    id: 'ch5-5',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuits & FSM (วงจรเชิงลำดับ)',
    title: 'วงจรสร้างสัญญาณพัลส์ (NE555 Timer, Astable & Monostable Multivibrators - ใบงานที่ 10)',
    subtitle: 'สถาปัตยกรรมภายในชิป NE555, โหมด Astable, โหมด Monostable (One-Shot), สูตรความถี่ และวงจร Duty Cycle 50%',
    durationMinutes: 25,
    difficulty: 'เข้มข้น',
    slideRef: '05_sequential.pdf (สไลด์หน้า 131-160)',
    summary: 'ไอซีไทเมอร์ NE555 ใช้ตัวต้านทาน 5k สามตัวแบ่งแรงดัน 1/3 และ 2/3 VCC ทำงานได้ทั้งโหมด Astable (กำเนิดความถี่ต่อเนื่อง) และ Monostable (One-Shot พัลส์เดี่ยว) พร้อมสูตรคำนวณและเทคนิคปรับ Duty Cycle 50% ด้วยไดโอดตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. โครงสร้างภายในไอซี NE555 (Internal Architecture)',
        content: `เหตุผลที่ไอซีนี้มีชื่อว่า **"555"** คือภายในประกอบด้วย **ตัวต้านทานขนาด $5\\text{k}\\Omega$ จำนวน 3 ตัวต่ออนุกรมกัน** เพื่อแบ่งแรงดันอ้างอิง:

![แผนภาพบล็อกการทำงานภายในไอซี NE555](diagram:ne555-block)

1. **ระดับแรงดันเปรียบเทียบ 2 ระดับ**:
   - ระดับบน (Upper Comparator): ต่ออยู่ที่จุด $\\frac{2}{3} V_{CC}$ (ขา 6 Threshold)
   - ระดับล่าง (Lower Comparator): ต่ออยู่ที่จุด $\\frac{1}{3} V_{CC}$ (ขา 2 Trigger)
2. **SR Flip-Flop ภายใน**: ทำหน้าที่จำสถานะเอาต์พุต
3. **Discharge Transistor (ขา 7)**: ทำหน้าที่ต่อลงกราวด์เพื่อช็อตคายประจุออกจากตัวเก็บประจุ $C$
4. **Output (ขา 3)**: ขับกระแสได้สูงถึง $200\\text{mA}$ ขับหลอด LED หรือรีเลย์ได้โดยตรง`,
        keyPoints: [
          'ขา 4 (Reset): เป็น Active LOW ต้องต่อเข้า VCC ในการใช้งานปกติ',
          'ขา 5 (Control Voltage): นิยมต่อตัวเก็บประจุ 0.01uF ลงกราวด์เพื่อกรอง Noise'
        ]
      },
      {
        title: '2. โหมด Astable Multivibrator และสูตรคำนวณ (ใบงานที่ 10)',
        content: `ในโหมด Astable วงจรจะแกว่งสร้างสัญญาณคลื่นสี่เหลี่ยมต่อเนื่องด้วยตัวเอง (Free Running Oscillator):

![วงจร NE555 โหมด Astable Multivibrator](diagram:ne555-astable)

**ช่วงเวลาการประจุและคายประจุ:**
- **ช่วง HIGH ($t_{\\text{HIGH}}$)**: กระแสไหลผ่าน $R_1 + R_2$ เข้าชาร์จตัวเก็บประจุ $C$ จาก $\\frac{1}{3} V_{CC} \\to \\frac{2}{3} V_{CC}$
$$t_{\\text{HIGH}} = 0.693(R_1 + R_2)C$$
- **ช่วง LOW ($t_{\\text{LOW}}$)**: ทรานซิสเตอร์ขา 7 ดึงกระแสคายประจุผ่านเฉพาะ $R_2$ ลงกราวด์ จาก $\\frac{2}{3} V_{CC} \\to \\frac{1}{3} V_{CC}$
$$t_{\\text{LOW}} = 0.693 R_2 C$$
- **คาบเวลารวม ($T$) และความถี่ ($f$)**:
$$T = t_{\\text{HIGH}} + t_{\\text{LOW}} = 0.693(R_1 + 2R_2)C$$
$$f = \\frac{1}{T} = \\frac{1.44}{(R_1 + 2R_2)C}$$

**Duty Cycle และข้อจำกัดวงจรมาตรฐาน:**
$$\\text{Duty Cycle} = \\frac{t_{\\text{HIGH}}}{T} \\times 100\\% = \\frac{R_1 + R_2}{R_1 + 2R_2} \\times 100\\%$$
- สังเกตว่า $R_1 + R_2$ จะมากกว่า $R_2$ เสมอ ดังนั้น **Duty Cycle ของวงจร 555 มาตรฐานจะไม่มีทาง $\\le 50\\%$ ได้!**
- ในแล็บที่ 10 ออกแบบไฟกระพริบ $1\\text{Hz}$: เลือก $R_1 = 1\\text{k}\\Omega, R_2 = 71.5\\text{k}\\Omega, C = 10\\mu\\text{F}$ จะได้ Duty Cycle ประมาณ $50.35\\%$ ใกล้เคียงครึ่งๆ มากที่สุด`,
        formulas: [
          { label: 'ความถี่ NE555 Astable', formula: 'f = \\frac{1.44}{(R_1 + 2R_2)C}', note: 'R1, R2 มีหน่วยเป็น โอห์ม, C มีหน่วยเป็น ฟารัด' },
          { label: 'ช่วงเวลา HIGH และ LOW', formula: 't_{\\text{HIGH}} = 0.693(R_1 + R_2)C \\quad , \\quad t_{\\text{LOW}} = 0.693 R_2 C', note: 'ช่วงชาร์จผ่าน R1+R2, ช่วงคายผ่าน R2' },
          { label: 'Duty Cycle วงจรมาตรฐาน', formula: 'D = \\frac{R_1 + R_2}{R_1 + 2R_2} \\times 100\\%', note: 'มีค่ามากกว่า 50% เสมอในวงจรมาตรฐาน' }
        ],
        examTip: 'ข้อสอบถาม: ทำไม 555 Astable ถึงมี Duty Cycle ต่ำกว่า 50% ไม่ได้? ตอบ: เพราะช่วงชาร์จกระแสไหลผ่าน R1+R2 แต่วงจรคายประจุไหลผ่านแค่ R2 ทำให้ช่วงเวลา HIGH ยาวกว่า LOW เสมอ!'
      },
      {
        title: '3. โหมด Monostable (One-Shot พัลส์เดี่ยว) และวงจรดัดแปลง Duty Cycle 50%',
        content: `นอกจากโหมด Astable แล้ว ไอซี NE555 ยังมีโหมดสำคัญที่ออกสอบและใช้งานจริงบ่อยอีก 2 รูปแบบ:

1. **โหมด Monostable Multivibrator (One-Shot Timer):**
   - มีสถานะคงตัวเพียงสถานะเดียว (เอาต์พุตปกติเป็น 0)
   - เมื่อมีสัญญาณกระตุ้นขอบขาลง (Negative Trigger Pulse $< \\frac{1}{3} V_{CC}$) เข้ามาที่ขา 2 เอาต์พุตขา 3 จะเด้งเป็น HIGH ชั่วคราวเป็นระยะเวลา $T$ แล้วตกลงมาเป็น LOW อัตโนมัติ
   - **สูตรความกว้างพัลส์เอาต์พุต (Pulse Width $T$):**
   $$T = 1.1 R_A C$$
   - **ตัวอย่างข้อสอบคำนวณ:** ออกแบบวงจรหน่วงเวลาไฟติด $T = 1.1$ วินาที โดยใช้ $C = 10\\mu\\text{F}$
   $$R_A = \\frac{T}{1.1 \\times C} = \\frac{1.1\\text{ s}}{1.1 \\times 10 \\times 10^{-6}\\text{ F}} = 100,000\\Omega = 100\\text{ k}\\Omega$$

2. **เทคนิคการสร้างคลื่นสี่เหลี่ยมสมมาตร (Duty Cycle = 50% พอดี):**
   - ต่อไดโอดความเร็วสูง (เช่น 1N4148) **ขนานคร่อมตัวต้านทาน $R_2$** โดยหันขั้ว Anode เข้าหาขา 7 และขั้ว Cathode เข้าหาตัวเก็บประจุ $C$
   - **ช่วงชาร์จประจุ (HIGH)**: กระแสจะไหลลัดผ่านไดโอดเข้าชาร์จ $C$ ผ่านตัวต้านทาน $R_1$ เพียงตัวเดียว:
   $$t_{\\text{HIGH}} = 0.693 R_1 C$$
   - **ช่วงคายประจุ (LOW)**: ไดโอดจะถูกไบแอสกลับ กระแสจึงคายผ่าน $R_2$ ลงขา 7 ตามปกติ:
   $$t_{\\text{LOW}} = 0.693 R_2 C$$
   - หากเลือก **$R_1 = R_2$** จะได้ $t_{\\text{HIGH}} = t_{\\text{LOW}}$ ส่งผลให้ **Duty Cycle = 50% สมบูรณ์แบบ!** และความถี่คำนวณจาก:
   $$f = \\frac{1}{0.693(R_1 + R_2)C} = \\frac{1.44}{2RC} = \\frac{0.72}{RC}$$`,
        formulas: [
          {
            label: 'ความกว้างพัลส์ Monostable (One-Shot Pulse Width)',
            formula: 'T = 1.1 R_A C',
            note: 'เวลาที่เอาต์พุตเป็น HIGH จากการกระตุ้น 1 ครั้ง'
          },
          {
            label: 'Duty Cycle 50% (ต่อไดโอดขนานคร่อม R2)',
            formula: 't_{\\text{HIGH}} = 0.693 R_1 C \\quad , \\quad t_{\\text{LOW}} = 0.693 R_2 C \\implies \\text{ถ้า } R_1=R_2 \\implies D=50\\%',
            note: 'ไดโอดทำให้ช่วงชาร์จและช่วงคายประจุแยกตัวต้านทานกันอิสระ'
          }
        ],
        keyPoints: [
          'Monostable ใช้ทำ Debounce สวิตช์ปุ่มกด หรือหน่วงเวลาเปิด-ปิดไฟ',
          'การต่อไดโอดขนาน R2 ช่วยปลดล็อกข้อจำกัด Duty Cycle 50% ของ NE555'
        ],
        examTip: 'ข้อสอบถามสูตร Monostable: จำสัมประสิทธิ์ 1.1 RA C (ต่างจาก Astable ที่เป็น 0.693 หรือ 1.44)!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-5-1',
        chapterId: 'ch5',
        topic: 'NE555 Duty Cycle',
        question: 'ข้อใดอธิบายพฤติกรรมของ Duty Cycle ในวงจรมาตรฐาน NE555 Astable Multivibrator ได้ถูกต้องที่สุด?',
        options: [
          'สามารถปรับให้เป็น 25% ได้อย่างง่ายดายโดยลดค่า R1',
          'Duty Cycle จะมีค่ามากกว่า 50% เสมอ เพราะช่วงเวลาชาร์จประจุต้องผ่านทั้ง R1 และ R2',
          'Duty Cycle จะมีค่าเท่ากับ 50% พอดีในทุกกรณี',
          'ขึ้นอยู่กับขนาดของตัวเก็บประจุ C เพียงอย่างเดียว'
        ],
        correctAnswer: 1,
        difficulty: 'ปานกลาง',
        explanation: 'ช่วงชาร์จผ่าน R1+R2 ช่วงคายประจุผ่าน R2 ดังนั้น t_HIGH > t_LOW เสมอ ทำให้ Duty Cycle > 50% ในวงจรมาตรฐาน'
      },
      {
        id: 'q5-5-2',
        chapterId: 'ch5',
        topic: 'NE555 Monostable Pulse Width',
        question: 'วงจร NE555 โหมด Monostable ใช้ตัวต้านทาน RA = 100 kΩ และตัวเก็บประจุ C = 10 µF ความกว้างของพัลส์เอาต์พุต (T) เมื่อถูกกระตุ้นจะมีค่าเท่าใด?',
        options: ['0.693 วินาที', '1.10 วินาที', '1.44 วินาที', '2.20 วินาที'],
        correctAnswer: 1,
        difficulty: 'ง่าย',
        explanation: 'จากสูตร Monostable T = 1.1 * RA * C = 1.1 * (100 * 10^3) * (10 * 10^-6) = 1.1 * 1.0 = 1.10 วินาที'
      }
    ]
  },
  {
    id: 'ch5-6',
    chapterId: 'ch5',
    chapterNumber: 5,
    chapterTitle: 'บทที่ 5: Sequential Circuits & FSM (วงจรเชิงลำดับ)',
    title: 'วงจรลำดับสถานะจำกัด (FSM Mealy/Moore), ถังพักน้ำ, ตารางรอม & Memory Cascading',
    subtitle: 'การออกแบบ FSM ตรวจจับคนเดินผ่านเซนเซอร์ 2 ลำแสง, ถังพักน้ำ Hysteresis, สูตรขนาดหน่วยความจำ ROM และการต่อขยายชิป',
    durationMinutes: 30,
    difficulty: 'เข้มข้น',
    slideRef: '05_sequential.pdf (สไลด์หน้า 161-210)',
    summary: 'FSM เป็นแกนหลักของการควบคุมระบบอัตโนมัติ โดย Moore เอาต์พุตขึ้นกับสถานะปัจจุบันเท่านั้น ส่วน Mealy ขึ้นกับอินพุตด้วย พร้อมสูตรคำนวณขนาด ROM ที่ใช้บรรจุ FSM, การต่อขยายความจุหน่วยความจำ (Memory Cascading) และการออกแบบถังพักน้ำ Hysteresis ตามสไลด์ อ.ปวีณ',
    sections: [
      {
        title: '1. เปรียบเทียบโมเดล Moore vs Mealy Machine',
        content: `| คุณสมบัติ | Moore Machine | Mealy Machine |
|---|---|---|
| **สมการเอาต์พุต** | เอาต์พุตขึ้นกับ **สถานะปัจจุบันเท่านั้น** ($Y = f(S)$) | เอาต์พุตขึ้นกับ **สถานะปัจจุบัน + อินพุตขณะนั้น** ($Y = f(S, X)$) |
| **การเขียนในไดอะแกรม** | เขียนค่าเอาต์พุต **ไว้ภายในวงกลมสถานะ** ($S_0 / 0$) | เขียนค่าเอาต์พุต **ไว้บนเส้นลูกศรเชื่อมต่อ** ($X / Y$) |
| **ความไวต่อสัญญาณกวน** | ทนต่อสัญญาณรบกวนสูง (เอาต์พุตเปลี่ยนเฉพาะเมื่อ Clock มา) | เอาต์พุตอาจเกิด Glitch ทันทีที่อินพุตกระตุก |
| **จำนวนสถานะ** | มักใช้จำนวนสถานะมากกว่า Mealy 1-2 สถานะ | ใช้จำนวนสถานะน้อยกว่า แต่เสี่ยง Glitch |`,
        keyPoints: [
          'Moore: Output อยู่ในวงกลม State ปลอดภัยจาก Glitch',
          'Mealy: Output อยู่บนเส้นทาง ตอบสนองไวกว่าแต่เสี่ยงต่อสัญญาณรบกวน'
        ]
      },
      {
        title: '2. วงจรนับจำนวนคนด้วยเซนเซอร์ลำแสงเลเซอร์ 2 ตัว (ใบงานที่ 11)',
        content: `ในใบงานที่ 11 มีการติดตั้งเซนเซอร์แสง $a$ (ตัวนอก) และ $b$ (ตัวใน) ที่ทางเข้าห้อง:

**การวิเคราะห์ลำดับการเดินผ่านเซนเซอร์ ($a, b$):**
1. **คนเดินเข้าห้อง ($00 \\to 10 \\to 11 \\to 01 \\to 00$)**:
   - สถานะ $S_0 (00)$: ว่าง ไม่มีคนบัง
   - สถานะ $S_1 (10)$: บังเซนเซอร์ $a$ ตัวเดียว
   - สถานะ $S_2 (11)$: บังทั้ง $a$ และ $b$ พร้อมกัน (อยู่กึ่งกลางประตู)
   - สถานะ $S_3 (01)$: เดินพ้นเซนเซอร์ $a$ เหลือบังเฉพาะเซนเซอร์ $b$
   - กลับสู่ $S_0 (00)$: พ้นประตูสมบูรณ์ $\\implies$ **สั่งนับคนเข้า +1 (Count Up)**
2. **การป้องกันการนับหลอก (False Entry Rejection)**:
   - หากคนยื่นเท้าตัดเซนเซอร์ $a$ ($00 \\to 10$) แล้วเปลี่ยนใจถอยหลังกลับ ($10 \\to 00$) วงจรจะวนกลับไปที่สถานะ $S_0$ ทันทีโดย **ไม่มีการส่งสัญญาณนับหลอก**
3. **การต่อใช้งานกับหน่วยความจำ ROM Firmware**:
   - ใช้ขา Address ของ ROM แทน: $\\{\\text{State บิต } Q_1, Q_0, \\text{เซนเซอร์ } a, b\\}$
   - ข้อมูลใน ROM (Data Output) จะบรรจุ: $\\{\\text{สถานะถัดไป } D_1, D_0, \\text{สัญญาณสั่งนับ } y\\}$`,
        examTip: 'ข้อสอบถามเรื่องลำดับ FSM นับคน: ท่องให้ขึ้นใจ เดินเข้าคือ 00 -> 10 -> 11 -> 01 -> 00 ถ้าเดินออกจะสลับกันเป็น 00 -> 01 -> 11 -> 10 -> 00!'
      },
      {
        title: '3. ระบบควบคุมถังพักน้ำแบบมีฮิสเทอรีซิส (Water Tank Hysteresis FSM)',
        content: `ในข้อสอบและสไลด์ ดร. ปวีณ มีโจทย์คลาสสิกถังพักน้ำอัตโนมัติ:
- เซนเซอร์ $a$: ตรวจจับระดับน้ำต่ำ (30%) ($a=1$ เมื่อน้ำ $\\ge 30\\%$)
- เซนเซอร์ $b$: ตรวจจับระดับน้ำสูง (75%) ($b=1$ เมื่อน้ำ $\\ge 75\\%$)
- ปั๊มน้ำ $y$: ทำงาน ($y=1$) เพื่อสูบน้ำเข้าถัง

**ทำไมต้องใช้ FSM และฮิสเทอรีซิส (Hysteresis)?**
- หากใช้วงจรจัดหมู่ธรรมดา เมื่อระดับน้ำปริ่มอยู่ที่ขอบเซนเซอร์ คลื่นน้ำกระเพื่อมจะทำให้ปั๊มน้ำตัดต่อรัวๆ มอเตอร์จะไหม้พังเสียหาย
- **การทำงานของ FSM (สถานะ $S$: 1=ปั๊มทำงาน, 0=ปั๊มหยุด):**
  - **น้ำลดต่ำกว่า 30% ($a=0, b=0$)**: สั่งปั๊มน้ำทำงาน ($S_{next} = 1$) สูบน้ำเข้าถัง
  - **น้ำเพิ่มขึ้นมาระหว่าง 30%-75% ($a=1, b=0$)**: **รักษาสถานะเดิมไว้ ($S_{next} = S$)** ถ้าสูบอยู่ให้สูบต่อ ถ้าหยุดอยู่ให้หยุดต่อ!
  - **น้ำเต็มถึง 75% ($a=1, b=1$)**: ปั๊มหยุดทำงานทันที ($S_{next} = 0$)
- **สมการสถานะถัดไปที่ลดรูปแล้ว (State Equation):**
$$S_{next} = \\bar{b} \\cdot (S + \\bar{a}) = S\\bar{b} + \\bar{a}\\bar{b}$$
$$y = S_{next}$$`,
        formulas: [
          { label: 'สมการ Next State ควบคุมปั๊มน้ำถังพักน้ำ', formula: 'S_{next} = \\bar{b} \\cdot (S + \\bar{a}) = S\\bar{b} + \\bar{a}\\bar{b}', note: 'a=เซนเซอร์ล่าง (30%), b=เซนเซอร์บน (75%), S=สถานะปั๊มปัจจุบัน' },
          { label: 'เอาต์พุตสั่งปั๊มน้ำทำงาน', formula: 'y = S_{next}', note: 'สูบน้ำเมื่อน้ำแห้ง และสูบต่อเนื่องจนกว่าจะแตะเซนเซอร์บน b' }
        ],
        keyPoints: [
          'Hysteresis ป้องกันการตัดต่อรัวๆ ของมอเตอร์เมื่อระดับน้ำกระเพื่อม',
          'ช่วงระดับน้ำกึ่งกลาง (a=1, b=0) เป็นช่วงจำสถานะเดิม (Hold State)'
        ]
      },
      {
        title: '4. การสังเคราะห์ FSM ด้วย ROM และสูตรการต่อพ่วงชิปหน่วยความจำ (Memory Cascading)',
        content: `ในระบบดิจิทัลระดับสูง เรานิยมใช้หน่วยความจำ ROM บรรจุตาราง State Transition Table แทนการต่อเกตจำนวนมาก:

1. **สูตรคำนวณขนาดความจุ ROM สำหรับ FSM (ข้อสอบคำนวณ!):**
   - ให้ $s$ คือจำนวนบิตสถานะ (State Flip-Flops)
   - ให้ $i$ คือจำนวนบิตสัญญาณอินพุตภายนอก (Inputs)
   - ให้ $o$ คือจำนวนบิตสัญญาณเอาต์พุตภายนอก (Outputs)
   $$\\text{จำนวนขาแอดเดรส (Address Lines) } A = s + i \\implies \\text{จำนวนแถวข้อมูล } = 2^{s+i} \\text{ คำ (Words)}$$
   $$\\text{ความกว้างข้อมูล (Data Width) } D = s + o \\text{ บิต (บิตสถานะถัดไป } s \\text{ บิต} + \\text{เอาต์พุต } o \\text{ บิต)}$$
   $$\\text{ขนาดความจุ ROM ทั้งหมด} = 2^{s+i} \\times (s + o) \\text{ บิต}$$
   - **ตัวอย่างโจทย์สอบจริง (ระบบนับคนแล็บ 11):** FSM มี 4 สถานะ ($s = 2$ บิต), มีเซนเซอร์ 2 ตัว ($i = 2$ บิต), มีเอาต์พุตสั่งนับ 1 บิต ($o = 1$ บิต):
     - ขา Address $= 2 + 2 = 4$ เส้น $\\implies 2^4 = 16$ คำ
     - ความกว้างข้อมูล Data $= 2 + 1 = 3$ บิต
     - ขนาด ROM ที่ต้องใช้ $= 16 \\times 3 = 48$ บิต!

2. **สูตรการต่อพ่วงขยายความจุหน่วยความจำ (Memory Chip Cascading):**
   - **ขยายจำนวนคำ (Word Capacity Expansion - เพิ่มความลึก):**
     $$N_{\\text{word}} = \\frac{\\text{จำนวนคำที่ต้องการ}}{\\text{จำนวนคำของแต่ละชิป}}$$
     ใช้สาย Address บิตบนต่อเข้า Decoder เพื่อเลือกขา Chip Select ($\\overline{CS}$) ของแต่ละชิป
   - **ขยายความกว้างของคำ (Word Length Expansion - เพิ่มความกว้างบิต):**
     $$N_{\\text{bit}} = \\frac{\\text{จำนวนบิตข้อมูลที่ต้องการ}}{\\text{จำนวนบิตข้อมูลของแต่ละชิป}}$$
   - **สูตรจำนวนชิปรวมทั้งหมด (Total Memory Chips):**
     $$N_{\\text{total}} = N_{\\text{word}} \\times N_{\\text{bit}} = \\left( \\frac{\\text{Words}_{\\text{req}}}{\\text{Words}_{\\text{chip}}} \\right) \\times \\left( \\frac{\\text{Bits}_{\\text{req}}}{\\text{Bits}_{\\text{chip}}} \\right)$$
   - **ตัวอย่างโจทย์สอบ:** ต้องการสร้างระบบหน่วยความจำขนาด $16\\text{K} \\times 16$ บิต โดยใช้ชิปขนาด $4\\text{K} \\times 8$ บิต:
     $$N_{\\text{word}} = \\frac{16\\text{K}}{4\\text{K}} = 4 \\quad , \\quad N_{\\text{bit}} = \\frac{16}{8} = 2 \\implies N_{\\text{total}} = 4 \\times 2 = 8 \\text{ ชิป}$$`,
        formulas: [
          {
            label: 'ขนาดหน่วยความจำ ROM สำหรับสร้าง FSM',
            formula: '\\text{ROM Size} = 2^{s+i} \\times (s+o) \\text{ bits}',
            note: 's=จำนวนบิตสถานะ, i=จำนวนบิตอินพุต, o=จำนวนบิตเอาต์พุต'
          },
          {
            label: 'สูตรจำนวนชิปหน่วยความจำในการต่อพ่วง (Memory Cascading)',
            formula: 'N_{\\text{chips}} = \\left( \\frac{\\text{Words}_{\\text{req}}}{\\text{Words}_{\\text{chip}}} \\right) \\times \\left( \\frac{\\text{Bits}_{\\text{req}}}{\\text{Bits}_{\\text{chip}}} \\right)',
            note: 'ขยายจำนวนคำใช้ Decoder ขับ CS, ขยายจำนวนบิตต่อขนานขา Data'
          }
        ],
        keyPoints: [
          'การใช้ ROM ทำ FSM ไม่ต้องลดรูปสมการ K-Map เพียงแค่โปรแกรมตารางลง ROM',
          'การขยายหน่วยความจำใช้ Decoder ถอดรหัสแอดเดรสบิตบนเพื่อเปิด-ปิดขา CS'
        ],
        examTip: 'ข้อสอบถามขนาด ROM ทำ FSM: จำสูตร 2^(s+i) x (s+o) บิตเสมอ! s คือ State bits, i คือ Input bits, o คือ Output bits!'
      }
    ],
    quickQuiz: [
      {
        id: 'q5-6-1',
        chapterId: 'ch5',
        topic: 'People Counter FSM Sequence',
        question: 'ในระบบตรวจจับคนเดินเข้าห้องด้วยเซนเซอร์แสง 2 ตัว (a ภายนอก, b ภายใน) ลำดับสัญญาณ (ab) ที่ถูกต้องในการเดินเข้าห้องสมบูรณ์ 1 คนคือข้อใด?',
        options: [
          '00 -> 10 -> 11 -> 01 -> 00',
          '00 -> 01 -> 11 -> 10 -> 00',
          '00 -> 10 -> 01 -> 00',
          '00 -> 11 -> 00'
        ],
        correctAnswer: 0,
        difficulty: 'ปานกลาง',
        explanation: 'เดินเข้าห้องต้องตัดเซนเซอร์นอกก่อน (10) แล้วบังทั้งคู่ (11) แล้วหลุดเหลือเซนเซอร์ใน (01) แล้วหลุดพ้นทั้งหมด (00)'
      },
      {
        id: 'q5-6-2',
        chapterId: 'ch5',
        topic: 'FSM ROM Sizing Calculation',
        question: 'วงจร FSM ตัวหนึ่งมี 8 สถานะ (State), มีอินพุตภายนอก 3 ช่องสัญญาณ และมีเอาต์พุต 2 สัญญาณ หากนำไปสังเคราะห์ลงบนชิปหน่วยความจำ ROM ต้องใช้ ROM ที่มีขนาดความจุอย่างน้อยเท่าใด?',
        options: ['64 คำ × 5 บิต (320 บิต)', '32 คำ × 6 บิต (192 บิต)', '64 คำ × 3 บิต (192 บิต)', '16 คำ × 5 บิต (80 บิต)'],
        correctAnswer: 0,
        difficulty: 'เข้มข้น',
        explanation: 'FSM มี 8 สถานะ ต้องใช้บิตสถานะ s = ceil(log2 8) = 3 บิต. มีอินพุต i = 3 บิต ดังนั้นขา Address = s + i = 3 + 3 = 6 ขา ได้จำนวนคำ = 2^6 = 64 คำ. ด้านเอาต์พุตประกอบด้วยสถานะถัดไป (s = 3 บิต) + เอาต์พุต (o = 2 บิต) = 3 + 2 = 5 บิต. สรุปคือใช้ ROM ขนาด 64 คำ × 5 บิต = 320 บิต'
      }
    ]
  }
];
