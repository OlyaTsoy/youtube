import "./search-result.css";
import Modal from "../modal/modal";

import { ReactComponent as Like } from "../../assets/heart.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as Grid } from "../../assets/grid.svg";

import YouTubeService from "../../services/YouTubeService";

import { setRequest } from "../../features/slices/searchSlice";
import { setVideos } from "../../features/slices/videosSlice";

import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const SearchResult = () => {
  const searchResult = useSelector((state) => state.searchResult.request);
  const videos = useSelector((state) => state.videos.videos);

  const searchParams = useSearchParams();

  const [showActive, setShowActive] = useState(true);
  const [search, setSearch] = useState(
    searchParams[0].get("favorites") || searchResult
  );
  const [searchResultTitle, setSearchResultTitle] = useState(search || "");
  const [openModal, setOpenModal] = useState(false);
  const [addFavorites, setAddFavorites] = useState(false);
  const [searchResultCount, setSearchResultCount] = useState(
    videos.length || 0
  );
  const [maxResultValue, setMaxResultValue] = useState(
    searchParams[0].get("maxResults") || 25
  );
  const [sortVideo, setSortVideo] = useState(searchParams[0].get("sort") || "relevance");
  const [searchResultSort, setSearchResultSort] = useState(sortVideo || "");

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRequestSub = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (search.length >= 1) {
      try {
        const res = await YouTubeService.get(
          `?q=${search}&maxResults=${maxResultValue}&order=${searchResultSort}`
        );
        const data = res;
        setSearchResultCount(data.data.items.length);
        setSearchResultTitle(search);
        setSearchResultSort(sortVideo);
        dispatch(setVideos(data.data.items));
        dispatch(setRequest(search));
      } catch (error) {
        console.log(error);
      } finally {
        setMaxResultValue(25);
      }
    }
  };
 
  useEffect(() => {
    const favSearch = searchParams[0].get("favorites");
    const favMaxResults = searchParams[0].get("maxResults");
    const favSort = searchParams[0].get("sort");
    if (favSearch) {
      setSearch(favSearch);
      setMaxResultValue(favMaxResults);
      setSortVideo(favSort);
      handleRequestSub();
    }
  }, []); // eslint-disable-line
  
  useEffect(() => {}, [showActive]);

  const videoList = videos.map((item) => {
    if (showActive) {
      return (
        <li className="result__gridItem" key={item.id.videoId}>
          <a href="#thumbnail">
            <img
              className="result__thumbnail"
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.thumbnails.high.url}
            ></img>
          </a>
          <div className="result__gridText">
            <a href="#videotitle" className="result__videoTitle">
              {item.snippet.title}
            </a>
            <span className="result__description">
              {item.snippet.description}
            </span>
          </div>
        </li>
      );
    } else {
      return (
        <li className="result__listItem" key={item.id.videoId}>
          <a href="#thumbnail">
            <img
              className="result__thumbnail"
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.thumbnails.high.url}
            ></img>
          </a>
          <div className="result__listText">
            <a href="#videotitle" className="result__videoTitle">
              {item.snippet.title}
            </a>
            <span className="result__description">
              {item.snippet.description}
            </span>
          </div>
        </li>
      );
    }
  });

  const toggleFavorites = (e) => {
    e.preventDefault();
    setAddFavorites(true);
    setTimeout(() => setAddFavorites(false), 3000);
    setOpenModal(false);
    setMaxResultValue(25);
    const userId = localStorage.getItem("activeUser");
    if (userId) {
      const localArr = JSON.parse(localStorage.getItem(userId));
      const localObj = {
        title: search,
        sort: sortVideo,
        maxResult: maxResultValue,
      };
      if (localArr) {
        let isMatch = false;
        localArr.forEach((el) => {
          if (el.title === search) {
            isMatch = true;
          }
        });
        if (!isMatch) {
          localArr.push(localObj);
          localStorage.setItem(userId, JSON.stringify(localArr));
        }
      } else {
        const objSearch = [];
        objSearch.push(localObj);
        localStorage.setItem(userId, JSON.stringify(objSearch));
      }
    }
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpenModal(false);
    setMaxResultValue(25);
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSelectChange = (value) => {
    setSortVideo(value);
  };

  const handleSliderChange = (num) => {
    setMaxResultValue(num);
  };

  return (
    <section className="result">
      <div className="container result__container">
        {openModal && (
          <Modal
            title={"Сохранить запрос"}
            btnClose={"Не сохранять"}
            btnOpen={"Сохранить"}
            setOpenModal={setOpenModal}
            toggleBtn={toggleFavorites}
            inputValue={search}
            inputChange={handleSearchChange}
            disabled={true}
            onChange={handleSelectChange}
            onHandle={handleSliderChange}
            maxResultValue={maxResultValue}
            handleCloseModal={handleCloseModal}
          />
        )}
        <div className="result__search">
          <h3 className="result__title">Поиск видео</h3>
          <form className="result__form">
            <div className="result__formWrapper">
              <input
                type="text"
                className="result__formField"
                value={search}
                onChange={handleSearchChange}
              ></input>
              <a href="#like" onClick={toggleModal}>
                <Like
                  className={`result__formLike ${
                    addFavorites ? "result__formLike-active" : ""
                  }`}
                ></Like>
              </a>
              <ul>
                {addFavorites ? (
                  <li className="result__fieldLike">
                    <p className="result__text">
                      Поиск сохранён в разделе «Избранное»
                    </p>
                    <Link to="/favorites" className="result__link">
                      Перейти в избранное
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <button className="result__formBtn" onClick={handleRequestSub}>
              Найти
            </button>
          </form>
        </div>
        <main className="result__content">
          <div className="result__panel">
            <span className="result__name">Видео по запросу</span>
            <span className="result__name__request">«{searchResultTitle}</span>
            <span className="result__name__request" style={{marginLeft: '0'}}>»</span>
            <span className="result__number">{searchResultCount}</span>
            <nav className="result__nav">
              <a
                href="#list"
                className="result__navView"
                onClick={() => setShowActive(false)}
              >
                <List
                  className={`result__navImage ${
                    showActive ? "" : "result__navImage-active"
                  }`}
                ></List>
              </a>
              <a
                href="#grid"
                className="result__navView"
                onClick={() => setShowActive(true)}
              >
                <Grid
                  className={`result__navImage ${
                    showActive ? "result__navImage-active" : ""
                  }`}
                ></Grid>
              </a>
            </nav>
          </div>
          <ul className={`${showActive ? "result__grid" : "result__list"}`}>
            {videoList}
          </ul>
        </main>
      </div>
    </section>
  );
};

export default SearchResult;
