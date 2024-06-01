import React from "react";
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
  useColorModeValue,
  useBreakpointValue,
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

  // Use color mode values
  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  // Responsive width values
  const modalWidth = useBreakpointValue({ base: "90%", md: "2xl" });
  const boxWidth = useBreakpointValue({ base: "100%", md: "45%" });

  return (
    <Modal isOpen={open} onClose={close} size={modalWidth} isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        p={6}
        fontFamily="Inter"
        height="75vh"
        animation="animate-bump"
        bg={modalBg}
      >
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center" my={5}>
          <Text fontWeight="medium" color={textColor} fontSize="2xl">
            Sale Order Form
          </Text>
        </ModalHeader>
        <ModalBody
          overflowY="scroll"
          height="60vh"
          className="custom-scrollbar-example"
        >
          <Flex direction={useBreakpointValue({ base: "column", md: "row" })}>
            <Box mb={5} w={boxWidth}>
              <Text fontWeight="medium">Invoice Number</Text>
              <Input
                mt={3}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
            <Spacer />
            <Box mb={5} w={boxWidth}>
              <Text fontWeight="medium">Invoice Date</Text>
              <Input
                mt={3}
                type="date"
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
          </Flex>
          <Box mb={5}>
            <Text fontWeight="medium">Customer</Text>
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
            <Text fontWeight="medium" mb={3}>
              All Products
            </Text>
            <MultiSelect
              options={options}
              value={value}
              onChange={onChange}
              placeholder="Select product(s)"
            />
          </Box>
          <Flex mt={10} direction={useBreakpointValue({ base: "column", md: "row" })}>
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
                mt={{ base: 4, md: 0 }}
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
                mt={{ base: 4, md: 0 }}
              >
                Total Items: 23
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
        <Flex mt={6} direction={useBreakpointValue({ base: "column", md: "row" })}>
          <Button
            w={{ base: "100%", md: "48%" }}
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
            color={textColor}
            w={{ base: "100%", md: "48%" }}
            boxShadow='sm'
            fontWeight='medium'
            mt={{ base: 4, md: 0 }}
          >
            Create Sale Order
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default NewSaleOrder;