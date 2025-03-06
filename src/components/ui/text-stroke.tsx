import { Box, BoxProps } from "@chakra-ui/react";

export const TextStroke: React.FC<BoxProps> = (props) => {
  return (
    <Box
      textTransform={"uppercase"}
      sx={{
        WebkitTextStroke: "2px rgba(255,255,255,0.08)",
        fontWeight: "bold",
        color: "transparent",
      }}
      display={"block"}
      whiteSpace={"nowrap"}
      overflowX={"hidden"}
      width={"100%"}
      {...props}
    />
  );
};
