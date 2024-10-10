"use client";

import { useState, createContext, Dispatch, SetStateAction } from "react";

interface OnboardingData {
  address: object;
  pets: any[];
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: Dispatch<SetStateAction<OnboardingData>>;
}

// Provide a default value for the context
const defaultOnboardingData: OnboardingContextType = {
  onboardingData: {
    address: {},
    pets: [],
  },
  setOnboardingData: () => {},
};

export const OnboardingContext = createContext<OnboardingContextType>(
  defaultOnboardingData
);

const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    address: {},
    pets: [],
  });
  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
