"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { PatientsApiResponse, PatientFilters } from "@/app/lib/types";

const DEFAULT_FILTERS: PatientFilters = {
  search: "",
  medicalIssue: [],
  ageRange: null,
  sortBy: "patient_id",
  sortOrder: "asc",
  page: 1,
  limit: 10,
};

export function usePatients(initialFilters?: Partial<PatientFilters>) {
  const [filters, setFilters] = useState<PatientFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [data, setData] = useState<PatientsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Abort controller ref for cancelling in-flight requests
  const abortRef = useRef<AbortController | null>(null);

  const fetchPatients = useCallback(async (f: PatientFilters) => {
    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: f.page.toString(),
        limit: f.limit.toString(),
        sortBy: f.sortBy,
        sortOrder: f.sortOrder,
      });

      if (f.search) params.set("search", f.search);
      if (f.medicalIssue.length > 0) {
        params.set("medicalIssue", f.medicalIssue.join(","));
      }

      const res = await fetch(`/api/patients?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const json: PatientsApiResponse = await res.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Fetch on filter change
  useEffect(() => {
    fetchPatients(filters);
  }, [filters, fetchPatients]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const updateFilters = useCallback((updates: Partial<PatientFilters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updates };
      // Reset to page 1 when search/filter/sort changes
      if (
        updates.search !== undefined ||
        updates.medicalIssue !== undefined ||
        updates.sortBy !== undefined ||
        updates.sortOrder !== undefined
      ) {
        next.page = 1;
      }
      return next;
    });
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return { data, loading, error, filters, updateFilters, setPage };
}
