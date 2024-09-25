import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/Homepage/Homepage";
import Users from "./Pages/Users/Users";
import Partners from "./Pages/Partners/Partners";
import Pages from "./Pages/PartnerPages/Pages";
import Reviews from "./Pages/Reviews/Reviews";
import Banners from "./Pages/Banners/Banners";
import Promos from "./Pages/Promos/Promos";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Utils/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/partners",
        element: <Partners />,
      },
      {
        path: "/pages",
        element: <Pages />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/banners",
        element: <Banners />,
      },
      {
        path: "/promos",
        element: <Promos />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
