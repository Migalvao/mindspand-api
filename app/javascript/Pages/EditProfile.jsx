import React, { useState } from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { IoIosArrowBack } from "react-icons/io";

export default function Profile(props) {
  const ErrorMessage = () => {
    if (props.error) {
      return <p>{props.error}</p>;
    }
    return null;
  };

  const [values, setValues] = useState({
    name: props.user.name,
    username: props.user.username,
    email: props.user.email,
    description: props.user.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.put("/users/" + props.user.id, values, {
      headers: window.defaultHeaders,
    });
  };

  const handleSubmitAvatar = (e) => {
    e.preventDefault();

    Inertia.put("/users/" + props.user.id + "/avatar", state, {
      headers: window.defaultHeaders,
    });
  };

  const avatar = (image) => {
    return `${image}?tr=,r-max`;
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  };

  const state = { avatar: null };

  const onImageChange = (event) => {
    state.avatar = event.target.files[0];
  };

  return (
    <main className="edit-profile">
      <ErrorMessage />
      <div className="edit-profile-header">
        <IoIosArrowBack
          onClick={() => {
            Inertia.get(`/users/${props.user.id}`);
          }}
        />
        <h1 className="edit-profile-title">Edit Profile</h1>
      </div>

      <div className="edit-profile-avatar">
        <img
          src={avatar(props.user.avatar.url)}
          alt="Avatar"
          className="edit-profile-avatar-img"
        />
        <form onSubmit={handleSubmitAvatar}>
          <label
            htmlFor="imageUploader"
            className="edit-profile-avatar-form-label"
          >
            Change profile photo
            <input
              id="imageUploader"
              type="file"
              name="avatar"
              accept="image/*"
              multiple={false}
              onChange={onImageChange}
              className="edit-profile-avatar-form-input"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            className="edit-profile-avatar-form-submit"
          />
        </form>
      </div>
      <form onSubmit={handleSubmit} className="form-2">
        <div className="form-2-row">
          <label className="form-2-label" htmlFor="name">
            Name
          </label>

          <input
            className="form-2-input"
            id="name"
            defaultValue={props.user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-2-row">
          <label className="form-2-label" htmlFor="username">
            Username
          </label>

          <input
            className="form-2-input"
            id="username"
            defaultValue={props.user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-2-row">
          <label className="form-2-label" htmlFor="email">
            Email
          </label>

          <input
            className="form-2-input"
            id="email"
            defaultValue={props.user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-2-row">
          <label className="form-2-label" htmlFor="description">
            Description
          </label>

          <textarea
            className="form-2-text"
            id="description"
            defaultValue={props.user.description}
            onChange={handleChange}
          />
        </div>
        <div className="background-btn">
          <button className="btn-ask-class" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </main>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
};
