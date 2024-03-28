import React from "react";
import Logo from "../../Assets/logo.png";
import "./topnav.css";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Authentication/login");
  };
  return (
    <div className="topnav-header">
      <Link to={"/"} className="nav-logo">
        <img src={Logo} alt="logo" />
      </Link>
      <div className="topnav-btn-container">
        <Link className="logout" to="/existingreferral">
          {" "}
          Existing referrals
        </Link>

        <div onClick={logout} className="logout">
          <BiLogOutCircle /> Logout
        </div>
      </div>
    </div>
  );
}

export default TopNav;
