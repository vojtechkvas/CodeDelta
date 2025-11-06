export interface ICodeState {
  originalCode: string;
  editedCode: string;
  userInstruction: string;
  diffOutput: string | null;
}