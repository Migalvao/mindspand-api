import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import CardClasses from "./components/CardClasses";

export default function Profile(props) {
  const [classes, setClasses] = useState([]);

  const [click, setClick] = useState("aboutme");

  const handleClick = (newState) => setClick(newState);

  const avatar = (image) => {
    return `${image}?tr=,r-max`;
  };

  const createClassUrl = () => {
    return `/users/${props.user.id}/classes/create`;
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

  useEffect(() => {
    axios
      .get(`/api/users/${props.user.id}/classes`)
      .then((response) => setClasses(response.data));
  }, []);

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

      <div
        className={click == "skills" ? "profile-skills" : "profile-skills off"}
      >
        {props.can_edit ? (
          <Link href={createClassUrl()} className="btn-chip-profile">
            Add new class
          </Link>
        ) : null}
        <div className="classes-wrapper">
          {classes.length ? (
            classes.map((c, index) => {
              return <CardClasses classesData={c} key={index} />;
            })
          ) : (
            <p className="no-classes">No classes found</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

Profile.propTypes = {
  can_edit: PropTypes.bool,
  user: PropTypes.object.isRequired,
};
