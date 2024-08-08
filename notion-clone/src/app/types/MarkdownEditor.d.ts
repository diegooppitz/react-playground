import React from 'react';

interface MarkdownEditorProps {
  insertTextAreaValue: string | null;
  newTextArea: () => void;
  saveContentTextArea: (id: string, htmlContent: string) => void;
  removeEmpty: (index: string) => void;
  isHome: boolean | null;
  id: string;
}

declare module 'MarkdownEditor' {
  const MarkdownEditorTypes: React.FC<MarkdownEditorProps>;
  export default MarkdownEditorTypes;
}
