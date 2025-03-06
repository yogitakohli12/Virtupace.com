import { Box, SimpleGrid, Stack } from "@chakra-ui/react";

const data = [
  {
    title: "Total Supply:",
    label: "35.95B",
  },
  {
    title: "Presale (65% of supply):",
    label: "23.36B",
  },
  {
    title: "Funding Target:",
    label: "20M USD",
  },
  {
    title: "Decimal:",
    label: "6",
  },
  {
    title: "Pure MC:",
    label: "53.92M USD",
  },
  {
    title: "Contract:",
    label: "0xe1****01dd",
  },
];
export function AboutCoin() {
  return (
    <Box maxW={"800px"} mx="auto" px="4" pt="50px" zIndex={1} pos="relative">
      <Box borderWidth={"8px"} borderColor={"#181328"} bg="red">
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          color="#9B94B5"
          p="4"
          bg="red"
          fontWeight={"medium"}
          fontSize={"lg"}
          display={{ base: "none", md: "grid" }}
        >
          <Box justifySelf={"center"}>virtupace </Box>
          <Box justifySelf={"center"}>MEDOPACE </Box>
          <Box justifySelf={"center"}>Bsc </Box>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 3 }} py="4" px="4" gap="4">
          {data.map((row) => (
            <Stack
              key={row.title}
              py="4"
              px="4"
              bg="#161225"
              borderColor={"#251f32"}
              borderWidth={"1px"}
            >
              <Box fontSize={"sm"} color="#ffffffbb">
                {row.title}
              </Box>
              <Box fontSize={"2xl"} fontWeight={"bold"}>
                {" "}
                {row.label}{" "}
              </Box>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
