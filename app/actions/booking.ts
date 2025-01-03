import { getData } from "../lib/apiClient";

export async function getUserBookings(
  user_id: number
): Promise<any | undefined> {
  try {
    const bookings = await getData(`bookings/owner-id/${user_id}`);

    if (
      bookings &&
      typeof bookings === "object" &&
      "data" in bookings &&
      typeof (bookings as any).data === "object"
    ) {
      return (bookings as { data: any }).data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}
