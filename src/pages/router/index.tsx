import { createBrowserRouter } from "react-router-dom";
import { loadFilterData, loadProductData } from "../../api/req";
import { ProductPage } from "../ProductPage";
import { MainApp } from "../main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    loader: (params) => loadFilterData(params),
  },
  {
    path: "/:name",
    element: <MainApp />,
    loader: (params) => loadFilterData(params),
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
    loader: (params) => loadProductData(params),
  },
]);

export default router;
