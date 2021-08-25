import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";

class ButtonFilter extends Component {
  render() {
    //console.log("params: ", this.props.params, "id: ", this.props.id);
    return (
      <div>
        <button
          onClick={() => this.props.onClick(this.props.params)}
          key={this.key}
          className={`btn-chip ${
            (this.props.params.id || this.props.params) == this.props.id
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
  params: "",
};

ButtonFilter.propTypes = {
  params: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  children: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonFilter;
