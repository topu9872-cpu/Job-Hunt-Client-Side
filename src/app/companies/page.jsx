import CompanyCard from "@/components/Companies/CompanyCard";
import CompanyFilters from "@/components/Companies/CompanyFilters";

const CompaniesPage = () => {
  return (
    <div>
   <CompanyFilters/>
      <CompanyCard/>
    </div>
  );
};

export default CompaniesPage;