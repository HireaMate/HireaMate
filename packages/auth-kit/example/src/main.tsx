import React from 'react'
import ReactDOM from 'react-dom/client'
import { SafeThemeProvider } from '@safe-global/safe-react-components'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Header from "./Header";
import Post1 from "./Post1";

import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SafeThemeProvider mode="dark">
      {(safeTheme) => (
        <ThemeProvider theme={safeTheme}>
          <CssBaseline />
          <div className="App">
          <App />
          </div>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  </React.StrictMode>
)

