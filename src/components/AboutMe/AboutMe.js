import MainTitle from "../MainTitle/MainTitle";
import "./AboutMe.css";
import Author from "../../images/author.png";

function AboutMe(props) {
  return (
    <div className="about-me">
      <MainTitle title="Студент" />

      <div className="about-me__content-container">
        <section className="about-me__abc" id="student">
          <article className="about-me__content-wrapper">
            <h2 className="about-me__content-title">Вячеслав</h2>
            <h3 className="about-me__content-subtitle">
              Руководитель продукта
            </h3>
            <p className="about-me__content-description">
              По образованию авиационный инженер, по призванию - операционный
              менеджер, по роду деятельности - владелец продукта в самом
              масштабном ИТ-проекте страны - портал gosuslugi.ru. И чтобы
              работать с максимальной самоотдачей постоянно занимаюсь
              самообразованием. Курсы от Университета 20.35 с замечательной
              командой Яндекс.Практикум очередной шаг к познанию профессии
              Веб-разработчика.
            </p>
          </article>
          <a
            href="https://github.com/Seb-01"
            className="about-me__content-link"
          >
            GitHub
          </a>
        </section>
        <section className="about-me__content-photo-wrapper">
          <img
            className="about-me__content-photo"
            src={Author}
            alt="Фото автора"
          />
        </section>
      </div>
    </div>
  );
}

export default AboutMe;
