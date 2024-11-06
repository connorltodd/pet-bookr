"use client";

import { useParams } from "next/navigation";
import { getData } from "@/app/lib/apiClient";
import { Business } from "@/app/types";
import { useEffect, useState } from "react";

export default function BusinessDetails() {
  const [business, setBusiness] = useState<Business>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getBusinessById(params.id);
  }, []);

  const getBusinessById = async (id: string) => {
    const businessData = await getData<any>(`/groomer-businesses/${params.id}`);
    setBusiness(businessData?.data[0] as any);
  };

  return (
    <div className="max-w-[800px] flex justify-center m-auto mt-20">
      <div className="card bg-base-100 w-[90vw] shadow-xl cursor-pointer">
        <figure className="h-40">
          <img src={business?.header_image} alt={business?.name} />
        </figure>
        <div className="card-body">
          <p className="text-md font-bold capitalize">{business?.name}</p>
          <p className="text-xs">
            <span className="capitalize">
              {`${business?.address_line_1 && `${business?.address_line_1},`}`}
            </span>
            <span className="capitalize">
              {` ${business?.address_line_2 && `${business?.address_line_2},`}`}
            </span>
            <span className="capitalize">
              {` ${business?.town_or_city && `${business?.town_or_city},`}`}
            </span>
            <span className="capitalize">
              {` ${business?.county && `${business?.county},`}`}
            </span>
            <span className="uppercase">
              {` ${business?.postcode && `${business?.postcode}`}`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
