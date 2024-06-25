import React, { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import PlaceImg from "../../PlaceImg";
import { Link } from "react-router-dom";
import axios from "axios";
import BookingDates from "../../BookingDates";
import Loader from "./Loader";

const Bookingspage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    axios.get('http://localhost:8080/booking')
      .then(response => {
        setBookings(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false); // Make sure to set loading to false on error too
      });
  }, []);

  return (
    <div>
      <AccountNav />

      {loading ? (
        <Loader /> // Display loader while loading is true
      ) : (
        bookings.length > 0 ? (
          bookings.map(booking => (
            <Link
              key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-3 sm:flexjustify-center"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow  ">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                  <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl text-center text-shadow-md mt-48 text-neutral-900">
            No booking made yet
          </h1>
        )
      )}
    </div>
  );
};

export default Bookingspage;
