import PropTypes from "prop-types";
import axios from "axios";
import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";
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
      <main className="choose-skill">
        <div className="create-header">
          <IoIosArrowBack onClick={this.previousStep} />
          <h1 className="create-title">Add skill</h1>
          <h1 className="create-tip">Choose one skill at time.</h1>
        </div>
        <div className="choose-skill-filter-wrapper">
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
        </div>
        <div className="choose-skill-wrapper">
          {this.state.skills.map((s, i) => {
            return (
              <div
                className="choose-skill-name"
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
        </div>
        <p>{this.state.error}</p>
        <div className="background-btn">
          <button
            className="btn-ask-class"
            onClick={() => {
              if (this.props.skill.id) this.nextStep();
              else this.setState({ error: "Skill is mandatory" });
            }}
          >
            Choose
          </button>
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
