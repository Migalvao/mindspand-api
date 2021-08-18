import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/Home.css";

class Homepage extends Component {
  render() {
    return (
      <main>
        <Navbar current_user={this.props.current_user} />

        <img
          src={require("../images/banner.svg")}
          alt=""
          role="presentation"
          className="hero-img"
        />
        <Head title="Welcome" />
        <p>Hello, welcome to your first Inertia app!</p>
        <p className="paragraph">This is cool!</p>

        <Link
          href="/logout"
          method="delete"
          headers={window.defaultHeaders}
          as="button"
        >
          Logout
        </Link>
        <Footer />
      </main>
    );
  }
}

export default Homepage;
