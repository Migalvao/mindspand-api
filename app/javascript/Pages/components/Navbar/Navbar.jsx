import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import "./Navbar.css";
import { Link } from "@inertiajs/inertia-react";

const imagesPath = {
  burger: require("../../../images/burger.svg"),
  close: require("../../../images/close.svg"),
};

class Navbar extends Component {
  state = { clicked: false };

  toggleImage = () => {
    this.setState((state) => ({ clicked: !state.clicked }));
  };

  getImageName = () => (this.state.clicked ? "close" : "burger");

  render() {
    const imageName = this.getImageName();
    const show = this.props.current_user;
    return (
      <nav className="NavbarItems">
        <img
          src={require("../../../images/logo_white.svg")}
          alt="logo"
          className="navbar-logo"
        />
        <div className="menu-icon">
          {show ? (
            <img src={imagesPath[imageName]} onClick={this.toggleImage} />
          ) : null}
        </div>
        <div>
          {" "}
          {show ? (
            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
              {MenuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      className={item.cName}
                      href={item.url}
                      activeclasscame="main-nav-active"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div>{!show ? <Button>Sign in</Button> : null}</div>
      </nav>
    );
  }
}

export default Navbar;
