"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { MyCalendar } from "@/components/myConponent/myCalendar/myCalendar";
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
    localStorage.removeItem("currentUser");
    router.push("/home");
  };

  return (
    <Box padding={5}>
      <Button onClick={handleLogout} colorScheme="red" mb={4} padding={"10px"}>
        Logout
      </Button>
      {currentUser && <MyCalendar currentUser={currentUser} />}
    </Box>
  );
}