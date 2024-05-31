import { Box, Flex, Spacer, Text, Image, Center, useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
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

  return (
    <Flex
      bg={modalBg}
      w="100%"
      p={3}
      // color="white"
      boxShadow="md"
      align="center"
    >
      <Flex align='center'>
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        <Text
          color={textColor}
          fontFamily="heading"
          fontSize="2xl"
          fontWeight={600}
          ml={3}
        >
          Sales
        </Text>
      </Flex>
      <Spacer />
      <Flex align="center">
        <Text color={textColor} fontFamily="heading" fontSize="xl" fontWeight={400}>
          Welcome, {name}
        </Text>
        <Box
          bg="white"
          boxSize="60px"
          borderWidth="3px"
          borderColor="black"
          borderRadius="full"
          p="10px"
          ml="20px"
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
