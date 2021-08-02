import React, { useState } from "react";
import Layout from "./Layout";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import "../stylesheets/body.css";

export default function Profile(props) {
  const ErrorMessage = () => {
    if (props.error) {
      return <p>{props.error}</p>;
    }
    return null;
  };

  const [values, setValues] = useState({
    name: props.user.name,
    username: props.user.username,
    email: props.user.email,
    description: props.user.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.put("/users/" + props.user.id, values, {
      headers: headers,
    });
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const token = document.querySelector(
    "[name=csrf-token]"
  ).content;
  const headers = { "X-CSRF-Token": token };

  return (
    <Layout current_user={props.user}>
      <ErrorMessage />
      <h1>Edit Profile</h1>
      <p>Id: {props.user.id}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          id="name"
          defaultValue={props.user.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <br />
        <input
          id="username"
          defaultValue={props.user.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          id="email"
          defaultValue={props.user.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          defaultValue={props.user.description}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save</button>
      </form>

      {/* <p>Name: {props.user.name}</p>
      <p>Username: {props.user.username}</p>
      <p>Description: {props.user.description}</p> */}
      {/* <p>Can edit?: {props.can_edit.toString()}</p> */}

      <Link
        href={"/users/" + props.user.id}
        headers={headers}
        as="button"
      >
        Cancel
      </Link>
    </Layout>
  );
}
