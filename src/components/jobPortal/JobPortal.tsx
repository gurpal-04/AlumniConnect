import { useState, useEffect } from "react";
import { Job, JobFilter } from "./types";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  filterJobs,
} from "./data/jobs";
import { Plus, RefreshCw } from "lucide-react";
import JobDetail from "./JobDetail/JobDetail";
import JobFilterComponent from "./JobFilter/JobFilter";
import JobCard from "./JobCard/JobCard";
import Modal from "./Modal/Modal";
import JobForm from "./JobForm/JobForm";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

function JobPortal() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<JobFilter>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Apply filters when jobs or filters change
  useEffect(() => {
    if (jobs.length > 0) {
      const filtered = filterJobs(jobs, currentFilters);
      setFilteredJobs(filtered);
    }
  }, [jobs, currentFilters]);

  const loadJobs = () => {
    setIsLoading(true);
    try {
      const loadedJobs = getJobs();
      setJobs(loadedJobs);
      setFilteredJobs(loadedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJob = (
    jobData: Omit<Job, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      createJob(jobData);
      loadJobs();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleUpdateJob = (
    jobData: Omit<Job, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedJob) return;

    try {
      updateJob(selectedJob.id, jobData);
      loadJobs();
      setIsEditModalOpen(false);
      setSelectedJob(null);

      // If in view mode, exit view mode
      if (isViewMode) {
        setIsViewMode(false);
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDeleteJob = () => {
    if (!jobToDelete) return;

    try {
      deleteJob(jobToDelete);
      loadJobs();
      setIsDeleteDialogOpen(false);
      setJobToDelete(null);

      // If the deleted job is currently selected or viewed, clear it
      if (selectedJob && selectedJob.id === jobToDelete) {
        setSelectedJob(null);
        setIsViewMode(false);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const openEditModal = (id: string) => {
    const job = jobs.find((job) => job.id === id);
    if (job) {
      setSelectedJob(job);
      setIsEditModalOpen(true);

      // If in view mode, exit view mode
      if (isViewMode) {
        setIsViewMode(false);
      }
    }
  };

  const openDeleteDialog = (id: string) => {
    setJobToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const viewJobDetails = (id: string) => {
    const job = jobs.find((job) => job.id === id);
    if (job) {
      setSelectedJob(job);
      setIsViewMode(true);
    }
  };

  const handleFilterChange = (filters: JobFilter) => {
    setCurrentFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Job Board</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => loadJobs()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} className="mr-2" />
                Post Job
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isViewMode && selectedJob ? (
          <JobDetail
            job={selectedJob}
            onBack={() => setIsViewMode(false)}
            onEdit={openEditModal}
          />
        ) : (
          <>
            <JobFilterComponent onFilterChange={handleFilterChange} />

            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 mb-4">
                  {jobs.length === 0
                    ? "There are no jobs posted yet."
                    : "No jobs match your current filters."}
                </p>
                {jobs.length === 0 ? (
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} className="mr-2" />
                    Post First Job
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={openEditModal}
                    onDelete={openDeleteDialog}
                    onView={viewJobDetails}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Create Job Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Post a New Job"
      >
        <JobForm
          onSubmit={handleCreateJob}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Job Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Job"
      >
        {selectedJob && (
          <JobForm
            initialData={selectedJob}
            onSubmit={handleUpdateJob}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Job"
        message="Are you sure you want to delete this job posting? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteJob}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}

export default JobPortal;
