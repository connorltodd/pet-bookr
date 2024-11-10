"use client";

import { useParams } from "next/navigation";
import { getData } from "@/app/lib/apiClient";
import {
  BusinessDetails as BusinessDetailsType,
  PortfolioPhoto as PortfolioPhotoType,
} from "@/app/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BusinessDetails() {
  const [groomer, setGroomer] = useState<BusinessDetailsType>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getBusinessById(params.id);
  }, []);

  const groomerBusinessDetailsOrganiser = (businessToOrganise: any) => {
    return businessToOrganise.reduce(
      (acc: any, row: any) => {
        // If this is the first row, populate groomer business details
        if (!acc.groomerBusiness) {
          acc.business = row.groomerBusiness;
        }

        // Add portfolio photo if it exists and is not already added
        if (
          row.portfolioPhoto &&
          !acc.portfolioPhotos.some((p: any) => p.id === row.portfolioPhoto.id)
        ) {
          acc.portfolioPhotos.push(row.portfolioPhoto);
        }

        // Add groomer service if it exists and is not already added
        if (
          row.groomerService &&
          !acc.groomerServices.some((s: any) => s.id === row.groomerService.id)
        ) {
          acc.groomerServices.push(row.groomerService);
        }

        return acc;
      },
      {
        business: null,
        portfolioPhotos: [],
        groomerServices: [],
      }
    );
  };

  const getBusinessById = async (id: string) => {
    const businessData = await getData<any>(`/groomer-businesses/${params.id}`);
    // Process the result to create one groomer business entry with arrays of photos and services
    const groomerBusinessData = groomerBusinessDetailsOrganiser(
      businessData?.data
    );
    console.log(groomerBusinessData);
    setGroomer(groomerBusinessData as any);
  };

  return (
    <div className="w-[90vw] lg:w-[800px] m-auto flex-col gap-4 items-center mt-20">
      <Link href="/dashboard/businesses" className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fas fa-arrow-left h-4 w-4"
        />
        <h1 className="text-xl my-7">Back</h1>
      </Link>
      <div className="card bg-base-100  shadow-xl cursor-pointer">
        <div className="carousel w-full rounded-t-lg">
          {groomer?.portfolioPhotos?.map(
            (portfolioPhoto: PortfolioPhotoType, index) => (
              <div
                id={`slide${index + 1}`}
                key={index}
                className="carousel-item relative h-[300px] w-full  bg-cover bg-center"
                style={{ backgroundImage: `url(${portfolioPhoto.photo_url})` }}
              >
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  {/* Back button: wrap to the last slide if at the first slide */}
                  <a
                    href={`#slide${
                      index === 0 ? groomer.portfolioPhotos.length : index
                    }`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  {/* Forward button: wrap to the first slide if at the last slide */}
                  <a
                    href={`#slide${
                      index + 2 > groomer.portfolioPhotos.length ? 1 : index + 2
                    }`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            )
          )}
        </div>
        <div className="card-body">
          <p className="text-md font-bold capitalize">
            {groomer?.business?.name}
          </p>
          <p className="text-xs">
            <span className="capitalize">
              {`${
                groomer?.business?.address_line_1 &&
                `${groomer?.business?.address_line_1},`
              }`}
            </span>
            <span className="capitalize">
              {` ${
                groomer?.business?.address_line_2 &&
                `${groomer?.business?.address_line_2},`
              }`}
            </span>
            <span className="capitalize">
              {` ${
                groomer?.business?.town_or_city &&
                `${groomer?.business?.town_or_city},`
              }`}
            </span>
            <span className="capitalize">
              {` ${
                groomer?.business?.county && `${groomer?.business?.county},`
              }`}
            </span>
            <span className="uppercase">
              {` ${
                groomer?.business?.postcode && `${groomer?.business?.postcode}`
              }`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
