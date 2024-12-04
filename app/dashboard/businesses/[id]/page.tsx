"use client";

import { useParams } from "next/navigation";
import { getData } from "@/app/lib/apiClient";
import {
  Business as GroomerBusinessType,
  PortfolioPhoto as PortfolioPhotoType,
} from "@/app/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BusinessAbout from "@/app/ui/components/BusinessCardComponents/BusinessAbout";
import BusinessPortfolioPhotos from "@/app/ui/components/BusinessCardComponents/BusinessPortfolioPhotos";
import moment from "moment";

export default function BusinessDetails() {
  const router = useRouter();
  const [groomer, setGroomerDetails] = useState<GroomerBusinessType>();
  const [groomerPortfolioPhotos, setGroomerPortfolioPhotos] = useState<
    PortfolioPhotoType[]
  >([]);
  // TODO: render out services and reviews and types
  //
  const [groomerServices, setGroomerServices] = useState([]);
  const [groomerReviews, setGroomerReviews] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [businessDetailsMenu, setBusinessDetailsMenu] = useState("services");
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getBusinessInfoById(params.id);
    getBusinessPortfolioPhotos(params.id);
    getBusinessServices(params.id);
    getBusinessReviews(params.id);
  }, []);

  const getBusinessServices = async (id: string) => {
    const businessServices = await getData<any>(
      `/groomer-services/groomer-business/${id}`
    );
    setGroomerServices(businessServices?.data as any);
  };

  const getBusinessReviews = async (id: string) => {
    const businessReviews = await getData<any>(
      `/reviews/groomer-business/${id}`
    );
    setGroomerReviews(businessReviews?.data as any);
  };

  const getBusinessPortfolioPhotos = async (id: string) => {
    const businessPhotos = await getData<any>(
      `/portfolio-photos/groomer-business/${id}`
    );
    setGroomerPortfolioPhotos(businessPhotos?.data as any);
  };

  const getBusinessInfoById = async (id: string) => {
    const businessData = await getData<any>(`/groomer-businesses/${id}`);
    setGroomerDetails(businessData?.data[0] as any);
  };

  const handleNextSlide = () => {
    if (groomerPortfolioPhotos.length) {
      setCurrentSlide((prev) =>
        prev + 1 === groomerPortfolioPhotos.length ? 0 : prev + 1
      );
    }
  };

  const handlePrevSlide = () => {
    if (groomerPortfolioPhotos.length) {
      setCurrentSlide((prev) =>
        prev === 0 ? groomerPortfolioPhotos.length - 1 : prev - 1
      );
    }
  };

  const businessDetailsMenuHandler = (menuValue: string) =>
    setBusinessDetailsMenu(menuValue);

  console.log("groomerReviews", groomerReviews);

  return (
    <div className="w-[90vw] lg:w-[600px] m-auto flex-col gap-4 items-center mt-10 pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fas fa-arrow-left h-4 w-4"
        />
        <h1 className="text-xl my-7">Back</h1>
      </button>
      <div className="card bg-base-100 shadow-xl cursor-pointer">
        <div className="relative">
          <div className="carousel w-full rounded-t-lg">
            {groomerPortfolioPhotos?.length &&
              groomerPortfolioPhotos.map(
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
              )}
            <div className="absolute left-5 z-10 right-5 top-[220px] flex transform justify-between">
              <button onClick={handlePrevSlide} className="btn btn-circle">
                ❮
              </button>
              <button onClick={handleNextSlide} className="btn btn-circle">
                ❯
              </button>
            </div>
          </div>
        </div>
        <div className="card-body mt-[300px]">
          <p className="text-md font-bold capitalize">{groomer?.name}</p>
          <p className="text-xs">
            <span className="capitalize">
              {`${groomer?.address_line_1 && `${groomer?.address_line_1},`}`}
            </span>
            <span className="capitalize">
              {` ${groomer?.address_line_2 && `${groomer?.address_line_2},`}`}
            </span>
            <span className="capitalize">
              {` ${groomer?.town_or_city && `${groomer?.town_or_city},`}`}
            </span>
            <span className="capitalize">
              {` ${groomer?.county && `${groomer?.county},`}`}
            </span>
            <span className="uppercase">
              {` ${groomer?.postcode && `${groomer?.postcode}`}`}
            </span>
          </p>
          <div className="mt-6 flex gap-4 justify-between">
            <button
              onClick={() => businessDetailsMenuHandler("services")}
              className="capitalize font-bold text-sm"
            >
              Services
            </button>
            <button
              onClick={() => businessDetailsMenuHandler("reviews")}
              className="capitalize font-bold text-sm"
            >
              Reviews
            </button>
            <button
              onClick={() => businessDetailsMenuHandler("photos")}
              className="capitalize font-bold text-sm"
            >
              Photos
            </button>
            <button
              onClick={() => setBusinessDetailsMenu("about")}
              className="capitalize font-bold text-sm"
            >
              About
            </button>
          </div>

          {/* TODO: complete the reviews section and services section plus add in the business contact number on about */}
          {/* TODO: add a loading skeleton for the business id page */}
          <div className="mt-8 mb-5">
            {businessDetailsMenu === "reviews" ? (
              groomerReviews.length ? (
                groomerReviews.map((reviewData, index) => {
                  const { review, pet_owner_first_name, pet_owner_last_name } =
                    reviewData;
                  const { star_rating, description, created_at } = review;

                  return (
                    <div className="review-item mb-7">
                      <div className="flex gap-2 items-center mb-2">
                        <div className="rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <input
                              key={i}
                              type="radio"
                              className="mask mask-star-2 bg-yellow-400 h-4 w-4"
                              checked={i + 1 === star_rating}
                              readOnly
                            />
                          ))}
                        </div>
                        <h3 className="text-sm">
                          {pet_owner_first_name} {pet_owner_last_name}
                        </h3>
                      </div>
                      <p className="text-md">{description}</p>
                      <p className="text-sm text-slate-500 mt-2">
                        {moment(created_at).format("MMM Do YYYY, HH:MM")}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-center">
                  No reviews available for this business.
                </p>
              )
            ) : null}

            {businessDetailsMenu === "photos" && groomerPortfolioPhotos && (
              <BusinessPortfolioPhotos photos={groomerPortfolioPhotos} />
            )}
            {businessDetailsMenu === "about" && <BusinessAbout {...groomer} />}
          </div>
        </div>
      </div>
    </div>
  );
}
