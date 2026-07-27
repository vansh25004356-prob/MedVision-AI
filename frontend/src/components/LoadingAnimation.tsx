import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
          <Activity className="animate-pulse" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Processing your X-ray</h3>
          <p className="text-sm text-slate-500">The model is analyzing the uploaded image and preparing a detailed result.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
