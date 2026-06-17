import { getUserToken } from "@/lib/session";

import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const authHeader = async () => {
  const token = await getUserToken();

  const header = {
    authorization: `Bearer ${token}`,
  };

  return token ? header : {};
};

export const protectedFetch = async (path, body = null, method = "GET") => {

  if (!path) {
    throw new Error("API path missing");
  }

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new Error("Request failed");
  }
  
 
  return handleStatusCode(res);
  
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
    return handleStatusCode(res);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getData = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
      headers: {
        ...(await authHeader()),
      },
    });

    if (!res.ok) throw new Error("faild to fetch get data");

    return handleStatusCode(res);
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

// 401, 403 status handle

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/login");
  } else if (res.status === 403) {
    redirect("/unauthorized");
  }
  return res.json();
};
