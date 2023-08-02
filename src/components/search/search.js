import "./search.css";

import YouTubeService from "../../services/YouTubeService";
import { setRequest } from "../../features/slices/searchSlice";
import { setVideos } from "../../features/slices/videosSlice";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    if (search.length >= 1) {
      const response = await YouTubeService.get(`?q=${search}&maxResults=${25}`);
      const data = response;
  
      dispatch(setVideos(data.data.items));
      dispatch(setRequest(search));
  
      if (localStorage.getItem("activeUser")) {
        console.log("Пользователь зарегистрирован!");
        navigate("/search/result");
      } else {
        console.log("Пользователь не зарегистрирован!");
      }
    }
  };

  return (
    <section className="search">
      <div className="container search__container">
        <h3 className="search__title">Поиск видео</h3>
        <form className="search__form">
          <input
            type="text"
            className="search__form__request"
            placeholder="Что хотите посмотреть?"
            value={search}
            onChange={onSearchChange}
          ></input>
          <button
            type="submit"
            className="search__form__button"
            onClick={handleRequest}
          >
            Найти
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
