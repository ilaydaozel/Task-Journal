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
  isEditableWhenClicked?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  initialValue,
  onSave,
  onDelete,
  placeholder = '',
  isEditableWhenClicked = false
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue || "");

  const handleSave = () => {
    if (editedValue !== initialValue) {
      onSave(editedValue);
    }
    setEditMode(false);
  };


  return (
    <div className={`w-full h-full text-left overflow-wrap break-all text-xs min-w-10 min-h-8 relative ${editMode && "p-6 border b-1 border-primary-400"}`}>
      {editMode ? (
        <div className="relative w-full h-full flex flex-col">
          <TextEditor
            value={editedValue}
            onChange={setEditedValue}
            placeholder={placeholder}
          />
          <div className="flex gap-4 p-2 mt-2 font-bold text-md">
            <button
              onClick={handleSave}
              className="text-inProgress hover:scale-105"
              disabled={!editMode}
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="text-text1-600 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-2">
          <div
            className="w-full min-h-8 cursor-pointer p-2 border rounded-md flex-grow"
            onClick={() => isEditableWhenClicked && setEditMode(true)}
            dangerouslySetInnerHTML={{ __html: convertRawToHTML(editedValue) || placeholder }}
          />
          <div className="flex gap-4 pl-2 font-bold text-md">
            <button
              onClick={() => { setEditMode(true);}}
              className="text-primary-700 hover:scale-105"
            >
              Edit
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-text1-600 hover:scale-105"
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
