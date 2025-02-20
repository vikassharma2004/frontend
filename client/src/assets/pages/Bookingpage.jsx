import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AddressLink from "../../AddressLink";
import PlaceGallery from "../../PlaceGallery";
import BookingDates from "../../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('http://localhost:8080/booking').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8 px-4 sm:px-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 mb-4 md:mb-0">
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary py-1 px-1 text-white rounded-2xl self-stretch md:self-auto md:w-auto w-full text-center md:text-left">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
