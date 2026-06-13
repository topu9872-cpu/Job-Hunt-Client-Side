import { getUserToken } from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = {
    authorization: `Bearer ${token}`,
  };
   
  return token ? header : {};

};

export const protectedFetch = async (body, path, method) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};



export const postData = async (formData, endpoint, method = "POST") => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        "content-type": "application/json",
        ...(await authHeader()),
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

export const getData = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("faild to fetch get data");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// image

export const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await res.json();

  return result.data.display_url;
};

// date

export const getDaysAgo = (postedAt) => {
  const [day, month, year] = postedAt.split("/");
  const postDate = new Date(year, month - 1, day);

  const today = new Date();

  return Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
};

//
