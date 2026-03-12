"use client";

import { memo } from "react";

interface PatientAvatarProps {
  name: string;
  size?: "sm" | "md";
}

// Generate a consistent color based on the patient's name
function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-cyan-500",
    "bg-rose-500", "bg-emerald-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function PatientAvatarComponent({ name, size = "sm" }: PatientAvatarProps) {
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  const bgColor = getAvatarColor(name);

  return (
    <div className={`${sizeClass} ${bgColor} rounded-full flex items-center justify-center text-white font-medium shrink-0`}>
      {getInitials(name)}
    </div>
  );
}

export const PatientAvatar = memo(PatientAvatarComponent);
