import { FileCode } from "lucide-react";
import { ButtonCopy } from "../components/ButtonCopy.tsx";

export interface PromptOutputProps {
  prompt: string;
}

/**
 * Displays the generated prompt and a copy button.
 * @param {PromptOutputProps} props
 */
export const PromptOutput = ({ prompt }: PromptOutputProps) => (
  // NOTE: Alignment fix: Added shadow-lg for consistency with AiResponsePanel
  <div className="bg-slate-800/70 backdrop-blur rounded-lg border border-slate-700 shadow-lg p-4 hover:border-blue-500">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
        <FileCode className="w-5 h-5" /> Code Diff Prompt
      </h2>
      {/* Copy Button: Now uses the reusable component */}
      <ButtonCopy textToCopy={prompt} buttonText="Copy Prompt" />
    </div>
    <pre className="w-full h-[400px] bg-slate-900 text-slate-100 font-mono text-sm p-4 rounded border border-slate-600 overflow-auto whitespace-pre-wrap">
      {prompt}
    </pre>
  </div>
);
