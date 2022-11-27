import "./SearchForm.css";
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import React, { useEffect, useState } from "react";

function SearchForm(props) {
  // стейт отслеживающий чек-бокс
  const [checked, setChecked] = React.useState(props.checkShort);
  // управляемый элемент input
  const [queryText, setQueryText] = useState(props.queryText);
  console.log(`SearchForm получил входной чек: ${props.checkShort}`);

  // обработчик чек-бокса
  const handleCheckBox = (newCheked) => {
    setChecked(newCheked);
  };

  //обрабочки ввода в поле input
  const handleQuery = (event) => {
    const target = event.target;
    const value = target.value;
    setQueryText(value);
  };

  // обработчик формы
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(queryText, checked);
  };

  return (
    <section className="search-form">
      {/* Правильно подставляем имя формы! */}
      <form
        name={props.formName}
        className="search-form__form"
        onSubmit={handleSubmit}
        action="#"
        noValidate
      >
        <div className="search-form__search-container">
          <input
            value={queryText}
            id="query-text-input"
            name="query"
            className="search-form__input"
            type="text"
            onChange={handleQuery}
            required
            placeholder={props.placeholder}
          ></input>
          <button className="search-form__button" type="submit">
            {props.buttonSubmitText}
          </button>
        </div>
        <FilterCheckBox onChange={handleCheckBox} initCheck={checked} />
      </form>
    </section>
  );
}

export default SearchForm;
