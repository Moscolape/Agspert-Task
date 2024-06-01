import React, { useState, useEffect } from "react";
import {
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Spinner,
  Text,
  useBreakpointValue,
  Stack,
  Button,
} from "@chakra-ui/react";
import { More } from "../../constants/assets";
import { useQuery } from "@tanstack/react-query";

import { SaleOrder, SaleOrderItem, SaleOrders } from "../../schemas/sale-order";
import EditSaleOrder from "../modals/edit-sale-order-modal";
import moment from "moment";

// Mock fetch function
const fetchSaleOrders = (): Promise<SaleOrder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SaleOrders);
    }, 2000);
  });
};

interface SalesProps {
  activeTab: string;
}

const SalesOrders: React.FC<SalesProps> = ({ activeTab }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);
  const [orders, setOrders] = useState<SaleOrder[]>([]);

  const Edit = (order: SaleOrder) => {
    setOpenEdit(true);
    setSelectedOrder(order);
  };

  const closeEdit = () => {
    setOpenEdit(false);
    setSelectedOrder(null);
  };

  const updateOrder = (updatedOrder: SaleOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.invoice_no === updatedOrder.invoice_no ? updatedOrder : order
      )
    );
    closeEdit();
  };

  const { data, error, isLoading } = useQuery<SaleOrder[], Error>({
    queryKey: ["saleOrders"],
    queryFn: fetchSaleOrders,
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Spinner size="xl" color="#EE1B24" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Text>Failed to load sale orders: {error.message}</Text>
      </Box>
    );
  }

  const filteredOrders = orders.filter((order) =>
    activeTab === "active" ? !order.paid : order.paid
  );


  return (
    <TableContainer>
      {isMobile ? (
        <Stack spacing={4}>
          {filteredOrders.map((order: SaleOrder) => (
            <Box key={order.invoice_no} p={4} borderWidth="1px" borderRadius="lg">
              <Text>ID: {order.customer_id}</Text>
              <Text>Customer Name: {order.customer_name}</Text>
              <Text>
                Price:{" "}
                {order.items.reduce(
                  (total: number, item: SaleOrderItem) =>
                    total + item.price * item.quantity,
                  0
                )}
              </Text>
              <Text>
                Last Modified:{" "}
                {moment(order.last_modified ? order.last_modified : order.invoice_date).format(
                  "DD/MM/YYYY"
                )}{" "}
                (
                {moment(order.last_modified ? order.last_modified : order.invoice_date).format(
                  "LT"
                )}
                )
              </Text>
              <Button mt={2} onClick={() => Edit(order)} rightIcon={<Image src={More} />}>
                Edit/View
              </Button>
            </Box>
          ))}
        </Stack>
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
              <Th>Last Modified</Th>
              <Th isNumeric>Edit/View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map((order: SaleOrder) => (
              <Tr key={order.invoice_no}>
                <Td>{order.customer_id}</Td>
                <Td>{order.customer_name}</Td>
                <Td>
                  {order.items.reduce(
                    (total: number, item: SaleOrderItem) =>
                      total + item.price * item.quantity,
                    0
                  )}
                </Td>
                <Td>
                  {moment(order.last_modified ? order.last_modified : order.invoice_date).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  ({moment(order.last_modified ? order.last_modified : order.invoice_date).format(
                    "LT"
                  )})
                </Td>
                <Td>
                  <Box cursor="pointer" display="flex" justifyContent="flex-end">
                    <Image src={More} onClick={() => Edit(order)} />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {openEdit && selectedOrder && (
        <EditSaleOrder open={openEdit} close={closeEdit} order={selectedOrder} updateOrder={updateOrder} />
      )}
    </TableContainer>
  );
};

export default SalesOrders;