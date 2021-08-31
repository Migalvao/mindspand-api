import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
// import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "./Layout";
import { useState } from "react";

export default function Welcome(props) {
 const [notifications, setNotifications] = useState(
  props.notifications
 );

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
  return `${image}?tr=w-60,h-60,r-max`;
 };

 return (
  <Layout current_user={props.current_user}>
   <div>
    <IoIosArrowBack
     onClick={() => {
      Inertia.get("/home");
     }}
    />
    <h1>Activity</h1>
   </div>

   <div>
    <h2>Classes requests</h2>
    {notifications.requests.map((notification, index) => {
     return (
      <div key={index}>
       <img
        src={avatar(notification.match.student.avatar.url)}
       />
       <p>{notification.text}</p>
       <p>{notification.match.skill_class.title}</p>
       <button
        onClick={() =>
         requestOnClick(notification.match.id, "accepted")
        }
       >
        Confirm
       </button>
       <button
        onClick={() =>
         requestOnClick(notification.match.id, "refused")
        }
       >
        Remove
       </button>
      </div>
     );
    })}
   </div>

   <p>_________________________</p>
   {notifications.regular.map((notification, index) => {
    if (
     notification.notification_type == "match_accepted"
    ) {
     console.log(notification);
     // There should be a "Talk" button if the connection is still in progress
     return (
      <div key={index}>
       <img
        src={avatar(
         notification.match.skill_class.teacher.avatar.url
        )}
       />
       ACCEPTED
       <p>{notification.text}</p>
       <p>{notification.match.skill_class.title}</p>
       {notification.match.connection.class_status ==
       "in_progress" ? (
        <button
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
    } else if (
     notification.notification_type == "connection_closed"
    ) {
     return (
      <div
       key={index}
       onClick={
        notification.match.connection.class_status ==
         "given" && !notification.read
         ? () => reviewOnClick()
         : null
       }
      >
       {notification.match.connection
        .person_closed_connection == "student_closed" ? (
        <img
         src={avatar(notification.match.student.avatar.url)}
        />
       ) : (
        <img
         src={avatar(
          notification.match.skill_class.teacher.avatar.url
         )}
        />
       )}
       {notification.match.connection.class_status ==
       "given"
        ? "CLASS GIVEN:"
        : "CLASS CANCELLED"}
       <p>{notification.text}</p>
      </div>
     );
    } else {
     // match_refused or previously accepted match, only text
     return (
      <div key={index}>
       <img
        src={avatar(
         notification.notification_type == "match_denied"
          ? notification.match.skill_class.teacher.avatar
             .url
          : notification.match.student.avatar.url
        )}
       />
       <p>{notification.text}</p>
      </div>
     );
    }
   })}
  </Layout>
 );
}

Welcome.propTypes = {
 notifications: PropTypes.object,
 current_user: PropTypes.object.isRequired,
};
