import React from "react";
import "./ButtonChip.scss";

const ButtonDifficultyFiter = ({ props, children }) => {
  return (
    <div>
      <button
        onClick={() => props.onClick(props.difficulty)}
        className="btn-chip"
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonDifficultyFiter;
