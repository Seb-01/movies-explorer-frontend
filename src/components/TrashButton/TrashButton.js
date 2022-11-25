import React from "react";
import "./TrashButton.css";

function TrashButton(props) {
  console.log(props.card);

  const handleButtonClick = (event) => {
    props.onCardDelete(props.card);
  };

  return (
    <div>
      <button
        className="elements__trash-button"
        type="button"
        aria-label="Trash button"
        onClick={handleButtonClick}
      ></button>
    </div>
  );
}

export default TrashButton;
