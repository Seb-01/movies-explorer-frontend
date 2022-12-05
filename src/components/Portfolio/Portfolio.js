import PortfolioListBullet from "../PortfolioListBullet/PortfolioListBullet";
import "./Portfolio.css";
import ProfilProjectLinkPic from "../../images/profile_project_link.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <section className="portfolio__content-container">
        <h3 className="portfolio__content-title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <PortfolioListBullet
              value={{
                text: "Статичный сайт",
                link: "https://github.com/Seb-01/mesto",
                pic: ProfilProjectLinkPic,
              }}
            />
          </li>
          <li className="portfolio__list-item">
            <PortfolioListBullet
              value={{
                text: "Адаптивный сайт",
                link: "https://github.com/Seb-01/mesto-react-node-15",
                pic: ProfilProjectLinkPic,
              }}
            />
          </li>
          <li className="portfolio__list-item">
            <PortfolioListBullet
              value={{
                text: "Одностраничное приложение",
                link: "https://github.com/Seb-01/movies-explorer-frontend",
                pic: ProfilProjectLinkPic,
              }}
            />
          </li>
        </ul>
      </section>
    </section>
  );
}

export default Portfolio;
