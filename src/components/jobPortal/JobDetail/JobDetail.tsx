import React from "react";
import { Job } from "../types";
import { MapPin, DollarSign, Calendar, Building, Tag } from "lucide-react";

interface JobDetailProps {
  job: Job;
  onBack: () => void;
  onEdit: (id: string) => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onBack, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
          <div className="flex items-center mt-2">
            <Building size={18} className="text-gray-500 mr-2" />
            <span className="text-lg text-gray-700">{job.company}</span>
          </div>
        </div>
        <span
          className="px-4 py-1 text-sm font-medium rounded-full"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-center">
          <MapPin size={20} className="text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium text-gray-900">{job.location}</p>
          </div>
        </div>

        <div className="flex items-center">
          <DollarSign size={20} className="text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-medium text-gray-900">{job.package}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Tag size={20} className="text-gray-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium text-gray-900">{job.category}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Job Description
        </h3>
        <div className="prose max-w-none text-gray-700">
          <p className="whitespace-pre-line">{job.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
          {job.updatedAt > job.createdAt && (
            <span className="ml-2">
              (Updated: {new Date(job.updatedAt).toLocaleDateString()})
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Jobs
          </button>
          <button
            onClick={() => onEdit(job.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
