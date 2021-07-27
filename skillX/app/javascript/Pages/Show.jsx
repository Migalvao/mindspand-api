import React from "react";
import Layout from "./Layout";
import { Head } from "@inertiajs/inertia-react";

export default function Welcome(props) {
  console.log(props);
  return (
    <Layout>
      <Head title="Welcome" />
      <h1>Welcome</h1>
      <p>Hello, welcome to your first Inertia app!</p>
      <p>This is cool!</p>
    </Layout>
  );
}
