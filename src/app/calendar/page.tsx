"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { MyCalendar } from "@/components/myConponent/myCalendar/myCalendar";
import { Rating } from "@/components/ui/rating"
import { User } from "@/types/user";

export default function CalendarPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const handleLogout = () => {
    console.log(currentUser?.email)
    router.push("/home");
  };

  return (
    <Box padding={5}>
      <Button onClick={handleLogout} backgroundColor={"black"} mb={4} padding={"10px"} color={"white"} borderRadius={"10px"}>
        Logout
      </Button>
      {currentUser && <MyCalendar />}
      <Rating allowHalf defaultValue={3.5} colorPalette="orange" display={"flex"} justifyContent={"center"}/>
    </Box>
  );
}