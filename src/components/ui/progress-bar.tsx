import { Box, BoxProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const ProgressBar = ({
  percent,
  ...props
}: { percent: number } & BoxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const bars = Math.ceil(width / 10);

  useEffect(() => {
    const calculateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
      }
    };
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, [setWidth]);

  const isFilled = (index: number) => {
    const cellPercent = (index * 70) / bars;
    return percent >= cellPercent;
  };

  return (
    <Box
    className="rectanlgecontainer"
      h="100px"
      w="full"
      ref={ref}
      overflow={"hidden"}
      display={"flex"}
      gap="6px"
      pl="2"
      {...props}
    >
      {new Array(bars ?? 100).fill(0).map((i, index) => (
        <Box
          key={i}
          className="rectangles"
          bgColor={isFilled(index) ? "rgba(37, 89, 112, 1)" : "white"}
          height="10%"
          w="8px"
          h="full"
          rounded={"full"}
          flexShrink={0}
        />
      ))}
    </Box>
  );
};
