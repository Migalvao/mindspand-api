import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";

export default function Login(props) {
  const ErrorMessage = () => {
    if (props.error) {
      return <p>{props.error}</p>;
    }
    return null;
  };

  const handleSubmit = (e) => {
    const token = document.querySelector("[name=csrf-token]").content;

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
      <ErrorMessage />
      <h1>Signup</h1>

      <br />
      <Link href="/home" as="button">
        Home
      </Link>
    </main>
  );
}
