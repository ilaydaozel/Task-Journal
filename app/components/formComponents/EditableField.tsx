import React, { useState} from 'react';
import TextEditor from './NoteEditor/TextEditor';
import { convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';


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

const convertRawToHTML = (rawContent: string | null): string => {
  if (!rawContent) return '';
  console.log(rawContent);
  try {
    // Parse the raw JSON
    const contentState = convertFromRaw(JSON.parse(rawContent));

    // Convert ContentState to HTML
    const html = convertToHTML({
      styleToHTML: (style) => {
        // Handle custom styles
        if (colorStyleMap[style]) {
          return <span style={{ color: colorStyleMap[style].color }} />;
        }
        return undefined;
      },
      blockToHTML: (block) => {
        // Handle custom block types if needed
        if (block.type === 'blockquote') {
          return <blockquote />;
        }
        return undefined;
      },
      entityToHTML: (entity, originalText) => {
        // Handle LINK entities
        if (entity.type === 'LINK') {
          const { url } = entity.data;
          return <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: colorStyleMap['blue'].color, textDecoration: 'underline'}}>{originalText}</a>;
        }
        return undefined;
      },
    })(contentState);

    return html;
  } catch (e) {
    console.error('Error converting raw content to HTML:', e);
    return '';
  }
};

// Function to check if a string is valid JSON
const isValidJson = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
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
  isEditableWhenClicked = false,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(() => {
    // Initialize state based on contentType
      if (initialValue) {
        return isValidJson(initialValue) ? initialValue : JSON.stringify({ blocks: [{ key: 'a', text: initialValue, type: 'unstyled' }], entityMap: {} });
      }
      return initialValue || "";
    });

  const handleSave = () => {
    if (editedValue !== initialValue) {
      onSave(editedValue);
    }
    setEditMode(false);
  };


  return (
    <div className={`w-full h-full text-left overflow-wrap break-all text-xs min-w-10 min-h-24 relative ${editMode && "p-6 border b-1 border-primary-400"}`}>
      {editMode ? (
        <div className="relative w-full h-full flex flex-col gap-2">
          <TextEditor
            value={editedValue}
            onChange={setEditedValue}
            placeholder={placeholder}
          />
          <div className="flex gap-4 mt-2 font-bold text-base">
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
            className="w-full h-full min-h-16 cursor-pointer px-4 py-8 border flex-grow text-sm"
            onClick={() => isEditableWhenClicked && setEditMode(true)}
            dangerouslySetInnerHTML={{ __html: convertRawToHTML(editedValue) || placeholder }}
          />
          <div className="flex gap-4 font-bold text-base">
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
