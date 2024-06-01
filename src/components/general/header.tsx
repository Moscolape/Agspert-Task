import { Box, Flex, Spacer, Text, Image, Center, useColorMode, IconButton, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { User } from "../../constants/assets";
import { useEffect, useState } from "react";
import Logout from "../modals/logout-modal";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Header = () => {
  const [name, setName] = useState("");
  const [logout, setLogout] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const stored = sessionStorage.getItem("customer");
    if (stored) {
      const getUser = JSON.parse(stored);
      setName(getUser.customer_profile.name);
    }
  }, []);

  const openLogout = () => {
    setLogout(true);
  }

  const closeLogout = () => {
    setLogout(false);
  }

  // Use color mode values
  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  // Responsive values
  const iconSize = useBreakpointValue({ base: "sm", md: "md" });
  const fontSizeHeading = useBreakpointValue({ base: "xl", md: "2xl" });
  const fontSizeName = useBreakpointValue({ base: "lg", md: "xl" });
  const userBoxSize = useBreakpointValue({ base: "40px", md: "60px" });
  const userBoxPadding = useBreakpointValue({ base: "5px", md: "10px" });
  const userBoxMargin = useBreakpointValue({ base: "10px", md: "20px" });

  return (
    <Flex
      bg={modalBg}
      w={{ base: "104%", md: "100%" }}
      p={3}
      boxShadow="md"
      align="center"
      direction={{ base: "column", md: "row" }}
    >
      <Flex align='center' w={{ base: "100%", md: "auto" }} mb={{ base: 3, md: 0 }}>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size={iconSize}
        />
        <Text
          color={textColor}
          fontFamily="heading"
          fontSize={fontSizeHeading}
          fontWeight={600}
          ml={3}
        >
          Sales
        </Text>
      </Flex>
      <Spacer display={{ base: "none", md: "block" }} />
      <Flex align="center" w={{ base: "100%", md: "auto" }} justify={{ base: "center", md: "flex-end" }}>
        <Text color={textColor} fontFamily="heading" fontSize={fontSizeName} fontWeight={400}>
          Welcome, {name}
        </Text>
        <Box
          bg="white"
          boxSize={userBoxSize}
          borderWidth="3px"
          borderColor="black"
          borderRadius="full"
          p={userBoxPadding}
          ml={userBoxMargin}
        >
          <Center>
            <Image src={User} cursor='pointer' onClick={openLogout}/>
          </Center>
        </Box>
      </Flex>
      {logout && <Logout isOpen={logout} close={closeLogout} />}
    </Flex>
  );
};

export default Header;