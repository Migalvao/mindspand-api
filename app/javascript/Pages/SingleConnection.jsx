import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Layout from "./Layout";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function SingleConnection(props) {
 const avatar = (image) => {
  return `${image}?tr=r-max`;
 };

 const endConnectionHandler = () => {
  axios
   .put(`/api/connections/${props.connection_id}/`, {
    status: "given",
    headers: window.defaultHeaders,
   })
   .then(() => {
    Inertia.get();
   })
   .catch((error) => {
    if (error.response.data.error) {
     alert(error.response.data.error);
    }
   });
 };

 const [popupState, setPopupState] = useState(false);

 return (
  <Layout current_user={props.user}>
   <h1>Connection</h1>
   <IoIosArrowBack
    onClick={() => {
     Inertia.get("/connections");
    }}
   />
   <div>
    <img src={avatar(props.other_user.avatar.url)} />
    <p>{props.other_user.name}</p>
    <p>{props.other_user.username}</p>
    <button onClick={() => setPopupState(true)}>
     Bye!
    </button>
   </div>

   {popupState ? (
    <div>
     <div
      className="pop-up--skills-exit"
      onClick={() => {
       setPopupState(false);
      }}
     >
      <FaTimes />
     </div>
     <p>
      Are you sure you want to end your connection with{" "}
      {props.other_user.name}?
     </p>
     <button onClick={endConnectionHandler}>
      End Connection
     </button>
     <button onClick={() => setPopupState(false)}>
      Cancel
     </button>
    </div>
   ) : null}
  </Layout>
 );
}

SingleConnection.propTypes = {
 user: PropTypes.object.isRequired,
 other_user: PropTypes.object.isRequired,
 connection_id: PropTypes.number.isRequired,
};
