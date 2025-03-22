import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles'; // Dùng ThemeProvider thay vì CssVarsProvider
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";
import { useAuth0 } from '@auth0/auth0-react'
import { Auth0Provider } from '@auth0/auth0-react'
import {RENDER_API_ENDPOINT} from '~/config/constants'



import theme from './theme'; 
// const { isAuthenticated } = useAuth0()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
    <ThemeProvider theme={theme}> {/* Dùng ThemeProvider */}
      <ConfirmProvider defaultOptions={{
          dialogProps: {
            closeAfterTransition: false,
          }
        }}>

      <CssBaseline />
      <Auth0Provider domain='dev-rr6ouqri7yjg6uzm.us.auth0.com' 
      clientId='H6zUG7fgh9z7JdXAtGtsjjdff9amfFVS' 
      cacheLocation='localstorage'
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: RENDER_API_ENDPOINT
  }}>

        <App /> 

      </Auth0Provider>
      </ConfirmProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
