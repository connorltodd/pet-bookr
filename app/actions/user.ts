"use server";

import { getData, putData } from "../lib/apiClient";
import { getUserId } from "../lib/getUser";
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

export async function getUser() {
  const user_id = await getUserId();

  try {
    const user = await getData(`pet-owners/${user_id}`);
    return user.data;
  } catch (error) {
    console.error(error);
  }
}
