"use client";

import { memo, useState, useRef, useEffect } from "react";
import { ALL_MEDICAL_ISSUES } from "@/app/lib/types";

interface FilterPanelProps {
  selectedIssues: string[];
  onIssuesChange: (issues: string[]) => void;
}

function FilterPanelComponent({ selectedIssues, onIssuesChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleIssue = (issue: string) => {
    const updated = selectedIssues.includes(issue)
      ? selectedIssues.filter((i) => i !== issue)
      : [...selectedIssues, issue];
    onIssuesChange(updated);
  };

  const removeIssue = (issue: string) => {
    onIssuesChange(selectedIssues.filter((i) => i !== issue));
  };

  const clearAll = () => onIssuesChange([]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg
                   hover:bg-gray-50 transition-colors"
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-gray-600">Active Filters: {selectedIssues.length}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200
                        rounded-lg shadow-lg z-50 p-3 animate-dropdown-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Medical Issue</span>
            {selectedIssues.length > 0 && (
              <button onClick={clearAll} className="text-xs text-blue-500 hover:text-blue-700">
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {ALL_MEDICAL_ISSUES.map((issue) => (
              <label key={issue} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(issue)}
                  onChange={() => toggleIssue(issue)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 capitalize">{issue}</span>
              </label>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}

export const FilterPanel = memo(FilterPanelComponent);
