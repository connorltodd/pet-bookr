import { verifySession } from "./dal";

export async function getUserId() {
  const session = await verifySession();
  const user_id = session?.userId;
  return user_id;
}
