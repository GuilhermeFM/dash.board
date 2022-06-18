import { useState } from "react";

import { AuthContext } from "../contexts/auth";

import { IUser } from "../api/interfaces/IUser";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
}
