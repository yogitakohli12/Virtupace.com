import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

const LayoutContainer: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Box
      as="section"
      maxW={{ base: "1200px", xl: "1440px" }}
      px={{ base: "0.5rem", md: "1.5rem", lg: "2rem" }}
      py={{ base: "1rem", md: "1.5rem" }}
      marginX="auto"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default LayoutContainer;
