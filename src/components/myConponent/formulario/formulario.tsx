//import { UserForm } from "../form";
import { LoginImage } from "../loginImg";
import { Box } from "@chakra-ui/react";

export function Formulario() {
    return(
       <div style={{ display: "flex", height: "100vh" }}>
             <LoginImage />
             <Box flex="1" display="flex" alignItems="center" justifyContent="center">
               {/*<UserForm
                 {/*currentUser={currentUser || undefined}
                 onAddItem={handleLogin}
                 setCurrentUser={setCurrentUser}
               />*/}
             </Box>
           </div> 
    );
};