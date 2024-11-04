"use client";

import { searchGroomerBusinesses } from "@/app/actions/groomer-businesses";
import { Business } from "@/app/types";
import BusinessCard from "@/app/ui/components/BusinessCard";
import { useState } from "react";

export default function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTermText, setSearchTerm] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("groomer_search") as string;
    setSearchTerm(searchTerm);
    const groomerBusinesses = await searchGroomerBusinesses(searchTerm);

    if (groomerBusinesses?.data) {
      setBusinesses(groomerBusinesses?.data as Business[]);
    } else {
      setBusinesses([]);
    }
  };

  return (
    <div>
      <div className="container m-auto mt-14">
        {/* TODO: Implement search functionality */}
        <form
          onSubmit={onSubmit}
          className="flex justify-center items-center gap-6 w-[90vw] md:w-[600px] m-auto mb-5 md:min-w-[300px]"
        >
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
          <div>
            {businesses.length ? (
              <h1 className="text-xl text-center xl:text-left font-bold capitalize">
                {businesses.length} pet groomer shops matched your search!
              </h1>
            ) : null}
            {businesses.length ? (
              <div className="mt-8 flex flex-wrap gap-8 items-center justify-center xl:justify-start pb-12">
                {businesses.map((business: Business) => (
                  <BusinessCard {...business} />
                ))}
              </div>
            ) : searchTermText !== "" ? (
              <h1 className="text-xl text-center xl:text-left font-bold capitalize">
                No Groomers were found for the search: {searchTermText}
              </h1>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
