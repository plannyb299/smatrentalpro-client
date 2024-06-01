import styles from "./Section1.module.scss";
import Navbar from "../../../navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import building1 from "../../../../assets/building1.jpg";

const Section1 = () => {
  const [price, setPrice] = useState("<100k");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const priceRange = price.split("-");
    const minPrice = priceRange[0] === "<100k" ? 0 : parseFloat(priceRange[0]) * 1000;
    const maxPrice = priceRange[1] ? parseFloat(priceRange[1]) * 1000 : 1000000;

    const queryParams = new URLSearchParams({ minPrice, maxPrice, location }).toString();
    navigate(`/search?${queryParams}`);
  };

  return (
    <section className={styles.section_1}>
      <div className={styles.Navbar}>
        <Navbar BurgerColour={"whitesmoke"} />
      </div>
      <div className={styles.img}></div>
      <div className={styles.section_1_content}>
        <div className={styles.slogan}>
          <h1>Find Your Dream House</h1>
          <p>
            Discover the perfect rental experience with us. Explore our listings and find your ideal home today. Your next adventure starts here!
          </p>
          <div className={styles.search_container}>
            <div className={styles.location_container}>
              <span>Location</span>
              <input
                type="text"
                placeholder="Enter a Location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>
            <div className={styles.price_container}>
              <span>Price Range</span>
              <select
                name="Price"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              >
                <option value="<100k">{`<100k`}</option>
                <option value="100-200">100-200k</option>
                <option value="200-500">200-500k</option>
                <option value=">500">{`>500k`}</option>
              </select>
            </div>
            <button className={styles.btn_search} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className={styles.slogan_image}>
          <img src={building1} alt="building" />
        </div>
      </div>
    </section>
  );
};

export default Section1;
