import type { Blog } from "../types/Blog";

const BASE_URL = "http://localhost:5000";

// helper check response
const validation = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch blogs");
  }

  return response.json();
};

// fetch semua blog
export const fetchBlog = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`);

    return validation(response);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to fetch blogs");
  }
};

// buat blog baru
export const createBlog = async (blog: Blog): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    await validation(response);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to create blog");
  }
};

// fetch satu blog
export const fetchOneBlog = async (id: string): Promise<Blog> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`);

    return validation(response);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to fetch blogs");
  }
};

// delete blog berdasarkan ID
export const deleteBlog = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
    });
    await validation(response);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to delete blog");
  }
};

// edit blog
export const updateBlog = async (id: string, blog: Blog): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    await validation(response);
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to update blog");
  }
};
