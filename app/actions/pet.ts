import { deleteData, getData, postData, putData } from "../lib/apiClient";
import { Pet } from "../types";

export async function createPet(pet: Pet, ownerId: string | number) {
  try {
    const petCreated = await postData(`/pets`, { owner_id: ownerId, ...pet });

    return { success: true, data: petCreated.data };
  } catch (error) {
    console.error(error);
  }
}

export async function editPet(pet: any) {
  try {
    const petCreated = await putData(`/pets/${pet.id}`, {
      ...pet,
    });

    return { success: true, data: petCreated.data };
  } catch (error) {
    console.error(error);
  }
}

export async function deletePet(petId: string): Promise<{ success: boolean }> {
  try {
    await deleteData(`/pets/${petId}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getUserPets(user_id: number): Promise<Pet[] | undefined> {
  try {
    const userPets = await getData(`/pets/pet-owners/${user_id}`);

    if (
      userPets &&
      typeof userPets === "object" &&
      "data" in userPets &&
      typeof (userPets as any).data === "object"
    ) {
      return (userPets as { data: Pet[] }).data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}
