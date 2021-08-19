import React from "react";
import "./ButtonChip.scss";

const ButtonFilter = ({ props, children }) => {
  return (
    <div>
      <button onClick={() => props.onClick(props.params)} className="btn-chip">
        {children}
      </button>
    </div>
  );
};

export default ButtonFilter;
