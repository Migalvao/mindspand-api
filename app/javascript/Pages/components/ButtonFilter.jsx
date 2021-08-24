import React from "react";

const ButtonFilter = ({ props, children }) => {
  console.log("params: ", props.params, "id: ", props.id);
  return (
    <div>
      <button
        onClick={() => props.onClick(props.params)}
        key={props.key}
        className={`btn-chip ${
          (props.params.id || props.params) == props.id ? "chip--active" : ""
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonFilter;
