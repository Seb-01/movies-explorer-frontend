import "./PortfolioListBullet.css";

function PortfolioListBullet(props) {
  return (
    <div className="portfolio-list-bullet">
      <a
        href={props.value.link}
        target="blank"
        className="portfolio-list-bullet__value"
      >
        {props.value.text}
      </a>
      <a href={props.value.link} target="blank">
        <img
          className="portfolio-list-bullet__arrow"
          src={props.value.pic}
          alt="Изображение ссылки на проект из портфолио"
        />
      </a>
    </div>
  );
}

export default PortfolioListBullet;
