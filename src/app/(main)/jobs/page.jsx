import OneByOneBack from "@/components/OneByOneBack/OneByOneBack";
import { getJobsData } from "../../api/Server/Server";
import dynamic from "next/dynamic";

const AllCards = dynamic(() => import("../../../components/AllCards"), {
  loading: () => (
    <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  ),
});

import JobSearch from "../../../components/JobSearch";

const PaginationPage = dynamic(() => import("../../../components/PaginationPage"), {
  loading: () => (
    <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  ),
});

const JobsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const location = params?.location || "";
  
  let jobsData = null;
  try {
    jobsData = await getJobsData(page, search, location);
  } catch (error) {
    console.error("Failed to load jobs data:", error.message);
  }

  return (
    <>
      <div className="min-h-screen mt-30 w-11/12 space-y-5 mx-auto ">
        <div className="space-y-4">
          <OneByOneBack />
          <JobSearch search={search} location={location} />
        </div>
        
        {/* Fallback to empty array if fetch failed */}
        <AllCards jobsData={jobsData?.data || []} />
        
        <div className="my-10">
          <PaginationPage
            page={page}
            search={search}
            location={location}
            totalPages={jobsData?.totalPages || 1}
          />
        </div>
      </div>
    </>
  );
};

export default JobsPage;