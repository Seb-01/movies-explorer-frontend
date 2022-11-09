import React from "react";
import "./PopupWithoutForm.css";
import buttonClosePic from "../../images/button_close.svg";

function PopupWithoutForm(props) {
  // console.log(props.isOpen);
  // console.log(`popup ${props.isOpen && "popup_opened"}`);
  // console.log(`popup ${props.isOpen === true ? "popup_opened" : ""}`);

  return (
    <div className={`popup${props.isOpen === true ? " popup_opened" : ""}`}>
      <div className="popup__container">
        {/* тут будет вложенное содержимое в виде JSX-разметки */}
        {props.children}
        <button
          className="popup__close-button"
          type="button"
          aria-label="Close button"
          onClick={props.onClose}
        >
          <img
            className="popup__close-button-image"
            src={buttonClosePic}
            alt="Изображение кнопки меню"
          />
        </button>
      </div>
    </div>
  );
}

export default PopupWithoutForm;
