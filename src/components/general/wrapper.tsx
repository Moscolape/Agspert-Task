import { ReactNode } from "react";
import Header from "./header"
import { Box, Spacer } from "@chakra-ui/react";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({children}) => {
  return (
    <>
      <Header />
      <Spacer />
      <Box>
        {children}
      </Box>
    </>
  )
}

export default Wrapper;