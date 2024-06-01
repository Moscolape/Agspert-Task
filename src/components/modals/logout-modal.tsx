import React from "react"; // Import React

import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import {
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
  useBreakpointValue,
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

  // Adjust modal size based on screen size
  const modalSize = useBreakpointValue({ base: "xs", md: "md" });

  return (
    <Modal isOpen={isOpen} onClose={close} size={modalSize} isCentered>
      <ModalOverlay />
      <ModalContent py={{ base: 3, md: 5 }} px={{ base: 4, md: 6 }} bg={modalBg} borderRadius={{ base: "none", md: "md" }}>
        <ModalHeader>
          <Center>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color={textColor}>
              Log Out?
            </Text>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Text textAlign="center" color={textColor} fontSize={{ base: "sm", md: "md" }}>
            Are you sure you want to log out?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button variant="outline" mr={3} onClick={close} size={{ base: "sm", md: "md" }}>
            No
          </Button>
          <Button colorScheme="red" onClick={handleLogout} size={{ base: "sm", md: "md" }}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Logout; // Export Logout component