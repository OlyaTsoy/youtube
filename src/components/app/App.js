import { BrowserRouter, Routes, Route } from "react-router-dom";

import AutorizationPage from "../pages/AutorizationPage";
import SearchPage from "../pages/SearchPage";
import SearchResultPage from "../pages/SearchResultPage";
import FavoritesPage from "../pages/FavoritesPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<AutorizationPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/search/result" element={<SearchResultPage />}></Route>
          <Route path="/favorites" element={<FavoritesPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
