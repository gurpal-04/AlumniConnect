import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MessageCircle } from "lucide-react";
import { setCurrentUser } from "../../store/slices/sessionSlice";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../store/types/DiscussionForum.types";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const newUser: User = {
        id: uuidv4(),
        username: username.trim(),
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        role: "admin",
        banned: false,
      };
      dispatch(setCurrentUser(newUser));
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-700 rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <MessageCircle size={40} className="text-indigo-400 mr-2" />
          <h1 className="text-3xl font-bold text-white">DiscussHub</h1>
        </div>

        <h2 className="text-xl text-white mb-6 text-center">
          Join the conversation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Enter Forum
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          By entering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
