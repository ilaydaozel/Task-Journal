import { CSSProperties } from "react";
import { EditorState } from 'draft-js';
import { colorStyleMap } from "./style";
  
// Define the styles with correct `userSelect` type
const styles: { [key: string]: CSSProperties } = {
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        display: 'inline-block',
        userSelect: 'none',
        transition: 'color 0.3s ease, background-color 0.3s ease',
    },
};

  
const StyleButton: React.FC<{ label: string, style: string, active: boolean, onToggle: (style: string) => void }> = ({ label, style, active, onToggle }) => {
    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      onToggle(style);
    };
  
    const buttonColor = colorStyleMap[style]?.color;
  
    const buttonStyle = {
      ...styles.styleButton,
      color: buttonColor,
      fontWeight: active ? 'bold' : '',
    };
  
    return (
      <span style={buttonStyle} onMouseDown={handleToggle} className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
        {label}
      </span>
    );
  };

  
const ColorControls: React.FC<{ editorState: EditorState, onToggle: (style: string) => void }> = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
      <div>
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
