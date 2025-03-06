import useCheckEmailExistsForWallet from "@/hooks/useCheckEmailExistsForWallet";
import useRegister from "@/hooks/useRegister";
import { emailRegex } from "@/utils/regex";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const SuccessModal: React.FC<{
  revenue: number | string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ revenue, isOpen, onClose }) => {
  const { address } = useAccount();
  const { data } = useCheckEmailExistsForWallet(address?.toLowerCase());
  const [isConversion, setIsConversion] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      setIsConversion(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isConversion) {
      setTimeout(() => {
        setIsConversion(false);
      }, 5000);
    }
  }, [isConversion]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { mutateAsync, isLoading } = useRegister();

  const onSubmit = async (values: FieldValues) => {
    const { name, email } = values;
    try {
      await mutateAsync({
        name,
        email,
        wallet_address: address?.toLowerCase(),
      });
      toast.success("Success. Thank you for joining us.", {
        duration: 5000,
      });
      reset();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (e) {
      toast.error("Something went wrong. Please try again.", {
        duration: 3000,
      });
    }
  };
  const isUserExists = data && data.exists;
  return (
    <>
      {isConversion && (
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            type="text/javascript"
            src="https://rajsharma.iljmp.com/improvely.js"
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          improvely.init('rajsharma', 4);
improvely.conversion({
	goal: 'sale',    
	revenue: ${revenue},
	reference: '1160'
})
          `,
            }}
          />
        </Head>
      )}
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        {!isUserExists && <ModalOverlay backdropFilter="blur(2px)" />}
        <ModalContent
          {...(!isUserExists
            ? {
                bg: "#0E0C10",
                border: "1px solid rgba(255, 255, 255, 0.24)",
                borderWidth: "1px",
                overflow: "hidden",
              }
            : {
                bg: "transparent",
                p: "0",
              })}
        >
          {!isUserExists && (
            <>
              <ModalHeader>Purchase Success</ModalHeader>
              <ModalCloseButton color="white" />
              <Divider bg="#212024" />
            </>
          )}
          <ModalBody
            bg="transparent"
            h="fit-content"
            w="fit-content"
            px={isUserExists ? "0" : "6"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {isConversion && (
              <img
                className="hidden"
                src={`https://d.adroll.com/ipixel/PYWNVMQRD5DINDQZCLH4FI/CKLVJRUHPVHDJPG4YUO3WV?name=c2dcd5a0&conversion_value=${revenue}&currency=USD`}
                width="1"
                height="1"
                alt="pixel img"
              />
            )}
            {!isUserExists && (
              <Box my="6">
                <Text color="white" fontSize="lg">
                  {
                    "Congrats 🎉, Let's complete your profile so you don't miss critical project updates & listing announcements."
                  }
                </Text>
                <Box mt="6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                      <InputGroup>
                        <Input
                          h="56px"
                          borderRadius="full"
                          border="1px solid #ffffff26"
                          bg="#2f32417f"
                          color="#fff"
                          fontWeight="medium"
                          type="text"
                          fontSize="lg"
                          appearance="none"
                          w="full"
                          placeholder={"Enter your name"}
                          {...register("name")}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl mt="6" isInvalid={!!errors["email"]}>
                      <Input
                        h="56px"
                        borderRadius="full"
                        border="1px solid #ffffff26"
                        bg="#2f32417f"
                        color="#fff"
                        fontWeight="medium"
                        type="text"
                        fontSize="lg"
                        appearance="none"
                        w="full"
                        placeholder={"Enter your email address"}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: emailRegex,
                            message: "Invalid email",
                          },
                        })}
                      />
                      {/* <FormErrorMessage>
                        {errors["email"] && <>{errors["email"]?.message}</>}
                      </FormErrorMessage> */}
                    </FormControl>
                    <Button
                      mt="10"
                      h={{ base: "48px", md: "56px" }}
                      bgGradient="linear-gradient(225deg, #F96544 0%, #F93655 25.5%, #C548B9 57%, #8E49E9 88%)"
                      _hover={{
                        bgGradient:
                          "linear-gradient(225deg, #8E49E9 88%, #C548B9 57% #F93655 25.5%, , #F96544 0%)",
                      }}
                      _active={{
                        bgGradient:
                          "linear-gradient(225deg, #8E49E9 88%, #C548B9 57% #F93655 25.5%, , #F96544 0%)",
                      }}
                      px={{ base: "4", sm: "6", md: "8", lg: "12" }}
                      fontSize={{ base: "sm", md: "md", lg: "lg" }}
                      color="#E8E7F6"
                      rounded="full"
                      fontWeight="bold"
                      cursor="pointer"
                      _disabled={{
                        cursor: "not-allowed",
                        bg: "gray.50",
                        color: "brand.black",
                      }}
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      type="submit"
                      w="full"
                    >
                      {isLoading ? "Please wait" : "Submit"}
                    </Button>
                  </form>
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;
