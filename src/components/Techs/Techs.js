import MainTitle from "../MainTitle/MainTitle";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="tech">
      <MainTitle title="Технологии" />
      <section className="techs__content-container">
        <h3 className="techs__content-title">7 технологий</h3>
        <p className="techs__content-description">
          На курсе веб-разработки мы освоили технологии, которые применили{" "}
          <br />в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__list-item">HTML</li>
          <li className="techs__list-item">CSS</li>
          <li className="techs__list-item">JS</li>
          <li className="techs__list-item">React</li>
          <li className="techs__list-item">Git</li>
          <li className="techs__list-item">Express.js</li>
          <li className="techs__list-item">mongoDB</li>
        </ul>
      </section>
    </section>
  );
}

export default Techs;
