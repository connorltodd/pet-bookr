export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  address_line_1?: string;
  address_line_2?: string;
  town_or_city?: string;
  county?: string;
  postcode?: string;
  country?: string;
  phone_number?: string;
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
  id?: string;
  name: string;
  sex?: string;
  neutered?: boolean;
  type: string;
  birthday?: string;
  dog_breed_id?: number;
  owner_id?: string;
};

export type DogBreed = {
  id?: string;
  breed?: string;
  hair_type?: string;
  dog_size?: string;
  adult_start_age?: string;
};

export type Business = {
  id?: string;
  name: string;
  business_type?: string;
  address_line_1: string;
  address_line_2: string;
  town_or_city: string;
  county: string;
  postcode: string;
  country: string;
  description?: string;
  monday_operating_hours?: string;
  tuesday_operating_hours?: string;
  wednesday_operating_hours?: string;
  thursday_operating_hours?: string;
  friday_operating_hours?: string;
  saturday_operating_hours?: string;
  sunday_operating_hours?: string;
  header_image: string;
  phone_number: string;
};

export type PortfolioPhoto = {
  groomer_business_id: number;
  id: number;
  photo_url: string;
};

export type Service = {
  id: number;
  booking_id: number;
  service_name: string;
};

export type Employee = {
  first_name: string;
  last_name: string;
};

export type BookingDetails = {
  id: number;
  owner_id: number;
  pet_id: number;
  date: string; // ISO date string (e.g., "2024-12-26")
  start_time: string; // ISO datetime string (e.g., "2024-12-26T12:00:00.000Z")
  end_time: string; // ISO datetime string (e.g., "2024-12-26T13:00:00.000Z")
  groomer_employee_id: number;
  status: string;
};

export type Booking = {
  booking: BookingDetails;
  pet_name: string;
  employee: Employee;
  business_name: string;
  services: Service[];
};
