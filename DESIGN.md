# Design System & Visual Authority: LogicMaster CS121

## Design World: Modern Dark & Tech with Clean Focused Ergonomics
Digital logic deals with binary signals, silicon chips, high/low voltage levels, timing diagrams, and state transitions. The design world reflects technical precision and electrical clarity while avoiding cheap gimmicks.

### Typography
- Primary Sans: `Prompt`, `Inter`, system-ui, sans-serif for clean Thai and English reading.
- Monospace / Technical: `JetBrains Mono`, `Fira Code`, monospace for boolean expressions, truth tables, state encodings ($Q_1Q_0$), timing values, and ROM hex dumps.
- Type Scale:
  - Heading 1: 1.875rem (30px) - 2.25rem (36px), font-bold, tracking tight (-0.02em)
  - Heading 2: 1.5rem (24px), font-semibold
  - Heading 3: 1.25rem (20px), font-medium
  - Body: 0.95rem (15.2px) - 1rem (16px), line-height 1.6, comfortable for studying long technical concepts
  - Micro / Meta: 0.75rem - 0.8125rem, tracking normal to wide

### Color Palette
- **Background Root (Dark Mode Default)**: `#090D16` (deep obsidian slate, rich and non-distracting)
- **Surface Elevation 1 (Card/Container)**: `#0F172A` (slate-900)
- **Surface Elevation 2 (Interactive/Highlight)**: `#1E293B` (slate-800)
- **Borders & Dividers**: `rgba(255, 255, 255, 0.08)` / `#334155`
- **Primary Accent (Digital High / Active Signal)**: `#06B6D4` (Cyan-500) to `#3B82F6` (Electric Blue)
- **Success / High State (1)**: `#10B981` (Emerald-500)
- **Warning / Clock Pulse / Don't Care**: `#F59E0B` (Amber-500)
- **Low State (0) / Danger / Reset**: `#EF4444` (Rose-500)
- **Foreground Primary**: `#F8FAFC` (Slate-50)
- **Foreground Secondary**: `#94A3B8` (Slate-400)
- **Foreground Tertiary**: `#64748B` (Slate-500)

### Light Mode Support
- Clean and Minimalist option for daytime study or printing:
  - Background: `#F8FAFC`
  - Surfaces: `#FFFFFF`, `#F1F5F9`
  - Borders: `#E2E8F0`
  - Text: `#0F172A`, `#475569`

### Surface Elevation & Micro-interactions
- Cards use crisp 1px borders `border border-slate-800` with subtle soft ambient drop shadows.
- Micro-interactions:
  - Interactive switches click with haptic-like visual glow and immediate circuit response.
  - Truth table rows highlight upon input toggling.
  - K-Map cells toggle between 0, 1, and X with color-coded groupings.
  - Confetti burst on completing chapters or passing quizzes.
  - Auto-save indicator: unobtrusive glowing pill "บันทึกอัตโนมัติแล้ว" with last saved timestamp.
