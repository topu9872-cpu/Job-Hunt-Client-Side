import { getData, postData } from "./api";

export const getJobsData = async (page = 1, search = "", location = "") => {
  return getData(
    `/jobs?search=${encodeURIComponent(search)}&$location=${encodeURIComponent(location)}&page=${page}`,
  );
};

export const getCompaniesData = async (search = "") => {
  return getData(`/companies?search=${encodeURIComponent(search)}`)
};

export const getJobDetailsData = async (id) => {
  return getData(`/jobs/${id}`)
};

export const getCompaniesPost=async(formData)=>{
  return postData(formData, '/companies')
}

export const getJobsPost=async(formData)=>{
  return postData(formData, '/jobs');
}