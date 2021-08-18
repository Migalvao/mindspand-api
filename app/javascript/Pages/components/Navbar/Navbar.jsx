import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Button } from "../Button";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const show = props.current_user;

  return (
    <div className="navbar">
      <div className="navbar-container container">
        <Link href="/home" className="navbar-logo">
          <img
            src={require("../../../images/logo_white.svg")}
            alt="logo"
            className="navbar-logo"
          />
        </Link>
        {show ? (
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
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
                headers={window.defaultHeaders}
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
