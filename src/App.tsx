import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogCreateEdit from "./pages/BlogCreateEdit";
import BlogDetail from "./pages/BlogDetail";
import { Bounce, ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogList />,
  },
  {
    path: "/create",
    element: <BlogCreateEdit mode="create" />,
  },
  {
    path: "/blog/:id/edit",
    element: <BlogCreateEdit mode="edit" />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
