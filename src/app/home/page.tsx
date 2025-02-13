"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { User } from "@/types/user";
import { UserForm } from "@/components/myConponent/form";
import { LoginImage } from "@/components/myConponent/loginImg";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("allUsers");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    const storedCurrentUser = localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setCurrentUser(user);
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LoginImage />
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <UserForm
          currentUser={currentUser || undefined}
          onAddItem={handleLogin}
          setCurrentUser={setCurrentUser}
        />
      </Box>
    </div>
  );
}