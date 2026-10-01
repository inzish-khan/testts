import fs from "fs";
import path from "path";
import { JobDesignation } from "@/types/jobDesignation";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "job-designations.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function initializeFile() {
  ensureDataDir();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
}

export function getAllDesignations(): JobDesignation[] {
  initializeFile();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveDesignation(designation: JobDesignation): JobDesignation {
  initializeFile();
  const all = getAllDesignations();
  all.push(designation);
  fs.writeFileSync(filePath, JSON.stringify(all, null, 2));
  return designation;
}
