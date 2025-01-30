import { Flex, Box } from "@chakra-ui/react";
import { UserForm } from "@/components/myConponent/form";
import { LoginImage } from "@/components/myConponent/loginImg";

export default function Home() {
  return (
    <Flex height="100vh" width="100vw">
      <LoginImage />

      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <UserForm />
      </Box>
    </Flex>
  );
}
