/**
 * A simple line-by-line diff calculator that returns a unified-like diff format.
 * @param originalCode The original string content.
 * @param editedCode The edited string content.
 * @returns A string representing the diff with '+', '-', and ' ' prefixes.
 */
export const generateDiff = (originalCode: string, editedCode: string): string => {
    const originalLines = originalCode.split('\n');
    const editedLines = editedCode.split('\n');

    let diff = '';
    const maxLines = Math.max(originalLines.length, editedLines.length);

    for (let i = 0; i < maxLines; i++) {
        const origLine = originalLines[i] || '';
        const editLine = editedLines[i] || '';

        if (origLine !== editLine) {
            if (origLine && originalLines.length >= i + 1) {
                diff += `- ${origLine}\n`;
            }
            if (editLine && editedLines.length >= i + 1) {
                diff += `+ ${editLine}\n`;
            }
        } else if (origLine) {
            diff += `  ${origLine}\n`;
        }
    }

    return diff.trimEnd();
};
