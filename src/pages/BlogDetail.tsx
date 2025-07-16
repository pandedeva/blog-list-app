import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Blog } from "../types/Blog";
import { deleteBlog, fetchOneBlog } from "../api/blogApi";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import BlogDetailSkeleton from "../components/BlogDetailSkeleton";
import Modal from "../components/Modal";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getBlog = async () => {
      try {
        if (id) {
          const data = await fetchOneBlog(id);
          setBlog(data);
        }
      } catch (error) {
        toast.error("Failed to fetch blog");
        console.log("error ", error);
        navigate("/");
      }
    };

    getBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteBlog(id);
        toast.success("Blog deleted successfully");
        navigate("/");
      } catch (error) {
        setIsModalOpen(false);
        toast.error("Failed to delete blog");
        console.log("error ", error);
      }
    }
  };

  return (
    <>
      <Layout>
        {/* header navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            className="bg-[#F28705] hover:bg-[#F28705]/90 font-bold py-2 px-4 rounded text-slate-900 transition duration-300 ease-in-out shadow cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back to Blog List
          </button>

          <h1 className="text-2xl text-[#F28705] font-bold border-b-2 border-gray-700 pb-2">
            Blog Detail
          </h1>
        </div>

        {/* blog content */}
        {blog ? (
          <>
            <div className="bg-neutral-700 text-gray-300 rounded shadow-md p-6">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
              <h1 className="text-3xl font-bold text-gray-100 mb-4">
                {blog.title}
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {blog.description}
              </p>
            </div>

            <div
              className="flex gap-4 mt-6"
              onClick={() => navigate(`/blog/${id}/edit`)}
            >
              <button className="bg-green-700 hover:bg-green-700/90 text-gray-100 font-medium px-4 py-2 rounded shadow transition duration-300 ease-in-out cursor-pointer">
                Edit
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-700 hover:bg-red-700/90 text-gray-100 font-medium px-4 py-2 rounded shadow transition duration-300 ease-in-out cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <BlogDetailSkeleton />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Blog"
          desciption="Are you sure you want to delete this blog?"
        />
      </Layout>
    </>
  );
};

export default BlogDetail;
