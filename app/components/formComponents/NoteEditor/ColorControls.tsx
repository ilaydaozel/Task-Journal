import { CSSProperties } from "react";
import { EditorState } from 'draft-js';

const COLORS = [
    { label: 'Red', style: 'red' },
    { label: 'Orange', style: 'orange' },
    { label: 'Yellow', style: 'yellow' },
    { label: 'Green', style: 'green' },
    { label: 'Blue', style: 'blue' },
    { label: 'Indigo', style: 'indigo' },
    { label: 'Violet', style: 'violet' },
  ];
  
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


const colorStyleMap: { [key: string]: React.CSSProperties } = {
    red: { color: 'rgba(255, 0, 0, 1.0)' },
    orange: { color: 'rgba(255, 127, 0, 1.0)' },
    yellow: { color: 'rgba(180, 180, 0, 1.0)' },
    green: { color: 'rgba(0, 180, 0, 1.0)' },
    blue: { color: 'rgba(0, 0, 255, 1.0)' },
    indigo: { color: 'rgba(75, 0, 130, 1.0)' },
    violet: { color: 'rgba(127, 0, 255, 1.0)' },
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
        {COLORS.map(({ label, style }) => (
          <StyleButton
            key={label}
            active={currentStyle.has(style)}
            label={label}
            onToggle={onToggle}
            style={style}
          />
        ))}
      </div>
    );
  };
  
  export default ColorControls;
