import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab(props) {
  return (
    <div className="navtab">
      <Link to="/" className="navtab__link">
        О проекте
      </Link>
      <Link to="/technologies" className="navtab__link">
        Технологии
      </Link>
      <Link to="/student" className="navtab__link">
        Студент
      </Link>
    </div>
  );
}

export default NavTab;
