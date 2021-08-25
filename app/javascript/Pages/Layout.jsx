import React from "react";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar/Navbar";

export default function Layout(props) {
  return (
    <main>
      <Navbar current_user={props.current_user} />
      <article>{props.children}</article>
    </main>
  );
}

Layout.propTypes = {
  current_user: PropTypes.object.isRequired,
  children: PropTypes.array,
};
