import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../../card/Card";
import styles from "./FilteredCards.module.scss";
import SearchContext from "./SearchContext";
import apiRequest from "../../../utils/apiRequest";

const checkHouseCategory = (house) => {
  const houseData = house.category;
  // if (houseData.length === 2) return "Buy / Rent";
  // else {
  //   if (houseData[0].category === "Rent") return "Rent";
  //   else return "Buy";
  // }
  return houseData;
};

const FilteredCards = () => {
  const { buy, rent } = useContext(SearchContext);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/public/homes/all");
        setHouses(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showPrice = (house) => {
    if (buy) if (house.attributes.Price > 0) return true;
  };

  const showRent = (house) => {
    if (rent) if (house.attributes.Rent > 0) return true;
  };

  return (
    <div className={styles.cards}>
      {loading ? (
        <h1 style={{ color: "#333" }}>Loading ...</h1>
      ) : error ? (
        <h1 style={{ color: "#333" }}>Error fetching data</h1>
      ) : (
        houses.map((house, index) => (
          <Card
            key={index}
            secondClass={styles.card}
            info={{
              id: house.id,
              imageSource: `${house.image}`,
              category: checkHouseCategory(house),
              city: `${house.location.city}`,
              neighbourhood: `${house.neighbourhood}`,
              street: `${house.street}`,
              rooms: `${house.facilities.rooms}`,
              bedrooms: `${house.facilities.bedrooms}`,
              bathrooms: `${house.facilities.bathrooms}`,
              shortAndress: `${house.shortAddress}`,
              price: house.price,
              rent: house.rent,
            }}
            showInfo={{
              price: showPrice(house),
              rent: showRent(house),
            }}
          />
        ))
      )}
    </div>
  );
};

export default FilteredCards;
