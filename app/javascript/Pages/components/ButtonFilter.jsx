import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";

// const ButtonFilter = ({ props, children }) => {
//   //console.log("params: ", props.params, "id: ", props.id);
//   return (
//     <div>
//       <button
//         onClick={() => props.onClick(props.params)}
//         key={props.key}
//         className={`btn-chip ${
//           (props.params.id || props.params) == props.id ? "chip--active" : ""
//         }`}
//       >
//         {children}
//       </button>
//     </div>
//   );
// };

class ButtonFilter extends Component {
  render() {
    console.log("params: ", this.props.params, "id: ", this.props.id);
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
  props: PropTypes.object,
  children: PropTypes.string,
};

export default ButtonFilter;
