import React, { CSSProperties, useRef, useState } from 'react';
import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import FormatButton from './FormatButton';
import ColorControls from './ColorControls';
import { createLinkDecorator, onAddLink } from './LinkComponent';
import EmojiPicker from './EmojiPicker';
import { colorStyleMap, fontSizeStyleMap } from './style';

interface TextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    fontSize: '0.8rem',
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: '1rem',
    paddingTop: '1rem',
    minHeight: '20vh',
    overflowY: 'auto',
    lineHeight: '1.2rem',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder = '' }) => {
  const decorator = createLinkDecorator();
  const [editorState, setEditorState] = useState(() =>
    value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)), decorator) : EditorState.createEmpty(decorator)
  );
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const handleEmojiSelect = (emoji: string) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const collapsedSelection = selection.isCollapsed();
    let newEditorState: EditorState = editorState;
    if (collapsedSelection) {
       const newContentState = Modifier.insertText(
        contentState,
        selection,
        emoji
      );
      newEditorState = EditorState.push(
        editorState,
        newContentState,
        'insert-characters'
      ); 
    }
    handleChange(newEditorState);
  };

  return (
    <div style={styles.root} className="relative w-full h-full flex flex-col gap-2">
      <div className="flex items-center lg:flex-row flex-col justify-between mb-4 gap-4">
        <div className="flex gap-2">
              {Object.keys(fontSizeStyleMap).map(size => (
                <FormatButton
                  key={size}
                  onClick={() => handleFormat(size)}
                  icon={<span>{size}</span>}
                  label={`Font size ${size}`}
                />
              ))}
          </div>
        <div className='flex gap-1'>
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
          <FormatButton
            onClick={() => onAddLink(editorState, setEditorState)}
            icon={<span>🔗</span>}
            label='Add Link'
          />
          <FormatButton
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            icon={<span>Emoji</span>}
            label='Emoji Picker'
          />
        </div>
        <ColorControls editorState={editorState} onToggle={toggleColor} />
      </div>

      {showEmojiPicker && (
        <EmojiPicker onSelectEmoji={handleEmojiSelect} />
      )}

      <div style={styles.editor} onClick={focus}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          customStyleMap={{ ...colorStyleMap, ...fontSizeStyleMap }}
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
            placeholder="Enter an URL..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
