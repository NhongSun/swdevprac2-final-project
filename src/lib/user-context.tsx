"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockUsers } from "./mock-data";
import type { User, UserRole } from "./types";

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUsers[0]); // Default to first member

  const switchRole = (role: UserRole) => {
    const newUser = mockUsers.find((u) => u.role === role) || mockUsers[0];
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser, switchRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
