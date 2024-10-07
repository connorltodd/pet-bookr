import { verifySession } from "../lib/dal";
import LogoutButton from "../ui/components/LogoutButton";

export default async function Dashboard() {
  const session = await verifySession();

  const user_id = session?.userId;

  return (
    <div>
      <h1>User ID: {user_id.toString()}</h1>
      <LogoutButton />
    </div>
  );
}
