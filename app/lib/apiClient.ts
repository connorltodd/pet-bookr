import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

// Define a generic API response type (you can replace `any` with specific types)
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}

// Create an axios instance with default configuration
const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
    // You can add other default headers like Authorization here if needed
  },
});

// Request interceptor to handle things like attaching tokens
axiosClient.interceptors.request.use(
  (config) => {
    // Example: Add Authorization token if available
    const token = cookies().get("session")?.value;
    if (token) {
      // Ensure headers object exists before modifying it
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor to handle response globally
axiosClient.interceptors.response.use(
  (response) => {
    // Handle successful responses globally
    return response.data;
  },
  (error) => {
    // Handle errors globally, you can customize this based on your API structure
    if (error.response) {
      // Server-side error
      console.error("Error response:", error.response);
    } else if (error.request) {
      // Network error
      console.error("Error request:", error.request);
    } else {
      // Other errors
      console.error("Error message:", error.message);
    }

    // Optionally, you could dispatch actions here for handling global errors (e.g., refresh token, notify user)
    return Promise.reject(error);
  }
);

// Example function to make a GET request with generic typing
export const getData = <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<ApiResponse<T>> => {
  return axiosClient.get(endpoint, { params });
};

// Example function to make a POST request with generic typing
export const postData = <T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> => {
  return axiosClient.post(endpoint, data);
};

// Example function to make a PUT request with generic typing
export const putData = <T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> => {
  return axiosClient.put(endpoint, data);
};

// Example function to make a DELETE request with generic typing
export const deleteData = <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return axiosClient.delete(endpoint);
};

// Export the axios instance for any direct use
export default axiosClient;
