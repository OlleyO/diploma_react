import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { redirect, useLocation } from "react-router-dom";

export const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};
