import { motion } from 'framer-motion';
import { HeartPulse, Microscope, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft"
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">About the platform</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Designed for medical imaging workflows.</h1>
          <p className="mt-4 text-lg text-slate-600">
            This interface provides a polished, production-ready experience for uploading chest X-rays, reviewing a live preview, and receiving AI-driven diagnostic insights. The design prioritizes clarity, trust, and accessibility.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <Shield className="text-brand-600" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Secure flow</h3>
            <p className="mt-2 text-sm text-slate-600">Designed to keep the upload and analysis steps simple and professional.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <Microscope className="text-brand-600" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Medical UI</h3>
            <p className="mt-2 text-sm text-slate-600">A calm, clinical interface with clear hierarchy and progressive disclosure.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <HeartPulse className="text-brand-600" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Fast insights</h3>
            <p className="mt-2 text-sm text-slate-600">Supports instant analysis with downloadable reporting and repeatable review.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutPage;
