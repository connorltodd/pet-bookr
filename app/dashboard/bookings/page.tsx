"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import { getUserBookings } from "@/app/actions/booking";
import { Booking } from "@/app/types";
import BookingCard from "@/app/ui/components/BookingCard";
import LoadingBookingCard from "@/app/ui/components/LoadingComponents/LoadingBookingCard";

export default function Bookings() {
  const { user } = useUserContext();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user) {
      console.error("user is not defined");
      return;
    }

    try {
      const fetchedBookingsData = await getUserBookings(user.id as number);
      if (fetchedBookingsData.length > 0) {
        setBookings(fetchedBookingsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // End loading
      setLoading(false);
    }
  };

  return (
    <div className="px-4 ">
      <div className="w-90 max-w-[550px] m-auto mt-10 pb-10">
        <h1 className="text-xl my-7 capitalize">Bookings</h1>
        {loading ? (
          <>
            <LoadingBookingCard />
            <LoadingBookingCard />
            <LoadingBookingCard />
          </>
        ) : bookings.length > 0 ? (
          bookings.map((booking: Booking) => <BookingCard {...booking} />)
        ) : (
          <p>No bookings</p>
        )}
      </div>
    </div>
  );
}
