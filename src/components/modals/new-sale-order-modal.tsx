
import React, { useEffect, useState } from "react"; // Import React and necessary hooks
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
  FormControl,
  FormLabel,
} from "@chakra-ui/react"; // Import necessary components from Chakra UI
import { Customers } from "../../schemas/customers"; // Import Customers data
import { Products } from "../../schemas/products"; // Import Products data
import { SaleOrder } from "../../schemas/sale-order"; // Import SaleOrder interface
import useCustomMultiSelect from "../../utils/custom-hook"; // Import custom hook
import { MultiSelect } from "chakra-multiselect"; // Import MultiSelect component

// Define props interface for NewSaleOrder component
interface Order {
  open: boolean; // Flag to control modal visibility
  close: () => void; // Function to close the modal
  add: (params: SaleOrder) => void; // Function to add a new sale order
}

// NewSaleOrder component
const NewSaleOrder: React.FC<Order> = ({ open, close, add }) => {
  // Prepare product options for MultiSelect
  const productOptions = Products.map((product) => ({
    label: product.name,
    value: product.id.toString(),
  }));

  // Custom hook for handling MultiSelect functionality
  const { value, options, onChange } = useCustomMultiSelect(productOptions);

  // State variables for managing form data
  const [isPaid, setIsPaid] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // Function to create a new sale order
  const createNewOrder = () => {
    if (!invoiceNo || !invoiceDate || !selectedCustomer || calculateTotalPrice() === 0) {
      return;
    }

    // Prepare items for the new sale order
    const items = Object.keys(totalItems).map((skuId) => ({
      sku_id: parseInt(skuId),
      price: sellingRates[skuId],
      quantity: totalItems[skuId],
    }));

    // Prepare the new sale order object
    const newSaleOrder = {
      invoice_no: invoiceNo,
      invoice_date: invoiceDate,
      customer_id: Math.floor(10000 + Math.random() * 90000),
      customer_name: selectedCustomer,
      price: calculateTotalPrice(),
      paid: isPaid,
      items: items,
    };

    // Add the new sale order and close the modal
    add(newSaleOrder);
    close();
  };

  // State variables for managing product quantities and selling rates
  const [totalItems, setTotalItems] = useState<{ [productId: string]: number }>({});
  const [sellingRates, setSellingRates] = useState<{ [skuId: string]: number }>({});

  // Reset fields when product selection changes
  useEffect(() => {
    if (Array.isArray(value) && value.length === 0) {
      setTotalItems({});
      setSellingRates({});
    }
  }, [value]);

  // Function to render all customer options
  const renderAllCustomers = () => {
    return Customers.map((customer, index) => (
      <option key={index} value={customer.customer_profile.name}>
        {customer.customer_profile.name}
      </option>
    ));
  };

  // Color mode values
  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  // Responsive design values
  const modalWidth = useBreakpointValue({ base: "90%", md: "2xl" });
  const boxWidth = useBreakpointValue({ base: "100%", md: "45%" });

  // Event handler for quantity change
  const handleQuantityChange = (
    productId: string,
    skuId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const parsedValue = parseInt(value);

    const product = Products.find((p) => p.id.toString() === productId);
    const sku = product?.sku.find((s) => s.id.toString() === skuId);
    const maxQuantity = sku?.quantity_in_inventory || 0;

    if (parsedValue > maxQuantity) {
      // Show an alert if the entered quantity exceeds available quantity
      alert(`Quantity cannot exceed available stock (${maxQuantity}).`);
      return;
    }

    setTotalItems((prevTotalItems) => {
      const updatedTotalItems = { ...prevTotalItems };
      updatedTotalItems[skuId] = parsedValue;
      return updatedTotalItems;
    });
  };

  // Event handler for selling rate change
  const handleSellingRateChange = (
    skuId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);

    setSellingRates((prevSellingRates) => {
      const updatedSellingRates = { ...prevSellingRates };
      updatedSellingRates[skuId] = parsedValue;
      return updatedSellingRates;
    });
  };

  // Function to calculate total price of the sale order
  const calculateTotalPrice = () => {
    return Object.entries(totalItems).reduce((acc, [skuId, quantity]) => {
      const sellingRate = sellingRates[skuId] || 0;
      return acc + quantity * sellingRate;
    }, 0);
  };

  // Function to reset all fields
  const resetFields = () => {
    setInvoiceNo("");
    setInvoiceDate("");
    setSelectedCustomer("");
    setTotalItems({});
    setSellingRates({});
    setIsPaid(false);
    onChange([]);
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
            <FormControl mb={5} w={boxWidth} isRequired>
              <FormLabel fontWeight="medium">Invoice Number</FormLabel>
              <Input
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </FormControl>
            <Spacer />
            <FormControl mb={5} w={boxWidth} isRequired>
              <FormLabel fontWeight="medium">Invoice Date</FormLabel>
              <Input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                outline="none"
                _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              />
            </FormControl>
          </Flex>
          <FormControl mb={5} isRequired>
            <FormLabel fontWeight="medium">Customer</FormLabel>
            <Select
              placeholder="Select a customer"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            >
              {renderAllCustomers()}
            </Select>
          </FormControl>
          <FormControl mb={5} isRequired>
            <FormLabel fontWeight="medium">All Products</FormLabel>
            <MultiSelect
              options={options}
              value={value}
              onChange={onChange}
              placeholder="Select product(s)"
            />
          </FormControl>
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
                                  <FormControl mb={5} w={boxWidth}>
                                    <FormLabel fontWeight="medium">
                                      Selling Rate
                                    </FormLabel>
                                    <Input
                                      placeholder="Enter selling rate"
                                      onChange={(e) =>
                                        handleSellingRateChange(
                                          unit.id.toString(),
                                          e
                                        )
                                      }
                                      outline="none"
                                      _focus={{
                                        boxShadow: "none",
                                        borderColor: "gray.300",
                                      }}
                                    />
                                  </FormControl>
                                  <Spacer />
                                  <FormControl mb={5} w={boxWidth}>
                                    <FormLabel fontWeight="medium">
                                      Total Items
                                    </FormLabel>
                                    <Input
                                      type="number"
                                      placeholder="Enter quantity"
                                      max={
                                        unit.quantity_in_inventory
                                          ? unit.quantity_in_inventory
                                          : undefined
                                      }
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          String(selectedProduct.value),
                                          unit.id.toString(),
                                          e
                                        )
                                      }
                                      outline="none"
                                      _focus={{
                                        boxShadow: "none",
                                        borderColor: "gray.300",
                                      }}
                                    />
                                  </FormControl>
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
                                {`${
                                  unit.quantity_in_inventory -
                                    totalItems[unit.id] ||
                                  unit.quantity_in_inventory
                                } items remaining`}
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
            <Checkbox
              colorScheme="red"
              size="lg"
              isChecked={isPaid}
              onChange={() => setIsPaid(!isPaid)}
            >
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
            onClick={resetFields}
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
