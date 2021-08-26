import React from "react";
import PropTypes from "prop-types";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "./Layout";

export default function Welcome(props) {
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

      <Link href="/home" headers={window.defaultHeaders} as="button">
        Home
      </Link>
    </Layout>
  );
}

Welcome.propTypes = {
  connections: PropTypes.object.isRequired,
  current_user: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
};
