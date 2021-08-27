import React from "react";
import PropTypes from "prop-types";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large", "btn--mobile", "btn--wide"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.object,
  onClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  buttonSize: PropTypes.string,
};
