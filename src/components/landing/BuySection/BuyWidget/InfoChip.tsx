import { HStack, Text } from "@chakra-ui/react";

const InfoChip: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => (
  <HStack
    bg="#212024"
    h="38px"
    w="full"
    borderRadius="20px"
    align="center"
    px="4"
    spacing="3"
    justify="center"
  >
    <Text
      color="white"
      fontWeight="medium"
      fontSize="sm"
      as="span"
      textTransform="uppercase"
    >
      {label}
    </Text>
    {children}
  </HStack>
);

export default InfoChip;
