import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatProvider from "./Context/ChatProvider"
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
// BrowserRouter is a router implementation that uses the HTML5 history API(pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
    
  </ChatProvider>
);
