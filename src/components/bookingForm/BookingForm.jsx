import React, { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import styles from "./BookingForm.module.scss";

const BookingForm = ({ propertyId }) => {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: ""
  });
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(false);

    try {
      await apiRequest.post(`/bookings`, {
        propertyId: propertyId,
        ...bookingData
      });
      setBookingSuccess(true);
    } catch (err) {
      setBookingError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
      <h2>Rent this property</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={bookingData.name}
        onChange={handleBookingChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={bookingData.email}
        onChange={handleBookingChange}
        required
      />
      <input
        type="date"
        name="checkInDate"
        placeholder="Check-in Date"
        value={bookingData.checkInDate}
        onChange={handleBookingChange}
        required
      />
      <input
        type="date"
        name="checkOutDate"
        placeholder="Check-out Date"
        value={bookingData.checkOutDate}
        onChange={handleBookingChange}
        required
      />
      <button type="submit">Book Now</button>
      {bookingError && <p className={styles.error}>{bookingError}</p>}
      {bookingSuccess && <p className={styles.success}>Booking successful!</p>}
    </form>
  );
};

export default BookingForm;
