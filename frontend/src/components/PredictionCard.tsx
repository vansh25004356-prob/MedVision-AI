import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Clock3, Download, HeartPulse, RotateCcw, ShieldAlert, Stethoscope } from 'lucide-react';
import ConfidenceBar from './ConfidenceBar';
import ReportAccordion from './ReportAccordion';
import { formatConfidence, formatTime } from '../utils/formatters';
import type { PredictionResponse } from '../types';

interface PredictionCardProps {
  result: PredictionResponse;
  onAnalyzeAnother: () => void;
}

const PredictionCard = ({ result, onAnalyzeAnother }: PredictionCardProps) => {
  const downloadImage = () => {
    if (!result.annotatedImageUrl) return;

    const link = document.createElement('a');
    link.href = result.annotatedImageUrl;
    link.download = 'annotated-xray.png';
    link.click();
  };

  const warningBadge = () => {
    switch (result.warningLevel?.toLowerCase()) {
      case 'high':
        return 'rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700';
      case 'medium':
        return 'rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700';
      default:
        return 'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700';
    }
  };

  const warningLabel = () => {
    switch (result.warningLevel?.toLowerCase()) {
      case 'high':
        return '🔴 High Clinical Priority';
      case 'medium':
        return '🟡 Moderate Clinical Priority';
      default:
        return '🟢 Low Clinical Priority';
    }
  };

  const titleMap = {
    Pneumonia: { title: '🔴 Pneumonia Findings Detected', explanation: 'Radiographic findings consistent with pneumonia were identified.' },
    Uncertain: { title: '🟡 Inconclusive – Further Evaluation Recommended', explanation: 'The model could not confirm pneumonia findings with sufficient confidence.' },
    Normal: { title: '🟢 No Pneumonia Detected', explanation: 'No radiographic evidence of pneumonia was detected.' },
  } as const;

  const displayTitle = titleMap[result.prediction as keyof typeof titleMap] ?? titleMap.Uncertain;

  // Check if lifestyle guidance section has content
  const lifestyleTips = result.healthTips.slice(3);
  const hasLifestyleGuidance = lifestyleTips.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Step 3</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">Clinical analysis summary</h2>
          <p className="mt-1 text-sm text-slate-500">AI analysis results are displayed below.</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
          <BrainCircuit size={22} />
        </div>
      </div>

      <div className="rounded-3xl bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-600">Primary result</p>
            <h3 className="mt-1 text-3xl font-semibold text-slate-900">{displayTitle.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{displayTitle.explanation}</p>
          </div>
          <div className="rounded-2xl border border-brand-200 bg-white px-4 py-3 text-right">
            <p className="text-sm text-slate-500">Confidence</p>
            <p className="text-xl font-semibold text-brand-700">{formatConfidence(result.confidence)}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock3 size={16} />
              <span className="text-sm font-medium">Processing time</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{formatTime(result.processingTimeMs)}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-600">
              <BrainCircuit size={16} />
              <span className="text-sm font-medium">Assessment</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-slate-900">{result.assessment}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldAlert size={16} />
            <span className="text-sm font-medium">Clinical priority</span>
          </div>
          <span className={warningBadge()}>{warningLabel()}</span>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Stethoscope size={16} />
            <span className="text-sm font-medium">Clinical Recommendations</span>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Activity size={15} />
                <span>Immediate Actions</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {result.healthTips.slice(0, 3).map((tip, index) => (
                  <li key={`${tip}-${index}`} className="flex items-start gap-2">
                    <span className="mt-1 text-brand-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            {hasLifestyleGuidance ? (
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <HeartPulse size={15} />
                  <span>Lifestyle Guidance</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {lifestyleTips.map((tip, index) => (
                    <li key={`${tip}-${index}`} className="flex items-start gap-2">
                      <span className="mt-1 text-brand-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          <ConfidenceBar value={result.confidence} label="Model confidence" />
        </div>

        {result.annotatedImageUrl ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-600">
                <BrainCircuit size={16} />
                <span className="text-sm font-medium">AI Detection Visualization</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={result.annotatedImageUrl} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700" aria-label="Open annotated image in a new tab">
                  Open full size
                </a>
                <button onClick={downloadImage} className="rounded-full border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700" aria-label="Download annotated image">
                  Download annotated image
                </button>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-sm font-semibold text-slate-700">Original X-ray</p>
                <img src={result.annotatedImageUrl} alt="Original uploaded X-ray" className="h-[320px] w-full object-contain" />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-sm font-semibold text-slate-700">Annotated X-ray</p>
                <img src={result.annotatedImageUrl} alt="Annotated prediction" className="h-[320px] w-full object-contain" />
              </div>
            </div>
          </div>
        ) : null}

        {result.boxes && result.boxes.length > 0 ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-600">
              <BrainCircuit size={16} />
              <span className="text-sm font-medium">Detected regions</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {result.boxes.map((box, index) => (
                <li key={`${box.x1}-${box.y1}-${index}`} className="rounded-xl bg-slate-50 px-3 py-2">
                  <span className="font-semibold text-slate-900">Box {index + 1}</span> · Confidence {Math.round(box.confidence * 100)}% · x1 {box.x1}, y1 {box.y1}, x2 {box.x2}, y2 {box.y2}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldAlert size={16} />
            <span className="text-sm font-medium">Medical Disclaimer</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">{result.disclaimer}</p>
        </div>

        <ReportAccordion result={result} />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={downloadImage}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Download size={16} />
            Download image
          </button>
          <button
            onClick={onAnalyzeAnother}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700"
          >
            <RotateCcw size={16} />
            Analyze another image
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionCard;

