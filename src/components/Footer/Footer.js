import "./Footer.css";

function Footer(props) {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <section className="footer__content">
        <p className="footer__copyrigth">&copy; {new Date().getFullYear()}</p>
        <div className="footer__links">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/profile/web/"
            target="blank"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/Seb-01"
            target="blank"
          >
            GitHub
          </a>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
