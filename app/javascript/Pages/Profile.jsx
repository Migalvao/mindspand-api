import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import Layout from "./Layout";

export default function Profile(props) {
  const [click, setClick] = useState("aboutme");

  const handleClick = (newState) => setClick(newState);

  const avatar = (image) => {
    return `${image}?tr=,r-max`;
  };

  const EditButton = () => {
    if (props.can_edit) {
      return (
        <Link
          className="btn-edit-profile"
          href={props.user.id + "/edit"}
          headers={window.defaultHeaders}
          as="button"
        >
          Edit Profile
        </Link>
      );
    }
    return null;
  };

  return (
    <Layout current_user={props.user}>
      <div className="profile-info">
        <img
          src={avatar(props.user.avatar.url)}
          alt="Avatar"
          className="profile-info-avatar"
        />
        <p className="profile-info-username">{props.user.username}</p>
        <p className="profile-info-name">{props.user.name}</p>
        <p className="profile-info-rating">{props.user.rating} stars</p>
        <EditButton />
      </div>

      <div>
        <ul className="profile-menu">
          <li
            className={
              click == "aboutme"
                ? "profile-menu-btn active"
                : "profile-menu-btn"
            }
            onClick={() => handleClick("aboutme")}
          >
            About me
          </li>
          <li
            className={
              click == "skills" ? "profile-menu-btn active" : "profile-menu-btn"
            }
            onClick={() => handleClick("skills")}
          >
            Skills
          </li>
          <li
            className={
              click == "history"
                ? "profile-menu-btn active"
                : "profile-menu-btn"
            }
            onClick={() => handleClick("history")}
          >
            History
          </li>
        </ul>
      </div>
      <div
        className={
          click == "aboutme" ? "profile-aboutme" : "profile-aboutme off"
        }
      >
        <h1 className="home-title">About me</h1>
        <p className="profile-aboutme-text">{props.user.description}</p>
        <br></br>
      </div>
    </Layout>
  );
}

Profile.propTypes = {
  can_edit: PropTypes.bool,
  user: PropTypes.object.isRequired,
};
