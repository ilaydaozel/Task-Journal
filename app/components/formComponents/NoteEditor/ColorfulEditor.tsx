import React, { useState, useRef, CSSProperties } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ColorControls from './ColorControls';
import { colorStyleMap } from './style';

const ColorfulEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef<Editor>(null);

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const onChange = (state: EditorState) => {
    setEditorState(state);
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

    onChange(nextEditorState);
  };

  return (
    <div style={styles.root}>
      <ColorControls editorState={editorState} onToggle={toggleColor} />
      <div style={styles.editor} onClick={focus}>
        <Editor
          customStyleMap={colorStyleMap}
          editorState={editorState}
          onChange={onChange}
          placeholder="Write something colorful..."
          ref={editorRef}
        />
      </div>
    </div>
  );
};

export default ColorfulEditor;

// Define the styles with correct `userSelect` type
const styles: { [key: string]: CSSProperties } = {
  root: {
      fontFamily: 'Georgia, serif',
      fontSize: 14,
      padding: 20,
      width: 600,
  },
  editor: {
      borderTop: '1px solid #ddd',
      cursor: 'text',
      fontSize: 16,
      marginTop: 20,
      minHeight: 400,
      paddingTop: 20,
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
  