'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, FileText } from 'lucide-react';

interface AIPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptText: string;
}

export function AIPromptModal({
  isOpen,
  onClose,
  promptText
}: AIPromptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = promptText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>External LLM Analysis Bridge</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              Self-Contained Behavioral Data Prompt
            </h2>
            <p className="text-xs text-zinc-500">
              This prompt packages all active user metrics, circadian drift numbers, checking frequencies, and correlation data. Paste it into any external AI (Claude, Gemini, ChatGPT) for independent analytical evaluation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 text-xs">
          <div className="flex items-center gap-2 text-zinc-600">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Character count: {promptText.length.toLocaleString()} chars</span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto bg-zinc-900 text-zinc-100 font-mono text-xs p-4 rounded-xl border border-zinc-800 leading-relaxed select-text">
          <pre className="whitespace-pre-wrap">{promptText}</pre>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
