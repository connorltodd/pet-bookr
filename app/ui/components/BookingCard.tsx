import { Booking } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPaw } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default function BookingCard(booking: Booking) {
  return (
    <div className="card bg-base-100 shadow-xl mb-4 p-4 relative">
      <button className="btn btn-xs uppercase text-xs w-[120px] px-2 mb-3 btn-outline border-primary text-primary">
        {booking.booking.status}
      </button>
      <div className="flex gap-2 items-center">
        <div className="flex gap-3 items-center">
          <FontAwesomeIcon icon={faPaw} className="fa-solid fa-paw h-4 w-4" />
          <p className="capitalize text-md font-bold">{booking.pet_name}</p>
        </div>
        <p className="capitalize text-md text-gray-500">
          <span className="lowercase">with</span>{" "}
          {`${booking.employee.first_name} ${booking.employee.last_name}`}
        </p>
      </div>
      <p className="mt-3 text-md capitalize">{booking.business_name}</p>
      <div className="my-4">
        {booking?.services?.map((service: any) => (
          <div className="flex gap-3 items-center">
            <p className="text-md">{service.service_name}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon
          icon={faClock}
          className="fa-regular fa-clock h-4 w-4"
        />
        <p className="text-md">
          {moment(booking.booking.start_time).format("dddd, MMMM D, h:mm A")}
        </p>
      </div>
    </div>
  );
}
