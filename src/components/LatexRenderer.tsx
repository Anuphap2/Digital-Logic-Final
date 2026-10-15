import React from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, displayMode = false, className = '' }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode,
      throwOnError: false,
    });
    return (
      <span 
        className={`inline-math ${displayMode ? 'block my-3 text-center overflow-x-auto py-1' : 'inline-block px-1 align-baseline'} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (err) {
    return <code className={`font-mono text-sm text-[#cc785c] ${className}`}>{math}</code>;
  }
};

interface LatexRendererProps {
  content: string;
  className?: string;
}

/**
 * LatexRenderer parses mixed Markdown and LaTeX content:
 * - Display math: $$ ... $$
 * - Inline math: $ ... $
 * - Markdown tables, bold, lists, and code blocks
 */
export const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Split content by paragraphs or block lines
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const renderInline = (text: string): React.ReactNode => {
    // Regex matches inline math $...$
    // Split on $...$ but avoid matching empty or escaped
    const parts = text.split(/(\$[^\$]+?\$)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const mathExpr = part.slice(1, -1);
        try {
          const html = katex.renderToString(mathExpr, {
            displayMode: false,
            throwOnError: false,
          });
          return (
            <span 
              key={idx} 
              className="inline-math align-baseline mx-0.5" 
              dangerouslySetInnerHTML={{ __html: html }} 
            />
          );
        } catch {
          return <span key={idx} className="font-mono text-[#cc785c]">{part}</span>;
        }
      }

      // Handle bold **text**
      const boldParts = part.split(/(\*\*[^\*]+?\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
          return <strong key={`${idx}-${bIdx}`} className="font-semibold text-[#141413] dark:text-[#faf9f5]">{bPart.slice(2, -2)}</strong>;
        }
        return bPart;
      });
    });
  };

  const flushTable = (keyPrefix: number) => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const dataRows = tableRows.slice(1);

    elements.push(
      <div key={`table-${keyPrefix}`} className="overflow-x-auto my-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f5f0e8] dark:bg-[#1f1e1b] border-b border-[#e6dfd8] dark:border-[#252320]">
              {header.map((col, cIdx) => (
                <th key={cIdx} className="p-2.5 font-bold text-[#141413] dark:text-[#faf9f5]">
                  {renderInline(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6dfd8] dark:divide-[#252320]">
            {dataRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#f5f0e8]/50 dark:hover:bg-[#252320]/40 transition">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2.5 text-[#3d3d3a] dark:text-[#a09d96]">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    tableRows = [];
    inTable = false;
  };

  const flushCode = (keyPrefix: number) => {
    if (codeBlockLines.length === 0) return;
    elements.push(
      <pre key={`code-${keyPrefix}`} className="my-3 p-4 rounded-xl bg-[#181715] text-[#faf9f5] border border-[#252320] font-mono text-xs overflow-x-auto leading-relaxed">
        {codeBlockLines.join('\n')}
      </pre>
    );
    codeBlockLines = [];
    inCodeBlock = false;
  };

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Check code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCode(i);
      } else {
        if (inTable) flushTable(i);
        inCodeBlock = true;
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      i++;
      continue;
    }

    // Check block math: $$ ... $$
    if (line.startsWith('$$') && line.endsWith('$$') && line.length >= 4) {
      if (inTable) flushTable(i);
      const mathExpr = line.slice(2, -2).trim();
      try {
        const html = katex.renderToString(mathExpr, {
          displayMode: true,
          throwOnError: false,
        });
        elements.push(
          <div 
            key={`block-math-${i}`} 
            className="my-3.5 p-3 rounded-xl bg-[#f5f0e8]/60 dark:bg-[#1f1e1b] border border-[#e6dfd8] dark:border-[#252320] overflow-x-auto text-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        elements.push(
          <div key={`block-math-err-${i}`} className="my-2 p-2 font-mono text-sm text-[#cc785c]">
            {line}
          </div>
        );
      }
      i++;
      continue;
    }

    // Check markdown table
    if (line.startsWith('|') && line.endsWith('|')) {
      // Check if separator line |---|---|
      if (line.match(/^\|[\s\-:]+(\|[\s\-:]+)+\|$/)) {
        // Just separator, skip adding as row
      } else {
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        inTable = true;
        tableRows.push(cells);
      }
      i++;
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    // Empty line
    if (!line) {
      i++;
      continue;
    }

    // Bullet point
    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start space-x-2 my-1 text-sm text-[#3d3d3a] dark:text-[#a09d96]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] mt-2 shrink-0" />
          <div className="flex-1 leading-relaxed">{renderInline(line.slice(2))}</div>
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-2 text-sm text-[#3d3d3a] dark:text-[#a09d96] leading-relaxed">
        {renderInline(line)}
      </p>
    );

    i++;
  }

  if (inTable) flushTable(lines.length);
  if (inCodeBlock) flushCode(lines.length);

  return <div className={`latex-rendered-content ${className}`}>{elements}</div>;
};
