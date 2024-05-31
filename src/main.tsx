import './index.css';

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import {  MultiSelectTheme } from 'chakra-multiselect'

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Custom theme configuration
const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Poppins', sans-serif`
};

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const components = {
  MultiSelect: MultiSelectTheme
};

const theme = extendTheme({ fonts, components, config });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);