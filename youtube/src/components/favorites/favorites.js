import "./favorites.css";
import Modal from "../modal/modal";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const userId = localStorage.getItem("activeUser");
  const favorites = localStorage.getItem(userId);
  const arr = JSON.parse(favorites);

  const [items, setItems] = useState(arr || []);
  const [openModal, setOpenModal] = useState(false);
  const [request, setRequest] = useState("");
  const [sortVideo, setSortVideo] = useState("");
  const [maxResultValue, setMaxResultValue] = useState(0);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(null);

  const deleteItem = (idx) => {
    setItems((prevItem) =>
      prevItem.filter((item, itemIdx) => {
        return itemIdx !== idx;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem(userId, JSON.stringify(items));
  }, [items, userId]);

  const favoritesList = items.map((el, idx) => {
    return (
      <li className="favorites__field" key={idx}>
        <Link
          to={{
            pathname: "/search/result",
            search: `?favorites=${el.title}&sort=${el.sort}&maxResults=${el.maxResult}`,
          }}
          className="favorites__request"
        >
          {el.title}
        </Link>
        <div className="favorites__requestItem">
          <a
            href="#change"
            className="favorites__change"
            onClick={() => toggleModal(idx)}
          >
            Изменить
          </a>
          <a
            href="#delete"
            className="favorites__delete"
            onClick={() => deleteItem(idx)}
          >
            Удалить
          </a>
        </div>
      </li>
    );
  });

  const toggleModal = (idx) => {
    setOpenModal(!openModal);
    setRequest(items[idx].title);
    setSortVideo(items[idx].sort);
    setMaxResultValue(items[idx].maxResult);
    setCurrentActiveIndex(idx);
  };

  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const toggleChange = (e) => {
    e.preventDefault();
    items[currentActiveIndex].title = request;
    items[currentActiveIndex].sort = sortVideo;
    items[currentActiveIndex].maxResult = maxResultValue;
    localStorage.setItem(userId, JSON.stringify(items));
    setOpenModal(false);
  };

  const handleSelectChange = (newValue) => {
    setSortVideo(newValue);
  };

  const handleSliderChange = (newValue) => {
    setMaxResultValue(newValue);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpenModal(false);
    setMaxResultValue(25);
  }

  if (items.length > 0) {
    return (
      <section className="favorites">
      <div className="container favorites__container">
        {openModal && (
          <Modal
            title={"Изменить запрос"}
            btnClose={"Не изменять"}
            btnOpen={"Изменить"}
            setOpenModal={setOpenModal}
            inputValue={request}
            inputChange={handleRequestChange}
            toggleBtn={toggleChange}
            disabled={false}
            sortVideo={sortVideo}
            maxResultValue={maxResultValue}
            onChange={handleSelectChange}
            onHandle={handleSliderChange}
            handleCloseModal={handleCloseModal}
          />
        )}
        <h2 className="favorites__title">Избранное</h2>
        <ul className="favorites__items">{favoritesList}</ul>
      </div>
    </section>
    )
  } else {
    return (
      <h2 className="error">У Вас нет сохранённых запросов. Перейдите на страницу "Поиск" и сохраните запрос.</h2>
    )
  }
};

export default Favorites;
