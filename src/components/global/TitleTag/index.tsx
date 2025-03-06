import { BoxProps, Box } from "@chakra-ui/react";
import React from "react";

const TitleTag: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      as="span"
      bg="#ffffff20"
      w="fit-content"
      borderRadius="20px"
      align="center"
      px="4"
      py="2"
      color="white"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default TitleTag;
