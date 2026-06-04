import OneByOneBack from "@/components/OneByOneBack/OneByOneBack";
import { getJobsData } from "../api/Server/Server";
import AllCards from "./AllCards";
import JobSearch from "./JobSearch";
import PaginationPage from "./PaginationPage";


const JobsPage = async () => {
  const jobsData = await getJobsData();

  return (
    <>
   
    <div className="min-h-screen mt-30 w-11/12 mx-auto ">
     <div className="space-y-4">
      <OneByOneBack/>
     <JobSearch/>
    </div>
      <AllCards jobsData={jobsData}/>
     <div className="my-10">
       <PaginationPage/>
     </div>
    </div>
    </>
  );
};

export default JobsPage;

