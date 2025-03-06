import { extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

// const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
export const theme = extendTheme({
  fonts: {
    heading: "Raleway",
    body: "Raleway",
  },
  colors: {
    brand: {
      black: "#0E0C10",
      creamy: "#D2CADD",
      green: "#00FF7E",
      pink: "#FFB7FE",
      skyblue: "#85E7FF",
    },
  },
  breakpoints: {
    lg: "1240px",
    xl: "1600px",
  },
});
