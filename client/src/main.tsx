import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme.ts';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
)
