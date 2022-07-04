import { useCallback, useState } from "react";

import { AuthContext } from "../contexts/auth";
import { IUser } from "../api/interfaces/IUser";
import { INav } from "../api/interfaces/INav";

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

  const reloadNav = useCallback((nav: INav[]) => {
    let userJson = localStorage.getItem("user");

    if (!userJson) {
      return;
    }

    const userObject: IUser = JSON.parse(userJson);

    userObject.nav = [...nav];

    userJson = JSON.stringify(userObject);

    localStorage.setItem("user", userJson);

    setUser(userObject);
  }, []);

  return (
    <AuthContext.Provider value={{ user, addUser, removeUser, reloadNav }}>
      {children}
    </AuthContext.Provider>
  );
}
