import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { format } from "date-fns";
import { Send } from "lucide-react";
import { sendMessage } from "../../store/slices/messagesSlice";
// import { logout } from "../../store/slices/sessionSlice";

const ChatArea: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.session?.currentUser);
  const currentChannelId = useSelector(
    (state: any) => state?.session?.currentChannelId
  );
  const messages = useSelector((state: any) => state?.messages);
  const channels = useSelector((state: any) => state?.channels);
  const users = useSelector((state: any) => state?.users);

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChannel =
    channels.find((channel: any) => channel?.id === currentChannelId) ||
    channels[0];

  const channelMessages = messages.filter(
    (message: any) => message?.channelId === currentChannel?.id
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      dispatch(
        sendMessage({
          content: messageInput.trim(),
          userId: currentUser.id,
          channelId: currentChannel.id,
        })
      );
      setMessageInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-700">
      {/* Channel Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-white">
            #{currentChannel?.name}
          </h2>
          {currentChannel?.description && (
            <p className="ml-4 text-sm text-gray-400">
              {currentChannel.description}
            </p>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {channelMessages.map((message: any) => {
          const sender = users?.find(
            (user: any) => user?.id === message?.userId
          );
          return (
            <div key={message.id} className="flex items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3">
                <img
                  src={
                    sender?.avatar ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline">
                  <span className="font-medium text-white mr-2">
                    {sender?.username || "Unknown User"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {/* {format(new Date(message.timestamp), "MMM d, h:mm a")} */}
                    Date
                  </span>
                  {sender?.role === "admin" && (
                    <span className="ml-2 px-1.5 py-0.5 bg-indigo-600 text-xs text-white rounded">
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-gray-200 mt-1">{message.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 bg-gray-600 border border-gray-500 rounded-l-md px-4 py-2 text-white focus:outline-none"
            placeholder={`Message #${currentChannel?.name}`}
            disabled={!currentUser}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-md flex items-center justify-center"
            disabled={!messageInput.trim() || !currentUser}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
