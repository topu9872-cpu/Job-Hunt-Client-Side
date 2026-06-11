import { requireRole  } from "@/lib/session";

const RecruiterLayout =async ({ children }) => {

  await  requireRole ('recruiter')
  return children;
};

export default RecruiterLayout;
