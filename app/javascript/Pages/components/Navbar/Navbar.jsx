import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import "./navbar.scss";
import { Button } from "../Button";

function Navbar(props) {
  const token = document.querySelector("[name=csrf-token]").content;
  const headers = { "X-CSRF-Token": token };

  const [click, setClick] = useState(false);
  const [button] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const show = props.current_user;

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link href="/home" className="navbar-logo">
          <img
            src={require("../../../images/logo_white.svg")}
            alt="logo"
            className="navbar-logo"
          />
        </Link>
        {show ? (
          <div className="navbar-menu-icons">
            <div className="navbar-menu-icon-notification">
              <MdNotifications />
            </div>
            <div className="navbar-menu-icon-burger" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        ) : null}
        {show ? (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link href="/home" className="nav-links">
                Homepage
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/classes" className="nav-links">
                Classes
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-links">
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-links">
                Profile
              </Link>
            </li>
            <li className="logout">
              <Link
                href="/logout"
                method="delete"
                headers={headers}
                as="button"
                className="btn-logout"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : null}
      </div>

      {!show ? (
        <div>
          {button ? (
            <Link href="login" className="btn-link">
              <Button buttonStyle="btn--outline">Sign in</Button>
            </Link>
          ) : (
            <Link href="/login" className="btn-link">
              <Button
                buttonStyle="btn--outline"
                buttonSize="btn--mobile"
                onClick={closeMobileMenu}
              >
                Sign in
              </Button>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default Navbar;
