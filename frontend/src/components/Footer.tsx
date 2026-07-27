const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-500 sm:flex-row sm:text-left sm:px-6 lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-900">MedVision AI</p>
          <p className="mt-1">AI-assisted Chest X-ray Analysis Platform</p>
        </div>
        <div>
          <p>Educational and Clinical Decision Support Tool</p>
          <p className="mt-1">This software is not a substitute for professional medical diagnosis.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
