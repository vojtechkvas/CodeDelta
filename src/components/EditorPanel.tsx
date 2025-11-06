export interface EditorPanelProps {
    title: string;
    code: string;
    onCodeChange: (newCode: string) => void;
    colorClass: string;
}

/**
 * Code Editor Textarea Component for input.
 * @param {PromptActionsProps} props
 */
export const EditorPanel = ({ title, code, onCodeChange, colorClass }: EditorPanelProps) => (
    <div className={`bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-4`}>
        <h2 className={`text-xl font-semibold mb-3 ${colorClass}`}>{title}</h2>
        <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className={`w-full h-64 bg-slate-900 text-slate-100 font-mono text-sm p-4 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-500/50 resize-none ${colorClass.replace('-300', '-500')}`}
            spellCheck={false}
        />
    </div>
);
