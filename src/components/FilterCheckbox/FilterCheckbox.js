import "./FilterCheckbox.css";
import React from "react";

function FilterCheckBox(props) {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className="checkbox__container">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        ></input>
        <svg
          className={`checkbox__mark ${
            isChecked ? "checkbox__mark_active" : ""
          }`}
        ></svg>
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckBox;
