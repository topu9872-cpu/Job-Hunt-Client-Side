import { getJobDetailsData } from "@/app/api/Server/Server";
import JobDetailsComponent2 from "@/components/JobSDetailsComponents/JobDetailsComponent2";
import JobDetailsComponent1 from "@/components/JobSDetailsComponents/JobSDetailsComponent1";
import OneByOneBack from "@/components/OneByOneBack/OneByOneBack";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const jobDetailsData = await getJobDetailsData(id);
  
  return <div className="mt-30">
    <div className="ml-20"><OneByOneBack/></div>
    <JobDetailsComponent1 jobDetailsData={jobDetailsData}/>
    <JobDetailsComponent2 jobDetailsData={jobDetailsData}/>
  </div>;
};

export default JobDetailsPage;
