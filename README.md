# Patient Directory

A modern, responsive patient directory web application built with Next.js, React, and Tailwind CSS. Browse, search, filter, sort, and export patient records with a polished UI featuring dark/light theme support.

## Features

- **Dual View Modes** — Switch between a detailed table view and a responsive card grid view with smooth animated transitions.
- **Search** — Debounced full-text search across patient name, medical issue, email, address, and phone number.
- **Filter by Medical Issue** — Checkbox-based filter dropdown integrated into the search bar with active filter chips.
- **Sorting** — Sort by Name, Age, ID, or Medical Issue with ascending/descending toggle (via buttons and clickable table headers).
- **Pagination** — Full page navigation with Previous/Next buttons and numbered pages.
- **PDF Export** — Download the current patient list as a formatted PDF with header, filters, and page footers.
- **Dark / Light Theme** — Toggle between dark and light modes. Preference is persisted in localStorage and respects the system `prefers-color-scheme` on first visit.
- **Loading Skeletons** — Pulse-animated skeleton placeholders for both table and card views during data loading.
- **Responsive Design** — Fully responsive layout from mobile to desktop (1-4 column card grid).

## Tech Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Framework     | Next.js 16 (App Router)        |
| Language      | TypeScript 5                   |
| UI Library    | React 19                       |
| Styling       | Tailwind CSS 4                 |
| PDF Export    | jsPDF + jspdf-autotable        |
| Linting       | ESLint 9 + eslint-config-next  |

## Project Structure

```
assignment/
├── app/
│   ├── api/patients/route.ts    # GET /api/patients — paginated, filterable API
│   ├── components/
│   │   ├── CardView.tsx         # Card grid view
│   │   ├── FilterPanel.tsx      # Standalone filter panel
│   │   ├── Pagination.tsx       # Page navigation
│   │   ├── PatientAvatar.tsx    # Color-coded initials avatar
│   │   ├── SearchBar.tsx        # Search input + inline filter dropdown
│   │   ├── Skeletons.tsx        # Loading skeletons (table + card)
│   │   ├── SortControls.tsx     # Sort-by buttons
│   │   ├── TableView.tsx        # Table view
│   │   ├── ThemeProvider.tsx    # Dark/light theme context + provider
│   │   └── ThemeToggle.tsx      # Theme toggle button (sun/moon)
│   ├── hooks/
│   │   ├── useDebounce.ts       # Generic debounce hook
│   │   └── usePatients.ts       # Data-fetching hook with filter/sort/pagination
│   ├── lib/
│   │   ├── exportPdf.ts         # PDF generation with jsPDF
│   │   └── types.ts             # TypeScript interfaces + constants
│   ├── globals.css              # Tailwind imports + custom animations + dark mode
│   ├── layout.tsx               # Root layout with ThemeProvider
│   └── page.tsx                 # Main page (PatientDirectory)
├── data/
│   └── patients.json            # Mock patient data (~100 records)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd assignment

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## API

### `GET /api/patients`

Returns paginated patient data with optional filtering and sorting.

**Query Parameters:**

| Parameter      | Type   | Default       | Description                                  |
| -------------- | ------ | ------------- | -------------------------------------------- |
| `page`         | number | `1`           | Page number                                  |
| `limit`        | number | `10`          | Items per page                               |
| `search`       | string | —             | Search across name, issue, email, address, phone |
| `medicalIssue` | string | —             | Comma-separated list of medical issues       |
| `sortBy`       | string | `patient_id`  | Field to sort by                             |
| `sortOrder`    | string | `asc`         | `asc` or `desc`                              |

**Response:**

```json
{
  "patients": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
