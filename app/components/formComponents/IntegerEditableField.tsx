import React, { useState, useRef, useEffect } from 'react';

const IntegerEditableField = ({ initialValue, onSave}: { initialValue: number | null, onSave: (newValue: number) => void }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState<number | string>(initialValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if(editedValue !== initialValue){
          const newValue = parseInt(editedValue as string, 10);
          if (!isNaN(newValue)) {
            onSave(newValue);
          }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditedValue(value);
  };

  return (
    <div className='text-left p-2 border overflow-wrap break-all text-xs min-w-10 min-h-8 relative' onClick={() => setEditMode(true)}>
      {editMode ? (
        <input
          ref={inputRef}
          type="text"
          value={editedValue}
          onChange={handleChange}
          className='absolute inset-0 w-full h-full shadow-lg border border-text1-100 scale-102 z-10'
        />
      ) : (
        <div className='min-w-16 min-h-8'>
          {editedValue}
        </div>
      )}
    </div>
  );
};

export default IntegerEditableField;
