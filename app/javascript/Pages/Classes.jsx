import React from "react";
import Layout from "./Layout";
import Navbar from "./components/Navbar/Navbar";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";

export default function Welcome(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  return (
    <Layout current_user={props.current_user}>
      <Navbar current_user={props.current_user} />
      <Head title="Welcome" />

      <p>Hello, welcome to your first class!</p>
    </Layout>
  );
}
