
const CompanyCard=dynamic(()=>import("@/components/Companies/CompanyCard"),{
  loading:()=><div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
})  ;
const CompanyFilters=dynamic(()=>import("@/components/Companies/CompanyFilters"),{
  loading:()=><div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
}) ;
import dynamic from "next/dynamic";
import { getCompaniesData } from "../../api/Server/Server";
import OneByOneBack from "@/components/OneByOneBack/OneByOneBack";

const CompaniesPage = async ({ searchParams }) => {
  const params=await searchParams ;
  const search = params?.search || "";
  const companies = await getCompaniesData(search);

  return (
    <div className="w-11/12 mx-auto">
      <div className="mt-30 ml-10"><OneByOneBack/></div>
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
