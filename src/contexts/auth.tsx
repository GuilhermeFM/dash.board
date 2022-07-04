import { createContext } from "react";

import { INav } from "../api/interfaces/INav";
import { IUser } from "../api/interfaces/IUser";

export interface AuthContextType {
  user: IUser | null;
  removeUser: () => void;
  addUser: (user: IUser) => void;
  reloadNav: (nav: INav[]) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
