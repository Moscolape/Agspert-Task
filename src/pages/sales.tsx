import { Box, Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import Wrapper from "../components/general/wrapper";
import { AddIcon } from "@chakra-ui/icons";
import SalesOrders from "../components/sales/sales.orders";
import { useEffect, useState } from "react";
// import NewSaleOrder from "../components/modals/new-sale-order-modal";
import { useNavigate } from "react-router-dom";

// Sales component
const Sales = () => {
  // State to manage the active tab (active or completed)
  const [activeTab, setActiveTab] = useState<"active" | "completed">(() => {
    const storedTab = sessionStorage.getItem("activeTab");
    return storedTab === "completed" ? "completed" : "active";
  });

  // State to manage the new order modal
  const [openNewOrder, setOpenNewOrder] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to open the new order modal
  const newOrder = () => {
    setOpenNewOrder(true);
  };

  // Function to close the new order modal
  const closeOrder = () => {
    setOpenNewOrder(false);
  };

  // Function to toggle between active and completed tabs
  const toggleTab = (tab: "active" | "completed") => {
    setActiveTab(tab);
    sessionStorage.setItem("activeTab", tab);
  };

  // Effect to check if customer data is stored in session, if not, redirect to home
  useEffect(() => {
    const stored = sessionStorage.getItem('customer');
    if (!stored) {
      navigate('/');
    }
  }, [navigate]);

  // JSX rendering
  return (
    <Wrapper>
      {/* Header section */}
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        mx={{ base: "10px", md: "20px" }}
        my={{ base: "20px", md: "50px" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {/* Buttons for toggling between active and completed tabs */}
        <ButtonGroup gap="2" mb={{ base: 4, md: 0 }}>
          <Button
            colorScheme={activeTab === "active" ? "red" : "gray"}
            onClick={() => toggleTab("active")}
            size={{ base: "sm", md: "md" }}
          >
            Active Sale Orders
          </Button>
          <Button
            colorScheme={activeTab === "completed" ? "red" : "gray"}
            onClick={() => toggleTab("completed")}
            size={{ base: "sm", md: "md" }}
          >
            Completed Sale Orders
          </Button>
        </ButtonGroup>
        {/* Spacer */}
        <Spacer />
        {/* Button to open new order modal */}
        <Box p="2">
          <Button
            colorScheme="red"
            onClick={newOrder}
            size={{ base: "sm", md: "md" }}
          >
            <AddIcon />
            <Text ml="10px" display={{ base: "none", md: "inline" }}>Sale Order</Text>
          </Button>
        </Box>
      </Flex>
      {/* SalesOrders component */}
      <SalesOrders activeTab={activeTab} open={openNewOrder} close={closeOrder}/>
    </Wrapper>
  );
};

export default Sales;