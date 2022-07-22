import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authenticationSlice";
import productsSlice from "./slices/productsSlice";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"],
};

const allMySliceReducersReducer = combineReducers({
  products: productsSlice.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  allMySliceReducersReducer
);

// STORE
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
