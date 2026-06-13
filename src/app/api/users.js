
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUsersList = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    headers: await headers(),
  });



  return users;
};
