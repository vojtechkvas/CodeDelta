/**
 * A proper line-by-line diff calculator that returns a unified-like diff format
 * using the Longest Common Subsequence (LCS) algorithm.
 * @param originalCode The original string content.
 * @param editedCode The edited string content.
 * @returns A string representing the diff with '+', '-', and ' ' prefixes.
 */
export const generateDiff = (originalCode: string, editedCode: string): string => {
    const originalLines = originalCode.split('\n');
    const editedLines = editedCode.split('\n');
    const m = originalLines.length;
    const n = editedLines.length;

    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (originalLines[i - 1] === editedLines[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let diff: string[] = [];
    let i = m;
    let j = n;

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && originalLines[i - 1] === editedLines[j - 1]) {
            diff.push(`  ${originalLines[i - 1]}`);
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            diff.push(`+ ${editedLines[j - 1]}`);
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            diff.push(`- ${originalLines[i - 1]}`);
            i--;
        }
    }

    return diff.reverse().join('\n');
};