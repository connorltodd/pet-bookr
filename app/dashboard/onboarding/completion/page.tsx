"use client";

import { OnboardingContext } from "@/app/contexts/onboardingContext";
import { postData } from "@/app/lib/apiClient";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import dogsSmiling from "@/app/assets/images/smiling-welcome-dogs-photo.png";

export default function OnboardingCompletionPage() {
  const [isOnboardingDataSaving, setOnboardingDataSavingState] = useState(true);
  const { onboardingData, setOnboardingData } = useContext(OnboardingContext);

  useEffect(() => {
    saveUserOnboardingInfo();
  }, []);

  const saveUserOnboardingInfo = async () => {
    // loop through the pets array and create each pet
    // add the user id when creating the pet
    // update the user to add the new address info
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
            <Link href="/dashboard" className="btn btn-primary min-w-24">
              View Groomers
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
