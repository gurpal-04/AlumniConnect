
import React, { useState } from 'react';
import { useAppSelector } from './store';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import UserManagement from './components/UserManagement';
import ChannelManagement from './components/ChannelManagement';
import { Users, Settings } from 'lucide-react';

function DiscussionForum() {
  const currentUser = useAppSelector(state => state.session.currentUser);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showChannelManagement, setShowChannelManagement] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatArea />
      </div>
      
      {/* Admin Controls */}
      {currentUser.role === 'admin' && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
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