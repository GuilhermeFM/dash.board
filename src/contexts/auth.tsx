import { createContext } from "react";

export interface User {
  token: string;
}

export interface AuthContextType {
  user: User;
  deauthenticate: () => void;
  authenticate: (username: string, password: string) => Promise<void>;
}

export default createContext<AuthContextType>({} as AuthContextType);
