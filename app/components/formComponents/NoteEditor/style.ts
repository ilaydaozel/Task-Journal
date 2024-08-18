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
    red: { color: 'rgba(255, 0, 0, 1.0)' },
    orange: { color: 'rgba(255, 127, 0, 1.0)' },
    yellow: { color: 'rgba(180, 180, 0, 1.0)' },
    green: { color: 'rgba(0, 180, 0, 1.0)' },
    blue: { color: 'rgba(0, 0, 255, 1.0)' },
    indigo: { color: 'rgba(75, 0, 130, 1.0)' },
    violet: { color: 'rgba(127, 0, 255, 1.0)' },
  };
  
export const fontSizeStyleMap: FontSizeMap = {
    xs: { fontSize: '0.7rem' },
    sm: { fontSize: '0.8rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.2rem' },
    xl: { fontSize: '1.6rem' },
  };
  