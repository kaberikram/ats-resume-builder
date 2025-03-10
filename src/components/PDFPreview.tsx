'use client';

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from '@/components/ResumeDocument';
import { ResumeData } from '@/types/index';

interface PDFPreviewProps {
  data: ResumeData;
  theme: 'light' | 'dark';
}

export default function PDFPreview({ data, theme }: PDFPreviewProps) {
  // Format the current date as YYYY-MM-DD
  const formattedDate = new Date().toISOString().split('T')[0];
  
  // Create a filename from the user's name and date
  const fileName = `${data.name.toLowerCase().replace(/\s+/g, '-')}-resume-${formattedDate}.pdf`;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 gap-4 sm:gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Preview</span>
        </div>
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
          <PDFDownloadLink
            document={<ResumeDocument data={data} theme={theme} />}
            fileName={fileName}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium w-full sm:w-auto justify-center
              bg-neutral-900 dark:bg-white text-white dark:text-neutral-900
              hover:bg-neutral-800 dark:hover:bg-neutral-100
              rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save as PDF
          </PDFDownloadLink>
          <span className="text-xs text-neutral-500 mt-1 truncate max-w-full">
            {fileName}
          </span>
        </div>
      </div>
      <div className="flex-1 w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)]">
        <PDFViewer className="w-full h-full rounded-lg">
          <ResumeDocument data={data} theme={theme} />
        </PDFViewer>
      </div>
    </div>
  );
} 