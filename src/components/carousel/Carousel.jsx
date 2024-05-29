
import "./Carousel.scss";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ children, slides }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={slides}
      pagination={{ clickable: true }}
    >
      {children}
      {/* PAGINATION MARGIN */}
      <div style={{ marginTop: "70px" }}></div>
    </Swiper>
  );
};

Carousel.defaultProps = {
  slides: "auto",
};

export default Carousel;
