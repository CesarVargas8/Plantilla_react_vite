import { createContext, useContext } from "react";

import { User } from "../models/user";

export type UserWithToken = User & { token: string };

export const userContext = createContext<UserWithToken>({} as UserWithToken);

export const useUser = () => useContext(userContext);

export const useAuth = () => useContext(userContext).token;
