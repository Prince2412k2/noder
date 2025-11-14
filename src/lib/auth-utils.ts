import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
  const sessoin = await auth.api.getSession({
    headers: await headers(),
  });
  if (!sessoin) {
    redirect("/login");
  }
};

export const requireUnAuth = async () => {
  const sessoin = await auth.api.getSession({
    headers: await headers(),
  });
  if (sessoin) {
    redirect("/");
  }
};
