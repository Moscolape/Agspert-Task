
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
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Logo } from "../constants/assets";
import { EmailIcon, LockIcon, MoonIcon, SunIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Customer } from "../schemas/customers";

// Define the structure of input for login
interface LoginInput {
  email: string;
  password: string;
}

// Define the structure of output for login
type LoginOutput = {
  message: string;
  customer: Customer;
};

// Login component
const Login = () => {
  // State variables
  const [show, setShow] = useState(false); // State for password visibility toggle
  const { colorMode, toggleColorMode } = useColorMode(); // Color mode and its toggle function

  const [error, setError] = useState(''); // State for login error message
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const navigate = useNavigate(); // Navigation function
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>(); // Form control using react-hook-form

  // Function to toggle password visibility
  const handleClick = () => {
    setShow(!show);
  };

  // Fake login function (simulate API call)
  const fakeLogin = async ({
    email,
    password,
  }: LoginInput): Promise<LoginOutput> => {
    setIsLoading(true); // Set loading state to true
    const fixedUsername = "jesus_christ@church.com";
    const fixedPassword = "Mumbai";

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === fixedUsername && password === fixedPassword) {
          // Mocked customer data on successful login
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
          resolve({ message: "Success", customer }); // Resolve with success message and customer data
          setIsLoading(false); // Set loading state to false
        } else {
          setIsLoading(false); // Set loading state to false
          reject(new Error("Invalid username or password")); // Reject with error message
        }
      }, 2000);
    });
  };

  // Mutation hook for handling login mutation
  const mutation: UseMutationResult<LoginOutput, Error, LoginInput> =
    useMutation({
      mutationFn: fakeLogin,
      onSuccess: (data) => {
        sessionStorage.setItem("customer", JSON.stringify(data.customer)); // Store customer data in sessionStorage
        navigate("/sales"); // Navigate to sales page on successful login
      },
      onError: (error: Error) => {
        setError(error.message); // Set login error message on error
      },
    });

  // Form submit handler
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    mutation.mutate(data); // Trigger the login mutation
  };

  // Use color mode values
  const modalBg = useColorModeValue("white", "gray.800"); // Background color
  const textColor = useColorModeValue("gray.800", "white"); // Text color

  // Determine icon size based on screen size
  const iconSize = useBreakpointValue({ base: "sm", md: "md" });
  

  return (
    <Flex
      height={{ base: "100vh", md: "90vh" }}
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <IconButton
        aria-label="Toggle theme"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        size={iconSize}
        position='fixed'
        top={5}
        left={5}
      />
      <Box
        p={{ base: 6, md: 10 }}
        width={{ base: "100%", sm: "400px", md: "500px" }}
        borderWidth={{base: 0, md: 1}}
        borderRadius={{base: 0, md: 8}}
        boxShadow={{ base: "none", md: "lg" }}
        bg={modalBg}
      >
        <Center mb={8}>
          <Image src={Logo} boxSize={{ base: "50px", md: "75px" }} />
        </Center>
        <Center mb={4}>
          <Text fontSize={{ base: "24px", md: "30px" }} fontFamily="heading" fontWeight={600} color={textColor}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box fontFamily="body">
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon fontSize="20px" color="#939498" />
                </InputLeftElement>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your email"
                  outline="none"
                  borderColor={errors.email ? 'red' : 'gray.100'}
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
                  {...register("password", { required: true })}
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  outline="none"
                  borderColor={errors.password ? 'red' : 'gray.100'}
                  _focus={{ boxShadow: "none", borderColor: "gray.100" }}
                />
                <InputRightElement cursor="pointer" onClick={handleClick}>
                  <IconButton
                    aria-label="Toggle password visibility"
                    color="#939498"
                    icon={show ? <ViewIcon /> : <ViewOffIcon />}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              width="full"
              mt={4}
              colorScheme="red"
              color="white"
              isDisabled={isLoading}
            >
              {isLoading ? (
                <Spinner size="md" color="white" mr={2} thickness="3px" speed="0.8s" />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;