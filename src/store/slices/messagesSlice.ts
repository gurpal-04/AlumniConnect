import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../../types";
import { deleteChannel } from "./channelsSlice";

// Initial messages state
const initialMessages: Message[] = [
  {
    id: uuidv4(),
    content: "Welcome to the general channel!",
    userId: "1",
    channelId: "general",
    timestamp: Date.now(),
  },
];

// Load messages from localStorage if available
const loadInitialState = (): Message[] => {
  try {
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : initialMessages;
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
    return initialMessages;
  }
};

const messagesSlice = createSlice({
  name: "messages",
  initialState: loadInitialState(),
  reducers: {
    sendMessage: (
      state,
      action: PayloadAction<{
        content: string;
        userId: string;
        channelId: string;
      }>
    ) => {
      const { content, userId, channelId } = action.payload;
      const newMessage: Message = {
        id: uuidv4(),
        content,
        userId,
        channelId,
        timestamp: Date.now(),
      };
      state.push(newMessage);
      localStorage.setItem("messages", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    // When a channel is deleted, remove all messages in that channel
    builder.addCase(deleteChannel, (state, action) => {
      const channelId = action.payload;
      if (!channelId) return state;

      const newState = state.filter(
        (message) => message.channelId !== channelId
      );
      localStorage.setItem("messages", JSON.stringify(newState));
      return newState;
    });
  },
});

export const { sendMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
