import {
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import Signin from "./Signin";
import Signup from "./Signup";

const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  isClosable?: boolean;
  canBack?: boolean;
  isSignup?: boolean;
}> = ({
  isOpen,
  onClose,
  isClosable = true,
  canBack = false,
  isSignup = false,
}) => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      if (canBack) toast.dismiss();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setIsRegister(isSignup);
  }, [isSignup]);
  return (
    <Modal
      size="lg"
      isCentered
      isOpen={isOpen}
      onClose={isClosable ? onClose : () => {}}
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent
        bg="#0E0C10"
        border="1px solid rgba(255, 255, 255, 0.24)"
        borderWidth="1px"
        overflow="hidden"
      >
        <ModalHeader>
          {canBack && (
            <>
              <Button
                type="button"
                variant="link"
                color="white"
                _hover={{ textDecor: "none" }}
                leftIcon={<BsArrowLeft />}
                onClick={() => {
                  router.push("/");
                  toast.loading("Redirecting to home...", {
                    duration: Infinity,
                  });
                }}
              >
                Go back
              </Button>
              <br />
              <br />
            </>
          )}
          {isRegister
            ? "Signup to join Meta Droom"
            : "Signin in to your account"}
        </ModalHeader>
        {isClosable && <ModalCloseButton color="white" />}
        <Divider bg="#212024" />
        <ModalBody bg="transparent" px={"6"}>
          {isRegister ? (
            <Signup onSuccess={isClosable ? onClose : () => {}} />
          ) : (
            <Signin onSuccess={isClosable ? onClose : () => {}} />
          )}
          <Box my="6">
            <HStack>
              <Text>
                {isRegister
                  ? "Already have an account ?"
                  : "Don't have an account ?"}
              </Text>{" "}
              <Button
                variant="link"
                type="button"
                color="blue.500"
                onClick={() => setIsRegister(!isRegister)}
                textDecor="underline"
                _hover={{ color: "blue.300" }}
                _active={{ color: "blue.300" }}
              >
                {isRegister ? "Signin" : "Signup"}
              </Button>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
