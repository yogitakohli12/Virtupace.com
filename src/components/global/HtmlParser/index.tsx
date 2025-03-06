import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const HtmlParser: React.FC<{ content: string }> = ({ content }) => {
  const router = useRouter();
  useEffect(() => {
    const htmlNode = document.querySelector(".content");
    htmlNode?.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
  }, [router.locale]);

  return (
    <Box
      className="content"
      color="#eeeeee"
      sx={{
        table: {
          borderCollapse: "collapse",
          width: "100%",
        },
        td: {
          border: "1px solid #ddd",
          padding: "8px",
        },
        "tr:nth-child(even)": {
          backgroundColor: "#f2f2f2",
        },
        a: { color: "#85E7FF" },
        "span ,heading": {
          lineHeight: "140%",
          fontWeight: "bold",
          marginTop: "16px",
        },
        span: {
          fontSize: "3rem",
          lineHeight: "4rem",
        },
        heading: {
          fontSize: "1.5rem",
        },
        pre: {
          p: 4,
          bg: "hyteno.black",
          color: "#85E7FF",
          my: 3,
          width: "full",
          overflow: "auto",
        },
        p: {
          my: 5,
          fontSize: "md",
          lineHeight: "160%",
        },
        ".marker": {
          bgColor: "yellow",
        },
        img: {
          w: "100% !important",
          h: "auto !important",
          my: 16,
          objectFit: "contain",
        },
        ul: {
          pl: 6,
        },
        ol: {
          pl: 6,
        },
        li: {
          fontSize: "md",
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlParser;
