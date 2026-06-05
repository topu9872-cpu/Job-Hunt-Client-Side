const BASE_URL = process.env.SERVER_PUBLIC_NEXT_URI;

export const getData = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("faild to fetch get data");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
