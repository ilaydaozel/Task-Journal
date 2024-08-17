import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils, DraftEditorCommand, Modifier } from 'draft-js';
import React, { CSSProperties, useRef } from 'react';
import FormatButton from './FormatButton';
import ColorControls from './ColorControls';

interface TextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

interface ColorStyleMap {
  [key: string]: {
    color: string;
  };
}

const colorStyleMap: ColorStyleMap = {
  red: { color: 'rgba(255, 0, 0, 1.0)' },
  orange: { color: 'rgba(255, 127, 0, 1.0)' },
  yellow: { color: 'rgba(180, 180, 0, 1.0)' },
  green: { color: 'rgba(0, 180, 0, 1.0)' },
  blue: { color: 'rgba(0, 0, 255, 1.0)' },
  indigo: { color: 'rgba(75, 0, 130, 1.0)' },
  violet: { color: 'rgba(127, 0, 255, 1.0)' },
};


// Define the styles with correct `userSelect` type
const styles: { [key: string]: CSSProperties } = {
  root: {
      fontFamily: 'Georgia, serif',
      fontSize: 14,
      maxHeight: '50vh',
  },
  editor: {
      borderTop: '1px solid #ddd',
      cursor: 'text',
      fontSize: 16,
      marginTop: 20,
      paddingTop: 20,
      minHeight: 200,
      overflowY: 'auto', // Enable vertical scrolling
  },
  controls: {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: 14,
      marginBottom: 10,
      userSelect: 'none' as 'none', // Use the appropriate UserSelect type value
  },
  styleButton: {
      color: '#999',
      cursor: 'pointer',
      marginRight: 16,
      padding: '2px 0',
  },
  };
  
  
const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder = '' }) => {
  const [editorState, setEditorState] = React.useState(() => 
    value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : EditorState.createEmpty()
  );
  const editorRef = useRef<Editor>(null);

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  
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

  const toggleColor = (color: string) => {
    const selection = editorState.getSelection();
    let nextContentState = editorState.getCurrentContent();
    const currentStyle = editorState.getCurrentInlineStyle();

    // Remove existing color styles from the selection
    Object.keys(colorStyleMap).forEach(existingColor => {
      nextContentState = Modifier.removeInlineStyle(nextContentState, selection, existingColor);
    });

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

    if (selection.isCollapsed()) {
      // Apply each style individually
      currentStyle.forEach(style => {
        if (style) {
          nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, style);
        }
      });

      // Toggle the selected color style if it is not already applied
      if (!currentStyle.has(color)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color);
      }
    } else {
      // If the selection is not collapsed, just apply the new color style
      if (!currentStyle.has(color)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color);
      }
    }

    handleChange(nextEditorState);
  };

  return (
    <div style={styles.root} className="relative w-full h-full flex flex-col">
      <div className="flex mb-4 space-x-2">
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
        <ColorControls editorState={editorState} onToggle={toggleColor} />
      </div>
      <div style={styles.editor} onClick={focus} className="w-full p-4 border rounded-md min-h-24 border-gray-300">
        <Editor
        customStyleMap={colorStyleMap}
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          ref={editorRef}
        />
      </div>
    </div>

    
  );
};

export default TextEditor;
