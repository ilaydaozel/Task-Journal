import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { TrashIcon } from '@heroicons/react/24/outline'; // Import the delete icon

interface EditableFieldProps {
  initialValue: string | null;
  onSave: (newValue: string) => void;
  onDelete?: () => void; // Add optional delete handler
  placeholder?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  initialValue,
  onSave,
  onDelete,
  placeholder = ''
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue || "");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (editedValue !== initialValue) {
      onSave(editedValue);
    }
    setEditMode(false);
  };
  
  return (
    <div className="w-full h-full text-left p-2 border overflow-wrap break-all text-xs min-w-10 min-h-8 relative rounded-md">
      {editMode ? (
        <div ref={editorRef} className="relative w-full flex flex-col">
          <ReactQuill
            value={editedValue}
            onChange={setEditedValue}
            placeholder={placeholder}
            className="h-full w-full"
          />
          <div className='flex gap-2 p-2'>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          )}

          </div>
        </div>
      ) : (
        <div
          className="min-w-16 min-h-8 cursor-pointer"
          onClick={() => setEditMode(true)}
          dangerouslySetInnerHTML={{ __html: editedValue }}
        />
      )}
    </div>
  );
};

export default EditableField;
