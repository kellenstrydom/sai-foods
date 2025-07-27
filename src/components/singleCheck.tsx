import { useState } from 'react';
import { checkValueExists } from '../utils/checkValue';

export function SingleCheck() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'safe' | 'not_safe' | null>(null);
  const [lastChecked, setLastChecked] = useState('');

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cleanedInput = input.trim().toLowerCase();
      if (!cleanedInput) return;

      const found = await checkValueExists(cleanedInput);
      setLastChecked(cleanedInput);
      setStatus(found ? 'not_safe' : 'safe');
    }
  };

  return (
    <div>
      <h2>Single Value Check</h2>
      <input
        type="text"
        placeholder="Enter a word"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {status !== null && (
        <p>
          <strong>{lastChecked}</strong> is{' '}
          {status === 'safe' ? '✅ safe' : '❌ not safe'}.
        </p>
      )}
    </div>
  );
}
