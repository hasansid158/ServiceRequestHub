import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";

import { ThemeProvider } from '@mui/material';
import theme from './core/theme.js';

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)
