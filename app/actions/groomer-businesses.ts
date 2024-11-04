import { getData } from "../lib/apiClient";

export async function searchGroomerBusinesses(searchTerm: string) {
  try {
    const getGroomerBusinesses = await getData(
      `/groomer-businesses/search?term=${searchTerm}`
    );

    return { success: true, data: getGroomerBusinesses.data };
  } catch (error) {
    console.error(error);
  }
}
