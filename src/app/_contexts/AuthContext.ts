import { User } from "@prisma/client";
import { createContext, useContext } from "react";

interface AuthContextProps {
  profile?: User | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
