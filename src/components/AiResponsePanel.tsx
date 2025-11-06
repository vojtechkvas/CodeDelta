import React, { useState, useCallback } from 'react';

import { Bot, Copy, Check, Loader, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';


interface AiResponsePanelProps {
  
  aiResponse: string | null;
  
  isLoading: boolean;
  
  error: string | null;
}

const AiResponsePanel: React.FC<AiResponsePanelProps> = ({
  aiResponse,
  isLoading,
  error,
}) => {
  const [aiCopied, setAiCopied] = useState(false);


  const handleCopyAiResponse = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setAiCopied(true);
      setTimeout(() => setAiCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy AI response:', err);
      // Fallback behavior
      setAiCopied(true);
      setTimeout(() => setAiCopied(false), 2000);
    }
  };
  const shouldRenderPanel = isLoading || error || aiResponse;

  if (!shouldRenderPanel) {
    return null; 
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur rounded-xl border border-slate-700 shadow-xl p-5  hover:border-purple-500">
      
      {/* 1. Header (Always shown when the panel is rendered) */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-purple-500 flex items-center gap-2">
          <Bot className="w-5 h-5" /> AI Code Review
        </h2>
        
        {/* Copy Button (Shown only when response exists and is not loading) 
        flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm transition-all shadow-md active:scale-[0.98]
        */}
        {aiResponse && !isLoading && (
          <button
            onClick={handleCopyAiResponse}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-green-600 hover:bg-green-700"
          >  
            {aiCopied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Review
              </>
            )}
          </button>
        )}
      </div>
      
      {/* 2. Content Area (Conditional Display) */}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900/50 rounded-lg p-4">
          <Loader className="w-8 h-8 animate-spin text-teal-400 mb-3" />
          <p className="text-slate-400">Analyzing code changes...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg h-[400px]">
          <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
          <p className="font-mono text-sm">{error}</p>
        </div>
      )}

      {/* Success/Response State */}
      {aiResponse && !isLoading && (
        <div className="w-full h-[400px] bg-slate-900 text-slate-200 p-4 rounded-lg border border-slate-600 overflow-auto whitespace-pre-wrap shadow-inner">
          {/* Using <pre> inside a styled div for formatting and scroll */}
          <pre className="font-sans whitespace-pre-wrap"><ReactMarkdown>{aiResponse}</ReactMarkdown></pre>
        </div>
      )}
    </div>
  );
};

export default AiResponsePanel;