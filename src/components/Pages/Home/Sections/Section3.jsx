//STYLES
import styles from "./Section3.module.scss";

//COMPONENTS
import { ArrowButton } from "../../../buttons/Buttons";
import Carousel from "../../../carousel/Carousel";
import Card from "../../../../components/card/Card";
import apiRequest from "../../../../utils/apiRequest";

//DEPS
import { SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";

const Section_3 = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/public/homes/all");
        setData(res.data);
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
    <section className={styles.section_3}>
      <div className={styles.section_3_title}>
        <h1>Houses Available For Rent</h1>
        <ArrowButton text="See More" path="rent" />
      </div>

      <div className={styles.cards}>
        <Carousel>
          {loading || error ? (
            <SwiperSlide>
              <Card />
            </SwiperSlide>
          ) : (
            data.map((house, index) => (
              <SwiperSlide key={index}>
                <Card
                  info={{
                    id: house.id,
                    category: "rent",
                    imageSource: `${house.image}`,
                    city: `${house.location.city}`,
                    neighbourhood: `${house.neighbourhood}`,
                    street: `${house.street}`,
                    rooms: `${house.rooms}`,
                    bedrooms: `${house.facilities.bedrooms}`,
                    bathrooms: `${house.facilities.bathrooms}`,
                    shortAddress: `${house.shortAddress}`,
                    price: `${house.price}`,
                  }}
                />
              </SwiperSlide>
            ))
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default Section_3;
