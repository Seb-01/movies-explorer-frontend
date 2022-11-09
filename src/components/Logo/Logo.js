import "./Logo.css";

function Logo(props) {
  return (
    <div className="logo">
      <img src={props.logo} alt="Лого Movies-Explorer" />
    </div>
  );
}

export default Logo;
