import "./MainHeaderAuthorized.css";
import LogoLink from "../LogoLink/LogoLink";
import logoHeader from "../../images/logo_header_authorized.svg";
import Navigation from "../Navigation/Navigation";
import HeaderProfileAuthorized from "../HeaderProfileAuthorized/HeaderProfileAuthorized";

function MainHeaderAuthorized(props) {
  return (
    <header className="main-header">
      <LogoLink logo={logoHeader} />
      <Navigation
        auth="true"
        updateIsOpenPopupMenu={props.updateIsOpenPopupMenu}
      />
      <HeaderProfileAuthorized />
    </header>
  );
}

export default MainHeaderAuthorized;
