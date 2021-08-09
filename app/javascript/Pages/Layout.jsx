import React, { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Layout(props, { children }) {
  return (
    <main>
      {/*<header>
        <Link href="/">Home</Link>
        <Link href={"/users/" + props.current_user.id}>
          Profile
        </Link>
        <Link href="/contact">Contact</Link>
      </header>*/}
      <article>{props.children}</article>
    </main>
  );
}
