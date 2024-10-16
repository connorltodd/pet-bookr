"use server";

import { putData } from "../lib/apiClient";
import { AddressDetails } from "../types";

export async function updateUser(address: AddressDetails, userId: string) {
  try {
    const userUpdate = await putData(`pet-owners/${userId}`, {
      address_line_1: address.line_1,
      address_line_2: address.line_2,
      town_or_city: address.town_or_city,
      county: address.county,
      postcode: address.postcode,
      country: address.country,
    });

    return { success: true, data: userUpdate.data };
  } catch (error) {
    console.error(error);
  }
}
