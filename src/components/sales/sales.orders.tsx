import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { More } from "../../constants/assets";
import { useQuery } from "@tanstack/react-query";

import { SaleOrder, SaleOrderItem, SaleOrders } from "../../schemas/sale-order";
import EditSaleOrder from "../modals/edit-sale-order-modal";


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


const SalesOrders: React.FC<SalesProps> = ({activeTab}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);

  const Edit = (order: SaleOrder) => {
    setOpenEdit(true);
    setSelectedOrder(order);
  }

  const closeEdit = () => {
    setOpenEdit(false);
  }

  const { data, error, isLoading } = useQuery<SaleOrder[], Error>({
    queryKey: ["saleOrders"],
    queryFn: fetchSaleOrders,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Spinner size="xl" color="#EE1B24"/>
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

  const filteredOrders = data?.filter(order => activeTab === "active" ? !order.paid : order.paid);

  return (
    <TableContainer>
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
          {filteredOrders?.map((order: SaleOrder) => (
            <Tr key={order.invoice_no}>
              <Td>{order.customer_id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>
                {order.items.reduce(
                  (total: number, item: SaleOrderItem) => total + item.price * item.quantity,
                  0
                )}
              </Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <Box cursor="pointer" display="flex" justifyContent="flex-end">
                  <Image src={More} onClick={() => Edit(order)}/>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {openEdit && <EditSaleOrder open={openEdit} close={closeEdit} order={selectedOrder}/>}
    </TableContainer>
  );
};

export default SalesOrders;