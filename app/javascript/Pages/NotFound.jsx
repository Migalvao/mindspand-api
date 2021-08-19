import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Profile() {
  return (
    <main>
      <h1>Not found</h1>
      <p>Why not go back?</p>

      <Link href="/home" headers={window.defaultHeaders} as="button">
        Home
      </Link>
    </main>
  );
}
