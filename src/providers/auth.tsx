import { useCallback, useState } from "react";

import { AuthContext } from "../contexts/auth";

import { IUser } from "../api/interfaces/IUser";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<IUser | null>(() => {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
      return;
    }

    return JSON.parse(userJson);
  });

  const addUser = useCallback((user: IUser) => {
    if (!user) {
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const removeUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}
