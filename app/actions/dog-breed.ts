import { getData } from "../lib/apiClient";

export async function searchDogBreeds(searchValue: string) {
  try {
    const response = await getData(`/dog-breeds/${searchValue}`);
    const data = await response?.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
