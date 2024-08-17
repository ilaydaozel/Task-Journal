import React, { useState, useRef, useEffect } from 'react';
import TextEditor from './TextEditor';
import { convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

const convertRawToHTML = (rawContent: string | null): string => {
  if (!rawContent) return '';

  try {
    // Parse the raw JSON
    const contentState = convertFromRaw(JSON.parse(rawContent));

    // Convert ContentState to HTML
    const html = convertToHTML(contentState);

    return html;
  } catch (e) {
    console.error('Error converting raw content to HTML:', e);
    return '';
  }
};

interface EditableFieldProps {
  initialValue: string | null;
  onSave: (newValue: string) => void;
  onDelete?: () => void;
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        handleSave();
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
  }, [editMode]);

  return (
    <div className="w-full h-full text-left p-2 border overflow-wrap break-all text-xs min-w-10 min-h-8 relative rounded-md">
      {editMode ? (
        <div className="relative w-full flex flex-col">
          <TextEditor
            value={editedValue}
            onChange={setEditedValue}
            placeholder={placeholder}
          />
          <div className="flex gap-2 p-2 mt-2 font-bold text-md">
            <button
              onClick={handleSave}
              className={`text-inProgress`}
              disabled={!editMode}
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="text-text1-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div
            className="w-full min-h-8 cursor-pointer p-2 border rounded-md flex-grow"
            onClick={() => setEditMode(true)}
            dangerouslySetInnerHTML={{ __html: convertRawToHTML(editedValue) || placeholder }}
          />
          <div className="flex gap-2 p-2 mt-2 font-bold text-md">
            <button
              onClick={() => { setEditMode(true);}}
              className="text-primary-700"
            >
              Edit
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-text1-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableField;
