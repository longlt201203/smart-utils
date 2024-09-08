import { User } from "@prisma/client";
import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext from "../_contexts/AuthContext";
import { authenticated } from "../_actions/auth";

export default function AuthProvider({ children }: PropsWithChildren) {
  //   const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);

  const fetchProfile = async () => {
    const profile = await authenticated();
    setProfile(profile);
  };

  useEffect(() => {
    fetchProfile();
    // setIsLoaded(true);
  }, []);

  //   useEffect(() => {
  //     if (isLoaded) {
  //       fetchProfile();
  //     }
  //   }, [isLoaded]);

  return (
    <AuthContext.Provider value={{ profile }}>{children}</AuthContext.Provider>
  );
}
