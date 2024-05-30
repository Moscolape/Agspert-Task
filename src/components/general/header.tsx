import { Box, Flex, Spacer, Text, Image, Center } from "@chakra-ui/react";
import { User } from "../../constants/assets";
import { useEffect, useState } from "react";

const Header = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("customer");
    if (stored) {
      const getUser = JSON.parse(stored);
      setName(getUser.customer_profile.name);
    }
  }, []);

  return (
    <Flex
      bg="white"
      w="100%"
      p={3}
      // color="white"
      boxShadow="md"
      align="center"
    >
      <Box>
        <Text
          color="black"
          fontFamily="heading"
          fontSize="2xl"
          fontWeight={600}
        >
          Sales
        </Text>
      </Box>
      <Spacer />
      <Flex align="center">
        <Text color="black" fontFamily="heading" fontSize="xl" fontWeight={400}>
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
            <Image src={User} />
          </Center>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
