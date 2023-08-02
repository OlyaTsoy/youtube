import Header from "../header/header";
import Search from "../search/search";
import RequireAuth from "../../utils/hoc/RequireAuth";

const SearchPage = () => {
  return (
    <RequireAuth>
      <Header />
      <Search />
    </RequireAuth>
  );
};

export default SearchPage;
