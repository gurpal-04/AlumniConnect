export interface User {
  id: string;
  username: string;
  avatar: string;
  role: "admin" | "user";
  banned: boolean;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  timestamp: number;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
}
