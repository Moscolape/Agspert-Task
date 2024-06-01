import { ReactNode } from "react"; // Importing ReactNode type for children
import Header from "./header"; // Importing header component
import { Box, Spacer } from "@chakra-ui/react"; // Importing Box and Spacer components from Chakra UI

// Define type for Wrapper component props
type WrapperProps = {
  children: ReactNode; // Children prop can be any ReactNode
};

// Wrapper component
const Wrapper: React.FC<WrapperProps> = ({children}) => {
  return (
    <>
      <Header /> {/* Render Header component */}
      <Spacer /> {/* Spacer component for separation */}
      <Box>
        {children} {/* Render children components */}
      </Box>
    </>
  )
}

export default Wrapper; // Export Wrapper component as default
