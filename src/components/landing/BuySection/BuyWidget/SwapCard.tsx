import { Box, Flex, Stack, StackProps, Text } from "@chakra-ui/react";
import type * as CSS from "csstype";
import type { ResponsiveValue } from "@chakra-ui/react";
import React from "react";

const SwapCard: React.FC<
  StackProps & {
    primary: string | JSX.Element;
    secondary?: string;
    children?: React.ReactNode;
    main?: string;
    placement?: ResponsiveValue<CSS.Property.TextAlign> | undefined;
  }
> = ({ primary, secondary, children, main, placement = "left", ...rest }) => {
  return (
    <Stack
      py={{ base: "2", md: "3", lg: "5" }}
      px="4"
      bg="#ffffff10"
      rounded="16px"
      {...rest}
    >
      <Flex justify="space-between" w="full" align="center">
        <Text
          textTransform="uppercase"
          color="white"
          fontSize="sm"
          fontWeight="medium"
          opacity="0.8"
          textAlign={placement}
          lineHeight="130%"
          whiteSpace="nowrap"
        >
          {primary}
        </Text>
        <Text
          w="full"
          whiteSpace="nowrap"
          opacity="0.8"
          color="white"
          fontSize="sm"
          fontWeight="medium"
          textAlign={placement}
          lineHeight="130%"
          h="4"
          display={{ base: !!secondary ? "unset" : "none", md: "block" }}
        >
          {secondary || ""}
        </Text>
      </Flex>
      {!!main && (
        <Text
          textAlign={placement}
          textTransform={"uppercase"}
          fontSize="lg"
          mt={{ base: "0", md: "3" }}
          fontWeight="normal"
        >
          {main}
        </Text>
      )}
      {children}
    </Stack>
  );
};

export default SwapCard;
