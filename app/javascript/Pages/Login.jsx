import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "./Layout";
import { Head } from "@inertiajs/inertia-react";

export default function Login(props) {
  const ErrorMessage = () => {
    if (props.error) {
      return <p>{props.error}</p>;
    }
    return null;
  };

  const handleSubmit = (e) => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ).content;

    const data = {
      username: username.value,
      password: password.value,
    };

    e.preventDefault();
    Inertia.post("/login", data, {
      headers: {
        "X-CSRF-Token": token,
      },
    });
  };

  return (
    <main>
      <Head title="Welcome" />
      <ErrorMessage />
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username/Email:</label>
        <br />
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
