import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Patient } from "@/app/lib/types";

// Cache the parsed JSON in memory to avoid re-reading on every request
let cachedData: Patient[] | null = null;

function loadPatients(): Patient[] {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), "data", "patients.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  cachedData = JSON.parse(raw) as Patient[];
  return cachedData;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Parse query parameters
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const medicalIssue = searchParams.get("medicalIssue") || "";
    const sortBy = searchParams.get("sortBy") || "patient_id";
    const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

    let patients = loadPatients();

    // Search: filter by name, email, address, or phone number
    if (search) {
      patients = patients.filter((p) => {
        const nameMatch = p.patient_name.toLowerCase().includes(search);
        const issueMatch = p.medical_issue.toLowerCase().includes(search);
        const contact = p.contact[0];
        const emailMatch = contact?.email?.toLowerCase().includes(search) ?? false;
        const addressMatch = contact?.address?.toLowerCase().includes(search) ?? false;
        const phoneMatch = contact?.number?.includes(search) ?? false;
        return nameMatch || issueMatch || emailMatch || addressMatch || phoneMatch;
      });
    }

    // Filter by medical issue (comma-separated for multiple)
    if (medicalIssue) {
      const issues = medicalIssue.split(",").map((i) => i.trim().toLowerCase());
      patients = patients.filter((p) =>
        issues.includes(p.medical_issue.toLowerCase())
      );
    }

    // Sort
    const allowedSortFields = ["patient_id", "patient_name", "age", "medical_issue"];
    const field = allowedSortFields.includes(sortBy) ? sortBy : "patient_id";

    patients = [...patients].sort((a, b) => {
      const aVal = a[field as keyof Patient];
      const bVal = b[field as keyof Patient];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    // Pagination
    const total = patients.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedPatients = patients.slice(offset, offset + limit);

    return NextResponse.json({
      patients: paginatedPatients,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Failed to load patient data:", error);
    return NextResponse.json(
      { error: "Failed to load patient data" },
      { status: 500 }
    );
  }
}
