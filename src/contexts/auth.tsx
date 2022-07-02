import { createContext } from "react";

import { IUser } from "../api/interfaces/IUser";

export interface AuthContextType {
  user: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
