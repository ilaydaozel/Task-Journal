import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder = '' }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState<number | undefined>(undefined);
    const [lineIndex, setLineIndex] = useState<number | undefined>(undefined);


    useLayoutEffect(() => {
        const editor = editorRef.current;
        if (editor && lineIndex !== undefined && offset !== undefined) {
          const lines = Array.from(editor.childNodes) as HTMLDivElement[];
          console.log("Lines in editor:", lines);
    
          // Check if lineIndex is valid
          if (lineIndex < 0 || lineIndex >= lines.length) {
            console.error("Invalid lineIndex:", lineIndex);
            return;
          }
    
          const lineNode = lines[lineIndex];
          console.log("Line node at index", lineIndex, ":", lineNode);
    
          // Ensure the lineNode is a valid Node and has text content
          if (lineNode && lineNode.childNodes.length > 0) {
            const textNode = lineNode.firstChild as Text;
            console.log("Text node:", textNode);
    
            // Adjust the offset to ensure it is within the textNode's length
            const adjustedOffset = Math.min(offset, textNode.textContent?.length || 0);
            console.log("Adjusted offset:", adjustedOffset);
    
            const newRange = document.createRange();
            newRange.setStart(textNode, adjustedOffset);
            console.log("New range start offset:", adjustedOffset);
    
            const selection = document.getSelection();
            console.log("SELECTION:", selection);
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(newRange);
              console.log("Selection range set:", newRange);
            }
          } else {
            console.error("Line node does not have child nodes or is empty.");
          }
        }
      }, [offset, lineIndex, value]);
    
      const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const selection = document.getSelection();
        console.log("*****************************");
        console.log("Handle input selection:", selection);
    
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          console.log("Selection range:", range);
    
          const selectedNode = range.startContainer;
          console.log("Selected node:", selectedNode);
    
          const lines = Array.from(editorRef.current?.childNodes || []) as HTMLDivElement[];
          const index = lines.findIndex((node) => node.contains(selectedNode));
          console.log("Line index for selected node:", index);
    
          setLineIndex(index);
          setOffset(range.startOffset); // Use startOffset to track cursor position
        }
    
        const innerHTML = (e.target as HTMLDivElement).innerHTML;
        console.log("Updated innerHTML:", innerHTML);
        onChange(innerHTML);
      };
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand('createLink', false, url);
      const selection = document.getSelection();
      if (selection && selection.anchorNode) {
        const linkElement = selection.anchorNode.parentElement as HTMLAnchorElement;
        if (linkElement) {
          linkElement.style.color = 'blue';
          linkElement.style.textDecoration = 'underline';
          linkElement.target = '_blank';
        }
      }
    }
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="flex mb-2 space-x-2">
        <button onClick={() => applyFormat("bold")} className="p-1 bg-gray-200 rounded">
          Bold
        </button>
        <button onClick={() => applyFormat("underline")} className="p-1 bg-gray-200 rounded">
          Underline
        </button>
        <button onClick={() => applyFormat("fontSize", "1")} className="p-1 bg-gray-200 rounded">
          Small
        </button>
        <button onClick={() => applyFormat("fontSize", "2")} className="p-1 bg-gray-200 rounded">
          Medium
        </button>
        <button onClick={() => applyFormat("fontSize", "3")} className="p-1 bg-gray-200 rounded">
          Large
        </button>
        <button onClick={() => applyFormat("fontSize", "4")} className="p-1 bg-gray-200 rounded">
          X-Large
        </button>
        <button onClick={addLink} className="p-1 bg-gray-200 rounded">
          Add Link
        </button>
      </div>
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
        suppressContentEditableWarning
      />
    </div>
  );
};

export default TextEditor;
