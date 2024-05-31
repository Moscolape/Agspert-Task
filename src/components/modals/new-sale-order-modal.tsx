// import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  // Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  // Spinner,
  Text,
  Spacer,
  // useDisclosure,
} from "@chakra-ui/react";

interface Order {
  open: boolean;
  close: () => void;
}

const NewSaleOrder: React.FC<Order> = ({ open, close }) => {

  return (
    <Modal isOpen={open} onClose={close} size='2xl' isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent p={6} fontFamily="Inter" animation="animate-bump">
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center" my={5}>
          <Text fontWeight="bold" color="red.500" fontSize="2xl">
            Sale Order Form
          </Text>
        </ModalHeader>
        <ModalBody>
          <Flex>
            <Box mb={5} w='45%'>
              <Text fontWeight="semibold">Invoice Number</Text>
              <Input
                mt={3}
                // defaultValue={order!.customer_id}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
            <Spacer />
            <Box mb={5} w='45%'>
              <Text fontWeight="semibold">Invoice Date</Text>
              <Input
                mt={3}
                type="date"
                // defaultValue={order?.invoice_date}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
          </Flex>
          <Box mb={5}>
            <Text fontWeight="semibold">Customer</Text>
            <Select placeholder='Select option' mt={3}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </Box>
          <Flex justify="center" mt={6}>
            <Button colorScheme="red">Update</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewSaleOrder;