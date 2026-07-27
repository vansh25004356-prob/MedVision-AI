import { Activity, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'analyze' | 'about';
  onNavigate: (view: 'landing' | 'analyze' | 'about') => void;
}

const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const links: Array<{ key: 'landing' | 'analyze' | 'about'; label: string }> = [
    { key: 'landing', label: 'Home' },
    { key: 'analyze', label: 'Analyze' },
    { key: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-brand-600/10 p-2 text-brand-700">
            <Activity size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">MedVision AI</p>
            <p className="text-sm text-slate-500">Chest X-ray analysis platform</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => {
            const isActive = currentView === link.key;
            return (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 lg:flex">
          <ShieldCheck size={16} />
          HIPAA-ready workflow
        </div>
      </div>
    </header>
  );
};

export default Navbar;
