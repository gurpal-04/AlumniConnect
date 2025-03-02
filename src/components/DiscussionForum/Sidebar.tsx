import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Hash, Users, LogOut } from "lucide-react";
import { switchChannel, logout } from "../../store/slices/sessionSlice";
import { createChannel } from "../../store/slices/channelsSlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state: any) => state?.channels);
  const currentChannel = useSelector(
    (state: any) => state?.session?.currentChannel
  );
  const currentUser = useSelector((state: any) => state?.session?.currentUser);

  const [showNewChannelModal, setShowNewChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChannelName.trim()) {
      dispatch(
        createChannel({
          name: newChannelName.trim(),
          description: newChannelDescription.trim(),
        })
      );
      setNewChannelName("");
      setNewChannelDescription("");
      setShowNewChannelModal(false);
    }
  };

  return (
    <div className="bg-gray-800 w-64 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">DiscussHub</h1>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img
              src={
                currentUser?.avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium">{currentUser?.username}</p>
            <p className="text-xs text-gray-400">{currentUser?.role}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-gray-400 uppercase text-xs font-semibold">
              Channels
            </h2>
            {currentUser?.role === "admin" && (
              <button
                onClick={() => setShowNewChannelModal(true)}
                className="text-gray-400 hover:text-white"
              >
                <Plus size={16} />
              </button>
            )}
          </div>

          <ul className="space-y-1">
            {channels.map((channel: any) => (
              <li key={channel?.id}>
                <button
                  onClick={() => dispatch(switchChannel(channel?.id))}
                  className={`flex items-center w-full px-2 py-1 rounded ${
                    currentChannel?.id === channel?.id
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Hash size={18} className="mr-1" />
                  <span className="truncate">{channel?.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center w-full px-2 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded"
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>

      {/* New Channel Modal */}
      {showNewChannelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              Create New Channel
            </h2>
            <form onSubmit={handleCreateChannel}>
              <div className="mb-4">
                <label
                  htmlFor="channelName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Channel Name
                </label>
                <input
                  type="text"
                  id="channelName"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  placeholder="e.g. announcements"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="channelDescription"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="channelDescription"
                  value={newChannelDescription}
                  onChange={(e) => setNewChannelDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  placeholder="What's this channel about?"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewChannelModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
