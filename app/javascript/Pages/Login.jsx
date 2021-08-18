import React, { Component } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "./components/Navbar/Navbar";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/login.scss";

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" aria-label="Inserir username ou email">
              <br />
              <input
                type="text"
                id="username"
                required
                name="username"
                placeholder="Username/Email"
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
              />
            </label>

            <br />

            <input type="submit" value="Log in" className="login-btn" />
          </form>
          <br />
          <div className="to-signup">
            Don't have an account yet? <Link href="/signup">Sign up</Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
