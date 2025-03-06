import { Skeleton, Spinner, Stack } from "@chakra-ui/react";

export default function BuyWidgetSkeleton() {
  return (
    <Stack
      maxW="full"
      border="4px solid transparent"
      rounded={{ base: "44px", md: "64px" }}
      // background="linear-gradient(#000000,#000000) padding-box,linear-gradient(to right,rgba(210, 72, 244, 1), rgba(113, 72, 244, 1))"
      bg="brand.black"
      px={{ base: "16px", md: "24px" }}
      pt={{ base: "20px", md: "35px" }}
      pb={{ base: "20px", md: "25px" }}
      width={{ base: "full", md: "full" }}
      justifyContent={"center"}
      align={"center"}
      minH="400px"
    >
      <Spinner size="xl" color="#ffffff30" />
    </Stack>
  );
}
