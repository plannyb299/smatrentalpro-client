import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Buy.module.scss";
import Card from "../../card/Card";
import Navbar from "../../navbar/Navbar";

const Buy = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/houses?category=Buy")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Navbar />
      <div className={styles.content}>
        <h1>Houses For Sale</h1>
        <div className={styles.card}>
          {loading || error ? (
            <h1 style={{ color: "#333" }}>Loading ...</h1>
          ) : (
            <div className={styles.cards}>
              {data.houses.map((house, index) => (
                <Card
                  key={index}
                  secondClass={styles.card}
                  info={{
                    id: house.id,
                    category: "Buy",
                    imageSource: `http://localhost:1337${house.previewImageUrl}`,
                    city: house.city,
                    neighbourhood: house.neighbourhood,
                    street: house.street,
                    rooms: house.rooms,
                    bedrooms: house.bedrooms,
                    bathrooms: house.bathrooms,
                    shortAndress: house.shortAndress,
                    price: house.price,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Buy;
