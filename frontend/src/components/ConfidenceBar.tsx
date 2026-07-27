import { motion } from 'framer-motion';

interface ConfidenceBarProps {
  value: number | null | undefined;
  label: string;
}

const ConfidenceBar = ({ value, label }: ConfidenceBarProps) => {
  const hasValue = typeof value === 'number' && !Number.isNaN(value);

  const confidenceColor = !hasValue
    ? 'bg-slate-400'
    : value >= 0.7
      ? 'bg-emerald-500'
      : value >= 0.4
        ? 'bg-amber-500'
        : 'bg-rose-500';

  const confidenceText = !hasValue ? 'Not Available' : `${(value * 100).toFixed(1)}%`;
  const width = !hasValue ? '0%' : `${Math.max(8, Math.min(100, value * 100))}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-semibold text-slate-900">{confidenceText}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`h-full rounded-full ${confidenceColor}`}
        />
      </div>
    </div>
  );
};

export default ConfidenceBar;
