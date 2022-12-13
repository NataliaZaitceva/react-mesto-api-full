import React from "react";

function Footer() {
  return (
    <header className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Mesto Russia
      </p>
    </header>
  );
}

export default Footer;
