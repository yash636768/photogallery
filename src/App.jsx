import React from 'react';
import Gallery from './components/Gallery';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <Gallery />
      </main>
      <footer className="mt-12 border-t border-slate-200 py-8 text-center text-slate-500">
        <p>© {new Date().getFullYear()} Photo Gallery App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
