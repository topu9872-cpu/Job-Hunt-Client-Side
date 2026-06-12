import { getApplicationByApply } from "@/app/api/Server/Server";
import { getSession } from "@/lib/session";

const SeekerApplicationsPage =async () => {
  const user=await getSession()
  const SeekerApplications=await getApplicationByApply(user?.id)
  console.log(SeekerApplications)
  console.log(user)
  return (
    <div>
       
    </div>
  );
};

export default SeekerApplicationsPage;