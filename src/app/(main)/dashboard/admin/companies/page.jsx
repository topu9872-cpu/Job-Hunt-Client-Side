import { getCompaniesData } from "@/app/api/Server/Server";
import AdminCompaniesTable from "./AdminCompaniesTable"; // We will create this next

const AdminCompaniesPage = async () => {
  const allCompaniesData = await getCompaniesData();
  
  // Safe array fallback check
  const companies = Array.isArray(allCompaniesData) 
    ? allCompaniesData 
    : allCompaniesData ? [allCompaniesData] : [];

  return (
    <div className="max-w-7xl mx-auto my-8 p-6">
      <div className="mb-8 border-b border-current/10 pb-4">
        <h2 className="text-2xl font-bold">Admin Company Directory</h2>
        <p className="text-sm opacity-60 mt-1">
          Review, approve, or reject organization profiles.
        </p>
      </div>

      {/* Render the interactive JavaScript table */}
      <AdminCompaniesTable initialCompanies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;