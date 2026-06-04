export const getJobsData = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_PUBLIC_NEXT_URI}/jobs`);
    if (!res.ok) throw new Error("Faild to fetch get jobs data");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
