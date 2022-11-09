import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import React from "react";

function SearchForm(props) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="search-form">
      {/* Правильно подставляем имя формы! */}
      <form
        name={props.formName}
        className="search-form__form"
        onSubmit={props.onSubmit}
      >
        <div className="search-form__search-container">
          <input
            className="search-form__input"
            type="text"
            placeholder={props.placeholder}
          ></input>
          <button className="search-form__button" type="submit">
            {props.buttonSubmitText}
          </button>
        </div>
        <FilterCheckBox onChange={handleChange} />
      </form>
    </div>
  );
}

export default SearchForm;
