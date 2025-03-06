import { Icon, IconButton } from "@chakra-ui/react";
import { IoChatbubbleSharp } from "react-icons/io5";

export function SupportButton() {
  return (
    <IconButton
      pos={"fixed"}
      bottom={"20px"}
      right="20px"
      aria-label="support"
      as="a"
      href="https://5thscape.raiseaticket.com/support/#/newticket"
      target="_blank"
      color="#5348F4"
      bg="#ffffffaa"
      rounded={"full"}
      p="10px"
      h="auto"
      colorScheme=""
      icon={
        <Icon as={IoChatbubbleSharp} boxSize={{ base: "30px", md: "40px" }} />
      }
      zIndex={121212121}
      shadow={"lg"}
    />
  );
}
