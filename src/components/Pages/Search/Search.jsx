import styles from "./Search.module.scss";
import Navbar from "../../navbar/Navbar";
import { useContext } from "react";
import SearchContext from "./SearchContext";
import Filters from "./Filters/Filters";
import QueryCards from "./QueryCards";

const Search = () => {
  const { rent, setRent, priceFilter, setPriceFilter } = useContext(SearchContext);

  return (
    <main>
      <Navbar />
      <h1 className={styles.title}>Search</h1>
      <SearchContext.Provider value={{ rent, setRent, priceFilter, setPriceFilter }}>
        <Filters />
        <QueryCards />
      </SearchContext.Provider>
    </main>
  );
};

export default Search;
