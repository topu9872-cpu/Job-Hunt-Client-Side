export const getJobsData = async (page = 1, search = '', location='') => {
  try {
    const res = await fetch(
      `${process.env.SERVER_PUBLIC_NEXT_URI}/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}&page=${page}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Faild to fetch get jobs data");
    return res.json();
  } catch (error) {
    console.error(error);
    return { data: [], totalpage: 0, crruentpage: 1 };
  }
};
