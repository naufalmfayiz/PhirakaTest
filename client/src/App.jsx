import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/MainLayout";
import UpdatePage from "./pages/UpdatePage";
import FibonacciTable from "./pages/FibonacciPage";

const router = createBrowserRouter([
  {
    path: "/fibonacci",
    element: <FibonacciTable />,
  },
  {
    path: "/login",
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
    element: <LoginPage />,
  },
  {
    path: "/register",
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
    element: <RegisterPage />,
  },
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/update/:id",
        element: <UpdatePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
