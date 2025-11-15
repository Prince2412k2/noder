import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

/**
 * Server component that enforces authentication, fetches the list of users, and renders the data with a logout control.
 *
 * @returns JSX element containing pretty-printed user data and a LogoutButton
 *
 * @throws If authentication fails, an error is thrown and the component will not render
 */
export default async function Home() {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  );
}