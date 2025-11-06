import { useState, useCallback, useMemo } from 'react';
import { FileCode } from 'lucide-react';
import { generateDiff } from './utils/diffCalculator';
import { EditorPanel } from './components/EditorPanel.tsx';
import { PromptActions } from './components/PromptActions.tsx';
import { PromptOutput } from './components/PromptOutput.tsx';

const initialCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

const CodeDiffPromptApp = () => {
  const [originalCode, setOriginalCode] = useState(initialCode);
  const [editedCode, setEditedCode] = useState(initialCode);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const diffOutput = useMemo(() => generateDiff(originalCode, editedCode), [originalCode, editedCode]);


  const handleGeneratePrompt = useCallback(() => {
    const prompt = `Please analyze the following code changes and provide feedback:

## Context: The user intends to refactor the code for better readability and potentially performance.



## Original Code:
\`\`\`
${originalCode}
\`\`\`

## Edited Code:
\`\`\`
${editedCode}
\`\`\`

## Diff (Unified Format):
\`\`\`
${diffOutput}
\`\`\`

Please review these changes and provide:
1. A summary of what changed.
2. Any potential bugs, security issues, or performance improvements.
3. Whether the changes follow modern best practices.`;

    setGeneratedPrompt(prompt);
  }, [originalCode, editedCode, diffOutput]);

  const handleCopyPrompt = useCallback(async () => {
    if (!generatedPrompt) return;
    try {
      const textarea = document.createElement('textarea');
      textarea.value = generatedPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [generatedPrompt]);

  const handleReset = useCallback(() => {
    setEditedCode(originalCode);
    setGeneratedPrompt('');
  }, [originalCode]);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FileCode className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Code Diff Prompt Generator
            </h1>
          </div>
          <p className="text-slate-400">Edit code and generate LLM analysis prompts instantly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <EditorPanel
            title="Original Code (Source)"
            code={originalCode}
            onCodeChange={setOriginalCode}
            colorClass="text-blue-300"
          />
          <EditorPanel
            title="Edited Code (Target)"
            code={editedCode}
            onCodeChange={setEditedCode}
            colorClass="text-purple-300"
          />
        </div>

        <PromptActions
          onGenerate={handleGeneratePrompt}
          onReset={handleReset}
        />

        {generatedPrompt && (
          <PromptOutput
            prompt={generatedPrompt}
            copied={copied}
            onCopy={handleCopyPrompt}
          />
        )}
      </div>
    </div>
  );
};

export default CodeDiffPromptApp;