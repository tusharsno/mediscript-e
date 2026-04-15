"use client";

type Prescription = {
  id: string;
  diagnosis: string;
  medications: string;
  createdAt: Date;
};

type Props = {
  prescription: Prescription;
  doctorName: string | null | undefined;
};

export default function DownloadPDF({ prescription, doctorName }: Props) {
  const handleDownload = () => {
    const content = `
MEDISCRIPT - Digital Prescription
===================================
Date: ${new Date(prescription.createdAt).toLocaleDateString()}
Doctor: Dr. ${doctorName || "N/A"}

Diagnosis:
${prescription.diagnosis}

Medications:
${prescription.medications}
===================================
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prescription-${prescription.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full py-2.5 bg-white text-blue-600 border border-blue-600 rounded-xl font-bold text-xs hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm active:scale-95"
    >
      Download Prescription
    </button>
  );
}
