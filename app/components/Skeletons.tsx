"use client";

// Loading skeleton components for table and card views

export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700">
            {["ID", "Name", "Age", "Medical Issue", "Address", "Phone Number", "Email ID", ""].map(
              (header, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="px-4 py-3.5"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" /></td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </td>
              <td className="px-4 py-3.5"><div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" /></td>
              <td className="px-4 py-3.5"><div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" /></td>
              <td className="px-4 py-3.5"><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" /></td>
              <td className="px-4 py-3.5"><div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" /></td>
              <td className="px-4 py-3.5"><div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded" /></td>
              <td className="px-4 py-3.5"><div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CardSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 animate-pulse">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
          {/* Badge */}
          <div className="mb-3">
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
          {/* Contact details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
