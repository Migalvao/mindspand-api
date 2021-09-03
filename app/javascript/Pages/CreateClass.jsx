import PropTypes from "prop-types";
import axios from "axios";
import React, { Component } from "react";
import { Inertia } from "@inertiajs/inertia";
import ChooseSkill from "./components/CreateClassForm/ChooseSkill";
import AddTitle from "./components/CreateClassForm/AddTitle";
import ClassData from "./components/CreateClassForm/ClassData";

export default class CreateClass extends Component {
 constructor(props) {
  super(props);
  this.state = {
   step: 1,
   skill: {},
   title: "",
   description: "",
   difficulty: "",
   duration: null,
   no_lessons: 0,
   method: "",
   regime: "",
   location: "",
  };
 }

 render() {
  const {
   description,
   difficulty,
   duration,
   no_lessons,
   method,
   regime,
   location,
   skill,
  } = this.state;

  const data = {
   description,
   difficulty,
   duration,
   no_lessons,
   method,
   regime,
   location,
   skill,
  };

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
   const data = {
    title: this.state.title,
    description: this.state.description,
    no_classes: this.state.no_lessons,
    class_duration: this.state.no_lessons,
    method: this.state.method,
    difficulty: this.state.difficulty,
    regime: this.state.regime,
    location: this.state.location,
    skill_id: this.state.skill.id,
    headers: window.defaultHeaders,
   };

   axios
    .post(
     `/api/users/${this.props.current_user.id}/classes`,
     data
    )
    .then(() =>
     Inertia.get(`/users/${this.props.current_user.id}`)
    )
    .catch((e) => {
     console.log(e);
    });
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
      handleChange={(newState) => {
       this.setState(newState);
      }}
      title={this.state.title}
     />
    );

   case 3:
    return (
     <ClassData
      previousStep={previousStep}
      nextStep={createClass}
      handleChange={(newState) => {
       this.setState(newState);
      }}
      data={data}
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
