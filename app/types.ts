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

export type AddressDetails = {
  id?: string;
  line_1?: string;
  line_2?: string;
  town_or_city?: string;
  county?: string;
  postcode?: string;
  country?: string;
};

export type Pet = {
  id?: number;
  name: string;
  weight: number;
  type: string;
  fur_type: string;
  birthday: string;
  owner_id?: string;
};
