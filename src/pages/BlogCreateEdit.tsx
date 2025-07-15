import { useParams } from "react-router-dom";

type Props = {
  mode: "create" | "edit";
};

const BlogCreateEdit = ({ mode }: Props) => {
  const { id } = useParams();

  return (
    <div>
      ini halaman
      {mode === "create" ? "create" : `edit ${id}`}
    </div>
  );
};

export default BlogCreateEdit;
