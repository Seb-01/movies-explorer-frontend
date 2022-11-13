import "./Promo.css";

function Promo(props) {
  return (
    <section className="promo">
      <img
        className="promo__banner"
        src={props.banner}
        alt="Баннер страницы О проекте"
      />
      <p className="promo__landing-text">
        Учебный проект студента факультета Веб-разработки.
      </p>
    </section>
  );
}

export default Promo;
