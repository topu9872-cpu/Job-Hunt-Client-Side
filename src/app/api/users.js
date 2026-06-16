// "use server";

// import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";
// import { headers } from "next/headers";

// export const getUsersList = async () => {
//   const users = await auth.api.listUsers({
//     query: {
//       sortBy: "createdAt",
//       sortDirection: "desc",
//     },
//     headers: await headers(),
//   });

//   return users;
// };

// // users actions

// export const handleUpdateRole = async (userId, role) => {
//   const data = await auth.api.setRole({
//     body: {
//       userId,
//       role,
//     },
//     headers: await headers(),

//   });
  
//   revalidatePath('/dashboard/admin/users')
//   return data ;
// };