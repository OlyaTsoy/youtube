import Header from "../header/header";
import Favorites from "../favorites/favorites";
import RequireAuth from "../../utils/hoc/RequireAuth";

const FavoritesPage = () => {
  return (
    <RequireAuth>
      <Header />
      <Favorites />
    </RequireAuth>
  );
};

export default FavoritesPage;
