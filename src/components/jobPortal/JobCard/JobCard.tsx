import React from "react";
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <span
          className="px-3 py-1 text-xs font-medium rounded-full"
          style={{
            backgroundColor:
              job.type === "Full-time"
                ? "#e0f2fe"
                : job.type === "Part-time"
                ? "#fef3c7"
                : job.type === "Internship"
                ? "#dcfce7"
                : "#f3e8ff",
            color:
              job.type === "Full-time"
                ? "#0369a1"
                : job.type === "Part-time"
                ? "#92400e"
                : job.type === "Internship"
                ? "#166534"
                : "#6b21a8",
          }}
        >
          {job.type}
        </span>
      </div>

      <div className="mt-2 text-gray-600 font-medium">{job.company}</div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-500">
          <MapPin size={16} className="mr-2" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center text-gray-500">
          <DollarSign size={16} className="mr-2" />
          <span>{job.package}</span>
        </div>

        <div className="flex items-center text-gray-500">
          <Briefcase size={16} className="mr-2" />
          <span>{job.category}</span>
        </div>
      </div>

      <div className="mt-4 line-clamp-2 text-gray-600">{job.description}</div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView(job.id)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onEdit(job.id)}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
