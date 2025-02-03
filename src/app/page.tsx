"use client";

import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { User } from "@/types/user";
import { UserForm } from "@/components/myConponent/form";
import { LoginImage } from "@/components/myConponent/loginImg";
import { CalendarComponent } from "@/components/myConponent/calendar"

export default function Home() {
  const [list, setList] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  function updateList(newUser: User) {
    if (!newUser) {
      console.error("[ERROR]", "newUser not defined");
      return;
    }
    console.log("new user", newUser);
    setList((prevList) => {
      return [...prevList, { ...newUser }];
    });
    localStorage.setItem("all users", JSON.stringify(list));
    console.log("all users", list);
  }

  console.log(
    localStorage.getItem("all users") + "toma vagabunda pirocada de bandido"
  );

  return (
    <Flex height="100vh" width="100vw">
      <LoginImage />
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <UserForm
          currentUser={currentUser}
          onAddItem={updateList}
          setCurrentUser={setCurrentUser}
        />
      </Box>
      <h1>Meu Calendário</h1>
      <CalendarComponent />
    </Flex>
  );
}
