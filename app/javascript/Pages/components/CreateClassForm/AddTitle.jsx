import PropTypes from "prop-types";
import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default class AddSkill extends Component {
  constructor(props) {
    super(props);
    this.handleChange = props.handleChange;
    this.nextStep = props.nextStep;
    this.previousStep = props.previousStep;
    this.state = { error: "" };
  }

  render() {
    return (
      <main className="add-title">
        <div className="create-header">
          <IoIosArrowBack onClick={this.previousStep} />
          <h1 className="create-title">Add title</h1>
          <h1 className="create-tip">
            What will you call it? <br></br>Choose wisely.
          </h1>
        </div>
        <div className="add-title-form">
          <label
            htmlFor="text"
            aria-label="Inserir titulo"
            className="add-title-label"
          >
            <br />
            <input
              className="add-title-input"
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
        </div>
        <p>{this.state.error}</p>
        <div className="background-btn">
          <button
            className="btn-ask-class"
            onClick={() => {
              if (this.props.title) this.nextStep();
              else this.setState({ error: "Title is mandatory" });
            }}
          >
            Next
          </button>
        </div>
      </main>
    );
  }
}

AddSkill.propTypes = {
  handleChange: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
