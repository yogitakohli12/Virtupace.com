import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Plyr from "plyr-react";
import type { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import React, { useEffect, useRef } from "react";

const VideoPreview: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  src: string;
}> = ({ isOpen, onClose, src }) => {
  const plyrRef = useRef<APITypes>(null);

  const handleReady = () => {
    setTimeout(() => {
      plyrRef?.current?.plyr?.play();
    }, 100);
  };
  let source: any = {
    src,
    provider: "youtube",
  };
  if (src.includes("https://")) {
    source = {
      src,
    };
  }
  if (!src) return null;
  return (
    <Modal size="4xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m="0" p="0">
        <ModalBody bg="black" p="0">
          <Plyr
            ref={plyrRef}
            onLoadStart={handleReady}
            source={{
              type: "video",
              sources: [source],
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoPreview;
