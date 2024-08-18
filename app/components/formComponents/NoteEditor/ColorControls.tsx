import { CSSProperties } from "react";
import { EditorState } from 'draft-js';
import { colorStyleMap } from "./style";
  

const StyleButton: React.FC<{ label: string, style: string, active: boolean, onToggle: (style: string) => void }> = ({ label, style, active, onToggle }) => {
    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      onToggle(style);
    };
  
    const buttonColor = colorStyleMap[style]?.color;
  
    const buttonStyle: CSSProperties = {
      color: buttonColor? buttonColor: '#ddd',
      fontWeight: active ? 'bold' : '',
      fontSize: active ? '1rem': '0.9rem',
      cursor: 'pointer',
      display: 'inline-block',
      userSelect: 'none',
      transition: 'color 0.3s ease, font-weight 0.3s ease',
    };
  
    return (
      <span style={buttonStyle} onMouseDown={handleToggle} className="hover:scale-110">
        {label}
      </span>
    );
  };

  
const ColorControls: React.FC<{ editorState: EditorState, onToggle: (style: string) => void }> = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(colorStyleMap).map((key) => (
          <StyleButton
            key={key}
            active={currentStyle.has(key)}
            label={key}
            onToggle={onToggle}
            style={key}
          />
        ))}
      </div>
    );
  };
  
  export default ColorControls;
