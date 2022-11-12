import "./MainTitle.css";

function MainTitle(props) {
  return (
    <section className="main-title__container">
      <h2 className="main-title__title">{props.title}</h2>
    </section>
  );
}

export default MainTitle;
