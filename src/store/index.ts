import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import usersReducer from "./slices/usersSlice";
import channelsReducer from "./slices/channelsSlice";
import messagesReducer from "./slices/messagesSlice";
import sessionReducer from "./slices/sessionSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for timestamps
    }),
});

// Export types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
