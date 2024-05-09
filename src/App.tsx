import React from "react";
import { RouterProvider } from "react-router-dom";
// @ts-ignore
import { NotificationContainer } from "react-notifications";

import { AuthProvide } from "./helpers/authProvide";

import "./App.css";
import router from "./pages/router";
import { Header } from "./components/header";

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <AuthProvide>
        <Header />
        <RouterProvider router={router} />
      </AuthProvide>
    </div>
  );
}

export default App;
