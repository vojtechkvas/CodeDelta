import { Bot, Loader, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { ButtonCopy } from "../components/ButtonCopy.tsx";

export interface AiResponsePanelProps {
  aiResponse: string;
  isLoading: boolean;
  error: string | null;
}
/**
 * Displays the generated AI response and a copy button.
 * @param {AiResponsePanelProps} props
 */
export const AiResponsePanel = ({
  aiResponse,
  isLoading,
  error,
}: AiResponsePanelProps) => (
  /*

  const shouldRenderPanel =( isLoading || error || aiResponse);

  if (!shouldRenderPanel) {
    return null;
  }

   
    */

  <div className="bg-slate-800/70 backdrop-blur rounded-lg border border-slate-700 shadow-lg p-4 hover:border-purple-500">
    {/* 1. Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-purple-500 flex items-center gap-2">
        <Bot className="w-5 h-5" /> AI Code Review
      </h2>

      {/* Copy Button: Now uses the reusable component */}
      {aiResponse && !isLoading && (
        <ButtonCopy textToCopy={aiResponse} buttonText="Copy Review" />
      )}
    </div>

    {/* 2. Content Area */}

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
        <pre className="font-sans whitespace-pre-wrap">
          <ReactMarkdown>{aiResponse}</ReactMarkdown>
        </pre>
      </div>
    )}
  </div>
);
