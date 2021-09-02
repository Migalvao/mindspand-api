import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/inertia-react";
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

    Inertia.put("/users/" + props.user.id + "/avatar", values, state, {
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
            Inertia.get("/users");
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="image" className="edit-profile-avatar-form-label">
            Change profile photo
            <input
              type="file"
              name="avatar"
              accept="image/*"
              multiple={false}
              onChange={onImageChange}
              className="edit-profile-avatar-form-input"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {/*////////(((((((())))))))////////*/}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          id="name"
          defaultValue={props.user.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <br />
        <input
          id="username"
          defaultValue={props.user.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          id="email"
          defaultValue={props.user.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          defaultValue={props.user.description}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save</button>
      </form>
      <Link
        href={"/users/" + props.user.id}
        headers={window.defaultHeaders}
        as="button"
      >
        Cancel
      </Link>
    </main>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
};
