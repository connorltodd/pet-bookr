import { Business } from "@/app/types";

export default function BusinessCard(business: Business) {
  return (
    <div
      key={business.name}
      className="card bg-base-100 w-[90vw] md:w-96 shadow-xl cursor-pointer"
    >
      <figure className="h-40">
        <img src={business?.header_image} alt={business?.name} />
      </figure>
      <div className="card-body">
        <p className="text-md font-bold capitalize">{business?.name}</p>
        <p className="text-xs">
          <span className="capitalize">
            {`${business.address_line_1 && `${business.address_line_1},`}`}
          </span>
          <span className="capitalize">
            {` ${business.address_line_2 && `${business.address_line_2},`}`}
          </span>
          <span className="capitalize">
            {` ${business.town_or_city && `${business.town_or_city},`}`}
          </span>
          <span className="capitalize">
            {` ${business.county && `${business.county},`}`}
          </span>
          <span className="uppercase">
            {` ${business.postcode && `${business.postcode}`}`}
          </span>
        </p>
      </div>
    </div>
  );
}
