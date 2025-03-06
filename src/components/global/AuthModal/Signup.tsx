import { GoogleIcon } from "@/data";
import {
  auth,
  AUTH_ERRORS,
  AUTH_METHOD,
  useFirebaseSignIn,
} from "@/hooks/firebase";
import { campaign } from "@/hooks/useCampaignManager";
import useRegisterUser from "@/hooks/useRegisterUser";
import { emailRegex } from "@/utils/regex";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../FormElements/InputField";
import { queryClient } from "@/utils/queryClient";
import { useMaincontext } from "@/context/main";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import useGetInfo from "@/hooks/useGetInfo";

const Signup: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const method = useForm({ mode: "all" });
  const { mutateAsync: registerUser, isLoading: isPending1 } =
    useRegisterUser();
  const { setUser } = useMaincontext();
  const { handleSubmit, watch } = method;
  const { data: info } = useGetInfo();
  const { mutate: signUp, isLoading: isPending2 } = useFirebaseSignIn();
  const isLoading = isPending1 || isPending2;
  async function onSubmit({ email, password, full_name }: FieldValues) {
    signUp(
      {
        type: AUTH_METHOD.EMAIL_REGISTER,
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
          try {
            toast.dismiss();
            toast.loading("Registering user...", { duration: Infinity });
            const [firstName, lastName] = full_name.split(" ");
            const res = await registerUser({
              firstName: firstName || "",
              lastName: lastName || "",
              email,
              password,
              userType: "Manual",
            });
            setUser({
              ...res.data,
              wallet_address: res?.data?.wallet_address?.wallet_address,
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
            toast.dismiss();
            toast.success("Signup Success", { duration: 2000 });
            onSuccess();
          } catch (e: any) {
            toast.dismiss();
            toast.error(e?.response?.data?.message || "Error occured.", {
              duration: 3000,
            });
          }
        },
      }
    );
  }
  const handleGoogleSignup = async () => {
    signUp(
      { type: AUTH_METHOD.GOOGLE_SIGNIN },
      {
        onError(e: any) {
          toast.error(AUTH_ERRORS[e.code] || "Error occured.");
        },
        onSuccess: async () => {
          toast.dismiss();
          try {
            toast.loading("Registering user...", { duration: Infinity });
            const res = await registerUser({
              userType: "Manual",
            });
            if (!res.status) {
              toast.dismiss();
              toast.error(res?.error || "User with email already exists.", {
                duration: 3000,
              });
              return;
            }
            localStorage.setItem("token", res?.data?.token);
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            setUser({
              ...res.data,
              wallet_address: res?.data?.wallet_address?.wallet_address,
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
            toast.dismiss();
            toast.success("Signup Success", { duration: 2000 });
            onSuccess();
          } catch (e: any) {
            toast.dismiss();
            toast.error(e?.response?.data?.message || "Error occured.", {
              duration: 3000,
            });
          }
        },
      }
    );
  };
  const password = watch("password");
  return (
    <Box my="6">
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Full name"
            name="full_name"
            type="text"
            tag="*"
            autoFocus
            placeholder="Enter your name"
            registerOptions={{
              required: "Full name is required",
            }}
          />
          <InputField
            label="Email"
            formControlProps={{ mt: "6" }}
            name="email"
            type="text"
            tag="*"
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
          <InputField
            tag="*"
            type="password"
            name="confirm_password"
            label="Confirm Password"
            formControlProps={{ mt: "6" }}
            placeholder="Enter password again"
            registerOptions={{
              min: {
                value: 8,
                message: "Confirm Password must be at least 8 characters.",
              },
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match.",
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
            isDisabled={isLoading}
            isLoading={isLoading}
            type="submit"
            w="full"
          >
            Submit
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
          _disabled={{
            cursor: "not-allowed",
            bg: "gray.50",
            color: "brand.black",
          }}
          onClick={handleGoogleSignup}
          isLoading={isLoading}
          leftIcon={<GoogleIcon boxSize="20px" />}
          type="button"
          w="full"
        >
          Signup with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
