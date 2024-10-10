export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  street_address?: string;
  city?: string;
  county?: string;
  postcode?: string;
  country?: string;
};

export type AddressSuggestions = {
  suggestions: AddressSuggestionData[];
};

export type AddressSuggestionData = {
  id: string;
  address: string;
  url: string;
};
