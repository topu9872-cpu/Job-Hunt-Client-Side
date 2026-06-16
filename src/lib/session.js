'use server'
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};

export const requireRole = async (role) => {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};
