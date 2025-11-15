import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

export default async function Home() {
  await requireAuth();
  const data = await caller.getUsers();
  return (
    <div className="dark min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  );
}
