import PropTypes from "prop-types";
import React, { Component } from "react";
import { Inertia } from "@inertiajs/inertia";
import ChooseSkill from "./components/CreateClassForm/ChooseSkill";
import AddTitle from "./components/CreateClassForm/AddTitle";
import ClassData from "./components/CreateClassForm/ClassData";

export default class CreateClass extends Component {
 constructor(props) {
  super(props);
  this.state = { skill: {}, step: 1 };
 }

 render() {
  const nextStep = () => {
   this.setState((state) => {
    return { step: state.step + 1 };
   });
  };

  const previousStep = () => {
   this.setState((state) => {
    return { step: state.step - (state.step > 1 ? 1 : 0) };
   });
  };

  const createClass = () => {
   alert("Class Created");
  };

  switch (this.state.step) {
   case 1:
    return (
     <ChooseSkill
      previousStep={() => {
       Inertia.get(`/users/${this.props.current_user.id}`);
      }}
      nextStep={nextStep}
      handleChange={(newState) => {
       this.setState(newState);
      }}
      skill={this.state.skill}
     />
    );

   case 2:
    return (
     <AddTitle
      previousStep={previousStep}
      nextStep={nextStep}
      handleChange={this.setState}
     />
    );

   case 3:
    return (
     <ClassData
      previousStep={previousStep}
      nextStep={createClass}
      handleChange={this.setState}
     />
    );

   default:
    return null;
  }
 }
}

CreateClass.propTypes = {
 current_user: PropTypes.object.isRequired,
};
