import { redirect } from "next/navigation";
import { getData } from "../lib/apiClient";
import { verifySession } from "../lib/dal";
import { User } from "../types";

export default async function Dashboard() {
  const session = await verifySession();

  const user_id = session?.userId;

  const response: any = await getData(`/pet-owners/${user_id}`);
  const user = response?.data as User;

  if (!user.postcode) {
    redirect("/dashboard/onboarding/welcome");
  } else {
    redirect("/dashboard/businesses");
  }
}
