import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../actions/user";
import { Pet, User } from "../types";

// Define the types for the user and pets

interface UserContextType {
  user: User | null;
  pets: Pet[];
  setUser: (user: User | null) => void;
  setPets: (pets: Pet[]) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  const getUserDetails = async () => {
    const user = await getUser();
    setUser(user as any);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, pets, setUser, setPets }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
