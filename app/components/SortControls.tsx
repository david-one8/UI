"use client";

import { memo } from "react";

interface SortControlsProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const SORT_OPTIONS = [
  { value: "patient_name", label: "Name" },
  { value: "age", label: "Age" },
  { value: "patient_id", label: "ID" },
  { value: "medical_issue", label: "Issue" },
];

function SortControlsComponent({ sortBy, sortOrder, onSortChange }: SortControlsProps) {
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      // Toggle order if same field
      onSortChange(field, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(field, "asc");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Sort by:</span>
      {SORT_OPTIONS.slice(0, 2).map((option) => (
        <button
          key={option.value}
          onClick={() => toggleSort(option.value)}
          className={`flex items-center gap-1 px-3 py-2 text-sm border rounded-lg
                      transition-all duration-200
            ${sortBy === option.value
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
        >
          {option.label}
          {/* Single chevron that rotates smoothly between asc/desc */}
          {sortBy === option.value ? (
            <svg
              className={`w-4 h-4 transition-transform duration-300 ease-in-out
                          ${sortOrder === "desc" ? "rotate-180" : "rotate-0"}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}

export const SortControls = memo(SortControlsComponent);
