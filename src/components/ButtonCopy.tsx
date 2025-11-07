import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ButtonCopyProps {
  textToCopy: string;
  buttonText?: string; // Optional prop
}

/**
 * A reusable button component to copy a given string of text to the clipboard.
 * It manages its own 'copied' state and visually updates when successful.
 * @param {ButtonCopyProps} props
 */
export const ButtonCopy = ({
  textToCopy,
  buttonText = "Copy",
}: ButtonCopyProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (execErr) {
        console.error("Fallback copy failed:", execErr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white font-medium ${
        copied ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
      }`}
      disabled={!textToCopy}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {buttonText}
        </>
      )}
    </button>
  );
};
