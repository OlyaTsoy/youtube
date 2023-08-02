import "./modal.css";

import { Slider } from "antd";

const Modal = ({
  title,
  btnClose,
  btnOpen,
  toggleBtn,
  inputValue,
  inputChange,
  disabled,
  onChange,
  onHandle,
  maxResultValue,
  handleCloseModal,
  sortVideo
}) => {

  const handleSliderChange = (newValue) => {
    onHandle(newValue);
  };

  const handleSelectChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="modal">
      <div className="container">
      <div className="modal__window">
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">
          <div className="modal__form__wrapper">
            <span className="modal__form__name">Запрос</span>
            <input
              type="text"
              className={`modal__form__field ${
                disabled ? "modal__form__field-static" : ""
              }`}
              value={inputValue}
              onChange={inputChange}
              disabled={disabled}
            ></input>
          </div>
          <div className="modal__form__wrapper">
            <span className="modal__form__name modal__form__name-symbol">
              Название
            </span>
            <input
              type="text"
              className="modal__form__field"
              placeholder="Укажите название"
            ></input>
          </div>
          <div className="modal__form__wrapper">
            <span className="modal__form__name">Сортировать по</span>
            <select
              className="modal__form__field"
              onChange={handleSelectChange}
              value={sortVideo}
            >
              <option value="relevance">Без сортировки</option>
              <option value="viewCount">Количество просмотров</option>
              <option value="videoCount">Количество видео</option>
              <option value="date">Дата</option>
              <option value="rating">Рейтинг</option>
              <option value="title">Название</option>
            </select>
          </div>
          <div className="modal__form__items">
            <div className="modal__form__wrapper modal__form__wrapper-slider">
              <label>Максимальное количество</label>
              <Slider
                type="range"
                min={1}
                max={50}
                value={maxResultValue}
                onChange={handleSliderChange}
                className="modal__form__range"
              ></Slider>
            </div>
            <input
              type="numder"
              min={1}
              max={50}
              value={maxResultValue}
              onChange={(e) => handleSliderChange(e.target.value)}
              className="modal__form__numder"
            ></input>
          </div>
          <div className="modal__form__buttons">
            <button
              className="modal__form__btn modal__form__btn-white"
              onClick={handleCloseModal}
            >
              {btnClose}
            </button>
            <button
              className="modal__form__btn modal__form__btn-blue"
              onClick={toggleBtn}
            >
              {btnOpen}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Modal;
