"use client";

import { useState, useCallback, useEffect } from "react";
import { usePatients } from "@/app/hooks/usePatients";
import { useDebounce } from "@/app/hooks/useDebounce";
import { exportPatientsPdf } from "@/app/lib/exportPdf";
import { SearchBar } from "@/app/components/SearchBar";
import { SortControls } from "@/app/components/SortControls";
import { Pagination } from "@/app/components/Pagination";
import { TableView } from "@/app/components/TableView";
import { CardView } from "@/app/components/CardView";
import { TableSkeleton, CardSkeleton } from "@/app/components/Skeletons";
import { ThemeToggle } from "@/app/components/ThemeToggle";

type ViewMode = "table" | "card";

// Items per page for each view
const TABLE_LIMIT = 10;
const CARD_LIMIT = 12;

export default function PatientDirectory() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchInput, setSearchInput] = useState("");

  // Debounce search for 300ms to avoid excessive API calls
  const debouncedSearch = useDebounce(searchInput, 300);

  const limit = viewMode === "table" ? TABLE_LIMIT : CARD_LIMIT;
  const { data, loading, error, filters, updateFilters, setPage } = usePatients({
    limit,
    search: debouncedSearch,
  });

  // Sync debounced search and view-mode limit with API filters
  useEffect(() => {
    updateFilters({ search: debouncedSearch, limit });
  }, [debouncedSearch, limit, updateFilters]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleIssuesChange = useCallback(
    (issues: string[]) => {
      updateFilters({ medicalIssue: issues });
    },
    [updateFilters]
  );

  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: "asc" | "desc") => {
      updateFilters({ sortBy, sortOrder });
    },
    [updateFilters]
  );

  // For table header sort toggling
  const handleTableSort = useCallback(
    (field: string) => {
      if (filters.sortBy === field) {
        updateFilters({ sortBy: field, sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
      } else {
        updateFilters({ sortBy: field, sortOrder: "asc" });
      }
    },
    [filters.sortBy, filters.sortOrder, updateFilters]
  );

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header with medical cross pattern */}
      <header className="bg-linear-to-r from-teal-700 to-emerald-600 dark:from-teal-900 dark:to-emerald-800 relative overflow-hidden">
        {/* Medical cross pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[50, 150, 250, 350].map((x) =>
              [20, 60, 100].map((y) => (
                <g key={`${x}-${y}`} transform={`translate(${x},${y})`}>
                  <rect x="-8" y="-2" width="16" height="4" rx="1" fill="white" />
                  <rect x="-2" y="-8" width="4" height="16" rx="1" fill="white" />
                </g>
              ))
            )}
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Patient Directory</h1>
            <p className="text-emerald-100 mt-1 text-sm">
              {data ? `${data.total} Patient Found` : "Loading..."}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* View Toggle — sliding pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {/* Sliding background pill */}
            <span
              aria-hidden="true"
              className="absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-lg shadow-sm
                         transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ left: viewMode === "table" ? "4px" : "calc(50% + 2px)" }}
            />
            <button
              onClick={() => handleViewChange("table")}
              className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-lg
                          transition-colors duration-200
                          ${viewMode === "table" ? "text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
            >
              Table View
            </button>
            <button
              onClick={() => handleViewChange("card")}
              className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-lg
                          transition-colors duration-200
                          ${viewMode === "card" ? "text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
            >
              Card View
            </button>
          </div>

          {/* Static active filter count badge — dropdown is inside the search bar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Active Filters: {filters.medicalIssue.length}
          </div>
        </div>

        {/* Search + inline filter dropdown, Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
            selectedIssues={filters.medicalIssue}
            onIssuesChange={handleIssuesChange}
          />
          <SortControls
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Active filter chips (shown below search when filters applied) */}
        {filters.medicalIssue.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.medicalIssue.map((issue) => (
              <span
                key={issue}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 border
                           border-gray-200 dark:border-gray-700 rounded-full capitalize animate-chip-in"
              >
                {issue}
                <button
                  onClick={() =>
                    handleIssuesChange(filters.medicalIssue.filter((i) => i !== issue))
                  }
                  className="ml-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  aria-label={`Remove ${issue} filter`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* PDF export button */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => {
              if (data?.patients.length) {
                exportPatientsPdf(data.patients, {
                  search: filters.search,
                  issues: filters.medicalIssue,
                });
              }
            }}
            disabled={!data?.patients.length}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400
                       border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Export PDF
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-400">
                Failed to load patients. Please try again later.
              </p>
            </div>
          </div>
        )}

        {/* Content area — key triggers remount + CSS fade-slide on every view switch or data load */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div key={`skeleton-${viewMode}`} className="p-4 animate-fade-slide-in">
              {viewMode === "table" ? <TableSkeleton /> : <CardSkeleton />}
            </div>
          ) : data && data.patients.length > 0 ? (
            <div
              key={`content-${viewMode}`}
              className={`animate-fade-slide-in ${viewMode === "card" ? "p-4" : ""}`}
            >
              {viewMode === "table" ? (
                <TableView
                  patients={data.patients}
                  sortBy={filters.sortBy}
                  sortOrder={filters.sortOrder}
                  onSortChange={handleTableSort}
                />
              ) : (
                <CardView patients={data.patients} />
              )}
            </div>
          ) : (
            <div className="animate-fade-slide-in flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg font-medium">No patients found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
      </main>
    </div>
  );
}
