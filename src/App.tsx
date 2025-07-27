import { useState } from 'react';
import { SingleCheck } from './components/singleCheck';
import { MultiCheck } from './components/multiCheck';
import './App.css';

export default function App() {
  const [mode, setMode] = useState<'single' | 'multi'>('single');

  return (
    <div>
      <h1>Sai's Food Checker</h1>
      <button onClick={() => setMode(mode === 'single' ? 'multi' : 'single')}>
        Switch to {mode === 'single' ? 'List Mode' : 'Single Mode'}
      </button>

      <hr />

      {mode === 'single' ? <SingleCheck /> : <MultiCheck />}
    </div>
  );
}
