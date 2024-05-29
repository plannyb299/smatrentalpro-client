import styles from "./Filters.module.scss";
import PriceRange from "./PriceRange";
import RentCheckbox from "./RentCheckbox";

const Filters = () => {
  return (
    <div className={styles.filters}>
      <div className={styles.categories}>
        <div className={styles.category}>
        {/* <RentCheckbox /> */}
          <PriceRange />
        </div>
        {/* <div className={styles.category}>
        
        </div> */}
      </div>
    </div>
  );
};

export default Filters;
