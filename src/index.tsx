import "./polyfills";
import React from "react";
import { createRoot } from 'react-dom/client';

import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./DemoPages/Main";
import configureAppStore from "./config/configureStore";
import { Provider } from "react-redux";
import validateConfig, { printConfig } from "./config/validator";
import { CONFIG } from "./config/constants";
import { headerData } from "./data";

// Validate configuration before starting app
if (!validateConfig()) {
  console.error('❌ Configuration validation failed. Please check your environment variables.');
  if (CONFIG.BUILD.IS_PRODUCTION) {
    // In production, halt startup on critical errors
    throw new Error('Invalid configuration - cannot start application');
  }
}

// Print configuration in development
if (CONFIG.BUILD.IS_DEVELOPMENT && CONFIG.FEATURES.ENABLE_DEBUG_MODE) {
  printConfig();
}

// Set document title from header data
document.title = `IBM - ${headerData.applicationName}`;

const store = configureAppStore();
const rootElement = document.getElementById("root");

const renderApp = (Component: React.ComponentType) => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Component />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(renderApp(Main));
}

// Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept("./DemoPages/Main", (newModule) => {
    if (newModule) {
      root.render(renderApp(newModule.default));
    }
  });
}