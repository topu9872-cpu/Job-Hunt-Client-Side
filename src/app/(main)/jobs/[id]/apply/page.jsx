import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ApplyForm from "./ApplyForm";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "user") {
  return (
    <div className="text-center my-20 mx-auto flex justify-center text-3xl font-semibold">
      <span className="border border-gray-300 shadow card  container py-20"> You are not allowed to apply for jobs.</span>
     
    </div>
  );
}
  console.log(user);
  return <div>
    <ApplyForm/>
  </div>
};

export default ApplyPage;
