import { GoogleIcon } from "@/data";
import {
  auth,
  AUTH_ERRORS,
  AUTH_METHOD,
  useFirebaseSignIn,
  userAtom,
} from "@/hooks/firebase";
import { campaign } from "@/hooks/useCampaignManager";
import useLogin from "@/hooks/useLogin";
import useRegisterUser from "@/hooks/useRegisterUser";
import { emailRegex } from "@/utils/regex";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../FormElements/InputField";
import { queryClient } from "@/utils/queryClient";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import useGetInfo from "@/hooks/useGetInfo";
import { useMaincontext } from "@/context/main";

const Signin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const method = useForm({ mode: "onBlur" });
  const { handleSubmit } = method;
  const { setUser } = useMaincontext();
  const { mutateAsync: registerUser, isLoading: isPending3 } =
    useRegisterUser();
  const { data: info } = useGetInfo();
  const { mutateAsync: login, isLoading: isPending1 } = useLogin();
  const [user] = useAtom(userAtom);
  const [isLoadingEmailPassword, setIsLoadingEmailPassword] = useState(false);
  const { mutate: signIn, isLoading: isPending2 } = useFirebaseSignIn();
  async function onSubmit({ email, password }: FieldValues) {
    setIsLoadingEmailPassword(true);
    signIn(
      {
        type: AUTH_METHOD.EMAIL_SIGNIN,
        email,
        password,
      },
      {
        onError(e: any) {
          toast.dismiss();
          toast.error(AUTH_ERRORS[e.code] || "Error occured.", {
            duration: 3000,
          });
        },
        onSuccess: async () => {
          toast.dismiss();
          const res = await login({
            userType: "Manual",
          });
          if (res.user_exists) {
            localStorage.setItem("token", res?.data?.token);
            setUser(res?.data);
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            onSuccess();
            setTimeout(() => {
              const default_wallet = user?.wallet_address;
              campaign.logAction({
                action: "VISIT",
                isCompleted: true,
                ref: default_wallet,
                wallet_address: default_wallet,
              });
              trackFBConversion({
                event_type: EventType.CompleteRegistration,
                email: default_wallet?.toLowerCase() || "",
                country: info?.name || "",
              });
            }, 7000);
            return toast.success("Logged in successfully.", {
              duration: 5000,
            });
          } else {
            return toast.error(
              "User with the email doesn't exists. Please signup first."
            );
          }
          onSuccess();
        },
        onSettled: () => setIsLoadingEmailPassword(false),
      }
    );
  }
  const isLoading = isPending1 || isPending2 || isPending3;
  const handleGoogleSignin = async () => {
    signIn(
      { type: AUTH_METHOD.GOOGLE_SIGNIN },
      {
        onError(e: any) {
          toast.error(AUTH_ERRORS[e.code] || "Error occured.");
        },
        onSuccess: async () => {
          try {
            const res = await login({
              userType: "Manual",
            });
            if (res.user_exists) {
              localStorage.setItem("token", res?.data?.token);
              setUser(res?.data);
              queryClient.invalidateQueries({ queryKey: ["user-profile"] });
              onSuccess();
              setTimeout(() => {
                const default_wallet = user?.wallet_address;
                campaign.logAction({
                  action: "VISIT",
                  isCompleted: true,
                  ref: default_wallet,
                  wallet_address: default_wallet,
                });
                trackFBConversion({
                  event_type: EventType.CompleteRegistration,
                  email: default_wallet?.toLowerCase() || "",
                  country: info?.name || "",
                });
              }, 7000);
              return toast.success("Logged in successfully.", {
                duration: 5000,
              });
            } else {
              const res = await registerUser({
                userType: "Manual",
              });
              localStorage.setItem("token", res?.data?.token);
              queryClient.invalidateQueries({ queryKey: ["user-profile"] });
              setUser({
                ...res.data,
                wallet_address: res?.data?.wallet_address?.wallet_address,
              });
              onSuccess();
              setTimeout(() => {
                campaign.logAction({
                  action: "VISIT",
                  isCompleted: true,
                  ref: res?.data?.wallet_address?.wallet_address,
                  wallet_address: res?.data?.wallet_address?.wallet_address,
                });
                trackFBConversion({
                  event_type: EventType.CompleteRegistration,
                  email:
                    res?.data?.wallet_address?.wallet_address?.toLowerCase() ||
                    "",
                  country: info?.name || "",
                });
              }, 7000);
              return toast.success("Logged in successfully.", {
                duration: 5000,
              });
            }
          } catch (e: any) {
            if (e.response.status === 404) {
              const res = await registerUser({
                userType: "Manual",
              });
              setTimeout(() => {
                campaign.logAction({
                  action: "VISIT",
                  isCompleted: true,
                  ref: res?.data?.wallet_address?.wallet_address,
                  wallet_address: res?.data?.wallet_address?.wallet_address,
                });
                trackFBConversion({
                  event_type: EventType.CompleteRegistration,
                  email:
                    res?.data?.wallet_address?.wallet_address?.toLowerCase() ||
                    "",
                  country: info?.name || "",
                });
              }, 7000);
              queryClient.invalidateQueries({ queryKey: ["user-profile"] });
              toast.success("Logged in successfully.", {
                duration: 3000,
              });
              onSuccess();
            } else {
              toast.error(
                e.response?.data?.message ||
                  "Internal server error. Please try again later."
              );
            }
          }
        },
      }
    );
  };
  return (
    <Box my="6">
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            name="email"
            type="text"
            tag="*"
            autoFocus
            placeholder="Enter email"
            registerOptions={{
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Invalid email",
              },
            }}
          />
          <InputField
            tag="*"
            type="password"
            name="password"
            label="Password"
            formControlProps={{ mt: "6" }}
            placeholder="Enter password"
            registerOptions={{
              min: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
              required: "Password is required",
            }}
          />
          <Button
            mt="8"
            h={{ base: "48px", md: "56px" }}
            bg="#0DEC96"
            _hover={{
              bg: "#0DEC96CC",
            }}
            _active={{
              bg: "#0DEC96CC",
            }}
            px={{ base: "4", sm: "6", md: "8", lg: "12" }}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            color="black"
            rounded="full"
            fontWeight="semibold"
            cursor="pointer"
            _disabled={{
              cursor: "not-allowed",
              bg: "gray.50",
              color: "brand.black",
            }}
            isDisabled={isLoadingEmailPassword}
            isLoading={isLoadingEmailPassword}
            type="submit"
            w="full"
          >
            {isLoadingEmailPassword ? "Please wait" : "Submit"}
          </Button>
        </form>
      </FormProvider>
      <Box mt="6">
        <HStack>
          <Box flex="1" h="1px" bg="#eeeeee50"></Box>
          <Text as="span">OR</Text>
          <Box flex="1" h="1px" bg="#eeeeee50"></Box>
        </HStack>
        <Button
          mt="6"
          h={{ base: "48px", md: "56px" }}
          bg="white"
          _hover={{
            bg: "gray.100",
          }}
          _active={{
            bgt: "gray.100",
          }}
          px={{ base: "4", sm: "6", md: "8", lg: "12" }}
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          color="#222222"
          rounded="full"
          fontWeight="semibold"
          cursor="pointer"
          type="button"
          _disabled={{
            cursor: "not-allowed",
            bg: "gray.50",
            color: "brand.black",
          }}
          onClick={handleGoogleSignin}
          isLoading={!isLoadingEmailPassword && isLoading}
          isDisabled={!isLoadingEmailPassword && isLoading}
          leftIcon={<GoogleIcon boxSize="20px" />}
          w="full"
        >
          Signin with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Signin;
