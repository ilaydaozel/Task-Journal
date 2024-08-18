import React from 'react';

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
}

const emojis = [
    // Symbols & Colors
     '✅', '☑️', '✔️','🌟', '⭐️', '✨', '🔥', '🎯', '🚀',
    '🔈', '🔔', '📣', '💬',  '❌', '💯', '📝', '📅', '📋', '📌', '📍', '⏰', '🏷️', '🗂️', '🗓️','📚', '✉️', 
    '🕒', '⏳', '🔘', '🔴', '🟣', '🔵', '🟢', '🟡', '🟠', '⚪️', '⚫️', '🟥', '🟧', '🟨', '⬜️', '🟪', '⬛️', '🟦', 
    '🟩', '🔝', '🔜','➡️', '⬅️', '⬆️', '⬇️', '⚠️', '❗️', '❓',
    // Facial Expressions
    '👍🏻', '👎🏻', '👏🏻', '🙌🏻','😀', '😁', '😂', '🥳', '😊', '😍', '🥰',  '🤩', '😎', '😇', '❤️', '💛', '💚', '💙', '💖',  '🎉', '🎀', 
    // General & Cute
    '🌞', '🌜',  '💪', '🎨', '✍🏻',  '🫶🏻', '👩🏻‍💻', '🧑🏻‍💻', 
    '🧚🏻‍♀️', '💅🏻', '💆🏻‍♀️', '💃🏻', '🏃🏻‍♀️', '🐥', '🌸', '🌺', '🐚', '🌼', '🌞',  '🍕', '☕️', '🥂', 
    '🧘🏻‍♀️', '🥁',
  

  ];
  

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelectEmoji }) => {
  return (
    <div className="flex flex-wrap py-2 gap-2 bg-text1-100">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          role="button"
          aria-label={`emoji-${index}`}
          onClick={() => onSelectEmoji(emoji)}
          className="text-base cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;
