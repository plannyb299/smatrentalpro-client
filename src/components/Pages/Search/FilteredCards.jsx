import React from "react";
import Card from "../../card/Card";
import styles from "./FilteredCards.module.scss";

const checkHouseCategory = (house) => {
  const houseData = house.category;
  return houseData;
};

const FilteredCards = ({ houses = [] }) => {
  const showPrice = (house) => house.price > 0;
  const showRent = (house) => house.rent > 0;

  return (
    <div className={styles.cards}>
      {houses.length > 0 ? (
        houses.map((house, index) => (
          <Card
            key={index}
            secondClass={styles.card}
            info={{
              id: house.id,
              imageSource: house.image,
              category: checkHouseCategory(house),
              city: house.location.city,
              neighbourhood: house.neighbourhood,
              street: house.street,
              rooms: house.facilities.rooms,
              bedrooms: house.facilities.bedrooms,
              bathrooms: house.facilities.bathrooms,
              shortAndress: house.shortAddress,
              price: house.price,
              rent: house.rent,
            }}
            showInfo={{
              price: showPrice(house),
              rent: showRent(house),
            }}
          />
        ))
      ) : (
        <h1 style={{ color: "#333" }}>No results found</h1>
      )}
    </div>
  );
};

export default FilteredCards;
