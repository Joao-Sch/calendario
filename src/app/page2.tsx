import { Button } from "@chakra-ui/react";

export const Calendar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div>
      <h1>Bem-vindo ao Dashboard!</h1>
      <Button colorScheme="red" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};
