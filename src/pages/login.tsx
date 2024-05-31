import {
  Center,
  Image,
  Text,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

import { Logo } from "../constants/assets";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Customer } from "../schemas/customers";

interface LoginInput {
  email: string;
  password: string;
}

type LoginOutput = {
  message: string;
  customer: Customer;
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const fakeLogin = async ({
    email,
    password,
  }: LoginInput): Promise<LoginOutput> => {
    setIsLoading(true);
    const fixedUsername = "jesus_christ@church.com";
    const fixedPassword = "Mumbai";

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === fixedUsername && password === fixedPassword) {
          const customer = {
            id: 9,
            customer: 11908,
            customer_profile: {
              id: 11908,
              name: "Lakshmi",
              color: [182, 73, 99],
              email: "jesus_christ@church.com",
              pincode: "Mumbai",
              location_name: "Mumbai, Maharashtra, India",
              type: "C",
              profile_pic: null,
              gst: "",
            },
          };
          resolve({ message: "Success", customer });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          reject(new Error("Invalid username or password"));
        }
      }, 2000);
    });
  };

  const mutation: UseMutationResult<LoginOutput, Error, LoginInput> =
    useMutation({
      mutationFn: fakeLogin,
      onSuccess: (data) => {
        sessionStorage.setItem("customer", JSON.stringify(data.customer));
        navigate("/sales");
      },
      onError: (error: Error) => {
        setError(error.message);
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

    // Use color mode values
    const modalBg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "white");

  // const isFormValid = email !== "" && password !== "";

  return (
    <Flex height="90vh" alignItems="center" justifyContent="center">
      <Box
        p={10}
        minWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={modalBg}
      >
        <Center mb={8}>
          <Image src={Logo} boxSize="75px" />
        </Center>
        <Center mb={4}>
          <Text fontSize="30px" fontFamily="heading" fontWeight={600} color={textColor}>
            Log In
          </Text>
        </Center>
        {error &&
          <Box p={3} bg='red.100' my={5} borderRadius={3}>
            <Center>
              <Text color='red'>
                {error}
              </Text>
            </Center>
          </Box>
        }
        <form onSubmit={handleSubmit}>
          <Box fontFamily="body">
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon fontSize="20px" color="#939498" />
                </InputLeftElement>
                <Input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  outline="none"
                  _focus={{ boxShadow: "none", borderColor: "gray.100" }}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon fontSize="20px" color="#939498" />
                </InputLeftElement>
                <Input
                  required
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  outline="none"
                  _focus={{ boxShadow: "none", borderColor: "gray.100" }}
                />
                <InputRightElement cursor="pointer" onClick={handleClick}>
                  <IconButton
                    aria-label="Toggle password visibility"
                    color="#939498"
                    icon={show ? <ViewIcon /> : <ViewOffIcon />}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              width="full"
              mt={4}
              colorScheme="red"
              // bgColor=''
              color="white"
              isDisabled = {email === "" || password === ""}
            >
              {isLoading ? (
                <Spinner size="md" color="white" mr={2} thickness="3px" speed="0.8s" />
              ) : (
                <Text color='white'>Log In</Text>
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
