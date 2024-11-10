"use server";

import { getData, putData } from "../lib/apiClient";
import { getUserId } from "../lib/getUser";
import { AddressDetails, User } from "../types";

export async function updateUserAddress(
  address: AddressDetails,
  userId: string
) {
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

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  // add other properties as needed
}

export async function updateUser(
  userInfo: UserInfo,
  userId: number
): Promise<User | undefined> {
  try {
    const userUpdate: unknown = await putData(`pet-owners/${userId}`, {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
    });

    // Check if userUpdate is an object and has a 'data' property that is of type 'User'
    if (
      userUpdate &&
      typeof userUpdate === "object" &&
      "data" in userUpdate &&
      typeof (userUpdate as any).data === "object"
    ) {
      return (userUpdate as { data: User }).data; // Safely cast userUpdate
    } else {
      console.error("Invalid response format", userUpdate);
      return undefined;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return undefined;
  }
}

export async function getUser(): Promise<User | undefined> {
  const user_id = await getUserId();

  try {
    const user = await getData(`pet-owners/${user_id}`);

    if (
      user &&
      typeof user === "object" &&
      "data" in user &&
      typeof (user as any).data === "object"
    ) {
      return (user as { data: User }).data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}
