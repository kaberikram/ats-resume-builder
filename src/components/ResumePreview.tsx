import dynamic from 'next/dynamic';
import { ResumeData } from '@/types';

const PDFPreview = dynamic(() => import('./PDFPreview'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-900 dark:border-white"></div>
    </div>
  ),
});

interface ResumePreviewProps {
  data: ResumeData;
  theme: 'light' | 'dark';
}

export default function ResumePreview({ data, theme }: ResumePreviewProps) {
  return <PDFPreview data={data} theme={theme} />;
} 