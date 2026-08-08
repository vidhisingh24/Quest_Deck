'use client';

import React from 'react';
import { Sparkles, Info, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

interface ArticleMarkdownRendererProps {
  content: string;
}

export const ArticleMarkdownRenderer: React.FC<ArticleMarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div className="space-y-4 text-warm-900">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // Header 3: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-2xl font-extrabold text-warm-900 pb-2 border-b border-warm-200 mt-6 mb-3">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // Header 4: #### Subtitle
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-lg font-extrabold text-warm-900 mt-5 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky" />
              {trimmed.replace('#### ', '')}
            </h4>
          );
        }

        // Callout Box: > [!NOTE] or > [!IMPORTANT] or > Pro Tip
        if (trimmed.startsWith('>') || trimmed.includes('[!NOTE]') || trimmed.includes('[!IMPORTANT]')) {
          const text = trimmed.replace(/^>\s*/, '').replace(/\[!(NOTE|IMPORTANT|TIP)\]/g, '').trim();
          const isImportant = trimmed.includes('IMPORTANT');
          
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-3 my-4 ${
                isImportant
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950 shadow-xs'
                  : 'bg-sky-light/50 border-sky/40 text-sky-deep shadow-xs'
              }`}
            >
              {isImportant ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <Lightbulb className="w-5 h-5 text-sky shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                {parseInlineFormatting(text)}
              </div>
            </div>
          );
        }

        // Numbered List: 1. Item
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^\d+/)?.[0];
          const text = trimmed.replace(/^\d+\.\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-warm-50/60 border border-warm-200/80 my-1">
              <span className="w-6 h-6 rounded-lg bg-sky text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                {num}
              </span>
              <div className="text-xs sm:text-sm text-warm-800 font-medium leading-relaxed mt-0.5">
                {parseInlineFormatting(text)}
              </div>
            </div>
          );
        }

        // Bulleted List: - Item or * Item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const text = trimmed.replace(/^[-*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 my-1 pl-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <div className="text-xs sm:text-sm text-warm-800 font-medium leading-relaxed">
                {parseInlineFormatting(text)}
              </div>
            </div>
          );
        }

        // Regular Paragraph
        return (
          <p key={idx} className="text-xs sm:text-sm text-warm-800 leading-relaxed font-medium">
            {parseInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
};

// Helper function to parse **bold** and `code` inline elements cleanly
function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex to match **bold** or `code`
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-warm-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded-md bg-warm-200/70 text-sky-deep font-mono text-xs font-bold border border-warm-300">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
