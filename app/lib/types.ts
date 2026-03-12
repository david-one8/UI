// Patient data types matching MOCK_DATA.json structure

export interface PatientContact {
  address: string | null;
  number: string | null;
  email: string | null;
}

export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: PatientContact[];
  medical_issue: string;
}

export interface PatientsApiResponse {
  patients: Patient[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PatientFilters {
  search: string;
  medicalIssue: string[];
  ageRange: [number, number] | null;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

// Medical issue color mapping for badges
export const MEDICAL_ISSUE_COLORS: Record<string, string> = {
  fever: "bg-red-100 text-red-700 border-red-200",
  headache: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "sore throat": "bg-orange-100 text-orange-700 border-orange-200",
  "sprained ankle": "bg-green-100 text-green-700 border-green-200",
  rash: "bg-rose-100 text-rose-700 border-rose-200",
  "ear infection": "bg-teal-100 text-teal-700 border-teal-200",
  sinusitis: "bg-blue-100 text-blue-700 border-blue-200",
  "allergic reaction": "bg-purple-100 text-purple-700 border-purple-200",
  "stomach ache": "bg-amber-100 text-amber-700 border-amber-200",
  "broken arm": "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export const ALL_MEDICAL_ISSUES = [
  "fever",
  "headache",
  "sore throat",
  "sprained ankle",
  "rash",
  "ear infection",
  "sinusitis",
  "allergic reaction",
  "stomach ache",
  "broken arm",
] as const;
