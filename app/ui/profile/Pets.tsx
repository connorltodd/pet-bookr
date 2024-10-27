"use client";

// import { updateUser } from "@/app/actions/user";
import { useUserContext } from "@/app/contexts/userContext";
import { Pet } from "@/app/types";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dogIcon from "@/app/assets/images/dog-icon.png";
import catIcon from "@/app/assets/images/cat-icon.png";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { createPet, deletePet } from "@/app/actions/pet";
import Modal from "../components/Modal";

export default function PetsDetails() {
  const { pets, setPets, user } = useUserContext();
  const [isFormDisplayed, setFormDisplay] = useState(false);
  const [formType, setFormType] = useState("create");

  const formHandler = async (formData: FormData) => {
    const petName = formData.get("pet_name") as string;
    const petBirthday = formData.get("pet_birthday") as string;
    const petWeight = Number(formData.get("pet_weight")) as number;
    const petType = formData.get("pet_type") as string;
    const petFurType = formData.get("pet_fur_type") as string;

    const petToCreate: Pet = {
      name: petName,
      weight: petWeight,
      birthday: petBirthday,
      fur_type: petFurType,
      type: petType,
    };
    if (formType === "create") {
      if (user) {
        let newPet: unknown = await createPet(petToCreate, user.id as number);

        if (
          newPet &&
          typeof newPet === "object" &&
          "data" in newPet &&
          typeof (newPet as any).data === "object"
        ) {
          setPets([...pets, newPet.data as Pet]);
          setFormDisplay(false);
        }
      }
    }
    {
      editPet(formData);
    }
  };

  const [petToDeleteInfo, setPetToDelete] = useState<Pet | null>();
  const [isToPetDeleteModalDisplayed, setPetDeleteModalDisplay] =
    useState(false);

  const showDeletePetModal = (petToDelete: Pet) => {
    setPetToDelete(petToDelete);
    setPetDeleteModalDisplay(true);
  };

  const deletePetHandler = async (petId: string) => {
    const petToDelete: { success: boolean } = await deletePet(petId);

    if (petToDelete.success) {
      const newPets = [...pets].filter((pet: Pet) => pet.id !== petId);
      setPets(newPets);
      setPetDeleteModalDisplay(false);
    }
  };

  const editPet = async (formData: FormData) => {
    // const first_name = formData.get("first_name") as string;
    // const last_name = formData.get("last_name") as string;
    // const email = formData.get("email") as string;
    // if (user?.id !== undefined) {
    //   const updatedUser: User | undefined = await updateUser(
    //     { first_name, last_name, email },
    //     user.id as number
    //   );
    // Ensure updatedUser is not undefined before calling setUser
    // if (updatedUser) {
    //   setUser(updatedUser); // updatedUser is safely of type User here
    //   setFormDisplay(false);
    // } else {
    //   console.error("Failed to update user");
    // }
    // }
  };
  return (
    <div className="w-90 max-w-[550px] m-auto mt-10 px-5">
      {isToPetDeleteModalDisplayed && petToDeleteInfo !== null && (
        <Modal>
          <div>
            <h1>
              Are you sure you want to delete{" "}
              {petToDeleteInfo?.name &&
                petToDeleteInfo.name.charAt(0).toUpperCase() +
                  petToDeleteInfo.name.slice(1)}
              ?
            </h1>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                className="btn btn-outline border-primary w-24 text-primary hover:btn-primary hover:text-white"
                onClick={() => {
                  setPetToDelete(null);
                  setPetDeleteModalDisplay(false);
                }}
              >
                No
              </button>
              <button
                className="capitalize btn btn-primary text-white w-24"
                onClick={() => deletePetHandler(petToDeleteInfo?.id as string)}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Link href="/dashboard/profile" className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="fas fa-arrow-left h-4 w-4"
        />
        <h1 className="text-xl my-7">Pet(s) Details</h1>
      </Link>
      {!isFormDisplayed ? (
        <div className="relative flex flex-col gap-6 bg-base-100 rounded-box shadow-xl p-8">
          {/* Render all pets here */}
          <div className="flex flex-col justify-between items-center">
            {pets.length ? (
              <div className="mb-12">
                {pets.map((pet: Pet) => (
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
                    <div className="flex justify-center items-center gap-6">
                      <button onClick={() => editPet(pet.id as any)}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="fas fa-edit h-4 w-4"
                        />
                      </button>
                      <button onClick={() => showDeletePetModal(pet)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="fas fa-trash h-4 w-4"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div>
              <button
                onClick={() => {
                  setFormDisplay(true);
                }}
                className="text-md underline"
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-base-100 rounded-box shadow-xl p-8">
          <form action={formHandler} className="form-control flex gap-6">
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
            <div className="mt-3 flex items-center gap-4 justify-end">
              <button
                className="block btn btn-outline border-primary text-primary"
                type="button"
                onClick={() => setFormDisplay(false)}
              >
                Cancel
              </button>
              <button className="block btn btn-primary mt-0">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
