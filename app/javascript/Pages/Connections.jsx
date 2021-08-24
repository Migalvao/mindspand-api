import React from "react";
import Layout from "./Layout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Welcome(props) {
  Inertia.post("/login", data, {
    headers: window.defaultHeaders,
  });

  const ConnectionsList = (props) => {
    const connectionsListChild = props.connections.map((c) => {
      if (c.match.student) {
        return <li>Student: {c.match.student.username}</li>;
      } else {
        return <li>Teacher: {c.match.skill_class.teacher.username}</li>;
      }
    });

    return <ul>{connectionsListChild}</ul>;
  };

  return (
    <Layout current_user={props.current_user}>
      <Head title="Welcome" />
      <h1>Connections</h1>
      <p>Student connections</p>
      <ConnectionsList connections={props.student} />
      <p>Teacher connections</p>
      <ConnectionsList connections={props.teacher} />

      <Link href="/home" headers={headers} as="button">
        Home
      </Link>
    </Layout>
  );
}
