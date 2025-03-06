import LayoutContainer from "@/layout/Layout/LayoutContainer";
import { CrossIcon } from "@/data";
import { Box, BoxProps, Button, HStack, IconButton } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Stickybar: React.FC<BoxProps> = ({ children, ...rest }) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const t = useTranslations();
  useEffect(() => {
    setIsClosed(!!sessionStorage.getItem("isStickybarClosed"));
  }, []);
  if (isClosed) {
    return null;
  }
  const btnText = t("Buy now");
  return (
    <Box
      position="sticky"
      zIndex={10}
      w="full"
      bg="linear-gradient(268.8deg, #F96544 0%, #F93655 25.5%, #C548B9 57%, #8E49E9 88%)"
      {...rest}
    >
      <LayoutContainer
        py={{ base: "3", md: "4" }}
        as={HStack}
        gap={{ base: "4", md: "6" }}
        justifyContent="center"
        position="relative"
      >
        <Box w="fit-content">{children}</Box>
        <Button
          borderRadius="24px"
          bg="white"
          borderWidth="1px"
          borderStyle="solid"
          color="brand.black"
          border="none"
          minW="fit-content"
          fontSize={{
            base: btnText?.length > 10 ? "10px" : "sm",
            sm: "sm",
            md: "md",
          }}
          h={{ base: "30px", md: "8", lg: "10" }}
          px={{ base: "2", sm: "4", md: "6" }}
          _hover={{
            bg: "gray.50",
          }}
          as="a"
          href="#buy-now"
          _active={{ bg: "gray.50" }}
          textTransform={"capitalize"}
        >
          {btnText}
        </Button>
        <IconButton
          icon={<CrossIcon color="red" boxSize={{ base: "4", md: "5" }} />}
          aria-label="Close"
          position="absolute"
          top={{ base: "unset", lg: "0" }}
          right="0"
          bottom={{ base: "0", lg: "unset" }}
          transform={{ base: "translateY(50%)", lg: "translateY(-50%)" }}
          variant="unstyled"
          h={{ base: "6", md: "8" }}
          w={{ base: "6", md: "8" }}
          px="0"
          minW="fit-content"
          bg="gray.50"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            setIsClosed(true);
            sessionStorage.setItem("isStickybarClosed", "true");
          }}
          rounded="full"
        />
      </LayoutContainer>
    </Box>
  );
};

export default Stickybar;
