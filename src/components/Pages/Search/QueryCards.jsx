import { useContext, useEffect, useState } from "react";
import SearchContext from "./SearchContext";
import FilteredCards from "./FilteredCards";
import { ActionButton } from "../../buttons/Buttons";
import apiRequest from "../../../utils/apiRequest";
import { useLocation } from "react-router-dom";

const QueryCards = () => {
  const { rent, priceFilter } = useContext(SearchContext);
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(2);
  const [fetching, setFetching] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Fetch More");
  const location = useLocation();

  const fetchHouses = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await apiRequest.get(`/public/homeByPriceAndCity?${query}`);
      if (response.status === 200) {
        const data = response.data;
        return Array.isArray(data) ? data : []; 
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
    const searchParams = new URLSearchParams(location.search);
    const params = {
      minPrice: searchParams.get("minPrice") || priceFilter.minPrice.toString(),
      maxPrice: searchParams.get("maxPrice") || priceFilter.maxPrice.toString(),
      city: searchParams.get("city") || "", // Ensure the parameter name is 'city'
    };
    const houses = await fetchHouses(params);
    setHouses(houses);
    setPage(2);
    setButtonLabel("Fetch More");
  };

  useEffect(() => {
    updateHouses();
  }, [rent, priceFilter, location.search]);

  const clickHandler = async () => {
    setFetching(true);
    const searchParams = new URLSearchParams(location.search);
    const params = {
      minPrice: searchParams.get("minPrice") || priceFilter.minPrice.toString(),
      maxPrice: searchParams.get("maxPrice") || priceFilter.maxPrice.toString(),
      city: searchParams.get("city") || "", // Ensure the parameter name is 'city'
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
