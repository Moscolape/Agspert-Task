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
  // Select,
  // Spinner,
  Text,
  // useDisclosure,
} from "@chakra-ui/react";
import { SaleOrder } from "../../schemas/sale-order";
// import { AddIcon } from "@chakra-ui/icons";

interface Order {
  order: SaleOrder | null;
  open: boolean;
  close: () => void;
}

const EditSaleOrder: React.FC<Order> = ({ order, open, close }) => {

  return (
    <Modal isOpen={open} onClose={close} size='xl' isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent p={6} fontFamily="Inter" animation="animate-bump">
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center">
          <Text fontWeight="bold" color="red.500" fontSize="2xl">
            Edit Sale Order
          </Text>
        </ModalHeader>
        <ModalBody>
          <Box mb={5}>
            <Text fontWeight="semibold">Programme Name</Text>
            <Input
              mt={3}
              defaultValue={order!.customer_id}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            />
          </Box>
          <Box mb={5}>
            <Text fontWeight="semibold">Grant Date</Text>
            <Input
              mt={3}
              type="date"
              defaultValue={order?.invoice_date}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            />
          </Box>
          <Box mb={5}>
            <Text fontWeight="semibold">Expiry Date</Text>
            <Input
              mt={3}
              type="date"
              defaultValue={order?.invoice_date}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            />
          </Box>
          <Flex justify="center" mt={6}>
            <Button colorScheme="red">Update</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditSaleOrder;
