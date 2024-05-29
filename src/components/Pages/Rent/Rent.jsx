import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import styles from "./Rent.module.scss";
import Card from "../../card/Card";
import apiRequest from "../../../utils/apiRequest";

const Rent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/public/homes/byCategory/APARTMENT");
        setData({ houses: res.data });
        console.log(res.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <Navbar />
      <div className={styles.content}>
        <h1>Houses For Renting</h1>
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
                    category: "Rent",
                    imageSource: house.image,
                    city: house.city,
                    neighbourhood: house.neighbourhood,
                    street: house.street,
                    rooms: house.rooms,
                    bedrooms: house.bedrooms,
                    bathrooms: house.bathrooms,
                    shortAndress: house.shortAndress,
                    rent: house.rent,
                  }}
                  showInfo={{
                    price: false,
                    rent: true,
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

export default Rent;
