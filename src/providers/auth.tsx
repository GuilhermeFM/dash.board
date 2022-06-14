import { useCallback, useState } from "react";

import AuthContext, { User } from "../contexts/auth";

import api from "../api";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User>({} as User);

  const authenticate = useCallback(
    async (username: string, password: string) => {
      try {
        const { data: user } = await api.get<User>("/authenticate");
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const deauthenticate = useCallback(() => setUser({} as User), []);

  return (
    <AuthContext.Provider value={{ user, authenticate, deauthenticate }}>
      {children}
    </AuthContext.Provider>
  );
}
