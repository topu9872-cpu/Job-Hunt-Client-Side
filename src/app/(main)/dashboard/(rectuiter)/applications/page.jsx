import { getTotalApplications } from "@/app/api/Server/Server";

const ApplicationsPage = async () => {
  const getTotalApply = await getTotalApplications() || [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header section to match your dashboard style */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Job Applications
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review and manage all incoming candidate applications.
        </p>
      </div>

      {/* Unique Table Wrapper */}
      <div className="overflow-x-auto bg-white dark:bg-black rounded-xl shadow border border-slate-100 dark:border-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50/70 dark:bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Applied Position</th>
              <th className="px-6 py-4">Date Submitted</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-sm text-slate-700 dark:text-slate-300">
            {getTotalApply.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              getTotalApply.map((app, index) => {
                // Formatting safety checks depending on your database schema names
                const applicantName = app?.user?.name || app?.applicantName || "Anonymous Candidate";
                const applicantEmail = app?.user?.email || app?.email || "No email linked";
                const jobTitle = app?.job?.title || app?.jobTitle || "Unknown Position";
                const dateApplied = app?.createdAt || app?.date;
                const status = app?.status || "Pending";

                return (
                  <tr 
                    key={app?._id || app?.id || index} 
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors"
                  >
                    {/* Applicant Main Profiler */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {applicantName}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {applicantEmail}
                        </span>
                      </div>
                    </td>

                    {/* Target Job Position */}
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {jobTitle}
                      </span>
                    </td>

                    {/* Formatted Date Block */}
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                      {dateApplied ? new Date(dateApplied).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : "N/A"}
                    </td>

                    {/* Contextual Color Status Badging */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        status.toLowerCase() === "accepted" || status.toLowerCase() === "approved"
                          ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400"
                          : status.toLowerCase() === "rejected"
                          ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400"
                          : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400"
                      }`}>
                        {status}
                      </span>
                    </td>

                    {/* Quick Access Interaction Controls */}
                    <td className="px-6 py-4 text-right text-xs">
                      <button className="px-3 py-1.5 font-medium rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsPage;