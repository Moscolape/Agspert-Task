import React, { useEffect, useState } from "react";
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  Center,
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

  const [isPaid, setIsPaid] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const createNewOrder = () => {
    const items = Object.keys(totalItems).map((skuId) => ({
      sku_id: parseInt(skuId),
      price: sellingRates[skuId],
      quantity: totalItems[skuId],
    }));

    const newSaleOrder = {
      invoice_no: invoiceNo,
      invoice_date: invoiceDate,
      customer_id: Math.floor(10000 + Math.random() * 90000),
      customer_name: selectedCustomer,
      price: calculateTotalPrice(),
      paid: isPaid,
      items: items,
    };

    console.log(newSaleOrder);
  };

  // State to keep track of total items for selected products
  const [totalItems, setTotalItems] = useState<{ [productId: string]: number }>(
    {}
  );

  // State to keep track of selling rates for selected products
  const [sellingRates, setSellingRates] = useState<{
    [skuId: string]: number;
  }>({});

  // Effect to reset total items and selling rates when products are cleared
  useEffect(() => {
    if (Array.isArray(value) && value.length === 0) {
      setTotalItems({});
      setSellingRates({});
    }
  }, [value]);

  const renderAllCustomers = () => {
    return Customers.map((customer, index) => (
      <option key={index} value={customer.customer_profile.name}>
        {customer.customer_profile.name}
      </option>
    ));
  };

  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const modalWidth = useBreakpointValue({ base: "90%", md: "2xl" });
  const boxWidth = useBreakpointValue({ base: "100%", md: "45%" });

  const handleQuantityChange = (
    productId: string,
    skuId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const parsedValue = parseInt(value); // Parse the input value to an integer

    // Ensure the entered quantity doesn't exceed quantity_in_inventory
    const product = Products.find((p) => p.id.toString() === productId);
    const sku = product?.sku.find((s) => s.id.toString() === skuId);
    const maxQuantity = sku?.quantity_in_inventory || 0;
    const quantity = Math.min(parsedValue, maxQuantity);

    setTotalItems((prevTotalItems) => {
      const updatedTotalItems = { ...prevTotalItems };
      updatedTotalItems[skuId] = quantity;
      return updatedTotalItems;
    });
  };

  const handleSellingRateChange = (
    skuId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value); // Parse the input value to a float

    setSellingRates((prevSellingRates) => {
      const updatedSellingRates = { ...prevSellingRates };
      updatedSellingRates[skuId] = parsedValue;
      return updatedSellingRates;
    });
  };

  const calculateTotalPrice = () => {
    return Object.entries(totalItems).reduce((acc, [skuId, quantity]) => {
      const sellingRate = sellingRates[skuId] || 0;
      return acc + quantity * sellingRate;
    }, 0);
  };

  return (
    <Modal isOpen={open} onClose={close} size={modalWidth} isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        p={6}
        fontFamily="Inter"
        height="85vh"
        animation="animate-bump"
        bg={modalBg}
      >
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center" my={5}>
          <Text fontWeight="semibold" color={textColor} fontSize="2xl">
            Sale Order Form
          </Text>
        </ModalHeader>
        <ModalBody
          overflowY="scroll"
          height="70vh"
          className="custom-scrollbar-example"
        >
          <Flex direction={useBreakpointValue({ base: "column", md: "row" })}>
            <Box mb={5} w={boxWidth}>
              <Text fontWeight="medium">Invoice Number</Text>
              <Input
                mt={3}
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}  
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
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </Box>
          </Flex>
          <Box mb={5}>
            <Text fontWeight="medium">Customer</Text>
            <Select
              placeholder="Select a customer"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
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
          <Box mb={5} mt={10}>
            <Accordion allowToggle>
              {Array.isArray(value) &&
                value.map((selectedProduct) => {
                  const product = Products.find(
                    (p) => p.id.toString() === selectedProduct.value
                  );
                  return (
                    <AccordionItem key={selectedProduct.value}>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left" fontWeight={600}>
                            {product?.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {product!.sku.length > 0 ? (
                          product?.sku.map((unit) => (
                            <Card key={unit.id} my={3} position="relative">
                              <Box p={3} my={3}>
                                <Flex
                                  alignItems="center"
                                  borderBottomWidth={1}
                                  borderBottomColor="grey"
                                >
                                  <Text
                                    fontWeight={500}
                                  >{`SKU ${unit.id} (${unit.amount}) kg`}</Text>
                                  <Spacer />
                                  <Text
                                    p={2}
                                  >{`Rate: ₹ ${unit.selling_price}`}</Text>
                                </Flex>
                                <Flex
                                  direction={{ base: "column", md: "row" }}
                                  mt={5}
                                >
                                  <Box mb={5} w={boxWidth}>
                                    <Text fontWeight="medium">
                                      Selling Rate
                                    </Text>
                                    <Input
                                      mt={3}
                                      outline="none"
                                      _focus={{
                                        boxShadow: "none",
                                        borderColor: "gray.300",
                                      }}
                                      placeholder="Enter selling rate"
                                      onChange={(e) =>
                                        handleSellingRateChange(
                                          unit.id.toString(),
                                          e
                                        )
                                      }
                                    />
                                  </Box>
                                  <Spacer />
                                  <Box mb={5} w={boxWidth}>
                                    <Text fontWeight="medium">Total Items</Text>
                                    <Input
                                      mt={3}
                                      type="number"
                                      outline="none"
                                      _focus={{
                                        boxShadow: "none",
                                        borderColor: "gray.300",
                                      }}
                                      placeholder="Enter quantity"
                                      max={
                                        unit.quantity_in_inventory
                                          ? unit.quantity_in_inventory
                                          : undefined
                                      }
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          selectedProduct.value,
                                          unit.id.toString(),
                                          e
                                        )
                                      }
                                    />
                                  </Box>
                                </Flex>
                              </Box>
                              <Button
                                size="sm"
                                fontWeight="normal"
                                p={1}
                                colorScheme="red"
                                position="absolute"
                                bottom={0}
                                right={0}
                                cursor="auto"
                              >
                                {`${unit.quantity_in_inventory} items remaining`}
                              </Button>
                            </Card>
                          ))
                        ) : (
                          <Center>
                            <Text
                              fontFamily="body"
                              fontSize="20px"
                              fontWeight="medium"
                              my={7}
                            >
                              No SKU available for this product.
                            </Text>
                          </Center>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </Box>
          <Flex
            mt={10}
            direction={useBreakpointValue({ base: "column", md: "row" })}
          >
            <Checkbox colorScheme="red" size="lg" onChange={() => setIsPaid(!isPaid)}>
              Is Paid
            </Checkbox>
            <Spacer />
            <Flex align="center">
              <Box
                bg="gray.100"
                borderRadius={5}
                p={2}
                color="black"
                boxShadow="sm"
                fontWeight="medium"
                mt={{ base: 4, md: 0 }}
              >
                Total Price: ₹ {calculateTotalPrice()}
              </Box>
              <Box
                bg="gray.100"
                borderRadius={5}
                color="black"
                p={2}
                ml={3}
                boxShadow="sm"
                fontWeight="medium"
                mt={{ base: 4, md: 0 }}
              >
                Total Items:{" "}
                {Object.values(totalItems).reduce(
                  (acc, current) => acc + current,
                  0
                )}
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
        <Flex
          mt={6}
          direction={useBreakpointValue({ base: "column", md: "row" })}
        >
          <Button
            w={{ base: "100%", md: "48%" }}
            colorScheme="white"
            color="red"
            border="1px"
            borderColor="red"
            boxShadow="sm"
            fontWeight="medium"
          >
            Discard
          </Button>
          <Spacer />
          <Button
            colorScheme="gray"
            color={textColor}
            w={{ base: "100%", md: "48%" }}
            boxShadow="sm"
            fontWeight="medium"
            mt={{ base: 4, md: 0 }}
            onClick={createNewOrder}
          >
            Create Sale Order
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default NewSaleOrder;