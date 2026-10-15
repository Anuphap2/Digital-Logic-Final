import React from 'react';
import katex from 'katex';
import { CircuitDiagram } from './diagrams/CircuitDiagrams';

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
    return <code className={`font-mono text-sm text-[#0066cc] dark:text-[#38bdf8] ${className}`}>{math}</code>;
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
          return <span key={idx} className="font-mono text-[#0066cc] dark:text-[#38bdf8]">{part}</span>;
        }
      }

      // Handle bold **text**
      const boldParts = part.split(/(\*\*[^\*]+?\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
          return <strong key={`${idx}-${bIdx}`} className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">{bPart.slice(2, -2)}</strong>;
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
      <div key={`table-${keyPrefix}`} className="overflow-x-auto my-4 rounded-xl border border-[#e2e8f0] dark:border-[#1e293b]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f1f5f9] dark:bg-[#1e293b] border-b border-[#e2e8f0] dark:border-[#1e293b]">
              {header.map((col, cIdx) => (
                <th key={cIdx} className="p-2.5 font-bold text-[#0f172a] dark:text-[#f8fafc]">
                  {renderInline(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#1e293b]">
            {dataRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/60 transition">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2.5 text-[#334155] dark:text-[#94a3b8]">
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
      <pre key={`code-${keyPrefix}`} className="my-3 p-4 rounded-xl bg-[#0f172a] text-[#f8fafc] border border-[#1e293b] font-mono text-xs overflow-x-auto leading-relaxed">
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

    // Check markdown image: ![Alt Text](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      if (inTable) flushTable(i);
      const altText = imgMatch[1];
      const imgUrl = imgMatch[2];
      
      if (imgUrl.startsWith('diagram:')) {
        const diagramId = imgUrl.replace('diagram:', '').trim();
        elements.push(
          <div key={`diagram-${i}`} className="my-5">
            <CircuitDiagram id={diagramId} caption={altText} />
          </div>
        );
        i++;
        continue;
      }

      elements.push(
        <figure key={`img-${i}`} className="my-5 p-3 bg-[#f8fafc] dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] rounded-3xl overflow-hidden shadow-xs">
          <div className="flex justify-center bg-white dark:bg-[#0b0f19] p-4 rounded-2xl border border-[#e2e8f0]/80 dark:border-[#1e293b]">
            <img 
              src={imgUrl} 
              alt={altText} 
              className="max-h-80 w-auto object-contain rounded-xl hover:scale-[1.02] transition-transform duration-200"
              loading="lazy"
            />
          </div>
          {altText && (
            <figcaption className="mt-2.5 text-center text-xs font-mono font-medium text-[#64748b] dark:text-[#94a3b8]">
              📷 ภาพประกอบ: {altText}
            </figcaption>
          )}
        </figure>
      );
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
            className="my-3.5 p-3 rounded-xl bg-[#f8fafc] dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] overflow-x-auto text-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        elements.push(
          <div key={`block-math-err-${i}`} className="my-2 p-2 font-mono text-sm text-[#0066cc] dark:text-[#38bdf8]">
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
        <div key={`bullet-${i}`} className="flex items-start space-x-2 my-1 text-sm text-[#334155] dark:text-[#94a3b8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-2 shrink-0" />
          <div className="flex-1 leading-relaxed">{renderInline(line.slice(2))}</div>
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-2 text-sm text-[#334155] dark:text-[#94a3b8] leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  if (inTable) flushTable(lines.length);
  if (inCodeBlock) flushCode(lines.length);

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
};
