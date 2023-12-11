import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SessionProvider } from './services/session/index';
import { ApiProvider } from "./services/api/apiContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ApiProvider>
  </React.StrictMode>,
)
