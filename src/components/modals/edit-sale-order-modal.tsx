import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { SaleOrder } from "../../schemas/sale-order";

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

  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const handleUpdate = () => {
    if (order) {
      const updatedOrder: SaleOrder = {
        ...order,
        customer_id: typeof customerId === 'string' ? parseInt(customerId) : customerId,
        customer_name: customerName,
        paid: isPaid
      };
      updateOrder(updatedOrder);
    }
  };

  return (
    <Modal isOpen={open} onClose={close} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        p={6}
        fontFamily="Inter"
        height="75vh"
        animation="animate-bump"
        bg={modalBg}
      >
        <ModalCloseButton onClick={close} />
        <ModalHeader display="flex" justifyContent="center">
          <Text fontWeight="medium" color={textColor} fontSize="2xl">
            Edit Sale Order
          </Text>
        </ModalHeader>
        <ModalBody
          overflowY="scroll"
          height="60vh"
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
              defaultValue={order?.items
                .map((item) => `SKU_ID ${item.sku_id} => ${item.quantity} x ${item.price}`)
                .join("\n")}
              readOnly={order?.paid === true}
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