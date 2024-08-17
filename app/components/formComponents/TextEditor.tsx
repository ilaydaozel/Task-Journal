import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import React from 'react';
import FormatButton from './FormatButton';

interface TextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder = '' }) => {
  const [editorState, setEditorState] = React.useState(() => 
    value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
  );

  const handleChange = (state: EditorState) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    onChange(JSON.stringify(rawContent));
  };

  const handleFormat = (command: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, command);
    handleChange(newState);
  };

  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex mb-2 space-x-2">
      <FormatButton
          onClick={() => handleFormat("BOLD")}
          icon={<strong>B</strong>}
          label="Bold"
        />
        <FormatButton
          onClick={() => handleFormat("UNDERLINE")}
          icon={<u>U</u>}
          label="Underline"
        />
        <FormatButton
          onClick={() => handleFormat("ITALIC")}
          icon={<em>I</em>}
          label="Italic"
        />
        <FormatButton
          onClick={() => handleFormat("STRIKETHROUGH")}
          icon={<s>S</s>}
          label="Strikethrough"
        />
        <FormatButton
          onClick={() => handleFormat("CODE")}
          icon={<code>Code</code>}
          label="Code"
        />
      </div>
      <div className="w-full p-2 border rounded-md min-h-10">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextEditor;
