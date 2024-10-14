"use client";

import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { OnboardingContext } from "@/app/contexts/onboardingContext";
import { Pet } from "@/app/types";

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
  return (
    <div className="flex justify-between sm:w-[100%] md:w-[500px] min-h-[353px] flex-col p-4">
      <h1 className="font-bold sm:text-[24px]  text-center">
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
                type="text"
                name="pet_weight"
                placeholder="18.5"
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
          {onboardingData.pets.length ? (
            <div>
              {onboardingData.pets.map((pet: Pet) => (
                <div>
                  <h1>{pet.type}</h1>
                  <h1>{pet.name}</h1>
                  <h1>{pet.weight}</h1>
                  <h1>{pet.birthday}</h1>
                  <h1>{pet.fur_type}</h1>
                </div>
              ))}
            </div>
          ) : null}
          <button
            onClick={() => setAddNewPetFormDisplay(true)}
            className="btn btn-primary  min-w-24 max-w-28 m-auto mt-4 block"
          >
            Add Pet
          </button>
        </div>
      )}
    </div>
  );
}
