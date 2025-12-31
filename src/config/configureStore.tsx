import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

export default function configureAppStore() {
  // Check environment - use process.env in test/Node environment, import.meta in Vite
  const isProduction = process.env.NODE_ENV === 'production';

  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
    devTools: !isProduction,
  });
  
  return store;
}

export type RootState = ReturnType<typeof configureAppStore>['getState'];
export type AppDispatch = ReturnType<typeof configureAppStore>['dispatch'];
