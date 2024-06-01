import React, { useState, useEffect } from "react";
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
  Text,
  Textarea,
  useColorModeValue,
  Checkbox,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SaleOrder, SaleOrderItem } from "../../schemas/sale-order";

interface Order {
  order: SaleOrder | null;
  open: boolean;
  close: () => void;
  updateOrder: (order: SaleOrder) => void;
}

const EditSaleOrder: React.FC<Order> = ({ order, open, close, updateOrder }) => {
  const [customerId, setCustomerId] = useState<number | string>(order?.customer_id || "");
  const [customerName, setCustomerName] = useState(order?.customer_name || "");
  const [isPaid, setIsPaid] = useState(order?.paid || false);
  const [items, setItems] = useState<SaleOrderItem[]>(order?.items || []);
  const [totalPrice, setTotalPrice] = useState(0);

  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [items]);

  const handleUpdate = () => {
    if (order) {
      const updatedOrder: SaleOrder = {
        ...order,
        customer_id: typeof customerId === 'string' ? parseInt(customerId) : customerId,
        customer_name: customerName,
        paid: isPaid,
        items: items,
        total_price: totalPrice,
        last_modified: new Date().toISOString()
      };
      updateOrder(updatedOrder);
    }
  };

  const handleItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newItems = e.target.value.split("\n").map((line) => {
      const [skuId, rest] = line.split(" => ");
      const [quantity, price] = rest.split(" x ").map(Number);
      return { sku_id: parseInt(skuId.replace("SKU_ID ", "")), quantity, price };
    });
    setItems(newItems);
  };

  const modalSize = useBreakpointValue({ base: "full", md: "xl" });

  return (
    <Modal isOpen={open} onClose={close} size={modalSize} isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        p={6}
        fontFamily="Inter"
        height={{ base: "100vh", md: "75vh" }}
        animation="animate-bump"
        bg={modalBg}
        borderRadius={{ base: "0", md: "md" }}
      >
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center">
          <Text fontWeight="semibold" color={textColor} fontSize="2xl">
            Edit Sale Order
          </Text>
        </ModalHeader>
        <ModalBody
          overflowY="scroll"
          height={{ base: "calc(100vh - 140px)", md: "60vh" }}
          className="custom-scrollbar-example"
        >
          <Box mb={5}>
            <Text fontWeight="medium">Customer Id</Text>
            <Input
              mt={3}
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              readOnly={order?.paid === true}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            />
          </Box>
          <Box mb={5}>
            <Text fontWeight="medium">Customer Name</Text>
            <Input
              mt={3}
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              readOnly={order?.paid === true}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            />
          </Box>
          {order?.paid === false && (
            <Box mb={5}>
              <Checkbox
                colorScheme="red"
                size="lg"
                isChecked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
              >
                Is Paid
              </Checkbox>
            </Box>
          )}
          <Box mb={5}>
            <Text fontWeight="medium">Items Purchased</Text>
            <Textarea
              mt={3}
              height="10rem"
              resize="none"
              p={2}
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
              value={items
                .map((item) => `SKU_ID ${item.sku_id} => ${item.quantity} x ${item.price}`)
                .join("\n")}
              onChange={handleItemsChange}
              readOnly={order?.paid === true}
            />
          </Box>
          <Box mb={5}>
            <Text fontWeight="medium">Total Price</Text>
            <Input
              mt={3}
              type="text"
              value={totalPrice}
              readOnly
              outline="none"
              _focus={{ boxShadow: "none", borderColor: "gray.300" }}
            />
          </Box>
        </ModalBody>
        <Flex justify="center" mt={6}>
          <Button
            colorScheme="red"
            fontWeight="medium"
            onClick={order?.paid ? close : handleUpdate}
          >
            {order?.paid ? "Close" : "Update"}
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default EditSaleOrder;