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
              Фронтенд-разработчик, 30 лет
            </h3>
            <p className="about-me__content-description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
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
