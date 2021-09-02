import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

export default function Welcome(props) {
  const [notifications, setNotifications] = useState(props.notifications);

  const requestOnClick = (match_id, answer) => {
    const url = `/api/match_request/${match_id}`;
    axios
      .put(url, {
        status: answer,
        headers: window.defaultHeaders,
      })
      .then(() => {
        //update notifications
        axios
          .get("/api/notifications")
          .then((response) => {
            setNotifications(response.data.notifications);
          })
          .catch((error) => {
            alert(error.response.data.error);
          });
      })
      .catch((error) => alert(error.response.data.error));
  };

  const reviewOnClick = (notification) => {
    if (
      notification.match.connection.class_status == "given" &&
      !notification.read
    )
      alert("Review connection!");
  };

  const avatar = (image) => {
    return `${image}?tr=,r-max`;
  };

  return (
    <main className="notifications">
      <div className="notifications-header">
        <IoIosArrowBack
          onClick={() => {
            Inertia.get("/home");
          }}
        />
        <h1 className="notifications-title">Activity</h1>
      </div>

      <div className="notifications-requests">
        <h2 className="notifications-requests-title">Classes requests</h2>
        {notifications.requests.map((notification, index) => {
          return (
            <div key={index}>
              <div className="notifications-requests-profile-info">
                <img
                  src={avatar(notification.match.student.avatar.url)}
                  className="notifications-requests-profile-info-avatar"
                  alt="Avatar"
                />
                <p className="notifications-requests-profile-info-text">
                  <span className="bold">
                    {notification.match.student.username}
                  </span>
                  {notification.text}
                </p>
                <p className="notifications-requests-profile-info-skill-name">
                  {notification.match.skill_class.title}
                </p>
              </div>
              <button
                className="notifications-requests-profile-info-btn-yes"
                onClick={() =>
                  requestOnClick(notification.match.id, "accepted")
                }
              >
                Confirm
              </button>
              <button
                className="notifications-requests-profile-info-btn-no"
                onClick={() => requestOnClick(notification.match.id, "refused")}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {notifications.regular.map((notification, index) => {
        if (notification.notification_type == "match_accepted") {
          // There should be a "Talk" button if the connection is still in progress
          return (
            <div key={index} className="notifications-talk">
              <img
                className="notifications-talk-avatar"
                src={avatar(notification.match.skill_class.teacher.avatar.url)}
                alt="Avatar"
              />
              <p className="notifications-talk-text">{notification.text}</p>
              <p className="notifications-talk-class-name">
                {notification.match.skill_class.title}
              </p>
              {notification.match.connection.class_status == "in_progress" ? (
                <button
                  className="notifications-talk-btn"
                  onClick={() =>
                    Inertia.get(
                      `/connections/${notification.match.connection.id}`
                    )
                  }
                >
                  Talk
                </button>
              ) : null}
            </div>
          );
        } else if (notification.notification_type == "connection_closed") {
          return (
            <div
              className="notifications-end"
              key={index}
              onClick={() => reviewOnClick(notification)}
            >
              <img
                className="notifications-end-avatar"
                alt="Avatar"
                src={avatar(
                  notification.match.connection.person_closed_connection ==
                    "student_closed"
                    ? notification.match.student.avatar.url
                    : notification.match.skill_class.teacher.avatar.url
                )}
              />

              <div className="notifications-end-state">
                {notification.match.connection.class_status == "given"
                  ? "Class given"
                  : "Class canceled"}
              </div>
              <p className="notifications-end-text">{notification.text}</p>
            </div>
          );
        } else {
          // match_refused or previously accepted match, only text
          return (
            <div key={index} className="notifications-refused">
              <img
                className="notifications-refused-avatar"
                src={avatar(
                  notification.notification_type == "match_denied"
                    ? notification.match.skill_class.teacher.avatar.url
                    : notification.match.student.avatar.url
                )}
                alt="Avatar"
              />
              <p className="notifications-refused-text">{notification.text}</p>
            </div>
          );
        }
      })}
    </main>
  );
}

Welcome.propTypes = {
  notifications: PropTypes.object,
  current_user: PropTypes.object.isRequired,
};
