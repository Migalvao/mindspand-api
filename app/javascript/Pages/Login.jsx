import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import Navbar from "./components/Navbar/Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  render() {
    const ErrorMessage = () => {
      if (this.props.error) {
        return <p>{this.props.error}</p>;
      }
      return null;
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      Inertia.post("/login", data, {
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
          className="scene-1-login"
        />
        <div className="login-content">
          <Head title="Welcome" />
          <ErrorMessage />
          <h1 className="login-title">Log in to your account</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username" aria-label="Inserir username ou email">
              <br />
              <input
                type="text"
                id="username"
                required
                name="username"
                placeholder="Username/Email"
                className="login-input"
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                    password: this.state.password,
                  });
                }}
                value={this.state.username}
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
                className="login-input"
                onChange={(e) => {
                  this.setState({
                    username: this.state.username,
                    password: e.target.value,
                  });
                }}
                value={this.state.password}
              />
            </label>

            <br />

            <input type="submit" value="Log in" className="login-btn" />
          </form>
          <br />
          <div className="to-signup">
            Don&apos;t have an account yet?
            <Link href="/signup"> Sign up</Link>
          </div>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  username: PropTypes.object,
  password: PropTypes.object,
};

export default Login;
