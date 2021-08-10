import React, { Component } from "react";
import Layout from "./Layout";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import "../stylesheets/body.css";
import "../stylesheets/Home.css";

class Homepage extends Component {
  render() {
    const token = document.querySelector("[name=csrf-token]").content;
    const headers = { "X-CSRF-Token": token };

    return (
      <main>
        <Navbar current_user={this.props.current_user} />

        <img
          src={require("../images/banner.svg")}
          alt="banner"
          className="hero-img"
        />
        <Head title="Welcome" />
        <p>Hello, welcome to your first Inertia app!</p>
        <p id="p1">This is cool!</p>
        <p className="paragraph">This is cool!</p>

        <Link href="/logout" method="delete" headers={headers} as="button">
          Logout
        </Link>
        <Footer />
      </main>
    );
  }
}

export default Homepage;
