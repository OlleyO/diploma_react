import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";

export const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};
