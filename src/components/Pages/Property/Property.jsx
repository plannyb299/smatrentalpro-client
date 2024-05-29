import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../card/Card";
import styles from "./Property.module.scss";
import apiRequest from "../../../utils/apiRequest";
import { AuthContext } from "../../../context/AuthContext";

const Property = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get(`/public/homes/byId/${params.propertyId}`);
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.propertyId]);

  const handleBookingClick = () => {
    navigate(`/booking/${params.propertyId}`);
  };

  const queryHandler = () => {
    if (loading) return <h1>LOADING</h1>;
    if (error) return <h1>ERROR</h1>;
    if (data) {
      let house = data;
      return (
        <div className={styles.house}>
          <Card
            info={{
              id: params.propertyId,
              category: "Rent",
              imageSource: house.image,
              city: house.location.city,
              neighbourhood: house.neighbourhood,
              street: house.street,
              rooms: house.rooms,
              bedrooms: house.facilities.bedrooms,
              bathrooms: house.facilities.bathrooms,
              shortAndress: house.shortAddress,
              price: house.price,
              rent: house.rent,
            }}
            showInfo={{
              price: house.price ? 1 : 0,
              rent: house.rent ? 1 : 0,
            }}
          />
          <div style={{ marginTop: "2rem", marginBottom: "2rem", color: "#333" }}>
            <span>Description:</span>
            <p>{house.description}</p>
          </div>
          {currentUser && (
            <button onClick={handleBookingClick} className={styles.bookingButton}>
              Rent this property
            </button>
          )}
        </div>
      );
    }
    return <h1>Property not Found</h1>;
  };

  return (
    <main className={styles.flex}>
      <Navbar />
      <div className={styles.center}>{queryHandler()}</div>
    </main>
  );
};

export default Property;
