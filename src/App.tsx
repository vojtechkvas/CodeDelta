import { useState, useMemo } from 'react';
import {  FileCode,  Loader } from 'lucide-react';

import { useGeminiReview } from './hooks/useGeminiReview.tsx';
import { generateDiff } from './utils/diffCalculator'; 
import { EditorPanel } from './components/EditorPanel.tsx';
import { PromptOutput } from './components/PromptOutput.tsx';
import  AiResponsePanel  from './components/AiResponsePanel.tsx';
 

const initialOriginalCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

const initialEditedCode = `/**
 * Calculates the total price of all items in an array.
 * @param {Array<Object>} items - List of items, each with a price property.
 * @returns {number} The total calculated price.
 */
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}`;



const CodeDiffPromptApp = () => {
  const [originalCode, setOriginalCode] = useState<string>(initialOriginalCode);
  const [editedCode, setEditedCode] = useState<string>(initialEditedCode);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Use the custom hook for AI-related state and fetching
  const { aiResponse, isLoading, error, fetchReview, setAiResponse, setError, setIsLoading } = useGeminiReview();

  // New state for AI output copy
  //  const [aiCopied, setAiCopied] = useState<boolean>(false);

  const diff = useMemo(() => generateDiff(originalCode, editedCode), [originalCode, editedCode]);


  const handleGeneratePrompt = () => {

    const prompt = `${diff}`;
 
    setGeneratedPrompt(prompt);
    fetchReview(prompt);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
      // Fallback behavior
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  


  const handleReset = () => {
    setOriginalCode(initialOriginalCode);
    setEditedCode(initialEditedCode);
    setGeneratedPrompt('');
    setAiResponse(''); // Resetting state from the hook
    setError(null);    // Resetting state from the hook
    setIsLoading(false); // Resetting state from the hook
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FileCode className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Code Diff AI Reviewer
            </h1>
          </div>
          <p className="text-slate-400">Edit code to create a diff and get instant feedback from a code review AI.</p>
        </div>


        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <EditorPanel
            title="Original Code (Source)"
            code={originalCode}
            onCodeChange={setOriginalCode}
            colorClass="blue-500"
          />
          <EditorPanel
            title="Edited Code (Target)"
            code={editedCode}
            onCodeChange={setEditedCode}
            colorClass="purple-500"
          />
        </div>
      
         
        {/* Controls */}
        <div className="flex gap-4 justify-center mb-10">
          <button
            onClick={handleGeneratePrompt}
            disabled={isLoading}
            className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold transition-all transform shadow-lg 
                       ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin mx-auto text-white" />
            ) : (
              'Generate Prompt & Get AI Review'
            )}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-all shadow-md active:scale-[0.98]"
          >
            Reset Code
          </button>
        </div>

        {/* Generated Prompt and AI Response */}
        {(generatedPrompt || isLoading || aiResponse || error) && (


          <div className="grid lg:grid-cols-2 gap-6">
            
        
   
         
            <PromptOutput
              prompt={generatedPrompt}
              copied={copied}
              onCopy={handleCopyPrompt}
            />
       

          <AiResponsePanel
            aiResponse={aiResponse}
            isLoading={isLoading}
            error={error}
          /> 

           </div>  
        )}

      </div>
    </div>
  );
};

export default CodeDiffPromptApp;





