export const dynamic = "force-dynamic";
import CompanyCard from "@/components/Companies/CompanyCard";
import CompanyFilters from "@/components/Companies/CompanyFilters";
import { getCompaniesData } from "../api/Server/Server";

const CompaniesPage = async ({ searchParams }) => {
  const params=await searchParams ;
  const search = params?.search || "";
  const companies = await getCompaniesData(search);

  return (
    <div className="w-11/12 mx-auto">
      <CompanyFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;
