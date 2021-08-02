import React from "react";
import Layout from "./Layout";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";

export default function Profile(props) {
  const token = document.querySelector(
    "[name=csrf-token]"
  ).content;
  const headers = { "X-CSRF-Token": token };

  return (
    <main>
      <h1>Not found</h1>
      <p>Why not go back?</p>

      <Link href="/home" headers={headers} as="button">
        Home
      </Link>
    </main>
  );
}
