import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Layout from "./Layout";

const SingleClass = (props) => {
 const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
 };

 const avatar = (image) => {
  return `${image}?tr=w-60,h-60,r-max`;
 };

 let requestInfo = props.request;

 const buttonOnClick = () => {
  switch (buttonState) {
   case "pending":
    //cancel request
    setButtonState("loading");

    axios
     .put(`/api/match_request/${requestInfo.match_id}/`, {
      status: "cancelled",
      headers: window.defaultHeaders,
     })
     .then(() => {
      setButtonState("available");
     })
     .catch((error) => {
      if (error.response.data.error) {
       alert(error.response.data.error);
      }
      setButtonState("pending");
     });

    break;

   case "available":
    //send request
    setButtonState("loading");

    axios
     .post(`/api/classes/${props.class.id}/request/`, {
      headers: window.defaultHeaders,
     })
     .then((response) => {
      console.log(response.data);

      requestInfo.match_id = response.data.request.id;
      setButtonState("pending");
     })
     .catch((error) => {
      if (error.response.data.error) {
       alert(error.response.data.error);
      }
      setButtonState("available");
     });

    break;

   default:
    break;
  }
 };

 //button state can be 'available', 'pending', 'accepted' or 'loading'
 const [buttonState, setButtonState] = useState(
  props.request.status ? props.request.status : "available"
 );

 return (
  <Layout current_user={props.current_user}>
   <div>
    <p>
     Logo/{props.class.skill.category.name}/
     {props.class.skill.name}/{props.class.teacher.name}
    </p>
   </div>
   <div>
    <h1>{props.class.title}</h1>
    <p>{props.class.teacher.name}</p>
   </div>
   <div>
    {/* Fazer como botoes? */}
    <p>About</p>
    <p>Reviews</p>
    <p>Comments</p>
   </div>
   <div>
    <p>{capitalize(props.class.difficulty)}</p>
    <div>{props.class.no_classes} Lessons</div>
    <div>
     {props.class.class_duration} min Time p/ lesson
    </div>
    <div>
     {props.class.regime} {props.class.method}
    </div>
    <div>
     <img
      src={avatar(props.class.teacher.avatar.url)}
      alt="Avatar"
     />
     <p>{props.class.teacher.name}</p>
     <p>Rating: {props.class.teacher.rating}</p>
    </div>
    <div>
     <h1>About this class</h1>
     <div>{props.class.description}</div>
    </div>
    {props.current_user.id != props.class.teacher.id ? (
     <button
      disabled={
       buttonState == "loading" || buttonState == "accepted"
      }
      onClick={buttonOnClick}
     >
      {buttonState == "available"
       ? "Ask for class"
       : buttonState == "pending"
       ? "Request sent!"
       : buttonState == "accepted"
       ? "Connection open"
       : "Loading..."}
     </button>
    ) : null}
   </div>
  </Layout>
 );
};

SingleClass.propTypes = {
 current_user: PropTypes.object.isRequired,
 class: PropTypes.object.isRequired,
 request: PropTypes.object.isRequired,
};

export default SingleClass;
