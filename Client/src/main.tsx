import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { environment } from '../Environment/environment.js'
import React from 'react'
const rootElement = document.getElementById('root');
const clientId = environment.GG_CLIENT_ID
if (rootElement) {
  createRoot(rootElement).render(
      <GoogleOAuthProvider clientId={clientId}>
        <App/>
      </GoogleOAuthProvider>
  );
} else {
  throw new Error("Root element not found");
}
