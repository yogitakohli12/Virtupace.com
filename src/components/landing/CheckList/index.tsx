import { CheckCircleIcon } from "@/data";
import { Box, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import React from "react";

const CheckList: React.FC<StackProps & { checklist: string[] }> = ({
  checklist,
  ...rest
}) => {
  return (
    <VStack {...rest}>
      {checklist.map((item) => (
        <CheckListItem key={item} label={item} />
      ))}
    </VStack>
  );
};

export default CheckList;

const CheckListItem: React.FC<{ label: string }> = ({ label }) => (
  <HStack
    w="full"
    py={{ base: "3", md: "4" }}
    px="6"
    rounded="16px"
    spacing="4"
    border="1px solid rgba(255, 255, 255, 0.4)"
    bg="linear-gradient(100deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 125.39%),linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))"
  >
    <Box w="6">
      <CheckCircleIcon boxSize="6" />
    </Box>
    <Text color="brand.black" fontWeight="bold">
      {label}
    </Text>
  </HStack>
);
