import { useDappStore } from "@/store/useDapp";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const CustomPlayer: React.FC<Props> = ({ isOpen, onClose }) => {
  const videoSrc = useDappStore((s) => s.videoSrc);
  return (
    <Modal isOpen={isOpen} size="full" onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="0" w="full" h="100vh" bg="rgba(0,0,0,0.3)">
        <ModalCloseButton top="8" right="8" color="#ffffff" fontSize={24} />
        <ModalBody
          h="full"
          w="100vw"
          display="flex"
          p="0"
          alignItems="center"
          justifyContent="center"
        >
          {videoSrc.includes("youtube.com") ? (
            <Box
              as="iframe"
              src={videoSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
              h={{ base: "300px", md: "400px", lg: "550px", xl: "600px" }}
              w={{ base: "full", md: "700px", xl: "900px" }}
            />
          ) : (
            <Box
              as="video"
              h={{ base: "300px", md: "400px", lg: "550px", xl: "600px" }}
              w={{ base: "full", md: "700px", xl: "900px" }}
              controls={false}
              playsInline
              src={videoSrc}
              loop
              autoPlay
            >
              <source src={videoSrc} type="video/mp4"></source>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomPlayer;
