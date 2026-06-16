
import { getData, postData, protectedFetch } from "./api";

export const getJobsData = async (page = 1, search = "", location = "") => {
  return getData(
    `/jobs?search=${encodeURIComponent(search)}&$location=${encodeURIComponent(location)}&page=${page}`,
  );
};

export const getRectuterJobsData = async () => {
  return getData("/dashboardjobs");
};

export const getCompaniesData = async (search = "") => {
  return getData(`/companies?search=${encodeURIComponent(search)}`);
};

//admin aprove companies

export const updateCompaniesData = async (id, status) => {
  return protectedFetch({ status }, `/companies/${id}`, "PATCH");
};

export const getJobDetailsData = async (id) => {
  return getData(`/jobs/${id}`);
};

export const getCompaniesPost = async (formData) => {
  return postData(formData, "/companies");
};

// get company
export const getUsersCompaniesData = async (userId) => {
  return getData(`/user-companies?userId=${userId}`);
};

export const getJobsPost = async (formData) => {
  return postData(formData, "/jobs");
};

// getJobId
export const getJobById = async (jobId) => {
  return getData(`/jobs/${jobId}`);
};

// user apply
export const getUserApplyPost = async (formData) => {
  return protectedFetch(formData, "/applyuser");
};

// apply limition

export const getApplicationByApply = async (userId) => {
  return protectedFetch({}, `/applyuser?userId=${userId}`);
};

export const getPlanById = async (planId) => {
  return getData(`/plans?plan_id=${planId}`);
};

// suscribtions
export const getSubcreptions = async (subInfo) => {
  return postData(subInfo, "/subcriptions");
};

//get users

export const getTotalUsers = async () => {
  return protectedFetch("/users");
};
export const postUsers = async (userId, role) => {
 
  return protectedFetch(`/users/${userId}`,{ role }, "POST");
   
};

// get Applications
export const getTotalApplications = async () => {
  return getData("/applications");
};
export const getAllJobs = async () => {
  return getData("/all-jobs");
};

// get subscriptions
export const getTotalSubscriptions = async () => {
  return protectedFetch("/subscriptions", {
    cache: "no-store",
  });
};
