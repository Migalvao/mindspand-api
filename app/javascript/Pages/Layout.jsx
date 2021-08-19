import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";

export default function Layout(props) {
  return (
    <main>
      <Navbar current_user={props.current_user} />
      <article>{props.children}</article>
    </main>
  );
}
