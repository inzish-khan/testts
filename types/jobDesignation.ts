export interface JobDesignation {
  id: string;
  jobTitle: string;
  department: string;
  level?: string;
  reportsTo?: string;
  employmentType: string;
  location?: string;
  createdAt: string;
}
