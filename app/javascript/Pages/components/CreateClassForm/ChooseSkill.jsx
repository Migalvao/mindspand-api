import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import ButtonFilter from "../ButtonFilter";

export default class ChooseSkill extends Component {
 constructor(props) {
  super(props);
  this.handleChange = props.handleChange;
  this.nextStep = props.nextStep;
  this.previousStep = props.previousStep;
  this.state = {
   categories: [],
   skills: [],
   skill: props.skill || {},
  };
 }

 componentDidMount() {
  // same as use effect
  axios
   .get("/api/skills")
   .then((response) =>
    this.setState({ categories: response.data })
   );
 }

 render() {
  return (
   <div>
    <br />
    <br />
    <div onClick={this.previousStep}>Back</div>
    Choose Skill
    {this.state.categories.length ? (
     this.state.categories.map((c, i) => {
      return (
       <ButtonFilter
        key={i}
        params={c}
        onClick={(c) =>
         this.setState({
          skills: c.skills,
          skill: { category_id: c.id },
         })
        }
        id={this.state.skill.category_id}
       >
        {c.name}
       </ButtonFilter>
      );
     })
    ) : (
     <p>Loading...</p>
    )}
    {this.state.skills.map((s, i) => {
     return (
      <div
       key={i}
       onClick={() =>
        this.handleChange((state) => {
         return {
          skill: {
           category_id: state.skill.category_id,
           id: s.id,
          },
         };
        })
       }
      >
       {s.name +
        (s.id == this.state.skill.id ? " SELECTED" : "")}
      </div>
     );
    })}
    <div onClick={this.nextStep}>Next</div>
   </div>
  );
 }
}

ChooseSkill.propTypes = {
 handleChange: PropTypes.func.isRequired,
 previousStep: PropTypes.func.isRequired,
 nextStep: PropTypes.func.isRequired,
 skill: PropTypes.object,
};
