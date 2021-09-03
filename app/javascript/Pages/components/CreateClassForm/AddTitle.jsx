import PropTypes from "prop-types";
import React, { Component } from "react";

export default class AddSkill extends Component {
 constructor(props) {
  super(props);
  this.handleChange = props.handleChange;
  this.nextStep = props.nextStep;
  this.previousStep = props.previousStep;
 }

 render() {
  return (
   <div>
    <br />
    <br />
    <div onClick={this.previousStep}>Back</div>
    AddSkill
    <label htmlFor="text" aria-label="Inserir titulo">
     <br />
     <input
      type="text"
      id="title"
      required
      name="title"
      placeholder="Title"
      // className="login-input"
      onChange={(e) => {
       this.handleChange({
        title: e.target.value,
       });
      }}
      value={this.props.title}
     />
    </label>
    <div onClick={this.nextStep}>Next</div>
   </div>
  );
 }
}

AddSkill.propTypes = {
 handleChange: PropTypes.func.isRequired,
 previousStep: PropTypes.func.isRequired,
 nextStep: PropTypes.func.isRequired,
 title: PropTypes.string.isRequired,
};
