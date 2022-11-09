import "./Header.css";
import LogoLink from "../LogoLink/LogoLink";
import Navigation from "../Navigation/Navigation";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import logoHeader from "../../images/logo_header.svg";

function Header(props) {
  return (
    <header className="header">
      <LogoLink logo={logoHeader} />
      <Navigation
        isBlack="true"
        updateIsOpenPopupMenu={props.updateIsOpenPopupMenu}
      />
      <HeaderProfile />
    </header>
  );
}

export default Header;
