import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "./Layout";

export default function Profile(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    Inertia.put("/users/" + props.user.id + "/avatar", state, {
      headers: window.defaultHeaders,
    });
  };

  const state = { avatar: null };

  const onImageChange = (event) => {
    state.avatar = event.target.files[0];
  };

  const link = props.curent_avatar + "?tr=w-250,h-300";
  return (
    <Layout current_user={props.user}>
      <img src={link} alt="Avatar" />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">
          Upload image
          <input
            type="file"
            name="avatar"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <Link href="/home" headers={window.defaultHeaders} as="button">
        Home
      </Link>
    </Layout>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  curent_avatar: PropTypes.string.isRequired,
};
