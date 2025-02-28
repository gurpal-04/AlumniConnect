export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  package: string;
  type: JobType;
  category: JobCategory;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobType {
  FULL_TIME = "Full-time",
  PART_TIME = "Part-time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
}

export enum JobCategory {
  ENGINEERING = "Engineering",
  DESIGN = "Design",
  MARKETING = "Marketing",
  SALES = "Sales",
  CUSTOMER_SERVICE = "Customer Service",
  FINANCE = "Finance",
  HUMAN_RESOURCES = "Human Resources",
  OTHER = "Other",
}

export interface JobFilter {
  search?: string;
  location?: string;
  package?: string;
  type?: JobType;
  category?: JobCategory;
}
