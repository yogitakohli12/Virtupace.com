import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";
import React from "react";

export type ButtonVariant = "link" | "solid" | "light";
interface CustomButtonProps extends ButtonProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "solid",
  ...rest
}) => {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const buttonStyle: { [key in ButtonVariant]: Partial<ButtonProps> } = {
    link: {
      h: "fit-content",
      py: "0",
      w: "fit-content",
      variant: "unstyled",
      fontSize: "md",
      color: isLight ? "#14141470" : "#DDDDDD90",
      fontWeight: "semibold",
      cursor: "pointer",
      _hover: {
        color: "blue.400",
      },
    },
    light: {
      h: "14",
      px: "12",
      py: "6",
      w: "fit-content",
      bg: "white",
      _hover: {
        bg: "gray.200",
      },
      _active: {
        bg: "gray.200",
      },
      fontSize: "md",
      color: isLight ? "#222222" : "#EAEAEA",
      rounded: "full",
      fontWeight: "bold",
      cursor: "pointer",
    },
    solid: {
      h: "14",
      px: "12",
      py: "6",
      w: "fit-content",
      bgGradient:
        "linear-gradient(269.58deg, #F96544 0%, #F93655 25.5%, #C548B9 57%, #8E49E9 88%)",
      _hover: {
        bgGradient:
          "linear-gradient(269.58deg, #F96544 0%, #F93655 25.5%, #C548B9 57%, #8E49E9 88%)",
      },
      _active: {
        bgGradient:
          "linear-gradient(269.58deg, #F96544 0%, #F93655 25.5%, #C548B9 57%, #8E49E9 88%)",
      },
      fontSize: "md",
      color: "#E8E7F6",
      rounded: "full",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
  return (
    <Button {...buttonStyle[variant]} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;
