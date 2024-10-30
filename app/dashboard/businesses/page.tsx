import { Business } from "@/app/types";

export default function Businesses() {
  const businesses = [
    {
      name: "Wendys Pet Groomers",
      address_line_1: "17 claremont rd",
      address_line_2: "sale",
      town_or_city: "Trafford",
      county: "Cheshire",
      postcode: "m22 4pe",
      country: "england",
      header_image:
        "https://images.pexels.com/photos/2309235/pexels-photo-2309235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Peters Groomers",
      address_line_1: "test street",
      address_line_2: "sale",
      town_or_city: "",
      county: "Cheshire",
      postcode: "m22 4pe",
      country: "england",
      header_image:
        "https://images.pexels.com/photos/626986/pexels-photo-626986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Janes chop shop",
      address_line_1: "17 hengoed rd",
      address_line_2: "",
      town_or_city: "",
      county: "Cheshire",
      postcode: "m22 4pe",
      country: "england",
      header_image:
        "https://images.pexels.com/photos/2309235/pexels-photo-2309235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <div>
      <div className="container m-auto mt-14">
        {/* TODO: Implement search functionality */}
        <form className="flex justify-center items-center gap-6 w-[90vw] md:w-[600px] m-auto mb-5 md:min-w-[300px]">
          <label
            htmlFor="groomer_search"
            className="flex justify-start items-center gap-2 w-full"
          >
            <input
              type="text"
              name="groomer_search"
              id="groomer_search"
              required
              className="input input-bordered text-sm w-full"
              placeholder="Search Groomers nearby..."
            />
          </label>
          <button className="btn btn-primary min-w-24 max-w-28">Search</button>
        </form>

        <div className="max-w-[1216px] m-auto pt-20 pb-20 flex flex-col justify-center">
          {/* TODO: Make this dynamic */}
          <div>
            <h1 className="text-xl text-center xl:text-left font-bold">
              There are 3 Groomer Shops Nearby:
            </h1>
            <div className="mt-8 flex flex-wrap gap-8 items-center justify-center md:justify-start pb-12">
              {/* Business Card */}
              {businesses.map((business: Business) => (
                <div
                  key={business.name}
                  className="card bg-base-100 w-[90vw] md:w-96 shadow-xl"
                >
                  <figure className="h-40">
                    <img src={business?.header_image} alt={business?.name} />
                  </figure>
                  <div className="card-body">
                    <p className="text-md font-bold capitalize">
                      {business?.name}
                    </p>
                    <p className="text-xs">
                      <span className="capitalize">
                        {`${
                          business.address_line_1 &&
                          `${business.address_line_1},`
                        }`}
                      </span>
                      <span className="capitalize">
                        {` ${
                          business.address_line_2 &&
                          `${business.address_line_2},`
                        }`}
                      </span>
                      <span className="capitalize">
                        {` ${
                          business.town_or_city && `${business.town_or_city},`
                        }`}
                      </span>
                      <span className="capitalize">
                        {` ${business.county && `${business.county},`}`}
                      </span>
                      <span className="uppercase">
                        {` ${business.postcode && `${business.postcode}`}`}
                      </span>
                    </p>
                    {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
