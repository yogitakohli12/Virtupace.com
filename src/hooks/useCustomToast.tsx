import { Box, Text, Toast, useToast, UseToastOptions } from "@chakra-ui/react";
import React from "react";
import type { IconType } from "react-icons";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";
type StatusType = "success" | "error" | "info" | "warn";
interface IToastComponent {
  status: StatusType;
  message: string;
}

const toastStatusMapper: Record<
  StatusType,
  { bg: string; Icon: IconType; color: string }
> = {
  error: {
    bg: "#FF6358",
    Icon: MdError,
    color: "#ffffff",
  },
  success: {
    bg: "#178f51",
    Icon: MdCheckCircle,
    color: "#ffffff",
  },
  warn: {
    bg: "#ed935b",
    Icon: MdWarning,
    color: "#000000",
  },
  info: { bg: "blue.500", Icon: MdInfo, color: "#ffffff" },
};

const ToastComponent: React.FC<IToastComponent> = ({ status, message }) => {
  const Icon = toastStatusMapper[status].Icon;
  return (
    <Box
      borderTopWidth="1px"
      borderTopColor="#000000"
      borderBottomRadius="4px"
      bg={toastStatusMapper[status].bg}
      maxW="350px"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      px="6"
      py="3"
      gap="0.625rem"
      color={toastStatusMapper[status].color}
    >
      <Box as="span" w="6">
        <Icon fontSize="1.5rem" />
      </Box>
      <Text as="p" fontSize="md" fontWeight="bold">
        {message}
      </Text>
    </Box>
  );
};

const toastConfig: UseToastOptions = {
  variant: "solid",
  position: "bottom-right",
  orientation: "vertical",
};
const useCustomToast = () => {
  const toast = useToast();
  const success = (message: string) => {
    toast({
      ...toastConfig,
      render: () => <ToastComponent status="success" message={message} />,
    });
  };
  const error = (message: string) => {
    toast({
      ...toastConfig,
      render: () => <ToastComponent status="error" message={message} />,
    });
  };
  const info = (message: string) => {
    toast({
      ...toastConfig,
      render: () => <ToastComponent status="info" message={message} />,
    });
  };
  const warn = (message: string) => {
    toast({
      ...toastConfig,
      render: () => <ToastComponent status="warn" message={message} />,
    });
  };
  return { success, error, info, warn };
};

export default useCustomToast;
