"use client";

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { AddressDetails } from "../types";

interface OnboardingData {
  address: AddressDetails;
  pets: any[];
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: Dispatch<SetStateAction<OnboardingData>>;
}

// Provide a default value for the context
const defaultOnboardingData: OnboardingContextType = {
  onboardingData: {
    address: {
      id: "",
      line_1: "",
      line_2: "",
      town_or_city: "",
      county: "",
      postcode: "",
      country: "",
    },
    pets: [],
  },
  setOnboardingData: () => {},
};

export const OnboardingContext = createContext<OnboardingContextType>(
  defaultOnboardingData
);

const defaultOnboardingObject = {
  address: {},
  pets: [],
};

const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(() => {
    // getting stored value
    const onboardingData = localStorage.getItem("onboardingData");
    let initialValue = defaultOnboardingObject;
    if (onboardingData) {
      initialValue = JSON.parse(onboardingData);
    }
    return initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(
      "onboardingData",
      JSON.stringify(onboardingData)
    );
  }, [onboardingData]);
  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
