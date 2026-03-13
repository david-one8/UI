# 🏥 Patient Directory

A modern, responsive patient directory web application built with Next.js, React, and Tailwind CSS. Browse, search, filter, sort, and export patient records with a polished UI featuring dark/light theme support.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🔄 Dual View Modes** — Switch between detailed table view and responsive card grid view with smooth animated transitions
- **🔍 Smart Search** — Debounced full-text search across patient name, medical issue, email, address, and phone number
- **🏷️ Filter by Medical Issue** — Checkbox-based filter dropdown with active filter chips
- **📊 Flexible Sorting** — Sort by Name, Age, ID, or Medical Issue with ascending/descending toggle
- **📄 Pagination** — Full page navigation with Previous/Next buttons and numbered pages
- **📥 PDF Export** — Download the current patient list as a formatted PDF with headers and filters
- **🌓 Dark / Light Theme** — Toggle between themes with localStorage persistence and system preference detection
- **⚡ Loading Skeletons** — Pulse-animated skeleton placeholders for both table and card views
- **📱 Responsive Design** — Fully responsive layout from mobile to desktop (1-4 column card grid)

## 🛠️ Tech Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Framework     | Next.js 16 (App Router)        |
| Language      | TypeScript 5                   |
| UI Library    | React 19                       |
| Styling       | Tailwind CSS 4                 |
| PDF Export    | jsPDF + jspdf-autotable        |
| Linting       | ESLint 9 + eslint-config-next  |

## 📁 Project Structure

```
assignment/
├── app/
│   ├── api/
│   │   └── patients/
│   │       └── route.ts              # GET /api/patients — paginated, filterable API
│   ├── components/
│   │   ├── CardView.tsx              # Card grid view
│   │   ├── FilterPanel.tsx           # Standalone filter panel
│   │   ├── Pagination.tsx            # Page navigation
│   │   ├── PatientAvatar.tsx         # Color-coded initials avatar
│   │   ├── SearchBar.tsx             # Search input + inline filter dropdown
│   │   ├── Skeletons.tsx             # Loading skeletons (table + card)
│   │   ├── SortControls.tsx          # Sort-by buttons
│   │   ├── TableView.tsx             # Table view
│   │   ├── ThemeProvider.tsx         # Dark/light theme context + provider
│   │   └── ThemeToggle.tsx           # Theme toggle button (sun/moon)
│   ├── hooks/
│   │   ├── useDebounce.ts            # Generic debounce hook
│   │   └── usePatients.ts            # Data-fetching hook with filter/sort/pagination
│   ├── lib/
│   │   ├── exportPdf.ts              # PDF generation with jsPDF
│   │   └── types.ts                  # TypeScript interfaces + constants
│   ├── globals.css                   # Tailwind imports + custom animations + dark mode
│   ├── layout.tsx                    # Root layout with ThemeProvider
│   └── page.tsx                      # Main page (PatientDirectory)
├── data/
│   └── patients.json                 # Mock patient data (~100 records)
├── public/                           # Static assets
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

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

## 📡 API

### `GET /api/patients`

Returns paginated patient data with optional filtering and sorting.

**Query Parameters:**

| Parameter      | Type   | Default       | Description                                  |
| -------------- | ------ | ------------- | -------------------------------------------- |
| `page`         | number | `1`           | Page number                                  |
| `limit`        | number | `10`          | Items per page (max 100)                     |
| `search`       | string | —             | Search across name, issue, email, address, phone |
| `medicalIssue` | string | —             | Comma-separated list of medical issues       |
| `sortBy`       | string | `patient_id`  | Field to sort by (patient_id, patient_name, age, medical_issue) |
| `sortOrder`    | string | `asc`         | `asc` or `desc`                              |

**Response:**

```json
{
  "patients": [
    {
      "patient_id": 1,
      "patient_name": "John Doe",
      "age": 45,
      "photo_url": null,
      "contact": [
        {
          "address": "123 Main St",
          "number": "+1234567890",
          "email": "john@example.com"
        }
      ],
      "medical_issue": "fever"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

## 🎨 Features in Detail

### View Modes

- **Table View**: Displays 10 patients per page in a sortable table with clickable column headers
- **Card View**: Displays 12 patients per page in a responsive grid (1-4 columns based on screen size)

### Search & Filter

- Real-time search with 300ms debounce to optimize API calls
- Multi-select medical issue filter with visual chips
- Active filter count badge
- Clear individual filters via chip close buttons

### Theme Support

- System preference detection on first visit
- Manual toggle between light and dark modes
- Preference persisted in localStorage
- Smooth transitions between themes

### PDF Export

- Exports current filtered/sorted patient list
- Includes header with timestamp
- Shows active filters and search terms
- Formatted table with page numbers

## 🎯 Medical Issues

The application supports the following medical issues with color-coded badges:

- Fever
- Headache
- Sore Throat
- Sprained Ankle
- Rash
- Ear Infection
- Sinusitis
- Allergic Reaction
- Stomach Ache
- Broken Arm

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/patient-directory)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

---

Built with ❤️ using Next.js and Tailwind CSS
