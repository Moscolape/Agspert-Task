import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Custom theme configuration
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  }
};

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Poppins', sans-serif`
};

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);