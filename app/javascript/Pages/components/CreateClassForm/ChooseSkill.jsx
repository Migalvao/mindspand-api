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
      error: "",
      categories: [],
      skills: [],
    };
  }

  componentDidMount() {
    // same as use effect
    axios.get("/api/skills").then((response) => {
      const categories = response.data;
      let skills = [];
      if (this.props.skill.id) {
        categories.forEach((c) => {
          if (this.props.skill.category_id == c.id) {
            skills = c.skills;
            return;
          }
        });
      }
      this.setState({
        categories: categories,
        skills: skills,
      });
    });
  }

  componentDidUpdate() {}

  render() {
    return (
      <main>
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
                onClick={(c) => {
                  this.setState({ skills: c.skills });
                  this.handleChange({
                    skill: { category_id: c.id },
                  });
                }}
                id={this.props.skill.category_id}
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
                this.handleChange({
                  skill: {
                    category_id: this.props.skill.category_id,
                    id: s.id,
                    name: s.name,
                  },
                })
              }
            >
              {s.name + (s.id == this.props.skill.id ? " SELECTED" : "")}
            </div>
          );
        })}
        <br />
        <p>{this.state.error}</p>
        <div
          onClick={() => {
            if (this.props.skill.id) this.nextStep();
            else this.setState({ error: "Skill is mandatory" });
          }}
        >
          Next
        </div>
      </main>
    );
  }
}

ChooseSkill.propTypes = {
  handleChange: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  skill: PropTypes.object.isRequired,
};
