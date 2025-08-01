import React from 'react';

const StoryBubble = ({ src }) => {
  return (
    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg animate-float">
      <img
        src={src}
        alt="Story"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default StoryBubble;
