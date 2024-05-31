// import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";

import { Customers } from "../../schemas/customers";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";
import { Products } from "../../schemas/products";

interface Order {
  open: boolean;
  close: () => void;
}

const NewSaleOrder: React.FC<Order> = ({ open, close }) => {
  const productOptions = Products.map((product) => ({
    label: product.name,
    value: product.id.toString(),
  }));

  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: productOptions,
  });

  const renderAllCustomers = () => {
    return Customers.map((customer, index) => (
      <option key={index} value={customer.id}>
        {customer.customer_profile.name}
      </option>
    ));
  };

  return (
    <Modal isOpen={open} onClose={close} size="2xl" isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        p={6}
        fontFamily="Inter"
        height="75vh"
        animation="animate-bump"
      >
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center" my={5}>
          <Text fontWeight="medium" color="red.500" fontSize="2xl">
            Sale Order Form
          </Text>
        </ModalHeader>
        <ModalBody
          overflowY="scroll"
          height="60vh"
          className="custom-scrollbar-example"
        >
          <Flex>
            <Box mb={5} w="45%">
              <Text fontWeight="semibold">Invoice Number</Text>
              <Input
                mt={3}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
            <Spacer />
            <Box mb={5} w="45%">
              <Text fontWeight="semibold">Invoice Date</Text>
              <Input
                mt={3}
                type="date"
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
          </Flex>
          <Box mb={5}>
            <Text fontWeight="semibold">Customer</Text>
            <Select
              placeholder="Select a customer"
              mt={3}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            >
              {renderAllCustomers()}
            </Select>
          </Box>
          <Box mb={5}>
            <Text fontWeight="semibold" mb={3}>
              All Products
            </Text>
            <MultiSelect
              options={options}
              value={value}
              onChange={onChange}
              placeholder="Select product(s)"
            />
          </Box>
          <Flex mt={10}>
            <Checkbox colorScheme="red" size='lg'>Is Paid</Checkbox>
            <Spacer />
            <Flex align='center'>
              <Box
                bg="gray.100"
                borderRadius={5}
                p={2}
                color="black"
                boxShadow='sm'
                fontWeight='medium'
              >
                Total Price: ₹34
              </Box>
              <Box
                bg="gray.100"
                borderRadius={5}
                color="black"
                p={2}
                ml={3}
                boxShadow='sm'
                fontWeight='medium'
              >
                Total Items: 23
              </Box>
            </Flex>
          </Flex>
          <Flex mt={6}>
            <Button
              w="48%"
              colorScheme="white"
              color="red"
              border="1px"
              borderColor="red"
              boxShadow='sm'
              fontWeight='medium'
              >
              Discard
            </Button>
            <Spacer />
            <Button
              colorScheme="gray"
              color="black"
              w='48%'
              boxShadow='sm'
              fontWeight='medium'
            >
              Create Sale Order
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewSaleOrder;