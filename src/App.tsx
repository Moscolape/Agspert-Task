import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Flex, Spinner } from '@chakra-ui/react';

const Login = lazy(() => import("./pages/login"));
const Sales = lazy(() => import("./pages/sales"));

function App() {
  return (
    <Suspense fallback={
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner color='red.500' speed='0.65s' thickness='5px' size='xl' emptyColor='gray.200' />
      </Flex>
    }>
      <Router>
        <div className="">
          <Routes>
            {/* Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;