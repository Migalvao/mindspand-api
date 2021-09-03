import PropTypes from "prop-types";
import React, { Component } from "react";

export default class ClassData extends Component {
  constructor(props) {
    super(props);
    this.handleChange = props.handleChange;
    this.nextStep = props.nextStep;
    this.previousStep = props.previousStep;

    this.state = { error: "" };
  }

  render() {
    const difficultyOptions = ["beginner", "intermediate", "advanced"];
    const regimeOptions = ["physical", "remote", "hybrid"];
    const methodOptions = ["synchronous", "asynchronous", "both"];
    const durationDefaultOptions = [15, 30];
    const durationOptions = durationDefaultOptions.concat(["customize"]);
    const defaultCustomizableValue = 45;

    const formIsValid = () => {
      return (
        this.props.data.description &&
        this.props.data.difficulty &&
        this.props.data.duration &&
        this.props.data.no_lessons &&
        (this.props.data.method || this.props.data.regime == "physical") &&
        this.props.data.regime &&
        (this.props.data.location || this.props.data.regime == "remote")
      );
    };

    return (
      <div>
        <br />
        <br />
        <div onClick={this.previousStep}>Back</div>
        <h1>Create Class</h1>
        <p>{this.props.data.skill.name}</p>
        <br />
        <label htmlFor="description">
          Description:
          <br />
          <textarea
            id="description"
            placeholder="Description"
            defaultValue={this.props.data.description}
            onChange={(e) => this.handleChange({ description: e.target.value })}
          />
        </label>
        <br />
        <label htmlFor="difficulty">
          Difficulty:
          <br />
          <div>
            {difficultyOptions.map((difficulty, i) => {
              return (
                <button
                  key={i}
                  onClick={() => this.handleChange({ difficulty: difficulty })}
                >
                  {difficulty.charAt(0).toUpperCase() +
                    difficulty.slice(1) +
                    (this.props.data.difficulty == difficulty ? " CHOSEN" : "")}
                </button>
              );
            })}
          </div>
        </label>
        <br />
        <label htmlFor="duration">
          Duration:
          <br />
          <div>
            {durationOptions.map((duration, i) => {
              if (durationDefaultOptions.includes(duration)) {
                // normal button
                return (
                  <div key={i}>
                    <button
                      onClick={() => this.handleChange({ duration: duration })}
                    >
                      {duration +
                        " min" +
                        (this.props.data.duration == duration ? " CHOSEN" : "")}
                    </button>
                  </div>
                );
              } else {
                // customize button
                return (
                  <div key={i}>
                    <button
                      onClick={() =>
                        this.handleChange({
                          duration: defaultCustomizableValue,
                        })
                      }
                    >
                      {duration.charAt(0).toUpperCase() +
                        duration.slice(1) +
                        (this.props.data.duration &&
                        !durationDefaultOptions.includes(
                          this.props.data.duration
                        )
                          ? " CHOSEN"
                          : "")}
                    </button>
                    <br />
                    {this.props.data.duration &&
                    !durationDefaultOptions.includes(
                      this.props.data.duration
                    ) ? (
                      <div>
                        <div
                          onClick={() => {
                            if (
                              this.props.data.duration >
                              defaultCustomizableValue
                            )
                              this.handleChange({
                                duration: this.props.data.duration - 15,
                              });
                          }}
                        >
                          -
                        </div>
                        <p>{this.props.data.duration} min</p>
                        <div
                          onClick={() => {
                            this.handleChange({
                              duration: this.props.data.duration + 15,
                            });
                          }}
                        >
                          +
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        </label>
        <br />
        <div>
          <p>Number of lessons</p>
          <div
            onClick={() => {
              if (this.props.data.no_lessons)
                this.handleChange({
                  no_lessons: this.props.data.no_lessons - 1,
                });
            }}
          >
            -
          </div>
          <p>{this.props.data.no_lessons}</p>
          <div
            onClick={() => {
              this.handleChange({
                no_lessons: this.props.data.no_lessons + 1,
              });
            }}
          >
            +
          </div>
        </div>
        <br />
        <label htmlFor="regime">
          Regime:
          <br />
          <div>
            {regimeOptions.map((regime, i) => {
              return (
                <button
                  key={i}
                  onClick={() => this.handleChange({ regime: regime })}
                >
                  {regime.charAt(0).toUpperCase() +
                    regime.slice(1) +
                    (this.props.data.regime == regime ? " CHOSEN" : "")}
                </button>
              );
            })}
          </div>
        </label>
        <br />
        {this.props.data.regime && this.props.data.regime != "physical" ? (
          <label htmlFor="method">
            Method:
            <br />
            <div>
              {methodOptions.map((method, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => this.handleChange({ method: method })}
                  >
                    {method.charAt(0).toUpperCase() +
                      method.slice(1) +
                      (this.props.data.method == method ? " CHOSEN" : "")}
                  </button>
                );
              })}
            </div>
            <br />
          </label>
        ) : null}
        {this.props.data.regime && this.props.data.regime != "remote" ? (
          <label htmlFor="text" aria-label="Inserir localizacao">
            Location
            <br />
            <input
              type="text"
              id="location"
              required
              name="location"
              placeholder="Location"
              // className="login-input"
              onChange={(e) => {
                this.handleChange({
                  location: e.target.value,
                });
              }}
              value={this.props.data.location}
            />
          </label>
        ) : null}
        <br />
        <p>{this.state.error}</p>
        <br />
        <div
          onClick={() => {
            if (formIsValid()) this.nextStep();
            else this.setState({ error: "All fields are mandatory" });
          }}
        >
          Create
        </div>
      </div>
    );
  }
}

ClassData.propTypes = {
  handleChange: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
