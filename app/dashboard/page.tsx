import { redirect } from "next/navigation";
import { getData } from "../lib/apiClient";
import { User } from "../types";
import { getUserId } from "../lib/getUser";

export default async function Dashboard() {
  const user_id = await getUserId();

  const response: any = await getData(`/pet-owners/${user_id}`);
  const user = response?.data as User;

  if (!user.postcode) {
    redirect("/dashboard/onboarding/welcome");
  } else {
    redirect("/dashboard/businesses");
  }
}
