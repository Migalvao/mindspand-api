import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import Navbar from "./components/Navbar/Navbar";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    };
  }
  render() {
    const ErrorMessage = () => {
      if (this.props.error) {
        const errors = this.props.error.map((e, i) => {
          return <p key={i}>{e}</p>;
        });
        return errors;
      }
      return null;
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (this.state.password != this.state.password_confirmation) {
        alert("Passwords must match!");
        return;
      }

      Inertia.post("/signup", this.state, {
        headers: window.defaultHeaders,
      });
    };

    return (
      <main>
        <Navbar />
        <img
          src={require("../images/scene_1.svg")}
          alt=""
          role="presentation"
          className="scene-1"
        />
        <div className="auth-content">
          <Head title="Welcome" />
          <h1 className="auth-title">Create your account</h1>
          <ErrorMessage />
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="text" aria-label="Inserir nome">
              <br />
              <input
                type="text"
                id="name"
                required
                name="name"
                placeholder="Name"
                className="auth-input"
                onChange={(e) => {
                  this.setState({
                    name: e.target.value,
                  });
                }}
                value={this.state.name}
              />
            </label>

            <label htmlFor="username" aria-label="Inserir username">
              <br />
              <input
                type="text"
                id="username"
                required
                name="username"
                placeholder="Username"
                className="auth-input"
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                  });
                }}
                value={this.state.username}
              />
            </label>

            <label htmlFor="text" aria-label="Inserir email">
              <br />
              <input
                type="text"
                id="email"
                required
                name="email"
                placeholder="Email"
                className="auth-input"
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
                value={this.state.email}
              />
            </label>

            <br />
            <label htmlFor="password" aria-label="Inserir password">
              <br />
              <input
                type="password"
                required
                id="password"
                name="password"
                placeholder="Password"
                className="auth-input"
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
                value={this.state.password}
              />
            </label>

            <br />
            <label htmlFor="password" aria-label="Repetir password">
              <br />
              <input
                type="password"
                required
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Confirm password"
                className="auth-input"
                onChange={(e) => {
                  this.setState({
                    password_confirmation: e.target.value,
                  });
                }}
                value={this.state.password_confirmation}
              />
            </label>

            <br />

            <input type="submit" value="Submit" className="auth-btn" />
          </form>
          <br />
        </div>
      </main>
    );
  }
}

Signup.propTypes = {
  error: PropTypes.array,
  username: PropTypes.object,
  password: PropTypes.object,
};

export default Signup;
