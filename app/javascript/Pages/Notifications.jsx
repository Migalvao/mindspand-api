import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
// import { Head, Link } from "@inertiajs/inertia-react";
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

  const reviewOnClick = () => {
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
          console.log(notification.match.student);
          return (
            <div key={index}>
              <div className="notifications-requests-profile-info">
                <img
                  src={avatar(notification.match.student.avatar.url)}
                  className="notifications-requests-profile-info-avatar"
                />
                <p className="notifications-requests-profile-info-text">
                  <span className="bold">
                    {notification.match.student.username}
                  </span>
                  &nbsp;
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
          console.log(notification);
          // There should be a "Talk" button if the connection is still in progress
          return (
            <div key={index} className="notifications-talk">
              <img
                className="notifications-talk-avatar"
                src={avatar(notification.match.skill_class.teacher.avatar.url)}
              />
              <p className="notifications-talk-text">{notification.text}</p>
              <p className="notifications-talk-skill-name">
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
              key={index}
              onClick={
                notification.match.connection.class_status == "given" &&
                !notification.read
                  ? () => reviewOnClick()
                  : null
              }
            >
              {notification.match.connection.person_closed_connection ==
              "student_closed" ? (
                <img src={avatar(notification.match.student.avatar.url)} />
              ) : (
                <img
                  src={avatar(
                    notification.match.skill_class.teacher.avatar.url
                  )}
                />
              )}
              {notification.match.connection.class_status == "given"
                ? "CLASS GIVEN:"
                : "CLASS CANCELLED"}
              <p>{notification.text}</p>
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
