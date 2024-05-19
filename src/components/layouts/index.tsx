import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { AiChat } from "@/components/ai-chat/AiChat";

export const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <AiChat />
    </div>
  );
};
