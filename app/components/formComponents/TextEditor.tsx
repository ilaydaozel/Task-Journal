import React, { CSSProperties, useRef, useState, useEffect } from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils, Modifier, CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
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
    overflowY: 'auto',
  },
  controls: {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none' as 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder = '' }) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const editorRef = useRef<Editor>(null);


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

    Object.keys(colorStyleMap).forEach(existingColor => {
      nextContentState = Modifier.removeInlineStyle(nextContentState, selection, existingColor);
    });

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

    if (selection.isCollapsed()) {
      currentStyle.forEach(style => {
        if (style) {
          nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, style);
        }
      });

      if (!currentStyle.has(color)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color);
      }
    } else {
      if (!currentStyle.has(color)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color);
      }
    }

    handleChange(nextEditorState);
  };

  const promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setShowURLInput(true);
      setUrlValue(url);

      setTimeout(() => document.getElementById('urlInput')?.focus(), 0);
    }
  };

  const confirmLink = (e: any) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
    setShowURLInput(false);
    setUrlValue('');
    focus();
  };

  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
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
        <FormatButton
          onClick={promptForLink}
          icon={<span>🔗</span>}
          label="Add Link"
        />
        <FormatButton
          onClick={removeLink}
          icon={<span>❌</span>}
          label="Remove Link"
        />
      </div>
      <div style={styles.editor} onClick={focus}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          customStyleMap={colorStyleMap}
        />
      </div>
      {showURLInput && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-300 shadow rounded">
          <input
            id="urlInput"
            type="text"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            onBlur={() => setShowURLInput(false)}
            onKeyDown={(e) => e.key === 'Enter' && confirmLink(e)}
            placeholder="Enter a URL..."
            style={{ width: '100%', padding: '8px' }}
          />
          <button onClick={confirmLink} className="ml-2 p-2 bg-blue-500 text-white rounded">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
