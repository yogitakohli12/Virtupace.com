import { Button, ButtonProps } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";

const BuyButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const t = useTranslations();
  return (
    <Button
      h="14"
      px="12"
      py="6"
      w="full"
      bg="#0DEC96"
      _hover={{
        bgGradient: "#0DEC96CC",
      }}
      _active={{
        bgGradient: "#0DEC96CC",
      }}
      fontSize={{ base: "md", lg: "lg" }}
      color="black"
      rounded="full"
      fontWeight="bold"
      cursor="pointer"
      {...rest}
    >
      {children || t("Buy")}
    </Button>
  );
};

export default BuyButton;
