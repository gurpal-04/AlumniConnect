import React from "react";
import { useAppHooks } from "../hooks/useAppHooks";
import { X, Shield, UserX, UserCheck } from "lucide-react";

const UserManagement: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { users, banUser, unbanUser, promoteToAdmin, currentUser } =
    useAppHooks();

  // Filter out the current user
  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">User Management</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-96">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-2 rounded-tl-md">User</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-gray-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.role === "admin" ? "bg-indigo-600" : "bg-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.banned ? "bg-red-600" : "bg-green-600"
                      }`}
                    >
                      {user.banned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => promoteToAdmin(user.id)}
                          className="p-1 bg-indigo-600 rounded hover:bg-indigo-700 text-white"
                          title="Promote to Admin"
                        >
                          <Shield size={16} />
                        </button>
                      )}

                      {user.banned ? (
                        <button
                          onClick={() => unbanUser(user.id)}
                          className="p-1 bg-green-600 rounded hover:bg-green-700 text-white"
                          title="Unban User"
                        >
                          <UserCheck size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => banUser(user.id)}
                          className="p-1 bg-red-600 rounded hover:bg-red-700 text-white"
                          title="Ban User"
                        >
                          <UserX size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-3 text-center text-gray-400"
                  >
                    No other users have joined yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
