import type { Blog } from "../types/Blog";

const BASE_URL = "http://localhost:5000";

// fetch semua blog
export const fetchBlog = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch blogs");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to fetch blogs");
  }
};
