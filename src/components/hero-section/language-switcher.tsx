import { ChevronDown } from "@/data";
import { locales, flagMapper, localeMapper } from "@/locales";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        textTransform={"capitalize"}
        as={Button}
        width={"100px"}
        height={"30px"}
        borderRadius={"30px"}
        display="flex"
        className="menubtn"
        p={1}
        rightIcon={<ChevronDown style={{border:"1px solid black" , borderRadius:"50%"}} className="menuicon" />}
      >
        <Box fontSize={"15px"} fontFamily={"Rajdhani"} className="menutext">
           {/* {flagMapper[locale]} */}
           LAN..EN
          </Box>
      </MenuButton>
      <MenuList bg="black"  borderColor={"white"}>
        {locales.map((l) => (
          <Link href={router.asPath} key={l} locale={l}>
            <MenuItem
              bg={l === locale ? "#f0e68c" : "black"}
              color={l === locale ? "black" : "white"}
              _hover={{ bg: "white" ,color:"black"}}
              display={"flex"}
              alignItems={"center"}
              gap="2"
            >
              <Box mt="0.5"> {flagMapper[l]}</Box>
              <Box>{localeMapper[l]}</Box>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}
