import { createBrowserRouter } from "react-router-dom";
import { ProductPage } from "../ProductPage";
import { MainApp } from "../main";
import { loadFilterData, loadProductData } from "../../api/req";

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
