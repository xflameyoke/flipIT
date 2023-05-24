import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { theme, GlobalStyle, componentsTheme } from 'styles';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ConfigProvider theme={componentsTheme}>
        <App />
      </ConfigProvider>
    </ThemeProvider>
  </BrowserRouter>
);
