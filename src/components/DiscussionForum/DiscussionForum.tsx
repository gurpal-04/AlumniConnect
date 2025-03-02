import { useState } from "react";
import { Users, Settings } from "lucide-react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import Login from "./Login";
import UserManagement from "./UserManagement";
import ChannelManagement from "./ChannelManagement";
import { useSelector } from "react-redux";

function DiscussionForum() {
  const currentUser = useSelector((state: any) => state?.session?.currentUser);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showChannelManagement, setShowChannelManagement] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  console.log("currentUser11", currentUser);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <ChatArea />
      </div>

      {/* Admin Controls */}
      {currentUser.role === "admin" && (
        <div className="fixed bottom-16 right-4 flex flex-col space-y-2">
          <button
            onClick={() => setShowUserManagement(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg"
            title="User Management"
          >
            <Users size={20} />
          </button>

          <button
            onClick={() => setShowChannelManagement(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg"
            title="Channel Management"
          >
            <Settings size={20} />
          </button>
        </div>
      )}

      {/* Modals */}
      {showUserManagement && (
        <UserManagement onClose={() => setShowUserManagement(false)} />
      )}

      {showChannelManagement && (
        <ChannelManagement onClose={() => setShowChannelManagement(false)} />
      )}
    </div>
  );
}

export default DiscussionForum;
