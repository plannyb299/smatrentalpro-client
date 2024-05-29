import { useContext, useEffect, useState } from "react";
import SearchContext from "./SearchContext";
import FilteredCards from "./FilteredCards";
import { ActionButton } from "../../buttons/Buttons";
import apiRequest from "../../../utils/apiRequest";

const QueryCards = () => {
  const { buy, rent, priceFilter } = useContext(SearchContext);
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(2);
  const [fetching, setFetching] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Fetch More");

  const fetchHouses = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await apiRequest.post(`/public/homes/more?${query}`);
      if (response.status === 200) {
        const data = response.data;
        return data.houses;
      } else {
        console.error(response.data.error);
        return [];
      }
    } catch (error) {
      console.error("Error fetching houses:", error);
      return [];
    }
  };

  const updateHouses = async () => {
    let params = {};
    if (buy && rent) {
      params = {
        cat: "",
        minPrice: parseFloat(priceFilter.minPrice),
        maxPrice: parseFloat(priceFilter.maxPrice),
        forRent: 0,
      };
    } else if (rent) {
      params = {
        cat: "rent",
      };
    } else if (buy) {
      params = {
        cat: "buy",
        minPrice: parseFloat(priceFilter.minPrice),
        maxPrice: parseFloat(priceFilter.maxPrice),
      };
    } else {
      params = {
        cat: "none",
      };
    }
    const houses = await fetchHouses(params);
    setHouses(houses);
    setPage(2);
    setButtonLabel("Fetch More");
  };

  useEffect(() => {
    updateHouses();
  }, [buy, rent, priceFilter]);

  const clickHandler = async () => {
    setFetching(true);
    const params = {
      cat: buy && rent ? "" : buy ? "buy" : rent ? "rent" : "none",
      minPrice: buy ? parseFloat(priceFilter.minPrice) : 0,
      maxPrice: buy ? parseFloat(priceFilter.maxPrice) : 0,
      page: page,
    };
    const newHouses = await fetchHouses(params);
    if (newHouses.length > 0) {
      setHouses((prevHouses) => [...prevHouses, ...newHouses]);
      setPage((prevPage) => prevPage + 1);
      setButtonLabel("Fetch More");
    } else {
      setButtonLabel("End Of List");
    }
    setFetching(false);
  };

  useEffect(() => {
    if (fetching) setButtonLabel("Loading...");
  }, [fetching]);

  return (
    <>
      <FilteredCards houses={houses} />
      <div
        style={
          buttonLabel === "End Of List"
            ? { pointerEvents: "none", userSelect: "none" }
            : {}
        }
      >
        <ActionButton clickFunc={clickHandler}>{buttonLabel}</ActionButton>
      </div>
    </>
  );
};

export default QueryCards;
