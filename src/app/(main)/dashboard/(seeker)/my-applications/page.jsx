import { getApplicationByApply } from "@/app/api/Server/Server";
import { getSession } from "@/lib/session";

const SeekerApplicationsPage = async () => {
  const user = await getSession();
  const applications = await getApplicationByApply(user?.id);

  return (
    <div className="min-h-screen px-4 py-10 mt-10 md:mt-0 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold">My Applications</h1>
          <p className="text-sm ">Track your job applications</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-700/40 rounded-xl">
          <table className="w-full text-sm">
            {/* Head */}
            <thead className="text-xs  uppercase">
              <tr className="border-b border-gray-700/40">
                <th className="px-5 py-4 text-left">Job</th>
                <th className="px-5 py-4 text-left">Company</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Applied Date</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {applications?.length > 0 ? (
                applications.map((app) => (
                  <tr
                    key={app._id}
                    className="border-b  hover:opacity-80 transition"
                  >
                    {/* Job Title */}
                    <td className="px-5 py-4 text-gray-600 font-bold">
                      {app.jobTitle}
                    </td>

                    {/* Company */}
                    <td className="px-5 py-4 text-gray-400">
                      {app.companyName}
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-gray-500">{app.email}</td>

                    {/* Phone */}
                    <td
                      className={`text-center rounded-full p-0.5 ${
                        app.status === "pending"
                          ? " text-yellow-500"
                          : app.status === "Selected"
                            ? " text-green-500"
                            : " text-red-500"
                      }`}
                    >
                     
                      {app.status || "pending"}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-gray-500">
                      {new Date(app.applicationData).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeekerApplicationsPage;
