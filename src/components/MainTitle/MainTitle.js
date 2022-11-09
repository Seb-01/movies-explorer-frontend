import "./MainTitle.css";

function MainTitle(props) {
  return (
    <div className="main-title__container">
      <h2 className="main-title__title">{props.title}</h2>
    </div>
  );
}

export default MainTitle;
