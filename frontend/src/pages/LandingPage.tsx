import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid items-center gap-8 rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur xl:grid-cols-[1.2fr_0.8fr]"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            <Sparkles size={16} />
            AI-assisted radiology workflow
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Diagnose chest X-rays with confidence.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Upload a study, inspect the preview, and receive an AI-driven assessment with confidence scoring and annotated insights in seconds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Start analysis
              <ArrowRight size={16} />
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
              <ShieldCheck size={16} className="text-brand-600" />
              Secure and private workflow
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-brand-600 to-cyan-600 p-6 text-white shadow-soft">
          <div className="rounded-[1.25rem] bg-white/15 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/20 p-3">
                <Stethoscope size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Clinical support</p>
                <p className="text-xl font-semibold">Professional medical interface</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/90">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3">Preview before submission</div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3">Deterministic confidence scoring</div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-3">Downloadable annotated results</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LandingPage;
