import OneByOneBack from "@/components/OneByOneBack/OneByOneBack";
import { getJobsData } from "../../api/Server/Server";
import AllCards from "./AllCards";
import JobSearch from "./JobSearch";
import PaginationPage from "./PaginationPage";

const JobsPage = async ({ searchParams }) => {
  const params = await searchParams
 
  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const location = params?.location || "";
  const jobsData = await getJobsData(page, search,location);
console.log(search)
  return (
    <>
      <div className="min-h-screen mt-30 w-11/12 space-y-5 mx-auto ">
        <div className="space-y-4">
          <OneByOneBack />
          <JobSearch search={search} location={location}/>
        </div>
        <AllCards jobsData={jobsData.data} />
        <div className="my-10">
          <PaginationPage page={page}  search={search} location={location}  totalPages={jobsData.totalPages}/>
        </div>
      </div>
    </>
  );
};

export default JobsPage;
