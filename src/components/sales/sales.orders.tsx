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
} from "@chakra-ui/react";
import { More } from "../../constants/assets";

const SalesOrders = () => {
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
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
            <Td>25.4</Td>
            <Td>
              <Box cursor='pointer' display="flex" justifyContent="flex-end">
                <Image src={More} />
              </Box>
            </Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td>30.48</Td>
            <Td>30.48</Td>
            <Td>
              <Box cursor='pointer' display="flex" justifyContent="flex-end">
                <Image src={More} />
              </Box>
            </Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td>0.91444</Td>
            <Td>0.91444</Td>
            <Td>
              <Box cursor='pointer' display="flex" justifyContent="flex-end">
                <Image src={More} />
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SalesOrders;