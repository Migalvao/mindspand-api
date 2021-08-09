import React from "react";
import Layout from "./Layout";
import Navbar from "./components/Navbar/Navbar";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";
import "../stylesheets/Home.css";

export default function Welcome(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  return (
    <Layout current_user={props.current_user}>
      <Navbar current_user={props.current_user} />
      <img
        src={require("../images/banner.svg")}
        alt="banner"
        className="hero-img"
      />
      <Head title="Welcome" />
      <p>Hello, welcome to your first Inertia app!</p>
      <p id="p1">This is cool!</p>
      <p className="paragraph">This is cool!</p>

      <Link href="/logout" method="delete" headers={headers} as="button">
        Logout
      </Link>
    </Layout>
  );
}
