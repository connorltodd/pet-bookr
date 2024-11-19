"use client";

import { useParams } from "next/navigation";
import { getData } from "@/app/lib/apiClient";
import {
  BusinessDetails as BusinessDetailsType,
  PortfolioPhoto as PortfolioPhotoType,
} from "@/app/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BusinessDetails() {
  const router = useRouter();
  const [groomer, setGroomer] = useState<BusinessDetailsType>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getBusinessById(params.id);
  }, []);

  const groomerBusinessDetailsOrganiser = (businessToOrganise: any) => {
    return businessToOrganise.reduce(
      (acc: any, row: any) => {
        if (!acc.groomerBusiness) {
          acc.business = row.groomerBusiness;
        }

        if (
          row.portfolioPhoto &&
          !acc.portfolioPhotos.some((p: any) => p.id === row.portfolioPhoto.id)
        ) {
          acc.portfolioPhotos.push(row.portfolioPhoto);
        }

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
    const groomerBusinessData = groomerBusinessDetailsOrganiser(
      businessData?.data
    );
    setGroomer(groomerBusinessData as any);
  };

  const handleNextSlide = () => {
    if (groomer?.portfolioPhotos) {
      setCurrentSlide((prev) =>
        prev + 1 === groomer.portfolioPhotos.length ? 0 : prev + 1
      );
    }
  };

  const handlePrevSlide = () => {
    if (groomer?.portfolioPhotos) {
      setCurrentSlide((prev) =>
        prev === 0 ? groomer.portfolioPhotos.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="w-[90vw] lg:w-[800px] m-auto flex-col gap-4 items-center mt-20">
      <button onClick={() => router.back()} className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fas fa-arrow-left h-4 w-4"
        />
        <h1 className="text-xl my-7">Back</h1>
      </button>
      <div className="card bg-base-100 shadow-xl cursor-pointer relative">
        <div className="carousel w-full rounded-t-lg">
          {groomer?.portfolioPhotos?.length ? (
            groomer.portfolioPhotos.map(
              (portfolioPhoto: PortfolioPhotoType, index) => (
                <div
                  key={index}
                  className={`carousel-item absolute inset-0 transition-opacity ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={portfolioPhoto.photo_url}
                    alt={`Portfolio Photo ${index + 1}`}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                </div>
              )
            )
          ) : (
            <p className="text-center py-4">No photos available</p>
          )}
          <div className="absolute left-5 z-10 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={handlePrevSlide} className="btn btn-circle">
              ❮
            </button>
            <button onClick={handleNextSlide} className="btn btn-circle">
              ❯
            </button>
          </div>
        </div>
        <div className="card-body mt-[300px]">
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
          <div className="mt-6 flex gap-4 justify-start">
            <p className="capitalize font-bold text-sm">Services</p>
            <p className="capitalize font-bold text-sm">Reviews</p>
            <p className="capitalize font-bold text-sm">Photos</p>
            <p className="capitalize font-bold text-sm">About</p>
          </div>
        </div>
      </div>
    </div>
  );
}
