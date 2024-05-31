import { Box, Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import Wrapper from "../components/general/wrapper";
import { AddIcon } from "@chakra-ui/icons";
import SalesOrders from "../components/sales/sales.orders";
import { useEffect, useState } from "react";
import NewSaleOrder from "../components/modals/new-sale-order-modal";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  // State to manage the sales tab (active or completed)
  const [activeTab, setActiveTab] = useState<"active" | "completed">(() => {
    const storedTab = sessionStorage.getItem("activeTab");
    return storedTab === "completed" ? "completed" : "active";
  });

  const [openNewOrder, setOpenNewOrder] = useState(false);

  const navigate = useNavigate();

  const newOrder = () => {
    setOpenNewOrder(true);
  };

  const closeOrder = () => {
    setOpenNewOrder(false);
  };

  const toggleTab = (tab: "active" | "completed") => {
    setActiveTab(tab);
    sessionStorage.setItem("activeTab", tab);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem('customer');
    if (!stored) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Wrapper>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        mx="20px"
        my="50px"
      >
        <ButtonGroup gap="2">
          <Button
            colorScheme={activeTab === "active" ? "red" : "gray"}
            onClick={() => toggleTab("active")}
          >
            Active Sale Orders
          </Button>
          <Button
            colorScheme={activeTab === "completed" ? "red" : "gray"}
            onClick={() => toggleTab("completed")}
          >
            Completed Sale Orders
          </Button>
        </ButtonGroup>
        <Spacer />
        <Box p="2">
          <Button
            colorScheme="red"
            onClick={newOrder}
          >
            <AddIcon />
            <Text ml="10px">Sale Order</Text>
          </Button>
        </Box>
      </Flex>
      <SalesOrders activeTab={activeTab} />
      {openNewOrder && <NewSaleOrder open={openNewOrder} close={closeOrder} />}
    </Wrapper>
  );
};

export default Sales;