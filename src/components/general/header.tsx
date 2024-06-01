import { 
  Box, 
  Flex, 
  Spacer, 
  Text, 
  Image, 
  Center, 
  useColorMode, 
  IconButton, 
  useColorModeValue, 
  useBreakpointValue 
} from "@chakra-ui/react";
import { User } from "../../constants/assets"; // Importing user icon
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks
import Logout from "../modals/logout-modal"; // Importing logout modal component
import { SunIcon, MoonIcon } from "@chakra-ui/icons"; // Importing sun and moon icons

const Header = () => {
  const [name, setName] = useState(""); // State to store user name
  const [logout, setLogout] = useState(false); // State to manage logout modal visibility
  const { colorMode, toggleColorMode } = useColorMode(); // Hook for managing color mode

  // Effect hook to fetch and set user name from session storage
  useEffect(() => {
    const stored = sessionStorage.getItem("customer");
    if (stored) {
      const getUser = JSON.parse(stored);
      setName(getUser.customer_profile.name);
    }
  }, []);

  // Function to open logout modal
  const openLogout = () => {
    setLogout(true);
  }

  // Function to close logout modal
  const closeLogout = () => {
    setLogout(false);
  }

  // Use color mode values
  const modalBg = useColorModeValue("white", "gray.800"); // Background color for the modal
  const textColor = useColorModeValue("gray.800", "white"); // Text color for the modal

  // Responsive values
  const iconSize = useBreakpointValue({ base: "sm", md: "md" }); // Size of icons
  const fontSizeHeading = useBreakpointValue({ base: "xl", md: "2xl" }); // Font size for heading
  const fontSizeName = useBreakpointValue({ base: "lg", md: "xl" }); // Font size for user name
  const userBoxSize = useBreakpointValue({ base: "40px", md: "60px" }); // Size of user box
  const userBoxPadding = useBreakpointValue({ base: "5px", md: "10px" }); // Padding for user box
  const userBoxMargin = useBreakpointValue({ base: "10px", md: "20px" }); // Margin for user box

  return (
    <Flex
      bg={modalBg}
      w={{ base: "104%", md: "100%" }}
      p={3}
      boxShadow="md"
      align="center"
      direction={{ base: "column", md: "row" }}
    >
      {/* Left section containing theme toggle and application title */}
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
      <Spacer display={{ base: "none", md: "block" }} /> {/* Spacer to separate sections */}
      {/* Right section containing user name and profile picture */}
      <Flex align="center" w={{ base: "100%", md: "auto" }} justify={{ base: "center", md: "flex-end" }}>
        <Text color={textColor} fontFamily="heading" fontSize={fontSizeName} fontWeight={400}>
          Welcome, {name}
        </Text>
        {/* Box containing user profile picture */}
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
            <Image src={User} cursor='pointer' onClick={openLogout}/> {/* User profile picture */}
          </Center>
        </Box>
      </Flex>
      {/* Render logout modal if logout state is true */}
      {logout && <Logout isOpen={logout} close={closeLogout} />}
    </Flex>
  );
};

export default Header;