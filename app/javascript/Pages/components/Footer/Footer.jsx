import React from "react";
import "./footer.scss";
import { Link } from "@inertiajs/inertia-react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <Link href="/home" className="footer-logo">
        <img
          src={require("../../../images/logo_white.svg")}
          alt="logo"
          className="footer-logo"
        />
      </Link>

      <p className="social-text">Connect with us!</p>
      <section className="social-media">
        <div className="social-media-wrapper">
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              href="/"
              targ="_blank"
              aria-label="Facebook"
            >
              <FaFacebook />
            </Link>
            <Link
              className="social-icon-link twitter"
              href="/"
              targ="_blank"
              aria-label="Twitter"
            >
              <FaTwitter />
            </Link>
            <Link
              className="social-icon-link linkedin"
              href="/"
              targ="_blank"
              aria-label="Linkedin"
            >
              <FaLinkedin />
            </Link>
            <Link
              className="social-icon-link instagram"
              href="/"
              targ="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </section>

      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link href="/"> ABOUT US</Link>
          </div>
          <div className="footer-link-items">
            <Link href="/"> HELP</Link>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <Link href="/"> PRIVACY</Link>
          </div>
          <div className="footer-link-items">
            <Link href="/"> TERMS</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
