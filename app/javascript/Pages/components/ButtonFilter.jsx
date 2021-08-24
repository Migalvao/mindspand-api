import React from "react";
import "./ButtonChip.scss";

const ButtonFilter = ({ props, children }) => {
  console.log(props);
  return (
    <div>
      <button
        onClick={() => props.onClick(props.params)}
        key={props.key}
        className={`btn-chip ${props.params == props.id ? "chip--active" : ""}`}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonFilter;
