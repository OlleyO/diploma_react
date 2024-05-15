import React from "react";
import { supabase } from "@/api";
import type { Session } from "@supabase/supabase-js";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

export const SessionContext = React.createContext<Session | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, _session) => {
      console.log(_session);
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (_session) {
        setSession(_session);
      }

      if (!_session && !location.pathname.includes("auth")) {
        return navigate("/auth/login", { replace: true });
      }
    });

    if (location.pathname === "/") {
      navigate("/items/all");
    }

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [location.pathname]);

  return (
    <SessionContext.Provider value={session}>
      <Outlet />
    </SessionContext.Provider>
  );
};
