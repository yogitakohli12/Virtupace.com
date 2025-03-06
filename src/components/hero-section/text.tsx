import { FC } from "react";
import { TextProps, Text, Box } from "@chakra-ui/react";

export const TextWithStroke: FC<TextProps & { cc?: string; cb?: string }> = ({
  cc = "white", // Color of the text stroke
  cb = "#FBF8F2", // Background color or fallback fill color
  ...props
}) => (
  <Text
    backgroundClip="text"
    color={cb}
    fontWeight={700}
    textShadow={`-1px 0 ${cc}, 0 1px ${cc}, 1px 0 ${cc}, 0 -1px ${cc}`}
    sx={{
      WebkitTextFillColor: "transparent", // Transparent inner text color
      WebkitTextStrokeColor: cc, // Stroke color
      WebkitTextStrokeWidth: "1px", // Stroke width
    }}
    {...props}
  />
);

export const AbsoluteText: FC<TextProps> = (props) => (
  <Box
    w="full"
    pos="absolute"
    zIndex={-1}
    top={0}
    right={0}
    overflow={"hidden"}
  >
    <TextWithStroke
      textTransform={"uppercase"}
      fontSize={"150px"}
      height={"200px"}
      width={"15000px"}
      fontWeight={"bold"}
      cb="transparent"
      cc="#FBF8F222"
    >
      {props.children}
    </TextWithStroke>
  </Box>
);
