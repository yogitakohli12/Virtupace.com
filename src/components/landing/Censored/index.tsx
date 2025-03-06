import { Box } from "@chakra-ui/react";
import React from "react";

const Censored = () => {
  return (
    <Box bg="#06001d" py={{ base: "8", sm: "10", md: "14" }}>
      <Box
        h={{ base: "40px", sm: "60px", md: "80px", lg: "100px", xl: "122px" }}
        bg="url(/image/censored)"
        bgRepeat="repeat-x"
        w="full"
        bgSize="contain"
        bgPosition=""
      />
    </Box>
  );
};

export default Censored;
