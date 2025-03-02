import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Channel } from "../types/DiscussionForum.types";

// Initial channels state
const initialChannels: Channel[] = [
  {
    id: "general",
    name: "general",
    description: "General discussion channel",
    isDefault: true,
  },
];

// Load channels from localStorage if available
const loadInitialState = (): Channel[] => {
  try {
    const storedChannels = localStorage.getItem("channels");
    return storedChannels ? JSON.parse(storedChannels) : initialChannels;
  } catch (error) {
    console.error("Failed to load channels from localStorage:", error);
    return initialChannels;
  }
};

const channelsSlice = createSlice({
  name: "channels",
  initialState: loadInitialState(),
  reducers: {
    createChannel: (
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) => {
      const { name, description } = action.payload;
      const newChannel: Channel = {
        id: uuidv4(),
        name,
        description,
      };
      state.push(newChannel);
      localStorage.setItem("channels", JSON.stringify(state));
    },
    deleteChannel: (state, action: PayloadAction<string>) => {
      const channelId = action.payload;
      const channelToDelete = state.find((c) => c.id === channelId);

      // Don't delete the default channel
      if (channelToDelete?.isDefault) return;

      const newState = state.filter((channel) => channel.id !== channelId);
      localStorage.setItem("channels", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { createChannel, deleteChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
