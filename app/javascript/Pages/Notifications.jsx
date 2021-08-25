import React from "react";
import PropTypes from "prop-types";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "./Layout";

export default function Welcome(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  const Notifications_list = (props) => {
    console.log(props.notifications);
    const notificationsList = props.notifications.map((n, index) => (
      <li key={index}>
        id: {n.id}
        text: {n.text}
        notification_type: {n.notification_type}
      </li>
    ));

    return <ul>{notificationsList}</ul>;
  };

  return (
    <Layout current_user={props.current_user}>
      <Head title="Welcome" />
      <h1>Notifications</h1>
      <p>Unread notifications</p>
      <Notifications_list notifications={props.notifications.unread} />
      <p>Read notifications</p>
      <Notifications_list notifications={props.notifications.read} />

      <Link href="/home" headers={headers} as="button">
        Home
      </Link>
    </Layout>
  );
}

Welcome.propTypes = {
  notifications: PropTypes.object,
  current_user: PropTypes.object.isRequired,
};
