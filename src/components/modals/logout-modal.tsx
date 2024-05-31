import React from "react"; // Import React

import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import {
  // Box,
  Button,
  Center,
  // Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"; // Import Chakra UI components

// Define type for props of Logout component
type LogoutModalProps = {
  isOpen: boolean; // Boolean to control the modal state
  close: () => void; // Function to close logout modal
};

// Logout component
const Logout: React.FC<LogoutModalProps> = ({ isOpen, close }) => {
  const navigate = useNavigate(); // Get navigate function for navigation

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); // Navigate to login page
  };

  // Use color mode values
  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent py={5} bg={modalBg}>
        <ModalHeader>
          <Center>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Log Out?
            </Text>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Text textAlign="center" color={textColor} >
            Are you sure you want to log out?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button variant="outline" mr={3} onClick={close}>
            No
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Logout; // Export Logout component
