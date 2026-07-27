import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [view, setView] = useState<'landing' | 'analyze' | 'about'>('landing');

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <Navbar currentView={view} onNavigate={setView} />
      <main>
        {view === 'landing' ? <LandingPage onStart={() => setView('analyze')} /> : null}
        {view === 'analyze' ? <AnalyzePage /> : null}
        {view === 'about' ? <AboutPage /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;
