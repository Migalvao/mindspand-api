import React from "react";
import Layout from "./Layout";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";

export default function Welcome(props) {
  const token = document.querySelector(
    "[name=csrf-token]"
  ).content;
  const headers = { "X-CSRF-Token": token };

  const Connections_list = (props) => {
    const connectionsList = props.connections.map((c) => {
      if (c.match.student) {
        return <li>Student: {c.match.student.username}</li>;
      } else {
        return (
          <li>
            Teacher: {c.match.skill_class.teacher.username}
          </li>
        );
      }
    });

    return <ul>{connectionsList}</ul>;
  };

  return (
    <Layout current_user={props.current_user}>
      <Head title="Welcome" />
      <h1>Connections</h1>
      <p>Student connections</p>
      <Connections_list connections={props.student} />
      <p>Teacher connections</p>
      <Connections_list connections={props.teacher} />

      <Link href="/home" headers={headers} as="button">
        Home
      </Link>
    </Layout>
  );
}
