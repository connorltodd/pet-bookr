"use client";

import { useFormState } from "react-dom";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  searchAddresses,
  searchAddressesById,
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

  useEffect(() => {
    // @ts-ignore
    if (formState?.data.length) {
      // @ts-ignore
      setAddressSuggestions(formState.data);
    }
  }, [formState]);

  const getAddressDetailedInfo = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const addressId = event.target.value;
    const detailedAddress = await searchAddressesById(addressId);
    setOnboardingData({
      ...onboardingData,
      address: {
        line_1: detailedAddress.line_1,
        line_2: detailedAddress.line_2,
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
          />
          <button className="btn btn-outline">Find Address</button>
        </form>

        {addressSuggestions.length ? (
          <select
            className="select select-bordered w-full"
            onChange={getAddressDetailedInfo}
          >
            <option selected disabled>
              Select your address
            </option>
            {addressSuggestions.map(
              (addressSuggestion: AddressSuggestionData) => (
                <option value={addressSuggestion.id}>
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
            href="/dashboard/onboarding/welcome"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
