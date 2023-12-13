import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SessionProvider } from './services/session';
import { ApiProvider } from "./services/api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ApiProvider>
  </React.StrictMode>,
)
