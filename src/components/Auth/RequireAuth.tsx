import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
