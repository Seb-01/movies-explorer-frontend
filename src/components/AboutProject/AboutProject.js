import MainTitle from "../MainTitle/MainTitle";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="about-project" id="about">
      <MainTitle title="О проекте" />
      <section className="about-project__content-container">
        <div className="about-project__content-wrapper">
          <h3 className="about-project__content-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__content-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__content-wrapper">
          <h3 className="about-project__content-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__content-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </section>

      <section className="about-project__graph-container">
        <div className="about-project__graph-cell about-project__graph-cell_color-green">
          <span className="about-project__graph-cell-duration">1 неделя</span>
        </div>
        <div className="about-project__graph-cell about-project__graph-cell_color-light-gray-shade">
          <span className="about-project__graph-cell-duration">4 недели</span>
        </div>
        <div className="about-project__graph-cell">
          <span className="about-project__graph-cell-value">Back-end</span>
        </div>
        <div className="about-project__graph-cell">
          <span className="about-project__graph-cell-value">Front-end</span>
        </div>
      </section>
    </div>
  );
}

export default AboutProject;
