interface PromptActionsProps {
  onGenerate: () => void;
  onReset: () => void;
}

/**
 * Buttons for initiating prompt generation and resetting code.
 * @param {PromptActionsProps} props
 */
export const PromptActions = ({ onGenerate, onReset }: PromptActionsProps) => (
  <div className="flex gap-3 justify-center mb-6">
    <button
      onClick={onGenerate}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
    >
      Generate Prompt
    </button>
    <button
      onClick={onReset}
      className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
    >
      Reset to Original
    </button>
  </div>
);
