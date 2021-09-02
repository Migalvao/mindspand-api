import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/inertia-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { Inertia } from "@inertiajs/inertia";

function Navbar(props) {
  const { i18n } = useTranslation();

  const [click, setClick] = useState(false);
  const [button] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const show = props.current_user;
  const profileUrl = show ? `/users/${props.current_user.id}` : "/home";

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
              <MdNotifications
                onClick={() => {
                  Inertia.get("/notifications");
                }}
              />
            </div>
            <div className="navbar-menu-icon-burger" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        ) : null}
        {show ? (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <div className="nav-btn-lang-group">
              <button
                className="nav-btn-lang"
                onClick={() => {
                  i18n.changeLanguage("pt");
                }}
              >
                PT
              </button>
              <button
                className="nav-btn-lang"
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                EN
              </button>
            </div>

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
              <Link href="/connections" className="nav-links">
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link href={profileUrl} className="nav-links">
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
          <Link href="/login" className="btn-link">
            <Button
              buttonStyle="btn--outline"
              buttonSize="button ? '' : btn--mobile"
              onClick={button ? null : closeMobileMenu}
            >
              Sign in
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

Navbar.propTypes = {
  current_user: PropTypes.object,
};

export default Navbar;
