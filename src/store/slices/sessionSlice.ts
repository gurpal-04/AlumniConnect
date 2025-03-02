import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/DiscussionForum.types";

interface SessionState {
  currentUser: User | null;
  currentChannelId: string;
}

// Initial session state
const initialState: SessionState = {
  currentUser: null,
  currentChannelId: "general",
};

// Load session from localStorage if available
const loadInitialState = (): SessionState => {
  try {
    const storedCurrentUser = localStorage.getItem("currentUser");
    return {
      currentUser: storedCurrentUser ? JSON.parse(storedCurrentUser) : null,
      currentChannelId: "general",
    };
  } catch (error) {
    console.error("Failed to load session from localStorage:", error);
    return initialState;
  }
};

const sessionSlice = createSlice({
  name: "session",
  initialState: loadInitialState(),
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      if (action.payload) {
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("currentUser");
      }
    },
    switchChannel: (state, action: PayloadAction<string>) => {
      state.currentChannelId = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { setCurrentUser, switchChannel, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
