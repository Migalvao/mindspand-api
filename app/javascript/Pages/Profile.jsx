import React from "react";
import Layout from "./Layout";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";

export default function Profile(props) {
  const token = document.querySelector(
    "[name=csrf-token]"
  ).content;
  const headers = { "X-CSRF-Token": token };

  console.log(props);

  return (
    <Layout current_user={props.user}>
      {/* <Head title="Welcome" /> */}
      <h1>Profile</h1>
      <p>Id: {props.user.id}</p>
      <p>Name: {props.user.name}</p>
      <p>Username: {props.user.username}</p>
      <p>Description: {props.user.description}</p>
      <p>Can edit?: {props.can_edit.toString()}</p>

      <Link href="/home" headers={headers} as="button">
        Home
      </Link>
    </Layout>
  );
}
