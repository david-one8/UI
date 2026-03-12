import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Patient } from "./types";

// Generate and download a PDF of the patient list
export function exportPatientsPdf(patients: Patient[], filters: { search: string; issues: string[] }) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(13, 148, 136); // teal-600
  doc.text("Patient Directory", 14, 20);

  // Subtitle with filter info
  doc.setFontSize(10);
  doc.setTextColor(100);
  const filterInfo: string[] = [];
  if (filters.search) filterInfo.push(`Search: "${filters.search}"`);
  if (filters.issues.length) filterInfo.push(`Issues: ${filters.issues.join(", ")}`);
  doc.text(
    filterInfo.length
      ? `${patients.length} patients | ${filterInfo.join(" | ")}`
      : `${patients.length} patients`,
    14,
    28
  );

  // Table data
  const tableData = patients.map((p) => {
    const contact = p.contact[0];
    return [
      `ID-${String(p.patient_id).padStart(4, "0")}`,
      p.patient_name,
      p.age.toString(),
      p.medical_issue.charAt(0).toUpperCase() + p.medical_issue.slice(1),
      contact?.address || "N/A",
      contact?.number || "N/A",
      contact?.email || "N/A",
    ];
  });

  autoTable(doc, {
    startY: 34,
    head: [["ID", "Name", "Age", "Medical Issue", "Address", "Phone", "Email"]],
    body: tableData,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [13, 148, 136], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [240, 253, 250] }, // teal-50
    columnStyles: {
      0: { cellWidth: 18 },
      2: { cellWidth: 12, halign: "center" },
      3: { cellWidth: 26 },
    },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount} | Generated ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save("patient-directory.pdf");
}
