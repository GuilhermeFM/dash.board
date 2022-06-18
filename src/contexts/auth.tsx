import { createContext } from "react";

import { IUser } from "../api/interfaces/IUser";

export interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
