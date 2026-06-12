import { getData, postData } from "./api";

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
  return postData({ status }, `/companies/${id}`, "PATCH");
};

export const getJobDetailsData = async (id) => {
  return getData(`/jobs/${id}`);
};

export const getCompaniesPost = async (formData) => {
  return postData(formData, "/companies");
};

// get company
export const getUsersCompaniesData = async (userId) => {
  console.log(userId);
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
  return postData(formData, "/applyuser");
};

// apply limition

export const getApplicationByApply = async (userId) => {
  return getData(`/applyuser?userId=${userId}`);
};

export const getPlanById = async (planId) => {
  console.log(planId);
  return getData(`/plans?plan_id=${planId}`);
};

// suscribtions
export const getSubcreptions = async (subInfo) => {
  return postData(subInfo, "/subcriptions");
};
