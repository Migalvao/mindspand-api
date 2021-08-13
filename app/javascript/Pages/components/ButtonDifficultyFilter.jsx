import React from "react";

const ButtonDifficultyFiter = ({ props, children }) => {
  return (
    <div>
      <button
        onClick={() => props.onClick(props.difficulty)}
        className="btn-difficulty"
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonDifficultyFiter;
