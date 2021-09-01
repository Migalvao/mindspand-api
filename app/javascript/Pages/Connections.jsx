import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import Layout from "./Layout";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Welcome(props) {
 const avatar = (image) => {
  return `${image}?tr=w-60,h-60,r-max`;
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
  if (
   props.current_user.id == connection.match.student.id
  ) {
   //Current user is student, return teacher
   return connection.match.skill_class.teacher;
  } else if (
   props.current_user.id ==
   connection.match.skill_class.teacher.id
  ) {
   //Current user is teacher, return student
   return connection.match.student;
  }
 };

 const [selectedConnection, setSelectedConnection] =
  useState({});

 return (
  <Layout current_user={props.current_user}>
   <h1>Connections</h1>
   {props.connections.map((c, i) => {
    return (
     <div key={i}>
      <img src={avatar(otherUser(c).avatar.url)} />
      <p>{otherUser(c).name}</p>
      <p>{otherUser(c).username}</p>
      <button
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

   {selectedConnection.id ? (
    <div>
     <div
      className="pop-up--skills-exit"
      onClick={() => {
       setSelectedConnection({});
      }}
     >
      <FaTimes />
     </div>
     <p>
      Are you sure you want to end your connection with{" "}
      {selectedConnection.name}?
     </p>
     <button
      onClick={() =>
       endConnectionHandler(selectedConnection.id)
      }
     >
      End Connection
     </button>
     <button onClick={() => setSelectedConnection({})}>
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
