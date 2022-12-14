import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab(props) {
  return (
    <ul className="navtab">
      <li className="navtab__item">
        <a href="#about" className="navtab__link">
          О проекте
        </a>
      </li>
      <li className="navtab__item">
        <a href="#tech" className="navtab__link">
          Технологии
        </a>
      </li>
      <li className="navtab__item">
        <a href="#student" className="navtab__link">
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
