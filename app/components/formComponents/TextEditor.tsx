import React, { useRef, useEffect } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder = '' }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand('createLink', false, url);

      const selection = window.getSelection();
      console.log("select")
      if (selection && selection.anchorNode) {
        const linkElement = selection.anchorNode.parentElement as HTMLAnchorElement;
        console.log("linkElement", linkElement)
        if (linkElement) {
          linkElement.style.color = 'blue';
          linkElement.style.textDecoration = 'underline';
          linkElement.target = '_blank';
        }
      }
    }
  };

  // Display the placeholder text if the editor is empty
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const innerHTML = (e.target as HTMLDivElement).innerHTML;
    onChange(innerHTML);
  };


  return (
    <div className="relative w-full flex flex-col">
      <div className="flex mb-2 space-x-2">
        <button
          onClick={() => applyFormat("bold")}
          className="p-1 bg-gray-200 rounded"
        >
          Bold
        </button>
        <button
          onClick={() => applyFormat("underline")}
          className="p-1 bg-gray-200 rounded"
        >
          Underline
        </button>
        <button
          onClick={() => applyFormat("fontSize", "1")}
          className="p-1 bg-gray-200 rounded"
        >
          Small
        </button>
        <button
          onClick={() => applyFormat("fontSize", "2")}
          className="p-1 bg-gray-200 rounded"
        >
          Medium
        </button>

        <button
          onClick={() => applyFormat("fontSize", "3")}
          className="p-1 bg-gray-200 rounded"
        >
          Large
        </button>        <button
          onClick={() => applyFormat("fontSize", "4")}
          className="p-1 bg-gray-200 rounded"
        >
          X-Large
        </button>
        <button
          onClick={addLink}
          className="p-1 bg-gray-200 rounded"
        >
          Add Link
        </button>
      </div>
      <input
      type='text'>
      
      </input>
      <div
        ref={editorRef}
        contentEditable
        className="w-full p-2 border rounded-md min-h-10"
        onInput={handleInput}
        onFocus={() => {
          if (editorRef.current?.innerHTML === placeholder) {
            editorRef.current.innerHTML = '';
            editorRef.current.classList.remove('text-gray-400');
          }
        }}
        onBlur={() => {
          if (editorRef.current?.innerHTML === '') {
            editorRef.current.innerHTML = placeholder;
            editorRef.current.classList.add('text-gray-400');
          }
        }}
        dangerouslySetInnerHTML={{ __html: value || placeholder }}
      />
    </div>
  );
};

export default TextEditor;
