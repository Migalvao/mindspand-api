import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import Layout from "./Layout";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Welcome(props) {
  const avatar = (image) => {
    return `${image}?tr=,r-max`;
  };

  const endConnectionHandler = (connection_id) => {
    axios
      .put(`/api/connections/${connection_id}/`, {
        status: "given",
        headers: window.defaultHeaders,
      })
      .then(() => {
        Inertia.get("/connections");
      })
      .catch((error) => {
        if (error.response.data.error) {
          alert(error.response.data.error);
        }
      });
  };

  const otherUser = (connection) => {
    if (props.current_user.id == connection.match.student.id) {
      //Current user is student, return teacher
      return connection.match.skill_class.teacher;
    } else if (
      props.current_user.id == connection.match.skill_class.teacher.id
    ) {
      //Current user is teacher, return student
      return connection.match.student;
    }
  };

  const [selectedConnection, setSelectedConnection] = useState({});

  return (
    <Layout current_user={props.current_user}>
      <div className="connections">
        <h1 className="home-title">Connections</h1>
        {props.connections.map((c, i) => {
          return (
            <div key={i} className="connections-card">
              <img
                className="connections-card-avatar"
                src={avatar(otherUser(c).avatar.url)}
                alt="Avatar_Other_User"
              />
              <p className="connections-card-username">
                {otherUser(c).username}
              </p>
              <p className="connections-card-name">{otherUser(c).name}</p>
              <button
                className="connections-card-talk-btn"
                onClick={() =>
                  setSelectedConnection({
                    id: c.id,
                    name: otherUser(c).name,
                  })
                }
              >
                Bye!
              </button>
            </div>
          );
        })}
      </div>
      {selectedConnection.id ? (
        <div className="pop-up">
          <div
            className="pop-up-exit"
            onClick={() => {
              setSelectedConnection({});
            }}
          >
            <FaTimes />
          </div>

          <p className="pop-up-question">
            Are you sure you want to end your connection with
            <span className="bold"> {selectedConnection.name}</span>?
          </p>

          <button
            className="pop-up-btn-end"
            onClick={() => endConnectionHandler(selectedConnection.id)}
          >
            End Connection
          </button>
          <button
            className="pop-up-btn-cancel"
            onClick={() => setSelectedConnection({})}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </Layout>
  );
}

Welcome.propTypes = {
  connections: PropTypes.array.isRequired,
  current_user: PropTypes.object.isRequired,
};
