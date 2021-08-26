import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";

class ButtonFilter extends Component {
  render() {
    //console.log("params: ", this.props.params, "id: ", this.props.id);
    return (
      <div>
        <button
          onClick={() =>
            this.props.onClick(this.props.params)
          }
          key={this.key}
          className={`btn-chip ${
            this.props.params.id == this.props.id
              ? "chip--active"
              : ""
          }`}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

ButtonFilter.defaultProps = {
  params: { id: "" },
};

ButtonFilter.propTypes = {
  params: PropTypes.object,
  children: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
};

export default ButtonFilter;
