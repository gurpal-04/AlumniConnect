import { Job, JobType, JobCategory, JobFilter } from "../types";
import { v4 as uuidv4 } from "uuid";

// Initial mock data
const mockJobs: Job[] = [
  {
    id: uuidv4(),
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    description:
      "We are looking for a skilled Frontend Developer to join our team. The ideal candidate should have experience with React, TypeScript, and modern CSS frameworks.",
    package: "$120,000 - $150,000",
    type: JobType.FULL_TIME,
    category: JobCategory.ENGINEERING,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "UX Designer",
    company: "DesignHub",
    location: "Remote",
    description:
      "Join our design team to create beautiful and intuitive user experiences. You should have a strong portfolio and experience with Figma and user research.",
    package: "$90,000 - $120,000",
    type: JobType.FULL_TIME,
    category: JobCategory.DESIGN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Marketing Intern",
    company: "GrowthLabs",
    location: "New York, NY",
    description:
      "Looking for a marketing intern to assist with social media campaigns, content creation, and market research.",
    package: "$25/hour",
    type: JobType.INTERNSHIP,
    category: JobCategory.MARKETING,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Austin, TX",
    description:
      "Seeking a backend engineer with experience in Node.js, databases, and API design to help scale our infrastructure.",
    package: "$130,000 - $160,000",
    type: JobType.FULL_TIME,
    category: JobCategory.ENGINEERING,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Part-time Sales Associate",
    company: "RetailPlus",
    location: "Chicago, IL",
    description:
      "Join our retail team to assist customers, manage inventory, and drive sales in our flagship store.",
    package: "$22/hour",
    type: JobType.PART_TIME,
    category: JobCategory.SALES,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Local storage key
const JOBS_STORAGE_KEY = "jobPostings";

// Load jobs from localStorage or use mock data
export const loadJobs = (): Job[] => {
  const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
  if (storedJobs) {
    const parsedJobs = JSON.parse(storedJobs);
    return parsedJobs.map((job: any) => ({
      ...job,
      createdAt: new Date(job.createdAt),
      updatedAt: new Date(job.updatedAt),
    }));
  }

  // If no stored jobs, save and return mock data
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(mockJobs));
  return mockJobs;
};

// Save jobs to localStorage
export const saveJobs = (jobs: Job[]): void => {
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
};

// CRUD operations
export const getJobs = (): Job[] => {
  return loadJobs();
};

export const getJobById = (id: string): Job | undefined => {
  const jobs = loadJobs();
  return jobs.find((job) => job.id === id);
};

export const createJob = (
  job: Omit<Job, "id" | "createdAt" | "updatedAt">
): Job => {
  const jobs = loadJobs();
  const newJob: Job = {
    ...job,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  jobs.push(newJob);
  saveJobs(jobs);
  return newJob;
};

export const updateJob = (
  id: string,
  updates: Partial<Omit<Job, "id" | "createdAt" | "updatedAt">>
): Job | undefined => {
  const jobs = loadJobs();
  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) return undefined;

  const updatedJob: Job = {
    ...jobs[jobIndex],
    ...updates,
    updatedAt: new Date(),
  };

  jobs[jobIndex] = updatedJob;
  saveJobs(jobs);
  return updatedJob;
};

export const deleteJob = (id: string): boolean => {
  const jobs = loadJobs();
  const filteredJobs = jobs.filter((job) => job.id !== id);

  if (filteredJobs.length === jobs.length) return false;

  saveJobs(filteredJobs);
  return true;
};

// Filter jobs
export const filterJobs = (jobs: Job[], filters: Partial<JobFilter>): Job[] => {
  return jobs.filter((job) => {
    // Search filter (searches in title, company, and description)
    if (
      filters.search &&
      !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !job.company.toLowerCase().includes(filters.search.toLowerCase()) &&
      !job.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location &&
      !job.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Package filter
    if (
      filters.package &&
      !job.package.toLowerCase().includes(filters.package.toLowerCase())
    ) {
      return false;
    }

    // Job type filter
    if (filters.type && job.type !== filters.type) {
      return false;
    }

    // Job category filter
    if (filters.category && job.category !== filters.category) {
      return false;
    }

    return true;
  });
};
