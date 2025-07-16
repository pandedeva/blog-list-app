import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { blogSchema } from "../utils/validation";
import type { Blog } from "../types/Blog";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { uuidv4 } from "zod";
import { createBlog } from "../api/blogApi";
import { toast } from "react-toastify";

type Props = {
  mode: "create" | "edit";
};

const BlogCreateEdit = ({ mode }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Blog>({ resolver: zodResolver(blogSchema) });

  useEffect(() => {
    // todo untuk edit
  }, []);

  const onSubmit = async (data: Blog) => {
    try {
      if (mode === "create") {
        const newBlog = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        await createBlog(newBlog);
        navigate("/");
        toast.success("Blog created successfully");
      }
    } catch (error) {
      toast.error("Failed to create blog");
      console.log("error ", error);
      throw new Error("Failed to create blog");
    }
  };

  return (
    <>
      <Layout>
        <h1 className="text-3xl font-bold text-[#F28705] mb-6  border-b-2 border-gray-700 pb-2">
          {mode === "create" ? "Create Blog" : "Edit Blog"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-1/2 mx-auto"
        >
          {/* title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full bg-neutral-700 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-[#F28705]"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Desciption */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Desciption
            </label>
            <input
              type="text"
              {...register("description")}
              className="w-full bg-neutral-700 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-[#F28705]"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="text"
              {...register("image")}
              className="w-full bg-neutral-700 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-[#F28705]"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="bg-[#F28705] text-gray-900 px-6 py-2 rounded font-semibold cursor-pointer hover:bg-[#F28705]/80 transition duration-300 mt-2 w-1/5 self-end"
          >
            {mode === "create" ? "Create" : "Save Changes"}
          </button>
        </form>
      </Layout>
    </>
  );
};

export default BlogCreateEdit;
