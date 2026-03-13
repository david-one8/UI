"use client";

import { memo } from "react";
import type { Patient } from "@/app/lib/types";
import { MEDICAL_ISSUE_COLORS } from "@/app/lib/types";
import { PatientAvatar } from "./PatientAvatar";

interface CardViewProps {
  patients: Patient[];
}

function CardViewComponent({ patients }: CardViewProps) {
  const formatId = (id: number) => `ID-${String(id).padStart(4, "0")}`;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((patient, index) => {
        const contact = patient.contact[0];
        const badgeClass = MEDICAL_ISSUE_COLORS[patient.medical_issue] || "bg-gray-100 text-gray-700";

        return (
          <div
            key={patient.patient_id}
            className="animate-fade-slide-in bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5
                       hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-700
                       transition-all duration-300 ease-out cursor-pointer"
            style={{ animationDelay: `${Math.min(index * 30, 270)}ms` }}
          >
            {/* Header: Avatar, Name, ID, Age badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <PatientAvatar name={patient.patient_name} size="md" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight truncate max-w-[140px]">
                    {patient.patient_name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{formatId(patient.patient_id)}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                Age {patient.age}
              </span>
            </div>

            {/* Medical issue badge */}
            <div className="mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}>
                {capitalize(patient.medical_issue)}
              </span>
            </div>

            {/* Contact details */}
            <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
              {/* Address */}
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{contact?.address || <span className="text-red-400">N/A</span>}</span>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{contact?.number || <span className="text-red-400">N/A</span>}</span>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{contact?.email || <span className="text-red-400">N/A</span>}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const CardView = memo(CardViewComponent);
