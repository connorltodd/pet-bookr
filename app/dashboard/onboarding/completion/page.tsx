"use client";

import {
  defaultOnboardingObject,
  OnboardingContext,
} from "@/app/contexts/onboardingContext";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import dogsSmiling from "@/app/assets/images/smiling-welcome-dogs-photo.png";
import { updateUserAddress } from "@/app/actions/user";
import { getUserId } from "@/app/lib/getUser";
import { createPet } from "@/app/actions/pet";

export default function OnboardingCompletionPage() {
  const [isOnboardingDataSaving, setOnboardingDataSavingState] =
    useState(false);
  const { onboardingData, setOnboardingData } = useContext(OnboardingContext);

  useEffect(() => {
    saveUserOnboardingInfo();
  }, []);

  const saveUserOnboardingInfo = async () => {
    if (
      !window.localStorage.getItem("onboardingData") ||
      !onboardingData?.pets?.length ||
      !onboardingData?.address?.postcode
    ) {
      return;
    }
    const user_id = await getUserId();
    // loop through the pets array and create each pet
    // add the user id when creating the pet

    for (const petData of onboardingData.pets) {
      const { id, ...rest } = petData;
      await createPet(rest, user_id as string);
    }

    // update the user to add the new address info
    const userUpdate: any = await updateUserAddress(
      onboardingData.address,
      user_id as string
    );

    if (userUpdate?.success) {
      window.localStorage.removeItem("onboardingData");
      setOnboardingDataSavingState(false);
      setOnboardingData(defaultOnboardingObject);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 sm:w-[100%] md:w-[500px] min-h-[353px] flex-col p-4">
      {isOnboardingDataSaving ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          <h1 className="font-bold sm:text-[24px]  text-center">
            We are saving your info, we won't be a moment
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            className="rounded"
            src={dogsSmiling}
            height={250}
            width={250}
            alt="pets image"
          />
          <h1 className="font-bold sm:text-[24px] mt-4 text-center">
            Your account is ready to go!
          </h1>
          <div className="flex justify-center mt-4">
            <a href="/" className="btn btn-primary min-w-24">
              View Groomers
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
