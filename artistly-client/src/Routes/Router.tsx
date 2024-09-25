import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import NotFound from "../Pages/NotFound/NotFound";
import Homepage from "../Pages/Homepage/Homepage";
import ProtectedRoute from "../utils/ProtectedRoute";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import AccountRequest from "../Pages/AccountRequest/AccountRequest";
import ClientPage from "../Pages/ClientPage/ClientPage";
import UserMgmt from "../Pages/ConfirmEmail";
import Contact from "../Pages/Contact/Contact";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Authenticate from "../Pages/Login/Authenticate";
import AccountSettings from "../Pages/Profile/AccountSettings/AccountSettings";
import Profile from "../Pages/Profile/Profile";
import Catalogue from "../Pages/Catalogue/Catalogue";
import { WishlistProvider } from "../Contexts/WishlistProvider";
import { CatalogueFilterProvider } from "../Contexts/CatalogueFilterContext";
import AuthorizedRoute from "../utils/AuthorizedRoute";
import React, { Suspense } from "react";
import LoadingScreen from "../Pages/LoadingScreen/LoadingScreen";
const AccountPages = React.lazy(
  () => import("../Pages/Profile/AccountPages/AccountPages")
);
const PageCreate = React.lazy(
  () => import("../Pages/Profile/PageCreate/PageCreate")
);
const Faq = React.lazy(() => import("../Pages/FAQ/Faq"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WishlistProvider>
        <Layout />
      </WishlistProvider>
    ),
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/catalogue",
        element: (
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <CatalogueFilterProvider>
              <Catalogue />
            </CatalogueFilterProvider>
          </QueryParamProvider>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AccountSettings />,
          },
          {
            path: "pages",
            element: (
              <AuthorizedRoute>
                <Suspense fallback={<LoadingScreen />}>
                  <AccountPages />
                </Suspense>
              </AuthorizedRoute>
            ),
          },
          {
            path: "pages/create",
            element: (
              <AuthorizedRoute>
                <Suspense fallback={<LoadingScreen />}>
                  <PageCreate />
                </Suspense>
              </AuthorizedRoute>
            ),
          },
        ],
      },
      {
        path: "/account-request",
        element: (
          <ProtectedRoute>
            <AccountRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Wishlist />
          </QueryParamProvider>
        ),
      },
      {
        path: "/:urlPath",
        element: (
          <ProtectedRoute>
            <ClientPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    index: true,
    element: <Authenticate />,
  },
  {
    path: "/usermgmt/*",
    element: <UserMgmt />,
    index: true,
  },
  {
    path: "/faq",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Faq />
      </Suspense>
    ),
    index: true,
  },
  { path: "*", index: true, element: <NotFound showLogo={true} /> },
]);
