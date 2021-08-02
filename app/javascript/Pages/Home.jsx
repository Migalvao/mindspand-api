import React from "react";
import Layout from "./Layout";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";

export default function Welcome(props) {
  const token = document.querySelector(
    "[name=csrf-token]"
  ).content;
  const headers = { "X-CSRF-Token": token };

  return (
    <Layout current_user={props.current_user}>
      <Head title="Welcome" />
      <h1>Welcome {props.current_user.name}!</h1>
      <p>Hello, welcome to your first Inertia app!</p>
      <p id="p1">This is cool!</p>
      <p className="paragraph">This is cool!</p>

      <Link
        href="/logout"
        method="delete"
        headers={headers}
        as="button"
      >
        Logout
      </Link>
    </Layout>
  );
}
