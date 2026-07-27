import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import type { PredictionResponse } from '../types';
import { formatConfidence } from '../utils/formatters';

interface ReportAccordionProps {
  result: PredictionResponse;
}

const ReportAccordion = ({ result }: ReportAccordionProps) => {
  const [open, setOpen] = useState(false);

  const details = [
    { label: 'Prediction', value: result.prediction },
    { label: 'Confidence', value: formatConfidence(result.confidence) },
    { label: 'Processing Time', value: `${Math.round(result.processingTimeMs)} ms` },
    { label: 'Bounding Boxes', value: result.boxes?.length ? `${result.boxes.length}` : 'None detected' },
    { label: 'Image Resolution', value: '640 × 640' },
    { label: 'Model Version', value: 'YOLO11' },
    { label: 'Timestamp', value: result.timestamp || 'Not available' },
    { label: 'Backend Version', value: 'MedVision AI v1.0' },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
        aria-controls="technical-details-panel"
      >
        <div className="flex items-center gap-2 text-slate-600">
          <FileText size={16} />
          <span className="text-sm font-medium">Technical Details</span>
        </div>
        <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div id="technical-details-panel" className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
          {details.map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-3">
              <span className="font-semibold text-slate-900">{item.label}</span>
              <p className="mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReportAccordion;
