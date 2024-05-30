import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import styles from "./BookingForm.module.scss";
import { AuthContext } from "../../context/AuthContext";

const BookingForm = () => {
  const { propertyId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [bookingData, setBookingData] = useState({
    bookedHomeId: propertyId,
    bookedDate: "",
    leaveDate: "",
    userIdBooked: user ? user.user_id : null,
    userNameBooked: user ? user.username : "",
    hostReviewStars: 0,
    hostReviewDescription: "",
    homeReviewStars: 0,
    homeReviewDescription: ""
  });

  useEffect(() => {
    if (user) {
      setBookingData((prevData) => ({
        ...prevData,
        userIdBooked: user.user_id,
        userNameBooked: user.username
      }));
    }
  }, [user]);

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
      await apiRequest.post(`/secure/home/book`, {
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
        type="date"
        name="bookedDate"
        placeholder="Check-in Date"
        value={bookingData.bookedDate}
        onChange={handleBookingChange}
        required
      />
      <input
        type="date"
        name="leaveDate"
        placeholder="Check-out Date"
        value={bookingData.leaveDate}
        onChange={handleBookingChange}
        required
      />
      <input
        type="number"
        name="hostReviewStars"
        placeholder="Host Review Stars"
        value={bookingData.hostReviewStars}
        onChange={handleBookingChange}
        required
      />
      <input
        type="text"
        name="hostReviewDescription"
        placeholder="Host Review Description"
        value={bookingData.hostReviewDescription}
        onChange={handleBookingChange}
      />
      <input
        type="number"
        name="homeReviewStars"
        placeholder="Home Review Stars"
        value={bookingData.homeReviewStars}
        onChange={handleBookingChange}
        required
      />
      <input
        type="text"
        name="homeReviewDescription"
        placeholder="Home Review Description"
        value={bookingData.homeReviewDescription}
        onChange={handleBookingChange}
      />
      <button type="submit">Book Now</button>
      {bookingError && <p className={styles.error}>{bookingError}</p>}
      {bookingSuccess && <p className={styles.success}>Booking successful!</p>}
    </form>
  );
};

export default BookingForm;
