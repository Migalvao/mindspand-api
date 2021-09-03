import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import Layout from "./Layout";
import { Inertia } from "@inertiajs/inertia";

const SingleClass = (props) => {
  const [click, setClick] = useState("about");

  const handleClick = (newState) => setClick(newState);
  const avatar = (image) => {
    return `${image}?tr=,r-max`;
  };

  let requestInfo = props.request;

  const buttonOnClick = () => {
    switch (buttonState) {
      case "pending": {
        //cancel request
        setButtonState("loading");

        axios
          .put(`/api/match_request/${requestInfo.match_id}/`, {
            status: "cancelled",
            headers: window.defaultHeaders,
          })
          .then((response) => {
            console.log(response.data);

            setButtonState("available");
          })
          .catch((error) => {
            if (error.response.data.error) {
              alert(error.response.data.error);
            }
            setButtonState("pending");
          });

        break;
      }

      case "available": {
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
      }

      case "accepted":
      case "loading":
      default:
        break;
    }
  };

  //button state can be 'available', 'pending', 'accepted' or 'loading'
  const [buttonState, setButtonState] = useState(
    props.request.status || "available"
  );

  const classes_url_category = () => {
    return `/classes?category_id=${props.class.skill.category.id}`;
  };

  const classes_url_skill = () => {
    return `/classes?category_id=${props.class.skill.category.id}&skill_id=${props.class.skill.id}`;
  };

  return (
    <Layout current_user={props.current_user}>
      <div className="path-wrapper">
        <Link href="/home" className="path">
          <img
            src={require("../images/logo_dark.svg")}
            alt="logo"
            className="path-logo"
          />
        </Link>
        <p className="path">&nbsp;/&nbsp;</p>
        <Link href={classes_url_category()} className="path">
          {props.class.skill.category.name}
        </Link>
        <p className="path">&nbsp;/&nbsp;</p>
        <Link href={classes_url_skill()} className="path">
          {props.class.skill.name}
        </Link>
        <p className="path">&nbsp;/&nbsp;</p>
        <Link href="" className="path">
          {props.class.teacher.name}
        </Link>
      </div>
      <div
        className="class-header"
        style={{
          "--colorCategory": `#${props.class.skill.category.color}`,
        }}
      >
        <h1 className="class-header-title">{props.class.title}</h1>
        <h2 className="class-header-subtitle">{props.class.teacher.name}</h2>
      </div>
      <div>
        <ul className="class-menu">
          {["about", "review", "comments"].map((elem, index) => {
            return (
              <li
                key={index}
                className={"class-btn" + (click == elem ? " active" : "")}
                onClick={() => handleClick(elem)}
                style={{
                  "--colorCategory": `#${props.class.skill.category.color}`,
                }}
              >
                {elem.charAt(0).toUpperCase() + elem.slice(1)}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={"class-about" + (click == "about" ? "" : " off")}>
        <div className="class-details">
          <p className="class-difficulty">{props.class.difficulty}</p>
          <div className="class-lessons">
            <h1 className="class-details-title">{props.class.no_classes}</h1>
            <p className="class-details-subtitle">Lessons </p>
          </div>
          <div className="class-time">
            <h1 className="class-details-title">
              {props.class.class_duration}
            </h1>
            <p className="class-details-subtitle">Time p/lesson</p>
          </div>
        </div>
        <div className="class-details-sub">
          <div className="class-details-sub-regime">{props.class.regime}</div>
          <div className="class-details-sub-method">{props.class.method}</div>
        </div>
        <div
          className="class-profile-info"
          onClick={() => Inertia.get(`/users/${props.class.teacher.id}`)}
        >
          <img
            src={avatar(props.class.teacher.avatar.url)}
            alt="Avatar"
            className="class-profile-info-avatar"
          />
          <div className="class-profile-info-text">
            <p className="class-profile-info-teacher-name">
              {props.class.teacher.name}
            </p>
            <p className="class-profile-info-teacher-rating">
              {props.class.teacher.rating} stars
            </p>
          </div>
        </div>
        <div className="class-about-text">
          <h1 className="home-title">About this class</h1>
          <div className="class-about-description">
            {props.class.description}
          </div>
        </div>
        {props.current_user.id != props.class.teacher.id ? (
          <div className="background-btn">
            <button
              className="btn-ask-class"
              disabled={buttonState == "loading" || buttonState == "accepted"}
              onClick={buttonOnClick}
            >
              {buttonState == "available"
                ? "Ask for class"
                : buttonState == "pending"
                ? "Cancel"
                : buttonState == "accepted"
                ? "Connected"
                : "Loading..."}
            </button>
          </div>
        ) : null}
      </div>
      <div className={click == "review" ? "class-review" : "class-review off"}>
        <div className="class-review-header">
          <h1 className="home-title">What students think about this class?</h1>
        </div>
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
