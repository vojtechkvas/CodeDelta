export interface EditorPanelProps {
    title: string;
    code: string;
    onCodeChange: (newCode: string) => void;
    colorClass: string;
}

/**
 * Code Editor Textarea Component for input.
 * @param {EditorPanelProps} props
 */
export const EditorPanel = ({ title, code, onCodeChange, colorClass }: EditorPanelProps) => (
    //  blue
    <div className={`bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 shadow-2xl p-4 transition-all hover:border-${colorClass}`}>
        <h2 className={`text-xl font-semibold mb-3 flex items-center gap-2 text-${colorClass}`}>{title}</h2>
        <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className={`w-full h-64 bg-slate-900 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-600 focus:border-${colorClass}  focus:outline-none  focus:ring-2 focus:ring-${colorClass}/50 resize-none    shadow-inner`}
            spellCheck={false}
        />
    </div>
);
