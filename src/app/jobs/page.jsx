import { getJobsData } from "../api/Server/Server";
import AllCards from "./AllCards";

const JobsPage = async () => {
  const jobsData = await getJobsData();

  return (
    <div className="min-h-screen mt-30 w-11/12 mx-auto ">
      <AllCards jobsData={jobsData}/>
    </div>
  );
};

export default JobsPage;
