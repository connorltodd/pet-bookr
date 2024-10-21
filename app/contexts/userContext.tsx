import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "../actions/user";

// Define the types for the user and pets
type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2?: string;
  town_or_city?: string;
  county?: string;
  postcode: string;
  country: string;
};

interface Pet {
  id: number;
  name: string;
  type: string;
}

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
