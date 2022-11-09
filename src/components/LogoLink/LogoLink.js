import React from "react";
import "./LogoLink.css";
import { Link } from "react-router-dom";

function LogoLink(props) {
  return (
    <div className="logo-link">
      <Link to="/">
        <img src={props.logo} alt="Лого Movies-Explorer" />
      </Link>
    </div>
  );
}

export default LogoLink;
