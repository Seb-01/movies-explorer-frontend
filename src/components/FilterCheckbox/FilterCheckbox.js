import "./FilterCheckbox.css";
import React, { useEffect } from "react";

function FilterCheckBox(props) {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (event) => {
    setIsChecked(!isChecked);
    alert(`FilterCheckBox: ${isChecked}!`);
    props.onChange();
  };

  useEffect(() => {
    setIsChecked(props.initCheck);
  }, [props.initCheck]);

  return (
    <div className="checkbox__container">
      <label className="checkbox__label">
        <input
          className="checkbox__input"
          type="checkbox"
          onChange={handleChange}
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
