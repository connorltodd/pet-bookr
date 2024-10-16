import { postData } from "../lib/apiClient";
import { Pet } from "../types";

export async function createPet(pet: Pet, ownerId: string) {
  try {
    const petCreated = await postData(`/pets`, { owner_id: ownerId, ...pet });

    console.log(petCreated);
    return { success: true, data: petCreated.data };
  } catch (error) {
    console.error(error);
  }
}
