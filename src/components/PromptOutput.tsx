import { Copy, Check } from 'lucide-react';

export interface PromptOutputProps {
    prompt: string;
    copied: boolean;
    onCopy: () => void;
}

/**
 * Displays the generated prompt and a copy button.
 * @param {{ PromptOutputProps }} props
 */
export const PromptOutput = ({ prompt, copied, onCopy }: PromptOutputProps) => (
    <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-4">
        <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-green-300">Generated Prompt</h2>
            <button
                onClick={onCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${copied ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy className="w-4 h-4" />
                        Copy Prompt
                    </>
                )}
            </button>
        </div>
        <pre className="w-full bg-slate-900 text-slate-100 font-mono text-sm p-4 rounded border border-slate-600 overflow-x-auto whitespace-pre-wrap">
            {prompt}
        </pre>
    </div>
);