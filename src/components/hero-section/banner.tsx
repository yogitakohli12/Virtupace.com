import { Box, HStack, Image } from "@chakra-ui/react";
import { Global } from "@emotion/react";

const brands = ["/assets/circle-bars.svg"];
export const Brands = () => {
  const content = Array(10)
    .fill(brands)
    .map((name) => (
      <Box
        px="10px"
        display={"flex"}
        flexGrow={0}
        flexShrink={0}
        key={name}
       
        alignItems={"center"}
      >
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8021 15.9595C37.1397 10.2155 31.375 0.822401 17.5016 15.4682C31.3826 0.8222 21.6898 -4.42626 16.995 15.1942C21.6973 -4.42646 10.6777 -4.13213 16.4131 15.2098C10.6699 -4.13948 1.27885 1.62627 15.9142 15.503C1.27885 1.62627 -3.97615 11.3137 15.6405 16.0172C-3.97615 11.3137 -3.68175 22.3357 15.656 16.5993C-3.68155 22.3432 2.08309 31.7363 15.9566 17.0906C2.07553 31.7365 11.7684 36.985 16.4631 17.3645C11.7608 36.9852 22.7804 36.6909 17.045 17.3489C22.788 36.6907 32.1791 30.9249 17.5362 17.0484C32.1793 30.9325 37.4265 21.2377 17.8101 16.5417C37.4341 21.2375 37.1397 10.2155 17.8021 15.9595Z"
            fill="#00EB90"
          />
        </svg>

        <Box ml="10px" fontWeight={"bold"} color={"black"}>
          Meta Droom
        </Box>
      </Box>
    ));

  return (
    <Box overflow={"hidden"} pb="50px">
      <Box height={"85px"} bg="black" pt="15px" w="100vw">
        <Box
          position="relative"
          h={{ base: "150px", lg: "250px" }}
          transform={"rotate(-1deg)"}
        >
          <Global
            styles={`
      @keyframes scroll {
        to {
          transform: translate(-${100 / 5}%);
        }
      }
      `}
          />
          <HStack
            height={"70px"}
            justifyContent={"space-around"}
            flexShrink={0}
            spacing={0}
            w="max-content"
            animation={"scroll 15s forwards linear infinite"}
            bg="rgb(233, 249, 115)"
      

          >
            {content}
            {content}
            {content}
            {content}
            {content}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export const BrandsYellow = () => {
  const content = Array(10)
    .fill(brands)
    .map((name) => (
      <Box
        px="10px"
        display={"flex"}
        flexGrow={0}
        flexShrink={0}
        key={name}
        alignItems={"center"}
      >
        <svg
          width="33"
          height="33"
          color="black"
         
          viewBox="0 0 33 33"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8021 15.9595C37.1397 10.2155 31.375 0.822401 17.5016 15.4682C31.3826 0.8222 21.6898 -4.42626 16.995 15.1942C21.6973 -4.42646 10.6777 -4.13213 16.4131 15.2098C10.6699 -4.13948 1.27885 1.62627 15.9142 15.503C1.27885 1.62627 -3.97615 11.3137 15.6405 16.0172C-3.97615 11.3137 -3.68175 22.3357 15.656 16.5993C-3.68155 22.3432 2.08309 31.7363 15.9566 17.0906C2.07553 31.7365 11.7684 36.985 16.4631 17.3645C11.7608 36.9852 22.7804 36.6909 17.045 17.3489C22.788 36.6907 32.1791 30.9249 17.5362 17.0484C32.1793 30.9325 37.4265 21.2377 17.8101 16.5417C37.4341 21.2375 37.1397 10.2155 17.8021 15.9595Z"
            fill="black"
          />
        </svg>

        <Box ml="10px" fontWeight={"bold"} color={"black"}>
          Meta Droom
        </Box>
      </Box>
    ));

  return (
    <Box overflow={"hidden"} mt="4">
      <Box height={"85px"} bg="#716300" pb="15px" w="100vw">
        <Box
          position="relative"
          h={{ base: "150px", lg: "250px" }}
          transform={"rotate(1deg)"}
        >
          <Global
            styles={`
        @keyframes scrollright {
          to {
            transform: translate(-${100 / 5}%);
          }
        }
        `}
          />
          <HStack
            height={"70px"}
            justifyContent={"space-around"}
            flexShrink={0}
            spacing={0}
            w="max-content"
            animation={"scrollright 15s forwards linear infinite"}
            bg="yellow"
          >
            {content}
            {content}
            {content}
            {content}
            {content}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
