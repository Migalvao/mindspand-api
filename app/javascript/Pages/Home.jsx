import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Head, Link } from "@inertiajs/inertia-react";
import "../stylesheets/body.css";
import "../stylesheets/Home.css";
import { useState, useEffect } from "react";
import SocialCard from "./components/SocialCard";
import "../stylesheets/body.css";
import "../stylesheets/Home.css";

function Homepage(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  const [items, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let newClassData;
      try {
        const response = await fetch("/api/classes");
        newClassData = await response.json();
      } catch (error) {
        console.log(error);
        newClassData = [];
      }

      setUsers(newClassData);
    })();
  }, []);
  return (
    <main>
      <Navbar current_user={props.current_user} />
      <div className="hero-img"></div>

      <Head title="Welcome" />

      <div className="newClasses">
        <h1>New classes added every week</h1>
        <div className="newClasses-wrapper">
          {items.map((item, index) => {
            return (
              <SocialCard
                newClassData={item}
                key={index}
                className="newc-card"
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}

{
  /*class Homepage extends Component {
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
}*/
}

export default Homepage;
