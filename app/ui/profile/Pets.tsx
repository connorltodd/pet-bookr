"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/contexts/userContext";
import { createPet, deletePet, editPet, getUserPets } from "@/app/actions/pet";
import { DogBreed, Pet } from "@/app/types";
import Modal from "../components/Modal";

import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dogIcon from "@/app/assets/images/dog-icon.png";
import catIcon from "@/app/assets/images/cat-icon.png";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { searchDogBreeds } from "@/app/actions/dog-breed";

export default function PetsDetails() {
  const { pets, setPets, user } = useUserContext();
  const [isFormDisplayed, setFormDisplay] = useState(false);
  const [formType, setFormType] = useState("create");
  const [petToDeleteInfo, setPetToDelete] = useState<Pet | null>();
  // TODO: update the type here
  const [petToEditInfo, setPetToEdit] = useState<any | null>();
  const [dogBreedResults, setDogBreedResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect to delay the search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        dogBreedSearch(searchTerm);
      }
    }, 2000);

    // Clear the timeout if searchTerm changes before 2 seconds
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const dogBreedSearch = async (breedSearchValue: string) => {
    const response = await searchDogBreeds(breedSearchValue);
    setDogBreedResults(response as any);
  };

  const fetchLatestPets = async () => {
    const userPets: any = await getUserPets(user?.id as number);
    if (userPets) {
      setPets(userPets as any);
    } else {
      setPets([]);
    }
  };

  const formHandler = async (formData: FormData) => {
    const petName = formData.get("pet_name") as string;
    const petSex = formData.get("pet_sex") as string;
    const petNeutered = formData.get("pet_neutered") as string;
    const petBirthday = formData.get("pet_birthday") as string;
    const dogBreedId = Number(formData.get("dog_breed_id")) as number;

    const petData: Pet = {
      name: petName,
      sex: petSex,
      neutered: petNeutered === "pet_neutered_true" ? true : false,
      type: "dog",
      birthday: petBirthday,
      dog_breed_id: dogBreedId,
    };

    if (formType === "create") {
      if (user) {
        // eslint-disable-next-line
        let newPet: unknown = await createPet(petData, user.id as number);

        if (
          newPet &&
          typeof newPet === "object" &&
          "data" in newPet &&
          typeof (newPet as any).data === "object"
        ) {
          fetchLatestPets();
          setFormDisplay(false);
        }
      }
    } else if (formType === "edit") {
      if (petData.dog_breed_id === 0) {
        petData.dog_breed_id = petToEditInfo?.Dog_Breed?.id;
      }
      const petId = formData.get("pet_id") as string;
      petData.id = petId;

      // eslint-disable-next-line
      let editedPet: unknown = await editPet(petData);
      // replace the new returned data for the old data in the pets array
      fetchLatestPets();
      setPetToEdit(null);
      setFormDisplay(false);
    }

    // Clearing dog search results
    setSearchTerm("");
    setDogBreedResults([]);
  };

  const [isToPetDeleteModalDisplayed, setPetDeleteModalDisplay] =
    useState(false);

  const showDeletePetModal = (petToDelete: Pet) => {
    setPetToDelete(petToDelete);
    setPetDeleteModalDisplay(true);
  };

  const editPetHandler = (petToEdit: Pet) => {
    setPetToEdit(petToEdit);
    setFormType("edit");
    setFormDisplay(true);
  };

  const deletePetHandler = async (petId: string) => {
    const petToDelete: { success: boolean } = await deletePet(petId);

    if (petToDelete.success) {
      fetchLatestPets();
      setPetToDelete(null);
      setPetDeleteModalDisplay(false);
    }
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
                {pets.map((object: any) => (
                  <div
                    key={object?.Pet?.id}
                    className="flex gap-8 items-center justify-between mb-8 md:pl-8 md:pr-8"
                  >
                    <div className="flex items-center">
                      <Image
                        src={dogIcon}
                        alt="pet icon"
                        height={50}
                        width={50}
                      />
                      <div>
                        <p className="capitalize text-xl ml-8">
                          {object?.Pet?.name}
                        </p>
                        <p className="capitalize text-xs ml-8">
                          {object?.Dog_Breed?.breed}{" "}
                          {object?.Dog_Breed?.hair_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                      <button onClick={() => editPetHandler(object)}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="fas fa-edit h-4 w-4"
                        />
                      </button>
                      <button onClick={() => showDeletePetModal(object?.Pet)}>
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
                  setFormType("create");
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
            {petToEditInfo?.Pet?.id && (
              <input
                type="text"
                name="pet_id"
                defaultValue={petToEditInfo?.Pet?.id || ""}
                required
                hidden
              />
            )}
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
                  defaultValue={petToEditInfo?.Pet?.name || ""}
                  required
                />
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Start typing Breed</p>
              <label
                htmlFor="pet_breed_search"
                className="input input-bordered flex items-center gap-2 w-full"
              >
                <input
                  type="text"
                  name="pet_breed_search"
                  placeholder="Border Collie..."
                  defaultValue={petToEditInfo?.Dog_Breed?.breed || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            {dogBreedResults.length || petToEditInfo?.Dog_Breed?.id ? (
              <div className="space-y-1">
                <label htmlFor="dog_breed_id">
                  <select
                    className="select select-bordered w-full"
                    name="dog_breed_id"
                    required
                    defaultValue={petToEditInfo?.Dog_Breed.id || ""}
                  >
                    <option value={"default"} disabled>
                      Select Your Dog Breed
                    </option>
                    {!dogBreedResults.length && petToEditInfo?.Dog_Breed?.id ? (
                      <option value={petToEditInfo?.Dog_Breed?.id} disabled>
                        {`${petToEditInfo?.Dog_Breed?.breed} ${petToEditInfo?.Dog_Breed?.hair_type}`}
                      </option>
                    ) : (
                      dogBreedResults.map((breed: DogBreed) => (
                        <option
                          value={breed.id}
                        >{`${breed.breed} ${breed.hair_type}`}</option>
                      ))
                    )}
                  </select>
                </label>
              </div>
            ) : null}

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
                  defaultValue={
                    moment(petToEditInfo?.Pet?.birthday).format("YYYY-MM-DD") ||
                    ""
                  }
                  required
                />
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Neutered</p>
              <label htmlFor="pet_neutered">
                <select
                  className="select select-bordered w-full"
                  name="pet_neutered"
                  defaultValue={
                    (petToEditInfo?.Pet?.neutered === true &&
                      "pet_neutered_true") ||
                    (petToEditInfo?.Pet?.neutered === false &&
                      "pet_neutered_false") ||
                    "default"
                  }
                  required
                >
                  <option value={"default"} disabled>
                    Select Pet Neutered
                  </option>
                  <option value="pet_neutered_true">Yes</option>
                  <option value="pet_neutered_false">No</option>
                </select>
              </label>
            </div>
            <div className="space-y-1">
              <p className="text-md">Sex</p>
              <label htmlFor="pet_sex">
                <select
                  className="select select-bordered w-full"
                  name="pet_sex"
                  defaultValue={petToEditInfo?.Pet?.sex || "default"}
                  required
                >
                  <option value={"default"} disabled>
                    Select Pet Sex
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
            <div className="mt-3 flex items-center gap-4 justify-end">
              <button
                className="block btn btn-outline border-primary text-primary"
                type="button"
                onClick={() => {
                  setFormDisplay(false);
                  setPetToEdit(null);
                }}
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
