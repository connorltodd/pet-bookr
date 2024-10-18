"use client";

import { useFormState } from "react-dom";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  searchAddresses,
  searchAddressesById,
  searchAddressesByPostcode,
} from "@/app/actions/address-onboarding";
import { AddressSuggestionData } from "@/app/types";
import { OnboardingContext } from "@/app/contexts/onboardingContext";

const initialState = {
  data: [],
};

export default function AddressOnboardingPage() {
  const [formState, formAction] = useFormState(searchAddresses, initialState);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestionData[]
  >([]);

  const { onboardingData, setOnboardingData } = useContext(OnboardingContext);

  const getAddressesByPostcode = async (postcode: string) => {
    const addressesByPostcode = await searchAddressesByPostcode(postcode);
    setAddressSuggestions(addressesByPostcode as AddressSuggestionData[]);
  };

  // this is used if the user goes back to the previous page to change their address on onboarding flow
  useEffect(() => {
    if (onboardingData?.address?.postcode?.length) {
      getAddressesByPostcode(onboardingData?.address?.postcode);
    }
  }, []);

  // gets suggestions from API and stores them in the state
  useEffect(() => {
    // @ts-ignore
    if (formState?.data.length) {
      // @ts-ignore
      setAddressSuggestions(formState.data);
    }
  }, [formState]);

  // Takes the id from the suggestion and returns the full address ready to store in DB
  const getAddressDetailedInfo = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const addressId = event.target.value;
    const detailedAddress = await searchAddressesById(addressId);
    setOnboardingData({
      ...onboardingData,
      address: {
        id: addressId,
        line_1: detailedAddress.line_1,
        line_2: detailedAddress.line_2,
        town_or_city: detailedAddress.town_or_city,
        county: detailedAddress.county,
        postcode: detailedAddress.postcode,
        country: detailedAddress.country,
      },
    });
  };

  return (
    <div className="flex justify-between sm:w-[100%] md:w-[500px] min-h-[353px] flex-col p-4">
      <h1 className="font-bold sm:text-[24px]  text-center">
        What is your address?
      </h1>

      <div>
        <form action={formAction} className="flex justify-between gap-3 mb-8">
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="CF83 7PP"
            name="address"
            defaultValue={
              onboardingData?.address?.postcode?.length
                ? onboardingData?.address?.postcode
                : ""
            }
          />
          <button className="btn btn-outline border-primary text-primary hover:btn-primary hover:text-white">
            Find Address
          </button>
        </form>

        {addressSuggestions.length ? (
          <select
            className="select select-bordered w-full"
            onChange={getAddressDetailedInfo}
            defaultValue={
              onboardingData?.address?.id?.length
                ? onboardingData?.address?.id
                : "default"
            }
          >
            <option value={"default"} disabled>
              Select your address
            </option>
            {addressSuggestions.map(
              (addressSuggestion: AddressSuggestionData) => (
                <option key={addressSuggestion.id} value={addressSuggestion.id}>
                  {addressSuggestion.address}
                </option>
              )
            )}
          </select>
        ) : null}
      </div>

      <div className="flex justify-center">
        {Object.keys(onboardingData.address).length > 1 && (
          <Link
            className="btn btn-primary  min-w-24"
            href="/dashboard/onboarding/pets"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
