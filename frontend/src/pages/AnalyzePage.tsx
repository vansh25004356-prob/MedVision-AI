import { useState } from 'react';
import { motion } from 'framer-motion';
import UploadCard from '../components/UploadCard';
import ImagePreview from '../components/ImagePreview';
import LoadingAnimation from '../components/LoadingAnimation';
import ErrorCard from '../components/ErrorCard';
import PredictionCard from '../components/PredictionCard';
import { predictImage } from '../services/api';
import type { PredictionResponse, UploadState } from '../types';

const AnalyzePage = () => {
  const [state, setState] = useState<UploadState>({
    file: null,
    previewUrl: null,
    isUploading: false,
    error: null,
    result: null,
  });

  const handleFileSelect = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setState((prev) => ({
      ...prev,
      file,
      previewUrl,
      error: null,
      result: null,
    }));
  };

  const handleAnalyze = async () => {
    if (!state.file) {
      setState((prev) => ({ ...prev, error: 'Please upload an image before analyzing.' }));
      return;
    }

    setState((prev) => ({ ...prev, isUploading: true, error: null, result: null }));

    try {
      const result = await predictImage(state.file);
      setState((prev) => ({ ...prev, isUploading: false, result }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Prediction failed. Please try again.';
      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: message,
      }));
    }
  };

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      file: null,
      previewUrl: null,
      isUploading: false,
      error: null,
      result: null,
    }));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Single-page workflow</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Medical image analysis</h1>
          <p className="mt-2 text-slate-500">Upload, preview, analyze, and review results in one streamlined flow.</p>
        </div>
        <button
          onClick={handleReset}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <UploadCard onFileSelect={handleFileSelect} isLoading={state.isUploading} previewUrl={state.previewUrl} />
          <ImagePreview previewUrl={state.previewUrl} fileName={state.file?.name ?? null} />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!state.file || state.isUploading}
            className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {state.isUploading ? 'Analyzing...' : 'Analyze image'}
          </motion.button>
        </div>

        <div className="space-y-6">
          {state.isUploading ? <LoadingAnimation /> : null}
          {state.error ? <ErrorCard message={state.error} /> : null}
          {state.result ? <PredictionCard result={state.result as PredictionResponse} onAnalyzeAnother={handleReset} /> : null}
        </div>
      </div>
    </section>
  );
};

export default AnalyzePage;
