import { useEffect, useState } from "react";
import { fetchBlog } from "../api/blogApi";
import type { Blog } from "../types/Blog";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortDate, setSortDate] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlog();
        setBlogs(data);
      } catch (error) {
        console.log("error ", error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  const handleSort = () => {
    setSortDate((prev) => (prev === "asc" ? "desc" : "asc"));

    // todo sort blogs state
    setBlogs((prevBlogs) =>
      [...prevBlogs].sort((a, b) =>
        sortDate === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  };

  return (
    <Layout>
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#F28705] font-bold border-b-2 border-gray-700 pb-2">
          Latest Blogs
        </h1>
        <Link
          to="/create"
          className="bg-[#F28705] hover:bg-[#f28705d2] text-black font-semibold px-6 py-2 rounded shadow-lg transition-all duration-300"
        >
          Create Blog
        </Link>
      </div>

      {/* Sort Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-300">
          Sort by Date: {sortDate === "asc" ? "Ascending" : "Descending"}
        </p>

        <button
          onClick={handleSort}
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-6 py-2 rounded shadow-lg transition-all duration-300 cursor-pointer"
        >
          Sort
        </button>
      </div>

      {loading && <Skeleton />}

      {/* blogs cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <BlogCard blog={blog} key={blog.id} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default BlogList;
