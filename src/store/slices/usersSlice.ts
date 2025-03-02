import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/DiscussionForum.types";

// Initial users state
const initialUsers: User[] = [
  {
    id: "1",
    username: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    role: "admin",
    banned: false,
  },
];

// Load users from localStorage if available
const loadInitialState = (): User[] => {
  try {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  } catch (error) {
    console.error("Failed to load users from localStorage:", error);
    return initialUsers;
  }
};

const usersSlice = createSlice({
  name: "users",
  initialState: loadInitialState(),
  reducers: {
    addUser: (state, action: PayloadAction<{ username: string }>) => {
      const { username } = action.payload;
      const newUser: User = {
        id: uuidv4(),
        username,
        avatar: `https://images.unsplash.com/photo-${Math.floor(
          Math.random() * 1000
        )}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`,
        role: "user",
        banned: false,
      };
      state.push(newUser);
      localStorage.setItem("users", JSON.stringify(state));
    },
    banUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userIndex = state.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state[userIndex].banned = true;
        localStorage.setItem("users", JSON.stringify(state));
      }
    },
    unbanUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userIndex = state.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state[userIndex].banned = false;
        localStorage.setItem("users", JSON.stringify(state));
      }
    },
    promoteToAdmin: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userIndex = state.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state[userIndex].role = "admin";
        localStorage.setItem("users", JSON.stringify(state));
      }
    },
  },
});

export const { addUser, banUser, unbanUser, promoteToAdmin } =
  usersSlice.actions;
export default usersSlice.reducer;
