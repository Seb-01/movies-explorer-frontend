import "./HeaderProfileAuthorized.css";
import { Link } from "react-router-dom";
import ProfileIconAuthorized from "../ProfileIconAuthorized/ProfileIconAuthorized";
import profileIconAuth from "../../images/profile_icon_authorized.svg";

function HeaderProfileAuthorized(props) {
  return (
    <header className="header-profile-auth">
      <ProfileIconAuthorized icon={profileIconAuth} />
      <Link to="/profile" className="header-profile-auth__link">
        Аккаунт
      </Link>
    </header>
  );
}

export default HeaderProfileAuthorized;
