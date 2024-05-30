import { Box, Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import Wrapper from "../components/general/wrapper";
import { AddIcon } from "@chakra-ui/icons";
import SalesOrders from "../components/sales/sales.orders";

const Sales = () => {
  return (
    <Wrapper>
      <Flex minWidth='max-content' alignItems='center' gap='2' mx='20px' my='50px'>
        <ButtonGroup gap='2'>
          <Button colorScheme='gray'>Active Sale Orders</Button>
          <Button colorScheme='gray'>Completed Sale Orders</Button>
        </ButtonGroup>
        <Spacer />
        <Box p='2'>
          <Button colorScheme='white' color='red' border='1px' borderColor='red'>
            <AddIcon />
            <Text ml='10px'>
              Sale Order
            </Text>
          </Button>
        </Box>
      </Flex>
      <SalesOrders />
    </Wrapper>
  );
};

export default Sales;
