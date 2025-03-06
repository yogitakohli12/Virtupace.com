import { Icon, IconButton, IconButtonProps, IconProps } from "@chakra-ui/react";
import React from "react";
type ButtonType = Omit<IconButtonProps, "aria-label" | "h" | "w">;
const PlayButton: React.FC<
  ButtonType & { iconSizing?: string; h?: string; w?: string }
> = ({ iconSizing = "28px", h = "98px", w = "98px", ...props }) => {
  return (
    <IconButton
      aria-label={"Play"}
      h={h}
      w={w}
      variant="unstyled"
      role="group"
      rounded="full"
      icon={
        <PlayIcon
          zIndex={2}
          position="relative"
          transition="transform 100ms ease-in"
          _groupHover={{ transform: "scale(1.2)" }}
          boxSize={iconSizing}
        />
      }
      color="white"
      _hover={{
        bg: "linear-gradient(90deg, #75e4ff 0%, #ffb7fe 65.5%)",
      }}
      _active={{
        bg: "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),linear-gradient(101.32deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 104.21%)",
      }}
      {...props}
    />
  );
};

export default PlayButton;

const PlayIcon: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M5.23334 5.49811C5.23334 3.84801 6.99847 2.79918 8.4475 3.58701L20.3974 10.0898C21.9112 10.9134 21.9112 13.0864 20.3974 13.91L8.4475 20.4118C6.99847 21.2006 5.23334 20.1508 5.23334 18.5017V5.49811Z"
      fill="currentColor"
    />
  </Icon>
);
