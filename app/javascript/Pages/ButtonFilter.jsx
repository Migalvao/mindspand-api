import React from "react";

const ButtonFilter = ({ props, children }) => {
  return (
    <div>
      <button
        onClick={() => props.onClick(props.params)}
        className="btn-difficulty"
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonFilter;
