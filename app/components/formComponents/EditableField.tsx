import React, { useState, useRef, useEffect } from 'react';

const EditableField = ({ initialValue, onSave}: { initialValue: string | null, onSave: (newValue: string) => void }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLTextAreaElement>(null);
    
  const makeStringClickable = (text: string): React.ReactNode[] => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split the text into parts (links, lists, and non-links)
    const parts = text.split(urlRegex);

    const result = parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{part}</a>
        );
      } else {
        // Preserve newlines if there's a line break (\n)
        const lines = part.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            <ul>{line}</ul>
          </React.Fragment>
        ));
        return <React.Fragment key={index}>{lines}</React.Fragment>;
      }
    });
  
    return result;
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if(editedValue !== initialValue){
            onSave(editedValue);
        }
        setEditMode(false);
      }
    };

    if (editMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode, editedValue, initialValue, onSave]);


  return (
    <div className= 'text-left p-2 border overflow-wrap break-all text-xs min-w-10 min-h-8 relative' onClick={() => setEditMode(true)}>
        {editMode && (
          <textarea
            ref={inputRef}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className='absolute resize-none inset-0 w-full h-full shadow-lg border border-text1-100 scale-102 z-10'
          />
        ) }
        <div className='min-w-16 min-h-8'>
          {makeStringClickable(editedValue || "")}
        </div>
    </div>
  );
};

export default EditableField;
