const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;
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

export const postData = async (formData, endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method:'POST',
      headers: {
        "content-type":"application/json",
      },

      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(" faild to fetch post data");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};





// date 

export const getDaysAgo = (postedAt) => {
  const [day, month, year] = postedAt.split("/");
  const postDate = new Date(year, month - 1, day);

  const today = new Date();

  return Math.floor(
    (today - postDate) / (1000 * 60 * 60 * 24)
  );
};