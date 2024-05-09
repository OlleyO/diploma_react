import React from "react";
import { RouterProvider } from "react-router-dom";
// @ts-ignore
import { NotificationContainer } from "react-notifications";

import "./App.css";
import router from "./pages/router";

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
