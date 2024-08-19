import { CSSProperties } from "react";

export interface ColorStyleMap {
    [key: string]: {
      color: string;
    };
  }

export interface FontSizeMap {
[key: string]: {
    fontSize: string;
};
}
  
export const colorStyleMap: ColorStyleMap = {
    red: { color: 'rgba(201, 60, 50, 1.0)' },
    orange: { color: 'rgba(255, 127, 0, 1.0)' },
    yellow: {  color: 'rgba(246, 189, 96, 1.0)' },
    blue: { color: 'rgba(0, 0, 255, 1.0)' },
    darkBlue: { color: 'rgba(59, 95, 153, 1.0)' },
    pink : { color: 'rgba(184, 154, 152, 1.0)' },
    violet: { color: 'rgba(127, 0, 255, 1.0)' },
    green: { color: 'rgba(111, 184, 138, 1.0)'},
    darkGreen: { color: 'rgba(89, 130, 119, 1.0)' },
    gray: { color: 'rgba(107, 114, 128, 1.0)' },
    darkGray: { color: 'rgba(31, 41, 55, 1.0)' },
    black: { color: 'rgba(0, 0, 0, 1.0)' },
  };
  
export const fontSizeStyleMap: FontSizeMap = {
    xs: { fontSize: '0.7rem' },
    sm: { fontSize: '0.8rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.2rem' },
    xl: { fontSize: '1.6rem' },
  };
  