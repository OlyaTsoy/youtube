import Header from "../header/header";
import SearchResult from "../search-result/search-result";
import RequireAuth from "../../utils/hoc/RequireAuth";

const SearchResultPage = () => {
  return (
    <RequireAuth>
      <Header />
      <SearchResult />
    </RequireAuth>
  );
};

export default SearchResultPage;
