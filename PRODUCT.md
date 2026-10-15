# Product Brief: Digital Logic Final Exam Prep (CS121)

## Product Identity
- **Course**: CS121 Digital Logic and Smart Device (คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยแม่โจ้)
- **Instructor**: Dr. Paween Khoenkaw (ดร. ปวีณ เขื่อนแก้ว)
- **Target Audience**: Computer Science / Computer Engineering students preparing for the Final Examination.
- **Exam Rules**: Final exam allows 1 sheet of A4 paper (หน้า-หลัง หรือ 1 แผ่น A4) + Scientific Calculator.

## Scope of Content
1. **Chapter 3: Digital Circuit & Combinational Logic**
   - Analog vs Digital Signals (Characteristics, Pros/Cons, Noise immunity, Quantization, Resolution calculation)
   - Digital Logic Operators & Truth Tables (NOT, AND, OR, NAND, NOR, XOR, XNOR)
   - Circuit Analysis and Synthesis, Combinational Circuit design
   - Adders: Half Adder ($S = A \oplus B, C = A \cdot B$) and Full Adder ($S = A \oplus B \oplus C_{in}, C_{out} = AB + C_{in}(A \oplus B)$)
2. **Chapter 4: Digital Circuit Simplification**
   - Boolean Algebra Postulates & Theorems (Identity, Null, Idempotent, Inverse, Commutative, Associative, Distributive, Absorption, De Morgan's Laws)
   - Canonical Forms: Minterms ($m_i$), Maxterms ($M_i$), Sum of Products (SOP), Product of Sums (POS)
   - Karnaugh Maps (2, 3, and 4 variables), Gray Code adjacency, Power of 2 grouping rules
   - Don't Care Conditions ($X$ or $d$), Essential Prime Implicants, Redundant group avoidance
   - Universal Gate Implementations (NAND-only, NOR-only circuits)
3. **Chapter 5: Sequential Circuit & Finite State Machines (FSM)**
   - Combinational vs Sequential Circuits, Feedback concept, Memory elements
   - Clock Signals, 555 Timer Astable Multivibrator calculations ($T_H, T_L, T, f, \text{Duty Cycle}$)
   - Latches: SR Latch (NOR / NAND based), Enable input, Transparency problem
   - Flip-Flops: D Flip-Flop (Edge-triggered), JK Flip-Flop (Toggle condition), T Flip-Flop
   - Characteristic Tables, Characteristic Equations, and Excitation Tables
   - Registers: Shift Registers (SISO, SIPO, PISO, PIPO), Bidirectional & Universal Shift Registers
   - Counters: Asynchronous (Ripple) vs Synchronous Counters, Up/Down Counters, Modulo-N / BCD Counters
   - Finite State Machines (FSM): Moore vs Mealy Architectures
   - State Diagrams, State Tables, State Assignment, Next-State Logic, ROM/RAM implementation
   - Real Exam Case Studies: Water Pump Level Controller (Sensor a, b -> State -> Pump y), Sequence Detectors, Up/Down Counters

## Core Modules & Features
1. **Student Personal Dashboard**:
   - Bento UI with "Resume Learning", Progress tracker, Countdown to final exam, Topic mastery breakdown, Quick Practice launcher.
2. **Classroom & Study View**:
   - 2-Column layout: 70% interactive study notes & lecture breakdown, 30% collapsible syllabus.
   - Interactive Logic Simulators:
     - Live Logic Gate / Combinational Simulator
     - Interactive 2-4 Variable K-Map Solver with grouping visualizer
     - Interactive Flip-Flop timing & state lab (SR, D, JK, T)
     - Interactive Water Pump FSM State Visualizer (from Dr. Paween's exam problem)
   - Study Tabs: Notes (with LocalStorage auto-save), Resources & Formula Sheet, Practice Drills & Q&A.
   - Theater Mode (Distraction-Free viewing).
3. **1-Page A4 Printable Cheat Sheet (สรุปสูตร A4)**:
   - High-density, crystal-clear, print-optimized A4 layout formatted for single-sheet printout to bring into the exam room.
4. **Exam Simulator (Mock Final Exam)**:
   - Authentic 30+ question multiple-choice & analytical exam covering all 3 chapters.
   - Timer, instant scoring, step-by-step Thai explanations, equation derivations, and retry mode.
