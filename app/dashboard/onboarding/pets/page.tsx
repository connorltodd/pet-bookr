"use client";

import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { OnboardingContext } from "@/app/contexts/onboardingContext";
import { Pet } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

import dogIcon from "@/app/assets/images/dog-icon.png";
import catIcon from "@/app/assets/images/cat-icon.png";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function PetsOnboardingPage() {
  const { onboardingData, setOnboardingData } = useContext(OnboardingContext);
  const [isAddNewPetFormDisplayed, setAddNewPetFormDisplay] = useState(true);

  useEffect(() => {
    if (onboardingData?.pets?.length) {
      setAddNewPetFormDisplay(false);
    }
  }, []);

  const addPet = (formData: FormData) => {
    const petName = formData.get("pet_name") as string;
    const petBirthday = formData.get("pet_birthday") as string;
    const petWeight = Number(formData.get("pet_weight")) as number;
    const petType = formData.get("pet_type") as string;
    const petFurType = formData.get("pet_fur_type") as string;

    const newPet: Pet = {
      id: uuidv4(),
      name: petName,
      weight: petWeight,
      birthday: petBirthday,
      fur_type: petFurType,
      type: petType,
    };

    setOnboardingData({
      ...onboardingData,
      pets: [...onboardingData.pets, newPet],
    });

    setAddNewPetFormDisplay(false);
  };

  const deletePetFromOnboarding = (petToDeleteId: string) => {
    const newPetsArray = [...onboardingData.pets].filter(
      (pet: Pet) => pet.id !== petToDeleteId
    );

    setOnboardingData({
      ...onboardingData,
      pets: newPetsArray,
    });

    if (newPetsArray.length === 0) {
      setAddNewPetFormDisplay(true);
    }
  };
  return (
    <div className="flex sm:w-[100%] md:w-[500px] min-h-[353px] flex-col justify-between p-4">
      <div>
        <h1 className="font-bold sm:text-[24px] text-center mb-8">
          Let's add your pet(s)
        </h1>
        {isAddNewPetFormDisplayed ? (
          <form action={addPet} className="flex gap-4 flex-col mt-6">
            <div className="space-y-1">
              <p className="text-md">Name</p>
              <label
                htmlFor="pet_name"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  type="text"
                  name="pet_name"
                  placeholder="Scooby"
                  required
                />
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Birthday</p>
              <label
                htmlFor="pet_birthday"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  type="date"
                  name="pet_birthday"
                  max={`${moment().format("YYYY-MM-DD")}`}
                  required
                />
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Weight (KG)</p>
              <label
                htmlFor="pet_weight"
                className="input input-bordered flex items-center gap-2"
              >
                <input
                  step="0.1"
                  type="number"
                  name="pet_weight"
                  placeholder="10.5"
                  required
                />
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Species</p>
              <label htmlFor="pet_type">
                <select
                  className="select select-bordered w-full"
                  name="pet_type"
                  defaultValue="default"
                  required
                >
                  <option value={"default"} disabled>
                    Select Species
                  </option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Fur Type</p>
              <label htmlFor="pet_fur_type">
                <select
                  className="select select-bordered w-full"
                  name="pet_fur_type"
                  defaultValue="default"
                  required
                >
                  <option value={"default"} disabled>
                    Select Fur Type
                  </option>
                  <option value="long_hair">Long Hair</option>
                  <option value="short_hair">Short Hair</option>
                </select>
              </label>
            </div>
            <button className="btn btn-primary  min-w-24 max-w-28 m-auto mt-4">
              Add Pet
            </button>
          </form>
        ) : (
          <div>
            <div>
              {onboardingData.pets.length ? (
                <div className="mb-12">
                  {onboardingData.pets.map((pet: Pet) => (
                    <div
                      key={pet.id}
                      className="flex gap-8 items-center justify-between mb-8 md:pl-8 md:pr-8"
                    >
                      <div className="flex items-center">
                        <Image
                          src={pet.type === "dog" ? dogIcon : catIcon}
                          alt="pet icon"
                          height={50}
                          width={50}
                        />
                        <p className="capitalize text-xl ml-8">{pet.name}</p>
                      </div>
                      <button
                        onClick={() =>
                          deletePetFromOnboarding(pet.id as string)
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="fas fa-trash h-4 w-4"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              <button
                onClick={() => setAddNewPetFormDisplay(true)}
                className="underline min-w-24 max-w-28 m-auto mb-8 block"
              >
                Add Pet
              </button>
            </div>
          </div>
        )}
      </div>
      {!isAddNewPetFormDisplayed && (
        <div className="flex justify-center">
          <Link
            href="/dashboard/onboarding/completion"
            className="btn btn-primary min-w-24 max-w-28"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
