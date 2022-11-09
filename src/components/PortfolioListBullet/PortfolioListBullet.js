import "./PortfolioListBullet.css";

function PortfolioListBullet(props) {
  return (
    <div className="portfolio-list-bullet">
      <span className="portfolio-list-bullet__value">{props.value.text}</span>
      <a href={props.value.link}>
        <img
          src={props.value.pic}
          alt="Изображение ссылки на проект из портфолио"
        />
      </a>
    </div>
  );
}

export default PortfolioListBullet;
