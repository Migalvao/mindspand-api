import React from "react";
import PropTypes from "prop-types";

const ButtonFilter = ({ props, children }) => {
  props.params ||= "";

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

ButtonFilter.propTypes = {
  props: PropTypes.object,
  children: PropTypes.string,
};

export default ButtonFilter;
