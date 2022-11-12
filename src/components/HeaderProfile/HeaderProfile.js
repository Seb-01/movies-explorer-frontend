import "./HeaderProfile.css";
import { Link } from "react-router-dom";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import profileIcon from "../../images/profile_icon.svg";

function HeaderProfile(props) {
  return (
    <header className="header-profile">
      <Link to="/profile" className="header-profile__link">
        Аккаунт
      </Link>
      <ProfileIcon icon={profileIcon} />
    </header>
  );
}

export default HeaderProfile;
