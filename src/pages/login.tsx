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
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";

import { Logo } from "../constants/assets";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface LoginInput {
  email: string;
  password: string;
}

interface CustomerProfile {
  id: number;
  name: string;
  color: number[];
  email: string;
  pincode: string;
  location_name: string;
  type: string;
  profile_pic: string | null;
  gst: string;
}

interface Customer {
  id: number;
  customer: number;
  customer_profile: CustomerProfile;
}

type LoginOutput = {
  message: string;
  customer: Customer;
}; // Adjust this to match what your fake API returns

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const fakeLogin = async ({
    email,
    password,
  }: LoginInput): Promise<LoginOutput> => {
    setLoading(true);
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
          setLoading(false);
        } else {
          setLoading(false);
          reject(new Error("Invalid username or password"));
        }
      }, 3000);
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
        alert(error.message);
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  const isFormValid = email !== "" && password !== ""

  return (
    <Flex height="90vh" alignItems="center" justifyContent="center">
      <Box
        p={10}
        minWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Center mb={8}>
          <Image src={Logo} boxSize="75px" />
        </Center>
        <Center mb={4}>
          <Text fontSize="30px" fontFamily="heading" fontWeight={600}>
            Log In
          </Text>
        </Center>
        <form onSubmit={handleSubmit}>
          <Box fontFamily="body">
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon fontSize="20px" color="#939498" />
                </InputLeftElement>
                <Input
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
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {/* Render Spinner while mutation is in loading state */}
            <Button
              type="submit"
              width="full"
              mt={4}
              bgColor="#EE1B24"
              color="white"
              _hover={{
                bgColor: "#D01720",
              }}
              _disabled={{
                bgColor: "gray.50"
              }}
              disabled={!isFormValid}
            >
              {loading ? ( // Show Spinner if loading
                <Spinner size="md" color="white" mr={2} thickness="4px" speed="0.8s" />
              ) : (
                <Text>Log In</Text> // Show "Log In" text if not loading
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
