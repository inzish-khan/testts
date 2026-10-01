"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./job-designations.module.css";

interface FormData {
  jobTitle: string;
  department: string;
  level: string;
  reportsTo: string;
  employmentType: string;
  location: string;
}

interface FormErrors {
  jobTitle?: string;
  department?: string;
  employmentType?: string;
}

interface SuccessData {
  id: string;
  jobTitle: string;
  department: string;
  level?: string;
  reportsTo?: string;
  employmentType: string;
  location?: string;
  createdAt: string;
}

export default function JobDesignationsPage() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    department: "",
    level: "",
    reportsTo: "",
    employmentType: "",
    location: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    console.log("what is up");
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required";
    }
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.employmentType.trim()) {
      newErrors.employmentType = "Employment Type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/job-designations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(
          errorData.error || "An error occurred while submitting the form"
        );
        return;
      }

      const result = await response.json();
      setSuccessData(result);
      setFormData({
        jobTitle: "",
        department: "",
        level: "",
        reportsTo: "",
        employmentType: "",
        location: "",
      });
    } catch (error) {
      setServerError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Job Designation Form</h1>

      {successData && (
        <div className={styles.successMessage}>
          <div>✓ Job designation submitted successfully!</div>
          <div className={styles.successDetails}>
            <p>
              <strong>Job Title:</strong> {successData.jobTitle}
            </p>
            <p>
              <strong>Department:</strong> {successData.department}
            </p>
            <p>
              <strong>Employment Type:</strong> {successData.employmentType}
            </p>
            {successData.level && (
              <p>
                <strong>Level/Grade:</strong> {successData.level}
              </p>
            )}
            {successData.reportsTo && (
              <p>
                <strong>Reports To:</strong> {successData.reportsTo}
              </p>
            )}
            {successData.location && (
              <p>
                <strong>Location:</strong> {successData.location}
              </p>
            )}
          </div>
        </div>
      )}

      {serverError && (
        <div style={{ color: "#d32f2f", marginBottom: "1rem" }}>
          Error: {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="jobTitle" className={styles.label}>
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter job title"
          />
          {errors.jobTitle && (
            <span className={styles.error}>{errors.jobTitle}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="department" className={styles.label}>
            Department *
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter department"
          />
          {errors.department && (
            <span className={styles.error}>{errors.department}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="level" className={styles.label}>
            Level/Grade
          </label>
          <input
            type="text"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter level or grade (optional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reportsTo" className={styles.label}>
            Reports To
          </label>
          <input
            type="text"
            id="reportsTo"
            name="reportsTo"
            value={formData.reportsTo}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter reports to (optional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employmentType" className={styles.label}>
            Employment Type *
          </label>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select employment type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
          {errors.employmentType && (
            <span className={styles.error}>{errors.employmentType}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter location (optional)"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
