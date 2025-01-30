"use client"

import { Box, Image, useBreakpointValue } from "@chakra-ui/react";

export const LoginImage = () => {
    const showImage = useBreakpointValue({ base: false, md: true });

    if (!showImage) return null;
  
    return (
      <Box flex="1" height="100vh">
        <Image
          src="/onda.jpg"
          alt="Olha a onda"
          objectFit="cover"
          width="100%"
          height="100%"
          className="loginImage"
          
        />
      </Box>
    );
  };
