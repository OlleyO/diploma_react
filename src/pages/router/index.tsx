import { createBrowserRouter, Outlet } from "react-router-dom";
import { ProductPage } from "../ProductPage";
import { MainApp } from "../main";
import { loadFilterData, loadProductData } from "@/api/req";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { AuthProvider } from "@/helpers/authProvide";
import { DefaultLayout } from "@/components/layouts";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    path: "/",
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "items",
            children: [
              {
                element: <MainApp />,
                path: ":name",
                loader: (params) => loadFilterData(params),
              },
            ],
          },
          {
            path: "product/:id",
            element: <ProductPage />,
            loader: (params) => loadProductData(params),
          },
        ],
      },
      {
        path: "auth",
        children: [
          { path: "login", element: <SignIn /> },
          { path: "signUp", element: <SignUp /> },
        ],
      },
    ],
  },
]);

export default router;
