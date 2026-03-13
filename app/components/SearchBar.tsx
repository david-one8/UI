"use client";

import { memo, useState, useRef, useEffect } from "react";
import { ALL_MEDICAL_ISSUES } from "@/app/lib/types";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedIssues: string[];
  onIssuesChange: (issues: string[]) => void;
}

function SearchBarComponent({ value, onChange, selectedIssues, onIssuesChange }: SearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
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

  const clearAll = () => onIssuesChange([]);

  return (
    <div className="relative flex-1" ref={containerRef}>
      {/* Search icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 dark:text-blue-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm
                   bg-white dark:bg-gray-800 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder:text-blue-400 dark:placeholder:text-blue-500"
      />

      {/* Funnel icon — opens filter dropdown */}
      <button
        onClick={() => setIsFilterOpen((o) => !o)}
        className={`absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors
                    ${isFilterOpen || selectedIssues.length > 0
                      ? "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    }`}
        aria-label="Toggle filters"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      {/* Filter dropdown anchored to the search bar */}
      {isFilterOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        rounded-xl shadow-lg z-50 p-3 animate-dropdown-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by Medical Issue</span>
            {selectedIssues.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-0.5 max-h-64 overflow-y-auto">
            {ALL_MEDICAL_ISSUES.map((issue) => (
              <label
                key={issue}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(issue)}
                  onChange={() => toggleIssue(issue)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{issue}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
