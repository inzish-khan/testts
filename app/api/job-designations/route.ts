import { NextRequest, NextResponse } from "next/server";
import { getAllDesignations, saveDesignation } from "@/lib/jobDesignationStore";
import { JobDesignation } from "@/types/jobDesignation";

export async function GET() {
  const designations = getAllDesignations();
  return NextResponse.json(designations);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobTitle, department, level, reportsTo, employmentType, location } = body;

    const errors: Record<string, string> = {};

    if (!jobTitle || jobTitle.trim() === "") {
      errors.jobTitle = "Job Title is required";
    }
    if (!department || department.trim() === "") {
      errors.department = "Department is required";
    }
    if (!employmentType || employmentType.trim() === "") {
      errors.employmentType = "Employment Type is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const newDesignation: JobDesignation = {
      id: Date.now().toString(),
      jobTitle: jobTitle.trim(),
      department: department.trim(),
      level: level?.trim() || undefined,
      reportsTo: reportsTo?.trim() || undefined,
      employmentType: employmentType.trim(),
      location: location?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    const saved = saveDesignation(newDesignation);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
