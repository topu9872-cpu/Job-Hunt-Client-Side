import { getData } from "./api";

export const getJobsData = async (page = 1, search = "", location = "") => {
  return getData(
    `/jobs?search=${encodeURIComponent(search)}&$location=${encodeURIComponent(location)}&page=${page}`,
  );
};

export const getCompaniesData = async (search = "") => {
  return getData(`/companies?search=${encodeURIComponent(search)}`)
};

export const getJobDetailsData = async (id) => {
  return getData(`/job/:${id}`)
};