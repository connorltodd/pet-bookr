"use server";

import axios from "axios";
import { AddressSuggestions } from "../types";

export async function searchAddresses(prevState: any, formData: FormData) {
  const addressSearchValue = formData.get("address");

  try {
    const response = await axios.get<any>(
      `https://api.getAddress.io/autocomplete/${addressSearchValue}?api-key=${process.env.ADDRESS_LOOKUP_API_KEY}`
    );
    const data = await response?.data;
    return { message: "", data: data?.suggestions as AddressSuggestions };
  } catch (error) {
    return error;
  }
}

export async function searchAddressesById(addressId: string) {
  try {
    const response = await axios.get<any>(
      `https://api.getAddress.io/get/${addressId}?api-key=${process.env.ADDRESS_LOOKUP_API_KEY}`
    );
    const data = await response?.data;
    return data;
  } catch (error) {
    return { message: error };
  }
}