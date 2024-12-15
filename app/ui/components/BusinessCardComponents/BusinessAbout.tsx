import { Business } from "@/app/types";

export default function BusinessDetails(groomerBusinessDetails: any) {
  return (
    <>
      <p className="text-sm font-bold mt-4">Description</p>
      <p className="text-sm mt-2">{groomerBusinessDetails?.description}</p>
      <p className="text-sm font-bold mt-10 mb-4">Operating Hours</p>
      <p className="text-sm flex justify-between">
        <span>Monday:</span> {groomerBusinessDetails?.monday_operating_hours}
      </p>
      <p className="text-sm mt-2 flex justify-between">
        <span>Tuesday:</span> {groomerBusinessDetails?.tuesday_operating_hours}
      </p>
      <p className="text-sm mt-2 flex justify-between">
        <span>Wednesday:</span>{" "}
        {groomerBusinessDetails?.wednesday_operating_hours}
      </p>
      <p className="text-sm mt-2 flex justify-between">
        <span>Thursday:</span>{" "}
        {groomerBusinessDetails?.thursday_operating_hours}
      </p>
      <p className="text-sm mt-2 flex justify-between">
        <span>Friday:</span> {groomerBusinessDetails?.friday_operating_hours}
      </p>
      <p className="text-sm mt-2 flex justify-between">
        <span>Saturday:</span>{" "}
        {groomerBusinessDetails?.saturday_operating_hours}
      </p>
      <p className="text-sm mt-2 flex justify-between">
        <span>Sunday:</span> {groomerBusinessDetails?.sunday_operating_hours}
      </p>
      <p className="text-sm font-bold mt-10">Phone Number</p>
      <p className="text-sm mt-2">{groomerBusinessDetails?.phone_number}</p>
    </>
  );
}
