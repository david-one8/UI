"use client";

import { memo } from "react";
import type { Patient } from "@/app/lib/types";
import { MEDICAL_ISSUE_COLORS } from "@/app/lib/types";
import { PatientAvatar } from "./PatientAvatar";

interface TableViewProps {
  patients: Patient[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
}

// Column header with sort indicator
function SortableHeader({
  label,
  field,
  currentSort,
  currentOrder,
  onSort,
}: {
  label: string;
  field: string;
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSort: (field: string) => void;
}) {
  const isActive = currentSort === field;
  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider cursor-pointer
                 hover:text-blue-800 select-none"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive && (
          // Single chevron that rotates on sort order change
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ease-in-out
                        ${currentOrder === "desc" ? "rotate-180" : "rotate-0"}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        )}
      </div>
    </th>
  );
}

function TableViewComponent({ patients, sortBy, sortOrder, onSortChange }: TableViewProps) {
  const handleSort = (field: string) => {
    onSortChange(field);
  };

  const formatId = (id: number) => `ID-${String(id).padStart(4, "0")}`;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <SortableHeader label="ID" field="patient_id" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
            <SortableHeader label="Name" field="patient_name" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
            <SortableHeader label="Age" field="age" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
            <SortableHeader label="Medical Issue" field="medical_issue" currentSort={sortBy} currentOrder={sortOrder} onSort={handleSort} />
            <th className="px-4 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Address</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Phone Number</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">Email ID</th>
            <th className="px-4 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {patients.map((patient) => {
            const contact = patient.contact[0];
            const badgeClass = MEDICAL_ISSUE_COLORS[patient.medical_issue] || "bg-gray-100 text-gray-700";
            return (
              <tr key={patient.patient_id} className="hover:bg-blue-50/40 transition-colors duration-150">
                <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                  {formatId(patient.patient_id)}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <PatientAvatar name={patient.patient_name} size="sm" />
                    <span className="text-sm font-medium text-gray-900">
                      {patient.patient_name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{patient.age}</td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}>
                    {capitalize(patient.medical_issue)}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[180px] truncate">
                  {contact?.address || <span className="text-red-400">N/A</span>}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                  {contact?.number || <span className="text-red-400">N/A</span>}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[200px] truncate">
                  {contact?.email || <span className="text-red-400">N/A</span>}
                </td>
                <td className="px-4 py-3.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const TableView = memo(TableViewComponent);
