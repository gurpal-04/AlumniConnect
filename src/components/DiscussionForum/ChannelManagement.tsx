import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, X } from "lucide-react";
import { deleteChannel } from "../../store/slices/channelsSlice";

const ChannelManagement: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state: any) => state.channels);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Channel Management</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-96">
          <ul className="divide-y divide-gray-600">
            {channels.map((channel: any) => (
              <li
                key={channel?.id}
                className="py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">#{channel?.name}</p>
                  {channel.description && (
                    <p className="text-sm text-gray-400">
                      {channel?.description}
                    </p>
                  )}
                </div>

                {!channel?.isDefault && (
                  <button
                    onClick={() => dispatch(deleteChannel(channel?.id))}
                    className="p-1.5 bg-red-600 rounded hover:bg-red-700 text-white"
                    title="Delete Channel"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {channel.isDefault && (
                  <span className="text-xs text-gray-400 italic">
                    Default channel
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChannelManagement;
