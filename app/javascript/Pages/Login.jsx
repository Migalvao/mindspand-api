import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import Navbar from "./components/Navbar/Navbar";

class Login extends Component {
  render() {
    const ErrorMessage = () => {
      if (this.props.error) {
        return <p>{this.props.error}</p>;
      }
      return null;
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      let username = document.getElementById("username");
      let password = document.getElementById("password");

      const data = {
        username: username.value,
        password: password.value,
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
