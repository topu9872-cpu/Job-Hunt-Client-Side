import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ApplyForm from "./ApplyForm";
import {
  getApplicationByApply,
  getJobById,
  getPlanById,
} from "@/app/api/Server/Server";
import Link from "next/link";

const ApplyPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }

  // Unauthorized Role State Card
  if (user.role !== "user") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50/50">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Application Restricted
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Only verified job seekers can submit applications. If you are
            registered as a recruiter, please switch accounts.
          </p>
        </div>
      </div>
    );
  }

  const job = await getJobById(id);
  const applications = await getApplicationByApply(user?.id);
  //  console.log(applications);
  const plan = await getPlanById(user?.plan);
 
// console.log("PLAN_ID FROM USER:", user?.plan);
  const hasRemainingApplications =
    applications?.length < plan?.maxApplicationsPerMonth;

  return (
    <main className="min-h-screen py-12 px-4 mt-10 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Modern Usage Dashboard Header */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Your Current Plan:{" "}
                <span className="text-blue-600">{plan?.name}</span>
              </p>
              <h1 className="text-xl sm:text-2xl font-bold">
                Monthly Application Allowance
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-3xl font-black ">
                {applications.length}
              </span>
              <span className="text-gray-400 font-medium text-lg">
                / {plan?.maxApplicationsPerMonth}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Submissions this month
              </p>
            </div>
          </div>

          {/* Clean Progress Tracker */}
          <div className="w-full  h-2.5 rounded-full mt-5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                hasRemainingApplications ? "bg-blue-600" : "bg-amber-500"
              }`}
              style={{
                width: `${Math.min((applications.length / plan?.maxApplicationsPerMonth) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        {hasRemainingApplications ? (
          <div className=" border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <ApplyForm user={user} job={job} />
          </div>
        ) : (
          /* Limit Reached Out-of-Quota Banner */
          <div className="border border-amber-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold  mb-2">Monthly Limit Reached</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              You have successfully used all {plan?.maxApplicationsPerMonth} of
              your free applications for this cycle. Ready to apply to more
              positions?
            </p>
            <Link
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-100 transition-colors duration-200"
              href="/plan"
            >
              Explore Premium Plans
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ApplyPage;
